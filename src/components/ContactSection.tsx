import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useLanguage } from '@/i18n/LanguageContext';
import { Progress } from './ui/progress';

declare global {
  interface Window {
    Cal?: any;
  }
}

const ContactSection = () => {
  const { t, isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    businessType: '',
    challenge: '',
    goals: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;
  const progressValue = (currentStep / totalSteps) * 100;

  // Load Cal.com embed script when calendar should be shown
  useEffect(() => {
    if (showCalendar) {
      // Initialize Cal.com with their IIFE pattern
      (function (C: any, A: string, L: string) {
        const p = function (a: any, ar: any) { a.q.push(ar); };
        const d = C.document;
        C.Cal = C.Cal || function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const script = d.head.appendChild(d.createElement("script"));
            script.src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      window.Cal("init", "callback", { origin: "https://app.cal.com" });
      window.Cal.ns.callback("inline", {
        elementOrSelector: "#my-cal-inline-callback",
        config: { layout: "month_view" },
        calLink: "vidleads/callback",
      });
      window.Cal.ns.callback("ui", { hideEventTypeDetails: false, layout: "month_view" });
    }
  }, [showCalendar]);

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1 && !formData.businessType.trim()) {
      newErrors.businessType = t.contact.form.required;
    }
    if (currentStep === 2 && !formData.challenge.trim()) {
      newErrors.challenge = t.contact.form.required;
    }
    if (currentStep === 3 && !formData.goals.trim()) {
      newErrors.goals = t.contact.form.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      // Show the Cal.com inline calendar
      setShowCalendar(true);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleGoalSelect = (goal: string) => {
    setFormData(prev => ({ ...prev, goals: goal }));
    if (errors.goals) {
      setErrors(prev => ({ ...prev, goals: '' }));
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isRTL ? -100 : 100) : (isRTL ? 100 : -100),
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? (isRTL ? -100 : 100) : (isRTL ? 100 : -100),
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const goNext = () => {
    setDirection(1);
    handleNext();
  };

  const goBack = () => {
    setDirection(-1);
    handleBack();
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
      <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none`} />
      <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none`} />
      
      <div className="container mx-auto relative z-10">
        {showCalendar ? (
          // Cal.com Calendar Embed
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className={`text-center mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className="section-title mb-4">
                {isRTL ? 'בחרו זמן לשיחה' : 'Choose a Time to Talk'}
              </h2>
              <p className="text-lg text-muted-foreground">
                {isRTL ? 'בחרו את הזמן הנוח לכם לשיחת ההיכרות' : 'Select a convenient time for your discovery call'}
              </p>
            </div>
            <div className="glass-card p-4 rounded-2xl">
              <div 
                id="my-cal-inline-callback" 
                style={{ width: '100%', height: '600px', overflow: 'auto' }}
              />
            </div>
          </motion.div>
        ) : (
          <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'direction-rtl' : ''}`}>
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={isRTL ? 'text-right' : 'text-left'}
            >
              <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Send className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{t.contact.badge}</span>
              </div>
              <h2 className="section-title mb-6">
                {t.contact.title} <span className="gradient-text">{t.contact.titleHighlight}</span> {t.contact.titleEnd}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t.contact.subtitle}
              </p>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card p-8 rounded-2xl">
                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm text-muted-foreground">
                      {currentStep} {t.contact.form.stepOf} {totalSteps}
                    </span>
                    <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                            step < currentStep
                              ? 'bg-primary text-primary-foreground'
                              : step === currentStep
                              ? 'bg-primary/20 text-primary border-2 border-primary'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {step < currentStep ? <Check className="w-4 h-4" /> : step}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Progress value={progressValue} className="h-2" />
                </div>

                {/* Form Steps */}
                <div className="min-h-[200px] relative overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <label className={`text-lg font-medium block ${isRTL ? 'text-right' : 'text-left'}`}>
                          {t.contact.form.step1Question}
                        </label>
                        <Input
                          value={formData.businessType}
                          onChange={(e) => handleInputChange('businessType', e.target.value)}
                          placeholder={t.contact.form.step1Placeholder}
                          className={`text-lg py-6 ${isRTL ? 'text-right' : 'text-left'} ${errors.businessType ? 'border-red-500' : ''}`}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />
                        {errors.businessType && (
                          <p className={`text-red-500 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                            {errors.businessType}
                          </p>
                        )}
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <label className={`text-lg font-medium block ${isRTL ? 'text-right' : 'text-left'}`}>
                          {t.contact.form.step2Question}
                        </label>
                        <Input
                          value={formData.challenge}
                          onChange={(e) => handleInputChange('challenge', e.target.value)}
                          placeholder={t.contact.form.step2Placeholder}
                          className={`text-lg py-6 ${isRTL ? 'text-right' : 'text-left'} ${errors.challenge ? 'border-red-500' : ''}`}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        />
                        {errors.challenge && (
                          <p className={`text-red-500 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                            {errors.challenge}
                          </p>
                        )}
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <label className={`text-lg font-medium block ${isRTL ? 'text-right' : 'text-left'}`}>
                          {t.contact.form.step3Question}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {t.contact.form.step3Options.map((option, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleGoalSelect(option)}
                              className={`p-4 rounded-xl border-2 transition-all text-sm font-medium ${
                                formData.goals === option
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border hover:border-primary/50 text-foreground'
                              } ${isRTL ? 'text-right' : 'text-left'}`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                        {errors.goals && (
                          <p className={`text-red-500 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                            {errors.goals}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className={`flex gap-4 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={goBack}
                      className="flex-1"
                    >
                      {isRTL ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
                      {t.contact.form.back}
                    </Button>
                  )}
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      variant="hero"
                      size="lg"
                      onClick={goNext}
                      className="flex-1"
                    >
                      {t.contact.form.next}
                      {isRTL ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="hero"
                      size="lg"
                      onClick={handleSubmit}
                      className="flex-1"
                    >
                      {t.contact.form.continue}
                      {isRTL ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
