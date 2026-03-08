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
        <div 
          className="value-bubble absolute -top-1 px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap pointer-events-none z-10"
          style={{ 
            left: isRTL ? 'auto' : `${percentage}%`,
            right: isRTL ? `${percentage}%` : 'auto',
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
            background: isRTL 
              ? `linear-gradient(to left, #C9A96E ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`
              : `linear-gradient(to right, #C9A96E ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`
          }}
        />
        
        <div className={`flex justify-between mt-2 text-xs ${isRTL ? 'flex-row-reverse' : ''}`} style={{ color: 'rgba(255,255,255,0.35)' }}>
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
  
  const [callsPerWeek, setCallsPerWeek] = useState(50);
  const [missedCallsPercent, setMissedCallsPercent] = useState(30);
  const [avgTreatmentPrice, setAvgTreatmentPrice] = useState(800);
  const [appointmentsPerMonth, setAppointmentsPerMonth] = useState(80);
  const [noShowPercent, setNoShowPercent] = useState(25);
  
  const [lostFromCalls, setLostFromCalls] = useState(0);
  const [lostFromNoShows, setLostFromNoShows] = useState(0);
  const [totalLost, setTotalLost] = useState(0);
  const [voxopsSavings, setVoxopsSavings] = useState(0);
  const [voxopsCost, setVoxopsCost] = useState(0);
  const [roi, setRoi] = useState(0);
  
  const conversionRate = 0.4;
  const callRecoveryRate = 0.65;
  const noShowReductionRate = 0.38;
  
  useEffect(() => {
    const monthlyMissedCalls = (callsPerWeek * 4) * (missedCallsPercent / 100);
    const lostCalls = monthlyMissedCalls * conversionRate * avgTreatmentPrice;
    setLostFromCalls(Math.round(lostCalls));
    
    const lostNoShows = appointmentsPerMonth * (noShowPercent / 100) * avgTreatmentPrice;
    setLostFromNoShows(Math.round(lostNoShows));
    
    const total = lostCalls + lostNoShows;
    setTotalLost(Math.round(total));
    
    let monthlyCost = 1997;
    if (callsPerWeek > 80 || appointmentsPerMonth > 150) monthlyCost = 3997;
    if (callsPerWeek > 120 || appointmentsPerMonth > 200) monthlyCost = 6997;
    setVoxopsCost(monthlyCost * 12);
    
    const callRecovery = lostCalls * callRecoveryRate;
    const noShowRecovery = lostNoShows * noShowReductionRate;
    const annualSavings = (callRecovery + noShowRecovery) * 12;
    setVoxopsSavings(Math.round(annualSavings));
    
    const annualCost = monthlyCost * 12;
    const roiValue = annualSavings > 0 ? ((annualSavings - annualCost) / annualCost) * 100 : 0;
    setRoi(Math.round(roiValue));
  }, [callsPerWeek, missedCallsPercent, avgTreatmentPrice, appointmentsPerMonth, noShowPercent]);
  
  const formatCurrency = (val: number) => `₪${val.toLocaleString()}`;
  
  return (
    <section id="roi-calculator" dir={isRTL ? 'rtl' : 'ltr'} className="relative py-24 overflow-hidden">
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
              {isRTL ? 'כמה כסף אתם מאבדים ' : 'How Much Money Are You '}
              <span style={{ color: '#C9A96E' }}>{isRTL ? 'כל חודש?' : 'Losing Each Month?'}</span>
            </h2>
            <CollapsibleTrigger asChild>
              <button 
                className={`group inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''} ${!isOpen ? 'animate-pulse-glow' : ''}`}
              >
                <Calculator className="w-4 h-4" style={{ color: '#C9A96E' }} />
                <span className="label-micro">
                  {isRTL ? 'מחשבון ROI' : 'ROI Calculator'}
                </span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
                      <Slider label={isRTL ? 'כמה שיחות מקבלים בשבוע בערך?' : 'How many calls per week?'} value={callsPerWeek} min={10} max={200} step={5} minLabel={isRTL ? '10 שיחות' : '10 calls'} maxLabel={isRTL ? '200 שיחות' : '200 calls'} formatValue={(v) => isRTL ? `${v} שיחות` : `${v} calls`} onChange={setCallsPerWeek} isRTL={isRTL} />
                      <Slider label={isRTL ? 'כמה אחוז משיחות לא נענות?' : 'Missed calls percentage?'} value={missedCallsPercent} min={10} max={50} step={5} minLabel="10%" maxLabel="50%" formatValue={(v) => `${v}%`} onChange={setMissedCallsPercent} isRTL={isRTL} />
                      <Slider label={isRTL ? 'מחיר ממוצע לטיפול?' : 'Average treatment price?'} value={avgTreatmentPrice} min={300} max={3000} step={100} minLabel="₪300" maxLabel="₪3,000" formatValue={(v) => `₪${v.toLocaleString()}`} onChange={setAvgTreatmentPrice} isRTL={isRTL} />
                      <Slider label={isRTL ? 'כמה תורים בחודש בערך?' : 'Appointments per month?'} value={appointmentsPerMonth} min={20} max={300} step={10} minLabel={isRTL ? '20 תורים' : '20 appts'} maxLabel={isRTL ? '300 תורים' : '300 appts'} formatValue={(v) => isRTL ? `${v} תורים` : `${v} appts`} onChange={setAppointmentsPerMonth} isRTL={isRTL} />
                      <div className="md:col-span-2 max-w-md mx-auto w-full">
                        <Slider label={isRTL ? 'שיעור אי-הגעות נוכחי?' : 'Current no-show rate?'} value={noShowPercent} min={10} max={50} step={5} minLabel="10%" maxLabel="50%" formatValue={(v) => `${v}%`} onChange={setNoShowPercent} isRTL={isRTL} />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                        <div className="rounded-xl p-5 text-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                          <p className="text-sm mb-2" style={{ color: 'rgba(248,113,113,1)' }}>💸 {isRTL ? 'אבוד משיחות שלא נענו' : 'Lost from missed calls'}</p>
                          <p className="text-3xl font-bold font-mono" style={{ color: 'rgba(248,113,113,1)' }}>{formatCurrency(lostFromCalls)}</p>
                          <p className="text-xs mt-1" style={{ color: 'rgba(248,113,113,0.7)' }}>{isRTL ? 'בחודש' : 'per month'}</p>
                        </div>
                        
                        <div className="rounded-xl p-5 text-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                          <p className="text-sm mb-2" style={{ color: 'rgba(248,113,113,1)' }}>🚫 {isRTL ? 'אבוד מאי-הגעות' : 'Lost from no-shows'}</p>
                          <p className="text-3xl font-bold font-mono" style={{ color: 'rgba(248,113,113,1)' }}>{formatCurrency(lostFromNoShows)}</p>
                          <p className="text-xs mt-1" style={{ color: 'rgba(248,113,113,0.7)' }}>{isRTL ? 'בחודש' : 'per month'}</p>
                        </div>
                      </div>
                      
                      <div className="rounded-xl p-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))', border: '1px solid rgba(239,68,68,0.3)' }}>
                        <p className="text-sm mb-2" style={{ color: 'rgba(252,165,165,1)' }}>{isRTL ? 'סה"כ הכנסות אבודות' : 'Total Lost Revenue'}</p>
                        <p className="text-5xl font-bold font-mono animate-pulse" style={{ color: 'rgba(248,113,113,1)' }}>{formatCurrency(totalLost)}</p>
                        <p className="text-sm mt-2" style={{ color: 'rgba(248,113,113,0.7)' }}>
                          {isRTL ? 'בחודש' : 'per month'} | {formatCurrency(totalLost * 12)} {isRTL ? 'בשנה' : 'per year'}
                        </p>
                      </div>
                      
                      {/* VoxOps Savings - GOLD */}
                      <div className="rounded-xl p-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(201,169,110,0.05))', border: '1px solid rgba(201,169,110,0.3)' }}>
                        <p className="text-sm mb-2 flex items-center justify-center gap-2" style={{ color: '#C9A96E' }}>
                          <TrendingUp className="w-4 h-4" />
                          {isRTL ? 'VoxOps יכול לחסוך/להחזיר לכם' : 'VoxOps Can Save You'}
                        </p>
                        <p className="text-5xl font-bold font-mono" style={{ color: '#C9A96E' }}>{formatCurrency(voxopsSavings)}</p>
                        <p className="text-sm mt-2" style={{ color: 'rgba(201,169,110,0.7)' }}>{isRTL ? 'בשנה' : 'per year'}</p>
                        
                        <div className={`flex items-center justify-center gap-6 mt-4 text-xs ${isRTL ? 'flex-row-reverse' : ''}`} style={{ color: 'rgba(255,255,255,0.6)' }}>
                          <span>{isRTL ? 'עלות VoxOps:' : 'VoxOps Cost:'} {formatCurrency(voxopsCost)}/{isRTL ? 'שנה' : 'yr'}</span>
                          <span className="font-bold" style={{ color: '#C9A96E' }}>ROI: {roi}%</span>
                        </div>
                        
                        <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          * {isRTL 
                            ? 'חישוב מבוסס על 65% שיפור בהמרת שיחות ו-38% הפחתה באי-הגעות'
                            : 'Based on 65% call conversion improvement and 38% no-show reduction'}
                        </p>
                      </div>
                      
                      <div className="text-center pt-4">
                        <Button variant="hero" size="xl" className="group" asChild>
                          <a href="#contact" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {isRTL ? 'קבעו אבחון חינמי - נראה איך לחסוך את הכסף הזה' : 'Book Free Audit - See How to Save This Money'}
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </a>
                        </Button>
                        <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
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
