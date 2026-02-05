import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { EVE_CONFIG } from '../constants';
import { createPcmBlob, decodeAudioData } from '../utils/audioUtils';
import { Waveform } from './Waveform';
import { AudioStatus } from '../types';
import { X, Mic, MicOff, PhoneOff, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface VoiceAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAgent: React.FC<VoiceAgentProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<AudioStatus>(AudioStatus.DISCONNECTED);
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const isMutedRef = useRef(false);

  // Keep isMutedRef in sync
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus(AudioStatus.DISCONNECTED);
      setErrorMessage(null);
      setIsReady(false);
    }
  }, [isOpen]);

  // CRITICAL: This function MUST be called directly from a user click handler
  // to satisfy iOS Safari's audio autoplay policies
  const startCall = useCallback(async () => {
    try {
      setStatus(AudioStatus.CONNECTING);
      setErrorMessage(null);

      // Step 1: Create AudioContexts SYNCHRONOUSLY during user gesture
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      inputContextRef.current = new AudioContext({ sampleRate: 16000 });
      
      // Resume immediately (required for iOS Safari)
      await audioContextRef.current.resume();
      await inputContextRef.current.resume();
      
      console.log('AudioContexts created and resumed');

      // Step 2: Request microphone permission during user gesture
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
      console.log('Microphone permission granted');

      // Step 3: Fetch API credentials
      console.log('Fetching Gemini credentials...');
      const { data, error } = await supabase.functions.invoke('gemini-session');
      
      if (error || !data?.apiKey) {
        console.error('Failed to get API key:', error);
        setErrorMessage("Could not get API credentials");
        setStatus(AudioStatus.ERROR);
        return;
      }

      const { apiKey, model, voiceName } = data;
      console.log('Got credentials, model:', model, 'voice:', voiceName);

      // Step 4: Connect to Gemini Live API
      const ai = new GoogleGenAI({ apiKey });

      const session = await ai.live.connect({
        model: model || 'gemini-2.0-flash-live-001',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: EVE_CONFIG.systemInstruction,
          speechConfig: {
            voiceConfig: { 
              prebuiltVoiceConfig: { 
                voiceName: voiceName || 'Aoede' 
              } 
            }
          }
        },
        callbacks: {
          onopen: () => {
            console.log('✅ Gemini Live connected');
            setStatus(AudioStatus.CONNECTED);
            startRecording(session);
          },
          onmessage: async (msg: any) => {
            console.log('📨 Message received:', JSON.stringify(msg).substring(0, 200));
            
            // Handle audio data from modelTurn
            if (msg?.serverContent?.modelTurn?.parts) {
              for (const part of msg.serverContent.modelTurn.parts) {
                if (part?.inlineData?.data) {
                  console.log('🔊 Got audio chunk, playing...');
                  setStatus(AudioStatus.SPEAKING);
                  await playAudioChunk(part.inlineData.data);
                }
              }
            }
            
            if (msg?.serverContent?.interrupted) {
              console.log('⚠️ Interrupted');
              stopPlayback();
              setStatus(AudioStatus.LISTENING);
            }
            if (msg?.serverContent?.turnComplete) {
              console.log('✔️ Turn complete');
              setTimeout(() => setStatus(prev => prev === AudioStatus.SPEAKING ? AudioStatus.LISTENING : prev), 500);
            }
          },
          onclose: (event: any) => {
            console.log('❌ Gemini Live disconnected', event);
            setStatus(AudioStatus.DISCONNECTED);
          },
          onerror: (error: any) => {
            console.error('🚨 Gemini Live error', error);
            setErrorMessage("Connection error");
            setStatus(AudioStatus.ERROR);
          }
        }
      });
      
      sessionRef.current = session;
      setIsReady(true);
      
    } catch (e) {
      console.error('Failed to start call:', e);
      setErrorMessage(e instanceof Error ? e.message : "Could not connect");
      setStatus(AudioStatus.ERROR);
    }
  }, []);

  const startRecording = (session: any) => {
    if (!streamRef.current || !inputContextRef.current) {
      console.error('Stream or input context not available');
      return;
    }
    
    const source = inputContextRef.current.createMediaStreamSource(streamRef.current);
    const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
    
    processor.onaudioprocess = (e) => {
      if (isMutedRef.current || !session) return;
      const inputData = e.inputBuffer.getChannelData(0);
      const pcmData = createPcmBlob(new Float32Array(inputData));
      
      try {
        session.sendRealtimeInput({ 
          audio: {
            data: pcmData.data,
            mimeType: pcmData.mimeType
          }
        });
      } catch (err) {
        console.error('Error sending audio:', err);
      }
    };
    
    source.connect(processor);
    processor.connect(inputContextRef.current.destination);
    sourceRef.current = source;
    processorRef.current = processor;
    
    setStatus(AudioStatus.LISTENING);
    console.log('🎤 Microphone recording started');
  };

  const stopRecording = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    sourceRef.current?.disconnect();
    processorRef.current?.disconnect();
    streamRef.current = null;
    sourceRef.current = null;
    processorRef.current = null;
  };

  const playAudioChunk = async (base64Audio: string) => {
    if (!audioContextRef.current) {
      console.error('No audio context for playback');
      return;
    }
    const ctx = audioContextRef.current;
    
    // Resume if suspended (iOS Safari requirement)
    if (ctx.state === 'suspended') {
      console.log('Resuming suspended audio context...');
      await ctx.resume();
    }
    
    try {
      const buffer = await decodeAudioData(base64Audio, ctx);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      
      if (nextStartTimeRef.current < ctx.currentTime) {
        nextStartTimeRef.current = ctx.currentTime;
      }
      
      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += buffer.duration;
      audioSourcesRef.current.add(source);
      
      source.onended = () => {
        audioSourcesRef.current.delete(source);
        if (audioSourcesRef.current.size === 0) {
          setStatus(AudioStatus.LISTENING);
        }
      };
    } catch (err) {
      console.error('Error playing audio chunk:', err);
    }
  };

  const stopPlayback = () => {
    audioSourcesRef.current.forEach(s => { 
      try { s.stop(); } catch {} 
    });
    audioSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const handleClose = () => {
    stopRecording();
    stopPlayback();
    
    try {
      sessionRef.current?.close();
    } catch {}
    
    try {
      audioContextRef.current?.close();
    } catch {}
    
    try {
      inputContextRef.current?.close();
    } catch {}
    
    sessionRef.current = null;
    audioContextRef.current = null;
    inputContextRef.current = null;
    setIsReady(false);
    setStatus(AudioStatus.DISCONNECTED);
    onClose();
  };

  if (!isOpen) return null;

  const isConnected = status === AudioStatus.LISTENING || status === AudioStatus.SPEAKING || status === AudioStatus.CONNECTED;

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
          {!isConnected && status !== AudioStatus.CONNECTING ? (
            // Show Start Call button before connection
            <div className="flex flex-col items-center gap-4">
              <Button 
                onClick={startCall}
                size="lg"
                className="rounded-full w-20 h-20 p-0"
              >
                <Phone className="w-8 h-8" />
              </Button>
              <p className="text-muted-foreground text-sm">לחצו להתחלת שיחה</p>
            </div>
          ) : (
            <>
              <Waveform 
                isSpeaking={status === AudioStatus.SPEAKING} 
                isListening={status === AudioStatus.LISTENING} 
              />
              <div className="mt-4 text-center">
                {errorMessage ? (
                  <p className="text-destructive">{errorMessage}</p>
                ) : (
                  <p className="text-muted-foreground">
                    {status === AudioStatus.SPEAKING 
                      ? 'מדברת...' 
                      : status === AudioStatus.LISTENING 
                      ? 'מקשיבה...' 
                      : status === AudioStatus.CONNECTING 
                      ? 'מתחברת...' 
                      : '...'}
                  </p>
                )}
              </div>
            </>
          )}
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

        {/* Controls - only show when connected */}
        {isConnected && (
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className={`p-4 rounded-full transition-colors ${
                isMuted 
                  ? 'bg-destructive/20 text-destructive border border-destructive' 
                  : 'bg-muted text-foreground'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <button 
              onClick={handleClose}
              className="p-4 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Error retry button */}
        {status === AudioStatus.ERROR && (
          <div className="flex justify-center mt-4">
            <Button variant="secondary" onClick={startCall}>
              נסו שוב
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAgent;
