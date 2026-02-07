import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VoiceAgent, { type AgentConfig } from '@/components/VoiceAgent';
import Header from '@/components/Header';

// ─── Agent Config ───────────────────────────────────────────────
const BM_AGENT: AgentConfig = {
  id: 'building',
  name: 'נועה (Noa)',
  role: 'ניהול מבנים',
  icon: '🏢',
  voiceName: 'Zephyr',
  suggestions: [
    'יש לי בעיה באינסטלציה',
    'מה שעות הפעילות?',
    'איך מדווחים על תקלה?',
  ],
  systemInstruction: `
[Identity] You are Noa, a warm professional AI voice assistant for a building management company. Handle maintenance, tenant questions, emergencies, billing, facilities.

**CRITICAL: You MUST speak ONLY in Hebrew (עברית). All your responses must be in Hebrew.**

[Style] Speak ONLY Hebrew. Under 30 seconds per response. Warm like a helpful receptionist. Use occasional "אממ" for natural feel. Empathetic with frustrated tenants.

[Flow]
Opening: "שלום, זו נועה מVoxOps. איך אני יכולה לעזור לך היום?"
Maintenance → ask location, type, urgency → "אשלח לצוות התחזוקה. יצרו קשר בתוך 24 שעות."
Emergency → "זה דחוף. מספר חירום: 050-123-4567. חייגו מיד." + notify management.
Billing → explain options or direct to accounting.
General → answer clearly, escalate if needed.
Closing: "יש עוד משהו? תודה על הקשר!"

[Rules] No sensitive tenant info. No false timeline promises. Escalate when unsure. Non-building questions: "אני פה רק לנושאי הבניין." One question at a time. Spell out phone numbers.

[Demo Context] This is a demo. If user tries to report a real issue, say: "זו בעצם הדגמה של המערכת. אם אהבת את מה שראית, יש למטה כפתור לקבוע שיחת היכרות."
If asked if you're AI, say: "כן, אני בוט. אבל בוט שזמין 24/7, עונה מיד על כל שיחה, ולא לוקח הפסקות. לא רע, נכון?"
`,
};

// ─── PIN Gate ────────────────────────────────────────────────────
const CORRECT_PIN = import.meta.env.VITE_BM_DEMO_PIN || '3204';

const PinGate = ({ onSuccess }: { onSuccess: () => void }) => {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = useCallback(
    (index: number, value: string) => {
      if (!/^\d?$/.test(value)) return;
      const next = [...digits];
      next[index] = value;
      setDigits(next);
      setError('');

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }

      // Validate when 4th digit entered
      if (index === 3 && value) {
        const pin = next.join('');
        if (pin === CORRECT_PIN) {
          onSuccess();
        } else {
          setShake(true);
          setError('קוד שגוי');
          setTimeout(() => {
            setShake(false);
            setDigits(['', '', '', '']);
            inputRefs.current[0]?.focus();
          }, 600);
        }
      }
    },
    [digits, onSuccess],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Backspace' && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [digits],
  );

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative" dir="rtl">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'hsl(var(--primary) / 0.3)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center relative">
          <div
            className="absolute inset-0 rounded-full opacity-30 blur-lg"
            style={{ background: 'hsl(var(--primary) / 0.4)' }}
          />
          <Building2 className="w-8 h-8 text-primary relative z-10" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mt-2">הדגמה פרטית</h1>
          <p className="text-sm text-muted-foreground mt-2">הזינו קוד גישה</p>
        </div>

        {/* PIN Inputs */}
        <motion.div
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="flex gap-3 justify-center mt-2"
          dir="ltr"
        >
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digits[i]}
              onChange={(e) => handleInput(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-14 h-14 text-center text-2xl font-bold bg-background border border-border rounded-lg
                         focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
            />
          ))}
        </motion.div>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-sm"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

