import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const NAVY = "#0A1E3E";
const TEAL = "#00D9FF";

const logos = ["Google", "Microsoft", "Meta", "Amazon", "Accenture"];

const agents = [
  { label: "Sourcing", icon: "🔎" },
  { label: "Screening", icon: "🧪" },
  { label: "Interview", icon: "🎙️" },
  { label: "Culture Fit", icon: "🤝" },
  { label: "Offer", icon: "✉️" },
  { label: "Onboarding", icon: "🚀" },
];

const results = [
  { from: "42", to: "14", unit: "days" },
  { from: "$180K", to: "$24K", unit: "cost" },
  { from: "5", to: "0", unit: "recruiters" },
];

const faqs = [
  { q: "Does this replace human recruiters?", a: "No. HIREXAI replaces the tedious parts (resume screening, scheduling, follow-ups). Your team focuses on closing top candidates." },
  { q: "How accurate is the AI screening?", a: "95% accuracy compared to human screeners. False positive rate: 2%." },
  { q: "What about hiring bias?", a: "All models are audited quarterly for bias. We don't screen based on protected characteristics." },
  { q: "Does it work with our ATS?", a: "Yes. We integrate with Workday, Greenhouse, Ashby, BambooHR, iCIMS. Custom integrations available." },
  { q: "How long does setup take?", a: "1–2 weeks for most companies." },
  { q: "What happens to our candidate data?", a: "Encrypted at rest and in transit. SOC 2 Type II audited annually. Your data, your control." },
];

const PlatformSwitcher = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 90 : 220;
    const clusters = [
      { cx: 0.32, cy: 0.5 },
      { cx: 0.68, cy: 0.5 },
    ];
    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number; cluster: number };
    const particles: P[] = [];
    for (let i = 0; i < count; i++) {
      const c = clusters[i % clusters.length];
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (isMobile ? 120 : 200);
      particles.push({
        x: canvas.width * c.cx + Math.cos(angle) * radius,
        y: canvas.height * c.cy + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
        hue: 190 + Math.random() * 20,
        cluster: i % clusters.length,
      });
    }

    let animId = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        const c = clusters[p.cluster];
        const tx = canvas.width * c.cx;
        const ty = canvas.height * c.cy;
        // gentle pull to cluster centre
        p.vx += (tx - p.x) * 0.00008;
        p.vy += (ty - p.y) * 0.00008;
        p.vx *= 0.995;
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, 0.7)`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1E3E] text-white font-sans">
      {/* HERO */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1E3E]" />

        {/* Top nav */}
        <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
          <div className="text-xl font-bold tracking-tight">HIREXAI</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <Link to="/business" className="hover:text-white">Employers</Link>
            <Link to="/candidate" className="hover:text-white">Candidates</Link>
            <Link to="/colleges" className="hover:text-white">Colleges</Link>
            <Link to="/pricing" className="hover:text-white">Pricing</Link>
          </div>
          <Link to="/contact" className="px-5 py-2 rounded-full bg-white text-[#0A1E3E] text-sm font-semibold hover:bg-[#00D9FF] transition-colors">
            Get Started
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-[calc(100%-140px)]">
          <h1 className="font-bold tracking-tight leading-[1.05] text-[40px] md:text-[64px] max-w-5xl">
            THE FUTURE OF HIRING<br />IS <span style={{ color: TEAL }}>AGENTIC</span>
          </h1>
          <p className="mt-6 text-[22px] md:text-[30px] font-light text-white/70">
            Your Recruiting Team. Replaced.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/demo"
              className="px-8 py-4 rounded-full font-semibold text-[#0A1E3E] transition-transform hover:scale-[1.03]"
              style={{ background: TEAL }}
            >
              See 2-min demo
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full font-semibold border border-white/50 text-white hover:bg-white hover:text-[#0A1E3E] transition-colors"
            >
              Start free trial
            </Link>
          </div>
        </div>

        {/* Floating metrics */}
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4 md:gap-6">
          {[
            { v: "500+", l: "companies" },
            { v: "50K+", l: "hires" },
            { v: "$200M", l: "saved" },
          ].map((m) => (
            <div
              key={m.l}
              className="px-4 py-3 md:px-6 md:py-4 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 text-right min-w-[110px] md:min-w-[150px]"
            >
              <div className="text-xl md:text-3xl font-bold" style={{ color: TEAL }}>{m.v}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mt-1">{m.l}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-[0.4em] text-white/50 animate-pulse">
          SCROLL DOWN
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-white text-[#0A1E3E] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
            {logos.map((l) => (
              <div key={l} className="text-2xl font-semibold tracking-tight text-gray-500">{l}</div>
            ))}
          </div>
          <blockquote className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-[26px] leading-relaxed text-gray-700 font-light">
              "Replaced our 5-person recruiting team. Same output. 1/10th cost."
            </p>
            <footer className="mt-6 text-sm text-gray-500">
              — Sarah Chen, VP Talent Acquisition, Acme Corp
            </footer>
          </blockquote>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#0A1E3E] py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-sm tracking-[0.4em] text-white/50 mb-16">HOW IT WORKS</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-2">
            {agents.map((a, i) => (
              <div key={a.label} className="flex items-center">
                <div className="flex-1 flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#00D9FF]/50 transition-colors">
                  <div className="text-3xl">{a.icon}</div>
                  <div className="text-xs md:text-sm font-medium text-center">{a.label}</div>
                </div>
                {i < agents.length - 1 && (
                  <div className="hidden md:block text-white/30 px-1">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-white text-[#0A1E3E] py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
          {results.map((r) => (
            <div key={r.unit}>
              <div className="text-[56px] md:text-[88px] font-bold leading-none tracking-tight">
                <span className="text-gray-300">{r.from}</span>
                <span className="text-gray-400 mx-2 md:mx-4 text-4xl md:text-6xl align-middle">→</span>
                <span style={{ color: TEAL }}>{r.to}</span>
              </div>
              <div className="mt-6 text-sm uppercase tracking-[0.3em] text-gray-500">{r.unit}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white text-[#0A1E3E] py-28 px-6 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-sm tracking-[0.4em] text-gray-500 mb-16">COMMON QUESTIONS</h2>
          <div className="divide-y divide-gray-200">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="py-6">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between text-left gap-6"
                  >
                    <span className="text-lg md:text-xl font-medium">{f.q}</span>
                    <span className="text-2xl text-gray-400 shrink-0">{open ? "−" : "+"}</span>
                  </button>
                  {open && (
                    <p className="mt-4 text-gray-600 leading-relaxed">{f.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0A1E3E] py-32 px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold">Ready?</h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="px-8 py-4 rounded-full font-semibold text-[#0A1E3E] transition-transform hover:scale-[1.03]"
            style={{ background: TEAL }}
          >
            Start free trial
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 rounded-full font-semibold border border-white/50 text-white hover:bg-white hover:text-[#0A1E3E] transition-colors"
          >
            Schedule investor call
          </Link>
        </div>
        <div className="mt-16 text-xs text-white/40 tracking-widest">
          © {new Date().getFullYear()} HIREXAI · contact@hirexai.space
        </div>
      </section>
    </div>
  );
};

export default PlatformSwitcher;
