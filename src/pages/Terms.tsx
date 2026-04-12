import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => (
  <div className="min-h-screen bg-[#0F172A] text-white px-5 py-20">
    <div className="max-w-3xl mx-auto">
      <Link to="/revslinfo" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>Terms of Service</h1>
      <div className="prose prose-invert prose-sm max-w-none text-white/60 space-y-6">
        <p><strong>Effective Date:</strong> {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        <p>By accessing and using the VoxOps website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        <h2 className="text-white text-lg font-semibold">Services</h2>
        <p>VoxOps provides AI-powered lead qualification and appointment-setting services for real estate professionals. Service details, deliverables, and guarantees are outlined in individual client agreements.</p>
        <h2 className="text-white text-lg font-semibold">Guarantee Terms</h2>
        <p>Our 60-Day Qualified Appointment Guarantee is subject to terms outlined in your specific service agreement. The guarantee applies only to clients who meet the agreed-upon criteria and follow the recommended implementation process.</p>
        <h2 className="text-white text-lg font-semibold">Intellectual Property</h2>
        <p>All content, branding, and materials on this website are the property of VoxOps and may not be reproduced without written permission.</p>
        <h2 className="text-white text-lg font-semibold">Limitation of Liability</h2>
        <p>VoxOps shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services or website.</p>
        <h2 className="text-white text-lg font-semibold">Modifications</h2>
        <p>We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of modified terms.</p>
        <h2 className="text-white text-lg font-semibold">Contact</h2>
        <p>Questions about these terms? Visit our <Link to="/contact" className="text-[#F59E0B] hover:underline">contact page</Link>.</p>
        <hr className="border-white/10" />
        <p className="text-[11px] text-white/20">This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.</p>
      </div>
    </div>
  </div>
);

export default Terms;
