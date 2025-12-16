import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Sarah Cohen',
    role: 'Medical Director',
    clinic: 'Glow Aesthetics',
    quote: "VidLeads transformed how we handle patient inquiries. We went from losing leads overnight to converting them while we sleep. Our booking rate increased by 45% in the first month.",
    stat: '+45% bookings',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Clinic Owner',
    clinic: 'Premier Med Spa',
    quote: "The no-show reduction alone paid for the entire system. Our patients love the WhatsApp reminders, and our front desk finally has time to focus on in-person care.",
    stat: '38% fewer no-shows',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Operations Manager',
    clinic: 'Beauty & Wellness Center',
    quote: "We were skeptical about AI handling patient communication, but the responses are so natural that patients often don't realize they're talking to a bot until we tell them.",
    stat: '92% satisfaction rate',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Testimonials</span>
          </div>
          <h2 className="section-title mb-4">
            Don't Just Take <span className="gradient-text">Our Word</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12 rounded-3xl"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                  "{testimonials[activeIndex].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div>
                      <div className="font-semibold">{testimonials[activeIndex].name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[activeIndex].role} at {testimonials[activeIndex].clinic}
                      </div>
                    </div>
                  </div>
                  <div className="glass-card px-4 py-2 rounded-full">
                    <span className="text-sm font-semibold gradient-text">
                      {testimonials[activeIndex].stat}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={goToPrev}
                className="glass-card p-3 rounded-full hover:border-primary/30 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeIndex ? 'w-6 bg-primary' : 'bg-muted-foreground/30'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={goToNext}
                className="glass-card p-3 rounded-full hover:border-primary/30 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
