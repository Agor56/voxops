import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

// Platform icons as SVG components for crisp rendering
const GoogleCalendarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M19.5 4h-3V2.5a.5.5 0 0 0-1 0V4h-7V2.5a.5.5 0 0 0-1 0V4h-3A1.5 1.5 0 0 0 3 5.5v13A1.5 1.5 0 0 0 4.5 20h15a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 19.5 4zM19 18.5H5V9h14v9.5z"/>
    <rect x="7" y="11" width="2" height="2" rx="0.5"/>
    <rect x="11" y="11" width="2" height="2" rx="0.5"/>
    <rect x="15" y="11" width="2" height="2" rx="0.5"/>
    <rect x="7" y="15" width="2" height="2" rx="0.5"/>
    <rect x="11" y="15" width="2" height="2" rx="0.5"/>
  </svg>
);

const CalendlyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M19.655 14.262c.281-.18.57-.355.856-.535.29-.181.567-.374.835-.582.179-.153.354-.31.525-.47a6.953 6.953 0 0 0 2.118-5.015C23.989 4.136 21.07 1 17.48 1c-2.1 0-3.97 1.025-5.14 2.605a6.953 6.953 0 0 0-5.14-2.605c-3.59 0-6.51 3.136-6.51 7.005a6.953 6.953 0 0 0 2.118 5.015c.171.16.346.317.525.47.268.208.545.401.835.582.286.18.575.355.856.535C2.23 16.515.5 19.52.5 23h23c0-3.48-1.73-6.485-3.845-8.738z"/>
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.623c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.887c-.56.046-.747.326-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM2.81 1.595l13.589-1c1.635-.14 2.055-.047 3.082.7l4.25 2.986c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.046-1.448-.094-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.995c0-.84.374-1.493 1.168-1.4z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

const ZapierIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M15.633 1.5h-7.266L1.5 8.367v7.266L8.367 22.5h7.266L22.5 15.633V8.367L15.633 1.5zM12 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>
  </svg>
);

const OutlookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M24 7.387v10.478c0 .23-.08.424-.238.576-.158.154-.352.231-.581.231h-8.86V8.542l4.012 2.78 5.428-3.696c.077-.039.156-.058.239-.058.158 0 .292.054.405.164.112.11.168.246.168.405l-.573.25zm-.819-1.065l-5.42 3.698-5.44-3.77V6.16c0-.16.056-.295.168-.405a.555.555 0 0 1 .405-.165h10.287v.732zM14.321 18.672H24v-7.623l-4.679 3.194-5-3.463v7.892zM0 7.32v11.247l13.4 3.76V3.56L0 7.32zm8.025 8.203c-.621.79-1.427 1.185-2.417 1.185-1.04 0-1.837-.37-2.392-1.11-.555-.74-.832-1.713-.832-2.92 0-1.255.303-2.27.907-3.048.604-.777 1.425-1.165 2.461-1.165.991 0 1.776.37 2.354 1.11.579.74.868 1.738.868 2.996 0 1.206-.316 2.163-.95 2.952zm-2.3-5.102c-.483 0-.865.236-1.146.708-.281.472-.422 1.117-.422 1.937 0 .807.14 1.447.419 1.92.28.473.66.709 1.14.709.496 0 .884-.222 1.163-.666.28-.443.42-1.08.42-1.91 0-.871-.137-1.535-.41-1.992-.275-.457-.665-.686-1.173-.686v-.02h.009z"/>
  </svg>
);

const HubSpotIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M18.164 7.93V5.085a2.198 2.198 0 0 0 1.267-1.978V3.06a2.198 2.198 0 0 0-2.198-2.198h-.047a2.198 2.198 0 0 0-2.198 2.198v.047c0 .884.522 1.646 1.272 1.993v2.829a5.943 5.943 0 0 0-2.845 1.378L5.982 3.74a2.479 2.479 0 0 0 .058-.534 2.486 2.486 0 1 0-.837 1.857l7.377 5.485a5.944 5.944 0 0 0-.65 2.701c0 .991.245 1.925.67 2.748l-2.078 2.078a1.963 1.963 0 0 0-.58-.098 1.988 1.988 0 1 0 1.988 1.988c0-.203-.035-.398-.093-.582l2.047-2.047a5.962 5.962 0 1 0 4.28-9.405zm-.925 9.062a3.045 3.045 0 1 1 0-6.089 3.045 3.045 0 0 1 0 6.09z"/>
  </svg>
);

const platforms = [
  { name: 'Google Calendar', icon: GoogleCalendarIcon },
  { name: 'Calendly', icon: CalendlyIcon },
  { name: 'Notion', icon: NotionIcon },
  { name: 'WhatsApp', icon: WhatsAppIcon },
  { name: 'Gmail', icon: GmailIcon },
  { name: 'Zapier', icon: ZapierIcon },
  { name: 'Outlook', icon: OutlookIcon },
  { name: 'HubSpot', icon: HubSpotIcon },
];

const TrustBadges = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-16 relative"
    >
      {/* Section Label */}
      <p className="text-xs text-muted-foreground/60 uppercase tracking-[0.2em] text-center mb-8 font-medium">
        {t.hero.trustBadges}
      </p>

      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex animate-marquee">
          {/* Double the items for seamless loop */}
          {[...platforms, ...platforms].map((platform, index) => (
            <div
              key={`${platform.name}-${index}`}
              className="flex-shrink-0 mx-6 flex items-center justify-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10 flex items-center justify-center text-primary/40 hover:text-primary/70 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300">
                <platform.icon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrustBadges;