// ─── Page Content ───────────────────────────────────────────────
const BMContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden" dir="rtl">
      {/* Dot Grid Background */}
      <div className="fixed inset-0 dot-grid pointer-events-none z-0 opacity-40" />

      {/* Parallax blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-[15%] right-[-5%] w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div
          className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
      </div>

      <div className="relative z-10">
        <Header />

        <main>
          {/* ─── HERO ─────────────────────────────────── */}
          <section className="relative min-h-[80vh] flex items-center pt-28 pb-16">
            {/* Pulsing rings (same as main page) */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
              <div
                className="absolute w-[200px] h-[200px] rounded-full blur-3xl animate-hero-glow max-sm:w-[120px] max-sm:h-[120px]"
                style={{ background: 'hsl(var(--primary) / 0.1)' }}
              />
              {[0, 1.33, 2.66].map((delay, i) => (
                <div
                  key={i}
                  className="absolute w-[400px] h-[400px] rounded-full animate-hero-ring max-sm:w-[300px] max-sm:h-[300px]"
                  style={{
                    border: '1px solid hsl(var(--primary) / 0.2)',
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
            </div>

            <div className="container mx-auto relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                {/* Pill badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex justify-center mb-6"
                >
                  <span className="px-4 py-1.5 rounded-full border border-border text-sm text-muted-foreground">
                    ניהול מבנים חכם
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-display"
                >
                  עוזרים קוליים וטקסט חכמים
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 gradient-text glow-text font-display"
                >
                  לחברות ניהול בניינים
                </motion.h2>

                {/* Subtext */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-2 mb-10"
                >
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                    מערכות AI שעוצרות דליפות בשירות ומשפרות חווית הדיירים
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                    זמינים 24/7, מדברים עברית שוטפת
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row-reverse gap-4 justify-center mb-16"
                >
                  <Button variant="hero" size="xl" className="group" onClick={() => setIsModalOpen(true)}>
                    <span className="flex items-center flex-row-reverse">
                      נסו עכשיו בחינם
                      <ArrowRight className="w-5 h-5 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  <Button variant="heroGlass" size="xl" asChild>
                    <a href="https://cal.com/vidleads/callback" target="_blank" rel="noopener noreferrer" className="flex items-center flex-row-reverse gap-2">
                      <Phone className="w-5 h-5" />
                      צרו קשר
                    </a>
                  </Button>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row-reverse gap-4 justify-center"
                >
                  <div className="stat-card px-8 py-6 flex flex-col sm:flex-row-reverse items-center gap-6 min-w-[280px] relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: 'radial-gradient(600px circle at 50% 50%, hsl(168 100% 33% / 0.15), transparent 40%)' }}
                    />
                    <div className="text-center sm:text-right sm:border-l sm:pl-6 border-primary/20 relative z-10">
                      <p className="label-micro mb-2">זמינות מלאה</p>
                      <p className="text-4xl font-bold text-foreground font-mono">24/7</p>
                    </div>
                    <div className="text-center sm:text-right sm:border-l sm:pl-6 border-primary/20 relative z-10">
                      <p className="label-micro mb-2">שביעות רצון דיירים</p>
                      <p className="text-4xl font-bold text-foreground font-mono">90%</p>
                    </div>
                    <div className="text-center sm:text-right relative z-10">
                      <p className="label-micro mb-2">חיסכון בעומס על הצוות</p>
                      <p className="text-4xl font-bold text-foreground font-mono">+65%</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ─── TRY NOA ──────────────────────────────── */}
          <section className="py-20">
            <div className="container mx-auto max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <p className="text-lg text-muted-foreground mb-6">נסו לשאול את נועה:</p>

                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {BM_AGENT.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground
                                 hover:border-primary/40 hover:text-foreground transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <Button variant="hero" size="xl" onClick={() => setIsModalOpen(true)} className="gap-2">
                  <Phone className="w-5 h-5" />
                  דברו עם נועה
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        {/* ─── FOOTER ─────────────────────────────────── */}
        <footer className="py-8 border-t border-border/30">
          <div className="container mx-auto text-center">
            <p className="text-sm text-muted-foreground">powered by VoxOps</p>
          </div>
        </footer>
      </div>

      {/* Voice Agent Modal */}
      <VoiceAgent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentAgent={BM_AGENT}
        allAgents={[BM_AGENT]}
        onAgentChange={() => {}}
      />
    </div>
  );
};

// ─── Main Page ──────────────────────────────────────────────────
const BuildingManagement = () => {
  const [authenticated, setAuthenticated] = useState(false);

  // noindex nofollow
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!authenticated ? (
        <motion.div
          key="pin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <PinGate onSuccess={() => setAuthenticated(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <BMContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BuildingManagement;
