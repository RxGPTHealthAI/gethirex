import { Link } from "react-router-dom";
import CTAStrip from "@/components/CTAStrip";

const stats = [
  { val: "3×", label: "Faster Hiring Cycles" },
  { val: "95%", label: "Parsing Accuracy" },
  { val: "$409K", label: "Avg Annual Savings" },
  { val: "50+", label: "Active Pilots" },
];

const proofCards = [
  { icon: "⚡", val: "3× Faster", title: "Hiring Cycles", desc: "From job post to offer letter in days, not weeks. Agents work 24/7." },
  { icon: "🎯", val: "95%", title: "Parsing Accuracy", desc: "Industry-leading resume parsing with multi-format support." },
  { icon: "💰", val: "$409K", title: "Annual Savings", desc: "Average cost reduction by replacing manual HR operations." },
  { icon: "🚀", val: "50+", title: "Active Pilots", desc: "Startups and enterprises trust HireX to run hiring autonomously." },
];

const agents = [
  { img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", tag: "Recruitment", name: "HIREX TalentRadar", desc: "Surfaces high-fit candidates hidden in large CV pools using advanced semantic search and skill matching." },
  { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", tag: "Recruitment", name: "HIREX ScoreMaster", desc: "Objectively ranks candidates using multi-factor scoring that eliminates bias and surfaces true potential." },
  { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", tag: "Recruitment", name: "HIREX InterviewPro", desc: "Generates role-specific, bias-aware interview frameworks that ensure consistent evaluation standards." },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", tag: "Onboarding", name: "HIREX OfferCraft", desc: "Creates optimized, close-ready offer letters with competitive compensation benchmarks." },
  { img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80", tag: "Compliance", name: "HIREX LawShield", desc: "Flags legal, labor, and regulatory risks across jurisdictions before they become problems." },
  { img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", tag: "Analytics", name: "HIREX SuccessPredict", desc: "Forecasts 30–90 day hire success rates using historical performance data and behavioral patterns." },
];

const icps = [
  {
    icon: "🚀", title: "Startups", tag: "Scale Fast",
    desc: "From founder chaos to 50 hires/month—without building HR teams. Get Fortune 500 hiring infrastructure from day one.",
    items: ["Pick 5 Super-Agents to start", "Automate up to 80% of HR work", "Hire up to 50 candidates/month", "From $99/month"],
    cta: "Start Free Trial →", ctaTo: "/pricing", featured: false,
  },
  {
    icon: "🏢", title: "Enterprises & MNCs", tag: "Global Scale",
    desc: "Global hiring, zero compliance violations, audit-ready by design. Deploy all 27 agents for enterprise-grade automation.",
    items: ["Multi-country compliance automation", "ATS, payroll, ERP integrations", "Unified analytics across regions", "Dedicated success team"],
    cta: "Book MNC Demo →", ctaTo: "/contact", featured: true,
  },
  {
    icon: "📈", title: "VCs & Investors", tag: "Strategic Moat",
    desc: "27 proprietary agents + real job data = compounding moat. Understand the workforce intelligence opportunity.",
    items: ["$100B+ TAM opportunity", "400K+ job data advantage", "Clear path to market dominance", "Portfolio-ready infrastructure"],
    cta: "Request Investor Briefing →", ctaTo: "/contact", featured: false,
  },
];

const marqueeItems = ["TalentRadar", "ScoreMaster", "InterviewPro", "LawShield", "OfferCraft", "SuccessPredict", "StayAlert", "InsightX", "BharatParse", "PayGuard", "WelcomeBot", "ROIPro"];

const pricingPlans = [
  { label: "Essentials", name: "Startup", price: "$99", period: "/month", desc: "Perfect for early-stage companies scaling their first team.", items: ["5 Super-Agents of your choice", "Up to 1,000 resumes/month", "Basic integrations", "Email support"], featured: false },
  { label: "Most Popular", name: "Growth", price: "$499", period: "/month", desc: "For scaling companies ready to automate their entire HR operation.", items: ["Up to 21 Super-Agents", "Unlimited resumes", "All integrations included", "Analytics & lifecycle agents", "Priority support"], featured: true },
  { label: "Full Suite", name: "Enterprise", price: "Custom", period: "", desc: "Full-scale HR automation for global enterprises.", items: ["All 27 Super-Agents", "White-label options", "SSO & audit logs", "Multi-region compliance", "Dedicated success team"], featured: false },
];

const HomePage = () => (
  <div className="animate-fade-in">
    {/* Hero */}
    <section className="min-h-screen flex items-center relative overflow-hidden pt-[120px] pb-20">
      <div className="absolute w-[600px] h-[600px] bg-primary/[0.12] rounded-full blur-[80px] -top-[100px] -right-[150px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-accent/[0.07] rounded-full blur-[80px] -bottom-[50px] -left-[100px] pointer-events-none" />
      <div className="container relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-hirex-success/10 border border-hirex-success/25 text-hirex-success mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-hirex-success inline-block" />
          Trusted by 50+ Active Pilots
        </div>
        <h1 className="font-display text-[clamp(44px,6vw,80px)] font-extrabold leading-[1.08] tracking-tight mb-7">
          HireX:<br />
          <span className="grad-text">Agentic AI</span><br />
          That Runs Your HR<br />
          <span className="italic opacity-60 font-normal">Like a Fortune 500 Machine</span>
        </h1>
        <p className="text-[clamp(17px,2vw,21px)] text-hirex-text2 max-w-[600px] mb-10 leading-relaxed">
          Tired of resume black holes, compliance nightmares, and hires that ghost? HireX deploys <strong className="text-foreground">27 autonomous AI agents</strong> to automate hiring, onboarding, compliance, retention, and workforce planning.
        </p>
        <div className="flex gap-3 flex-wrap mb-16">
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-[15px] bg-primary text-primary-foreground no-underline hover:bg-primary-light hover:-translate-y-0.5 transition-all hover:shadow-[0_12px_32px_rgba(91,110,245,0.4)]">
            Start Free Startup Trial →
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-[15px] bg-transparent text-foreground border-[1.5px] border-hirex-border2 no-underline hover:bg-hirex-surface hover:border-primary hover:text-primary-light hover:-translate-y-0.5 transition-all">
            Book MNC Demo
          </Link>
          <Link to="/pricing" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-[15px] bg-hirex-surface text-hirex-text2 no-underline hover:text-foreground hover:bg-hirex-bg3 transition-all">
            View Pricing
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[680px]">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-[32px] font-bold text-primary-light">{s.val}</div>
              <div className="text-sm text-hirex-text3 mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Marquee */}
    <div className="overflow-hidden py-6 border-y border-border">
      <div className="flex gap-12 animate-marquee w-max hover:[animation-play-state:paused]">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-hirex-text3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {item}
          </div>
        ))}
      </div>
    </div>

    {/* Proof */}
    <section className="py-[100px] max-md:py-[72px] bg-hirex-bg2">
      <div className="container">
        <div className="text-center mb-[60px]">
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-hirex-text3 mb-4">Proof That Matters</p>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] font-extrabold">Real Results, <em className="font-normal opacity-60">Real Impact.</em></h2>
          <p className="text-hirex-text2 max-w-[540px] mx-auto mt-4 text-base">We deliver measurable outcomes that transform HR from cost center to strategic advantage.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {proofCards.map((c) => (
            <div key={c.title} className="bg-hirex-surface border border-border rounded-lg p-8 transition-all hover:-translate-y-1 hover:border-hirex-border2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="w-12 h-12 rounded-[14px] bg-primary/[0.12] flex items-center justify-center text-[22px] mb-5">{c.icon}</div>
              <div className="font-display text-[34px] font-bold text-primary-light">{c.val}</div>
              <div className="text-base font-semibold mt-2.5 mb-1.5">{c.title}</div>
              <div className="text-sm text-hirex-text3 leading-relaxed">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Agent Showcase */}
    <section className="py-[100px] max-md:py-[72px]">
      <div className="container">
        <div className="text-center mb-[60px]">
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-hirex-text3 mb-4">Agent Showcase</p>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] font-extrabold">Meet Your <em className="font-normal opacity-60">AI Workforce.</em></h2>
          <p className="text-hirex-text2 max-w-[580px] mx-auto mt-4 text-base">Each HIREX Super-Agent replaces a full-time HR role. Together they run your entire people operation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((a) => (
            <div key={a.name} className="bg-hirex-surface border border-border rounded-lg overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:border-hirex-border2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] group">
              <div className="h-[180px] bg-hirex-bg3 relative overflow-hidden">
                <img src={a.img} alt={a.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-primary text-primary-foreground">{a.tag}</span>
              </div>
              <div className="p-6">
                <div className="font-display text-lg font-bold mb-2.5 group-hover:text-primary-light transition-colors">{a.name}</div>
                <div className="text-sm text-hirex-text3 leading-relaxed">{a.desc}</div>
                <Link to="/agents" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light mt-4 no-underline hover:gap-2.5 transition-all">
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-11">
          <Link to="/agents" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-[15px] bg-primary text-primary-foreground no-underline hover:bg-primary-light hover:-translate-y-0.5 transition-all hover:shadow-[0_12px_32px_rgba(91,110,245,0.4)]">
            Explore All 27 Super-Agents →
          </Link>
        </div>
      </div>
    </section>

    {/* ICP */}
    <section className="py-[100px] max-md:py-[72px] bg-hirex-bg2">
      <div className="container">
        <div className="text-center mb-[60px]">
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-hirex-text3 mb-4">Built For Every ICP</p>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] font-extrabold">Your HR, <em className="font-normal opacity-60">Automated.</em></h2>
          <p className="text-hirex-text2 max-w-[480px] mx-auto mt-4 text-base">From 5-person startups to 10,000-employee enterprises—HireX adapts to your scale.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-lg:max-w-[560px] max-lg:mx-auto">
          {icps.map((icp) => (
            <div
              key={icp.title}
              className={`bg-hirex-surface border rounded-lg p-10 transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${
                icp.featured ? "border-primary bg-gradient-to-br from-hirex-surface to-primary/[0.08]" : "border-border hover:border-hirex-border2"
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-[26px] mb-6 ${icp.featured ? "bg-primary/20" : "bg-primary/[0.12]"}`}>{icp.icon}</div>
              <div className="font-display text-[28px] font-bold mb-1.5">{icp.title}</div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-hirex-text3 mb-4 block">{icp.tag}</span>
              <p className="text-[15px] text-hirex-text2 mb-6 leading-relaxed">{icp.desc}</p>
              <ul className="flex flex-col gap-2.5 mb-7">
                {icp.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="text-hirex-success font-bold shrink-0 mt-px">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={icp.ctaTo}
                className={`w-full flex justify-center items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-[15px] no-underline transition-all hover:-translate-y-0.5 ${
                  icp.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary-light hover:shadow-[0_12px_32px_rgba(91,110,245,0.4)]"
                    : "bg-transparent text-foreground border-[1.5px] border-hirex-border2 hover:bg-hirex-surface hover:border-primary hover:text-primary-light"
                }`}
              >
                {icp.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Pricing Teaser */}
    <section className="py-[100px] max-md:py-[72px]">
      <div className="container">
        <div className="text-center mb-[60px]">
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-hirex-text3 mb-4">Pricing</p>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] font-extrabold">Pricing That <em className="font-normal opacity-60">Pays for Itself.</em></h2>
          <p className="text-hirex-text2 max-w-[480px] mx-auto mt-4 text-base">Pay for outcomes—not HR headcount.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start max-lg:max-w-[480px] max-lg:mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-hirex-surface border rounded-lg p-10 relative transition-all hover:-translate-y-1 ${
                plan.featured
                  ? "bg-gradient-to-br from-primary to-primary-dark border-primary lg:-translate-y-3"
                  : "border-border hover:border-hirex-border2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">
                  Best Value
                </div>
              )}
              <div className={`text-xs font-semibold tracking-wider uppercase mb-2.5 ${plan.featured ? "text-foreground/70" : "text-hirex-text3"}`}>{plan.label}</div>
              <div className="font-display text-[26px] font-bold mb-2.5">{plan.name}</div>
              <div className="font-display text-[40px] font-bold mb-1.5">
                {plan.price}<span className="text-base font-normal opacity-60">{plan.period}</span>
              </div>
              <p className={`text-sm mb-7 leading-relaxed ${plan.featured ? "text-foreground/80" : "text-hirex-text2"}`}>{plan.desc}</p>
              <ul className="flex flex-col gap-2.5 mb-8">
                {plan.items.map((item) => (
                  <li key={item} className={`flex items-start gap-2.5 text-sm ${plan.featured ? "text-foreground/90" : ""}`}>
                    <span className={`font-bold shrink-0 ${plan.featured ? "text-accent-secondary" : "text-hirex-success"}`}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={plan.featured ? "/contact" : "/pricing"}
                className={`block w-full text-center py-3.5 rounded-md font-semibold text-sm no-underline transition-all hover:-translate-y-px ${
                  plan.featured
                    ? "bg-foreground text-primary-dark hover:bg-accent"
                    : "bg-transparent text-primary-light border-[1.5px] border-hirex-border2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }`}
              >
                {plan.featured ? "Get Started" : plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/pricing" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-[15px] bg-hirex-surface text-hirex-text2 no-underline hover:text-foreground hover:bg-hirex-bg3 transition-all">
            View Full Pricing Details →
          </Link>
        </div>
      </div>
    </section>

    <CTAStrip />
  </div>
);

export default HomePage;
