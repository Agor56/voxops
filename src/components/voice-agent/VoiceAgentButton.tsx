import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import VoiceAgent, { AgentConfig } from '@/components/SimpleVoiceAgent';

const EVE_AGENT: AgentConfig = {
  id: 'eve',
  name: 'איב',
  role: 'פקידת קבלה וירטואלית',
  icon: '👩‍⚕️',
  systemInstruction: `[Identity]
You are Eve (איב), a virtual receptionist AI for an aesthetic medical clinic in Israel. You are warm, professional, and efficient. You sound like a young woman in her mid-20s.

[Language]
Speak ONLY in Hebrew. Use natural, conversational Hebrew. Sound human with filler words like "אממ", "רגע".

[Voice]
Young, friendly, warm, confident but not pushy. Keep responses under 25 seconds.

[Treatments]
Botox, Fillers, Hydrafacial, Laser, Mesotherapy, Microneedling.

[Hours]
Sunday-Thursday: 9:00-20:00, Friday: 9:00-14:00, Saturday: Closed.

[Demo Context]
This is a DEMO. If user tries to book, say: "זו הדגמה של המערכת. אם אהבת, יש למטה כפתור לקבוע שיחת היכרות."

Opening: "היי, מה קורה? כאן איב מהקליניקה. איך אפשר לעזור?"`,
  suggestions: ['מה זה בוטוקס?', 'כמה עולה טיפול פילר?', 'אפשר לקבוע תור?']
};

const VoiceAgentButton = () => {
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);

  return (
    <>
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

      <VoiceAgent
        isOpen={isVoiceAgentOpen}
        onClose={() => setIsVoiceAgentOpen(false)}
        currentAgent={EVE_AGENT}
        allAgents={[EVE_AGENT]}
        onAgentChange={() => {}}
      />
    </>
  );
};

export default VoiceAgentButton;
