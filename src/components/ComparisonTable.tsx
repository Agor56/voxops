import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

const ComparisonTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const toggleComparison = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        document.getElementById('comparison-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="w-full">
      {/* Toggle Button */}
      <div className="text-center my-8">
        <button
          onClick={toggleComparison}
          className="text-primary hover:text-primary/80 font-semibold text-lg inline-flex items-center gap-2 transition-all"
        >
          <span>{isOpen ? (isRTL ? 'הסתר השוואה' : 'Hide Comparison') : (isRTL ? 'השוואה מלאה כאן' : 'Full Comparison Here')}</span>
          <ChevronDown 
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Collapsible Comparison Table */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="comparison-table"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto my-8">
              {/* Section Headline */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-2 text-foreground">
                  {isRTL ? 'השוואה מפורטת - כל התכונות במבט אחד' : 'Detailed Comparison - All Features at a Glance'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL ? 'לא בטוחים איזו תוכנית מתאימה לכם? הנה כל מה שכלול בכל חבילה.' : "Not sure which plan is right for you? Here's everything included in each package."}
                </p>
              </div>

              {/* Comparison Table */}
              <table className="w-full border-collapse bg-card rounded-lg shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-4 text-right font-bold border-b border-border">{isRTL ? 'תכונה' : 'Feature'}</th>
                    <th className="p-4 text-center border-b border-border bg-card">
                      <div className="font-bold text-lg">STARTER</div>
                      <div className="text-sm text-muted-foreground">₪2,997/{isRTL ? 'חודש' : 'mo'}</div>
                    </th>
                    <th className="p-4 text-center border-b border-border bg-primary/10 relative">
                      <div className="absolute -top-3 right-1/2 transform translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                        ⭐ {isRTL ? 'הכי פופולרי' : 'Most Popular'}
                      </div>
                      <div className="font-bold text-lg text-primary mt-2">GROWTH</div>
                      <div className="text-sm text-primary/80">₪4,997/{isRTL ? 'חודש' : 'mo'}</div>
                    </th>
                    <th className="p-4 text-center border-b border-border bg-card">
                      <div className="font-bold text-lg">SCALE</div>
                      <div className="text-sm text-muted-foreground">₪7,997/{isRTL ? 'חודש' : 'mo'}</div>
                    </th>
                    <th className="p-4 text-center border-b border-border bg-amber-500/10">
                      <div className="font-bold text-lg">BUILD + OWN</div>
                      <div className="text-sm text-muted-foreground">₪22,000 + ₪2,400/{isRTL ? "חו׳" : 'mo'}</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Pricing Section */}
                  <tr className="bg-muted/30">
                    <td colSpan={5} className="p-3 font-bold text-right">💰 {isRTL ? 'תמחור והתחייבות' : 'Pricing & Commitment'}</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'תשלום חד-פעמי (התקנה)' : 'One-time Payment (Setup)'}</td>
                    <td className="p-4 text-center border-b border-border">₪3,500</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">₪3,500*</td>
                    <td className="p-4 text-center border-b border-border">₪5,000*</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">₪22,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'התחייבות מינימלית' : 'Minimum Commitment'}</td>
                    <td colSpan={4} className="p-4 text-center border-b border-border">
                      <div className="text-foreground font-medium">
                        {isRTL ? 'אין התחייבות. בטלו בכל עת.' : 'No commitment. Cancel anytime.'}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center justify-center gap-1">
                        <span>✅</span>
                        {isRTL 
                          ? 'הישארו 6 חודשים → קבלו ₪3,500 זיכוי בחודש 7 (ההתקנה חינם למעשה)'
                          : 'Stay 6 months → Get ₪3,500 credit in month 7 (Setup fee essentially free)'}
                      </div>
                    </td>
                  </tr>

                  {/* Agent Ora Section */}
                  <tr className="bg-muted/30">
                    <td colSpan={5} className="p-3 font-bold text-right">🎤 AGENT ORA ({isRTL ? 'קולי' : 'Voice'})</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'דקות קוליות כלולות/חודש' : 'Voice Minutes Included/Month'}</td>
                    <td className="p-4 text-center border-b border-border">500</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">1,200</td>
                    <td className="p-4 text-center border-b border-border">2,500</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">{isRTL ? 'מותאם אישית' : 'Custom'}</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'מענה 24/7' : '24/7 Answering'}</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">✅</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">✅</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'קביעת תורים אוטומטית' : 'Automatic Scheduling'}</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">✅</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">✅</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'עדכון CRM אוטומטי' : 'Automatic CRM Update'}</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">✅</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">✅</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'תמיכה ב-4 שפות' : '4 Languages Support'}</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">✅</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">✅</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'חריגת דקות' : 'Overage Minutes'}</td>
                    <td className="p-4 text-center border-b border-border text-sm">₪2/{isRTL ? 'דקה' : 'min'}</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10 text-sm">₪1.5/{isRTL ? 'דקה' : 'min'}</td>
                    <td className="p-4 text-center border-b border-border text-sm">₪1/{isRTL ? 'דקה' : 'min'}</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10 text-sm">{isRTL ? 'אתם מנהלים' : 'You manage'}</td>
                  </tr>

                  {/* Agent Or Section */}
                  <tr className="bg-muted/30">
                    <td colSpan={5} className="p-3 font-bold text-right">💬 AGENT OR (WhatsApp)</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'אישורי WhatsApp/SMS' : 'WhatsApp/SMS Confirmations'}</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">✅</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">✅</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'WhatsApp Agent שיחתי מלא' : 'Full Conversational WhatsApp Agent'}</td>
                    <td className="p-4 text-center border-b border-border">❌</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">✅</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">✅</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'סינון לידים (חם/פושר/קר)' : 'Lead Filtering (Hot/Warm/Cold)'}</td>
                    <td className="p-4 text-center border-b border-border">❌</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">✅</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">✅</td>
                  </tr>

                  {/* Agent Adam Section */}
                  <tr className="bg-muted/30">
                    <td colSpan={5} className="p-3 font-bold text-right">📞 AGENT ADAM ({isRTL ? 'יוצא' : 'Outbound'})</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'מעקב פרואקטיבי + החזרת מטופלים' : 'Proactive Follow-up + Patient Recovery'}</td>
                    <td className="p-4 text-center border-b border-border">❌</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">❌</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">✅</td>
                  </tr>

                  {/* Support Section */}
                  <tr className="bg-muted/30">
                    <td colSpan={5} className="p-3 font-bold text-right">🎧 {isRTL ? 'תמיכה' : 'Support'}</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'זמן מענה' : 'Response Time'}</td>
                    <td className="p-4 text-center border-b border-border text-sm">{isRTL ? '24-48 שעות' : '24-48 hours'}</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10 text-sm">{isRTL ? '12 שעות' : '12 hours'}</td>
                    <td className="p-4 text-center border-b border-border text-sm">{isRTL ? '4 שעות' : '4 hours'}</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10 text-sm">{isRTL ? '12 שעות' : '12 hours'}</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'שיחות אופטימיזציה' : 'Optimization Calls'}</td>
                    <td className="p-4 text-center border-b border-border">❌</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">{isRTL ? 'דו-שבועי' : 'Bi-weekly'}</td>
                    <td className="p-4 text-center border-b border-border">{isRTL ? 'שבועי' : 'Weekly'}</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">{isRTL ? 'רבעוני' : 'Quarterly'}</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'מנהל חשבון ייעודי' : 'Dedicated Account Manager'}</td>
                    <td className="p-4 text-center border-b border-border">❌</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">❌</td>
                    <td className="p-4 text-center border-b border-border">✅</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">❌</td>
                  </tr>

                  {/* Multi-location */}
                  <tr className="bg-muted/30">
                    <td colSpan={5} className="p-3 font-bold text-right">🏢 {isRTL ? 'רב-סניפים' : 'Multi-Location'}</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'תמיכה במספר מיקומים' : 'Multi-Location Support'}</td>
                    <td className="p-4 text-center border-b border-border">❌</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">❌</td>
                    <td className="p-4 text-center border-b border-border">{isRTL ? 'עד 3' : 'Up to 3'}</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">{isRTL ? 'ללא הגבלה' : 'Unlimited'}</td>
                  </tr>

                  {/* Ownership */}
                  <tr className="bg-muted/30">
                    <td colSpan={5} className="p-3 font-bold text-right">💎 {isRTL ? 'בעלות ושליטה' : 'Ownership & Control'}</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'בעלות על קוד המקור' : 'Source Code Ownership'}</td>
                    <td className="p-4 text-center border-b border-border">❌</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">❌</td>
                    <td className="p-4 text-center border-b border-border">❌</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">✅</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'בנוי על התשתית שלכם' : 'Built on Your Infrastructure'}</td>
                    <td className="p-4 text-center border-b border-border">❌</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10">❌</td>
                    <td className="p-4 text-center border-b border-border">❌</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10">✅</td>
                  </tr>

                  {/* Add-ons */}
                  <tr className="bg-muted/30">
                    <td colSpan={5} className="p-3 font-bold text-right">➕ {isRTL ? 'תוספים זמינים' : 'Available Add-ons'}</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-right border-b border-border">{isRTL ? 'Voice Clone (שיבוט קול)' : 'Voice Clone'}</td>
                    <td className="p-4 text-center border-b border-border text-sm">+₪497/{isRTL ? "חו׳" : 'mo'}</td>
                    <td className="p-4 text-center border-b border-border bg-primary/10 text-sm">+₪497/{isRTL ? "חו׳" : 'mo'}</td>
                    <td className="p-4 text-center border-b border-border text-sm">+₪497/{isRTL ? "חו׳" : 'mo'}</td>
                    <td className="p-4 text-center border-b border-border bg-amber-500/10 text-sm">{isRTL ? 'אופציה' : 'Optional'}</td>
                  </tr>

                  {/* CTAs */}
                  <tr className="bg-card">
                    <td className="p-4 text-right font-bold">{isRTL ? 'מושלם ל:' : 'Perfect for:'}</td>
                    <td className="p-4 text-center text-sm text-muted-foreground">
                      {isRTL ? '1-2 מטפלים' : '1-2 practitioners'}<br />
                      {isRTL ? '30-50 שיחות/שבוע' : '30-50 calls/week'}
                    </td>
                    <td className="p-4 text-center bg-primary/10 text-sm text-muted-foreground">
                      {isRTL ? '3-5 מטפלים' : '3-5 practitioners'}<br />
                      {isRTL ? '80-150 שיחות/שבוע' : '80-150 calls/week'}
                    </td>
                    <td className="p-4 text-center text-sm text-muted-foreground">
                      {isRTL ? '5+ מטפלים' : '5+ practitioners'}<br />
                      {isRTL ? '150+ שיחות/שבוע' : '150+ calls/week'}
                    </td>
                    <td className="p-4 text-center bg-amber-500/10 text-sm text-muted-foreground">
                      {isRTL ? 'רב-סניפים' : 'Multi-location'}<br />
                      {isRTL ? 'ארגוני' : 'Enterprise'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6"></td>
                    <td className="p-4 text-center">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3">
                        {isRTL ? 'התחל →' : 'Start →'}
                      </Button>
                    </td>
                    <td className="p-4 text-center bg-primary/10">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3">
                        {isRTL ? 'התחל →' : 'Start →'}
                      </Button>
                    </td>
                    <td className="p-4 text-center">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3">
                        {isRTL ? 'התחל →' : 'Start →'}
                      </Button>
                    </td>
                    <td className="p-4 text-center bg-amber-500/10">
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3">
                        {isRTL ? 'ייעוץ →' : 'Consult →'}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Note about annual pricing */}
              <div className="text-center mt-4 text-sm text-muted-foreground">
                * {isRTL ? 'התקנה מבוטלת בתשלום שנתי מראש' : 'Setup fee waived with annual prepayment'}
              </div>

              {/* Help section below table */}
              <div className="text-center mt-8 p-6 bg-muted/30 rounded-lg">
                <p className="text-lg mb-4 text-foreground">❓ {isRTL ? 'לא בטוחים איזו תוכנית מתאימה לכם?' : 'Not sure which plan is right for you?'}</p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                  {isRTL ? 'קבעו שיחת ייעוץ חינמית (15 דקות) →' : 'Book a Free Consultation (15 min) →'}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  {isRTL ? 'נעזור לכם לבחור את החבילה המדויקת - אפס התחייבות' : "We'll help you choose the right package - zero commitment"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComparisonTable;
