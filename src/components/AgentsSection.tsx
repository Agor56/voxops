import { motion } from 'framer-motion';
import { Bot, MessageSquare, Calendar, Bell, ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/button';

const agents = [
  {
    name: 'Lead Response Agent',
    icon: MessageSquare,
    color: 'orange',
    description: 'Instantly engages new leads with personalized responses, qualifying them and answering FAQs 24/7.',
    features: [
      'Responds within seconds, not hours',
      'Handles FAQs automatically',
      'Qualifies leads by treatment interest',
      'Multi-language support',
    ],
  },
  {
    name: 'Booking Agent',
    icon: Calendar,
    color: 'blue',
    description: 'Automatically schedules consultations, syncs with your calendar, and sends confirmations.',
    features: [
      'Direct calendar integration',
      'Smart slot recommendations',
      'Instant booking confirmations',
      'Reschedule & cancellation handling',
    ],
  },
  {
    name: 'Follow-Up Agent',
    icon: Bell,
    color: 'orange',
    description: 'Reduces no-shows with automated reminders via WhatsApp, SMS, and voice calls.',
    features: [
      'Multi-channel reminders',
      'Automated confirmation requests',
      'No-show recovery sequences',
      'Post-visit follow-ups',
    ],
  },
];

const AgentCard = ({ agent, index }: { agent: typeof agents[0]; index: number }) => {
  const isOrange = agent.color === 'orange';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`glass-card-hover p-8 rounded-2xl h-full flex flex-col ${
        isOrange ? 'hover:border-primary/30' : 'hover:border-secondary/30'
      }`}
    >
      {/* Icon */}
      <div className={`${isOrange ? 'feature-icon' : 'feature-icon-blue'} mb-6`}>
        <agent.icon className="w-5 h-5 text-primary-foreground" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3">{agent.name}</h3>
      
      {/* Description */}
      <p className="text-muted-foreground mb-6">{agent.description}</p>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-grow">
        {agent.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              isOrange ? 'bg-primary/20' : 'bg-secondary/20'
            }`}>
              <Check className={`w-3 h-3 ${isOrange ? 'text-primary' : 'text-secondary'}`} />
            </div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button 
        variant={isOrange ? "hero" : "heroBlue"} 
        className="w-full group"
        asChild
      >
        <a href="#contact">
          Learn More
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </Button>
    </motion.div>
  );
};

const AgentsSection = () => {
  return (
    <section id="agents" className="py-24 relative">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
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
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI Solutions</span>
          </div>
          <h2 className="section-title mb-4">
            Meet Your <span className="gradient-text">AI Admin Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three specialized AI agents working together to automate your patient journey 
            from first contact to post-treatment follow-up.
          </p>
        </motion.div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <AgentCard key={agent.name} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
