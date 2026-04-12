import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VSLPlayer = () => (
  <section className="px-5 pb-16 md:pb-24">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden border-2 border-[#1E293B] bg-[#1E293B]/60 backdrop-blur-sm flex items-center justify-center group cursor-pointer shadow-[0_0_40px_rgba(245,158,11,0.08)]"
        style={{ aspectRatio: "21 / 9" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#1E293B]" />

        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#F59E0B]/20 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="absolute -inset-3 rounded-full bg-[#F59E0B]/10 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />

            <div className="relative w-20 h-20 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] group-hover:scale-110 transition-all duration-300">
              <Play className="w-8 h-8 text-black ml-1" fill="black" />
            </div>
          </div>
          <span className="text-sm text-white/40 font-medium">Watch the 3-minute breakdown</span>
        </div>

        <div className="absolute bottom-4 right-4 z-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B] border border-white/10 text-xs text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F59E0B]" />
            </span>
            Case Study: Recovering $32K in 30 Days
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default VSLPlayer;
