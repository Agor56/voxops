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
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      appointments: { label: string; value: string; date: string };
      betaSpots: { label: string; value: string; date: string };
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
      title: "No Technicians. No Extra Hours.",
      titleHighlight: "Just a Phone Line That Works for You.",
      subtitle: "AI voice agents that answer every call, book appointments, and update your system – automatically, 24/7, even when the clinic is closed.",
      ctaPrimary: 'Book a Live Demo',
      ctaSecondary: 'Talk to the Agent Now',
      stats: {
        appointments: { label: 'Appointments Saved This Week', value: '1,247', date: 'Dec 23, 2025' },
        betaSpots: { label: 'Beta Spots Available', value: '3 left', date: 'December 2025' },
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
          quote: "VoxOps transformed how we handle patient inquiries. We went from losing leads overnight to converting them while we sleep. Our booking rate increased by 45% in the first month.",
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
      title: 'How We',
      titleHighlight: 'Do It',
      subtitle: 'The BIA™ method ensures your agent is tailored exactly to your clinic',
      steps: [
        {
          number: '01',
          title: 'Phase 1: Build',
          description: 'We build your agent in an isolated environment - so you can see how it works before it goes live',
        },
        {
          number: '02',
          title: 'Phase 2: Integrate',
          description: 'We connect the agent to your systems, run tests, and guide you through the full implementation',
        },
        {
          number: '03',
          title: 'Phase 3: Adjust',
          description: 'We improve the agent and support you over time as your needs evolve',
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
      title: 'אין צורך במזכירה נוספת. או בשעות נוספות.',
      titleHighlight: 'רק קו טלפון שעובד בשבילך.',
      subtitle: 'סוכני AI קוליים שעונים על כל שיחה, קובעים תורים, ומעדכנים את המערכת – אוטומטית, 24/7, גם כשהקליניקה סגורה.',
      ctaPrimary: 'קבעו הדגמה בלייב',
      ctaSecondary: 'דברו עם הסוכן עכשיו',
      stats: {
        appointments: { label: 'תורים שלא אבדו השבוע', value: '1,247', date: '23 דצמבר 2025' },
        betaSpots: { label: 'מקומות פנויים בבטא', value: '3 נותרו', date: 'דצמבר 2025' },
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
      subtitle: '3 סוכנים מיוחדים שמטפלים בכל אינטראקציה עם מטופלים - כך שאתם תוכלו להתמקד בטיפולים',
      sofia: {
        name: 'אורה - סוכנת WhatsApp',
        description: 'תופסת כל לקוח ב-60 שניות. מסננת, מזמינה תורים, ושולחת תזכורות - כך אף מטופל לא חומק.',
        features: [
          'מגיבה תוך 60 שניות, 24/7',
          'מזמינה תורים ישירות ללוח השנה',
          'תזכורות אוטומטיות (מפחיתה אי-הגעות ב-38%)',
          'מעדכנת CRM בזמן אמת',
          'דוברת עברית, אנגלית, רוסית, ערבית, ועוד',
        ],
        cta: 'נסו את אורה',
      },
      marcus: {
        name: 'אור - סוכן קבלה קולי',
        description: 'עונה לכל שיחה 24/7, מספק מידע, מזמין תורים בזמן השיחה - בלי לטרוד לצוות.',
        features: [
          'אפס תא קולי - כל שיחה נענית',
          'מזמין תורים ומסנכרן עם היומן (Google Calendar / Calendly / Acuity)',
          'מעביר שיחות דחופות מיד לצוות',
          'מעדכן CRM אחרי כל שיחה',
          'דובר עברית, אנגלית, רוסית, ערבית, ועוד',
        ],
        cta: 'דברו עם אור',
      },
      david: {
        name: 'אדם - סוכן מכירות יוצא',
        description: 'מתקשר ללידים תוך 60 דקות, מסנן הרציניים, מזמין תורים - הצוות שלכם מטפל רק במי שבאמת מגיע.',
        features: [
          'קריאה מהירה = 65% המרה גבוהה יותר',
          'מסנן ומזמין תורים אוטומטית',
          'עוקב אחרי לידים חמים עד קביעה',
          'מחזיר מטופלים רדומים (6+ חודשים)',
          'מסתנכרן עם היומן וה-CRM',
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
          name: 'ד"ר נועה נוסבוים',
          role: 'מנהלת רפואית',
          clinic: 'Glow Aesthetics',
          quote: 'VoxOps שינתה לחלוטין את הדרך שבה אנחנו מטפלים בפניות מטופלים. עברנו מאיבוד לידים בלילה להמרה שלהם בזמן שאנחנו ישנים. שיעור ההזמנות שלנו עלה ב-45% בחודש הראשון.',
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
      title: 'איך אנחנו',
      titleHighlight: 'עושים את זה',
      subtitle: 'שיטת BIA™ מבטיחה שהסוכן שלכם מותאם בדיוק למרפאה שלכם',
      steps: [
        {
          number: '01',
          title: 'שלב 1: בנייה',
          description: 'בונים את הסוכן שלכם בסביבה מבודדת - כך תראו איך הוא עובד לפני שהוא יוצא לאוויר',
        },
        {
          number: '02',
          title: 'שלב 2: שילוב',
          description: 'מחברים את הסוכן למערכות שלכם, מריצים בדיקות, ומלווים אתכם בהטמעה המלאה',
        },
        {
          number: '03',
          title: 'שלב 3: כיוון',
          description: 'משפרים את הסוכן ותומכים בכם לאורך זמן ככל שהצרכים מתפתחים',
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
