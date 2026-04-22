import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, User, Briefcase, BarChart3, Target, Shield, Rocket, Home, Globe } from "lucide-react";
import confetti from "canvas-confetti";

type Lang = "he" | "en";

type FormData = {
  fullName: string;
  email: string;
  role: string;
  leadsPerMonth: string;
  challenge: string;
  decisionMaker: string;
  investment: string;
};

const TOTAL_STEPS = 6;

const stepVariants = {
  enter: { opacity: 0, x: -40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 40 },
};

/* ─── i18n strings ─── */
const T = {
  he: {
    back: "חזור",
    homeBtn: "חזרה לדף הבית",
    disqualified: "תודה על הפנייה! הצוות שלנו יעבור על התשובות ונחזור אליך במידה וזה רלוונטי.",
    successTitle: "תודה רבה! נראה שיש לנו התאמה מעולה. 🙌",
    successSubtitle: "עכשיו תוכלו לבחור מועד לשיחת גילוי ישירות ביומן:",
    continue: "המשך",
    s1Title: "מה השם המלא וכתובת המייל העסקית שלך?",
    fullNamePh: "שם מלא",
    emailPh: "Business Email",
    errName: "שם הוא שדה חובה",
    errEmail: "נא להזין כתובת מייל תקינה",
    s2Title: "מה התפקיד שלך בעסק?",
    s3Title: "כמה לידים חדשים נכנסים לעסק שלך בממוצע בחודש?",
    s4Title: "מה האתגר הכי גדול שלך כרגע?",
    s5Title: "האם את/ה מקבל/ת ההחלטות הבלעדי/ת בנוגע להשקעות בעסק?",
    yes: "כן",
    no: "לא",
    s6Title: "השירות שלנו מתחיל מ-2,500 ש״ח לחודש. במידה וההחזר השקעה ברור, האם את/ה במצב להשקיע?",
    guarantee: "VoxOps מתמקדת בתוצאות, לא בקליקים. אם לא נעמוד ביעד הפגישות שנקבע תוך 60 יום — תקבלו החזר כספי מלא.",
    roles: [
      { value: "owner", label: "בעלים / מנכ״ל" },
      { value: "marketing", label: "סמנכ״ל שיווק או מכירות" },
      { value: "entrepreneur", label: "יזם / פרילנסר" },
      { value: "other", label: "אחר" },
    ],
    leads: [
      { value: "0-20", label: "0-20" },
      { value: "20-50", label: "20-50" },
      { value: "50-100", label: "50-100" },
      { value: "100+", label: "100+" },
    ],
    challenges: [
      { value: "speed", label: "מהירות תגובה ללידים" },
      { value: "quality", label: "לידים לא איכותיים" },
      { value: "time", label: "חוסר זמן לשיחות טלפון" },
      { value: "followup", label: "קושי במעקב" },
    ],
    investments: [
      { value: "yes", label: "כן, אני מוכן/ה" },
      { value: "within30", label: "תוכנית עבודה ל-30 יום" },
      { value: "no", label: "לא כרגע" },
    ],
  },
  en: {
    back: "Back",
    homeBtn: "Back to Home",
    disqualified: "Thanks for reaching out! Our team will review your answers and get back to you if it's a fit.",
    successTitle: "Thank you! Looks like we're a great match. 🙌",
    successSubtitle: "Now choose a time for your discovery call directly on the calendar:",
    continue: "Continue",
    s1Title: "What's your full name and business email?",
    fullNamePh: "Full Name",
    emailPh: "Business Email",
    errName: "Name is required",
    errEmail: "Please enter a valid email address",
    s2Title: "What's your role in the business?",
    s3Title: "How many new leads does your business get per month on average?",
    s4Title: "What's your biggest challenge right now?",
    s5Title: "Are you the sole decision-maker for business investments?",
    yes: "Yes",
    no: "No",
    s6Title: "Our service starts at $750/month. If the ROI is clear, are you in a position to invest?",
    guarantee: "VoxOps focuses on results, not clicks. If we don't hit the agreed appointment target within 60 days — you get a full refund.",
    roles: [
      { value: "owner", label: "Owner / CEO" },
      { value: "marketing", label: "VP of Marketing or Sales" },
      { value: "entrepreneur", label: "Entrepreneur / Freelancer" },
      { value: "other", label: "Other" },
    ],
    leads: [
      { value: "0-20", label: "0-20" },
      { value: "20-50", label: "20-50" },
      { value: "50-100", label: "50-100" },
      { value: "100+", label: "100+" },
    ],
    challenges: [
      { value: "speed", label: "Lead response speed" },
      { value: "quality", label: "Low-quality leads" },
      { value: "time", label: "No time for phone calls" },
      { value: "followup", label: "Difficulty following up" },
    ],
    investments: [
      { value: "yes", label: "Yes, I'm ready" },
      { value: "within30", label: "A 30-day plan" },
      { value: "no", label: "Not right now" },
    ],
  },
} as const;

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-2 mb-8 justify-center" dir="ltr">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1.5 rounded-full transition-all duration-300 ${
          i <= current ? "bg-[#F59E0B] w-8" : "bg-white/10 w-4"
        }`}
      />
    ))}
  </div>
);

const BackButton = ({ onClick, label, isRTL }: { onClick: () => void; label: string; isRTL: boolean }) => (
  <button
    onClick={onClick}
    className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all`}
    aria-label={label}
  >
    {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
  </button>
);

