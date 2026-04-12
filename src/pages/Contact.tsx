import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin } from "lucide-react";

const Contact = () => (
  <div className="min-h-screen bg-[#0F172A] text-white px-5 py-20">
    <div className="max-w-3xl mx-auto">
      <Link to="/revslinfo" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>Contact Us</h1>
      <div className="space-y-6 text-white/60">
        <p>Have questions about our services or need support? We'd love to hear from you.</p>

        <div className="p-6 rounded-2xl border border-white/[0.06] bg-[#1E293B]/50 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#F59E0B]" />
            <a href="mailto:hello@voxops.space" className="text-white/80 hover:text-[#F59E0B] transition-colors">
              hello@voxops.space
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-white/60">Remote — Serving clients worldwide</span>
          </div>
        </div>

        <p className="text-sm">
          For scheduling a call, visit our{" "}
          <Link to="/revslinfo" className="text-[#F59E0B] hover:underline">
            main page
          </Link>{" "}
          and use the booking form.
        </p>
      </div>
    </div>
  </div>
);

export default Contact;
