import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const menuSections = [
  {
    title: 'PRODUCT',
    links: [
      { label: 'How It Works', to: '/how-it-works' },
      { label: 'Process', to: '/process' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Customer Stories', to: '/customer-stories' },
      { label: 'Demo', to: '/demo' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'Team', to: '/team' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'HR FAQ', to: '/hr-faq' },
      { label: 'Candidates FAQ', to: '/candidates-faq' },
      { label: 'General FAQ', to: '/faq' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms of Service', to: '/terms-of-service' },
      { label: 'Refund Policy', to: '/refund-policy' },
      { label: 'Security SOC2', to: '/security' },
      { label: 'GDPR', to: '/gdpr' },
      { label: 'Cookie Policy', to: '/cookie-policy' },
    ],
  },
];

const HamburgerDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-[100] w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-navy-primary/80 backdrop-blur-xl border border-navy-light/40 hover:border-cyan-cta/40 transition-all group"
        aria-label="Menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="block w-6 h-0.5 bg-cyan-cta transition-colors"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block w-6 h-0.5 bg-cyan-cta"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="block w-6 h-0.5 bg-cyan-cta"
        />
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-[95] w-full max-w-md h-full bg-navy-dark/95 backdrop-blur-2xl border-l border-navy-light/30 overflow-y-auto"
            >
              <div className="pt-20 pb-8 px-8">
                {menuSections.map((section, sIdx) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sIdx * 0.08 }}
                    className="mb-8"
                  >
                    <h3 className="font-syne text-xs font-bold text-cyan-cta/60 tracking-widest mb-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-1">
                      {section.links.map((link, lIdx) => (
                        <motion.li
                          key={link.to}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: sIdx * 0.08 + lIdx * 0.04 }}
                        >
                          <Link
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className="block py-2 px-3 text-white/80 hover:text-gold-accent font-inter text-base rounded-lg hover:bg-white/5 transition-all hover:shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                          >
                            {link.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 pt-6 border-t border-navy-light/30"
                >
                  <Link
                    to="/demo"
                    onClick={() => setIsOpen(false)}
                    className="btn-cta w-full text-center block"
                  >
                    Book Demo
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerDrawer;