const LangToggle = ({ lang, setLang, isRTL }: { lang: Lang; setLang: (l: Lang) => void; isRTL: boolean }) => (
  <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1`}>
    <Globe className="w-3.5 h-3.5 text-white/40 mx-1" />
    <button
      onClick={() => setLang("en")}
      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
        lang === "en" ? "bg-[#F59E0B] text-black" : "text-white/50 hover:text-white"
      }`}
    >
      EN
    </button>
    <button
      onClick={() => setLang("he")}
      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
        lang === "he" ? "bg-[#F59E0B] text-black" : "text-white/50 hover:text-white"
      }`}
    >
      עב
    </button>
  </div>
);

const OptionButton = ({
  label,
  selected,
  danger = false,
  isRTL,
  onClick,
}: {
  label: string;
  selected: boolean;
  danger?: boolean;
  isRTL: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full px-5 py-4 rounded-xl border transition-all duration-200 text-sm font-medium ${
      isRTL ? "text-right" : "text-left"
    } ${
      selected
        ? danger
          ? "border-red-500/30 bg-red-500/5 text-red-400"
          : "border-[#F59E0B]/50 bg-[#F59E0B]/10 text-[#F59E0B]"
        : "border-white/10 bg-[#292929]/60 text-white/70 hover:border-white/20 hover:bg-[#292929]/80"
    }`}
  >
    {label}
  </button>
);

/* ─── Disqualified ─── */
const DisqualifiedScreen = ({ lang, isRTL }: { lang: Lang; isRTL: boolean }) => {
  const t = T[lang];
  return (
    <div className="text-center py-8" dir={isRTL ? "rtl" : "ltr"}>
      <p className="text-white/70 leading-relaxed mb-6 max-w-md mx-auto text-base">{t.disqualified}</p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-medium text-sm"
      >
        <Home className="w-4 h-4" /> {t.homeBtn}
      </a>
    </div>
  );
};

/* ─── Success with Cal.com ─── */
const SuccessScreen = ({ formData, lang, isRTL }: { formData: FormData; lang: Lang; isRTL: boolean }) => {
  const t = T[lang];
  const iframeSrc = `https://cal.com/vidleads/callback?embed=true&theme=dark&layout=month_view&name=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}`;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.55 },
        colors: ["#F59E0B", "#FBBF24", "#FDE68A", "#ffffff"],
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div id="success-container" style={{ width: "100%", textAlign: "center" }}>
      <h2 className="mb-4 text-xl font-bold text-white" style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {t.successTitle}
      </h2>
      <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-white/50" style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {t.successSubtitle}
      </p>
      <div
        id="my-cal-inline-callback"
        style={{ width: "100%", minHeight: "900px", overflow: "visible", background: "transparent" }}
      >
        <iframe
          src={iframeSrc}
          title="VoxOps Callback Calendar"
          loading="eager"
          className="w-full min-h-[900px] border-0 bg-transparent"
          style={{ width: "100%", minHeight: "900px", border: 0, background: "transparent" }}
        />
      </div>
    </div>
  );
};

