import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Zap, Shield, Sparkles, Users, Building2, Briefcase } from "lucide-react";
import { startRazorpayCheckout } from "@/lib/razorpay";
import razorpayUpiQr from "@/assets/razorpay-upi-qr.jpeg";

// ============================================================
// HireX Pricing — restructured for conversion (CRO pass)
// Brand tokens, colors, typography intentionally unchanged.
// ============================================================

type Billing = "monthly" | "annual";
type Audience = "candidate" | "employer";

const CALENDLY_URL = "https://calendly.com/care-gethirex";

// ---------- Calendly helpers ----------
function loadCalendly(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    const w = window as any;
    if (w.Calendly) return resolve();
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }
    const existing = document.querySelector<HTMLScriptElement>('script[src*="calendly.com/assets/external/widget.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

async function openCalendly() {
  await loadCalendly();
  const w = window as any;
  if (w.Calendly?.initPopupWidget) {
    w.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, "_blank", "noopener");
  }
}

// ---------- Data ----------
const CANDIDATE_TIERS = [
  {
    id: "starter",
    name: "Starter",
    monthly: 999,
    annual: 749,
    forWho: "First-time job seekers getting search-ready.",
    credits: "150 credits / month",
    features: [
      "3 AI agents: ResumeReviver, JobScout, CareerPilot",
      "3 resume rewrites + 5 text mock interviews",
      "JobScout scans up to 100 roles / day",
      "Email support · 24h response",
    ],
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 2499,
    annual: 1874,
    forWho: "Active job hunters interviewing weekly.",
    credits: "450 credits / month",
    features: [
      "5 agents incl. CodeCoach + InterviewPro",
      "20 resume rewrites + 10 text mocks",
      "2 voice mock interviews / month",
      "50 LinkedIn auto-applies / month",
      "Priority email support · 8h",
    ],
    featured: true,
  },
  {
    id: "ultimate",
    name: "Ultimate",
    monthly: 4999,
    annual: 3749,
    forWho: "Senior candidates negotiating offers.",
    credits: "1,500 credits / month",
    features: [
      "All 6 agents incl. OfferNinja",
      "60 rewrites + unlimited text mocks",
      "20 voice mocks + Whisper Coach",
      "500 LinkedIn auto-applies / month",
      "WhatsApp + email support · 4h",
    ],
    featured: false,
  },
];

const EMPLOYER_TIERS = [
  {
    id: "employer-starter",
    name: "Scale Fast",
    monthly: 4999,
    annual: 3749,
    forWho: "Startups · 10–50 employees hiring monthly.",
    credits: "1,500 credits / month",
    features: [
      "5 of 27 agents · 10 active roles",
      "500 DB searches / month",
      "Recruitment + Onboarding modules",
      "Zapier + email support",
      "Monthly billing · ₹0 implementation",
    ],
    cta: "buy" as const,
    featured: false,
  },
  {
    id: "employer-growth",
    name: "Business",
    monthly: 12999,
    annual: 9749,
    forWho: "Mid-market · 50–500 employees.",
    credits: "6,000 credits / month",
    features: [
      "15 of 27 agents · 50 active roles",
      "5,000 DB searches · full voice interview bot",
      "5 of 8 modules incl. L&D + Performance",
      "20 native integrations + REST API · SSO",
      "Pooled CSM",
    ],
    cta: "demo" as const,
    featured: true,
  },
  {
    id: "employer-scale",
    name: "Enterprise",
    monthly: 0,
    annual: 0,
    forWho: "500+ employees · multi-geo, custom needs.",
    credits: "Unlimited credits · custom",
    features: [
      "All 27 agents · unlimited roles",
      "All 8 modules · custom agent builds",
      "SOC2 · DPDP · GDPR full audit",
      "Dedicated CSM · 24/7 SLA",
      "Multi-currency · multi-country payroll",
    ],
    cta: "sales" as const,
    featured: false,
  },
];

const TRUSTED_LOGOS = ["Postman", "Notion", "Vercel", "Linear", "Ramp", "Monzo", "Wise"];

const RESULTS = [
  { num: "67%", desc: "faster time-to-hire vs traditional ATS + boards" },
  { num: "₹18K", desc: "avg monthly tooling spend replaced per employer" },
  { num: "3.4x", desc: "more interview calls in first 30 days (candidates)" },
  { num: "11d", desc: "median time-to-offer (vs 34d industry baseline)" },
];

