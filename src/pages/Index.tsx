import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MicroIntegrationStrip from '@/components/MicroIntegrationStrip';
import TwoLeaks from '@/components/TwoLeaks';
import HowItWorks from '@/components/HowItWorks';
import SocialProof from '@/components/SocialProof';
import ROICalculator from '@/components/ROICalculator';
import AgentsSection from '@/components/AgentsSection';
import OffersSection from '@/components/OffersSection';
import ComplianceSection from '@/components/ComplianceSection';
import FinalCTA from '@/components/FinalCTA';
import CalEmbed from '@/components/CalEmbed';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <div className="fixed inset-0 dot-grid pointer-events-none z-0 opacity-40" />

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <MicroIntegrationStrip />
          <TwoLeaks />
          <HowItWorks />
          <SocialProof />
          <ROICalculator />
          <AgentsSection />
          <OffersSection />
          <ComplianceSection />
          <FinalCTA />
          <CalEmbed />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
