import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Star, Diamond, ChevronDown } from 'lucide-react';
import { useState } from 'react';
const PricingSection = () => {
  const {
    t,
    language
  } = useLanguage();
  const isRTL = language === 'he';
  const [expandedAddons, setExpandedAddons] = useState<{
    [key: string]: boolean;
  }>({});
  const toggleAddon = (planId: string) => {
    setExpandedAddons(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };
  const plans = [{
    id: 'starter',
    name: t.pricing.starter.name,
    tagline: t.pricing.starter.tagline,
    price: '₪1,997',
    period: t.pricing.perMonth,
    setup: t.pricing.starter.setup,
    badge: t.pricing.starter.badge,
    features: t.pricing.starter.features,
    addons: t.pricing.starter.addons,
    cta: t.pricing.starter.cta,
    popular: false,
    premium: false
  }, {
    id: 'growth',
    name: t.pricing.growth.name,
    tagline: t.pricing.growth.tagline,
    price: '₪3,997',
    period: t.pricing.perMonth,
    setup: t.pricing.growth.setup,
    badge: t.pricing.growth.badge,
    features: t.pricing.growth.features,
    addons: t.pricing.growth.addons,
    cta: t.pricing.growth.cta,
    popular: true,
    premium: false
  }, {
    id: 'scale',
    name: t.pricing.scale.name,
    tagline: t.pricing.scale.tagline,
    price: '₪6,997',
    period: t.pricing.perMonth,
    setup: t.pricing.scale.setup,
    badge: t.pricing.scale.badge,
    features: t.pricing.scale.features,
    addons: t.pricing.scale.addons,
    cta: t.pricing.scale.cta,
    popular: false,
    premium: false
  }, {
    id: 'buildOwn',
    name: t.pricing.buildOwn.name,
    tagline: t.pricing.buildOwn.tagline,
    price: '₪21,000',
    priceNote: t.pricing.buildOwn.priceNote,
    badge: t.pricing.buildOwn.badge,
    features: t.pricing.buildOwn.features,
    addons: [],
    cta: t.pricing.buildOwn.cta,
    popular: false,
    premium: true
  }];
  return <section id="pricing" dir={isRTL ? 'rtl' : 'ltr'} className="relative py-24 overflow-hidden md:py-[28px]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-glow top-1/4 left-1/4 opacity-20" />
        <div className="hero-glow hero-glow-secondary bottom-1/4 right-1/4 opacity-15" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">{t.pricing.badge}</span>
          </div>
          <h2 className="section-title text-foreground mb-4">
            {t.pricing.title}{' '}
            <span className="gradient-text-purple">{t.pricing.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => <motion.div key={plan.id} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} className={`relative rounded-2xl p-6 flex flex-col ${plan.popular ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[0_0_40px_hsl(262_83%_58%/0.4)]' : plan.premium ? 'glass-card border-2 border-amber-500/30 bg-amber-500/5' : 'glass-card-hover'}`}>
              {/* Popular Badge */}
              {plan.popular && <div className={`absolute -top-3 ${isRTL ? 'left-4' : 'right-4'} bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1`}>
                  <Star className="w-3 h-3" />
                  {t.pricing.mostPopular}
                </div>}

              {/* Premium Icon */}
              {plan.premium && <div className="text-3xl mb-2">
                  <Diamond className="w-8 h-8 text-amber-500" />
                </div>}

              {/* Plan Name */}
              <div className={`text-sm ${plan.popular ? 'opacity-90' : 'text-muted-foreground'} font-mono uppercase tracking-wider`}>
                {plan.name}
              </div>
              <div className={`text-lg mb-3 font-semibold ${plan.popular ? 'text-primary-foreground' : 'text-foreground'}`}>
                {plan.tagline}
              </div>

              {/* Price */}
              <div className={`text-4xl font-bold mb-1 ${plan.popular ? 'text-primary-foreground' : ''}`}>
                {plan.price}
                {plan.period && <span className="text-lg font-normal opacity-75">/{plan.period}</span>}
              </div>
              {plan.setup && <div className={`text-sm mb-4 ${plan.popular ? 'opacity-75' : 'text-muted-foreground'}`}>
                  {plan.setup}
                </div>}
              {plan.priceNote && <div className="text-lg font-bold text-amber-500 mb-4">
                  {plan.priceNote}
                </div>}

              {/* Badge */}
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm mb-4 w-fit ${plan.popular ? 'bg-white/20 text-primary-foreground' : plan.premium ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                <Sparkles className="w-3 h-3" />
                {plan.badge}
              </div>

              {/* Features */}
              <ul className="space-y-3 my-6 flex-grow">
                {plan.features.map((feature, i) => <li key={i} className={`flex items-start gap-2 text-sm ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-primary-foreground' : plan.premium ? 'text-amber-400' : 'text-primary'}`} />
                    <span className={plan.popular ? 'text-primary-foreground/90' : ''}>{feature}</span>
                  </li>)}
              </ul>

              {/* Add-ons Dropdown */}
              {plan.addons && plan.addons.length > 0 && <div className="mb-4">
                  <button onClick={() => toggleAddon(plan.id)} className={`flex items-center gap-2 text-sm cursor-pointer transition-colors ${plan.popular ? 'opacity-75 hover:opacity-100' : 'text-muted-foreground hover:text-foreground'} ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedAddons[plan.id] ? 'rotate-180' : ''}`} />
                    {t.pricing.optionalAddons}
                  </button>
                  {expandedAddons[plan.id] && <ul className={`text-sm mt-2 space-y-1 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                      {plan.addons.map((addon, i) => <li key={i} className={`${plan.popular ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          □ {addon}
                        </li>)}
                    </ul>}
                </div>}

              {/* CTA Button */}
              <Button variant={plan.popular ? 'outline' : plan.premium ? 'hero' : 'heroGlass'} className={`w-full ${plan.popular ? 'bg-white text-primary hover:bg-white/90 border-0' : plan.premium ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700' : ''}`}>
                {plan.cta} →
              </Button>
            </motion.div>)}
        </div>

        {/* Bottom Link */}
        
      </div>
    </section>;
};
export default PricingSection;