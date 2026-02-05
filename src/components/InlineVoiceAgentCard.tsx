import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI, Modality } from '@google/genai';
import { Phone, Check, ArrowRight, Mic, MicOff, PhoneOff } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { EVE_CONFIG } from '../constants';
import { createPcmBlob, decodeAudioData } from '../utils/audioUtils';
import { AudioStatus } from '../types';
import { supabase } from '@/integrations/supabase/client';

const InlineVoiceAgentCard = () => {
  const { isRTL } = useLanguage();
  const [status, setStatus] = useState<AudioStatus>(AudioStatus.DISCONNECTED);
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
  const micFrameCountRef = useRef(0);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const startCall = useCallback(async () => {
    try {
      setStatus(AudioStatus.CONNECTING);
      setErrorMessage(null);

      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      inputContextRef.current = new AudioContext({ sampleRate: 24000 });
      
      await audioContextRef.current.resume();
      await inputContextRef.current.resume();

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      streamRef.current = stream;

      const { data, error } = await supabase.functions.invoke('gemini-session');
      
      if (error || !data?.apiKey) {
        setErrorMessage("לא ניתן להתחבר");
        setStatus(AudioStatus.ERROR);
        return;
      }

      const { apiKey, model, voiceName } = data;
      const ai = new GoogleGenAI({ apiKey });

      let resolveOpened: (() => void) | null = null;
      const openedPromise = new Promise<void>((resolve) => {
        resolveOpened = resolve;
      });

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
            setStatus(AudioStatus.CONNECTED);
            resolveOpened?.();
          },
          onmessage: async (msg: any) => {
            if (msg?.serverContent?.modelTurn?.parts) {
              for (const part of msg.serverContent.modelTurn.parts) {
                if (part?.inlineData?.data) {
                  setStatus(AudioStatus.SPEAKING);
                  await playAudioChunk(part.inlineData.data);
                }
              }
            }
            if (msg?.serverContent?.interrupted) {
              stopPlayback();
              setStatus(AudioStatus.LISTENING);
            }
            if (msg?.serverContent?.turnComplete) {
              setTimeout(
                () => setStatus((prev) => (prev === AudioStatus.SPEAKING ? AudioStatus.LISTENING : prev)),
                500
              );
            }
          },
          onclose: () => setStatus(AudioStatus.DISCONNECTED),
          onerror: () => {
            setErrorMessage('שגיאת חיבור');
            setStatus(AudioStatus.ERROR);
          }
        }
      });

      sessionRef.current = session;

      await Promise.race([
        openedPromise,
        new Promise<void>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 8000)
        )
      ]);

      startRecording(session);
    } catch (e) {
      setErrorMessage("לא ניתן להתחבר");
      setStatus(AudioStatus.ERROR);
    }
  }, []);

  const startRecording = (session: any) => {
    if (!streamRef.current || !inputContextRef.current) return;
    
    const source = inputContextRef.current.createMediaStreamSource(streamRef.current);
    const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);

    micFrameCountRef.current = 0;
    
    processor.onaudioprocess = (e) => {
      if (isMutedRef.current || !session) return;
      micFrameCountRef.current += 1;

      const inputData = e.inputBuffer.getChannelData(0);
      const pcmData = createPcmBlob(new Float32Array(inputData), 24000);
      
      try {
        session.sendRealtimeInput({ 
          audio: { data: pcmData.data, mimeType: pcmData.mimeType }
        });
      } catch {}
    };
    
    source.connect(processor);
    processor.connect(inputContextRef.current.destination);
    sourceRef.current = source;
    processorRef.current = processor;
    
    setStatus(AudioStatus.LISTENING);
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
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    if (ctx.state === 'suspended') await ctx.resume();
    
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
    } catch {}
  };

  const stopPlayback = () => {
    audioSourcesRef.current.forEach(s => { try { s.stop(); } catch {} });
    audioSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const endCall = () => {
    stopRecording();
    stopPlayback();
    try { sessionRef.current?.close(); } catch {}
    try { audioContextRef.current?.close(); } catch {}
    try { inputContextRef.current?.close(); } catch {}
    sessionRef.current = null;
    audioContextRef.current = null;
    inputContextRef.current = null;
    setStatus(AudioStatus.DISCONNECTED);
    setErrorMessage(null);
  };

  const isConnected = status === AudioStatus.LISTENING || status === AudioStatus.SPEAKING || status === AudioStatus.CONNECTED;
  const isConnecting = status === AudioStatus.CONNECTING;

  const features = [
    'קבלת שיחות נכנסות 24/7',
    'זיהוי כוונת הלקוח בזמן אמת',
    'מענה טבעי בעברית',
    'העברה חלקה לנציג אנושי'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
      className="glass-card-hover p-8 rounded-2xl flex flex-col h-full"
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 ${isRTL ? 'self-end' : 'self-start'}`}>
        <Phone className="w-5 h-5 text-white" />
      </div>

      {/* Title */}
      <h3 className={`text-xl font-bold text-foreground mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        אור - סוכן קבלה קולי
      </h3>

      {/* Description */}
      <p className={`text-muted-foreground mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        נסו את סוכן הקול שלנו עכשיו - דברו איתו ישירות וחוו את היכולות בזמן אמת
      </p>

      {/* Features with checkmarks - only show when not in call */}
      {!isConnected && !isConnecting && (
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, i) => (
            <li 
              key={i} 
              className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
            >
              <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-secondary" />
              </div>
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Active call area */}
      {(isConnected || isConnecting) && (
        <div className="flex-grow flex flex-col items-center justify-center py-6">
          {/* Waveform bars */}
          <div className="flex items-end justify-center gap-1 h-16 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  status === AudioStatus.SPEAKING 
                    ? 'bg-primary animate-pulse' 
                    : status === AudioStatus.LISTENING 
                    ? 'bg-secondary' 
                    : 'bg-muted-foreground'
                }`}
                style={{
                  height: status === AudioStatus.SPEAKING 
                    ? `${20 + Math.random() * 40}px` 
                    : status === AudioStatus.LISTENING 
                    ? `${10 + i * 6}px` 
                    : '8px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>

          {/* Status text */}
          <p className="text-muted-foreground text-sm mb-4">
            {errorMessage ? (
              <span className="text-destructive">{errorMessage}</span>
            ) : status === AudioStatus.SPEAKING ? (
              'מדבר...'
            ) : status === AudioStatus.LISTENING ? (
              'מקשיב...'
            ) : status === AudioStatus.CONNECTING ? (
              'מתחבר...'
            ) : (
              '...'
            )}
          </p>

          {/* Call controls */}
          {isConnected && (
            <div className="flex gap-3">
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                className={`p-3 rounded-full transition-colors ${
                  isMuted 
                    ? 'bg-destructive/20 text-destructive border border-destructive' 
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button 
                onClick={endCall}
                className="p-3 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Suggestions - show during call */}
      {isConnected && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground text-center mb-2">נסו לשאול:</p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {EVE_CONFIG.suggestions.slice(0, 3).map((s, i) => (
              <span 
                key={i} 
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA Button - show when not in call */}
      {!isConnected && !isConnecting && (
        <Button 
          variant="heroGlass"
          className="w-full group"
          onClick={startCall}
        >
          <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            התחל שיחה
            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
          </span>
        </Button>
      )}

      {/* Error retry */}
      {status === AudioStatus.ERROR && (
        <Button 
          variant="outline"
          className="w-full mt-2"
          onClick={startCall}
        >
          נסו שוב
        </Button>
      )}
    </motion.div>
  );
};

export default InlineVoiceAgentCard;
