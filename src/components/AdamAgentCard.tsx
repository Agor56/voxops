import { motion } from 'framer-motion';
import { PhoneOutgoing, Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { useNavigate } from 'react-router-dom';

import { Message, ToolCallLog, ConnectionState } from './live-agent/types';
import { MOCK_SLOTS } from './live-agent/constants';
import { ADAM_SYSTEM_INSTRUCTION, ADAM_TOOLS, ADAM_SUGGESTION_CHIPS } from './live-agent/adamConstants';
import { base64ToUint8Array, decodeAudioData, createPcmBlob, resampleFloat32 } from './live-agent/audioUtils';

const MODEL_ID = 'gemini-2.5-flash-native-audio-preview-09-2025';
const VOICE_NAME = 'Fenrir';

interface AdamAgentCardProps {
  className?: string;
}

const AdamAgentCard = ({ className = '' }: AdamAgentCardProps) => {
  const { t, isRTL } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
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
  const connectionStateRef = useRef<ConnectionState>(ConnectionState.DISCONNECTED);
  const nextPlayTimeRef = useRef<number>(0);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    connectionStateRef.current = connectionState;
  }, [connectionState]);

  const isConnected = connectionState === ConnectionState.CONNECTED;
  const isConnecting = connectionState === ConnectionState.CONNECTING;

  // Tool handlers
  const handleToolCall = useCallback((name: string, args: any): string => {
    console.log('Tool call:', name, args);
    
    let result: string;
    
    if (name === 'checkAvailability') {
      const treatment = args.treatment?.toLowerCase() || '';
      const slots = MOCK_SLOTS.filter(s => 
        s.treatment.toLowerCase().includes(treatment) ||
        treatment.includes(s.treatment.toLowerCase())
      );
      
      if (slots.length > 0) {
        result = `נמצאו ${slots.length} פגישות פנויות: ${slots.map(s => `${s.time} אצל ${s.doctor}`).join(', ')}`;
      } else {
        result = 'לא נמצאו פגישות פנויות להתמחות זו היום. אפשר לבדוק מחר?';
      }
    } else if (name === 'bookAppointment') {
      result = `הפגישה נקבעה בהצלחה! ${args.patientName}, בשעה ${args.time}. נשלח תזכורת ב-SMS.`;
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

  // Gapless audio playback
  const scheduleAudioChunk = useCallback((buffer: AudioBuffer) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(console.error);
    }

    try {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      
      const analyser = analyserRef.current;
      if (analyser) {
        source.connect(analyser);
        analyser.connect(ctx.destination);
      } else {
        source.connect(ctx.destination);
      }

      const now = ctx.currentTime;
      const startTime = Math.max(now, nextPlayTimeRef.current);
      
      source.start(startTime);
      nextPlayTimeRef.current = startTime + buffer.duration;
      
      isPlayingRef.current = true;
      
      source.onended = () => {
        if (ctx.currentTime >= nextPlayTimeRef.current - 0.01) {
          isPlayingRef.current = false;
        }
      };
    } catch (err) {
      console.error('Playback error:', err);
    }
  }, []);

  const queueAudio = useCallback((base64: string) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    
    try {
      const data = base64ToUint8Array(base64);
      const buffer = decodeAudioData(data, ctx);
      
      if (buffer.length <= 1) return;
      
      scheduleAudioChunk(buffer);
    } catch (err) {
      console.error('Audio decode error:', err);
    }
  }, [scheduleAudioChunk]);

  // Message handler
  const handleServerMessage = useCallback((message: LiveServerMessage) => {
    if (message.serverContent?.modelTurn?.parts) {
      for (const part of message.serverContent.modelTurn.parts) {
        if (part.inlineData?.data) {
          queueAudio(part.inlineData.data);
        }
        if ((part as any).text) {
          const text = (part as any).text as string;
          if (text.trim()) {
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === 'model') {
                return prev.map((m, i) => (i === prev.length - 1 ? { ...m, text: m.text + text } : m));
              }
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
        if (last?.role === 'model') {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, text: m.text + text } : m);
        }
        return [...prev, { id: crypto.randomUUID(), role: 'model', text, timestamp: new Date() }];
      });
    }

    if (message.serverContent?.inputTranscription?.text) {
      const text = message.serverContent.inputTranscription.text;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'user') {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, text: m.text + text } : m);
        }
        return [...prev, { id: crypto.randomUUID(), role: 'user', text, timestamp: new Date() }];
      });
    }

    if (message.toolCall?.functionCalls) {
      for (const call of message.toolCall.functionCalls) {
        const result = handleToolCall(call.name, call.args);
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
    if (!streamRef.current || !inputContextRef.current || !sessionRef.current) return;

    const ctx = inputContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const source = ctx.createMediaStreamSource(streamRef.current);
    const processor = ctx.createScriptProcessor(2048, 1, 1);

    processor.onaudioprocess = (e) => {
      if (isMutedRef.current) return;
      if (!sessionRef.current) return;
      
      const inputData = e.inputBuffer.getChannelData(0);
      const sourceSampleRate = e.inputBuffer.sampleRate;
      const resampled = sourceSampleRate === 16000
        ? new Float32Array(inputData)
        : resampleFloat32(new Float32Array(inputData), sourceSampleRate, 16000);

      const pcm = createPcmBlob(resampled);

      try {
        sessionRef.current.sendRealtimeInput({
          audio: { data: pcm.data, mimeType: pcm.mimeType }
        });
      } catch (err) {
        console.error('Send audio error:', err);
      }
    };

    source.connect(processor);
    processor.connect(ctx.destination);
    sourceRef.current = source;
    processorRef.current = processor;
  }, []);

  // Connect to Gemini
  const connect = useCallback(async () => {
    setIsExpanded(true);
    setConnectionState(ConnectionState.CONNECTING);
    setMessages([]);
    setToolLogs([]);

    try {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      inputContextRef.current = new AudioContext({ sampleRate: 16000 });
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

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

      if (!res.ok) throw new Error('Failed to get API key');

      const { apiKey } = await res.json();
      const client = new GoogleGenAI({ apiKey });
      
      const session = await client.live.connect({
        model: MODEL_ID,
        callbacks: {
          onopen: () => console.log('Adam session opened'),
          onmessage: handleServerMessage,
          onerror: (err) => {
            console.error('Session error:', err);
            toast.error('שגיאה בחיבור');
            setConnectionState(ConnectionState.ERROR);
          },
          onclose: () => {
            console.log('Adam session closed');
            setConnectionState(ConnectionState.DISCONNECTED);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: VOICE_NAME }
            }
          },
          systemInstruction: { parts: [{ text: ADAM_SYSTEM_INSTRUCTION }] },
          tools: [{ functionDeclarations: ADAM_TOOLS }],
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
  }, [handleServerMessage, startRecording]);

  const cleanupResources = useCallback(() => {
    if (sourceRef.current) {
      try { sourceRef.current.disconnect(); } catch {}
      sourceRef.current = null;
    }
    if (processorRef.current) {
      try { processorRef.current.disconnect(); } catch {}
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (inputContextRef.current) {
      try { inputContextRef.current.close(); } catch {}
      inputContextRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch {}
      audioContextRef.current = null;
    }
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch {}
      sessionRef.current = null;
    }
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    nextPlayTimeRef.current = 0;
    analyserRef.current = null;
  }, []);

  const disconnect = useCallback(() => {
    cleanupResources();
    setConnectionState(ConnectionState.DISCONNECTED);
    setIsMuted(false);
    setIsExpanded(false);
  }, [cleanupResources]);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  // Adam agent data
  const agentData = {
    name: 'אדם - סוכן מכירות יוצא',
    description: 'מתקשר ללידים תוך 60 דקות, מסנן הרציניים, קובע פגישות - הצוות שלכם מטפל רק במי שבאמת מגיע.',
    features: [
      'קריאה מהירה = 65% המרה גבוהה יותר',
      'מסנן וקובע פגישות אוטומטית',
      'עוקב אחרי לידים חמים עד קביעה',
      'מחזיר לקוחות רדומים (6+ חודשים)',
      'מסתנכרן עם היומן וה-CRM'
    ],
    cta: 'שמעו את אדם'
  };

  return (
    <motion.div
      layout
      className={`glass-card-hover rounded-2xl flex flex-col overflow-hidden ${className}`}
      style={{ minHeight: isExpanded ? '480px' : 'auto' }}
    >
      <div className="p-8 flex flex-col h-full">
        {/* Icon - Top */}
        <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 ${isRTL ? 'self-end' : 'self-start'}`}>
          <PhoneOutgoing className="w-5 h-5 text-white" />
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold text-foreground mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
          {agentData.name}
        </h3>

        {/* Description - hide when expanded */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.p 
              initial={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`text-muted-foreground mb-6 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {agentData.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Features - hide when expanded */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.ul 
              initial={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 mb-8 flex-grow"
            >
              {agentData.features.map((feature, i) => (
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
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Expanded State - Call Interface */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex-1 flex flex-col min-h-0"
            >
              {/* Status */}
              <div className={`text-sm text-muted-foreground mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isConnecting && 'מתחבר...'}
                {isConnected && !isMuted && 'מקשיב...'}
                {isConnected && isMuted && 'מושתק'}
                {connectionState === ConnectionState.ERROR && 'שגיאה בחיבור'}
              </div>

              {/* Transcript Area */}
              <div 
                className="flex-1 min-h-[180px] max-h-[200px] overflow-y-auto rounded-xl bg-background/50 border border-border/30 p-4 mb-4"
                dir="rtl"
              >
                {messages.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center">
                    {isConnecting ? 'מתחבר...' : 'התחילו לדבר...'}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`text-sm ${
                          msg.role === 'user' 
                            ? 'text-muted-foreground' 
                            : 'text-foreground font-medium'
                        }`}
                      >
                        <span className="text-xs text-muted-foreground/60 ml-2">
                          {msg.role === 'user' ? 'אתם:' : 'אדם:'}
                        </span>
                        {msg.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-2 mb-4 justify-end" dir="rtl">
                {ADAM_SUGGESTION_CHIPS.map((chip, i) => (
                  <button
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-colors"
                    onClick={() => {
                      // Could send as text if we implement that
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Call Controls */}
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full w-12 h-12 ${isMuted ? 'bg-red-500/20 border-red-500 text-red-500' : ''}`}
                  onClick={() => setIsMuted(!isMuted)}
                  disabled={!isConnected}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>

                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded-full px-6"
                  onClick={disconnect}
                >
                  <PhoneOff className="w-5 h-5 ml-2" />
                  סיום שיחה
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Button - only when not expanded */}
        {!isExpanded && (
          <Button 
            variant="heroGlass"
            className="w-full group"
            onClick={connect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                מתחבר...
              </span>
            ) : (
              <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {agentData.cta}
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
              </span>
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default AdamAgentCard;
