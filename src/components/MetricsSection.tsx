import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const stats = [
  {
    number: '<60',
    suffix: 's',
    label: 'Response Time',
    description: 'Respond to leads in under 60 seconds while competitors take 5+ hours.',
  },
  {
    number: '40',
    prefix: '+',
    suffix: '%',
    label: 'No-Show Reduction',
    description: 'Automated reminders via WhatsApp + voice reduce missed appointments dramatically.',
  },
  {
    number: '3',
    suffix: 'x',
    label: 'Conversion Rate',
    description: 'Responding within minutes instead of hours gives you a massive conversion advantage.',
  },
  {
    number: '24',
    suffix: '/7',
    label: 'Availability',
    description: 'AI agents work around the clock, capturing leads even while you sleep.',
  },
];

const MetricsSection = () => {
  return (
    <section id="metrics" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
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
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Proven Results</span>
          </div>
          <h2 className="section-title mb-4">
            The Numbers <span className="gradient-text">Don't Lie</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real clinics using our AI agents.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card-hover p-8 text-center"
            >
              <div className="stat-number mb-2">
                {stat.prefix}
                {stat.number}
                {stat.suffix}
              </div>
              <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
