import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import hirexLogo from "@/assets/hirex-logo.png";

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
        ctx.fillStyle = `hsla(185, 100%, 50%, ${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(185, 100%, 50%, ${0.06 * (1 - dist / 120)})`;
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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0d1033 0%, #1A1F4C 50%, #0d1033 100%)" }}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <img src={hirexLogo} alt="HireX" className="h-16 w-auto mb-10 drop-shadow-[0_0_30px_hsla(185,100%,50%,0.3)]" />

        <h1 className="font-display text-[clamp(36px,6vw,72px)] font-extrabold mb-4 leading-[1.1]">
          The Future of HR is
          <br />
          <span className="grad-text-cyan">Agentic AI.</span>
        </h1>
        <p className="text-hirex-text2 text-lg max-w-[520px] mb-14">
          27 autonomous AI agents that think, collaborate, and execute — replacing entire HR departments with machine intelligence.
        </p>

        {/* Two universe cards */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-[800px]">
          {/* Employer card */}
          <Link
            to="/business"
            className="weave-hover flex-1 glass-card glow-border-cyan rounded-2xl p-8 md:p-10 text-left no-underline group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_hsla(185,100%,50%,0.2)]"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-hirex-cyan/15 flex items-center justify-center text-hirex-cyan text-lg weave-icon">⚡</div>
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan">For Employers</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground group-hover:text-hirex-cyan transition-colors">
              The 27-Agent<br />Synced Workforce
            </h2>
            <p className="text-hirex-text2 text-sm leading-relaxed mb-6">
              Deploy a full AI workforce that automates hiring, onboarding, compliance, and retention — 24/7.
            </p>
            <div className="flex items-center gap-2 text-hirex-cyan text-sm font-semibold group-hover:gap-3 transition-all">
              Enter Employer Universe →
            </div>
          </Link>

          {/* Candidate card */}
          <Link
            to="/candidate"
            className="weave-hover flex-1 glass-card-warm glow-border-teal rounded-2xl p-8 md:p-10 text-left no-underline group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_hsla(175,60%,45%,0.2)]"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-hirex-teal/15 flex items-center justify-center text-hirex-teal text-lg weave-icon">🧑‍💻</div>
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-teal">For Candidates</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground group-hover:text-hirex-teal transition-colors">
              Your 6-Agent<br />Career Pilot Squad
            </h2>
            <p className="text-hirex-text2 text-sm leading-relaxed mb-6">
              Six AI people who revamp your resume, scout jobs, coach interviews, and negotiate offers — for you.
            </p>
            <div className="flex items-center gap-2 text-hirex-teal text-sm font-semibold group-hover:gap-3 transition-all">
              Enter Candidate Universe →
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlatformSwitcher;
