import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Phone, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VoiceWaveform from './VoiceWaveform';

interface LiveCallScreenProps {
  onReset: () => void;
}

const LiveCallScreen = ({ onReset }: LiveCallScreenProps) => {
  const [seconds, setSeconds] = useState(60);
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Ring sound using Web Audio API
  const startRingSound = useCallback(() => {
    if (muted) return;
    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 440;
      gain.gain.value = 0.05;
      osc.connect(gain);
      gain.connect(ctx.destination);

      // Pulsing ring pattern
      const now = ctx.currentTime;
      for (let i = 0; i < 60; i++) {
        gain.gain.setValueAtTime(0.05, now + i * 2);
        gain.gain.setValueAtTime(0, now + i * 2 + 0.5);
        gain.gain.setValueAtTime(0.05, now + i * 2 + 0.7);
        gain.gain.setValueAtTime(0, now + i * 2 + 1.2);
      }

      osc.start();
      oscillatorRef.current = osc;
    } catch (e) {
      console.log('Audio not supported:', e);
    }
  }, [muted]);

  const stopRingSound = useCallback(() => {
    try {
      oscillatorRef.current?.stop();
      oscillatorRef.current = null;
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    startRingSound();
    return () => stopRingSound();
  }, [startRingSound, stopRingSound]);

  // Toggle mute
  const toggleMute = () => {
    if (muted) {
      setMuted(false);
      if (!inCall) startRingSound();
    } else {
      setMuted(true);
      stopRingSound();
    }
  };

  // Countdown
  useEffect(() => {
    if (seconds <= 0) {
      setInCall(true);
      stopRingSound();
      return;
    }
    const timer = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, stopRingSound]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 gap-8 relative"
      dir="rtl"
    >
      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-4 left-4 p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        aria-label={muted ? 'הפעל צליל' : 'השתק'}
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* Icon area */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {!inCall ? (
          <>
            {/* Pulsing rings */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                style={{
                  animation: `demo-call-ring 2.4s ease-out infinite`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            ))}
            {/* Phone icon */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
              <Phone className="w-10 h-10 text-primary animate-[demo-phone-vibrate_0.3s_ease-in-out_infinite]" />
            </div>
          </>
        ) : (
          <VoiceWaveform bars={9} className="h-20" active />
        )}
      </div>

      {/* Headline */}
      <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground text-center">
        {inCall ? 'בר בשיחה' : 'בר מתקשר אליכם עכשיו...'}
      </h2>

      {/* Countdown or subtext */}
      {!inCall ? (
        <div className="text-center space-y-3">
          <div
            className="text-7xl md:text-8xl font-mono font-bold text-primary"
            style={{
              textShadow: '0 0 30px hsl(168 100% 40% / 0.5), 0 0 60px hsl(168 100% 40% / 0.3)',
              animation: 'demo-countdown-glow 1s ease-in-out infinite',
            }}
          >
            {seconds}
          </div>
          <p className="text-muted-foreground">תרימו את הטלפון ותנו לבר לעבוד</p>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <Button variant="outline" onClick={onReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            הפעלה מחדש
          </Button>
        </div>
      )}

      {/* Powered by */}
      <p className="text-xs text-muted-foreground/50 mt-8">powered by VoxOps</p>
    </motion.div>
  );
};

export default LiveCallScreen;
