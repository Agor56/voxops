import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Target, Zap, RefreshCw, Play, Star, ArrowRight, ChevronDown } from "lucide-react";

/* ───────── Sticky CTA ───────── */
const StickyCTA = ({ onClick }: { onClick: () => void }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <button
            onClick={onClick}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm
              bg-[#F59E0B] text-black shadow-[0_0_25px_rgba(245,158,11,0.4)]
              hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:scale-105
              transition-all duration-300"
          >
            👉 Book Your Free Discovery Call <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ───────── Cal.com / Typeform Placeholder Modal ───────── */
const BookingModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1E293B] p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            Book Your Discovery Call
          </h2>
          <p className="text-white/50 mb-6 text-sm">
            Cal.com / Typeform embed will appear here.
          </p>
          <div className="w-full h-64 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/20 text-sm">
            Embed Placeholder
          </div>
          <button
            onClick={onClose}
            className="mt-6 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ───────── Main VSL Page ───────── */
const RevSlInfo = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);

  const pillars = [
    {
      icon: <Target className="w-7 h-7 text-[#F59E0B]" />,
      title: "Intent-Based Ads",
      desc: "We use emotional-trigger creative to find pre-qualified sellers and buyers, filtering for intent before the lead ever hits your CRM.",
    },
    {
      icon: <Zap className="w-7 h-7 text-[#F59E0B]" />,
      title: "The 20-Second Strike",
      desc: "Our AI agents (Mia & Alex) call every lead back within 20 seconds to verify their timeline and budget before they ever reach your calendar.",
    },
    {
      icon: <RefreshCw className="w-7 h-7 text-[#F59E0B]" />,
      title: "Relentless Follow-Up",
      desc: "Automated reactivation of your old database and multi-channel follow-up via WhatsApp, SMS, and email until they respond.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white overflow-x-hidden">
      <StickyCTA onClick={openBooking} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* ── Header ── */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-[#0F172A]/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-16">
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
            Vox<span className="text-[#F59E0B]">Ops</span>
          </span>
          <button
            onClick={openBooking}
            className="bg-[#F59E0B] hover:bg-[#D97706] text-black text-sm font-bold px-5 h-10 rounded-lg
              shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]
              transition-all duration-300"
          >
            Book Call
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-5">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#F59E0B] opacity-[0.04] blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#F59E0B] mb-6 px-4 py-1.5 rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/5">
              <Shield className="w-3.5 h-3.5" /> 60-Day Qualified Appointment Guarantee
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            You're Not Losing Deals Because Your Leads Are Bad.{" "}
            <span className="text-[#F59E0B]">
              You're Losing Them Because Your Ads Aren't Optimized — And Nobody's Following Up Fast Enough.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            See how top-producing agents are securing qualified listing and buyer appointments on autopilot using smarter ads and 24/7 AI agents that respond in 20 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <ChevronDown className="w-6 h-6 mx-auto text-white/20 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ── VSL Video (21:9 Cinematic) ── */}
      <section className="px-5 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1E293B]/60 backdrop-blur-sm flex items-center justify-center group cursor-pointer"
            style={{ aspectRatio: "21 / 9" }}
            onClick={openBooking}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#1E293B]" />

            {/* Play button with pulse */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#F59E0B]/20 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="absolute -inset-3 rounded-full bg-[#F59E0B]/10 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />

                <div className="relative w-20 h-20 rounded-full bg-[#F59E0B] flex items-center justify-center
                  shadow-[0_0_30px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_50px_rgba(245,158,11,0.6)]
                  group-hover:scale-110 transition-all duration-300">
                  <Play className="w-8 h-8 text-black ml-1" fill="black" />
                </div>
              </div>
              <span className="text-sm text-white/40 font-medium">Watch the 3-minute breakdown</span>
            </div>

            {/* Pulse notification badge */}
            <div className="absolute bottom-4 right-4 z-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B] border border-white/10 text-xs text-white/70">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F59E0B]"></span>
                </span>
                Case Study: Recovering $32K in 30 Days
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="px-5 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-[#1E293B]/50 backdrop-blur-sm"
          >
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-white/90 mb-6 italic">
              "In the first 30 days, the system booked 10+ qualified appointments from leads we'd completely written off.{" "}
              <span className="text-[#F59E0B] font-bold not-italic">Over $32K in recovered pipeline</span> — from a dead list."
            </blockquote>
            <p className="text-sm text-white/40 font-medium">— Leo M. (VoxOps Client)</p>
          </motion.div>
        </div>
      </section>

      {/* ── Three Pillars ── */}
      <section className="px-5 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            The VoxOps Engine: <span className="text-[#F59E0B]">Three Pillars</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white/40 text-sm mb-12 max-w-xl mx-auto"
          >
            Smarter ads, instant AI response, and relentless follow-up — working together 24/7.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-white/[0.06] bg-[#1E293B]/40 backdrop-blur-sm
                  hover:border-[#F59E0B]/20 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center mb-5
                  group-hover:bg-[#F59E0B]/20 transition-colors duration-300">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {p.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantee Section ── */}
      <section className="px-5 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-2xl border border-[#F59E0B]/15 bg-[#1E293B]/40 backdrop-blur-sm text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[#F59E0B]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              The 60-Day Qualified Appointment Guarantee
            </h2>
            <p className="text-white/55 leading-relaxed max-w-xl mx-auto">
              We don't guarantee "leads" or "clicks." We guarantee a specific number of verified listing or buyer appointments for your business. If we don't hit that number within 60 days —{" "}
              <span className="text-[#F59E0B] font-semibold">you get your money back.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Primary CTA ── */}
      <section className="px-5 pb-20 md:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-xl text-lg font-bold
                bg-[#F59E0B] text-black
                shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)]
                hover:scale-[1.03] hover:-translate-y-0.5
                animate-[pulse_3s_ease-in-out_infinite]
                transition-all duration-300"
            >
              👉 Book Your Free 20-Minute Discovery Call <ArrowRight className="w-5 h-5" />
            </button>

            <p className="mt-5 text-sm text-white/35 max-w-lg mx-auto leading-relaxed">
              Limited spots available. We only take on clients where the math for a 5x–10x ROI is clear. If it's not a fit, we'll tell you honestly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8 px-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-white/30">
          <span>© {new Date().getFullYear()} VoxOps. All rights reserved.</span>
          <span>Built for performance.</span>
        </div>
      </footer>
    </div>
  );
};

export default RevSlInfo;
