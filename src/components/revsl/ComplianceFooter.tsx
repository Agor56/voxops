import { Link } from "react-router-dom";

const ComplianceFooter = () => (
  <footer className="border-t border-white/5 py-8 px-5">
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex items-center justify-between text-xs text-white/30">
        <span>© {new Date().getFullYear()} VoxOps. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white/50 transition-colors">Terms of Service</Link>
          <Link to="/contact" className="hover:text-white/50 transition-colors">Contact</Link>
        </div>
      </div>
      <p className="text-[10px] text-white/15 leading-relaxed max-w-4xl">
        This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
      </p>
    </div>
  </footer>
);

export default ComplianceFooter;
