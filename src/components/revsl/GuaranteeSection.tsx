import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const GuaranteeSection = () => (
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
);

export default GuaranteeSection;
