import { useState } from "react";
import { Link } from "react-router-dom";
import CTAStrip from "@/components/CTAStrip";

const tiers = [
  {
    num: "TIER 1", name: "Recruitment Supers", desc: "Find, evaluate, and convert the right talent—fast.",
    agents: [
      { name: "HIREX TalentRadar", desc: "Surfaces high-fit candidates hidden in large CV pools using semantic search." },
      { name: "HIREX ScoreMaster", desc: "Objectively ranks candidates using multi-factor, bias-free scoring." },
      { name: "HIREX EmailBlitz", desc: "Automates high-response candidate communication at scale." },
      { name: "HIREX InterviewPro", desc: "Generates role-specific, bias-aware interview frameworks." },
      { name: "HIREX VideoGenix", desc: "Analyzes recorded interviews for signal, not noise." },
      { name: "HIREX RefCheckr", desc: "Automates reference validation and trust scoring." },
    ],
  },
  {
    num: "TIER 2", name: "Onboarding & Compliance Supers", desc: "Turn offers into Day-1-ready employees—without legal risk.",
    agents: [
      { name: "HIREX OfferCraft", desc: "Creates optimized, close-ready offer letters with compensation benchmarks." },
      { name: "HIREX PayGuard", desc: "Benchmarks compensation using real market data." },
      { name: "HIREX ContractPro", desc: "Generates compliant employment contracts automatically." },
      { name: "HIREX LawShield", desc: "Flags legal, labor, and regulatory risks across jurisdictions." },
      { name: "HIREX BackCheck", desc: "Automates background and identity verification." },
      { name: "HIREX NDAWizard", desc: "Instantly issues role-specific NDAs." },
      { name: "HIREX WelcomeBot", desc: "Automates the first-day onboarding experience." },
    ],
  },
  {
    num: "TIER 3", name: "Employee Lifecycle Supers", desc: "Optimize performance, retention, and growth—continuously.",
    agents: [
      { name: "HIREX SuccessPredict", desc: "Forecasts 30–90 day hire success rates." },
      { name: "HIREX StayAlert", desc: "Detects early attrition and flight risk signals." },
      { name: "HIREX SkillScope", desc: "Maps skill gaps across teams and roles." },
      { name: "HIREX RiseRanker", desc: "Recommends promotions using objective data." },
      { name: "HIREX LearnMatch", desc: "Personalizes training and upskilling paths." },
      { name: "HIREX HappyTrack", desc: "Tracks engagement and sentiment trends." },
      { name: "HIREX TeamFit", desc: "Analyzes team chemistry and balance." },
      { name: "HIREX GrowthPath", desc: "Builds long-term career trajectories for employees." },
    ],
  },
  {
    num: "TIER 4", name: "Analytics & Intelligence Supers", desc: "Turn HR into a measurable, optimizable system.",
    agents: [
      { name: "HIREX InsightX", desc: "Unified HR analytics dashboard for all key metrics." },
      { name: "HIREX HireCast", desc: "Predicts future hiring demand by role and region." },
      { name: "HIREX CostSentry", desc: "Identifies HR cost leaks and savings opportunities." },
      { name: "HIREX ROIPro", desc: "Calculates ROI per hire, role, and team." },
      { name: "HIREX BenchMarkr", desc: "Compares performance vs industry peers." },
      { name: "HIREX Diverseye", desc: "Tracks DEI metrics with full accountability." },
    ],
  },
  {
    num: "TIER 5", name: "India + Specialty Supers", desc: "Designed for scale, regulation, and regional complexity.",
    agents: [
      { name: "HIREX BharatParse", desc: "Parses Hindi and regional-language resumes accurately." },
      { name: "HIREX HospitalMatch", desc: "Specialized hiring for clinical roles (RxGPT-ready)." },
      { name: "HIREX ScaleMaster", desc: "Manages 100+ parallel hiring pipelines simultaneously." },
      { name: "HIREX GlobalSync", desc: "Coordinates multi-country hiring compliance seamlessly." },
    ],
  },
];

const AgentsPage = () => {
  const [openTier, setOpenTier] = useState<number | null>(null);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-[140px] pb-20 bg-hirex-bg2 relative overflow-hidden">
        <div className="absolute -top-[100px] -right-[200px] w-[500px] h-[500px] bg-primary/[0.08] rounded-full blur-[80px]" />
        <div className="container text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-primary/10 border border-primary/25 text-primary-light mb-6">
            27 Autonomous Agents. One Coordinated Workforce.
          </div>
          <h1 className="font-display text-[clamp(48px,7vw,88px)] font-extrabold mb-5">
            Pick Your<br /><span className="grad-text">HIREX Super-Agents</span>
          </h1>
          <p className="text-hirex-text2 max-w-[580px] mx-auto mb-9 text-[17px] leading-relaxed">
            Each Super-Agent replaces a full-time HR function. Together they form a coordinated AI workforce that runs your entire people operation—accurately, compliantly, and at scale.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-[15px] bg-primary text-primary-foreground hover:bg-primary-light transition-all">
              Explore All Agents ↓
            </button>
            <Link to="/pricing" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-[15px] bg-transparent text-foreground border-[1.5px] border-hirex-border2 no-underline hover:bg-hirex-surface hover:border-primary transition-all">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-[100px] max-md:py-[72px]">
        <div className="container">
          <div className="text-center mb-[60px]">
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold">Organized by <em className="font-normal opacity-60">Function.</em></h2>
            <p className="text-hirex-text2 max-w-[480px] mx-auto mt-3">Expand each tier to explore the agents that power your HR automation.</p>
          </div>
          <div>
            {tiers.map((tier, idx) => (
              <div key={tier.num} className="border-b border-border">
                <div
                  className="flex items-center justify-between py-8 cursor-pointer gap-5 group"
                  onClick={() => setOpenTier(openTier === idx ? null : idx)}
                >
                  <span className="text-[11px] font-bold tracking-[0.1em] text-hirex-text3 w-[60px]">{tier.num}</span>
                  <div className="flex-1">
                    <div className="font-display text-[clamp(22px,3vw,32px)] font-bold group-hover:text-primary-light transition-colors">{tier.name}</div>
                    <div className="text-[15px] text-hirex-text3 mt-1.5">{tier.desc}</div>
                  </div>
                  <span className={`text-hirex-text3 text-xl transition-transform duration-300 ${openTier === idx ? "rotate-180" : ""}`}>⌄</span>
                </div>
                {openTier === idx && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-7 animate-fade-in">
                    {tier.agents.map((agent) => (
                      <div key={agent.name} className="bg-hirex-bg3 border border-border rounded-md p-5">
                        <div className="font-display text-[15px] font-bold mb-2">{agent.name}</div>
                        <div className="text-[13px] text-hirex-text3 leading-relaxed">{agent.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip title="Ready to Deploy Your AI Workforce?" subtitle="Start with 5 agents for $99/month, or deploy the full suite for enterprise-grade automation." />
    </div>
  );
};

export default AgentsPage;
