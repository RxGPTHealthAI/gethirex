import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy-dark border-t border-navy-light/30 pt-16 pb-8">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-cta to-teal-links rounded-lg flex items-center justify-center font-syne font-bold text-navy-dark text-xl">
                #
              </div>
              <span className="font-syne font-bold text-xl text-white">HireX</span>
            </div>
            <p className="text-white/60 text-sm font-inter leading-relaxed">
              AI Recruitment Platform by GetHired Global. Transforming hiring with 27 AI Agents.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-syne font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {[
                { label: 'How It Works', to: '/how-it-works' },
                { label: 'Process', to: '/process' },
                { label: 'Pricing', to: '/pricing' },
                { label: 'Customer Stories', to: '/customer-stories' },
                { label: 'Demo', to: '/demo' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 hover:text-teal-links text-sm font-inter transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-syne font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'Team', to: '/team' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'Blog', to: '/blog' },
                { label: 'HR FAQ', to: '/hr-faq' },
                { label: 'Candidates FAQ', to: '/candidates-faq' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 hover:text-teal-links text-sm font-inter transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Offices */}
          <div>
            <h4 className="font-syne font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 mb-6">
              {[
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Terms of Service', to: '/terms-of-service' },
                { label: 'Refund Policy', to: '/refund-policy' },
                { label: 'Security', to: '/security' },
                { label: 'GDPR', to: '/gdpr' },
                { label: 'Cookie Policy', to: '/cookie-policy' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 hover:text-teal-links text-sm font-inter transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Offices */}
        <div className="border-t border-navy-light/30 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-syne font-semibold text-cyan-cta text-sm mb-2">🇮🇳 INDIA OFFICE</h5>
              <p className="text-white/50 text-xs font-inter leading-relaxed">
                International Tech Park Bangalore (ITPB)<br/>
                Block 1B, EPIP Zone, Whitefield Main Road<br/>
                Whitefield, Bengaluru, Karnataka 560066, IN
              </p>
            </div>
            <div>
              <h5 className="font-syne font-semibold text-cyan-cta text-sm mb-2">🇮🇳 ODISHA OFFICE</h5>
              <p className="text-white/50 text-xs font-inter leading-relaxed">
                Srikhetra Bihar, Aiginia, Lane 4<br/>
                Bhubaneswar, Odisha 751019, IN
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="border-t border-navy-light/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/40 text-xs font-inter text-center md:text-left">
            <p>📞 +91 8827647684 | ✉️ support@gethirex.space</p>
            <p className="mt-1">© 2026 HireX by GetHired Global. All rights reserved.</p>
            <p className="mt-1">SOC2 Secure | GDPR/DPDP Compliant | 47K Candidates Screened</p>
          </div>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/showcase/hirexbygethiredglobal/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-cta transition-colors text-sm">
              LinkedIn
            </a>
            <a href="https://youtu.be/oTvA-86ZiM0" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-cta transition-colors text-sm">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
