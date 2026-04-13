import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, User, Briefcase, Shield, Rocket, CheckCircle, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

type FormData = {
  fullName: string;
  email: string;
  role: string;
  decisionMaker: string;
  investment: string;
};

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-2 mb-8 justify-center">
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
    aria-label="Go back"
  >
    <ArrowLeft className="w-5 h-5" />
  </button>
);

const DisqualifiedScreen = () => (
  <div className="text-center py-8">
    <p className="text-white/70 leading-relaxed mb-6 max-w-md mx-auto">
      Not ready for a full-scale engine yet? No problem. I share the exact strategies we use
      to scale real estate businesses for free on TikTok.
    </p>
    <a
      href="https://www.tiktok.com/@pockettalks?_r=1&_t=ZS-95Sb56SqJhw"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-medium text-sm"
    >
      Follow us on TikTok <ExternalLink className="w-4 h-4" />
    </a>
  </div>
);

const SuccessScreen = ({ formData }: { formData: FormData }) => {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#F59E0B", "#FBBF24", "#FDE68A", "#ffffff"],
    });

    const timer = setTimeout(() => {
      const Cal = (window as any).Cal;
      if (!Cal) return;

      Cal("init", "20min", { origin: "https://app.cal.com" });

      Cal.ns["20min"]("inline", {
        elementOrSelector: "#my-cal-inline-20min",
        calLink: "vox-ops-mvonve/20min",
        config: {
          layout: "month_view",
          name: formData.fullName,
          email: formData.email,
        },
      });

      Cal.ns["20min"]("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#F59E0B" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <CheckCircle className="w-6 h-6 text-[#F59E0B]" />
        <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
          You're Qualified!
        </h3>
      </div>
      <p className="text-white/50 text-sm mb-8">
        Pick a time that works for your free 20-minute discovery call.
      </p>
      <div
        id="my-cal-inline-20min"
        className="w-full rounded-xl overflow-hidden"
        style={{ width: "100%", minHeight: "900px", height: "900px", display: "block" }}
      />
    </div>
  );
};

const QualifierForm = () => {
  const [step, setStep] = useState(0);
  const [disqualified, setDisqualified] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    role: "",
    decisionMaker: "",
    investment: "",
  });
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

  const validateStep1 = useCallback(() => {
    const newErrors: typeof errors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.email.includes("@") || !formData.email.includes(".")) newErrors.email = "Enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.fullName, formData.email]);

  const handleNext = () => {
    if (step === 0 && !validateStep1()) return;
    setStep((s) => s + 1);
  };

  const handleRoleSelect = (role: string) => {
    setFormData((prev) => ({ ...prev, role }));
    setTimeout(() => setStep(2), 300);
  };

  const handleDecisionMakerSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, decisionMaker: value }));
    if (value === "no") {
      setTimeout(() => setDisqualified(true), 300);
    } else {
      setTimeout(() => setStep(3), 300);
    }
  };

  const handleInvestmentSelect = (investment: string) => {
    setFormData((prev) => ({ ...prev, investment }));
    if (investment === "no") {
      setTimeout(() => setDisqualified(true), 300);
    } else {
      setTimeout(() => setCompleted(true), 300);
    }
  };

  const roles = [
    { value: "agent", label: "Real Estate Agent" },
    { value: "teamlead", label: "Team Lead" },
    { value: "broker", label: "Broker / Owner" },
    { value: "other", label: "Other" },
  ];

  const optionBtn = (selected: boolean, danger = false) =>
    `w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm font-medium ${
      selected
        ? danger
          ? "border-red-500/30 bg-red-500/5 text-red-400"
          : "border-[#F59E0B]/50 bg-[#F59E0B]/10 text-[#F59E0B]"
        : "border-white/10 bg-[#0F172A]/40 text-white/70 hover:border-white/20 hover:bg-[#0F172A]/60"
    }`;

  return (
    <section className="px-5 pb-20 md:pb-28" id="qualifier">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border border-white/[0.06] bg-[#1E293B]/50 backdrop-blur-sm p-8 md:p-10 overflow-hidden"
        >
          {completed ? (
            <SuccessScreen formData={formData} />
          ) : disqualified ? (
            <DisqualifiedScreen />
          ) : (
            <>
              <StepIndicator current={step} total={4} />
              {step > 0 && <BackButton onClick={() => setStep((s) => s - 1)} />}

              <AnimatePresence mode="wait">
                {/* Step 1: Identity */}
                {step === 0 && (
                  <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                    <div className="flex items-center gap-2 mb-6 justify-center">
                      <User className="w-5 h-5 text-[#F59E0B]" />
                      <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Let's start with your details
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }}
                          className={`w-full h-12 rounded-xl border ${errors.fullName ? "border-red-500/60" : "border-white/10"} bg-[#0F172A]/60 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B]/50 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all`}
                        />
                        {errors.fullName && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Business Email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, email: e.target.value }));
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          className={`w-full h-12 rounded-xl border ${errors.email ? "border-red-500/60" : "border-white/10"} bg-[#0F172A]/60 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F59E0B]/50 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all`}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>}
                      </div>
                    </div>
                    <button
                      onClick={handleNext}
                      className="mt-6 w-full h-12 rounded-xl bg-[#F59E0B] text-black font-bold text-sm hover:bg-[#D97706] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Role */}
                {step === 1 && (
                  <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                    <div className="flex items-center gap-2 mb-6 justify-center">
                      <Briefcase className="w-5 h-5 text-[#F59E0B]" />
                      <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>What's your role?</h3>
                    </div>
                    <div className="space-y-3">
                      {roles.map((r) => (
                        <button key={r.value} onClick={() => handleRoleSelect(r.value)} className={optionBtn(formData.role === r.value)}>
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Decision Maker */}
                {step === 2 && (
                  <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                    <div className="flex items-center gap-2 mb-6 justify-center">
                      <Shield className="w-5 h-5 text-[#F59E0B]" />
                      <h3 className="text-lg font-bold text-white text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Are you the sole decision maker for investments in your business?
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <button onClick={() => handleDecisionMakerSelect("yes")} className={optionBtn(formData.decisionMaker === "yes")}>
                        Yes
                      </button>
                      <button onClick={() => handleDecisionMakerSelect("no")} className={optionBtn(formData.decisionMaker === "no", true)}>
                        No
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Investment */}
                {step === 3 && (
                  <motion.div key="step4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                    <div className="flex items-center gap-2 mb-6 justify-center">
                      <Rocket className="w-5 h-5 text-[#F59E0B]" />
                      <h3 className="text-lg font-bold text-white text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Our system starts from $997/mo. If the ROI is clear — are you in a position to invest?
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <button onClick={() => handleInvestmentSelect("yes")} className={optionBtn(formData.investment === "yes")}>
                        Yes, let's scale 🚀
                      </button>
                      <button onClick={() => handleInvestmentSelect("within30")} className={optionBtn(formData.investment === "within30")}>
                        Within 30 days
                      </button>
                      <button onClick={() => handleInvestmentSelect("no")} className={optionBtn(formData.investment === "no", true)}>
                        No, that's outside my budget
                      </button>
                    </div>
                    <p className="mt-6 text-xs text-white/30 text-center leading-relaxed">
                      VoxOps focuses on outcomes, not clicks. If we don't hit our agreed appointment target in 60 days, you get your money back.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default QualifierForm;
