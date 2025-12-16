import { motion } from 'framer-motion';
import { ArrowRight, Bot, MessageSquare, Calendar } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="hero-glow bg-primary top-1/4 -left-48 animate-pulse-glow" />
      <div className="hero-glow bg-secondary top-1/3 -right-48 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">AI-Powered Healthcare Automation</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title mb-6"
          >
            Your Clinic's AI Admin Team.{' '}
            <span className="gradient-text glow-text">Never Miss a Lead Again.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            AI agents that respond to leads in seconds, book appointments automatically, 
            and reduce no-shows by up to 40%. Built specifically for Med Spas & Clinics.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="#contact">
                Book a Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#agents">See How It Works</a>
            </Button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: Bot, label: 'AI Lead Response' },
              { icon: Calendar, label: 'Auto Scheduling' },
              { icon: MessageSquare, label: 'WhatsApp Integration' },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-card px-5 py-3 rounded-full flex items-center gap-3 hover:border-primary/30 transition-all"
              >
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating Cards */}
        <div className="absolute bottom-10 left-10 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card p-4 rounded-xl max-w-[200px] animate-float"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-muted-foreground">New Lead</span>
            </div>
            <p className="text-sm font-medium">Responded in 8 seconds</p>
          </motion.div>
        </div>

        <div className="absolute top-1/3 right-10 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-card p-4 rounded-xl max-w-[200px] animate-float"
            style={{ animationDelay: '3s' }}
          >
            <div className="text-2xl font-bold gradient-text mb-1">+40%</div>
            <p className="text-xs text-muted-foreground">Reduction in no-shows</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
