import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { EVE_CONFIG } from '../constants';
import { createPcmBlob, decodeAudioData } from '../utils/audioUtils';
import { Waveform } from './Waveform';
import { AudioStatus } from '../types';
import { X, Mic, MicOff, PhoneOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface VoiceAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAgent: React.FC<VoiceAgentProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<AudioStatus>(AudioStatus.CONNECTING);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const initializedRef = useRef(false);
  const isMutedRef = useRef(false);

  // Keep isMutedRef in sync
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (!isOpen) {
      initializedRef.current = false;
      return;
    }
    if (initializedRef.current) return;
    initializedRef.current = true;

    const startSession = async () => {
      try {
        // Fetch API key from edge function
        console.log('Fetching Gemini credentials...');
        const { data, error } = await supabase.functions.invoke('gemini-session');
        
        if (error || !data?.apiKey) {
          console.error('Failed to get API key:', error);
          setErrorMessage("Could not get API credentials");
          setStatus(AudioStatus.ERROR);
          return;
        }

        console.log('Got API key, connecting to Gemini Live...');
        const ai = new GoogleGenAI({ apiKey: data.apiKey });
        audioContextRef.current = new AudioContext({ sampleRate: 24000 });
        inputContextRef.current = new AudioContext({ sampleRate: 16000 });

        const session = await ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-12-2025',
          config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: EVE_CONFIG.systemInstruction,
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
            }
          },
          callbacks: {
            onopen: async () => {
              console.log('Gemini Live connected');
              setStatus(AudioStatus.CONNECTED);
              await startRecording(session);
              setStatus(AudioStatus.LISTENING);
            },
            onmessage: async (msg: any) => {
              console.log('Received message:', msg?.type || 'serverContent');
              
              // Handle audio data from modelTurn
              if (msg?.serverContent?.modelTurn?.parts) {
                for (const part of msg.serverContent.modelTurn.parts) {
                  if (part?.inlineData?.data) {
                    console.log('Got audio chunk, playing...');
                    setStatus(AudioStatus.SPEAKING);
                    await playAudioChunk(part.inlineData.data);
                  }
                }
              }
              
              if (msg?.serverContent?.interrupted) {
                console.log('Interrupted');
                stopPlayback();
                setStatus(AudioStatus.LISTENING);
              }
              if (msg?.serverContent?.turnComplete) {
                console.log('Turn complete');
                setTimeout(() => setStatus(prev => prev === AudioStatus.SPEAKING ? AudioStatus.LISTENING : prev), 500);
              }
            },
            onclose: (event: any) => {
              console.log('Gemini Live disconnected', event);
              setStatus(AudioStatus.DISCONNECTED);
            },
            onerror: (error: any) => {
              console.error('Gemini Live error', error);
              setErrorMessage("Connection error");
              setStatus(AudioStatus.ERROR);
            }
          }
        });
        sessionRef.current = session;
      } catch (e) {
        console.error('Failed to start session', e);
        setErrorMessage("Could not connect");
        setStatus(AudioStatus.ERROR);
      }
    };

    startSession();

    return () => {
      stopRecording();
      stopPlayback();
      sessionRef.current?.close();
      audioContextRef.current?.close();
      inputContextRef.current?.close();
    };
  }, [isOpen]);

  const startRecording = async (session: any) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      streamRef.current = stream;
      if (!inputContextRef.current) return;
      const source = inputContextRef.current.createMediaStreamSource(stream);
      const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
      processor.onaudioprocess = (e) => {
        if (isMutedRef.current) return;
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmData = createPcmBlob(new Float32Array(inputData));
        // Send audio using the correct Gemini Live API format
        session.sendRealtimeInput({ 
          audio: {
            data: pcmData.data,
            mimeType: pcmData.mimeType
          }
        });
      };
      source.connect(processor);
      processor.connect(inputContextRef.current.destination);
      sourceRef.current = source;
      processorRef.current = processor;
      console.log('Microphone recording started');
    } catch (err) {
      console.error('Microphone access error', err);
      setErrorMessage("Microphone access denied");
    }
  };

  const stopRecording = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    sourceRef.current?.disconnect();
    processorRef.current?.disconnect();
  };

  const playAudioChunk = async (base64Audio: string) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    // Resume if suspended
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    const buffer = await decodeAudioData(base64Audio, ctx);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    if (nextStartTimeRef.current < ctx.currentTime) nextStartTimeRef.current = ctx.currentTime;
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += buffer.duration;
    audioSourcesRef.current.add(source);
    source.onended = () => {
      audioSourcesRef.current.delete(source);
      if (audioSourcesRef.current.size === 0) setStatus(AudioStatus.LISTENING);
    };
  };

  const stopPlayback = () => {
    audioSourcesRef.current.forEach(s => { try { s.stop(); } catch {} });
    audioSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const handleClose = () => {
    stopRecording();
    stopPlayback();
    sessionRef.current?.close();
    audioContextRef.current?.close();
    inputContextRef.current?.close();
    sessionRef.current = null;
    audioContextRef.current = null;
    inputContextRef.current = null;
    initializedRef.current = false;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" dir="rtl">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-background border border-border rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute left-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl">{EVE_CONFIG.icon}</div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{EVE_CONFIG.name}</h2>
            <p className="text-sm text-muted-foreground">{EVE_CONFIG.role}</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col items-center py-8">
          <Waveform 
            isSpeaking={status === AudioStatus.SPEAKING} 
            isListening={status === AudioStatus.LISTENING} 
          />
          <div className="mt-4 text-center">
            {errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <p className="text-muted-foreground">
                {status === AudioStatus.SPEAKING 
                  ? 'מדברת...' 
                  : status === AudioStatus.LISTENING 
                  ? 'מקשיבה...' 
                  : status === AudioStatus.CONNECTING 
                  ? 'מתחברת...' 
                  : status === AudioStatus.DISCONNECTED
                  ? 'מנותקת'
                  : '...'}
              </p>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground text-center mb-3">נסו לשאול:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {EVE_CONFIG.suggestions.map((s, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            className={`p-4 rounded-full transition-colors ${
              isMuted 
                ? 'bg-red-500/20 text-red-500 border border-red-500' 
                : 'bg-muted text-foreground'
            }`}
            disabled={status !== AudioStatus.LISTENING && status !== AudioStatus.SPEAKING}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          <button 
            onClick={handleClose}
            className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgent;
