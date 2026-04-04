import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const menuGroups = [
  {
    label: "PRODUCT",
    links: [
      { label: "How It Works", to: "/how-it-works" },
      { label: "Pricing", to: "/pricing" },
      { label: "Demo", to: "/demo" },
      { label: "Process", to: "/process" },
      { label: "Integrations", to: "/integrations" },
    ],
  },
  {
    label: "COMPANY",
    links: [
      { label: "Customer Stories", to: "/customer-stories" },
      { label: "Team", to: "/team" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    label: "FAQ",
    links: [
      { label: "HR FAQ", to: "/hr-faq" },
      { label: "Candidates FAQ", to: "/candidates-faq" },
    ],
  },
  {
    label: "LEGAL",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Refund Policy", to: "/refund" },
      { label: "Security (SOC2)", to: "/security" },
      { label: "Cookie Policy", to: "/cookies" },
      { label: "GDPR", to: "/gdpr" },
    ],
  },
];

const HamburgerDrawer = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger Button — fixed top-right */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-5 right-5 z-[60] w-11 h-11 flex items-center justify-center rounded-xl bg-hirex-navy/80 backdrop-blur-md border border-hirex-border2/50 hover:border-hirex-cyan/40 transition-all duration-300 group"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <div className="relative w-5 h-4 flex flex-col justify-between">
          <span
            className={`block h-[2px] w-full bg-foreground rounded-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] origin-center ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-full bg-foreground rounded-full transition-all duration-300 ease-[cubic-bezier(0.77,0,0.18,1)] ${
              open ? "opacity-0 scale-x-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[2px] w-full bg-foreground rounded-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] origin-center ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[58] h-full w-[380px] max-w-[90vw] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto bg-hirex-navy/40 backdrop-blur-[40px] border-l border-hirex-cyan/10 shadow-[0_0_80px_rgba(74,184,230,0.08)]">
          {/* Header */}
          <div className="pt-20 px-8 pb-4">
            <div className="h-px bg-gradient-to-r from-hirex-cyan/40 via-hirex-cyan/10 to-transparent" />
          </div>

          {/* Menu Groups */}
          <nav className="px-8 pb-12 space-y-8">
            {menuGroups.map((group, gi) => (
              <div key={group.label}>
                <h3
                  className="text-[11px] font-bold tracking-[0.2em] text-hirex-cyan/70 mb-3 uppercase"
                  style={{
                    animationDelay: `${gi * 80}ms`,
                    animation: open
                      ? `drawerGroupIn 0.6s cubic-bezier(0.77,0,0.18,1) ${gi * 80}ms both`
                      : "none",
                  }}
                >
                  {group.label}
                </h3>
                <div className="space-y-0.5">
                  {group.links.map((link, li) => {
                    const isActive = location.pathname === link.to;
                    const delay = gi * 80 + (li + 1) * 50;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setOpen(false)}
                        className={`block py-2.5 px-3 rounded-lg text-[14px] font-medium no-underline transition-all duration-300 group/link ${
                          isActive
                            ? "text-hirex-cyan bg-hirex-cyan/10"
                            : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                        }`}
                        style={{
                          animation: open
                            ? `drawerItemIn 0.5s cubic-bezier(0.77,0,0.18,1) ${delay}ms both`
                            : "none",
                        }}
                      >
                        <span className="relative inline-block">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-hirex-cyan/60 transition-all duration-300 group-hover/link:w-full" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom glow */}
          <div className="px-8 pb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-hirex-cyan/20 to-transparent" />
            <p className="text-[11px] text-hirex-text3 mt-4 text-center">
              © 2026 HireX by GetHired Global
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerDrawer;
