import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => (
  <div className="min-h-screen bg-[#0F172A] text-white px-5 py-20">
    <div className="max-w-3xl mx-auto">
      <Link to="/revslinfo" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>Privacy Policy</h1>
      <div className="prose prose-invert prose-sm max-w-none text-white/60 space-y-6">
        <p><strong>Effective Date:</strong> {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        <p>VoxOps ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
        <h2 className="text-white text-lg font-semibold">Information We Collect</h2>
        <p>We may collect personal identification information including but not limited to: name, email address, phone number, and business information that you voluntarily provide when filling out forms on our site.</p>
        <h2 className="text-white text-lg font-semibold">How We Use Your Information</h2>
        <p>We use collected information to: respond to inquiries, schedule appointments, send relevant communications, improve our services, and comply with legal obligations.</p>
        <h2 className="text-white text-lg font-semibold">Third-Party Services</h2>
        <p>We may use third-party services such as Cal.com for scheduling, analytics platforms, and advertising networks. These services may collect information as governed by their own privacy policies.</p>
        <h2 className="text-white text-lg font-semibold">Data Retention</h2>
        <p>We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>
        <h2 className="text-white text-lg font-semibold">Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. Contact us at the details provided below to exercise these rights.</p>
        <h2 className="text-white text-lg font-semibold">Contact</h2>
        <p>For privacy-related inquiries, please reach out via our <Link to="/contact" className="text-[#F59E0B] hover:underline">contact page</Link>.</p>
        <hr className="border-white/10" />
        <p className="text-[11px] text-white/20">This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.</p>
      </div>
    </div>
  </div>
);

export default Privacy;