const TESTIMONIALS = [
  {
    quote: "After 4 weeks we cancelled LinkedIn Recruiter and Greenhouse. HireX did 90% of what they promised on day one. Spend dropped 40% as we 2x'd hiring.",
    name: "Allison Brooks",
    role: "Head of Talent · Series-B SaaS, San Francisco",
    tag: "Business · Employer",
  },
  {
    quote: "The credit model is brilliant. I paid for exactly what I used. When I landed my role at a YC company, I just cancelled. No guilt, no lock-in.",
    name: "Daniel O'Connor",
    role: "Product Manager · Manchester, UK",
    tag: "Starter · Candidate",
  },
  {
    quote: "The whisper coach during my Stripe loop helped me stay calm under pressure. I got the offer. Insane ROI on a $185k base.",
    name: "Maya Rodriguez",
    role: "Senior PM · Seattle, WA",
    tag: "Ultimate · Candidate",
  },
];

const COMPARISON_ROWS = [
  ["Pricing model", "Per listing · per click · per seat", "Pay per agent action · credits"],
  ["Cost predictability", "CPC auctions · annual lock-ins", "Fixed credit costs · refuel only when needed"],
  ["Who does the work", "Recruiter does 100% of filtering", "27 agents do ~90% of the work"],
  ["Time to hire", "30–60 days", "7–14 days with AI screening"],
  ["Onboarding · L&D · Compliance", "Separate tools needed", "All 8 modules in one platform"],
];

const REFUEL_PACKS = [
  { id: "mini", name: "Mini Refuel", credits: "100 credits", price: "₹299", note: "1–2 voice mocks" },
  { id: "power", name: "Power Refuel", credits: "300 credits", price: "₹799", note: "Save 11% · sweet spot", best: true },
  { id: "mega", name: "Mega Refuel", credits: "1,000 credits", price: "₹2,299", note: "Save 23% · power user" },
];

const CREDIT_CATEGORIES = [
  {
    badge: "Light · 1–3 credits",
    range: "1–3",
    color: "text-hirex-success",
    border: "border-hirex-success/30",
    bg: "bg-hirex-success/5",
    items: [["Chat with any agent", "1 cr"], ["ATS resume scan", "2 cr"], ["Cover letter", "3 cr"]],
  },
  {
    badge: "Medium · 5–10 credits",
    range: "5–10",
    color: "text-hirex-cyan",
    border: "border-hirex-cyan/30",
    bg: "bg-hirex-cyan/5",
    items: [["Pull 10 jobs", "5 cr"], ["Text mock interview", "8 cr"], ["Resume rewrite", "10 cr"]],
  },
  {
    badge: "Heavy · 20–30 credits",
    range: "20–30",
    color: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/5",
    items: [["Voice mock (10 min)", "20 cr"], ["Voice negotiation", "25 cr"], ["Live whisper coach", "30 cr"]],
  },
];

const FAQS = [
  ["What is HireX and how does it work?", "HireX is an AI hiring platform with 27 specialized agents that handle sourcing, screening, scheduling, interviewing, offers, onboarding, L&D, and compliance — in one dashboard. Buy credits and spend them only when an agent actually completes work."],
  ["What's the difference between Buy Now, Book Demo, and Talk to Sales?", "Candidate plans and the Scale Fast employer plan are self-serve — Buy Now starts Razorpay checkout instantly. Business needs a short demo to map your hiring workflow. Enterprise is custom-scoped, so you Talk to Sales."],
  ["How does the credit system work?", "Every action has a published credit cost shown before you click. Light actions are 1–3 credits, medium 5–10, heavy 20–30. Subscription credits reset monthly; refuel credits never expire while your subscription is active."],
  ["Can I cancel anytime?", "Yes. Monthly plans cancel from your dashboard at the next billing cycle in two clicks. Annual plans get a prorated refund within the first 30 days."],
  ["What's included in annual billing?", "Annual plans cost 25% less per month — equivalent to 3 months free — and lock in your rate for the full term. Same features as monthly."],
  ["Is my data secure?", "HireX is SOC 2 Type II certified, GDPR compliant for EU/UK, and DPDP Act 2023 compliant for India. All data encrypted in transit (TLS 1.3) and at rest (AES-256). We do not train on your data."],
  ["Which payment methods do you accept?", "All major credit/debit cards, UPI, net banking, and wallets via Razorpay. You can also pay via the UPI QR on this page and email care@gethirex.space with your transaction ID."],
];

