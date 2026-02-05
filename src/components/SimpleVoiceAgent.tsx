import React, { useRef, useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { createPcmBlob, decodeAudioData } from '@/utils/audio';
import { X, Mic, MicOff, PhoneOff, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export interface AgentConfig {
  id: string;
  name: string;
  role: string;
  icon: string;
  systemInstruction: string;
  suggestions: string[];
}

interface VoiceAgentProps {
  isOpen: boolean;
  onClose: () => void;
  currentAgent: AgentConfig;
  allAgents: AgentConfig[];
  onAgentChange: (id: string) => void;
}

type Status = 'idle' | 'connecting' | 'listening' | 'speaking' | 'error';

const Waveform = ({ isActive }: { isActive: boolean }) => (
  <div className="flex items-center justify-center gap-1 h-16">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="bar"
        style={{
          height: isActive ? undefined : '10%',
          animationPlayState: isActive ? 'running' : 'paused',
          animationDelay: `${i * 0.1}s`
        }}
      />
    ))}
  </div>
);

export const VoiceAgent: React.FC<VoiceAgentProps> = ({
  isOpen,
  onClose,
  currentAgent
}) => {
  const [status, setStatus] = useState<Status>('idle');
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
  const isMutedRef = useRef(false);

  const startCall = useCallback(async () => {
    try {
      setStatus('connecting');
      setErrorMessage(null);

      // Create AudioContexts synchronously during user gesture
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      inputContextRef.current = new AudioContext({ sampleRate: 16000 });
      await audioContextRef.current.resume();
      await inputContextRef.current.resume();

      // Get microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
      });
      streamRef.current = stream;

      // Get API key from edge function
      const { data, error } = await supabase.functions.invoke('gemini-session');
      if (error || !data?.apiKey) {
        throw new Error('Could not get API credentials');
      }

      const { apiKey, model, voiceName } = data;
      const ai = new GoogleGenAI({ apiKey });

      const session = await ai.live.connect({
        model: model || 'gemini-2.0-flash-live-001',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: currentAgent.systemInstruction,
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voiceName || 'Aoede' }
            }
          }
        },
        callbacks: {
          onopen: () => {
            console.log('✅ Connected');
            setStatus('listening');
            startRecording(session);
          },
          onmessage: async (msg: any) => {
            if (msg?.serverContent?.modelTurn?.parts) {
              for (const part of msg.serverContent.modelTurn.parts) {
                if (part?.inlineData?.data) {
                  setStatus('speaking');
                  await playAudio(part.inlineData.data);
                }
              }
            }
            if (msg?.serverContent?.interrupted) {
              stopPlayback();
              setStatus('listening');
            }
            if (msg?.serverContent?.turnComplete) {
              setTimeout(() => setStatus(s => s === 'speaking' ? 'listening' : s), 300);
            }
          },
          onclose: () => setStatus('idle'),
          onerror: (e: any) => {
            console.error('Error:', e);
            setErrorMessage('Connection error');
            setStatus('error');
          }
        }
      });

      sessionRef.current = session;
    } catch (e) {
      console.error('Failed:', e);
      setErrorMessage(e instanceof Error ? e.message : 'Could not connect');
      setStatus('error');
    }
  }, [currentAgent.systemInstruction]);

  const startRecording = (session: any) => {
    if (!streamRef.current || !inputContextRef.current) return;

    const source = inputContextRef.current.createMediaStreamSource(streamRef.current);
    const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);

    processor.onaudioprocess = (e) => {
      if (isMutedRef.current || !session) return;
      const pcm = createPcmBlob(new Float32Array(e.inputBuffer.getChannelData(0)));
      try {
        session.sendRealtimeInput({ audio: { data: pcm.data, mimeType: pcm.mimeType } });
      } catch {}
    };

    source.connect(processor);
    processor.connect(inputContextRef.current.destination);
    sourceRef.current = source;
    processorRef.current = processor;
  };

  const playAudio = async (base64: string) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') await ctx.resume();

    try {
      const buffer = await decodeAudioData(base64, ctx);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(ctx.destination);

      if (nextStartTimeRef.current < ctx.currentTime) {
        nextStartTimeRef.current = ctx.currentTime;
      }
      src.start(nextStartTimeRef.current);
      nextStartTimeRef.current += buffer.duration;
      audioSourcesRef.current.add(src);
      src.onended = () => {
        audioSourcesRef.current.delete(src);
        if (audioSourcesRef.current.size === 0) setStatus('listening');
      };
    } catch {}
  };

  const stopPlayback = () => {
    audioSourcesRef.current.forEach(s => { try { s.stop(); } catch {} });
    audioSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const handleClose = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    sourceRef.current?.disconnect();
    processorRef.current?.disconnect();
    try { sessionRef.current?.close(); } catch {}
    try { audioContextRef.current?.close(); } catch {}
    try { inputContextRef.current?.close(); } catch {}
    sessionRef.current = null;
    setStatus('idle');
    onClose();
  };

  const toggleMute = () => {
    setIsMuted(m => !m);
    isMutedRef.current = !isMutedRef.current;
  };

  if (!isOpen) return null;

  const isConnected = status === 'listening' || status === 'speaking';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" dir="rtl">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-background border border-border rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <button onClick={handleClose} className="absolute left-4 top-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl">{currentAgent.icon}</div>
          <div>
            <h2 className="text-xl font-bold">{currentAgent.name}</h2>
            <p className="text-sm text-muted-foreground">{currentAgent.role}</p>
          </div>
        </div>

        <div className="flex flex-col items-center py-8">
          {!isConnected && status !== 'connecting' ? (
            <div className="flex flex-col items-center gap-4">
              <Button onClick={startCall} size="lg" className="rounded-full w-20 h-20 p-0">
                <Phone className="w-8 h-8" />
              </Button>
              <p className="text-muted-foreground text-sm">לחצו להתחלת שיחה</p>
            </div>
          ) : (
            <>
              <Waveform isActive={status === 'speaking'} />
              <p className="mt-4 text-muted-foreground">
                {status === 'speaking' ? 'מדברת...' : status === 'listening' ? 'מקשיבה...' : status === 'connecting' ? 'מתחברת...' : ''}
              </p>
            </>
          )}
          {errorMessage && <p className="text-destructive mt-2">{errorMessage}</p>}
        </div>

        <div className="mb-6">
          <p className="text-xs text-muted-foreground text-center mb-3">נסו לשאול:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {currentAgent.suggestions.map((s, i) => (
              <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">{s}</span>
            ))}
          </div>
        </div>

        {isConnected && (
          <div className="flex justify-center gap-4">
            <button
              onClick={toggleMute}
              className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-destructive/20 text-destructive border border-destructive' : 'bg-muted'}`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <button onClick={handleClose} className="p-4 rounded-full bg-destructive text-destructive-foreground">
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex justify-center mt-4">
            <Button variant="secondary" onClick={startCall}>נסו שוב</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAgent;
