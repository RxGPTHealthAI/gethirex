import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LiveFeed from "@/components/LiveFeed";

const aiPeople = [
  { name: "ResumeReviver", role: "The Sleek Designer", icon: "🎨", desc: "Transforms messy resumes into ATS-optimized masterpieces in seconds." },
  { name: "JobScout", role: "The Keen-Eyed Scout", icon: "🔭", desc: "Scans 500+ job boards to find roles that match your exact skill profile." },
  { name: "CodeCoach", role: "The Technical Wizard", icon: "🧙", desc: "Drills you on DSA, system design, and coding challenges with instant feedback." },
  { name: "InterviewPro", role: "The Confidence Builder", icon: "🎤", desc: "Conducts mock interviews with real-time confidence scoring and keyword analysis." },
  { name: "CareerPilot", role: "The Strategy Lead", icon: "✈️", desc: "Coordinates all agents and builds your personalized career roadmap." },
  { name: "OfferNinja", role: "The Negotiation Expert", icon: "🥷", desc: "Analyzes market compensation data and coaches you through offer negotiations." },
];

const simulations = [
  {
    title: "Resume Transformation",
    desc: "Upload a messy resume → ResumeReviver redesigns it in 0.5 seconds.",
    feeds: [
      { agent: "RESUME_REVIVER", message: "Analyzing resume structure... Found 8 formatting issues, 3 keyword gaps.", delay: 300 },
      { agent: "RESUME_REVIVER", message: "ATS score improved: 42% → 96%. Added 12 role-specific keywords. Ready for download.", delay: 2000 },
    ],
  },
  {
    title: "Interview Practice",
    desc: "InterviewPro provides live confidence metrics and keyword tracking.",
    feeds: [
      { agent: "INTERVIEW_PRO", message: "Mock interview started. Role: Senior Frontend Engineer @ Google. Confidence baseline: recording...", delay: 300 },
      { agent: "INTERVIEW_PRO", message: "Answer analysis: Strong technical depth. Confidence: 87%. Keyword coverage: 12/15. Suggestion: mention system design experience.", delay: 2000 },
    ],
  },
  {
    title: "Job Discovery",
    desc: "JobScout and CareerPilot find hidden opportunities across 500+ platforms.",
    feeds: [
      { agent: "JOB_SCOUT", message: "Scanning 523 job boards... Found 47 matches. Filtering for remote + high-pay...", delay: 300 },
      { agent: "CAREER_PILOT", message: "12 High-Pay Remote roles identified. ResumeReviver is customizing your profile for top 5. Apply queue ready.", delay: 2000 },
    ],
  },
];

