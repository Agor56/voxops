import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const FinalCTA = () => {
  return (
    <section className="pt-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full blur-[120px]" style={{ background: 'rgba(201,169,110,0.07)' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4 leading-tight">
            Find the leaks before you{' '}
            <span style={{ color: '#C9A96E' }}>spend more on leads.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light mb-8">
            Book a free Lost Lead Audit and we'll show where your clinic is losing patient inquiries before they become consults.
          </p>
          <Button
            asChild
            size="xl"
            className="group hover:opacity-90 hover:-translate-y-px transition-all duration-300"
            style={{
              background: '#C9A96E',
              color: '#000',
              boxShadow: '0 0 24px rgba(201,169,110,0.35), 0 0 60px rgba(201,169,110,0.15)',
            }}
          >
            <a href="#book-demo" className="flex items-center">
              Get a Free Lost Lead Audit
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
