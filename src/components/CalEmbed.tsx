import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

const CalEmbed = () => {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: '20min' });
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#0F172A' },
          dark: { 'cal-brand': '#ffcc84' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <section id="book-demo" className="py-24 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">
            Book Your <span style={{ color: '#C9A96E' }}>Free Strategy Call</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Pick a time that works for you. We will review your inquiry flow and show you exactly where patients are leaking.
          </p>
        </div>
        <div
          className="glass-card rounded-2xl p-2 md:p-4 max-w-5xl mx-auto overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <Cal
            namespace="20min"
            calLink="vox-ops-mvonve/20min"
            style={{ width: '100%', height: '700px', overflow: 'scroll' }}
            config={{ layout: 'month_view', theme: 'dark' }}
          />
        </div>
      </div>
    </section>
  );
};

export default CalEmbed;
