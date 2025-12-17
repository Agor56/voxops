export type Language = 'en' | 'he';

// Define the shape of translations
export interface TranslationShape {
  nav: {
    solutions: string;
    demo: string;
    results: string;
    testimonials: string;
    bookDemo: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    features: {
      leadResponse: string;
      autoScheduling: string;
      whatsapp: string;
    };
    floatingCards: {
      newLead: string;
      respondedIn: string;
      noShowReduction: string;
    };
  };
  agents: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    sofia: {
      name: string;
      description: string;
      features: readonly string[];
      cta: string;
    };
    marcus: {
      name: string;
      description: string;
      features: readonly string[];
      cta: string;
    };
    david: {
      name: string;
      description: string;
      features: readonly string[];
      cta: string;
    };
  };
  metrics: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    stats: readonly {
      number: string;
      prefix?: string;
      suffix: string;
      label: string;
      description: string;
    }[];
  };
  testimonials: {
    badge: string;
    title: string;
    titleHighlight: string;
    items: readonly {
      name: string;
      role: string;
      clinic: string;
      quote: string;
      stat: string;
    }[];
    at: string;
  };
  onboarding: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    steps: readonly {
      number: string;
      title: string;
      description: string;
    }[];
  };
  contact: {
    badge: string;
    title: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    form: {
      step1Question: string;
      step1Placeholder: string;
      step2Question: string;
      step2Placeholder: string;
      step3Question: string;
      step3Options: readonly string[];
      next: string;
      back: string;
      continue: string;
      required: string;
      stepOf: string;
    };
  };
  footer: {
    description: string;
    product: string;
    company: string;
    support: string;
    links: {
      features: string;
      pricing: string;
      demo: string;
      integrations: string;
      about: string;
      careers: string;
      blog: string;
      press: string;
      helpCenter: string;
      contact: string;
      privacyPolicy: string;
      terms: string;
    };
    copyright: string;
    privacy: string;
    termsShort: string;
    cookies: string;
  };
}

