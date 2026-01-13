import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, ChevronDown } from 'lucide-react';
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
      <label className={`block text-sm font-medium text-foreground mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        {label}
      </label>
      <div className="relative pt-8">
        {/* Value Bubble */}
        <div 
          className="value-bubble absolute -top-1 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap pointer-events-none z-10"
          style={{ 
            left: isRTL ? 'auto' : `${percentage}%`,
            right: isRTL ? `${percentage}%` : 'auto',
            transform: 'translateX(-50%)'
          }}
        >
          {formatValue(value)}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-primary" />
        </div>
        
        {/* Slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="roi-slider w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: isRTL 
              ? `linear-gradient(to left, hsl(var(--primary)) ${percentage}%, hsl(var(--muted)) ${percentage}%)`
              : `linear-gradient(to right, hsl(var(--primary)) ${percentage}%, hsl(var(--muted)) ${percentage}%)`
          }}
        />
        
        {/* Min/Max Labels */}
        <div className={`flex justify-between mt-2 text-xs text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
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
  
  // Slider values
  const [callsPerWeek, setCallsPerWeek] = useState(50);
  const [missedCallsPercent, setMissedCallsPercent] = useState(30);
  const [avgTreatmentPrice, setAvgTreatmentPrice] = useState(800);
  const [appointmentsPerMonth, setAppointmentsPerMonth] = useState(80);
  const [noShowPercent, setNoShowPercent] = useState(25);
  
  // Calculated values
  const [lostFromCalls, setLostFromCalls] = useState(0);
  const [lostFromNoShows, setLostFromNoShows] = useState(0);
  const [totalLost, setTotalLost] = useState(0);
  const [voxopsSavings, setVoxopsSavings] = useState(0);
  const [voxopsCost, setVoxopsCost] = useState(0);
  const [roi, setRoi] = useState(0);
  
  // Constants
  const conversionRate = 0.4; // 40% of answered calls convert
  const callRecoveryRate = 0.65; // VoxOps recovers 65% of missed calls
  const noShowReductionRate = 0.38; // VoxOps reduces no-shows by 38%
  
  useEffect(() => {
    // Calculate lost from missed calls
    const monthlyMissedCalls = (callsPerWeek * 4) * (missedCallsPercent / 100);
    const lostCalls = monthlyMissedCalls * conversionRate * avgTreatmentPrice;
    setLostFromCalls(Math.round(lostCalls));
    
    // Calculate lost from no-shows
    const lostNoShows = appointmentsPerMonth * (noShowPercent / 100) * avgTreatmentPrice;
    setLostFromNoShows(Math.round(lostNoShows));
    
    // Total lost
    const total = lostCalls + lostNoShows;
    setTotalLost(Math.round(total));
    
    // VoxOps tier pricing
    let monthlyCost = 1997; // Starter
    if (callsPerWeek > 80 || appointmentsPerMonth > 150) {
      monthlyCost = 3997; // Growth
    }
    if (callsPerWeek > 120 || appointmentsPerMonth > 200) {
      monthlyCost = 6997; // Scale
    }
    setVoxopsCost(monthlyCost * 12);
    
    // VoxOps recovery
    const callRecovery = lostCalls * callRecoveryRate;
    const noShowRecovery = lostNoShows * noShowReductionRate;
    const annualSavings = (callRecovery + noShowRecovery) * 12;
    setVoxopsSavings(Math.round(annualSavings));
    
    // ROI calculation
    const annualCost = monthlyCost * 12;
    const roiValue = annualSavings > 0 ? ((annualSavings - annualCost) / annualCost) * 100 : 0;
    setRoi(Math.round(roiValue));
  }, [callsPerWeek, missedCallsPercent, avgTreatmentPrice, appointmentsPerMonth, noShowPercent]);
  
  const formatCurrency = (val: number) => `₪${val.toLocaleString()}`;
  
  return (
    <section id="roi-calculator" dir={isRTL ? 'rtl' : 'ltr'} className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          {/* Toggle Badge - styled like other section badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="section-title text-foreground mb-6">
              {isRTL ? 'כמה כסף אתם מאבדים ' : 'How Much Money Are You '}
              <span className="gradient-text-purple">{isRTL ? 'כל חודש?' : 'Losing Each Month?'}</span>
            </h2>
            <CollapsibleTrigger asChild>
              <button 
                className={`group inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:border-primary/40 ${isRTL ? 'flex-row-reverse' : ''} ${!isOpen ? 'animate-pulse-glow' : ''}`}
              >
                <Calculator className="w-4 h-4 text-primary" />
                <span className="label-micro">
                  {isRTL ? 'מחשבון ROI' : 'ROI Calculator'}
                </span>
                <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
          </motion.div>
          
          {/* Collapsible Content */}
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
                  {/* Calculator Card */}
                  <div className="glass-card p-8 rounded-2xl">
            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
              <Slider
                label={isRTL ? 'כמה שיחות מקבלים בשבוע בערך?' : 'How many calls per week?'}
                value={callsPerWeek}
                min={10}
                max={200}
                step={5}
                minLabel={isRTL ? '10 שיחות' : '10 calls'}
                maxLabel={isRTL ? '200 שיחות' : '200 calls'}
                formatValue={(v) => isRTL ? `${v} שיחות` : `${v} calls`}
                onChange={setCallsPerWeek}
                isRTL={isRTL}
              />
              
              <Slider
                label={isRTL ? 'כמה אחוז משיחות לא נענות?' : 'Missed calls percentage?'}
                value={missedCallsPercent}
                min={10}
                max={50}
                step={5}
                minLabel="10%"
                maxLabel="50%"
                formatValue={(v) => `${v}%`}
                onChange={setMissedCallsPercent}
                isRTL={isRTL}
              />
              
              <Slider
                label={isRTL ? 'מחיר ממוצע לטיפול?' : 'Average treatment price?'}
                value={avgTreatmentPrice}
                min={300}
                max={3000}
                step={100}
                minLabel="₪300"
                maxLabel="₪3,000"
                formatValue={(v) => `₪${v.toLocaleString()}`}
                onChange={setAvgTreatmentPrice}
                isRTL={isRTL}
              />
              
              <Slider
                label={isRTL ? 'כמה תורים בחודש בערך?' : 'Appointments per month?'}
                value={appointmentsPerMonth}
                min={20}
                max={300}
                step={10}
                minLabel={isRTL ? '20 תורים' : '20 appts'}
                maxLabel={isRTL ? '300 תורים' : '300 appts'}
                formatValue={(v) => isRTL ? `${v} תורים` : `${v} appts`}
                onChange={setAppointmentsPerMonth}
                isRTL={isRTL}
              />
              
              <div className="md:col-span-2 max-w-md mx-auto w-full">
                <Slider
                  label={isRTL ? 'שיעור אי-הגעות נוכחי?' : 'Current no-show rate?'}
                  value={noShowPercent}
                  min={10}
                  max={50}
                  step={5}
                  minLabel="10%"
                  maxLabel="50%"
                  formatValue={(v) => `${v}%`}
                  onChange={setNoShowPercent}
                  isRTL={isRTL}
                />
              </div>
            </div>
            
            {/* Results */}
            <div className="space-y-6">
              {/* Loss Cards */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-center">
                  <p className="text-sm text-red-400 mb-2">💸 {isRTL ? 'אבוד משיחות שלא נענו' : 'Lost from missed calls'}</p>
                  <p className="text-3xl font-bold text-red-400 font-mono">{formatCurrency(lostFromCalls)}</p>
                  <p className="text-xs text-red-400/70 mt-1">{isRTL ? 'בחודש' : 'per month'}</p>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 text-center">
                  <p className="text-sm text-red-400 mb-2">🚫 {isRTL ? 'אבוד מאי-הגעות' : 'Lost from no-shows'}</p>
                  <p className="text-3xl font-bold text-red-400 font-mono">{formatCurrency(lostFromNoShows)}</p>
                  <p className="text-xs text-red-400/70 mt-1">{isRTL ? 'בחודש' : 'per month'}</p>
                </div>
              </div>
              
              {/* Total Lost */}
              <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 rounded-xl p-6 text-center">
                <p className="text-sm text-red-300 mb-2">{isRTL ? 'סה"כ הכנסות אבודות' : 'Total Lost Revenue'}</p>
                <p className="text-5xl font-bold text-red-400 font-mono animate-pulse">{formatCurrency(totalLost)}</p>
                <p className="text-sm text-red-400/70 mt-2">
                  {isRTL ? 'בחודש' : 'per month'} | {formatCurrency(totalLost * 12)} {isRTL ? 'בשנה' : 'per year'}
                </p>
              </div>
              
              {/* VoxOps Savings */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-500/30 rounded-xl p-6 text-center">
                <p className="text-sm text-green-300 mb-2 flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {isRTL ? 'VoxOps יכול לחסוך/להחזיר לכם' : 'VoxOps Can Save You'}
                </p>
                <p className="text-5xl font-bold text-green-400 font-mono">{formatCurrency(voxopsSavings)}</p>
                <p className="text-sm text-green-400/70 mt-2">{isRTL ? 'בשנה' : 'per year'}</p>
                
                <div className={`flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{isRTL ? 'עלות VoxOps:' : 'VoxOps Cost:'} {formatCurrency(voxopsCost)}/{isRTL ? 'שנה' : 'yr'}</span>
                  <span className="text-green-400 font-bold">ROI: {roi}%</span>
                </div>
                
                <p className="text-xs text-muted-foreground mt-3">
                  * {isRTL 
                    ? 'חישוב מבוסס על 65% שיפור בהמרת שיחות ו-38% הפחתה באי-הגעות'
                    : 'Based on 65% call conversion improvement and 38% no-show reduction'}
                </p>
              </div>
              
              {/* CTA */}
              <div className="text-center pt-4">
                <Button variant="hero" size="xl" className="group" asChild>
                  <a href="#contact" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {isRTL ? 'קבעו אבחון חינמי - נראה איך לחסוך את הכסף הזה' : 'Book Free Audit - See How to Save This Money'}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  {isRTL ? '15 דקות, Zoom או טלפון | אפס התחייבות' : '15 minutes, Zoom or phone | Zero commitment'}
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
