import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Super-Agents", to: "/agents" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 bg-background/85 backdrop-blur-xl border-b border-border">
      <div className="container flex items-center justify-between h-[68px]">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg">✦</div>
          <span className="font-display font-extrabold text-[22px] text-foreground">HireX</span>
        </Link>
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-all no-underline ${
                location.pathname === l.to
                  ? "text-foreground bg-hirex-surface"
                  : "text-hirex-text2 hover:text-foreground hover:bg-hirex-surface"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[10px] bg-primary text-primary-foreground text-sm font-semibold no-underline hover:bg-primary-light hover:-translate-y-px transition-all hover:shadow-[0_8px_24px_rgba(91,110,245,0.35)]"
        >
          Start Free Trial →
        </Link>
        <button className="md:hidden text-hirex-text2" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden container flex flex-col pb-4 border-t border-border animate-fade-in">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-3 text-hirex-text2 text-[15px] no-underline hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
