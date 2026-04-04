import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LiveFeed from "@/components/LiveFeed";
import AgentNode from "@/components/AgentNode";
import CTAStrip from "@/components/CTAStrip";

const agentModules = [
  { category: "Recruitment & Staffing", icon: "🎯", agents: ["TalentRadar", "ScoreMaster", "InterviewPro", "ResumeParser"] },
  { category: "Talent Acquisition", icon: "🔍", agents: ["JobAmplifier", "ResumeEngine", "OfferCraft"] },
  { category: "Employee Onboarding", icon: "🚀", agents: ["WelcomeBot", "HandbookBuilder", "TrainingCompiler"] },
  { category: "Learning & Development", icon: "📚", agents: ["TrainingPath", "SkillsGap"] },
  { category: "Employee Communication", icon: "💬", agents: ["CommsGen", "Scheduler"] },
  { category: "Salary Administration", icon: "💰", agents: ["CompBenchmark", "SalaryOptimizer"] },
  { category: "Employee Lifecycle", icon: "🔄", agents: ["StayAlert", "ExitAnalyzer", "RetentionAI"] },
  { category: "Performance & Compliance", icon: "📋", agents: ["LawShield", "AuditBot"] },
];

const allAgentIcons = ["🎯", "📊", "🎤", "📄", "📣", "🔎", "✉️", "🤝", "📖", "🎓", "🧠", "📈", "💬", "📅", "💵", "⚖️", "🔄", "📉", "🛡️", "🏷️", "🎪", "📐", "🔧", "⚡", "🌐", "🧩", "🤖"];

const scrollSections = [
  {
    title: "The Sourcing Sync",
    desc: "Watch TalentRadar and ScoreMaster collaborate in real-time to surface hidden talent.",
    feeds: [
      { agent: "AGENT_TALENTRADAR", message: "Found 50 hidden profiles in CV pools. Cross-referencing with LinkedIn data...", delay: 300 },
      { agent: "AGENT_SCOREMASTER", message: "Ranking now... Top 10 identified. Culture fit score: 94%. Forwarding to recruiter.", delay: 1800 },
    ],
    visual: "sourcing",
  },
  {
    title: "The Onboarding Sequence",
    desc: "OfferCraft and WelcomeBot orchestrate a seamless Day-1 experience.",
    feeds: [
      { agent: "AGENT_OFFERCRAFT", message: "Optimizing offer for SDE-2 in Bangalore. Comp benchmark: 85th percentile.", delay: 300 },
      { agent: "AGENT_WELCOMEBOT", message: "Triggering Day 1 WhatsApp welcome. Onboarding docs generated. Slack channels ready.", delay: 1800 },
    ],
    visual: "onboarding",
  },
  {
    title: "The Compliance Shield",
    desc: "LawShield and AuditBot scan regulations across 40+ jurisdictions simultaneously.",
    feeds: [
      { agent: "AGENT_LAWSHIELD", message: "Scanning India labor laws... ESIC compliance verified. PF remittance deadline: 15th.", delay: 300 },
      { agent: "AGENT_AUDITBOT", message: "Audit trail generated. Zero violations detected. Report pushed to CHRO dashboard.", delay: 1800 },
    ],
    visual: "compliance",
  },
];

const BusinessPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionsRef.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* HERO - The Sync */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20" style={{ background: "linear-gradient(180deg, #0d1033 0%, #1A1F4C 40%, #0d1033 100%)" }}>
        {/* Animated grid background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(hsla(185, 100%, 50%, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, hsla(185, 100%, 50%, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }} />
          {/* Glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-hirex-cyan/[0.06]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-primary/[0.08]" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-[900px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase glass-card text-hirex-cyan mb-8">
              <span className="w-2 h-2 rounded-full bg-hirex-cyan animate-pulse" />
              27 Agents • 8 Modules • 1 Synced Workforce
            </div>

            <h1 className="font-display text-[clamp(40px,7vw,82px)] font-extrabold leading-[1.05] mb-6">
              HireX: The 27-Agent
              <br />
              <span className="grad-text-cyan">Synced Workforce</span>
              <br />
              That Runs Your HR.
            </h1>
            <p className="text-hirex-text2 text-lg md:text-xl max-w-[600px] mx-auto mb-10 italic opacity-80">
              While you focus on people.
            </p>

            {/* Agent Grid */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 max-w-[700px] mx-auto">
              {allAgentIcons.map((icon, i) => (
                <AgentNode
                  key={i}
                  name=""
                  icon={icon}
                  active={i % 5 === 0}
                  delay={i * 150}
                  size="sm"
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[15px] no-underline bg-hirex-cyan text-hirex-deep-navy hover:shadow-[0_0_30px_hsla(185,100%,50%,0.4)] hover:-translate-y-0.5 transition-all"
              >
                Start Free Trial →
              </Link>
              <Link
                to="/contact"
                className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[15px] no-underline glass-card text-foreground hover:bg-foreground/10 transition-all"
              >
                Book Enterprise Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Modules Overview */}
      <section className="py-24 relative" style={{ background: "linear-gradient(180deg, #0d1033 0%, #141845 100%)" }}>
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">8 Functional Modules</p>
            <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold">
              27 Agents. <span className="opacity-40">Perfectly Synced.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agentModules.map((mod, i) => (
              <div
                key={mod.category}
                className="glass-card glow-border-cyan rounded-xl p-6 hover:-translate-y-1 transition-all cursor-default group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl mb-4">{mod.icon}</div>
                <h3 className="font-display text-base font-bold mb-3 group-hover:text-hirex-cyan transition-colors">{mod.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {mod.agents.map((agent) => (
                    <span key={agent} className="px-2 py-0.5 rounded text-[10px] font-mono bg-hirex-cyan/10 text-hirex-cyan/70 border border-hirex-cyan/10">
                      {agent}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Dialogue Workflow - Scroll Sections */}
      <section className="relative" style={{ background: "#0d1033" }}>
        <div className="container">
          <div className="text-center pt-24 pb-16">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">Live Agent Collaboration</p>
            <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold">
              Watch Agents <span className="grad-text-cyan">Think Together.</span>
            </h2>
          </div>

          <div className="space-y-8 pb-24">
            {scrollSections.map((section, i) => (
              <div
                key={section.title}
                ref={(el) => { sectionsRef.current[i] = el; }}
                className={`glass-card rounded-2xl p-8 md:p-12 transition-all duration-700 ${
                  activeSection === i ? "glow-border-cyan scale-[1.01]" : "opacity-60"
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left - Visual */}
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase bg-hirex-cyan/10 text-hirex-cyan mb-4">
                      Scroll {i + 1}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">{section.title}</h3>
                    <p className="text-hirex-text2 text-sm leading-relaxed mb-6">{section.desc}</p>

                    {/* Agent avatars */}
                    <div className="flex gap-3 mb-6">
                      {["🎯", "📊"].map((icon, j) => (
                        <div key={j} className="w-14 h-14 rounded-xl glass-card flex items-center justify-center text-2xl animate-pulse-cyan">
                          {icon}
                        </div>
                      ))}
                      <div className="flex items-center">
                        <div className="h-px w-8 bg-hirex-cyan/30" />
                        <div className="w-2 h-2 rounded-full bg-hirex-cyan animate-pulse" />
                        <div className="h-px w-8 bg-hirex-cyan/30" />
                      </div>
                    </div>
                  </div>

                  {/* Right - Live feeds */}
                  <div className="flex-1 space-y-3">
                    {activeSection === i &&
                      section.feeds.map((feed, j) => (
                        <LiveFeed key={j} agent={feed.agent} message={feed.message} delay={feed.delay} />
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ background: "linear-gradient(180deg, #0d1033 0%, #1A1F4C 100%)" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "3×", label: "Faster Hiring Cycles" },
              { val: "95%", label: "Parsing Accuracy" },
              { val: "$409K", label: "Avg Annual Savings" },
              { val: "50+", label: "Active Pilots" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-6 text-center">
                <div className="font-display text-[40px] font-bold text-hirex-cyan">{s.val}</div>
                <div className="text-sm text-hirex-text3 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ICP Section */}
      <section className="py-24" style={{ background: "#0d1033" }}>
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">Built For</p>
            <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold">
              Every Stage. <span className="opacity-40">Every Scale.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "🚀", title: "Startups", tag: "Scale Fast",
                desc: "From founder chaos to 50 hires/month — without building HR teams.",
                items: ["5 Super-Agents to start", "80% HR automation", "50 hires/month", "From $99/month"],
                cta: "Start Free Trial →", to: "/business/pricing", featured: false,
              },
              {
                icon: "🏢", title: "Enterprises", tag: "Global Scale",
                desc: "Global hiring, zero compliance violations, audit-ready by design.",
                items: ["All 27 agents deployed", "Multi-country compliance", "ATS/ERP integrations", "Dedicated success team"],
                cta: "Book Demo →", to: "/contact", featured: true,
              },
              {
                icon: "📈", title: "VCs & Investors", tag: "Strategic Moat",
                desc: "27 proprietary agents + real job data = compounding moat.",
                items: ["$100B+ TAM", "400K+ data advantage", "Market dominance path", "Portfolio-ready infra"],
                cta: "Investor Briefing →", to: "/contact", featured: false,
              },
            ].map((icp) => (
              <div
                key={icp.title}
                className={`glass-card rounded-2xl p-8 transition-all hover:-translate-y-1 ${
                  icp.featured ? "glow-border-cyan border-hirex-cyan/30" : ""
                }`}
              >
                <div className="text-3xl mb-4">{icp.icon}</div>
                <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-hirex-cyan">{icp.tag}</span>
                <h3 className="font-display text-2xl font-bold mt-2 mb-3">{icp.title}</h3>
                <p className="text-hirex-text2 text-sm leading-relaxed mb-5">{icp.desc}</p>
                <ul className="space-y-2 mb-6">
                  {icp.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <span className="text-hirex-cyan">✦</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={icp.to}
                  className={`weave-hover w-full flex justify-center py-3 rounded-xl font-semibold text-sm no-underline transition-all ${
                    icp.featured
                      ? "bg-hirex-cyan text-hirex-deep-navy hover:shadow-[0_0_20px_hsla(185,100%,50%,0.3)]"
                      : "glass-card text-foreground hover:bg-foreground/10"
                  }`}
                >
                  {icp.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative" style={{ background: "linear-gradient(180deg, #0d1033 0%, #1A1F4C 50%, #0d1033 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] bg-hirex-cyan/[0.08]" />
        </div>
        <div className="container relative z-10">
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold mb-5">
            Ready to <span className="grad-text-cyan">Sync Your Workforce?</span>
          </h2>
          <p className="text-hirex-text2 text-lg max-w-[500px] mx-auto mb-10">
            Join 50+ companies automating HR with the world's first 27-agent AI workforce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[15px] no-underline bg-hirex-cyan text-hirex-deep-navy hover:shadow-[0_0_30px_hsla(185,100%,50%,0.4)] transition-all"
            >
              Start Free Trial →
            </Link>
            <Link
              to="/business/pricing"
              className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[15px] no-underline glass-card text-foreground hover:bg-foreground/10 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPage;
