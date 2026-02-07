import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import PinGate from '@/components/demo/PinGate';
import DemoForm from '@/components/demo/DemoForm';
import LiveCallScreen from '@/components/demo/LiveCallScreen';

type DemoState = 'pin' | 'form' | 'call';

const CallDemo = () => {
  const [state, setState] = useState<DemoState>('pin');
  const [submissionCount, setSubmissionCount] = useState(0);

  // Set noindex meta tag
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const handlePinSuccess = () => {
    setState('form');
  };

  const handleSubmitted = () => {
    setSubmissionCount((c) => c + 1);
    setState('call');
  };

  const handleReset = () => {
    setState('form');
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="hero-glow absolute top-[20%] right-[10%] w-[500px] h-[500px] opacity-15" />
        <div className="hero-glow hero-glow-secondary absolute bottom-[20%] left-[10%] w-[400px] h-[400px] opacity-10" />
      </div>

      {/* Header (only after PIN) */}
      {state !== 'pin' && <Header />}

      <AnimatePresence mode="wait">
        {state === 'pin' && (
          <motion.div
            key="pin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PinGate onSuccess={handlePinSuccess} />
          </motion.div>
        )}

        {state === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="pt-28 pb-16"
          >
            <div className="container mx-auto relative z-10">
              <DemoForm onSubmitted={handleSubmitted} submissionCount={submissionCount} />
            </div>
          </motion.div>
        )}

        {state === 'call' && (
          <motion.div
            key="call"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="pt-28 pb-16"
          >
            <div className="container mx-auto relative z-10">
              <LiveCallScreen onReset={handleReset} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CallDemo;
