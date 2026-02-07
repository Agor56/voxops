import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Phone, PhoneOff, Mic, MicOff, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

import { base64ToUint8Array, decodeAudioData, createPcmBlob, resampleFloat32 } from './live-agent/audioUtils';
import AudioVisualizer from './live-agent/AudioVisualizer';
import ChatLog from './live-agent/ChatLog';
import ToolsDisplay from './live-agent/ToolsDisplay';
import { Message, ToolCallLog, ConnectionState } from './live-agent/types';

const MODEL_ID = 'gemini-2.5-flash-native-audio-preview-09-2025';

export interface AgentConfig {
  id: string;
  name: string;
  role: string;
  icon: string;
  voiceName?: string;
  suggestions: string[];
  systemInstruction: string;
  tools?: any[];
  mockSlots?: any[];
}

interface VoiceAgentProps {
  open: boolean;
  onClose: () => void;
  currentAgent: AgentConfig;
  allAgents: AgentConfig[];
  onAgentChange: (agent: AgentConfig) => void;
}

const VoiceAgent = ({ open, onClose, currentAgent, allAgents, onAgentChange }: VoiceAgentProps) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [toolLogs, setToolLogs] = useState<ToolCallLog[]>([]);

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
  const connectionStateRef = useRef<ConnectionState>(ConnectionState.DISCONNECTED);
  const nextPlayTimeRef = useRef<number>(0);

  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { connectionStateRef.current = connectionState; }, [connectionState]);

  const isConnected = connectionState === ConnectionState.CONNECTED;

  const handleToolCall = useCallback((name: string, args: any): string => {
    console.log('🔧 Tool call:', name, args);
    const mockSlots = currentAgent.mockSlots || [];
    let result: string;

    if (name === 'checkAvailability') {
      const treatment = args.treatment?.toLowerCase() || '';
      const slots = mockSlots.filter((s: any) =>
        s.treatment.toLowerCase().includes(treatment) || treatment.includes(s.treatment.toLowerCase())
      );
      result = slots.length > 0
        ? `נמצאו ${slots.length} תורים פנויים: ${slots.map((s: any) => `${s.time} אצל ${s.doctor}`).join(', ')}`
        : 'לא נמצאו תורים פנויים. אפשר לבדוק מחר?';
    } else if (name === 'bookAppointment') {
      result = `התור נקבע בהצלחה! ${args.patientName}, בשעה ${args.time}. נשלח תזכורת ב-SMS.`;
    } else {
      result = 'פעולה לא מוכרת';
    }

    setToolLogs(prev => [...prev, { name, args, result, timestamp: new Date() }]);
    return result;
  }, [currentAgent.mockSlots]);

  const scheduleAudioChunk = useCallback((buffer: AudioBuffer) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(console.error);

    try {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const analyser = analyserRef.current;
      if (analyser) { source.connect(analyser); analyser.connect(ctx.destination); }
      else { source.connect(ctx.destination); }

      const now = ctx.currentTime;
      const startTime = Math.max(now, nextPlayTimeRef.current);
      source.start(startTime);
      nextPlayTimeRef.current = startTime + buffer.duration;
      isPlayingRef.current = true;

      source.onended = () => {
        if (ctx.currentTime >= nextPlayTimeRef.current - 0.01) isPlayingRef.current = false;
      };
    } catch (err) { console.error('❌ Playback error:', err); }
  }, []);

  const queueAudio = useCallback((base64: string) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    try {
      const data = base64ToUint8Array(base64);
      const buffer = decodeAudioData(data, ctx);
      if (buffer.length <= 1) return;
      scheduleAudioChunk(buffer);
    } catch (err) { console.error('❌ Audio decode error:', err); }
  }, [scheduleAudioChunk]);

  const handleServerMessage = useCallback((message: LiveServerMessage) => {
    if (message.serverContent?.modelTurn?.parts) {
      for (const part of message.serverContent.modelTurn.parts) {
        if (part.inlineData?.data) queueAudio(part.inlineData.data);
        if ((part as any).text) {
          const text = (part as any).text as string;
          if (text.trim()) {
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === 'model') return prev.map((m, i) => i === prev.length - 1 ? { ...m, text: m.text + text } : m);
              return [...prev, { id: crypto.randomUUID(), role: 'model', text, timestamp: new Date() }];
            });
          }
        }
      }
    }

    if (message.serverContent?.outputTranscription?.text) {
      const text = message.serverContent.outputTranscription.text;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'model') return prev.map((m, i) => i === prev.length - 1 ? { ...m, text: m.text + text } : m);
        return [...prev, { id: crypto.randomUUID(), role: 'model', text, timestamp: new Date() }];
      });
    }

    if (message.serverContent?.inputTranscription?.text) {
      const text = message.serverContent.inputTranscription.text;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'user') return prev.map((m, i) => i === prev.length - 1 ? { ...m, text: m.text + text } : m);
        return [...prev, { id: crypto.randomUUID(), role: 'user', text, timestamp: new Date() }];
      });
    }

    if (message.toolCall?.functionCalls) {
      for (const call of message.toolCall.functionCalls) {
        const result = handleToolCall(call.name, call.args);
        sessionRef.current?.sendToolResponse({
          functionResponses: [{ id: call.id, name: call.name, response: { result } }]
        });
      }
    }
  }, [queueAudio, handleToolCall]);

  const startRecording = useCallback(() => {
    if (!streamRef.current || !inputContextRef.current || !sessionRef.current) return;
    const ctx = inputContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const source = ctx.createMediaStreamSource(streamRef.current);
    const processor = ctx.createScriptProcessor(2048, 1, 1);
    let frameCount = 0;

    processor.onaudioprocess = (e) => {
      if (isMutedRef.current || !sessionRef.current) return;
      frameCount++;
      const inputData = e.inputBuffer.getChannelData(0);
      const sourceSampleRate = e.inputBuffer.sampleRate;
      const resampled = sourceSampleRate === 16000
        ? new Float32Array(inputData)
        : resampleFloat32(new Float32Array(inputData), sourceSampleRate, 16000);
      const pcm = createPcmBlob(resampled);

      try {
        sessionRef.current.sendRealtimeInput({ audio: { data: pcm.data, mimeType: pcm.mimeType } });
      } catch (err) { console.error('❌ Send audio error:', err); }
    };

    source.connect(processor);
    processor.connect(ctx.destination);
    sourceRef.current = source;
    processorRef.current = processor;
  }, []);

  const cleanupResources = useCallback(() => {
    if (sourceRef.current) { try { sourceRef.current.disconnect(); } catch {} sourceRef.current = null; }
    if (processorRef.current) { try { processorRef.current.disconnect(); } catch {} processorRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (inputContextRef.current) { try { inputContextRef.current.close(); } catch {} inputContextRef.current = null; }
    if (audioContextRef.current) { try { audioContextRef.current.close(); } catch {} audioContextRef.current = null; }
    if (sessionRef.current) { try { sessionRef.current.close(); } catch {} sessionRef.current = null; }
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    nextPlayTimeRef.current = 0;
    analyserRef.current = null;
  }, []);

  const connect = useCallback(async () => {
    setConnectionState(ConnectionState.CONNECTING);
    setMessages([]);
    setToolLogs([]);

    try {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      inputContextRef.current = new AudioContext({ sampleRate: 16000 });
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true }
      });

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        }
      });
      if (!res.ok) throw new Error('Failed to get API key');
      const { apiKey } = await res.json();

      const client = new GoogleGenAI({ apiKey });
      const voiceName = currentAgent.voiceName || 'Zephyr';

      const session = await client.live.connect({
        model: MODEL_ID,
        callbacks: {
          onopen: () => console.log('🟢 Session opened'),
          onmessage: handleServerMessage,
          onerror: (err) => { console.error('🔴 Session error:', err); toast.error('שגיאה בחיבור'); setConnectionState(ConnectionState.ERROR); },
          onclose: () => { console.log('🔴 Session closed'); setConnectionState(ConnectionState.DISCONNECTED); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
          systemInstruction: { parts: [{ text: currentAgent.systemInstruction }] },
          tools: currentAgent.tools ? [{ functionDeclarations: currentAgent.tools }] : undefined,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        }
      });

      sessionRef.current = session;
      setConnectionState(ConnectionState.CONNECTED);
      startRecording();
    } catch (err) {
      console.error('Connection error:', err);
      toast.error('שגיאה בהתחברות. נסו שוב.');
      cleanupResources();
      setConnectionState(ConnectionState.ERROR);
    }
  }, [handleServerMessage, startRecording, currentAgent, cleanupResources]);

  const disconnect = useCallback(() => {
    cleanupResources();
    setConnectionState(prev => prev === ConnectionState.DISCONNECTED ? prev : ConnectionState.DISCONNECTED);
    setIsMuted(false);
  }, [cleanupResources]);

  // Cleanup on unmount or close
  useEffect(() => {
    return () => { disconnect(); };
  }, [disconnect]);

  useEffect(() => {
    if (!open && isConnected) disconnect();
  }, [open, isConnected, disconnect]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget && !isConnected) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg mx-4"
        >
          <div className="flex flex-col bg-card rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-border/50 bg-muted/30">
              <div className="flex items-center gap-3" dir="rtl">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                  {currentAgent.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{currentAgent.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentAgent.role}</p>
                </div>
                <div className={`mr-auto w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' :
                  connectionState === ConnectionState.CONNECTING ? 'bg-yellow-500 animate-pulse' :
                  'bg-muted-foreground'
                }`} />
                <button
                  onClick={() => { if (!isConnected) onClose(); }}
                  className={`mr-2 p-1.5 rounded-lg hover:bg-muted/50 transition-colors ${isConnected ? 'opacity-30 cursor-not-allowed' : ''}`}
                  disabled={isConnected}
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Visualizer */}
            <div className="p-4 border-b border-border/30">
              <AudioVisualizer analyser={analyserRef.current} isActive={isConnected && !isMuted} />
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
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full w-12 h-12 ${isMuted ? 'bg-red-500/20 border-red-500 text-red-500' : ''}`}
                  onClick={() => setIsMuted(!isMuted)}
                  disabled={!isConnected}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>

                {connectionState === ConnectionState.DISCONNECTED || connectionState === ConnectionState.ERROR ? (
                  <Button variant="hero" size="lg" className="rounded-full px-8" onClick={connect}>
                    <Phone className="w-5 h-5 ml-2" />
                    התחל שיחה
                  </Button>
                ) : connectionState === ConnectionState.CONNECTING ? (
                  <Button variant="secondary" size="lg" className="rounded-full px-8" disabled>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    מתחבר...
                  </Button>
                ) : (
                  <Button variant="destructive" size="lg" className="rounded-full px-8" onClick={disconnect}>
                    <PhoneOff className="w-5 h-5 ml-2" />
                    סיים שיחה
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceAgent;