export const translations = {
  en: {
    // Header
    nav: {
      solutions: 'Solutions',
      demo: 'Demo',
      results: 'Results',
      testimonials: 'Testimonials',
      bookDemo: 'Book a Demo',
    },
    // Hero
    hero: {
      badge: 'Your clinic is open 24/7, even while you sleep',
      title: "Your Clinic's AI Admin Team.",
      titleHighlight: 'Never Miss a Lead Again.',
      subtitle: 'AI agents that respond to leads in seconds, book appointments automatically, and reduce no-shows by up to 40%. Built specifically for Med Spas & Clinics.',
      ctaPrimary: 'Book a Demo',
      ctaSecondary: 'See How It Works',
      features: {
        leadResponse: 'AI Lead Response',
        autoScheduling: 'Auto Scheduling',
        whatsapp: 'WhatsApp Integration',
      },
      floatingCards: {
        newLead: 'New Lead',
        respondedIn: 'Responded in 8 seconds',
        noShowReduction: 'Reduction in no-shows',
      },
    },
    // Agents Section
    agents: {
      badge: 'AI Solutions',
      title: 'Meet Your',
      titleHighlight: 'AI Reception Team',
      subtitle: 'Three specialized agents handling every patient interaction – so your team can focus on care',
      sofia: {
        name: 'Ora - WhatsApp Agent',
        description: 'Responds to every WhatsApp inquiry within 60 seconds, filters leads, books appointments directly to your calendar, and sends reminders – so no patient is forgotten.',
        features: [
          'Responds to WhatsApp inquiries within 60 seconds, 24/7',
          'Filters leads and books appointments directly to your calendar',
          'Sends automated reminders (reduces no-shows by 38%)',
          'Updates CRM in real-time with every conversation',
          'Trained on your treatments, prices, and protocols',
          'Speaks Hebrew, English, Russian, Arabic, and more',
        ],
        cta: 'Try Ora',
      },
      marcus: {
        name: 'Or - Voice Reception Agent',
        description: 'Answers every incoming call 24/7, provides treatment information, books appointments during the call, and syncs everything with your calendar and CRM – without involving your staff.',
        features: [
          'Answers every incoming call 24/7 (no more voicemail)',
          'Provides treatment and pricing info, books appointments on the call',
          'Auto-syncs with Google Calendar / Calendly / Acuity',
          'Transfers urgent calls to staff immediately',
          'Updates CRM with detailed notes after every call',
          'Speaks Hebrew, English, Russian, Arabic, and more',
        ],
        cta: 'Talk to Or',
      },
      david: {
        name: 'Adam - Outbound Sales Agent',
        description: 'Calls new leads within 60 minutes, filters serious prospects from browsers, books appointments with qualified leads, and updates CRM – so your team only handles those who actually show up.',
        features: [
          'Calls new leads within 60 minutes (65% higher conversion)',
          'Filters serious prospects and books appointments to your calendar',
          'Auto-syncs with your calendar and CRM',
          'Follows up on warm leads until they book or opt out',
          'Re-engages dormant patients after 6+ months',
          'Trained on your specific treatments and pricing',
        ],
        cta: 'Hear Adam',
      },
    },
    // Metrics Section
    metrics: {
      badge: 'Proven Results',
      title: 'The Numbers',
      titleHighlight: "Don't Lie",
      subtitle: 'Real results from real clinics using our AI agents.',
      stats: [
        {
          number: '<60',
          suffix: 's',
          label: 'Response Time',
          description: 'Respond to leads in under 60 seconds while competitors take 5+ hours.',
        },
        {
          number: '40',
          prefix: '+',
          suffix: '%',
          label: 'No-Show Reduction',
          description: 'Automated reminders via WhatsApp + voice reduce missed appointments dramatically.',
        },
        {
          number: '3',
          suffix: 'x',
          label: 'Conversion Rate',
          description: 'Responding within minutes instead of hours gives you a massive conversion advantage.',
        },
        {
          number: '24',
          suffix: '/7',
          label: 'Availability',
          description: 'AI agents work around the clock, capturing leads even while you sleep.',
        },
      ],
    },
    // Testimonials
    testimonials: {
      badge: 'Testimonials',
      title: "Don't Just Take",
      titleHighlight: 'Our Word',
      items: [
        {
          name: 'Dr. Sarah Cohen',
          role: 'Medical Director',
          clinic: 'Glow Aesthetics',
          quote: "VidLeads transformed how we handle patient inquiries. We went from losing leads overnight to converting them while we sleep. Our booking rate increased by 45% in the first month.",
          stat: '+45% bookings',
        },
        {
          name: 'Dr. Michael Chen',
          role: 'Clinic Owner',
          clinic: 'Premier Med Spa',
          quote: "The no-show reduction alone paid for the entire system. Our patients love the WhatsApp reminders, and our front desk finally has time to focus on in-person care.",
          stat: '38% fewer no-shows',
        },
        {
          name: 'Emma Rodriguez',
          role: 'Operations Manager',
          clinic: 'Beauty & Wellness Center',
          quote: "We were skeptical about AI handling patient communication, but the responses are so natural that patients often don't realize they're talking to a bot until we tell them.",
          stat: '92% satisfaction rate',
        },
      ],
      at: 'at',
    },
    // Onboarding
    onboarding: {
      badge: 'Simple Onboarding',
      title: 'Live in',
      titleHighlight: 'Days, Not Months',
      subtitle: 'We handle everything. You just show up for a quick call and watch your clinic transform.',
      steps: [
        {
          number: '01',
          title: 'Quick Discovery Call',
          description: 'We learn about your clinic, current challenges, and goals in a 15-minute call.',
        },
        {
          number: '02',
          title: 'Custom Setup',
          description: 'Our team configures your AI agents, integrates with your systems, and trains them on your services.',
        },
        {
          number: '03',
          title: 'Launch & Optimize',
          description: 'Go live in days, not months. We continuously optimize based on real performance data.',
        },
      ],
    },
    // Contact
    contact: {
      badge: 'Get Started',
      title: 'Ready to',
      titleHighlight: 'Transform',
      titleEnd: 'Your Clinic?',
      subtitle: "Answer a few quick questions and book your free consultation.",
      form: {
        step1Question: 'What type of business do you run?',
        step1Placeholder: 'e.g., Med Spa, Dental Clinic, Aesthetic Clinic...',
        step2Question: 'What challenge are you trying to solve with AI agents?',
        step2Placeholder: 'e.g., Missed calls, slow response times, no-shows...',
        step3Question: 'What are your goals for improving?',
        step3Options: ['Lead capture', 'Qualification', 'Appointment booking', 'All of the above'],
        next: 'Next',
        back: 'Back',
        continue: 'Continue to Booking',
        required: 'This field is required',
        stepOf: 'of',
      },
    },
    // Footer
    footer: {
      description: 'AI-powered patient admin solutions for med spas and clinics. Never miss a lead, reduce no-shows, and grow your practice.',
      product: 'Product',
      company: 'Company',
      support: 'Support',
      links: {
        features: 'Features',
        pricing: 'Pricing',
        demo: 'Demo',
        integrations: 'Integrations',
        about: 'About Us',
        careers: 'Careers',
        blog: 'Blog',
        press: 'Press',
        helpCenter: 'Help Center',
        contact: 'Contact',
        privacyPolicy: 'Privacy Policy',
        terms: 'Terms of Service',
      },
      copyright: 'All rights reserved.',
      privacy: 'Privacy',
      termsShort: 'Terms',
      cookies: 'Cookies',
    },
  },
  he: {
    // Header
    nav: {
      solutions: 'פתרונות',
      demo: 'הדגמה',
      results: 'תוצאות',
      testimonials: 'המלצות',
      bookDemo: 'קבעו הדגמה',
    },
    // Hero
    hero: {
      badge: 'הקליניקה שלכם פתוחה 24/7, גם כשאתם ישנים',
      title: 'צוות ה-AI של המרפאה שלכם.',
      titleHighlight: 'לעולם לא תפספסו ליד.',
      subtitle: 'סוכני AI שמגיבים לפניות בשניות, קובעים תורים אוטומטית, ומפחיתים אי-הגעות עד 40%. בנוי במיוחד למרפאות אסתטיקה וספא רפואי.',
      ctaPrimary: 'קבעו הדגמה',
      ctaSecondary: 'ראו איך זה עובד',
      features: {
        leadResponse: 'תגובה לפניות AI',
        autoScheduling: 'קביעת תורים אוטומטית',
        whatsapp: 'אינטגרציית WhatsApp',
      },
      floatingCards: {
        newLead: 'ליד חדש',
        respondedIn: 'מענה תוך 8 שניות',
        noShowReduction: 'הפחתה באי-הגעות',
      },
    },
    // Agents Section
    agents: {
      badge: 'פתרונות AI',
      title: 'פגשו את',
      titleHighlight: 'צוות הקבלה AI שלכם',
      subtitle: 'שלושה סוכנים מיוחדים שמטפלים בכל אינטראקציה עם מטופלים - כך הצוות שלכם יכול להתמקד בטיפול',
      sofia: {
        name: 'אורה - סוכנת WhatsApp',
        description: 'מגיבה לכל פנייה ב-WhatsApp תוך 60 שניות, מסננת לידים, מזמינה תורים ישירות ללוח השנה שלכם, ושולחת תזכורות - כך שאף מטופל לא נשכח.',
        features: [
          'מגיבה לפניות WhatsApp תוך 60 שניות, 24/7',
          'מסננת לידים ומזמינה תורים ישירות ללוח השנה',
          'שולחת תזכורות אוטומטיות (מפחיתה אי-הגעות ב-38%)',
          'מעדכנת CRM בזמן אמת עם כל שיחה',
          'מאומנת על הטיפולים, המחירים והפרוטוקולים שלכם',
          'דוברת עברית, אנגלית, רוסית, ערבית, ועוד',
        ],
        cta: 'נסו את אורה',
      },
      marcus: {
        name: 'אור - סוכן קבלה קולי',
        description: 'עונה לכל שיחה נכנסת 24/7, מספק מידע על טיפולים, מזמין תורים בזמן השיחה, ומסנכרן הכל עם היומן וה-CRM שלכם - בלי לערב את הצוות.',
        features: [
          'עונה לכל שיחה נכנסת 24/7 (אין יותר תא קולי)',
          'מספק מידע על טיפולים ומחירים ומזמין תורים בשיחה',
          'מסתנכרן אוטומטית עם Google Calendar / Calendly / Acuity',
          'מעביר שיחות דחופות לצוות מיד',
          'מעדכן CRM עם הערות מפורטות אחרי כל שיחה',
          'דובר עברית, אנגלית, רוסית, ערבית, ועוד',
        ],
        cta: 'דברו עם אור',
      },
      david: {
        name: 'אדם - סוכן מכירות יוצא',
        description: 'מתקשר ללידים חדשים תוך 60 דקות, מסנן רציניים מול צופים, מזמין תורים עם מוסמכים, ומעדכן CRM - כך הצוות שלכם מטפל רק במי שבאמת מגיע.',
        features: [
          'מתקשר ללידים חדשים תוך 60 דקות (65% המרה גבוהה יותר)',
          'מסנן מתעניינים רציניים ומזמין תורים ללוח השנה',
          'מסתנכרן עם היומן וה-CRM שלכם אוטומטית',
          'עוקב אחרי לידים חמים עד שהם קובעים או מוותרים',
          'מחזיר מטופלים רדומים אחרי 6+ חודשים',
          'מאומן על הטיפולים והמחירים הספציפיים שלכם',
        ],
        cta: 'שמעו את אדם',
      },
    },
    // Metrics Section
    metrics: {
      badge: 'תוצאות מוכחות',
      title: 'המספרים',
      titleHighlight: 'מדברים',
      subtitle: 'תוצאות אמיתיות ממרפאות אמיתיות שמשתמשות בסוכני ה-AI שלנו.',
      stats: [
        {
          number: '<60',
          suffix: 'ש׳',
          label: 'זמן תגובה',
          description: 'מגיבים לפניות תוך פחות מ-60 שניות בזמן שמתחרים לוקחים 5+ שעות.',
        },
        {
          number: '40',
          prefix: '+',
          suffix: '%',
          label: 'הפחתת אי-הגעות',
          description: 'תזכורות אוטומטיות דרך WhatsApp + קול מפחיתות דרמטית תורים שהוחמצו.',
        },
        {
          number: '3',
          suffix: 'x',
          label: 'שיעור המרה',
          description: 'תגובה בדקות במקום שעות נותנת לכם יתרון המרה עצום.',
        },
        {
          number: '24',
          suffix: '/7',
          label: 'זמינות',
          description: 'סוכני AI עובדים מסביב לשעון, לוכדים לידים גם בזמן שאתם ישנים.',
        },
      ],
    },
    // Testimonials
    testimonials: {
      badge: 'המלצות',
      title: 'אל תסמכו רק',
      titleHighlight: 'על המילה שלנו',
      items: [
        {
          name: 'ד"ר שרה כהן',
          role: 'מנהלת רפואית',
          clinic: 'Glow Aesthetics',
          quote: 'VidLeads שינתה לחלוטין את הדרך שבה אנחנו מטפלים בפניות מטופלים. עברנו מאיבוד לידים בלילה להמרה שלהם בזמן שאנחנו ישנים. שיעור ההזמנות שלנו עלה ב-45% בחודש הראשון.',
          stat: '+45% הזמנות',
        },
        {
          name: 'ד"ר מייקל חן',
          role: 'בעל מרפאה',
          clinic: 'Premier Med Spa',
          quote: 'הפחתת אי-ההגעות לבד החזירה את כל עלות המערכת. המטופלים שלנו אוהבים את התזכורות ב-WhatsApp, ולקבלה הראשית סוף סוף יש זמן להתמקד בטיפול פנים מול פנים.',
          stat: '38% פחות אי-הגעות',
        },
        {
          name: 'אמה רודריגז',
          role: 'מנהלת תפעול',
          clinic: 'Beauty & Wellness Center',
          quote: 'היינו סקפטיים לגבי AI שמטפל בתקשורת עם מטופלים, אבל התגובות כל כך טבעיות שמטופלים לרוב לא מבינים שהם מדברים עם בוט עד שאנחנו אומרים להם.',
          stat: '92% שביעות רצון',
        },
      ],
      at: 'ב-',
    },
    // Onboarding
    onboarding: {
      badge: 'הטמעה פשוטה',
      title: 'באוויר תוך',
      titleHighlight: 'ימים, לא חודשים',
      subtitle: 'אנחנו מטפלים בהכל. אתם רק מגיעים לשיחה קצרה וצופים במרפאה שלכם משתנה.',
      steps: [
        {
          number: '01',
          title: 'שיחת היכרות מהירה',
          description: 'אנחנו לומדים על המרפאה שלכם, האתגרים הנוכחיים והמטרות בשיחה של 15 דקות.',
        },
        {
          number: '02',
          title: 'התקנה מותאמת אישית',
          description: 'הצוות שלנו מגדיר את סוכני ה-AI, משלב עם המערכות שלכם, ומאמן אותם על השירותים שלכם.',
        },
        {
          number: '03',
          title: 'השקה ואופטימיזציה',
          description: 'עולים לאוויר תוך ימים, לא חודשים. אנחנו ממשיכים לשפר על בסיס נתוני ביצועים אמיתיים.',
        },
      ],
    },
    // Contact
    contact: {
      badge: 'התחילו עכשיו',
      title: 'מוכנים',
      titleHighlight: 'לשנות',
      titleEnd: 'את המרפאה שלכם?',
      subtitle: 'ענו על מספר שאלות קצרות וקבעו את הייעוץ החינמי שלכם.',
      form: {
        step1Question: 'איזה סוג עסק יש לכם?',
        step1Placeholder: 'למשל: מרפאת ספא, מרפאת שיניים, קליניקת אסתטיקה...',
        step2Question: 'איזה אתגר אתם מנסים לפתור עם סוכני AI?',
        step2Placeholder: 'למשל: שיחות שהוחמצו, זמני תגובה איטיים, אי-הגעות...',
        step3Question: 'מהן המטרות שלכם לשיפור?',
        step3Options: ['לכידת לידים', 'סינון והכשרה', 'קביעת תורים', 'כל הנ"ל'],
        next: 'הבא',
        back: 'חזרה',
        continue: 'המשך להזמנה',
        required: 'שדה זה הוא חובה',
        stepOf: 'מתוך',
      },
    },
    // Footer
    footer: {
      description: 'פתרונות ניהול מטופלים מונעי AI למרפאות ספא וקליניקות. לעולם לא תפספסו ליד, הפחיתו אי-הגעות, וצמיחו את העסק.',
      product: 'מוצר',
      company: 'חברה',
      support: 'תמיכה',
      links: {
        features: 'תכונות',
        pricing: 'תמחור',
        demo: 'הדגמה',
        integrations: 'אינטגרציות',
        about: 'אודותינו',
        careers: 'קריירה',
        blog: 'בלוג',
        press: 'עיתונות',
        helpCenter: 'מרכז עזרה',
        contact: 'צור קשר',
        privacyPolicy: 'מדיניות פרטיות',
        terms: 'תנאי שימוש',
      },
      copyright: 'כל הזכויות שמורות.',
      privacy: 'פרטיות',
      termsShort: 'תנאים',
      cookies: 'עוגיות',
    },
  },
} as const;

export type Translations = TranslationShape;
