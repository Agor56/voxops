import { motion } from 'framer-motion';
import { PhoneOutgoing, Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface AdamAgentCardProps {
  className?: string;
}

const AdamAgentCard = ({ className = '' }: AdamAgentCardProps) => {
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const agentData = {
    name: 'בר - סוכן מכירות יוצא',
    description: 'מתקשר ללידים תוך 60 דקות, מסנן הרציניים, קובע פגישות - הצוות שלכם מטפל רק במי שבאמת מגיע.',
    features: [
      'קריאה מהירה = 65% המרה גבוהה יותר',
      'מסנן וקובע פגישות אוטומטית',
      'עוקב אחרי לידים חמים עד קביעה',
      'מחזיר לקוחות רדומים (6+ חודשים)',
      'מסתנכרן עם היומן וה-CRM'
    ],
    cta: 'שמעו את בר'
  };

  return (
    <motion.div
      layout
      className={`glass-card-hover rounded-2xl flex flex-col overflow-hidden ${className}`}
    >
      <div className="p-8 flex flex-col h-full">
        <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 ${isRTL ? 'self-end' : 'self-start'}`}>
          <PhoneOutgoing className="w-5 h-5 text-white" />
        </div>

        <h3 className={`text-xl font-bold text-foreground mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
          {agentData.name}
        </h3>

        <p className={`text-muted-foreground mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          {agentData.description}
        </p>

        <ul className="space-y-3 mb-8 flex-grow">
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
        </ul>

        <Button
          variant="heroGlass"
          className="w-full group"
          onClick={() => navigate('/calldemo2')}
        >
          <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            {agentData.cta}
            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
          </span>
        </Button>
      </div>
    </motion.div>
  );
};

export default AdamAgentCard;
