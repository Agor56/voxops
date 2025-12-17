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
      features: readonly string[];
      cta: string;
    };
    marcus: {
      name: string;
      features: readonly string[];
      cta: string;
    };
    david: {
      name: string;
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
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      website: string;
      websitePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      submit: string;
      submitting: string;
      privacy: string;
      success: string;
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
      badge: 'AI-Powered Healthcare Automation',
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
      subtitle: 'Three specialized agents handling every patient interaction – capture more leads, reduce no-shows, and free your staff',
      sofia: {
        name: 'Sofia - WhatsApp Patient Agent',
        features: [
          'Responds to WhatsApp inquiries in under 60 seconds, 24/7',
          'Qualifies leads and books consultations into your calendar',
          'Sends appointment reminders (cuts no-shows by 38%)',
          'Handles rescheduling without staff involvement',
          'Updates CRM in real-time automatically',
          'Speaks Hebrew, English, Russian, Arabic',
        ],
        cta: 'Test Sofia',
      },
      marcus: {
        name: 'Marcus - Voice Reception Agent',
        features: [
          'Answers all incoming calls 24/7 (no voicemail ever)',
          'Provides treatment information and pricing instantly',
          'Books consultations automatically while on the call',
          'Forwards urgent calls to on-call staff immediately',
          'Handles 85% of calls without staff intervention',
          'Speaks Hebrew, English, Russian, Arabic',
        ],
        cta: 'Test Marcus',
      },
      david: {
        name: 'David - Outbound Qualification Agent',
        features: [
          'Calls new leads within 60 minutes (65% higher conversion)',
          'Qualifies serious patients vs tire-kickers automatically',
          'Books qualified consultations into your calendar',
          'Follows up with warm leads until they book or opt out',
          'Re-activates dormant patients after 6+ months',
          'Updates CRM with detailed qualification notes',
        ],
        cta: 'Test David',
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
      subtitle: "Book a free demo and see how our AI agents can automate your patient journey. No commitment, no pressure—just a conversation about what's possible.",
      form: {
        name: 'Your Name',
        namePlaceholder: 'Dr. Jane Smith',
        email: 'Email',
        emailPlaceholder: 'jane@clinic.com',
        website: 'Website (Optional)',
        websitePlaceholder: 'www.myclinic.co.il',
        phone: 'Phone',
        phonePlaceholder: '0501234567',
        submit: 'Book Your Free Demo',
        submitting: 'Sending...',
        privacy: "By submitting, you agree to our Privacy Policy. We'll never spam you.",
        success: "Thanks! We'll be in touch within 24 hours.",
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
      badge: 'אוטומציה רפואית מונעת בינה מלאכותית',
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
      title: 'הכירו את',
      titleHighlight: 'צוות הקבלה ה-AI שלכם',
      subtitle: 'שלושה סוכנים מתמחים שמטפלים בכל אינטראקציה עם מטופלים – לכידת יותר לידים, הפחתת אי-הגעות, ושחרור הצוות שלכם',
      sofia: {
        name: 'סופיה - סוכנת וואטסאפ למטופלים',
        features: [
          'מגיבה לפניות וואטסאפ תוך פחות מ-60 שניות, 24/7',
          'מסננת לידים וקובעת ייעוצים ישירות ביומן שלכם',
          'שולחת תזכורות לתורים (מפחיתה אי-הגעות ב-38%)',
          'מטפלת בשינויי תורים ללא מעורבות צוות',
          'מעדכנת CRM בזמן אמת אוטומטית',
          'דוברת עברית, אנגלית, רוסית, ערבית',
        ],
        cta: 'בדקו את סופיה',
      },
      marcus: {
        name: 'מרקוס - סוכן קבלה קולי',
        features: [
          'עונה לכל השיחות הנכנסות 24/7 (בלי תא קולי)',
          'מספק מידע על טיפולים ומחירים מיידית',
          'קובע ייעוצים אוטומטית תוך כדי השיחה',
          'מעביר שיחות דחופות לצוות כונן מיידית',
          'מטפל ב-85% מהשיחות ללא התערבות צוות',
          'דובר עברית, אנגלית, רוסית, ערבית',
        ],
        cta: 'בדקו את מרקוס',
      },
      david: {
        name: 'דוד - סוכן הסמכה יוצא',
        features: [
          'מתקשר ללידים חדשים תוך 60 דקות (65% יותר המרות)',
          'מזהה מטופלים רציניים לעומת מתעניינים בלבד',
          'קובע ייעוצים מוסמכים ישירות ביומן שלכם',
          'עוקב אחרי לידים חמים עד שקובעים או מבטלים',
          'מפעיל מחדש מטופלים רדומים אחרי 6+ חודשים',
          'מעדכן CRM עם הערות הסמכה מפורטות',
        ],
        cta: 'בדקו את דוד',
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
      subtitle: 'קבעו הדגמה חינמית וראו איך סוכני ה-AI שלנו יכולים לאוטומט את מסע המטופל. ללא התחייבות, ללא לחץ - רק שיחה על מה שאפשרי.',
      form: {
        name: 'השם שלך',
        namePlaceholder: 'ד"ר ישראל ישראלי',
        email: 'אימייל',
        emailPlaceholder: 'doctor@clinic.co.il',
        website: 'אתר (אופציונלי)',
        websitePlaceholder: 'www.myclinic.co.il',
        phone: 'טלפון',
        phonePlaceholder: '0501234567',
        submit: 'קבעו הדגמה חינמית',
        submitting: 'שולח...',
        privacy: 'בשליחה אתם מסכימים למדיניות הפרטיות שלנו. לעולם לא נשלח ספאם.',
        success: 'תודה! ניצור קשר תוך 24 שעות.',
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
