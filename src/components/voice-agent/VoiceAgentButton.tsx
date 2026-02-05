import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { VoiceAgent } from '@/components/VoiceAgent';

const VoiceAgentButton = () => {
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => setIsVoiceAgentOpen(true)}
        className="voice-agent-fab fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        dir="rtl"
      >
        <Mic className="w-5 h-5" />
        <span className="font-medium">דברו עם איב</span>
      </motion.button>

      {/* Voice Agent Modal */}
      <VoiceAgent 
        isOpen={isVoiceAgentOpen} 
        onClose={() => setIsVoiceAgentOpen(false)} 
      />
    </>
  );
};

export default VoiceAgentButton;