// ---------- Small components ----------
const FaqItem = ({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-border py-5">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 text-left">
        <span className="font-display text-base md:text-lg font-semibold">{q}</span>
        <ChevronDown className={`h-5 w-5 text-hirex-text2 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="mt-3 text-sm md:text-base text-hirex-text2 leading-relaxed">{a}</p>}
    </div>
  );
};

// ---------- Main page ----------
const PricingPage = () => {
  const [audience, setAudience] = useState<Audience>("candidate");
  const [billing, setBilling] = useState<Billing>("monthly");

  // Preload Calendly so the popup opens fast on first click.
  useEffect(() => {
    void loadCalendly();
  }, []);

  const candidateCards = useMemo(() => CANDIDATE_TIERS, []);
  const employerCards = useMemo(() => EMPLOYER_TIERS, []);

  return (
    <div className="animate-fade-in pb-24">
      {/* HERO — short, single CTA */}
      <section className="pt-[88px] pb-14 bg-hirex-bg2 relative overflow-hidden">
        <div className="absolute -top-[120px] -left-[100px] w-[600px] h-[600px] bg-hirex-cyan/[0.07] rounded-full blur-[100px]" />
        <div className="absolute -bottom-[120px] -right-[100px] w-[500px] h-[500px] bg-accent/[0.06] rounded-full blur-[100px]" />
        <div className="container max-w-[1100px] text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-hirex-cyan/10 border border-hirex-cyan/25 text-hirex-primary-light mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-hirex-cyan shadow-[0_0_12px_hsl(var(--hirex-cyan))]" />
            Pay for the work · not the listing
          </div>
          <h1 className="font-display text-[clamp(36px,6vw,68px)] font-extrabold mb-5 leading-[1.05] tracking-tight">
            Pricing that scales with <span className="grad-text-cyan italic">how you hire.</span>
          </h1>
          <p className="text-hirex-text2 text-lg leading-relaxed max-w-[680px] mx-auto mb-8">
            Pick a plan, buy instantly, or book a 20-minute demo. Same product, three clear paths — no trials, no surprises.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center bg-gradient-to-r from-hirex-cyan to-hirex-primary-light text-primary-foreground font-bold text-sm md:text-base px-7 py-3.5 rounded-full hover:scale-[1.03] transition-transform shadow-[0_8px_24px_hsla(202,72%,59%,0.35)]"
          >
            See plans →
          </a>
        </div>
      </section>

      {/* AUDIENCE TOGGLE + PRICING */}
      <section id="pricing" className="py-[72px] max-md:py-[56px]">
        <div className="container max-w-[1280px]">
          {/* Audience switch */}
          <div className="flex flex-col items-center mb-10">
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">
              Choose your path
            </div>
            <div className="inline-flex items-center gap-1 bg-hirex-surface border border-hirex-border2 rounded-full p-1.5">
              <button
                onClick={() => setAudience("candidate")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  audience === "candidate" ? "bg-foreground text-hirex-bg2" : "text-hirex-text2 hover:text-foreground"
                }`}
              >
                <Users className="h-4 w-4" />
                For Candidates
              </button>
              <button
                onClick={() => setAudience("employer")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  audience === "employer" ? "bg-foreground text-hirex-bg2" : "text-hirex-text2 hover:text-foreground"
                }`}
              >
                <Building2 className="h-4 w-4" />
                For Employers
              </button>
            </div>
          </div>

          {/* Billing switch (only for plans with billing) */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-1 bg-hirex-surface border border-hirex-border2 rounded-full p-1.5">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  billing === "monthly" ? "bg-foreground text-hirex-bg2" : "text-hirex-text2 hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                  billing === "annual" ? "bg-foreground text-hirex-bg2" : "text-hirex-text2 hover:text-foreground"
                }`}
              >
                Annual
                <span className="bg-accent text-accent-foreground text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">
                  Save 25%
                </span>
              </button>
            </div>
          </div>

          {/* Section heading per audience */}
          <div className="text-center max-w-[760px] mx-auto mb-10">
            {audience === "candidate" ? (
              <>
                <h2 className="font-display text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-tight mb-3">
                  Plans for <span className="grad-text-cyan italic">candidates.</span>
                </h2>
                <p className="text-hirex-text2 text-base leading-relaxed">
                  Pick a tier, pay once, and start using your AI agents instantly. Cancel anytime.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.1] tracking-tight mb-3">
                  Plans for <span className="grad-text-cyan italic">employers.</span>
                </h2>
                <p className="text-hirex-text2 text-base leading-relaxed">
                  Self-serve for fast-growing startups. Book a demo for mid-market. Talk to sales for enterprise.
                </p>
              </>
            )}
          </div>

          {/* CANDIDATE CARDS */}
          {audience === "candidate" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-lg:max-w-[480px] max-lg:mx-auto">
              {candidateCards.map((tier) => {
                const price = billing === "annual" ? tier.annual : tier.monthly;
                return (
                  <div
                    key={tier.id}
                    className={`relative rounded-2xl p-8 flex flex-col transition-all hover:-translate-y-1 ${
                      tier.featured
                        ? "bg-gradient-to-br from-hirex-cyan/15 via-hirex-surface to-hirex-surface border-2 border-hirex-cyan/40 lg:-translate-y-3 glow-border-cyan"
                        : "bg-hirex-surface border border-border hover:border-hirex-border2"
                    }`}
                  >
                    {tier.featured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-[11px] font-bold tracking-wider uppercase whitespace-nowrap shadow-lg">
                        Most Popular
                      </div>
                    )}
                    <div className="font-display text-2xl font-bold mb-1">{tier.name}</div>
                    <p className="text-xs text-hirex-text3 uppercase tracking-wider font-mono mb-4">{tier.forWho}</p>
                    <div className="font-display text-[44px] font-extrabold leading-none mb-1 tracking-tight">
                      <span className="text-2xl font-semibold align-top mr-1">₹</span>
                      {price.toLocaleString("en-IN")}
                      <span className="text-base font-normal text-hirex-text2 ml-1">/mo</span>
                    </div>
                    {billing === "annual" && (
                      <p className="text-xs text-accent font-semibold mb-3">Billed annually · 25% off</p>
                    )}
                    <div className="flex items-baseline gap-2 mt-3 mb-6 pb-6 border-b border-border">
                      <span className="font-display text-lg font-bold grad-text-cyan">{tier.credits}</span>
                    </div>
                    <ul className="flex flex-col gap-3 mb-8 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-hirex-text2 leading-relaxed">
                          <Check className="h-4 w-4 text-hirex-success shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      data-plan={tier.id}
                      data-price={price}
                      data-billing={billing}
                      data-cta="buy-now"
                      onClick={() => startRazorpayCheckout({ planId: tier.id, billing })}
                      className={`w-full py-3.5 rounded-full font-bold text-sm transition-all ${
                        tier.featured
                          ? "bg-gradient-to-r from-hirex-cyan to-hirex-primary-light text-primary-foreground hover:scale-[1.02] shadow-[0_8px_24px_hsla(202,72%,59%,0.35)]"
                          : "bg-foreground text-hirex-bg2 hover:opacity-90"
                      }`}
                    >
                      Buy Now →
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* EMPLOYER CARDS */}
          {audience === "employer" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-lg:max-w-[480px] max-lg:mx-auto">
              {employerCards.map((tier) => {
                const isCustom = tier.cta === "sales";
                const price = billing === "annual" ? tier.annual : tier.monthly;
                return (
                  <div
                    key={tier.id}
                    className={`relative rounded-2xl p-8 flex flex-col transition-all hover:-translate-y-1 ${
                      tier.featured
                        ? "bg-gradient-to-br from-hirex-cyan/15 via-hirex-surface to-hirex-surface border-2 border-hirex-cyan/40 lg:-translate-y-3 glow-border-cyan"
                        : "bg-hirex-surface border border-border hover:border-hirex-border2"
                    }`}
                  >
                    {tier.featured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-[11px] font-bold tracking-wider uppercase whitespace-nowrap shadow-lg">
                        Most Popular
                      </div>
                    )}
                    <div className="font-display text-2xl font-bold mb-1">{tier.name}</div>
                    <p className="text-xs text-hirex-text3 uppercase tracking-wider font-mono mb-4">{tier.forWho}</p>

                    {isCustom ? (
                      <div className="font-display text-[36px] font-extrabold leading-none mb-1 tracking-tight">
                        Custom
                      </div>
                    ) : (
                      <>
                        <div className="font-display text-[44px] font-extrabold leading-none mb-1 tracking-tight">
                          <span className="text-2xl font-semibold align-top mr-1">₹</span>
                          {price.toLocaleString("en-IN")}
                          <span className="text-base font-normal text-hirex-text2 ml-1">/mo</span>
                        </div>
                        {billing === "annual" && (
                          <p className="text-xs text-accent font-semibold mb-3">Billed annually · 25% off</p>
                        )}
                      </>
                    )}

                    <div className="flex items-baseline gap-2 mt-3 mb-6 pb-6 border-b border-border">
                      <span className="font-display text-lg font-bold grad-text-cyan">{tier.credits}</span>
                    </div>
                    <ul className="flex flex-col gap-3 mb-8 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-hirex-text2 leading-relaxed">
                          <Check className="h-4 w-4 text-hirex-success shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {tier.cta === "buy" && (
                      <button
                        data-plan={tier.id}
                        data-price={price}
                        data-billing={billing}
                        data-cta="buy-now"
                        onClick={() => startRazorpayCheckout({ planId: tier.id, billing })}
                        className={`w-full py-3.5 rounded-full font-bold text-sm transition-all ${
                          tier.featured
                            ? "bg-gradient-to-r from-hirex-cyan to-hirex-primary-light text-primary-foreground hover:scale-[1.02] shadow-[0_8px_24px_hsla(202,72%,59%,0.35)]"
                            : "bg-foreground text-hirex-bg2 hover:opacity-90"
                        }`}
                      >
                        Buy Now →
                      </button>
                    )}
                    {tier.cta === "demo" && (
                      <button
                        data-plan={tier.id}
                        data-cta="book-demo"
                        onClick={openCalendly}
                        className="w-full py-3.5 rounded-full font-bold text-sm transition-all bg-gradient-to-r from-hirex-cyan to-hirex-primary-light text-primary-foreground hover:scale-[1.02] shadow-[0_8px_24px_hsla(202,72%,59%,0.35)]"
                      >
                        Book Demo →
                      </button>
                    )}
                    {tier.cta === "sales" && (
                      <button
                        data-plan={tier.id}
                        data-cta="talk-to-sales"
                        onClick={openCalendly}
                        className="w-full py-3.5 rounded-full font-bold text-sm transition-all bg-foreground text-hirex-bg2 hover:opacity-90"
                      >
                        Talk to Sales →
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* TRUST STRIP — close to pricing */}
      <section className="py-10 bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[1280px]">
          <p className="text-center text-xs font-mono tracking-[0.15em] uppercase text-hirex-text3 mb-3">
            Trusted by 1,200+ teams across India, US, UK & EU
          </p>
          <div className="flex items-center justify-center flex-wrap gap-x-10 gap-y-3 mb-8">
            {TRUSTED_LOGOS.map((logo) => (
              <span
                key={logo}
                className="text-base md:text-lg font-display font-semibold text-hirex-text3 hover:text-foreground transition-colors tracking-tight"
              >
                {logo}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[980px] mx-auto">
            {RESULTS.map((r) => (
              <div key={r.num} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-extrabold grad-text-cyan italic mb-1">
                  {r.num}
                </div>
                <p className="text-xs md:text-sm text-hirex-text2 leading-snug">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — 3 only */}
      <section className="py-[72px] max-md:py-[56px]">
        <div className="container max-w-[1180px]">
          <h2 className="font-display text-[clamp(26px,4vw,38px)] font-extrabold text-center mb-10 tracking-tight">
            What buyers say <span className="grad-text-cyan italic">after switching.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-hirex-surface border border-border rounded-2xl p-6 flex flex-col">
                <p className="text-sm md:text-base text-hirex-text2 leading-relaxed mb-5 flex-1">"{t.quote}"</p>
                <div className="border-t border-border pt-4">
                  <div className="font-display font-bold text-base">{t.name}</div>
                  <div className="text-xs text-hirex-text3 mt-0.5">{t.role}</div>
                  <div className="inline-block mt-2 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-hirex-cyan/10 text-hirex-primary-light">
                    {t.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON / CREDIBILITY */}
      <section className="py-[72px] max-md:py-[56px] bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[1080px]">
          <div className="text-center max-w-[680px] mx-auto mb-10">
            <h2 className="font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-[1.1] tracking-tight mb-3">
              HireX vs the <span className="grad-text-cyan italic">old hiring stack.</span>
            </h2>
            <p className="text-hirex-text2 text-base leading-relaxed">
              Why teams cancel LinkedIn Recruiter, Cutshort, and legacy ATSs after 30 days.
            </p>
          </div>
          <div className="bg-hirex-surface border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 gap-2 px-5 py-3 bg-hirex-bg2 border-b border-border text-xs font-mono uppercase tracking-wider text-hirex-text3">
              <div></div>
              <div>Old stack</div>
              <div className="text-hirex-primary-light">HireX</div>
            </div>
            {COMPARISON_ROWS.map(([label, old, hx]) => (
              <div
                key={label}
                className="grid grid-cols-3 gap-2 px-5 py-4 border-b border-border last:border-0 text-sm"
              >
                <div className="font-medium">{label}</div>
                <div className="text-hirex-text2">{old}</div>
                <div className="text-foreground">{hx}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-hirex-text2">
            <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-hirex-success" /> SOC 2 Type II</span>
            <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-hirex-success" /> GDPR · DPDP</span>
            <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-accent" /> 48h migration</span>
            <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-hirex-cyan" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* HIREX VS ALTERNATIVES — competitor switching table */}
      <section className="py-[72px] max-md:py-[56px]">
        <div className="container max-w-[1180px]">
          <div className="text-center max-w-[720px] mx-auto mb-10">
            <h2 className="font-display text-[clamp(26px,4vw,40px)] font-extrabold leading-[1.1] tracking-tight mb-3">
              The same hire. <span className="grad-text-cyan italic">One-fifth the spend.</span>
            </h2>
            <p className="text-hirex-text2 text-base leading-relaxed">
              We pulled the public pricing of the tools recruiters tell us they're paying for today. Here's what you actually get for what you actually pay.
            </p>
          </div>

          <div className="bg-hirex-surface border border-border rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="bg-hirex-bg2 border-b border-border text-xs font-mono uppercase tracking-wider text-hirex-text3">
                  <th className="text-left px-4 py-3 font-semibold">Platform</th>
                  <th className="text-left px-4 py-3 font-semibold">Monthly cost</th>
                  <th className="text-left px-4 py-3 font-semibold">What's included</th>
                  <th className="text-center px-3 py-3 font-semibold">AI agents</th>
                  <th className="text-center px-3 py-3 font-semibold">Pay-per-use</th>
                  <th className="text-center px-3 py-3 font-semibold">All-in-one</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "HireX", tag: "★ Recommended", cost: "₹1,874/mo · Pro annual", desc: "27 AI agents · sourcing, screening, interviews, offers, onboarding, L&D, compliance, payroll — in one platform.", a: "✓", b: "✓", c: "✓", featured: true },
                  { name: "LinkedIn Recruiter", tag: "Microsoft", cost: "₹9,999/seat · annual only", desc: "InMail credits + search filters. Sourcing only. No screening, scheduling, interview, or onboarding.", a: "✗", b: "✗", c: "✗" },
                  { name: "Indeed Sponsored", tag: "CPC auction", cost: "₹18,000+/mo · typical CPC spend", desc: "Pay per click on listings. No screening, scheduling, or pipeline tools. Quality varies by auction price.", a: "✗", b: "~", c: "✗" },
                  { name: "HireVue", tag: "US enterprise", cost: "$35,000+/yr · ~₹2.4L/mo", desc: "Async video interviews + AI scoring. No sourcing, payroll, or L&D. Annual contract, custom-quote.", a: "~", b: "✗", c: "✗" },
                  { name: "Eightfold AI", tag: "Talent intel", cost: "$60,000+/yr · ~₹4.1L/mo", desc: "Talent-graph search + matching. Strong for sourcing, weak on hands-on hiring workflow. Sales-led only.", a: "~", b: "✗", c: "✗" },
                  { name: "SeekOut", tag: "US enterprise", cost: "$8,000+/yr · ~₹55K/mo", desc: "Boolean sourcing + diversity insights. No interview, screening, or onboarding modules.", a: "~", b: "✗", c: "✗" },
                  { name: "Beamery", tag: "Talent CRM", cost: "$50,000+/yr · ~₹3.4L/mo", desc: "Sourcing + nurture campaigns. Bring-your-own ATS. Long onboarding, enterprise sales cycle.", a: "✗", b: "✗", c: "✗" },
                  { name: "Cutshort", tag: "India SaaS", cost: "₹12,500/mo · Premium", desc: "Curated tech sourcing + chat. Limited automation. No interviews, payroll, or L&D modules.", a: "✗", b: "✗", c: "✗" },
                  { name: "Zoho Recruit", tag: "ATS", cost: "₹2,800/user/mo · Enterprise", desc: "Per-user ATS workflow. Add-ons cost extra. No native AI screening or interview module.", a: "✗", b: "✗", c: "~" },
                  { name: "Greenhouse", tag: "US enterprise", cost: "$6,500+/yr · ~₹45K/mo", desc: "Full-featured ATS. Sourcing, AI screening, payroll require integrations + extra spend.", a: "✗", b: "✗", c: "~" },
                  { name: 'Recruiter "stack"', tag: "DIY 5-tool combo", cost: "₹45,000+/mo · typical SMB stack", desc: "LinkedIn + ATS + screener + scheduler + payroll bolted together. 5 logins, 5 invoices, 5 silos.", a: "✗", b: "✗", c: "✗" },
                ].map((row) => (
                  <tr
                    key={row.name}
                    className={`border-b border-border last:border-0 ${row.featured ? "bg-hirex-cyan/[0.06]" : ""}`}
                  >
                    <td className="px-4 py-4 align-top">
                      <div className={`font-display font-bold ${row.featured ? "text-hirex-primary-light" : ""}`}>{row.name}</div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-hirex-text3 mt-0.5">{row.tag}</div>
                    </td>
                    <td className="px-4 py-4 align-top text-hirex-text2 whitespace-nowrap">{row.cost}</td>
                    <td className="px-4 py-4 align-top text-hirex-text2 leading-relaxed max-w-[420px]">{row.desc}</td>
                    {[row.a, row.b, row.c].map((v, i) => (
                      <td
                        key={i}
                        className={`px-3 py-4 text-center font-bold ${
                          v === "✓" ? "text-hirex-success" : v === "~" ? "text-accent" : "text-hirex-text3"
                        }`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-gradient-to-br from-accent/10 via-hirex-surface to-hirex-surface border border-accent/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-5">
            <div className="text-4xl">⚡</div>
            <div className="flex-1 text-center md:text-left">
              <div className="font-display text-lg md:text-xl font-bold mb-1">
                Cancel 4 tools. Keep one. <span className="grad-text-cyan italic">Save ₹42K/month on average.</span>
              </div>
              <p className="text-sm text-hirex-text2 leading-relaxed">
                Customers who switched to HireX cut their hiring tool spend by an average of <span className="text-foreground font-semibold">68% in the first 90 days</span> — while making <span className="text-foreground font-semibold">3.4× more interviews</span>. Free migration from any of the platforms above.
              </p>
            </div>
            <button
              onClick={openCalendly}
              data-cta="talk-to-sales"
              className="shrink-0 bg-foreground text-hirex-bg2 font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Talk to Sales →
            </button>
          </div>
        </div>
      </section>

      {/* SECURE PAYMENTS + COMPLIANCE STRIP */}
      <section className="py-[56px] bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[1080px]">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-hirex-surface border border-border rounded-2xl p-6 md:p-7">
              <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-3">
                Secure payments
              </div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1.5 rounded-full bg-hirex-bg2 border border-border text-sm font-display font-bold">
                  Razorpay
                </span>
                <span className="px-3 py-1.5 rounded-full bg-hirex-bg2 border border-border text-sm font-display font-bold">
                  Stripe
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-hirex-text2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-hirex-bg2 border border-border">💳 Visa</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-hirex-bg2 border border-border">💳 Mastercard</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-hirex-bg2 border border-border">💳 Amex</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-hirex-bg2 border border-border">📱 UPI</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-hirex-bg2 border border-border">🏦 NetBanking</span>
              </div>
            </div>
            <div className="bg-hirex-surface border border-border rounded-2xl p-6 md:p-7">
              <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-3">
                Compliance · Privacy
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-hirex-text2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-hirex-bg2 border border-border">🔒 DPDP Act 2023</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-hirex-bg2 border border-border">🛡️ SOC2 Type II</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-hirex-bg2 border border-border">🌐 GDPR</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-hirex-bg2 border border-border">🔐 256-bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLAPSED CREDITS EXPLAINER */}
      <section className="py-[72px] max-md:py-[56px]">
        <div className="container max-w-[1080px]">
          <details className="group bg-hirex-surface border border-border rounded-2xl p-6 md:p-8">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-1">
                  Optional · How credits work
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold">
                  One currency. Three weight classes. <span className="grad-text-cyan italic">Zero surprises.</span>
                </h3>
              </div>
              <ChevronDown className="h-6 w-6 text-hirex-text2 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-hirex-text2 text-base leading-relaxed mb-6">
                Every action in HireX has a published credit cost — visible before you click. Light actions are nearly free. Heavy actions cost more because they cost us more.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {CREDIT_CATEGORIES.map((cat) => (
                  <div key={cat.badge} className={`rounded-xl p-5 border ${cat.border} ${cat.bg}`}>
                    <div className={`inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-hirex-surface ${cat.color} mb-3`}>
                      {cat.badge}
                    </div>
                    <div className={`font-display text-3xl font-extrabold ${cat.color} mb-3`}>{cat.range}</div>
                    <ul className="space-y-2">
                      {cat.items.map(([n, c]) => (
                        <li key={n} className="flex justify-between text-xs border-b border-border pb-1.5 last:border-0">
                          <span className="text-hirex-text2">{n}</span>
                          <span className={`font-mono font-bold ${cat.color}`}>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* REFUEL PACKS — compact, lower priority */}
      <section className="py-[56px] bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[1080px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div>
              <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-2">
                Need more credits?
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold">
                Refuel packs — <span className="grad-text-cyan italic">add-on, never replace</span> a plan.
              </h3>
            </div>
            <p className="text-sm text-hirex-text2 max-w-[420px]">
              Top up any active subscription. Refuel credits never expire while your plan is active.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {REFUEL_PACKS.map((p) => (
              <div
                key={p.id}
                className={`rounded-xl p-5 border bg-hirex-surface flex flex-col ${
                  p.best ? "border-accent/40" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-display font-bold text-base">{p.name}</div>
                  {p.best && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/15 text-accent">
                      Best value
                    </span>
                  )}
                </div>
                <div className="text-xs text-hirex-text3 mb-3">{p.credits}</div>
                <div className="font-display text-2xl font-extrabold mb-1">{p.price}</div>
                <div className="text-xs text-hirex-text2 mb-4">{p.note}</div>
                <button
                  data-plan={`refuel-${p.id}`}
                  data-cta="buy-now"
                  onClick={() => startRazorpayCheckout({ planId: `refuel-${p.id}` })}
                  className="mt-auto w-full py-2.5 rounded-full font-semibold text-sm bg-foreground text-hirex-bg2 hover:opacity-90 transition-opacity"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPI QR — alt payment */}
      <section id="upi-pay" className="py-[72px] max-md:py-[56px]">
        <div className="container max-w-[1080px]">
          <div className="grid lg:grid-cols-2 gap-10 items-center bg-hirex-surface border border-border rounded-2xl p-8 md:p-10">
            <div>
              <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-3">
                Alternative payment
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold leading-tight tracking-tight mb-4">
                Pay via UPI from <span className="grad-text-cyan italic">any app.</span>
              </h3>
              <p className="text-hirex-text2 text-base leading-relaxed mb-4">
                Scan the QR with GPay, PhonePe, Paytm, or any UPI app. After paying, email your transaction ID and chosen plan to{" "}
                <a href="mailto:care@gethirex.space" className="text-hirex-primary-light font-semibold">
                  care@gethirex.space
                </a>{" "}
                — we'll activate your plan within 1 business hour.
              </p>
              <p className="text-xs text-hirex-text3">
                Prefer a hand-held checkout? Use the Buy Now buttons above for instant Razorpay activation.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={razorpayUpiQr}
                alt="HireX Razorpay UPI QR code"
                className="w-full max-w-[280px] rounded-xl border border-border bg-white p-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[72px] max-md:py-[56px] bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[820px]">
          <div className="text-center mb-10">
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-3">FAQ</div>
            <h2 className="font-display text-[clamp(26px,4vw,38px)] font-extrabold leading-[1.1] tracking-tight">
              Quick answers <span className="grad-text-cyan italic">before you buy.</span>
            </h2>
          </div>
          <div>
            {FAQS.map(([q, a], i) => (
              <FaqItem key={q} q={q} a={a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-[80px] max-md:py-[64px]">
        <div className="container max-w-[880px]">
          <div className="text-center bg-gradient-to-br from-hirex-cyan/10 via-hirex-surface to-hirex-surface border border-hirex-cyan/30 rounded-2xl p-10 md:p-14">
            <Briefcase className="h-10 w-10 text-hirex-cyan mx-auto mb-4" />
            <h2 className="font-display text-[clamp(28px,4.5vw,44px)] font-extrabold leading-[1.1] tracking-tight mb-4">
              Ready to <span className="grad-text-cyan italic">make a decision?</span>
            </h2>
            <p className="text-hirex-text2 text-base md:text-lg leading-relaxed max-w-[560px] mx-auto mb-8">
              Buy a candidate or Scale Fast plan instantly, or book a 20-minute demo to see HireX run on your roles.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center bg-gradient-to-r from-hirex-cyan to-hirex-primary-light text-primary-foreground font-bold text-sm md:text-base px-7 py-3.5 rounded-full hover:scale-[1.03] transition-transform shadow-[0_8px_24px_hsla(202,72%,59%,0.35)]"
              >
                Buy Now →
              </a>
              <button
                onClick={openCalendly}
                data-cta="book-demo"
                className="inline-flex items-center justify-center bg-hirex-surface border border-hirex-border2 text-foreground font-bold text-sm md:text-base px-7 py-3.5 rounded-full hover:border-hirex-cyan/40 transition-colors"
              >
                Book Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
