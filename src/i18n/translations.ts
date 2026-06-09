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
    valueProps: readonly string[];
    trustBadges: string;
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
  pricing: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    perMonth: string;
    mostPopular: string;
    optionalAddons: string;
    comparisonLink: string;
    starter: {
      name: string;
      tagline: string;
      setup: string;
      badge: string;
      features: readonly string[];
      addons: readonly string[];
      cta: string;
    };
    growth: {
      name: string;
      tagline: string;
      setup: string;
      badge: string;
      features: readonly string[];
      addons: readonly string[];
      cta: string;
    };
    scale: {
      name: string;
      tagline: string;
      setup: string;
      badge: string;
      features: readonly string[];
      addons: readonly string[];
      cta: string;
    };
    buildOwn: {
      name: string;
      tagline: string;
      priceNote: string;
      badge: string;
      features: readonly string[];
      cta: string;
    };
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
    testLiveCall: string;
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
      title: "Turn GLP-1, HRT & peptide inquiries into booked consults - in under 60 seconds.",
      titleHighlight: "",
      subtitle: "Most clinics don't need more leads. They need to stop losing the ones they already paid for. VoxOps helps GLP-1, HRT/TRT, and peptide clinics answer new leads, missed calls, DMs, texts, and WhatsApp messages fast, then qualify, follow up, and route patients toward booking without adding front-desk staff.",
      ctaPrimary: 'Get a Free Lost Lead Audit',
      ctaSecondary: 'Watch 3-Min Demo',
      valueProps: [
        'New leads and missed calls answered in under 60 seconds',
        '24/7 follow-up across calls, SMS, DMs, WhatsApp, and email',
        'Live in 72 hours, with zero added front-desk work',
      ],
      trustBadges: 'Connects to the tools your clinic already uses',
      stats: {
        appointments: { label: 'Inquiries Recovered This Week', value: '1,247', date: 'Dec 23, 2025' },
        betaSpots: { label: 'Pilot Spots Available', value: '3 left', date: 'December 2025' },
      },
      floatingCards: {
        newLead: 'New Inquiry',
        respondedIn: 'Responded in 8 seconds',
        noShowReduction: 'Faster response time',
      },
    },
    // Agents Section
    agents: {
      badge: 'The System',
      title: 'Meet the',
      titleHighlight: 'Patient Inquiry Recovery System',
      subtitle: 'Voice, SMS, DMs, WhatsApp, email, and booking follow-up — connected into one workflow so your team can focus on patient care.',
      sofia: {
        name: 'VoxOps Inquiry Agent',
        description: 'Responds to patient inquiries across calls, SMS, DMs, WhatsApp, email, and web forms within 60 seconds — then qualifies, follows up, and routes interested patients toward booking.',
        features: [
          'Answers new leads and missed calls in under 60 seconds',
          'Handles SMS, DMs, WhatsApp, email, and web form follow-up',
          'Collects basic intake and intent details',
          'Routes qualified patients to your booking flow or staff',
          'Sends reminders and no-show recovery messages',
          'Updates your CRM or lead tracker in real time',
          'Trained on your services, pricing, FAQs, tone, and escalation rules',
          'Escalates medical questions to your licensed team',
        ],
        cta: 'See It Live',
      },
      marcus: {
        name: 'Ben - Voice Reception Agent',
        description: 'Answers inbound calls, recovers missed calls, handles common admin questions, and routes interested patients toward booking while intent is still high.',
        features: [
          'Answers inbound calls 24/7 and recovers missed calls',
          'Handles common admin questions and pricing inquiries',
          'Routes interested patients toward your booking flow',
          'Captures conversation notes in your CRM automatically',
          'Escalates medical questions to your licensed team',
          'Speaks multiple languages',
        ],
        cta: 'Talk to Ben',
      },
      david: {
        name: 'Bar - Outbound Reactivation Agent',
        description: 'Reactivates old leads, no-shows, pricing shoppers, and past inquiries through calls, texts, WhatsApp, and email — so interested patients can re-enter your booking flow.',
        features: [
          'Reactivates dormant inquiries across calls, texts, and email',
          'Qualifies interest and routes patients to your booking flow',
          'Auto-syncs with your calendar and CRM',
          'Follows up until they book or opt out',
          'Trained on your services, pricing, and FAQs',
        ],
        cta: 'Hear Bar',
      },
    },
    metrics: {
      badge: 'By the Numbers',
      title: 'Built for speed, follow-up, and',
      titleHighlight: 'booked consults.',
      subtitle: 'Three numbers that change how your clinic handles patient inquiries.',
      stats: [
        {
          number: '60',
          prefix: '<',
          suffix: 's',
          label: 'New leads and missed calls answered fast',
          description: 'New leads and missed calls answered fast.',
        },
        {
          number: '24',
          suffix: '/7',
          label: 'Follow-up that never clocks out',
          description: 'Follow-up keeps working after your front desk clocks out.',
        },
        {
          number: '72',
          suffix: 'h',
          label: 'Live in days, not months',
          description: 'Your first inquiry recovery system can go live in days, not months.',
        },
      ],
    },
    testimonials: {
      badge: 'Pilot Metrics',
      title: 'What we measure during',
      titleHighlight: 'your pilot',
      items: [
        {
          name: '',
          role: '',
          clinic: '',
          quote: 'Average response time before vs. after. Missed calls recovered. Leads contacted. Qualified inquiries. Consults booked. No-shows followed up. Old leads reactivated. Staff time saved.',
          stat: 'Tracked weekly',
        },
        {
          name: '',
          role: '',
          clinic: '',
          quote: 'Average response time before vs. after. Missed calls recovered. Leads contacted. Qualified inquiries. Consults booked. No-shows followed up. Old leads reactivated. Staff time saved.',
          stat: 'Tracked weekly',
        },
        {
          name: '',
          role: '',
          clinic: '',
          quote: 'Average response time before vs. after. Missed calls recovered. Leads contacted. Qualified inquiries. Consults booked. No-shows followed up. Old leads reactivated. Staff time saved.',
          stat: 'Tracked weekly',
        },
      ],
      at: '',
    },
    onboarding: {
      badge: 'Why It Works',
      title: 'Why GLP-1, HRT & peptide clinics',
      titleHighlight: 'say yes.',
      subtitle: 'Low risk. Minimal lift. Live in days, not months.',
      steps: [
        {
          number: '01',
          title: 'Zero risk',
          description: "Start with $1,000 upfront. If you're not happy after 30 days, you get your money back.",
        },
        {
          number: '02',
          title: 'Zero work',
          description: 'We handle setup, scripts, workflows, and integrations. Your team keeps using the tools they already use.',
        },
        {
          number: '03',
          title: 'Fast',
          description: 'Your first speed-to-lead or reactivation workflow can go live within 72 hours.',
        },
      ],
    },
    // Contact
    contact: {
      badge: 'Final Step',
      title: 'Stop losing patients who',
      titleHighlight: 'already raised',
      titleEnd: 'their hand.',
      subtitle: "In one free audit, we review your calls, forms, DMs, texts, WhatsApp flow, follow-up process, and booking path — then show you where patient inquiries are leaking before they become consults.",
      form: {
        step1Question: 'What type of business do you run?',
        step1Placeholder: 'e.g., Clinic, Law Firm, Real Estate Agency, Restaurant...',
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
    // Pricing
    pricing: {
      badge: 'Pricing Plans',
      title: 'The Perfect Plan for',
      titleHighlight: 'Your Business',
      subtitle: 'Every package includes everything you need - AI voice agent, WhatsApp/SMS confirmations, and full CRM integration. Choose the capacity that fits you.',
      perMonth: 'month',
      mostPopular: 'Most Popular',
      optionalAddons: 'Optional add-ons',
      comparisonLink: 'Full comparison below ↓',
      starter: {
        name: 'STARTER',
        tagline: 'Smart Start',
        setup: '+ ₪3,500 setup',
        badge: '✨ Perfect for: 1-2 team members',
        features: [
          '500 voice minutes/month',
          'Ora - AI voice agent 24/7',
          'WhatsApp/SMS confirmations',
          'Full CRM integration',
          'Support in 4 languages',
        ],
        addons: ['Voice Clone +₪497'],
        cta: 'Start with STARTER',
      },
      growth: {
        name: 'GROWTH',
        tagline: 'Accelerated Growth',
        setup: '+ ₪3,500 setup',
        badge: '✨ Perfect for: 3-5 team members',
        features: [
          '1,200 voice minutes/month',
          'Everything in STARTER, plus:',
          'Or - Full WhatsApp agent',
          'Advanced CRM workflows',
          'Priority support (12 hours)',
          'Bi-weekly optimization calls',
        ],
        addons: ['Voice Clone +₪497', 'SMS Confirmations +₪297/month'],
        cta: 'Start with GROWTH',
      },
      scale: {
        name: 'SCALE',
        tagline: 'Enterprise Scale',
        setup: '+ ₪3,500 setup',
        badge: '✨ Perfect for: 6-10 team members',
        features: [
          '2,500 voice minutes/month',
          'Everything in GROWTH, plus:',
          'Bar - Outbound sales agent',
          'Custom integrations',
          'Dedicated account manager',
          'Weekly strategy calls',
        ],
        addons: ['Voice Clone +₪497', 'SMS Confirmations +₪297/month', 'Custom API +₪997/month'],
        cta: 'Start with SCALE',
      },
      buildOwn: {
        name: 'BUILD + OWN',
        tagline: 'Your Business, Your System',
        priceNote: '+ ₪2,400/month',
        badge: '💎 Full ownership',
        features: [
          'One-time build - you own it',
          'Custom AI agent built for you',
          'Full source code ownership',
          'White-label ready',
          'Training & documentation',
          'Ongoing support available',
        ],
        cta: 'Get Started',
      },
    },
    // Footer
    footer: {
      description: 'AI-powered customer management solutions for businesses. Never miss a lead, reduce no-shows, and grow your business.',
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
      testLiveCall: 'Test Live Call',
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
      title: 'העסק שלכם עובד 24/7',
      titleHighlight: 'גם כשאתם ישנים',
      subtitle: 'צוות AI שעונה 24/7, קובע פגישות מעדכן את המערכת ומנווט שיחות - בעברית, אנגלית, רוסית וערבית.',
      ctaPrimary: 'קבעו הדגמה בלייב',
      ctaSecondary: 'דברו עם הסוכן עכשיו',
      valueProps: [
        'אפס שיחות שלא נענו - 100% מענה, אפס תא קולי',
        '38% הפחתה באי-הגעות - תזכורות אוטומטיות ב-WhatsApp',
        '65% יותר המרות - מענה מיידי = יותר פגישות',
      ],
      trustBadges: 'משתלב עם הכלים שלכם',
      stats: {
        appointments: { label: 'לידים שנתפסו השבוע', value: '1,247', date: '23 דצמבר 2025' },
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
      titleHighlight: 'צוות ה-AI שלכם',
      subtitle: '3 סוכנים מיוחדים שמטפלים בכל אינטראקציה עם לקוחות - כך שאתם תוכלו להתמקד בצמיחה',
      sofia: {
        name: 'אורה - סוכנת WhatsApp',
        description: 'תופסת כל לקוח ב-60 שניות. מסננת, קובעת פגישות, ושולחת תזכורות - כך אף לקוח לא חומק.',
        features: [
          'מגיבה תוך 60 שניות, 24/7',
          'קובעת פגישות ישירות ללוח השנה',
          'תזכורות אוטומטיות (מפחיתה אי-הגעות ב-38%)',
          'מעדכנת CRM בזמן אמת',
          'דוברת עברית, אנגלית, רוסית, ערבית, ועוד',
        ],
        cta: 'נסו את אורה',
      },
      marcus: {
        name: 'בן - סוכן קבלה קולי',
        description: 'עונה לכל שיחה 24/7, מספק מידע, קובע פגישות בזמן השיחה - בלי לטרוד לצוות.',
        features: [
          'אפס תא קולי - כל שיחה נענית',
          'קובע פגישות ומסנכרן עם היומן (Google Calendar / Calendly / Acuity)',
          'מעביר שיחות דחופות מיד לצוות',
          'מעדכן CRM אחרי כל שיחה',
          'דובר עברית, אנגלית, רוסית, ערבית, ועוד',
        ],
        cta: 'דברו עם בן',
      },
      david: {
        name: 'בר - סוכן מכירות יוצא',
        description: 'מתקשר ללידים תוך 60 דקות, מסנן הרציניים, קובע פגישות - הצוות שלכם מטפל רק במי שבאמת מגיע.',
        features: [
          'קריאה מהירה = 65% המרה גבוהה יותר',
          'מסנן וקובע פגישות אוטומטית',
          'עוקב אחרי לידים חמים עד קביעה',
          'מחזיר לקוחות רדומים (6+ חודשים)',
          'מסתנכרן עם היומן וה-CRM',
        ],
        cta: 'שמעו את בר',
      },
    },
    // Metrics Section
    metrics: {
      badge: 'תוצאות מוכחות',
      title: 'המספרים',
      titleHighlight: 'מדברים',
      subtitle: 'תוצאות אמיתיות מעסקים אמיתיים שמשתמשים בסוכני ה-AI שלנו.',
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
          description: 'תזכורות אוטומטיות דרך WhatsApp + קול מפחיתות דרמטית פגישות שהוחמצו.',
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
          quote: 'VoxOps שינתה לחלוטין את הדרך שבה אנחנו מטפלים בפניות לקוחות. עברנו מאיבוד לידים בלילה להמרה שלהם בזמן שאנחנו ישנים. שיעור ההזמנות שלנו עלה ב-45% בחודש הראשון.',
          stat: '+45% הזמנות',
        },
        {
          name: 'ד"ר מייקל חן',
          role: 'בעל עסק',
          clinic: 'Premier Med Spa',
          quote: 'הפחתת אי-ההגעות לבד החזירה את כל עלות המערכת. הלקוחות שלנו אוהבים את התזכורות ב-WhatsApp, ולקבלה הראשית סוף סוף יש זמן להתמקד בשירות פנים מול פנים.',
          stat: '38% פחות אי-הגעות',
        },
        {
          name: 'אמה רודריגז',
          role: 'מנהלת תפעול',
          clinic: 'Beauty & Wellness Center',
          quote: 'היינו סקפטיים לגבי AI שמטפל בתקשורת עם לקוחות, אבל התגובות כל כך טבעיות שלקוחות לרוב לא מבינים שהם מדברים עם בוט עד שאנחנו אומרים להם.',
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
      subtitle: 'שיטת BIA™ מבטיחה שהסוכן שלכם מותאם בדיוק לעסק שלכם',
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
    // Pricing
    pricing: {
      badge: 'תמחור',
      title: 'התוכנית המושלמת',
      titleHighlight: 'לעסק שלך',
      subtitle: 'כל חבילה כוללת את כל מה שצריך - סוכן קולי AI, אישורי WhatsApp/SMS, ואינטגרציה מלאה ל-CRM. בחר את הקיבולת שמתאימה לך.',
      perMonth: 'חודש',
      mostPopular: 'הכי פופולרי',
      optionalAddons: 'תוספים אופציונליים',
      comparisonLink: 'השוואה מלאה למטה ↓',
      starter: {
        name: 'STARTER',
        tagline: 'התחלה חכמה',
        setup: '+ ₪3,500 התקנה',
        badge: '✨ מושלם ל: 1-2 אנשי צוות',
        features: [
          '500 דקות קוליות/חודש',
          'אורה - סוכנת AI קולית 24/7',
          'אישורי WhatsApp/SMS',
          'אינטגרציה CRM מלאה',
          'תמיכה ב-4 שפות',
        ],
        addons: ['Voice Clone +₪497'],
        cta: 'התחל עם STARTER',
      },
      growth: {
        name: 'GROWTH',
        tagline: 'צמיחה מואצת',
        setup: '+ ₪3,500 התקנה',
        badge: '✨ מושלם ל: 3-5 אנשי צוות',
        features: [
          '1,200 דקות קוליות/חודש',
          'כל מה שב-STARTER, בתוספת:',
          'אור - סוכן WhatsApp מלא',
          'זרימות CRM מתקדמות',
          'תמיכה עדיפות (12 שעות)',
          'שיחות אופטימיזציה דו-שבועיות',
        ],
        addons: ['Voice Clone +₪497', 'SMS Confirmations +₪297/חודש'],
        cta: 'התחל עם GROWTH',
      },
      scale: {
        name: 'SCALE',
        tagline: 'קנה מידה ארגוני',
        setup: '+ ₪3,500 התקנה',
        badge: '✨ מושלם ל: 6-10 אנשי צוות',
        features: [
          '2,500 דקות קוליות/חודש',
          'כל מה שב-GROWTH, בתוספת:',
          'בר - סוכן מכירות יוצא',
          'אינטגרציות מותאמות',
          'מנהל חשבון ייעודי',
          'שיחות אסטרטגיה שבועיות',
        ],
        addons: ['Voice Clone +₪497', 'SMS Confirmations +₪297/חודש', 'Custom API +₪997/חודש'],
        cta: 'התחל עם SCALE',
      },
      buildOwn: {
        name: 'BUILD + OWN',
        tagline: 'העסק שלך, המערכת שלך',
        priceNote: '+ ₪2,400/חודש',
        badge: '💎 בעלות מלאה',
        features: [
          'בנייה חד פעמית - אתה הבעלים',
          'סוכן AI מותאם אישית',
          'בעלות מלאה על קוד המקור',
          'מוכן ל-White-label',
          'הדרכה ותיעוד',
          'תמיכה שוטפת זמינה',
        ],
        cta: 'התחל עכשיו',
      },
    },
    // Contact
    contact: {
      badge: 'התחילו עכשיו',
      title: 'מוכנים',
      titleHighlight: 'לשנות',
      titleEnd: 'את העסק שלכם?',
      subtitle: 'ענו על מספר שאלות קצרות וקבעו את הייעוץ החינמי שלכם.',
      form: {
        step1Question: 'איזה סוג עסק יש לכם?',
        step1Placeholder: 'למשל: מרפאה, משרד עורכי דין, סוכנות נדל"ן, מסעדה...',
        step2Question: 'איזה אתגר אתם מנסים לפתור עם סוכני AI?',
        step2Placeholder: 'למשל: שיחות שהוחמצו, זמני תגובה איטיים, אי-הגעות...',
        step3Question: 'מהן המטרות שלכם לשיפור?',
        step3Options: ['לכידת לידים', 'סינון והכשרה', 'קביעת פגישות', 'כל הנ"ל'],
        next: 'הבא',
        back: 'חזרה',
        continue: 'המשך להזמנה',
        required: 'שדה זה הוא חובה',
        stepOf: 'מתוך',
      },
    },
    // Footer
    footer: {
      description: 'פתרונות ניהול לקוחות מונעי AI לעסקים. לעולם לא תפספסו ליד, הפחיתו אי-הגעות, וצמיחו את העסק.',
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
      testLiveCall: 'דברו עם הסוכן בטלפון',
    },
  },
} as const;

export type Translations = TranslationShape;