/* ─── Main Form ─── */
const HebrewQualifierForm = () => {
  const [lang, setLang] = useState<Lang>("he");
  const isRTL = lang === "he";
  const t = T[lang];

  const [step, setStep] = useState(0);
  const [disqualified, setDisqualified] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    role: "",
    leadsPerMonth: "",
    challenge: "",
    decisionMaker: "",
    investment: "",
  });
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  const validateStep1 = useCallback(() => {
    const newErrors: typeof errors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t.errName;
    if (!formData.email.includes("@") || !formData.email.includes(".")) newErrors.email = t.errEmail;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.fullName, formData.email, t]);

  const handleNext = () => {
    if (step === 0 && !validateStep1()) return;
    setStep((s) => s + 1);
  };

  const autoAdvance = (field: keyof FormData, value: string, nextStep: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => setStep(nextStep), 300);
  };

  const handleDecisionMaker = (value: string) => {
    setFormData((prev) => ({ ...prev, decisionMaker: value }));
    setTimeout(() => setStep(5), 300);
  };

  const sendWebhook = async (data: FormData) => {
    try {
      await fetch("https://n8n.srv1100597.hstgr.cloud/webhook/a287b670-3729-4bb1-999d-ec56678f7139", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language: lang }),
      });
    } catch (e) {
      console.error("Webhook error:", e);
    }
  };

  const handleInvestment = (investment: string) => {
    const updatedData = { ...formData, investment };
    setFormData(updatedData);
    sendWebhook(updatedData);
    const isQualified = formData.decisionMaker === "yes" && investment !== "no";
    setTimeout(() => {
      if (isQualified) setCompleted(true);
      else setDisqualified(true);
    }, 300);
  };

  const ContinueIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className={completed ? "w-full max-w-[800px]" : "w-full max-w-xl"} dir={isRTL ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl border border-white/[0.06] bg-[#333]/50 backdrop-blur-sm p-8 md:p-10 pt-16 overflow-hidden"
      >
        <LangToggle lang={lang} setLang={setLang} isRTL={isRTL} />

        {completed ? (
          <SuccessScreen formData={formData} lang={lang} isRTL={isRTL} />
        ) : disqualified ? (
          <DisqualifiedScreen lang={lang} isRTL={isRTL} />
        ) : (
          <>
            <StepIndicator current={step} total={TOTAL_STEPS} />
            {step > 0 && <BackButton onClick={() => setStep((s) => s - 1)} label={t.back} isRTL={isRTL} />}

            <AnimatePresence mode="wait">
              {/* Step 1 — Name & Email */}
              {step === 0 && (
                <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <User className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white text-center">{t.s1Title}</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder={t.fullNamePh}
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        className={`w-full h-12 rounded-xl border ${errors.fullName ? "border-red-500/60" : "border-white/10"} bg-[#292929]/60 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B]/50 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all ${isRTL ? "text-right" : "text-left"}`}
                      />
                      {errors.fullName && <p className={`text-red-400 text-xs mt-1.5 ${isRTL ? "mr-1" : "ml-1"}`}>{errors.fullName}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        dir="ltr"
                        placeholder={t.emailPh}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        className={`w-full h-12 rounded-xl border ${errors.email ? "border-red-500/60" : "border-white/10"} bg-[#292929]/60 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B]/50 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all text-left`}
                      />
                      {errors.email && <p className={`text-red-400 text-xs mt-1.5 ${isRTL ? "mr-1" : "ml-1"}`}>{errors.email}</p>}
                    </div>
                  </div>
                  <button
                    onClick={handleNext}
                    className="mt-6 w-full h-12 rounded-xl bg-[#F59E0B] text-black font-bold text-sm hover:bg-[#D97706] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                  >
                    {t.continue} <ContinueIcon className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Step 2 — Role */}
              {step === 1 && (
                <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <Briefcase className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white text-center">{t.s2Title}</h3>
                  </div>
                  <div className="space-y-3">
                    {t.roles.map((r) => (
                      <OptionButton key={r.value} label={r.label} isRTL={isRTL} selected={formData.role === r.value} onClick={() => autoAdvance("role", r.value, 2)} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3 — Leads per month */}
              {step === 2 && (
                <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <BarChart3 className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white text-center">{t.s3Title}</h3>
                  </div>
                  <div className="space-y-3">
                    {t.leads.map((l) => (
                      <OptionButton key={l.value} label={l.label} isRTL={isRTL} selected={formData.leadsPerMonth === l.value} onClick={() => autoAdvance("leadsPerMonth", l.value, 3)} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4 — Challenge */}
              {step === 3 && (
                <motion.div key="s4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <Target className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white text-center">{t.s4Title}</h3>
                  </div>
                  <div className="space-y-3">
                    {t.challenges.map((c) => (
                      <OptionButton key={c.value} label={c.label} isRTL={isRTL} selected={formData.challenge === c.value} onClick={() => autoAdvance("challenge", c.value, 4)} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 5 — Decision maker */}
              {step === 4 && (
                <motion.div key="s5" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <Shield className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white text-center">{t.s5Title}</h3>
                  </div>
                  <div className="space-y-3">
                    <OptionButton label={t.yes} isRTL={isRTL} selected={formData.decisionMaker === "yes"} onClick={() => handleDecisionMaker("yes")} />
                    <OptionButton label={t.no} isRTL={isRTL} selected={formData.decisionMaker === "no"} danger onClick={() => handleDecisionMaker("no")} />
                  </div>
                </motion.div>
              )}

              {/* Step 6 — Investment */}
              {step === 5 && (
                <motion.div key="s6" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <Rocket className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white text-center">{t.s6Title}</h3>
                  </div>
                  <div className="space-y-3">
                    {t.investments.map((inv) => (
                      <OptionButton
                        key={inv.value}
                        label={inv.label}
                        isRTL={isRTL}
                        selected={formData.investment === inv.value}
                        danger={inv.value === "no"}
                        onClick={() => handleInvestment(inv.value)}
                      />
                    ))}
                  </div>
                  <p className="mt-6 text-xs text-white/30 text-center leading-relaxed">{t.guarantee}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default HebrewQualifierForm;
