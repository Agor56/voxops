import { motion } from "framer-motion";
import { Target, Zap, RefreshCw } from "lucide-react";

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

const ThreePillars = () => (
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
            className="p-6 rounded-2xl border border-white/[0.06] bg-[#1E293B]/40 backdrop-blur-sm hover:border-[#F59E0B]/20 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center mb-5 group-hover:bg-[#F59E0B]/20 transition-colors duration-300">
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
);

export default ThreePillars;
