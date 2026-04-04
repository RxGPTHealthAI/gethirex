import { Link } from "react-router-dom";
import hirexLogo from "@/assets/hirex-logo.png";

const Footer = () => (
  <footer className="pt-20 pb-8 border-t border-border" style={{ background: "#0F1425" }}>
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-4 no-underline">
            <img src={hirexLogo} alt="HireX" className="h-8 w-auto" />
          </Link>
          <p className="text-[13px] text-hirex-text3 leading-relaxed max-w-[260px] mb-4">
            AI Recruitment Platform — Autonomous agents that run your entire HR operation.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-hirex-text2 font-medium">
            <span>47K Screened</span>
            <span>$4.7M Saved</span>
            <span>2.8K Hires</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-hirex-text3 mb-5">Product</div>
          <ul className="flex flex-col gap-3">
            <li><Link to="/how-it-works" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">How It Works</Link></li>
            <li><Link to="/pricing" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">Pricing</Link></li>
            <li><Link to="/demo" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">Demo</Link></li>
            <li><Link to="/process" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">Process</Link></li>
            <li><Link to="/integrations" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">Integrations</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-hirex-text3 mb-5">Company</div>
          <ul className="flex flex-col gap-3">
            <li><Link to="/customer-stories" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">Customer Stories</Link></li>
            <li><Link to="/team" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">Team</Link></li>
            <li><Link to="/blog" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-hirex-text3 mb-5">Support</div>
          <ul className="flex flex-col gap-3">
            <li><a href="mailto:support@gethirex.space" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">📧 support@gethirex.space</a></li>
            <li><a href="tel:+918827647684" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">📞 +91 8827647684</a></li>
            <li><a href="tel:+93225944565" className="text-sm text-hirex-text2 no-underline hover:text-foreground transition-colors">🚨 Emergency: +93-225944565</a></li>
            <li><a className="text-sm text-hirex-text2 cursor-pointer hover:text-foreground transition-colors">HR FAQ (100+ Questions)</a></li>
            <li><a className="text-sm text-hirex-text2 cursor-pointer hover:text-foreground transition-colors">Candidates FAQ (100+ Q)</a></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 mb-12 pb-8 border-b border-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-hirex-text3 mr-4">Legal</span>
        <a className="text-sm text-hirex-text2 no-underline hover:text-foreground cursor-pointer transition-colors">Privacy Policy</a>
        <a className="text-sm text-hirex-text2 no-underline hover:text-foreground cursor-pointer transition-colors">Terms of Service</a>
        <a className="text-sm text-hirex-text2 no-underline hover:text-foreground cursor-pointer transition-colors">Refund Policy</a>
        <a className="text-sm text-hirex-text2 no-underline hover:text-foreground cursor-pointer transition-colors">Security (SOC2)</a>
        <a className="text-sm text-hirex-text2 no-underline hover:text-foreground cursor-pointer transition-colors">Cookie Policy</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-hirex-cyan mb-2">Headquarters</div>
          <p className="text-[13px] text-hirex-text2 leading-relaxed">
            888 Quantum Loop, Suite 101<br />
            Palo Alto, California 94303, US
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-hirex-cyan mb-2">Bengaluru Office</div>
          <p className="text-[13px] text-hirex-text2 leading-relaxed">
            International Tech Park Bangalore (ITPB)<br />
            Block 1B, EPIP Zone, Whitefield<br />
            Bengaluru, Karnataka 560066, IN
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-hirex-cyan mb-2">Odisha Office</div>
          <p className="text-[13px] text-hirex-text2 leading-relaxed">
            Srikhetra Bihar, Aiginia, Lane 4<br />
            Bhubaneswar, Odisha 751019, IN
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-[13px] text-hirex-text2 mb-8 pb-6 border-b border-border">
        <a href="tel:+918827647684" className="no-underline text-hirex-text2 hover:text-foreground transition-colors">📞 +91 8827647684</a>
        <span className="text-border">|</span>
        <a href="tel:+93225944565" className="no-underline text-hirex-text2 hover:text-foreground transition-colors">🚨 +93-225944565</a>
        <span className="text-border">|</span>
        <a href="mailto:support@gethirex.space" className="no-underline text-hirex-text2 hover:text-foreground transition-colors">✉️ support@gethirex.space</a>
      </div>

      <div className="flex flex-wrap justify-between items-center text-[12px] text-hirex-text3 gap-4">
        <span>© 2026 HireX by GetHired Global. All rights reserved.</span>
        <div className="flex items-center gap-4 text-hirex-text3">
          <span>SOC2 Secure</span>
          <span>•</span>
          <span>GDPR/DPDP Compliant</span>
          <span>•</span>
          <span>47K Candidates Screened</span>
        </div>
        <div className="flex gap-3">
          <a href="https://www.linkedin.com/showcase/hirexbygethiredglobal/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-[10px] bg-hirex-surface border border-border flex items-center justify-center text-sm hover:bg-primary hover:border-primary transition-all no-underline text-foreground">in</a>
          <a href="https://youtu.be/oTvA-86ZiM0" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-[10px] bg-hirex-surface border border-border flex items-center justify-center text-sm hover:bg-primary hover:border-primary transition-all no-underline text-foreground">▶</a>
          <a href="mailto:support@gethirex.space" className="w-9 h-9 rounded-[10px] bg-hirex-surface border border-border flex items-center justify-center text-sm hover:bg-primary hover:border-primary transition-all no-underline text-foreground">✉</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
