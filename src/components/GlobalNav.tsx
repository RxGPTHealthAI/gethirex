import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import hirexLogo from "@/assets/hirex-logo.png";

const GlobalNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isBusiness = location.pathname.startsWith("/business");
  const isCandidate = location.pathname.startsWith("/candidate");
  const universe = isBusiness ? "business" : isCandidate ? "candidate" : null;

  const businessLinks = [
    { label: "Overview", to: "/business" },
    { label: "Super-Agents", to: "/agents" },
    { label: "Pricing", to: "/business/pricing" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ];

  const candidateLinks = [
    { label: "Overview", to: "/candidate" },
    { label: "AI Squad", to: "/candidate#squad" },
    { label: "Pricing", to: "/candidate/pricing" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ];

  const links = isBusiness ? businessLinks : isCandidate ? candidateLinks : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8">
      <div className="container flex items-center justify-between h-[72px]">
        <Link to="/" className="flex items-center gap-2.5 no-underline shrink-0">
          <img src={hirexLogo} alt="HireX" className="h-8 w-auto" />
        </Link>

        {universe && (
          <div className="hidden md:flex items-center gap-1 glass-card rounded-full px-1.5 py-1.5">
            <Link
              to="/business"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide no-underline transition-all ${
                isBusiness
                  ? "bg-hirex-cyan/20 text-hirex-cyan"
                  : "text-hirex-text3 hover:text-foreground"
              }`}
            >
              For Employers
            </Link>
            <Link
              to="/candidate"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide no-underline transition-all ${
                isCandidate
                  ? "bg-hirex-teal/20 text-hirex-teal"
                  : "text-hirex-text3 hover:text-foreground"
              }`}
            >
              For Candidates
            </Link>
          </div>
        )}

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all no-underline ${
                location.pathname === l.to
                  ? "text-foreground bg-foreground/10"
                  : "text-hirex-text2 hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {!universe && (
            <>
              <Link to="/business" className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-hirex-text2 hover:text-foreground no-underline transition-all">
                For Employers
              </Link>
              <Link to="/candidate" className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-hirex-text2 hover:text-foreground no-underline transition-all">
                For Candidates
              </Link>
            </>
          )}
          <Link
            to="/contact"
            className="weave-hover ml-2 inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold no-underline text-foreground border border-hirex-cyan/30 hover:shadow-[0_0_20px_hsla(202,72%,59%,0.2)] transition-all"
            style={{ background: "#4AB8E6" }}
          >
            Get Started →
          </Link>
        </div>

        <button className="md:hidden text-hirex-text2" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-card rounded-xl mx-2 mb-2 p-4 flex flex-col gap-1 animate-fade-in">
          {universe && (
            <div className="flex gap-2 mb-3 pb-3 border-b border-foreground/10">
              <Link to="/business" onClick={() => setOpen(false)} className={`flex-1 text-center px-3 py-2 rounded-lg text-xs font-semibold no-underline ${isBusiness ? "bg-hirex-cyan/20 text-hirex-cyan" : "text-hirex-text3"}`}>
                Employers
              </Link>
              <Link to="/candidate" onClick={() => setOpen(false)} className={`flex-1 text-center px-3 py-2 rounded-lg text-xs font-semibold no-underline ${isCandidate ? "bg-hirex-teal/20 text-hirex-teal" : "text-hirex-text3"}`}>
                Candidates
              </Link>
            </div>
          )}
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2.5 px-3 text-hirex-text2 text-[14px] no-underline hover:text-foreground rounded-lg hover:bg-foreground/5">
              {l.label}
            </Link>
          ))}
          {!universe && (
            <>
              <Link to="/business" onClick={() => setOpen(false)} className="py-2.5 px-3 text-hirex-text2 text-[14px] no-underline hover:text-foreground">For Employers</Link>
              <Link to="/candidate" onClick={() => setOpen(false)} className="py-2.5 px-3 text-hirex-text2 text-[14px] no-underline hover:text-foreground">For Candidates</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default GlobalNav;
