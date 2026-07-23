import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import hirexLogo from "@/assets/hirexai-horizontal-white.png";

const PlatformSwitcher = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(202, 72%, 59%, ${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(202, 72%, 59%, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 50%, #0F1425 100%)" }}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <img src={hirexLogo} alt="HIREXAI" className="h-16 w-auto mb-10 drop-shadow-[0_0_30px_hsla(202,72%,59%,0.3)]" />

        <h1 className="text-[clamp(36px,6vw,64px)] font-bold mb-4 leading-[1.1]">
          Hire Great Talent.
          <br />
          <span className="grad-text-cyan">Faster.</span>
        </h1>
        <p className="text-hirex-text2 text-lg max-w-[620px] mb-4">
          AI-powered hiring for companies. AI-powered career growth for candidates.
        </p>
        <p className="text-hirex-text3 text-base max-w-[680px] mb-14">
          HireX helps companies find, screen, and hire the right people faster — while helping candidates discover better opportunities and get hired.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1200px]">
          {/* Employer card */}
          <Link
            to="/business"
            className="weave-hover glass-card glow-border-cyan rounded-2xl p-7 md:p-8 text-left no-underline group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_hsla(202,72%,59%,0.2)]"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-hirex-cyan/15 flex items-center justify-center text-hirex-cyan text-lg weave-icon">⚡</div>
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan">For Employers</span>
            </div>
            <h2 className="text-2xl md:text-[26px] font-bold mb-3 text-foreground group-hover:text-hirex-cyan transition-colors">
              Hire Better.<br />Hire Faster.
            </h2>
            <p className="text-hirex-text2 text-sm leading-relaxed mb-5">
              Stop spending hours screening resumes and coordinating interviews. HIREXAI helps you:
            </p>
            <ul className="flex flex-col gap-2 mb-5 text-sm text-hirex-text2">
              {["Find qualified candidates","Screen applicants automatically","Shortlist the best talent","Schedule interviews faster","Hire at scale"].map((i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-hirex-cyan font-bold">✓</span>{i}</li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-hirex-cyan text-sm font-semibold group-hover:gap-3 transition-all">
              Enter Employer Platform →
            </div>
          </Link>

          {/* Candidate card */}
          <Link
            to="/candidate"
            className="weave-hover glass-card-warm glow-border-teal rounded-2xl p-7 md:p-8 text-left no-underline group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_hsla(168,55%,63%,0.2)]"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-hirex-teal/15 flex items-center justify-center text-hirex-teal text-lg weave-icon">🧑‍💻</div>
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-teal">For Candidates</span>
            </div>
            <h2 className="text-2xl md:text-[26px] font-bold mb-3 text-foreground group-hover:text-hirex-teal transition-colors">
              Get Hired<br />Smarter.
            </h2>
            <p className="text-hirex-text2 text-sm leading-relaxed mb-5">
              Stand out to employers, improve your profile, prepare for interviews, and discover opportunities that match your skills. HIREXAI helps you:
            </p>
            <ul className="flex flex-col gap-2 mb-5 text-sm text-hirex-text2">
              {["Improve your resume","Prepare for interviews","Showcase your skills","Get discovered by employers","Access better opportunities"].map((i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-hirex-teal font-bold">✓</span>{i}</li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-hirex-teal text-sm font-semibold group-hover:gap-3 transition-all">
              Enter Candidate Platform →
            </div>
          </Link>

          {/* Colleges card - HIGHLIGHTED */}
          <Link
            to="/colleges"
            className="weave-hover relative glass-card glow-border-cyan rounded-2xl p-7 md:p-8 text-left no-underline group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_hsla(202,72%,59%,0.3)]"
            style={{ background: "linear-gradient(160deg, hsla(202,72%,59%,0.08), hsla(280,60%,60%,0.05))" }}
          >
            <div className="absolute -top-3 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase text-foreground shadow-[0_0_20px_hsla(202,72%,59%,0.5)]" style={{ background: "linear-gradient(90deg,#4AB8E6,#8b5cf6)" }}>
              ★ New
            </div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-hirex-cyan/15 flex items-center justify-center text-hirex-cyan text-lg weave-icon">🎓</div>
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan">For Colleges</span>
            </div>
            <h2 className="text-2xl md:text-[26px] font-bold mb-3 text-foreground group-hover:text-hirex-cyan transition-colors">
              From Second Year<br />To First Job.
            </h2>
            <p className="text-hirex-text2 text-sm leading-relaxed mb-5">
              Prepare students for AI-first careers from year 2 onwards. HIREXAI helps colleges deliver:
            </p>
            <ul className="flex flex-col gap-2 mb-5 text-sm text-hirex-text2">
              {["Placement Readiness Score™","AI Upskilling & Career GPS™","Industry Projects & Internships","Remote & Global Opportunities","Higher Placement Rates"].map((i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-hirex-cyan font-bold">✓</span>{i}</li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-hirex-cyan text-sm font-semibold group-hover:gap-3 transition-all">
              Enter Colleges Platform →
            </div>
          </Link>
        </div>

        {/* Demo Videos */}
        <div className="w-full max-w-6xl mt-16">
          <p className="text-center text-xs font-bold tracking-[0.15em] uppercase text-hirex-text3 mb-6">See HireX in Action</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: "oTvA-86ZiM0", title: "Finding Qualified Candidates", label: "Finding Qualified Candidates", accent: "cyan" as const },
              { id: "ubFnv2H2LVE", title: "AI-Powered Candidate Screening", label: "AI-Powered Candidate Screening", accent: "teal" as const },
              { id: "dKeWLSqNOtQ", title: "Faster Hiring Workflows", label: "Faster Hiring Workflows", accent: "cyan" as const },
            ].map((v) => (
              <div key={v.id} className="group">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className={`text-xs font-bold tracking-[0.15em] uppercase ${v.accent === "cyan" ? "text-hirex-cyan" : "text-hirex-teal"}`}>{v.label}</span>
                  <span className="text-[10px] text-hirex-text3 tracking-widest">▶ Watch Demo</span>
                </div>
                <div className={`rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(91,110,245,0.15)] transition-all group-hover:-translate-y-1 ${v.accent === "cyan" ? "group-hover:border-hirex-cyan/40 group-hover:shadow-[0_20px_60px_rgba(91,110,245,0.3)]" : "group-hover:border-hirex-teal/40 group-hover:shadow-[0_20px_60px_rgba(91,110,245,0.3)]"}`}>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${v.id}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted By */}
        <div className="w-full max-w-4xl mt-20 text-center">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-text3 mb-4">Trusted By Teams Hiring For</p>
          <p className="text-hirex-text2 text-base md:text-lg">
            Engineering <span className="text-hirex-cyan mx-2">•</span> AI &amp; Data <span className="text-hirex-cyan mx-2">•</span> Sales <span className="text-hirex-cyan mx-2">•</span> Marketing <span className="text-hirex-cyan mx-2">•</span> Operations
          </p>
        </div>

        {/* Outcomes */}
        <div className="w-full max-w-5xl mt-20 mb-10">
          <h2 className="text-center text-[clamp(28px,4vw,44px)] font-bold mb-10">
            One Platform. <span className="grad-text-cyan">Better Hiring Outcomes.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-8 text-left">
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan">For Employers</span>
              <p className="text-foreground text-lg font-semibold mt-3">Find and hire great talent faster.</p>
            </div>
            <div className="glass-card-warm rounded-2xl p-8 text-left">
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-teal">For Candidates</span>
              <p className="text-foreground text-lg font-semibold mt-3">Discover opportunities and grow your career.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlatformSwitcher;
