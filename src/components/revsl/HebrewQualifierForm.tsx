import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, User, Briefcase, BarChart3, Target, Shield, Rocket, CheckCircle, Home } from "lucide-react";
import confetti from "canvas-confetti";

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

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-4 left-4 p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
    aria-label="חזור"
  >
    <ArrowLeft className="w-5 h-5" />
  </button>
);

const OptionButton = ({
  label,
  selected,
  danger = false,
  onClick,
}: {
  label: string;
  selected: boolean;
  danger?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-right px-5 py-4 rounded-xl border transition-all duration-200 text-sm font-medium ${
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
const DisqualifiedScreen = () => (
  <div className="text-center py-8">
    <p className="text-white/70 leading-relaxed mb-6 max-w-md mx-auto text-base">
      תודה על הפנייה! הצוות שלנו יעבור על התשובות ונחזור אליך במידה וזה רלוונטי.
    </p>
    <a
      href="/"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-medium text-sm"
    >
      <Home className="w-4 h-4" /> חזרה לדף הבית
    </a>
  </div>
);

type CalNamespaceApi = (...args: any[]) => void;
type CalGlobal = ((...args: any[]) => void) & {
  ns?: Record<string, CalNamespaceApi>;
};

/* ─── Success with Cal.com ─── */
const SuccessScreen = ({ formData }: { formData: FormData }) => {
  const hasInitializedCal = useRef(false);

  useEffect(() => {
    if (hasInitializedCal.current) return;
    hasInitializedCal.current = true;

    // 1. Fire Confetti
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.55 },
      colors: ["#F59E0B", "#FBBF24", "#FDE68A", "#ffffff"],
    });

    // 2. Load Cal.com Script manually if not present
    const scriptId = "cal-embed-script";

    function initCal() {
      const calWindow = window as typeof window & { Cal?: CalGlobal };
      if (!calWindow.Cal) return;

      calWindow.Cal("init", "callback", { origin: "https://app.cal.com" });

      const callbackApi = calWindow.Cal.ns?.callback;
      if (!callbackApi) return;

      const container = document.getElementById("my-cal-inline-callback");
      if (container) container.innerHTML = "";

      callbackApi("inline", {
        elementOrSelector: "#my-cal-inline-callback",
        calLink: "vidleads/callback",
        config: {
          name: formData.fullName,
          email: formData.email,
          theme: "dark",
          layout: "month_view",
        },
      });

      callbackApi("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#F59E0B" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://app.cal.com/embed/embed.js";
      document.head.appendChild(script);
      script.onload = () => {
        // Small delay to let Cal initialize
        setTimeout(initCal, 500);
      };
    } else {
      // Script already loaded, retry until Cal.ns.callback is ready
      let attempts = 0;
      const retryInterval = window.setInterval(() => {
        attempts += 1;
        const calWindow = window as typeof window & { Cal?: CalGlobal };
        if ((calWindow.Cal?.ns?.callback) || attempts >= 20) {
          window.clearInterval(retryInterval);
          initCal();
        }
      }, 300);
    }

    return () => {
      hasInitializedCal.current = false;
    };
  }, [formData.email, formData.fullName]);

  return (
    <div id="success-container" className="mx-auto max-w-[800px] text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <CheckCircle className="w-6 h-6 text-[#F59E0B]" />
        <h2 className="text-xl font-bold text-white" dir="rtl">
          תודה רבה! נראה שיש לנו התאמה מעולה. 🙌
        </h2>
      </div>
      <p className="text-white/50 text-sm mb-8 leading-relaxed max-w-lg mx-auto" dir="rtl">
        עכשיו תוכלו לבחור מועד לשיחת גילוי ישירות ביומן:
      </p>
      <div
        id="my-cal-inline-callback"
        style={{
          width: "100%",
          minHeight: "900px",
          overflow: "visible",
          background: "transparent",
        }}
      />
    </div>
  );
};

/* ─── Main Form ─── */
const HebrewQualifierForm = () => {
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

  const validateStep1 = useCallback(() => {
    const newErrors: typeof errors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "שם הוא שדה חובה";
    if (!formData.email.includes("@") || !formData.email.includes("."))
      newErrors.email = "נא להזין כתובת מייל תקינה";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.fullName, formData.email]);

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
        body: JSON.stringify(data),
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

  const roles = [
    { value: "owner", label: "בעלים / מנכ״ל" },
    { value: "marketing", label: "סמנכ״ל שיווק או מכירות" },
    { value: "entrepreneur", label: "יזם / פרילנסר" },
    { value: "other", label: "אחר" },
  ];

  const leads = [
    { value: "0-20", label: "0-20" },
    { value: "20-50", label: "20-50" },
    { value: "50-100", label: "50-100" },
    { value: "100+", label: "100+" },
  ];

  const challenges = [
    { value: "speed", label: "מהירות תגובה ללידים" },
    { value: "quality", label: "לידים לא איכותיים" },
    { value: "time", label: "חוסר זמן לשיחות טלפון" },
    { value: "followup", label: "קושי במעקב" },
  ];

  const investments = [
    { value: "yes", label: "כן, אני מוכן/ה" },
    { value: "within30", label: "תוכנית עבודה ל-30 יום" },
    { value: "no", label: "לא כרגע" },
  ];

  return (
    <div className={completed ? "w-full max-w-[800px]" : "w-full max-w-xl"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl border border-white/[0.06] bg-[#333]/50 backdrop-blur-sm p-8 md:p-10 overflow-hidden"
      >
        {completed ? (
          <SuccessScreen formData={formData} />
        ) : disqualified ? (
          <DisqualifiedScreen />
        ) : (
          <>
            <StepIndicator current={step} total={TOTAL_STEPS} />
            {step > 0 && <BackButton onClick={() => setStep((s) => s - 1)} />}

            <AnimatePresence mode="wait">
              {/* Step 1 — Name & Email */}
              {step === 0 && (
                <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <User className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white">מה השם המלא וכתובת המייל העסקית שלך?</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="שם מלא"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        className={`w-full h-12 rounded-xl border ${errors.fullName ? "border-red-500/60" : "border-white/10"} bg-[#292929]/60 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B]/50 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all text-right`}
                      />
                      {errors.fullName && <p className="text-red-400 text-xs mt-1.5 mr-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        dir="ltr"
                        placeholder="Business Email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        className={`w-full h-12 rounded-xl border ${errors.email ? "border-red-500/60" : "border-white/10"} bg-[#292929]/60 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B]/50 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all text-left`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1.5 mr-1">{errors.email}</p>}
                    </div>
                  </div>
                  <button
                    onClick={handleNext}
                    className="mt-6 w-full h-12 rounded-xl bg-[#F59E0B] text-black font-bold text-sm hover:bg-[#D97706] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                  >
                    המשך <ArrowLeft className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Step 2 — Role */}
              {step === 1 && (
                <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <Briefcase className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white">מה התפקיד שלך בעסק?</h3>
                  </div>
                  <div className="space-y-3">
                    {roles.map((r) => (
                      <OptionButton key={r.value} label={r.label} selected={formData.role === r.value} onClick={() => autoAdvance("role", r.value, 2)} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3 — Leads per month */}
              {step === 2 && (
                <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <BarChart3 className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white text-center">כמה לידים חדשים נכנסים לעסק שלך בממוצע בחודש?</h3>
                  </div>
                  <div className="space-y-3">
                    {leads.map((l) => (
                      <OptionButton key={l.value} label={l.label} selected={formData.leadsPerMonth === l.value} onClick={() => autoAdvance("leadsPerMonth", l.value, 3)} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4 — Challenge */}
              {step === 3 && (
                <motion.div key="s4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <Target className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white text-center">מה האתגר הכי גדול שלך כרגע?</h3>
                  </div>
                  <div className="space-y-3">
                    {challenges.map((c) => (
                      <OptionButton key={c.value} label={c.label} selected={formData.challenge === c.value} onClick={() => autoAdvance("challenge", c.value, 4)} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 5 — Decision maker */}
              {step === 4 && (
                <motion.div key="s5" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <Shield className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white text-center">האם את/ה מקבל/ת ההחלטות הבלעדי/ת בנוגע להשקעות בעסק?</h3>
                  </div>
                  <div className="space-y-3">
                    <OptionButton label="כן" selected={formData.decisionMaker === "yes"} onClick={() => handleDecisionMaker("yes")} />
                    <OptionButton label="לא" selected={formData.decisionMaker === "no"} danger onClick={() => handleDecisionMaker("no")} />
                  </div>
                </motion.div>
              )}

              {/* Step 6 — Investment */}
              {step === 5 && (
                <motion.div key="s6" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6 justify-center">
                    <Rocket className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="text-lg font-bold text-white text-center">
                      השירות שלנו מתחיל מ-2,500 ש״ח לחודש. במידה וההחזר השקעה ברור, האם את/ה במצב להשקיע?
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {investments.map((inv) => (
                      <OptionButton
                        key={inv.value}
                        label={inv.label}
                        selected={formData.investment === inv.value}
                        danger={inv.value === "no"}
                        onClick={() => handleInvestment(inv.value)}
                      />
                    ))}
                  </div>
                  <p className="mt-6 text-xs text-white/30 text-center leading-relaxed">
                    VoxOps מתמקדת בתוצאות, לא בקליקים. אם לא נעמוד ביעד הפגישות שנקבע תוך 60 יום — תקבלו החזר כספי מלא.
                  </p>
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
