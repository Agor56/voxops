import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import VoiceWaveform from './VoiceWaveform';

interface DemoForm2Props {
  onSubmitted: () => void;
  submissionCount: number;
}

const BUSINESS_TYPES = [
  'רפואה / בריאות', 'נדל"ן', 'עורכי דין', 'שיפוצים', 'מסעדות / אירוח', 'מסחר אלקטרוני', 'אחר',
];
const TIMELINE_OPTIONS = ['מיידית', 'תוך חודש', 'רק רוצה לראות'];

const DemoForm2 = ({ onSubmitted, submissionCount }: DemoForm2Props) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const [timeline, setTimeline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'שדה חובה';
    if (!phone.trim()) { errors.phone = 'שדה חובה'; }
    else if (!/^05\d{8}$/.test(phone.replace(/[-\s]/g, ''))) { errors.phone = 'מספר לא תקין (05X-XXXXXXX)'; }
    if (!businessType) errors.businessType = 'בחרו סוג עסק';
    if (!timeline) errors.timeline = 'בחרו תזמון';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setError('');
    try {
      const cleanPhone = phone.replace(/[-\s]/g, '');
      const { data, error: fnError } = await supabase.functions.invoke('demo-submit-2', {
        body: {
          action: 'submit_demo',
          full_name: fullName.trim(),
          phone_number: cleanPhone,
          business_type: businessType,
          pain_point: painPoint.trim(),
          timeline,
        },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      onSubmitted();
    } catch (err) {
      console.error('Demo submission error:', err);
      setError('משהו השתבש — נסו שוב');
    } finally {
      setLoading(false);
    }
  };

  if (submissionCount >= 3) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">הגעתם למגבלת ההדגמות. צרו קשר להמשך.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12" dir="rtl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center space-y-4">
        <h1 className="section-title">הכירו את בר — <span className="gradient-text">בזמן אמת</span></h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">מלאו את הפרטים למטה, ובר יתקשר אליכם תוך 60 שניות. בלי הקלטה. בלי טריקים. שיחה חיה.</p>
        <VoiceWaveform bars={7} className="mx-auto mt-4" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="glass-card p-8 md:p-10 rounded-2xl max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">שם מלא</label>
          <Input value={fullName} onChange={(e) => { setFullName(e.target.value); setFieldErrors(p => ({ ...p, fullName: '' })); }} placeholder="השם שלכם" dir="rtl" className={fieldErrors.fullName ? 'border-destructive' : ''} />
          {fieldErrors.fullName && <p className="text-destructive text-xs">{fieldErrors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">מספר טלפון</label>
          <div className="relative" dir="ltr">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sm text-muted-foreground pointer-events-none">
              <span>🇮🇱</span><span className="font-mono">+972</span>
            </div>
            <Input value={phone} onChange={(e) => { setPhone(e.target.value); setFieldErrors(p => ({ ...p, phone: '' })); }} placeholder="050-000-0000" type="tel" dir="ltr" className={`pr-24 ${fieldErrors.phone ? 'border-destructive' : ''}`} />
          </div>
          {fieldErrors.phone && <p className="text-destructive text-xs text-right">{fieldErrors.phone}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">סוג העסק</label>
          <div className="flex flex-wrap gap-2">
            {BUSINESS_TYPES.map((type) => (
              <button key={type} type="button" onClick={() => { setBusinessType(type); setFieldErrors(p => ({ ...p, businessType: '' })); }}
                className={`px-4 py-2 rounded-xl border-2 transition-all text-sm font-medium ${businessType === type ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 hover:border-primary/50 text-foreground'}`}>{type}</button>
            ))}
          </div>
          {fieldErrors.businessType && <p className="text-destructive text-xs">{fieldErrors.businessType}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">מה הדבר שהכי מבזבז לכם זמן או כסף היום?</label>
          <Textarea value={painPoint} onChange={(e) => setPainPoint(e.target.value)} placeholder="למשל: לידים שלא עונים, פגישות שמתבטלות..." dir="rtl" rows={2} className="min-h-[72px]" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">מתי הייתם רוצים להתחיל?</label>
          <div className="flex flex-wrap gap-2">
            {TIMELINE_OPTIONS.map((opt) => (
              <button key={opt} type="button" onClick={() => { setTimeline(opt); setFieldErrors(p => ({ ...p, timeline: '' })); }}
                className={`px-4 py-2 rounded-xl border-2 transition-all text-sm font-medium ${timeline === opt ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 hover:border-primary/50 text-foreground'}`}>{opt}</button>
            ))}
          </div>
          {fieldErrors.timeline && <p className="text-destructive text-xs">{fieldErrors.timeline}</p>}
        </div>

        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-sm text-center">{error}</motion.p>}

        <Button variant="hero" size="xl" className="w-full animate-demo-btn-pulse" onClick={handleSubmit} disabled={loading}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>שלחו ובר מתקשר עכשיו<ArrowLeft className="w-5 h-5 mr-2" /></>}
        </Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold font-display text-center mb-6 text-foreground">מה הולך לקרות?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Phone, text: 'בר יתקשר למספר שהזנתם תוך 60 שניות' },
            { icon: MessageSquare, text: 'הוא ינהל שיחה אמיתית — ישאל שאלות ויענה על התנגדויות' },
            { icon: CheckCircle2, text: 'תשמעו בדיוק איך הסוכן עובד עבור הלקוחות שלכם' },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="glass-card p-6 rounded-xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/15 flex-shrink-0"><Icon className="w-5 h-5 text-primary" /></div>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DemoForm2;
