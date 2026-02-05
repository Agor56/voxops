import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Phone, PhoneOff, Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { Message, ToolCallLog, ConnectionState } from './types';
import { SYSTEM_INSTRUCTION, TOOLS, MOCK_SLOTS } from './constants';
import { base64ToUint8Array, decodeAudioData, createPcmBlob } from './audioUtils';
import AudioVisualizer from './AudioVisualizer';
import ChatLog from './ChatLog';
import ToolsDisplay from './ToolsDisplay';

const MODEL_ID = 'gemini-2.5-flash-native-audio-preview-12-2025';
const VOICE_NAME = 'Zephyr';

interface LiveAgentProps {
  className?: string;
}

const LiveAgent = ({ className = '' }: LiveAgentProps) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [toolLogs, setToolLogs] = useState<ToolCallLog[]>([]);

  // Refs for audio handling
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const isMutedRef = useRef(false);

  // Keep mute ref in sync
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const isConnected = connectionState === ConnectionState.CONNECTED;

  // Tool handlers
  const handleToolCall = useCallback((name: string, args: any): string => {
    console.log('🔧 Tool call:', name, args);
    
    let result: string;
    
    if (name === 'checkAvailability') {
      const specialty = args.specialty?.toLowerCase() || '';
      const slots = MOCK_SLOTS.filter(s => 
        s.specialty.toLowerCase().includes(specialty) ||
        specialty.includes(s.specialty.toLowerCase())
      );
      
      if (slots.length > 0) {
        result = `נמצאו ${slots.length} תורים פנויים: ${slots.map(s => `${s.time} אצל ${s.doctor}`).join(', ')}`;
      } else {
        result = 'לא נמצאו תורים פנויים להתמחות זו היום. אפשר לבדוק מחר?';
      }
    } else if (name === 'bookAppointment') {
      result = `התור נקבע בהצלחה! ${args.patientName}, בשעה ${args.time}. נשלח תזכורת ב-SMS.`;
    } else {
      result = 'פעולה לא מוכרת';
    }

    setToolLogs(prev => [...prev, {
      name,
      args,
      result,
      timestamp: new Date()
    }]);

    return result;
  }, []);

  // Audio playback queue
  const playNextInQueue = useCallback(async () => {
    console.log('🎵 playNextInQueue called, isPlaying:', isPlayingRef.current, 'queueLength:', audioQueueRef.current.length);
    
    if (isPlayingRef.current || audioQueueRef.current.length === 0) {
      console.log('🎵 Skipping - already playing or empty queue');
      return;
    }
    if (!audioContextRef.current) {
      console.log('⚠️ No audio context in playNextInQueue');
      return;
    }

    // Resume context if suspended
    if (audioContextRef.current.state === 'suspended') {
      console.log('🎵 Resuming suspended AudioContext');
      await audioContextRef.current.resume();
    }

    isPlayingRef.current = true;
    const buffer = audioQueueRef.current.shift()!;
    console.log('🎵 Playing buffer, duration:', buffer.duration.toFixed(2), 's, context state:', audioContextRef.current.state);

    try {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      
      // Connect through analyser for visualization
      if (analyserRef.current) {
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      } else {
        source.connect(audioContextRef.current.destination);
      }

      source.onended = () => {
        console.log('🎵 Buffer playback ended');
        isPlayingRef.current = false;
        playNextInQueue();
      };

      source.start();
      console.log('🎵 source.start() called');
    } catch (err) {
      console.error('❌ Playback error:', err);
      isPlayingRef.current = false;
      playNextInQueue();
    }
  }, []);

  const queueAudio = useCallback(async (base64: string) => {
    if (!audioContextRef.current) {
      console.log('⚠️ No audio context for queueAudio');
      return;
    }
    
    console.log('🔊 Queueing audio chunk, length:', base64.length);
    
    try {
      const data = base64ToUint8Array(base64);
      console.log('🔊 Decoded to Uint8Array, length:', data.length);
      const buffer = await decodeAudioData(data, audioContextRef.current);
      console.log('🔊 Created AudioBuffer, duration:', buffer.duration.toFixed(2), 's');
      audioQueueRef.current.push(buffer);
      console.log('🔊 Queue size:', audioQueueRef.current.length, 'isPlaying:', isPlayingRef.current);
      playNextInQueue();
    } catch (err) {
      console.error('❌ Audio decode error:', err);
    }
  }, [playNextInQueue]);

  // Message handler
  const handleServerMessage = useCallback((message: LiveServerMessage) => {
    console.log('📨 Server message type:', Object.keys(message));
    console.log('📨 Full message:', JSON.stringify(message, null, 2).slice(0, 500));

    // Handle audio
    if (message.serverContent?.modelTurn?.parts) {
      for (const part of message.serverContent.modelTurn.parts) {
        if (part.inlineData?.data) {
          queueAudio(part.inlineData.data);
        }
      }
    }

    // Handle transcripts
    if (message.serverContent?.outputTranscription?.text) {
      const text = message.serverContent.outputTranscription.text;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'model') {
          return prev.map((m, i) => 
            i === prev.length - 1 
              ? { ...m, text: m.text + text }
              : m
          );
        }
        return [...prev, {
          id: crypto.randomUUID(),
          role: 'model',
          text,
          timestamp: new Date()
        }];
      });
    }

    if (message.serverContent?.inputTranscription?.text) {
      const text = message.serverContent.inputTranscription.text;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'user') {
          return prev.map((m, i) => 
            i === prev.length - 1 
              ? { ...m, text: m.text + text }
              : m
          );
        }
        return [...prev, {
          id: crypto.randomUUID(),
          role: 'user',
          text,
          timestamp: new Date()
        }];
      });
    }

    // Handle tool calls
    if (message.toolCall?.functionCalls) {
      for (const call of message.toolCall.functionCalls) {
        const result = handleToolCall(call.name, call.args);
        
        // Send tool response back
        sessionRef.current?.sendToolResponse({
          functionResponses: [{
            id: call.id,
            name: call.name,
            response: { result }
          }]
        });
      }
    }
  }, [queueAudio, handleToolCall]);

  // Start recording
  const startRecording = useCallback(() => {
    if (!streamRef.current || !inputContextRef.current || !sessionRef.current) {
      console.log('⚠️ Missing stream, context, or session');
      return;
    }

    const ctx = inputContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const source = ctx.createMediaStreamSource(streamRef.current);
    const processor = ctx.createScriptProcessor(2048, 1, 1);

    let frameCount = 0;
    let bytesSent = 0;
    processor.onaudioprocess = (e) => {
      if (isMutedRef.current) return;
      if (!sessionRef.current) {
        console.log('⚠️ No session available for sending audio');
        return;
      }
      
      frameCount++;
      const inputData = e.inputBuffer.getChannelData(0);
      const pcm = createPcmBlob(new Float32Array(inputData));
      bytesSent += pcm.data.length;
      
      if (frameCount === 1) console.log('🎤 First mic frame, mimeType:', pcm.mimeType);
      if (frameCount % 50 === 0) console.log('🎤 Mic frames:', frameCount, 'bytes sent:', bytesSent);

      try {
        sessionRef.current.sendRealtimeInput({
          audio: { data: pcm.data, mimeType: pcm.mimeType }
        });
      } catch (err) {
        console.error('❌ Send audio error:', err);
      }
    };

    source.connect(processor);
    processor.connect(ctx.destination);
    sourceRef.current = source;
    processorRef.current = processor;
    
    console.log('🎤 Recording started');
  }, []);

  // Connect to Gemini
  const connect = useCallback(async () => {
    setConnectionState(ConnectionState.CONNECTING);
    setMessages([]);
    setToolLogs([]);

    try {
      // Initialize audio contexts synchronously (user gesture)
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      inputContextRef.current = new AudioContext({ sampleRate: 16000 });
      
      // Create analyser for visualization
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      // Get microphone
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Get API key from edge function
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-session`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
          }
        }
      );

      if (!res.ok) {
        throw new Error('Failed to get API key');
      }

      const { apiKey } = await res.json();
      
      // Initialize Gemini
      const client = new GoogleGenAI({ apiKey });
      
      const session = await client.live.connect({
        model: MODEL_ID,
        callbacks: {
          onopen: () => {
            console.log('🟢 Session opened');
          },
          onmessage: handleServerMessage,
          onerror: (err) => {
            console.error('🔴 Session error:', err);
            toast.error('שגיאה בחיבור');
            setConnectionState(ConnectionState.ERROR);
          },
          onclose: () => {
            console.log('🔴 Session closed');
            setConnectionState(ConnectionState.DISCONNECTED);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: VOICE_NAME
              }
            }
          },
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          tools: [{ functionDeclarations: TOOLS }],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        }
      });

      sessionRef.current = session;
      setConnectionState(ConnectionState.CONNECTED);
      
      // Start recording
      startRecording();

    } catch (err) {
      console.error('Connection error:', err);
      toast.error('שגיאה בהתחברות. נסו שוב.');
      setConnectionState(ConnectionState.ERROR);
      disconnect();
    }
  }, [handleServerMessage, startRecording]);

  // Disconnect
  const disconnect = useCallback(() => {
    // Stop recording
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    
    // Stop stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }

    // Close contexts
    if (inputContextRef.current) {
      inputContextRef.current.close();
      inputContextRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Close session
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch {}
      sessionRef.current = null;
    }

    // Clear queue
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    analyserRef.current = null;

    setConnectionState(ConnectionState.DISCONNECTED);
    setIsMuted(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return (
    <div className={`flex flex-col bg-card rounded-2xl border border-border/50 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-muted/30">
        <div className="flex items-center gap-3" dir="rtl">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
            👩‍⚕️
          </div>
          <div>
            <h3 className="font-semibold text-foreground">נועה</h3>
            <p className="text-sm text-muted-foreground">מזכירה רפואית - מדיקל טופ</p>
          </div>
          <div className={`mr-auto w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-500' : 
            connectionState === ConnectionState.CONNECTING ? 'bg-yellow-500 animate-pulse' :
            'bg-muted-foreground'
          }`} />
        </div>
      </div>

      {/* Visualizer */}
      <div className="p-4 border-b border-border/30">
        <AudioVisualizer 
          analyser={analyserRef.current} 
          isActive={isConnected && !isMuted}
        />
      </div>

      {/* Chat log */}
      <div className="flex-1 min-h-[200px] max-h-[300px] flex flex-col">
        <ChatLog messages={messages} />
      </div>

      {/* Tool logs */}
      <ToolsDisplay logs={toolLogs} />

      {/* Controls */}
      <div className="p-4 border-t border-border/50 bg-muted/20">
        <div className="flex items-center justify-center gap-4">
          {/* Mute button */}
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full w-12 h-12 ${isMuted ? 'bg-red-500/20 border-red-500 text-red-500' : ''}`}
            onClick={() => setIsMuted(!isMuted)}
            disabled={!isConnected}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>

          {/* Connect/Disconnect button */}
          {connectionState === ConnectionState.DISCONNECTED || connectionState === ConnectionState.ERROR ? (
            <Button
              variant="hero"
              size="lg"
              className="rounded-full px-8"
              onClick={connect}
            >
              <Phone className="w-5 h-5 ml-2" />
              התחל שיחה
            </Button>
          ) : connectionState === ConnectionState.CONNECTING ? (
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full px-8"
              disabled
            >
              <Loader2 className="w-5 h-5 ml-2 animate-spin" />
              מתחבר...
            </Button>
          ) : (
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full px-8"
              onClick={disconnect}
            >
              <PhoneOff className="w-5 h-5 ml-2" />
              סיים שיחה
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveAgent;
