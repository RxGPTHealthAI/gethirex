import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LiveFeed from "@/components/LiveFeed";
import AgentNode from "@/components/AgentNode";

const agentModules = [
  { category: "Candidate Sourcing", icon: "🎯", agents: ["TalentScout", "JobAmplify", "GlobalReach"] },
  { category: "Screening & Qualification", icon: "📋", agents: ["ResumeIQ", "CandidateRank", "FastTrack"] },
  { category: "Interview Coordination", icon: "🎤", agents: ["InterviewPro", "HireX Orchestrator"] },
];

const allAgents = [
  { name: "TalentScout", icon: "🎯" },
  { name: "CandidateRank", icon: "📊" },
  { name: "InterviewPro", icon: "🎤" },
  { name: "ResumeIQ", icon: "📄" },
  { name: "JobAmplify", icon: "📣" },
  { name: "FastTrack", icon: "⚡" },
  { name: "GlobalReach", icon: "🌐" },
  { name: "HireX Orchestrator", icon: "🤖" },
];

const scrollSections = [
  {
    title: "Candidate Discovery",
    desc: "TalentScout and CandidateRank identify and rank qualified candidates automatically.",
    feeds: [
      { agent: "AGENT_TALENTSCOUT", message: "Sourced 240 qualified candidates across LinkedIn, Naukri, and internal CV pools.", delay: 300 },
      { agent: "AGENT_CANDIDATERANK", message: "Ranked top 25 by skills + experience fit. Forwarding shortlist to recruiter.", delay: 1800 },
    ],
    icons: ["🎯", "📊"],
  },
  {
    title: "AI Screening",
    desc: "ResumeIQ analyzes applications and surfaces the strongest matches.",
    feeds: [
      { agent: "AGENT_RESUMEIQ", message: "Parsed 1,200 resumes. Filtered out 73% irrelevant applications in under 2 minutes.", delay: 300 },
      { agent: "AGENT_FASTTRACK", message: "Shortlist generated. Top 18 matches ready for interview coordination.", delay: 1800 },
    ],
    icons: ["📄", "⚡"],
  },
  {
    title: "Interview Coordination",
    desc: "InterviewPro schedules interviews and keeps candidates engaged throughout the process.",
    feeds: [
      { agent: "AGENT_INTERVIEWPRO", message: "Scheduled 18 interviews across 3 timezones. Calendar invites + reminders sent.", delay: 300 },
      { agent: "AGENT_ORCHESTRATOR", message: "Pipeline synced. Hiring manager dashboard updated with real-time candidate status.", delay: 1800 },
    ],
    icons: ["🎤", "🤖"],
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
    sectionsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 40%, #0F1425 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(hsla(202, 72%, 59%, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, hsla(202, 72%, 59%, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }} />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-hirex-cyan/[0.06]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-primary/[0.08]" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-[900px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase glass-card text-hirex-cyan mb-8">
              <span className="w-2 h-2 rounded-full bg-hirex-cyan animate-pulse" />
              AI-Powered Recruitment Platform
            </div>

            <h1 className="font-display text-[clamp(40px,7vw,64px)] font-bold leading-[1.1] mb-6">
              Hire Faster. Hire Better.
              <br />
              <span className="grad-text-cyan">No Fake Applicants.</span>
            </h1>
            <p className="text-hirex-text2 text-lg md:text-xl max-w-[680px] mx-auto mb-10 opacity-90">
              Autonomous recruiting agents that source, screen, shortlist, and coordinate interviews — helping your team hire top talent faster.
            </p>

            {/* Agent Grid */}
            <div className="mb-14">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-hirex-cyan/60 mb-6">
                MEET YOUR AI RECRUITMENT TEAM
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-[680px] mx-auto">
                {allAgents.map((agent, i) => (
                  <AgentNode
                    key={agent.name}
                    name={agent.name}
                    icon={agent.icon}
                    active={i % 3 === 0}
                    delay={i * 120}
                    size="sm"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline text-foreground transition-all hover:-translate-y-0.5"
                style={{ background: "#4AB8E6" }}
              >
                Start Hiring →
              </Link>
              <Link
                to="/contact"
                className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline glass-card text-foreground hover:bg-foreground/10 transition-all"
              >
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment Modules */}
      <section className="py-24 relative" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">Recruitment Modules</p>
            <h2 className="font-display text-[clamp(32px,5vw,36px)] font-semibold">
              Built for Hiring. <span className="opacity-40">End to End.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentModules.map((mod, i) => (
              <div
                key={mod.category}
                className="glass-card glow-border-cyan rounded-xl p-6 hover:-translate-y-1 transition-all cursor-default group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl mb-4">{mod.icon}</div>
                <h3 className="text-base font-semibold mb-3 group-hover:text-hirex-cyan transition-colors">{mod.category}</h3>
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

      {/* Agent Dialogue Workflow */}
      <section className="relative" style={{ background: "#0F1425" }}>
        <div className="container">
          <div className="text-center pt-24 pb-16">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">Live Recruiting Workflow</p>
            <h2 className="font-display text-[clamp(32px,5vw,36px)] font-semibold">
              Watch HireX <span className="grad-text-cyan">Recruit.</span>
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
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase bg-hirex-cyan/10 text-hirex-cyan mb-4">
                      Step {i + 1}
                    </div>
                    <h3 className="text-2xl md:text-[28px] font-medium mb-3">{section.title}</h3>
                    <p className="text-hirex-text2 text-sm leading-relaxed mb-6">{section.desc}</p>
                    <div className="flex gap-3 mb-6">
                      {section.icons.map((icon, j) => (
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
      <section className="py-20" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "3×", label: "Faster Hiring" },
              { val: "73%", label: "Fewer Irrelevant Applications" },
              { val: "14 hrs", label: "Saved Per Hire" },
              { val: "50+", label: "Hiring Partners" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-6 text-center">
                <div className="text-[40px] font-bold text-hirex-cyan">{s.val}</div>
                <div className="text-sm text-hirex-text3 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ICP Section */}
      <section className="py-24" style={{ background: "#0F1425" }}>
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">Built For</p>
            <h2 className="font-display text-[clamp(32px,5vw,36px)] font-semibold">
              Built For <span className="opacity-40">Modern Hiring Teams.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "🚀", title: "Startups", tag: "Hire Fast",
                desc: "Make your first 50 hires faster without building a large recruiting team.",
                items: ["AI sourcing", "Automated screening", "Faster shortlists", "From $99/month"],
                cta: "Start Hiring →", to: "/contact", featured: false,
              },
              {
                icon: "🏢", title: "Growth & Enterprise", tag: "Volume Hiring",
                desc: "Handle high-volume recruitment with consistency and speed.",
                items: ["Bulk hiring", "Interview automation", "Hiring analytics", "ATS integrations"],
                cta: "Book Demo →", to: "/contact", featured: true,
              },
              {
                icon: "🎓", title: "Campus & Volume Hiring", tag: "Scale Hiring",
                desc: "Recruit hundreds of candidates efficiently.",
                items: ["Campus hiring", "Graduate recruitment", "Large-scale screening", "Automated ranking"],
                cta: "Talk to Us →", to: "/contact", featured: false,
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
                <h3 className="text-2xl font-medium mt-2 mb-3">{icp.title}</h3>
                <p className="text-hirex-text2 text-sm leading-relaxed mb-5">{icp.desc}</p>
                <ul className="space-y-2 mb-6">
                  {icp.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <span className="text-hirex-cyan">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={icp.to}
                  className={`weave-hover w-full flex justify-center py-3 rounded-xl font-semibold text-sm no-underline transition-all ${
                    icp.featured
                      ? "text-foreground hover:shadow-[0_0_20px_hsla(202,72%,59%,0.3)]"
                      : "glass-card text-foreground hover:bg-foreground/10"
                  }`}
                  style={icp.featured ? { background: "#4AB8E6" } : {}}
                >
                  {icp.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center relative" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 50%, #0F1425 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] bg-hirex-cyan/[0.08]" />
        </div>
        <div className="container relative z-10">
          <h2 className="text-[clamp(32px,5vw,36px)] font-semibold mb-5">
            Ready To <span className="grad-text-cyan">Hire Better Talent Faster?</span>
          </h2>
          <p className="text-hirex-text2 text-lg max-w-[560px] mx-auto mb-10">
            Source. Screen. Shortlist. Hire. All from one AI-powered recruitment platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline text-foreground transition-all"
              style={{ background: "#4AB8E6" }}
            >
              Start Hiring →
            </Link>
            <Link
              to="/contact"
              className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline glass-card text-foreground hover:bg-foreground/10 transition-all"
            >
              Book Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPage;
