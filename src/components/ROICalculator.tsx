import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingDown, Zap, AlertTriangle, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  formatValue: (val: number) => string;
  onChange: (val: number) => void;
  isRTL: boolean;
}

const Slider = ({ label, value, min, max, step, minLabel, maxLabel, formatValue, onChange, isRTL }: SliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider-container mb-8">
      <label className="block text-sm font-medium text-foreground mb-4 text-left">
        {label}
      </label>
      <div className="relative pt-8">
        <div
          className="value-bubble absolute -top-1 px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap pointer-events-none z-10"
          style={{
            left: `${percentage}%`,
            transform: 'translateX(-50%)',
            background: '#C9A96E',
            color: '#000',
          }}
        >
          {formatValue(value)}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent" style={{ borderTopColor: '#C9A96E' }} />
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="roi-slider w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #C9A96E ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`,
          }}
        />

        <div className="flex justify-between mt-2 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
    </div>
  );
};

const ROICalculator = () => {
  const { language } = useLanguage();
  const isRTL = language === 'he';
  const [isOpen, setIsOpen] = useState(false);

  // Inputs
  const [leadsPerMonth, setLeadsPerMonth] = useState(2000);
  const [costPerLead, setCostPerLead] = useState(190);
  const [missedLeadsPercent, setMissedLeadsPercent] = useState(73);
  const [conversionRate, setConversionRate] = useState(8);
  const [avgDealValue, setAvgDealValue] = useState(12000);

  // Outputs
  const [lostLeads, setLostLeads] = useState(0);
  const [lostDeals, setLostDeals] = useState(0);
  const [wastedMarketing, setWastedMarketing] = useState(0);
  const [directRevenueLoss, setDirectRevenueLoss] = useState(0);
  const [totalDamage, setTotalDamage] = useState(0);

  useEffect(() => {
    const lostLeadsCount = Math.round(leadsPerMonth * (missedLeadsPercent / 100));
    const lostDealsCount = Math.round(lostLeadsCount * (conversionRate / 100));
    const wasted = lostLeadsCount * costPerLead;
    const revenueLoss = lostDealsCount * avgDealValue;
    const total = wasted + revenueLoss;

    setLostLeads(lostLeadsCount);
    setLostDeals(lostDealsCount);
    setWastedMarketing(wasted);
    setDirectRevenueLoss(revenueLoss);
    setTotalDamage(total);
  }, [leadsPerMonth, costPerLead, missedLeadsPercent, conversionRate, avgDealValue]);

  const formatCurrency = (val: number) => `$${val.toLocaleString()}`;
  const formatNumber = (val: number) => val.toLocaleString();

  return (
    <section id="roi-calculator" dir="ltr" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="section-title text-foreground mb-6">
              How Much Money Are You{' '}
              <span style={{ color: '#C9A96E' }}>Losing Each Month?</span>
            </h2>
            <CollapsibleTrigger asChild>
              <button
                className={`group inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${!isOpen ? 'animate-pulse-glow' : ''}`}
              >
                <Calculator className="w-4 h-4" style={{ color: '#C9A96E' }} />
                <span className="label-micro">Financial Damage Calculator</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} style={{ color: '#C9A96E' }} />
              </button>
            </CollapsibleTrigger>
          </motion.div>

          <CollapsibleContent>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="glass-card p-8 rounded-2xl">
                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
                      <Slider
                        label="New leads per month?"
                        value={leadsPerMonth}
                        min={100}
                        max={10000}
                        step={100}
                        minLabel="100 leads"
                        maxLabel="10,000 leads"
                        formatValue={(v) => `${v.toLocaleString()} leads`}
                        onChange={setLeadsPerMonth}
                        isRTL={isRTL}
                      />
                      <Slider
                        label="Cost per lead?"
                        value={costPerLead}
                        min={10}
                        max={500}
                        step={5}
                        minLabel="$10"
                        maxLabel="$500"
                        formatValue={(v) => `$${v}`}
                        onChange={setCostPerLead}
                        isRTL={isRTL}
                      />
                      <Slider
                        label="% of leads not contacted within 5 seconds?"
                        value={missedLeadsPercent}
                        min={0}
                        max={100}
                        step={1}
                        minLabel="0%"
                        maxLabel="100%"
                        formatValue={(v) => `${v}%`}
                        onChange={setMissedLeadsPercent}
                        isRTL={isRTL}
                      />
                      <Slider
                        label="Lead-to-deal conversion rate?"
                        value={conversionRate}
                        min={1}
                        max={50}
                        step={1}
                        minLabel="1%"
                        maxLabel="50%"
                        formatValue={(v) => `${v}%`}
                        onChange={setConversionRate}
                        isRTL={isRTL}
                      />
                      <div className="md:col-span-2 max-w-md mx-auto w-full">
                        <Slider
                          label="Average deal value?"
                          value={avgDealValue}
                          min={500}
                          max={50000}
                          step={500}
                          minLabel="$500"
                          maxLabel="$50,000"
                          formatValue={(v) => `$${v.toLocaleString()}`}
                          onChange={setAvgDealValue}
                          isRTL={isRTL}
                        />
                      </div>
                    </div>

                    {/* Financial Damage Report */}
                    <div className="space-y-6">
                      {/* Total Damage */}
                      <div
                        className="rounded-xl p-6 text-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))',
                          border: '1px solid rgba(239,68,68,0.3)',
                        }}
                      >
                        <p className="text-xs uppercase tracking-widest mb-2 flex items-center justify-center gap-2" style={{ color: 'rgba(252,165,165,1)' }}>
                          <TrendingDown className="w-4 h-4" />
                          Financial Damage Report
                        </p>
                        <p className="text-sm mb-2" style={{ color: 'rgba(252,165,165,0.85)' }}>
                          Total estimated monthly financial damage
                        </p>
                        <p className="text-5xl font-bold font-mono animate-pulse" style={{ color: 'rgba(248,113,113,1)' }}>
                          {formatCurrency(totalDamage)}
                        </p>
                        <p className="text-xs mt-2" style={{ color: 'rgba(248,113,113,0.7)' }}>
                          per month · conservative estimate
                        </p>
                      </div>

                      {/* Loss Breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-xl p-5" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                          <p className="text-sm mb-2" style={{ color: 'rgba(248,113,113,1)' }}>💸 Wasted marketing budget</p>
                          <p className="text-3xl font-bold font-mono mb-1" style={{ color: 'rgba(248,113,113,1)' }}>
                            {formatCurrency(wastedMarketing)}
                          </p>
                          <p className="text-xs" style={{ color: 'rgba(248,113,113,0.7)' }}>
                            {formatNumber(lostLeads)} leads × ${costPerLead} per lead
                          </p>
                        </div>

                        <div className="rounded-xl p-5" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                          <p className="text-sm mb-2" style={{ color: 'rgba(248,113,113,1)' }}>📉 Direct revenue loss</p>
                          <p className="text-3xl font-bold font-mono mb-1" style={{ color: 'rgba(248,113,113,1)' }}>
                            {formatCurrency(directRevenueLoss)}
                          </p>
                          <p className="text-xs" style={{ color: 'rgba(248,113,113,0.7)' }}>
                            {formatNumber(lostDeals)} lost deals × {formatCurrency(avgDealValue)}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-xl p-5 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <p className="text-4xl font-bold font-mono" style={{ color: '#C9A96E' }}>{formatNumber(lostLeads)}</p>
                          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>lost leads per month</p>
                        </div>
                        <div className="rounded-xl p-5 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <p className="text-4xl font-bold font-mono" style={{ color: '#C9A96E' }}>{formatNumber(lostDeals)}</p>
                          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>deals that won't close</p>
                        </div>
                      </div>

                      {/* 5-Second Insight */}
                      <div
                        className="rounded-xl p-6"
                        style={{
                          background: 'linear-gradient(135deg, rgba(201,169,110,0.12), rgba(201,169,110,0.04))',
                          border: '1px solid rgba(201,169,110,0.3)',
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.2)' }}>
                            <Zap className="w-5 h-5" style={{ color: '#C9A96E' }} />
                          </div>
                          <div>
                            <p className="text-sm font-bold mb-1" style={{ color: '#C9A96E' }}>The 5-Second Insight</p>
                            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                              A VoxOps Aesthetics voice agent answers every lead within 5 seconds, 24/7 — and brings back those{' '}
                              <span className="font-bold" style={{ color: '#C9A96E' }}>{formatCurrency(totalDamage)}</span>{' '}
                              every month.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div
                        className="rounded-xl p-6 text-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(201,169,110,0.1))',
                          border: '1px solid rgba(201,169,110,0.25)',
                        }}
                      >
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5" style={{ color: '#C9A96E' }} />
                          <p className="text-base font-bold" style={{ color: '#C9A96E' }}>
                            Don't let your money keep flowing to competitors
                          </p>
                        </div>
                        <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.75)' }}>
                          We'll build you a custom voice agent that answers every lead within 5 seconds, 24/7 —
                          and stops the <span className="font-bold" style={{ color: '#C9A96E' }}>{formatCurrency(totalDamage)}/month</span> leak.
                        </p>
                        <Button variant="hero" size="xl" className="group" asChild>
                          <a href="#contact" className="flex items-center gap-2">
                            📅 Book a Free Strategy Call
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </a>
                        </Button>
                        <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          15 minutes, Zoom or phone · zero commitment
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};

export default ROICalculator;
