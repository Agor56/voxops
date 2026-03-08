import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useLanguage } from '@/i18n/LanguageContext';
import { ScrollArea } from './ui/scroll-area';

interface LegalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'privacy' | 'terms';
}

const LegalDialog = ({ open, onOpenChange, type }: LegalDialogProps) => {
  const { language, isRTL } = useLanguage();

  const content = {
    privacy: {
      en: {
        title: 'Privacy Policy',
        content: `
Last updated: January 2025

VoxOps ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our AI-powered patient communication services.

**Information We Collect**
- Contact information (name, email, phone number)
- Business information (clinic name, type of practice)
- Communication data processed through our AI agents
- Usage data and analytics

**How We Use Your Information**
- To provide and improve our AI communication services
- To process appointments and patient communications
- To send service-related notifications
- To analyze and improve our services

**Data Security**
We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits.

**Your Rights**
You have the right to access, correct, or delete your personal data. Contact us at privacy@voxops.com to exercise these rights.

**Contact Us**
For questions about this Privacy Policy, contact us at privacy@voxops.com.
        `,
      },
      he: {
        title: 'מדיניות פרטיות',
        content: `
עודכן לאחרונה: ינואר 2025

VoxOps ("אנחנו", "שלנו") מחויבת להגנה על פרטיותך. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ושומרים על המידע שלך בעת השימוש בשירותי התקשורת מונעי ה-AI שלנו.

**מידע שאנו אוספים**
- פרטי קשר (שם, אימייל, מספר טלפון)
- מידע עסקי (שם העסק, סוג העיסוק)
- נתוני תקשורת המעובדים דרך סוכני ה-AI שלנו
- נתוני שימוש ואנליטיקס

**כיצד אנו משתמשים במידע שלך**
- לספק ולשפר את שירותי התקשורת AI שלנו
- לעבד פגישות ותקשורת עם לקוחות
- לשלוח התראות הקשורות לשירות
- לנתח ולשפר את השירותים שלנו

**אבטחת מידע**
אנו מיישמים אמצעי אבטחה סטנדרטיים בתעשייה להגנה על המידע שלך, כולל הצפנה, שרתים מאובטחים וביקורות אבטחה קבועות.

**הזכויות שלך**
יש לך זכות לגשת, לתקן או למחוק את המידע האישי שלך. צור קשר איתנו ב-privacy@voxops.com למימוש זכויות אלה.

**צור קשר**
לשאלות לגבי מדיניות פרטיות זו, צור קשר איתנו ב-privacy@voxops.com.
        `,
      },
    },
    terms: {
      en: {
        title: 'Terms of Service',
        content: `
Last updated: January 2025

Welcome to VoxOps. By using our services, you agree to these Terms of Service.

**Services**
VoxOps provides AI-powered patient communication solutions for medical clinics and spas, including voice agents, WhatsApp integration, and appointment management.

**User Responsibilities**
- Provide accurate business and contact information
- Use services in compliance with applicable laws
- Maintain appropriate security for your account
- Not misuse or attempt to disrupt our services

**Service Availability**
We strive for 99.9% uptime but cannot guarantee uninterrupted service. We reserve the right to modify or discontinue services with reasonable notice.

**Payment Terms**
Subscription fees are billed monthly or annually as selected. Prices are subject to change with 30 days notice.

**Limitation of Liability**
VoxOps liability is limited to the fees paid for services in the preceding 12 months.

**Governing Law**
These terms are governed by the laws of Israel.

**Contact**
For questions, contact us at legal@voxops.com.
        `,
      },
      he: {
        title: 'תנאי שימוש',
        content: `
עודכן לאחרונה: ינואר 2025

ברוכים הבאים ל-VoxOps. השימוש בשירותים שלנו מהווה הסכמה לתנאי שימוש אלה.

**שירותים**
VoxOps מספקת פתרונות תקשורת מונעי AI למרפאות ומכוני ספא, כולל סוכנים קוליים, אינטגרציית WhatsApp וניהול תורים.

**אחריות המשתמש**
- לספק מידע עסקי ופרטי קשר מדויקים
- להשתמש בשירותים בהתאם לחוקים החלים
- לשמור על אבטחה מתאימה לחשבונך
- לא לעשות שימוש לרעה או לנסות לשבש את השירותים שלנו

**זמינות השירות**
אנו שואפים לזמן פעילות של 99.9% אך אין באפשרותנו להבטיח שירות ללא הפרעות. אנו שומרים לעצמנו את הזכות לשנות או להפסיק שירותים עם הודעה סבירה.

**תנאי תשלום**
דמי המנוי מחויבים חודשית או שנתית כפי שנבחר. המחירים עשויים להשתנות עם הודעה של 30 יום מראש.

**הגבלת אחריות**
אחריות VoxOps מוגבלת לדמים ששולמו עבור שירותים ב-12 החודשים הקודמים.

**הדין החל**
תנאים אלה כפופים לחוקי מדינת ישראל.

**צור קשר**
לשאלות, צור קשר איתנו ב-legal@voxops.com.
        `,
      },
    },
  };

  const currentContent = content[type][language];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[80vh]"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <DialogHeader>
          <DialogTitle className={isRTL ? 'text-right' : 'text-left'}>
            {currentContent.title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className={`prose prose-sm dark:prose-invert ${isRTL ? 'text-right' : 'text-left'}`}>
            {currentContent.content.split('\n').map((line, index) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <h3 key={index} className="font-semibold mt-4 mb-2 text-foreground">
                    {line.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={index} className="text-muted-foreground ml-4">
                    {line.substring(2)}
                  </li>
                );
              }
              if (line.trim()) {
                return (
                  <p key={index} className="text-muted-foreground mb-2">
                    {line}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LegalDialog;
