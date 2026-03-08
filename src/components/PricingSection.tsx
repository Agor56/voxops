import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Star, Diamond, ChevronDown } from "lucide-react";
import { useState } from "react";

const PricingSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "he";
  const [expandedAddons, setExpandedAddons] = useState<{ [key: string]: boolean }>({});

  const toggleAddon = (planId: string) => {
    setExpandedAddons((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  const plans = [
    {
      id: "starter",
      name: "STARTER",
      tagline: "התחלה ללא סיכון",
      monthlyPrice: "₪997",
      setupFee: "₪3,500 התקנה חד-פעמית",
      perMinute: "+ ₪1.1/דקה",
      period: t.pricing.perMonth,
      badge: "מתאים ל-300-500 לידים/חודש",
      features: [
        "סוכן אחד לבחירה (אורה / אור / בר)",
        "הליך אפיון הלקוח ופיתוח תסריטים מותאם",
        "אינטגרציה CRM בסיסית (Google Calendar / Calendly)",
        "דשבורד בזמן אמת",
        "תמיכה במייל (48 שעות)",
        "דוח חודשי",
      ],
      examples: ["400 דקות = ₪1,437/חודש", "700 דקות = ₪1,767/חודש"],
      commitment: "🔓 אין התחייבות - בטלו בכל עת",
      loyaltyBonus: null,
      cta: "בחר תוכנית",
      popular: false,
      premium: false,
    },
    {
      id: "growth",
      name: "GROWTH",
      tagline: "צמיחה גמישה",
      monthlyPrice: "₪1,497",
      setupFee: "₪5,000 התקנה חד-פעמית",
      perMinute: "+ ₪1.0/דקה",
      period: t.pricing.perMonth,
      badge: "מתאים ל-600-1,200 לידים/חודש",
      features: [
        "2 סוכנים (אור/אורה + בר WhatsApp)",
        "הליך אפיון מעמיק ופיתוח תסריטים מותאם אישית",
        "אינטגרציה CRM מתקדמת (CRM + WhatsApp + Calendar)",
        "דשבורד + דוחות שבועיים",
        "תמיכה בצ'אט (12 שעות)",
        "שיחת אופטימיזציה חודשית",
        "לימוד ושיפור מתמיד של הסוכנים",
      ],
      examples: ["800 דקות = ₪2,297/חודש", "1,500 דקות = ₪2,997/חודש"],
      commitment: "🔓 אין התחייבות - בטלו בכל עת",
      loyaltyBonus: {
        title: "💎 בונוס נאמנות:",
        text: "הישארו 6 חודשים → קבלו ₪2,500 זיכוי בחודש 7",
        subtext: "(ההתקנה כמעט חינם למעשה!)",
      },
      cta: "התחל עם GROWTH",
      popular: true,
      premium: false,
    },
    {
      id: "scale",
      name: "SCALE",
      tagline: "ביצועים ללא הגבלה",
      monthlyPrice: "₪2,497",
      setupFee: "₪9,000 התקנה חד-פעמית",
      perMinute: "+ ₪0.9/דקה",
      period: t.pricing.perMonth,
      badge: "מתאים ל-1,000+ לידים/חודש",
      features: [
        "צוות סוכנים מלא: אורה + אור + בר",
        "חיבור לסושיאל מדיה (TikTok / Instagram DM)",
        "אפיון מתקדם ברמת אנטרפרייז",
        "אינטגרציה מלאה (CRM + WhatsApp + SMS + PayPal + N8N)",
        "דשבורד VIP + דוחות בזמן אמת",
        "תמיכה עדיפות (תגובה תוך 4 שעות)",
        "שיחות אופטימיזציה שבועיות",
        "מנהל חשבון ייעודי",
        "מערכת לימוד אוטונומי",
      ],
      examples: ["2,000 דקות = ₪4,297/חודש", "3,500 דקות = ₪5,647/חודש"],
      commitment: "🔓 אין התחייבות - בטלו בכל עת",
      loyaltyBonus: null,
      cta: "התחל עם SCALE",
      popular: false,
      premium: false,
    },
    {
      id: "buildOwn",
      name: "BUILD + OWN",
      tagline: 'העסק שלך, המערכת שלך',
      monthlyPrice: "₪1,400",
      setupFee: "₪21,000 בנייה חד-פעמית",
      perMinute: null,
      priceNote: "+ ₪1,400/חודש תחזוקה",
      badge: "💎 בעלות מלאה",
      features: [
        "בעלות מלאה על קוד המקור",
        "עד 3 סוכנים מותאמים אישית",
        "בנוי על התשתית שלכם (VPS/N8N)",
        "מוכן ל-White-label",
        "הדרכה ותיעוד מלא",
        "תמיכה רבעונית + עדכונים",
      ],
      examples: ["עלויות תפעול: ~₪2,750/חודש", 'סה"כ חודשי: ~₪4,150'],
      commitment: "חיסכון ₪86,492 ב-3 שנים לעומת SCALE",
      loyaltyBonus: null,
      cta: "קבע ייעוץ",
      popular: false,
      premium: true,
    },
  ];

  return (
    <section id="pricing" dir={isRTL ? "rtl" : "ltr"} className="relative py-24 overflow-hidden md:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-glow top-1/4 left-1/4 opacity-20" />
        <div className="hero-glow hero-glow-secondary bottom-1/4 right-1/4 opacity-15" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">{t.pricing.badge}</span>
          </div>
          <h2 className="section-title text-foreground mb-4">
            התוכנית המושלמת <span className="gradient-text-purple">לעסק שלך</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            כל חבילה כוללת את כל מה שצריך - סוכני AI חכמים, אישורי WhatsApp/SMS, ואינטגרציה מלאה ל-CRM. בחר את הקיבולת
            שמתאימה לך.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.popular
                  ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[0_0_40px_hsl(262_83%_58%/0.4)] scale-105"
                  : plan.premium
                    ? "glass-card border-2 border-amber-500/30 bg-amber-500/5"
                    : "glass-card-hover"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div
                  className={`absolute -top-3 ${
                    isRTL ? "left-4" : "right-4"
                  } bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1`}
                >
                  <Star className="w-3 h-3" />⭐ המומלץ
                </div>
              )}

              {/* Premium Icon */}
              {plan.premium && (
                <div className="text-3xl mb-2">
                  <Diamond className="w-8 h-8 text-amber-500" />
                </div>
              )}

              {/* Plan Name */}
              <div
                className={`text-sm ${
                  plan.popular ? "opacity-90" : "text-muted-foreground"
                } font-mono uppercase tracking-wider`}
              >
                {plan.name}
              </div>
              <div
                className={`text-lg mb-3 font-semibold ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}
              >
                {plan.tagline}
              </div>

              {/* Setup Fee */}
              <div className={`text-sm mb-2 ${plan.popular ? "opacity-75" : "text-muted-foreground"}`}>
                {plan.setupFee}
              </div>

              {/* Monthly Price */}
              {!plan.premium && (
                <div className={`text-4xl font-bold mb-1 ${plan.popular ? "text-primary-foreground" : "text-primary"}`}>
                  {plan.monthlyPrice}
                  <span className="text-lg font-normal opacity-75">/חודש</span>
                </div>
              )}

              {/* Per Minute */}
              {plan.perMinute && (
                <div
                  className={`text-lg font-bold mb-3 ${plan.popular ? "text-primary-foreground/90" : "text-secondary"}`}
                >
                  {plan.perMinute}
                </div>
              )}

              {/* Price Note (BUILD + OWN) */}
              {plan.priceNote && <div className="text-sm font-semibold text-amber-400 mb-3">{plan.priceNote}</div>}

              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm mb-4 w-fit ${
                  plan.popular
                    ? "bg-white/20 text-primary-foreground"
                    : plan.premium
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-primary/10 text-primary border border-primary/20"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                {plan.badge}
              </div>

              {/* Features */}
              <ul className="space-y-3 my-4 flex-grow">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 text-sm ${isRTL ? "flex-row-reverse text-right" : ""}`}
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-primary-foreground" : plan.premium ? "text-amber-400" : "text-primary"
                      }`}
                    />
                    <span className={plan.popular ? "text-primary-foreground/90" : ""}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Examples Box */}
              {plan.examples && (
                <div
                  className={`rounded-lg p-3 mb-3 text-sm ${
                    plan.popular
                      ? "bg-white/10 text-primary-foreground/90"
                      : plan.premium
                        ? "bg-amber-500/10 border border-amber-500/20"
                        : "bg-primary/5 border border-primary/10"
                  }`}
                >
                  <strong className="block mb-1">📊 דוגמה:</strong>
                  {plan.examples.map((ex, i) => (
                    <p key={i} className="text-xs opacity-90">
                      {ex}
                    </p>
                  ))}
                </div>
              )}

              {/* Loyalty Bonus (GROWTH only) */}
              {plan.loyaltyBonus && (
                <div className="rounded-lg p-3 mb-3 text-sm bg-yellow-400/20 border border-yellow-400/40">
                  <strong className="block text-yellow-300 mb-1">{plan.loyaltyBonus.title}</strong>
                  <p className="text-xs text-yellow-200/90">{plan.loyaltyBonus.text}</p>
                  <p className="text-xs text-yellow-200/70 mt-1">{plan.loyaltyBonus.subtext}</p>
                </div>
              )}

              {/* Commitment Note */}
              <div
                className={`text-xs mb-4 text-center rounded-lg p-2 ${
                  plan.popular
                    ? "bg-white/10 text-primary-foreground/80"
                    : plan.premium
                      ? "bg-amber-500/10 text-amber-300/80"
                      : "bg-primary/5 text-muted-foreground"
                }`}
              >
                {plan.commitment}
              </div>

              {/* CTA Button */}
              <Button
                variant={plan.popular ? "outline" : plan.premium ? "hero" : "heroGlass"}
                className={`w-full ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-white/90 border-0"
                    : plan.premium
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
                      : ""
                }`}
              >
                {plan.cta} →
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center space-y-3"
        >
          <p className="text-sm text-muted-foreground">
            💡 <strong>חודש איטי?</strong> אפשר להשהות את השירות – אפס חיוב (מלבד הריטיינר).
          </p>
          <p className="text-sm text-muted-foreground">
            🎁 <strong>מבצע השקה:</strong> 3 הלקוחות הראשונים מקבלים ₪1,000 זיכוי בחודש השלישי.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
