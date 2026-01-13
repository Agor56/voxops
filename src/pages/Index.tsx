import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AgentsSection from '@/components/AgentsSection';
import MetricsSection from '@/components/MetricsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import ComparisonTable from '@/components/ComparisonTable';
import OnboardingSection from '@/components/OnboardingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Dot Grid Background */}
      <div className="fixed inset-0 dot-grid pointer-events-none z-0 opacity-40" />
      
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <AgentsSection />
          <MetricsSection />
          <TestimonialsSection />
          <PricingSection />
          <section className="container mx-auto px-4">
            <ComparisonTable />
          </section>
          <OnboardingSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
