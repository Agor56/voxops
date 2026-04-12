import { motion } from "framer-motion";
import { Shield, ChevronDown } from "lucide-react";

const HeroSection = () => (
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
        Stop Chasing Leads.{" "}
        <span className="text-[#F59E0B]">Start Closing Appointments.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base md:text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        While you're at a showing, VoxOps is calling your new leads in 20 seconds,
        qualifying them, and booking them directly onto your calendar.
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
);

export default HeroSection;
