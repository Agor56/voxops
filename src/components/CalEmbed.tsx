import { useEffect } from 'react';

const CalEmbed = () => {
  useEffect(() => {
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          (api as any).q = (api as any).q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // @ts-ignore
    window.Cal("init", "20min", { origin: "https://app.cal.com" });
    // @ts-ignore
    window.Cal.ns["20min"]("inline", {
      elementOrSelector: "#my-cal-inline-20min",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "vox-ops-mvonve/20min",
    });
    // @ts-ignore
    window.Cal.ns["20min"]("ui", {
      cssVarsPerTheme: { light: { "cal-brand": "#0F172A" }, dark: { "cal-brand": "#ffcc84" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
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
          className="glass-card rounded-2xl p-2 md:p-4 max-w-5xl mx-auto"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <div
            id="my-cal-inline-20min"
            style={{ width: '100%', height: '700px', overflow: 'scroll' }}
          />
        </div>
      </div>
    </section>
  );
};

export default CalEmbed;
