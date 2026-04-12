import HeroSection from "@/components/revsl/HeroSection";
import VSLPlayer from "@/components/revsl/VSLPlayer";
import SocialProof from "@/components/revsl/SocialProof";
import ThreePillars from "@/components/revsl/ThreePillars";
import GuaranteeSection from "@/components/revsl/GuaranteeSection";
import QualifierForm from "@/components/revsl/QualifierForm";
import StickyCTA from "@/components/revsl/StickyCTA";
import ComplianceFooter from "@/components/revsl/ComplianceFooter";

const RevSlInfo = () => (
  <div className="min-h-screen bg-[#0F172A] text-white overflow-x-hidden">
    <StickyCTA />

    {/* Header */}
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-[#0F172A]/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-16">
        <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
          Vox<span className="text-[#F59E0B]">Ops</span>
        </span>
        <button
          onClick={() => document.getElementById("qualifier")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-[#F59E0B] hover:bg-[#D97706] text-black text-sm font-bold px-5 h-10 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300"
        >
          Book Call
        </button>
      </div>
    </header>

    <HeroSection />
    <VSLPlayer />
    <SocialProof />
    <ThreePillars />
    <GuaranteeSection />
    <QualifierForm />
    <ComplianceFooter />
  </div>
);

export default RevSlInfo;
