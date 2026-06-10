import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import proof64 from '@/assets/proof-64-consults.png.asset.json';
import proof1931 from '@/assets/proof-19-31.png.asset.json';

const screenshots = [
  {
    image: proof64.url,
    title: '64 consultations in one week',
    caption: 'After improving inquiry response and booking support.',
  },
  {
    image: proof1931.url,
    title: 'From 19 to 31 confirmed bookings',
    caption: 'A client message showing booking growth after stronger follow-up.',
  },
];

const SocialProof = () => {
  const { isRTL } = useLanguage();

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(201,169,110,0.05)' }} />

      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Star className="w-4 h-4" style={{ color: '#C9A96E' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>Proof</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4 leading-tight">
            Faster follow-up.{' '}
            <span style={{ color: '#C9A96E' }}>More booked consults.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Real client messages from teams using automated response, follow-up, and booking workflows to recover more patient inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {screenshots.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card-hover rounded-2xl p-5 flex flex-col h-full"
            >
              <div className="rounded-xl overflow-hidden mb-4 border" style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0a0a0a' }}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-3.5 h-3.5" style={{ color: '#C9A96E', fill: '#C9A96E' }} />
                ))}
              </div>
              <h3 className="text-base font-bold font-display mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{s.caption}</p>
            </motion.div>
          ))}

          {/* Quote-only card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="glass-card-hover rounded-2xl p-6 flex flex-col h-full"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(201,169,110,0.12)' }}>
              <Quote className="w-4 h-4" style={{ color: '#C9A96E' }} />
            </div>
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-3.5 h-3.5" style={{ color: '#C9A96E', fill: '#C9A96E' }} />
              ))}
            </div>
            <h3 className="text-base font-bold font-display mb-3">More control over every inquiry</h3>
            <p className="text-sm font-light leading-relaxed italic mb-4 flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
              "Before VoxOps, leads were slipping through calls, DMs, and follow-ups. Now every inquiry gets a fast response, our team has more control, and more patients are making it to the calendar."
            </p>
            <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <div className="font-semibold" style={{ color: '#C9A96E' }}>Clinic Owner</div>
              <div>GLP-1 / Wellness Clinic</div>
            </div>
          </motion.div>
        </div>

        <p className="text-center text-xs mt-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Results vary by clinic, lead volume, offer, and follow-up process.
        </p>

        <div className="flex justify-center mt-6">
          <Button
            asChild
            size="lg"
            className="group hover:opacity-90 hover:-translate-y-px transition-all duration-300"
            style={{
              background: '#C9A96E',
              color: '#000',
              boxShadow: '0 0 20px rgba(201,169,110,0.3), 0 0 50px rgba(201,169,110,0.12)',
            }}
          >
            <a href="#book-demo" className="flex items-center">
              Get a Free Lost Lead Audit
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
