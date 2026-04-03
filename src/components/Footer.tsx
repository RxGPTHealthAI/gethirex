import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="pt-16 pb-8 border-t border-border">
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-4 no-underline">
            <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-primary to-accent flex items-center justify-center text-base">✦</div>
            <span className="font-display text-xl font-extrabold text-foreground">HireX</span>
          </Link>
          <p className="text-[13px] text-hirex-text3 leading-relaxed max-w-[260px] mb-1">
            Autonomous AI that runs your entire HR operation—from hiring to retention.
          </p>
          <div className="flex gap-2.5 mt-5">
            <a href="#" className="w-9 h-9 rounded-[10px] bg-hirex-surface border border-border flex items-center justify-center text-sm hover:bg-primary hover:border-primary transition-all no-underline text-foreground">𝕏</a>
            <a href="#" className="w-9 h-9 rounded-[10px] bg-hirex-surface border border-border flex items-center justify-center text-sm hover:bg-primary hover:border-primary transition-all no-underline text-foreground">in</a>
            <a href="mailto:customersupport@gethirex.space" className="w-9 h-9 rounded-[10px] bg-hirex-surface border border-border flex items-center justify-center text-sm hover:bg-primary hover:border-primary transition-all no-underline text-foreground">✉</a>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-hirex-text3 mb-5">Product</div>
          <ul className="flex flex-col gap-3">
            <li><Link to="/agents" className="text-sm text-hirex-text3 no-underline hover:text-foreground transition-colors">Super-Agents</Link></li>
            <li><Link to="/pricing" className="text-sm text-hirex-text3 no-underline hover:text-foreground transition-colors">Pricing</Link></li>
            <li><Link to="/" className="text-sm text-hirex-text3 no-underline hover:text-foreground transition-colors">Features</Link></li>
            <li><Link to="/contact" className="text-sm text-hirex-text3 no-underline hover:text-foreground transition-colors">Demo</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-hirex-text3 mb-5">Company</div>
          <ul className="flex flex-col gap-3">
            <li><Link to="/" className="text-sm text-hirex-text3 no-underline hover:text-foreground transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-sm text-hirex-text3 no-underline hover:text-foreground transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="text-sm text-hirex-text3 no-underline hover:text-foreground transition-colors">Contact</Link></li>
            <li><a href="mailto:customersupport@gethirex.space" className="text-sm text-hirex-text3 no-underline hover:text-foreground transition-colors">Support</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-hirex-text3 mb-5">Resources</div>
          <ul className="flex flex-col gap-3">
            <li><Link to="/blog" className="text-sm text-hirex-text3 no-underline hover:text-foreground transition-colors">Blog</Link></li>
            <li><a className="text-sm text-hirex-text3 cursor-pointer">Research</a></li>
            <li><a className="text-sm text-hirex-text3 cursor-pointer">Documentation</a></li>
            <li><a className="text-sm text-hirex-text3 cursor-pointer">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center pt-6 border-t border-border text-sm text-hirex-text3 gap-4">
        <span>© 2026 GetHired Global</span>
        <div className="flex gap-6">
          <a className="text-hirex-text3 no-underline hover:text-foreground cursor-pointer transition-colors">Privacy</a>
          <a className="text-hirex-text3 no-underline hover:text-foreground cursor-pointer transition-colors">Terms</a>
          <a className="text-hirex-text3 no-underline hover:text-foreground cursor-pointer transition-colors">Security</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
