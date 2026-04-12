import { motion } from "framer-motion";
import { Star } from "lucide-react";

const SocialProof = () => (
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
);

export default SocialProof;
