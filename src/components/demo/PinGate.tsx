import { useState } from 'react';
import { motion } from 'framer-motion';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface PinGateProps {
  onSuccess: () => void;
}

const PinGate = ({ onSuccess }: PinGateProps) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComplete = async (value: string) => {
    setPin(value);
    if (value.length !== 4) return;

    setLoading(true);
    setError('');

    try {
      const { data, error: fnError } = await supabase.functions.invoke('demo-submit', {
        body: { action: 'validate_pin', pin: value },
      });

      if (fnError) throw fnError;

      if (data?.valid) {
        onSuccess();
      } else {
        setShake(true);
        setError('קוד שגוי');
        setPin('');
        setTimeout(() => setShake(false), 600);
      }
    } catch (err) {
      console.error('PIN validation error:', err);
      setShake(true);
      setError('שגיאה בבדיקת הקוד');
      setPin('');
      setTimeout(() => setShake(false), 600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative" dir="rtl">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        {/* Logo */}
        <span className="text-2xl font-bold font-display text-foreground opacity-90">VoxOps</span>

        {/* Headline */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground">הדגמה פרטית</h1>
          <p className="text-muted-foreground">הזינו את קוד הגישה</p>
        </div>

        {/* PIN Input */}
        <motion.div
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <InputOTP
            maxLength={4}
            value={pin}
            onChange={(value) => {
              setPin(value);
              setError('');
            }}
            onComplete={handleComplete}
            disabled={loading}
          >
            <InputOTPGroup className="gap-3" dir="ltr">
              {[0, 1, 2, 3].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-14 h-14 text-2xl font-mono rounded-xl border-border/50 bg-card/60 backdrop-blur-sm text-foreground"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </motion.div>

        {/* Loading */}
        {loading && (
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        )}

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-sm font-medium"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default PinGate;
