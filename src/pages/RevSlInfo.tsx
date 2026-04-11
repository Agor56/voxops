import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, RefreshCw, CalendarCheck, Play, Star, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
              bg-[#F97316] text-white shadow-[0_0_25px_rgba(249,115,22,0.4)]
              hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] hover:scale-105
              transition-all duration-300"
          >
            👉 Book Your Free Discovery Call <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ───────── Qualification Form (Page 2) ───────── */
const QualificationForm = ({ onBack }: { onBack: () => void }) => {
  const [leads, setLeads] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [dealValue, setDealValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: redirect to Calendly
    window.open("https://calendly.com", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <button
          onClick={onBack}
          className="text-sm text-white/50 hover:text-white/80 mb-8 transition-colors"
        >
          ← Back
        </button>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3" style={{ fontFamily: "'Inter', 'Space Grotesk', sans-serif" }}>
          One last step — <span className="text-[#F97316]">3 quick questions</span> so Anton can prepare your personal lead-loss breakdown before the call
        </h1>
        <p className="text-white/50 mb-10 text-base">
          Takes 60 seconds. Helps us show up with real numbers — not a generic pitch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Q1 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">
              How many new leads do you generate per month?
            </label>
            <Input
              type="number"
              placeholder="e.g. 150"
              value={leads}
              onChange={(e) => setLeads(e.target.value)}
              required
              className="bg-white/5 border-white/10 focus-visible:ring-[#F97316]/50 focus-visible:border-[#F97316]/50 h-12 text-white placeholder:text-white/30"
            />
          </div>

          {/* Q2 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">
              What is your current average lead response time?
            </label>
            <Select value={responseTime} onValueChange={setResponseTime} required>
              <SelectTrigger className="bg-white/5 border-white/10 h-12 text-white focus:ring-[#F97316]/50">
                <SelectValue placeholder="Select response time" />
              </SelectTrigger>
              <SelectContent className="bg-[#141D2F] border-white/10">
                <SelectItem value="under5">Under 5 minutes</SelectItem>
                <SelectItem value="5to30">5–30 minutes</SelectItem>
                <SelectItem value="1hour">1 hour+</SelectItem>
                <SelectItem value="nextday">Next day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Q3 */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">
              What is your average commission/deal value?
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
              <Input
                type="number"
                placeholder="e.g. 12000"
                value={dealValue}
                onChange={(e) => setDealValue(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus-visible:ring-[#F97316]/50 focus-visible:border-[#F97316]/50 h-12 pl-8 text-white placeholder:text-white/30"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-base font-bold rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white
              shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:shadow-[0_0_35px_rgba(249,115,22,0.5)]
              transition-all duration-300"
          >
            Complete Booking <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

/* ───────── Main VSL Page ───────── */
const RevSlInfo = () => {
  const [showQualification, setShowQualification] = useState(false);

  const scrollToCTA = () => {
    document.getElementById("main-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  if (showQualification) {
    return <QualificationForm onBack={() => setShowQualification(false)} />;
  }

  const features = [
    {
      icon: <Zap className="w-7 h-7 text-[#F97316]" />,
      title: "20-Second Response Time",
      desc: "Every lead, every time, around the clock. No more lost opportunities from slow follow-up.",
    },
    {
      icon: <RefreshCw className="w-7 h-7 text-[#F97316]" />,
      title: "Relentless Follow-Up",
      desc: "Your leads get contacted until they respond — automatically. No lead falls through the cracks.",
    },
    {
      icon: <CalendarCheck className="w-7 h-7 text-[#F97316]" />,
      title: "Meetings Booked for You",
      desc: "Mia qualifies and schedules before you lift a finger. You show up, they're ready to talk.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-x-hidden">
      <StickyCTA onClick={() => setShowQualification(true)} />

      {/* ── Header ── */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-[#0B1120]/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-16">
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Inter', 'Space Grotesk', sans-serif" }}>
            Vox<span className="text-[#F97316]">Ops</span>
          </span>
          <Button
            onClick={() => setShowQualification(true)}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-semibold px-5 h-10 rounded-lg
              shadow-[0_0_15px_rgba(249,115,22,0.25)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]
              transition-all duration-300"
          >
            Book Call
          </Button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-5">
        {/* Ambient glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#F97316] opacity-[0.04] blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#F97316] mb-6 px-4 py-1.5 rounded-full border border-[#F97316]/20 bg-[#F97316]/5">
              For Real Estate Agents & Teams
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-6"
            style={{ fontFamily: "'Inter', 'Space Grotesk', sans-serif" }}
          >
            You're Not Losing Deals Because Your Leads Are Bad.{" "}
            <span className="text-[#F97316]">You're Losing Them Because Nobody's Following Up Fast Enough.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            See how top-producing real estate agents are using 3 AI agents to answer every lead in 20 seconds, follow up relentlessly, and book meetings automatically — 24 hours a day, 7 days a week.
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

      {/* ── VSL Video ── */}
      <section className="px-5 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm aspect-video flex items-center justify-center group cursor-pointer"
          >
            {/* Placeholder bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] to-[#141D2F]" />

            {/* Play button with pulse */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="relative">
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full bg-[#F97316]/20 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="absolute -inset-3 rounded-full bg-[#F97316]/10 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />

                <div className="relative w-20 h-20 rounded-full bg-[#F97316] flex items-center justify-center
                  shadow-[0_0_30px_rgba(249,115,22,0.4)] group-hover:shadow-[0_0_50px_rgba(249,115,22,0.6)]
                  group-hover:scale-110 transition-all duration-300">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
              <span className="text-sm text-white/40 font-medium">Watch the 3-minute breakdown</span>
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
            className="relative p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#F97316] fill-[#F97316]" />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-white/90 mb-6 italic">
              "In the first 30 days, the system booked 10+ qualified meetings from leads we'd completely written off.{" "}
              <span className="text-[#F97316] font-bold not-italic">$30,000 in recovered pipeline</span> — from a dead list."
            </blockquote>
            <p className="text-sm text-white/40 font-medium">— VoxOps Client</p>
          </motion.div>
        </div>
      </section>

      {/* ── Feature Grid ── */}
      <section className="px-5 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Inter', 'Space Grotesk', sans-serif" }}
          >
            Three AI Agents. <span className="text-[#F97316]">Zero Missed Leads.</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm
                  hover:border-[#F97316]/20 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-5
                  group-hover:bg-[#F97316]/20 transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Inter', 'Space Grotesk', sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Primary CTA ── */}
      <section id="main-cta" className="px-5 pb-20 md:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowQualification(true)}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-xl text-lg font-bold
                bg-[#F97316] text-white
                shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)]
                hover:scale-[1.03] hover:-translate-y-0.5
                transition-all duration-300"
            >
              👉 Book Your Free 20-Minute Discovery Call <ArrowRight className="w-5 h-5" />
            </button>

            <p className="mt-5 text-sm text-white/35 max-w-lg mx-auto leading-relaxed">
              We only work with businesses where the ROI math is clear within 30 days. If it doesn't add up — we'll tell you honestly on the call.
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