const CandidatePage = () => {
  const [activeSim, setActiveSim] = useState(0);
  const simRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = simRef.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveSim(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    simRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* HERO - The Squad */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 40%, #0F1425 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] bg-hirex-teal/[0.08]" />
          <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] bg-hirex-orange/[0.05]" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-[900px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase glass-card-warm text-hirex-teal mb-8">
              <span className="w-2 h-2 rounded-full bg-hirex-teal animate-pulse" />
              6 AI People • Your Personal Career Squad
            </div>

            <h1 className="text-[clamp(40px,7vw,64px)] font-bold leading-[1.1] mb-6">
              Your 6-Agent
              <br />
              <span className="bg-gradient-to-r from-hirex-teal to-hirex-orange bg-clip-text text-transparent">Career Pilot Squad.</span>
            </h1>
            <p className="text-hirex-text2 text-lg md:text-xl max-w-[580px] mx-auto mb-12">
              Six AI people who think, collaborate, and hustle — so you land your dream job without the grind.
            </p>

            {/* Squad chat bubble */}
            <div className="glass-card-warm glow-border-teal rounded-2xl p-6 max-w-[600px] mx-auto mb-12 text-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-hirex-teal animate-pulse" />
                <span className="text-xs font-mono text-hirex-teal">LIVE AGENT CHAT</span>
              </div>
              <LiveFeed
                agent="CAREER_PILOT"
                message="We've found 12 High-Pay Remote roles. ResumeReviver is updating your profile for the top 5."
                delay={500}
                color="teal"
              />
            </div>

            {/* 6 AI People Grid — THE KEY VISUAL */}
            <div className="mb-14">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-hirex-teal/60 mb-6">
                YOUR 6 AI PEOPLE — CAREER PILOT SQUAD
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[700px] mx-auto">
                {aiPeople.map((person, i) => (
                  <div
                    key={person.name}
                    className="glass-card-warm glow-border-teal rounded-xl p-5 text-left hover:-translate-y-1 transition-all cursor-default group"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-hirex-teal/15 flex items-center justify-center text-2xl" style={{ animation: `floatNode 3s ease-in-out ${i * 200}ms infinite` }}>
                        {person.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold group-hover:text-hirex-teal transition-colors">{person.name}</div>
                        <div className="text-[10px] text-hirex-teal/70 font-medium">{person.role}</div>
                      </div>
                    </div>
                    <p className="text-[12px] text-hirex-text3 leading-relaxed">{person.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline text-foreground hover:-translate-y-0.5 transition-all"
                style={{ background: "#68D5C1" }}
              >
                Activate Your Squad →
              </Link>
              <Link
                to="/candidate/pricing"
                className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline glass-card-warm text-foreground hover:bg-foreground/10 transition-all"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI People Workflow - Live Simulations */}
      <section id="squad" className="relative" style={{ background: "#0F1425" }}>
        <div className="container">
          <div className="text-center pt-24 pb-16">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-teal mb-4">Live AI Simulations</p>
            <h2 className="text-[clamp(32px,5vw,36px)] font-semibold">
              Your Squad <span className="bg-gradient-to-r from-hirex-teal to-hirex-orange bg-clip-text text-transparent">In Action.</span>
            </h2>
          </div>

          <div className="space-y-8 pb-24">
            {simulations.map((sim, i) => (
              <div
                key={sim.title}
                ref={(el) => { simRef.current[i] = el; }}
                className={`glass-card-warm rounded-2xl p-8 md:p-12 transition-all duration-700 ${
                  activeSim === i ? "glow-border-teal scale-[1.01]" : "opacity-60"
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-hirex-teal">Simulation {i + 1}</span>
                    <h3 className="text-2xl md:text-[28px] font-medium mt-2 mb-3">{sim.title}</h3>
                    <p className="text-hirex-text2 text-sm leading-relaxed">{sim.desc}</p>
                  </div>
                  <div className="flex-1 space-y-3">
                    {activeSim === i &&
                      sim.feeds.map((feed, j) => (
                        <LiveFeed key={j} agent={feed.agent} message={feed.message} delay={feed.delay} color="teal" />
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(32px,5vw,36px)] font-semibold">
              3 Steps. <span className="opacity-40">Dream Job.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
            {[
              { step: "01", title: "Upload & Connect", desc: "Upload your resume and connect your job preferences. Your squad activates instantly." },
              { step: "02", title: "Agents Collaborate", desc: "Six AI people work together — optimizing, scouting, coaching, and strategizing in real-time." },
              { step: "03", title: "Land Your Dream Job", desc: "Walk into interviews over-prepared. Negotiate with data. Get hired at top companies." },
            ].map((s) => (
              <div key={s.step} className="glass-card-warm rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-hirex-teal/30 mb-4">{s.step}</div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-hirex-text3 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center" style={{ background: "linear-gradient(180deg, #1C2351 0%, #0F1425 100%)" }}>
        <div className="container relative z-10">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] bg-hirex-teal/[0.08]" />
          </div>
          <h2 className="text-[clamp(32px,5vw,36px)] font-semibold mb-5 relative z-10">
            Your Squad is <span className="bg-gradient-to-r from-hirex-teal to-hirex-orange bg-clip-text text-transparent">Ready.</span>
          </h2>
          <p className="text-hirex-text2 text-lg max-w-[500px] mx-auto mb-10 relative z-10">
            Stop grinding alone. Let six AI people turbocharge your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              to="/contact"
              className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline text-foreground transition-all"
              style={{ background: "#68D5C1" }}
            >
              Activate Your Squad →
            </Link>
            <Link
              to="/candidate/pricing"
              className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline glass-card-warm text-foreground hover:bg-foreground/10 transition-all"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CandidatePage;
