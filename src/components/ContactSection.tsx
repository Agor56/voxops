import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clinic: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Thanks! We\'ll be in touch within 24 hours.');
    setFormData({
      name: '',
      email: '',
      clinic: '',
      phone: '',
      message: ''
    });
    setIsSubmitting(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
              <Send className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Get Started</span>
            </div>
            <h2 className="section-title mb-6">
              Ready to <span className="gradient-text">Transform</span> Your Clinic?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book a free demo and see how our AI agents can automate your patient journey. 
              No commitment, no pressure—just a conversation about what's possible.
            </p>

            {/* Contact Info */}
            

            {/* Trust Badges */}
            
          </motion.div>

          {/* Right Form */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Name</label>
                  <Input name="name" value={formData.name} onChange={handleChange} placeholder="Dr. Jane Smith" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jane@clinic.com" required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Website (Optional)</label>
                  <Input name="clinic" value={formData.clinic} onChange={handleChange} placeholder="Glow Aesthetics" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tell us about your needs</label>
                <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="What challenges are you facing with patient communication?" rows={4} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Book Your Free Demo'}
                <Send className="ml-2 w-4 h-4" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to our Privacy Policy. We'll never spam you.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default ContactSection;