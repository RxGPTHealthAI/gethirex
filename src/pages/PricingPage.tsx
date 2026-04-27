import { useEffect, useMemo, useState } from "react";
import { Check, Lock, X, ChevronDown, Zap, Shield, Sparkles } from "lucide-react";
import CTAStrip from "@/components/CTAStrip";
import { initiateRazorpayPayment, startRazorpayCheckout } from "@/lib/razorpay";
import razorpayUpiQr from "@/assets/razorpay-upi-qr.jpeg";

// ---------- Pricing data ----------
type Billing = "monthly" | "annual";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    monthly: 999,
    annual: 749,
    anchor: "3 AI agents to get search-ready.",
    credits: "150",
    creditsLabel: "credits / month",
    features: [
      "ResumeReviver, JobScout, CareerPilot",
      "3 resume rewrites + 5 text mock interviews",
      "JobScout scans up to 100 relevant roles/day",
      "Email support · 24h response",
      "Refuel anytime · credits never expire while subscription is active",
    ],
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 2499,
    annual: 1874,
    anchor: "5 performance agents for active job hunting.",
    credits: "450",
    creditsLabel: "credits / month",
    features: [
      "ResumeReviver, JobScout, CareerPilot, CodeCoach, InterviewPro",
      "20 resume rewrites + 10 text mock interviews",
      "2 voice mock interviews / month",
      "50 LinkedIn auto-applies / month",
      "1-month subscription credit rollover",
      "Priority email support · 8h response",
    ],
    featured: true,
  },
  {
    id: "ultimate",
    name: "Ultimate",
    monthly: 4999,
    annual: 3749,
    anchor: "All 6 AI agents for full-stack search, interview, and negotiation support.",
    credits: "1,500",
    creditsLabel: "credits / month",
    features: [
      "ResumeReviver, JobScout, CodeCoach, InterviewPro, CareerPilot, OfferNinja",
      "60 resume rewrites + unlimited text mock interviews",
      "20 voice mocks / month + Whisper Coach",
      "500 LinkedIn auto-applies / month",
      "2-month subscription credit rollover + best refuel rate",
      "WhatsApp + email support · 4h response",
    ],
    featured: false,
  },
];

const TRUSTED_LOGOS = ["Postman", "Notion", "Vercel", "Linear", "Ramp", "Monzo", "Wise"];

const RESULTS = [
  { num: "67%", desc: "faster time-to-hire vs traditional ATS + job boards" },
  { num: "₹18K", desc: "average monthly tooling spend replaced (per employer)" },
  { num: "3.4x", desc: "more interview calls for candidates in first 30 days" },
  { num: "11d", desc: "median time-to-offer (vs 34 day industry baseline)" },
];

const PRESS_LOGOS = ["YourStory", "Inc42", "Entrackr", "The Ken", "Moneycontrol", "ET BrandEquity", "Product Hunt"];

const CREDIT_CATEGORIES = [
  {
    badge: "Light · 1–3 credits",
    range: "1–3",
    color: "text-hirex-success",
    border: "border-hirex-success/30",
    bg: "bg-hirex-success/5",
    items: [
      ["Chat with any agent", "1 cr"],
      ["ATS resume scan", "2 cr"],
      ["Cover letter", "3 cr"],
      ["Strategy memo", "3 cr"],
      ["Salary lookup", "3 cr"],
    ],
  },
  {
    badge: "Medium · 5–10 credits",
    range: "5–10",
    color: "text-hirex-cyan",
    border: "border-hirex-cyan/30",
    bg: "bg-hirex-cyan/5",
    items: [
      ["Pull 10 jobs", "5 cr"],
      ["Code problem", "5 cr"],
      ["Text mock interview", "8 cr"],
      ["Auto-apply (1 job)", "8 cr"],
      ["Resume rewrite", "10 cr"],
    ],
  },
  {
    badge: "Heavy · 20–30 credits",
    range: "20–30",
    color: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/5",
    items: [
      ["Voice mock (10 min)", "20 cr"],
      ["Voice negotiation", "25 cr"],
      ["Voice code review", "25 cr"],
      ["Voice mock (15 min)", "30 cr"],
      ["Live whisper coach", "30 cr"],
    ],
  },
];

const ACTION_TABLE = {
  light: [
    ["Chat with any agent (1 message)", 1, "~₹0.40 of API · vs free in ChatGPT"],
    ["Resume ATS quick-scan", 2, "vs premium ATS features ₹850/mo"],
    ["Cover letter generation", 3, "vs ₹500–₹1,000/letter from writers"],
    ["CareerPilot strategy memo", 3, "vs ₹2,500/session career coach"],
  ],
  medium: [
    ["JobScout — pull 10 jobs", 5, "vs resume database ₹3–8L/yr"],
    ["Code problem walkthrough", 5, "vs LeetCode Premium ₹2,800/yr"],
    ["InterviewPro — text mock (15 min)", 8, "vs ₹999/session human coach"],
    ["JobScout — auto-apply (1 job)", 8, "vs ₹500–₹2,500/hire on job boards"],
    ["Resume full rewrite", 10, "vs ₹6,000 professional resume services"],
    ["LinkedIn profile audit + rewrite", 10, "vs ₹2,999 done-for-you services"],
  ],
  heavy: [
    ["InterviewPro — voice mock (10 min)", 20, "vs ₹1,999/session ex-FAANG recruiter"],
    ["OfferNinja — voice negotiation", 25, "vs ₹4,999 negotiation coaches"],
    ["CodeCoach — voice review (10 min)", 25, "vs ₹3,000+ live tutors"],
    ["InterviewPro — voice mock (15 min)", 30, "vs LinkedIn Recruiter Lite ₹14,000/mo"],
    ["Real-time whisper interview coach", 30, "premium feature · not available elsewhere"],
  ],
};

const REFUEL_PACKS = [
  { id: "mini", icon: "⛽", name: "Mini Refuel", credits: "100 credits · ₹2.99 per credit", price: "₹299", note: "Quick top-up for 1–2 voice mocks", best: false },
  { id: "power", icon: "⚡", name: "Power Refuel", credits: "300 credits · ₹2.66 per credit", price: "₹799", note: "Save 11% vs Mini · sweet spot", best: false },
  { id: "mega", icon: "🚀", name: "Mega Refuel", credits: "1,000 credits · ₹2.30 per credit", price: "₹2,299", note: "Save 23% vs Mini · power user pick", best: true },
];

const TESTIMONIALS = [
  { stars: 5, quote: "After 4 weeks we cancelled our LinkedIn Recruiter and Greenhouse subs. HIREX did 90% of what they promised on day one. The pay-per-action model dropped our spend 40% even as we 2x'd hiring volume.", name: "Allison Brooks", role: "Head of Talent · Series-B SaaS, San Francisco", tag: "Business Plan · Employer", featured: true },
  { stars: 5, quote: "We replaced Greenhouse and an Indeed sponsored-post budget with HIREX. Saved $4,800/month. The AI screened 200 applicants in 4 hours.", name: "James Mitchell", role: "VP People · Series-B Startup, New York", tag: "Business Plan · Employer" },
  { stars: 5, quote: "The credit model is honestly brilliant. I paid for exactly what I used during my job search — nothing more. When I landed my role at a YC company, I just cancelled. No guilt, no lock-in.", name: "Daniel O'Connor", role: "Product Manager · Manchester, UK", tag: "Starter Plan · Candidate" },
  { stars: 5, quote: "The whisper coach during my Stripe loop helped me stay calm under pressure. I got the offer. $59/month for that kind of edge is insane ROI when the role pays $185k base.", name: "Maya Rodriguez", role: "Senior PM · Seattle, WA", tag: "Ultimate Plan · Candidate" },
  { stars: 5, quote: "We hired 8 engineers in 6 weeks with a 2-person talent team. Last year that would've taken a quarter and two contract recruiters.", name: "Nathan Patel", role: "COO · SaaS startup, Boston", tag: "Scale Fast Plan · Employer" },
  { stars: 5, quote: "The salary benchmark saved me from underselling myself by $22K on base. The cover-letter agent is scarily good — I got a callback from a company that ghosted me twice.", name: "Rachel Thompson", role: "Data Analyst · Edinburgh, UK", tag: "Pro Plan · Candidate" },
];

const EMPLOYER_TIERS = [
  {
    name: "Scale Fast",
    tagline: "Startups · 10–50 employees",
    price: "₹9,999",
    period: "per month",
    anchor: "vs Zoho ₹12K + job boards ₹8K = ₹20,250/mo",
    stats: [["5", "of 27 agents"], ["1,500", "credits/mo"]],
    features: ["10 active roles · 500 DB searches/mo", "Recruitment + Onboarding modules", "Limited voice screening", "Zapier integration · email support", "₹0 implementation · monthly billing"],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    name: "Business",
    tag: "Most Popular",
    tagline: "Mid-market · 50–500 employees",
    price: "₹29,999",
    period: "per month",
    anchor: "vs Cutshort ₹30,000/mo (matching engine only)",
    stats: [["15", "of 27 agents"], ["6,000", "credits/mo"]],
    features: ["50 active roles · 5,000 DB searches", "5 of 8 modules: +L&D, Performance", "Full voice interview bot · SSO", "20 native integrations + REST API", "Pooled CSM · ₹49,999 one-time setup"],
    cta: "Book Demo",
    featured: true,
  },
  {
    name: "Enterprise",
    tagline: "500+ · multi-geo",
    price: "₹99,999+",
    period: "per month, custom",
    anchor: "vs Workday $80 PEPM + ₹5L impl + lock-in",
    stats: [["All 27", "agents"], ["25K+", "credits/mo"]],
    features: ["Unlimited roles · all 8 modules", "Custom agent builds · white-label option", "SOC2 · DPDP · GDPR full audit", "Dedicated CSM · 24/7 SLA", "Multi-currency · multi-country payroll"],
    cta: "Talk to Sales",
    featured: false,
  },
];

const COMPARISON_ROWS = [
  ["Pricing model", "Pay per listing · per click · per seat", "Pay per agent action · credits"],
  ["Cost predictability", "CPC auctions · annual lock-ins", "Fixed credit costs · refuel only when needed"],
  ["Who does the work", "Your recruiter does 100% of filtering", "27 agents do 90% of the work"],
  ["Interviewing", "Manual scheduling · ghosting", "InterviewPro screens 24/7 · auto-schedules"],
  ["Time to hire", "30–60 days average", "7–14 days with AI screening"],
  ["Scaling cost", "Hire more recruiters · ₹40K each", "Add credits · agents scale instantly"],
  ["Onboarding · L&D · Compliance", "Not included · separate tools needed", "All 8 modules in one platform"],
];

const VS_TABLE = [
  { name: "HIREX", tag: "★ Recommended", price: "₹1,874", priceSub: "/mo · Pro annual", coverage: "27 AI agents · sourcing, screening, interviews, offers, onboarding, L&D, compliance, payroll — in one platform.", agents: "✓", payUse: "✓", allInOne: "✓", us: true },
  { name: "LinkedIn Recruiter", tag: "Microsoft", price: "₹9,999", priceSub: "/seat · annual only", coverage: "InMail credits + search filters. Sourcing only.", agents: "✗", payUse: "✗", allInOne: "✗" },
  { name: "Indeed Sponsored", tag: "CPC auction", price: "₹18,000+", priceSub: "/mo · typical CPC spend", coverage: "Pay per click on listings. No screening, scheduling, or pipeline tools.", agents: "✗", payUse: "~", allInOne: "✗" },
  { name: "HireVue", tag: "US enterprise", price: "$35,000+", priceSub: "/yr · ~₹2.4L /mo", coverage: "Async video interviews + AI scoring. No sourcing, no payroll, no L&D.", agents: "~", payUse: "✗", allInOne: "✗" },
  { name: "Eightfold AI", tag: "Talent intel", price: "$60,000+", priceSub: "/yr · ~₹4.1L /mo", coverage: "Talent-graph search + matching. Sales-led only.", agents: "~", payUse: "✗", allInOne: "✗" },
  { name: "Cutshort", tag: "India SaaS", price: "₹12,500", priceSub: "/mo · Premium", coverage: "Curated tech sourcing + chat. Limited automation.", agents: "✗", payUse: "✗", allInOne: "✗" },
  { name: "Zoho Recruit", tag: "ATS", price: "₹2,800", priceSub: "/user/mo · Enterprise", coverage: "Per-user ATS workflow. Add-ons cost extra.", agents: "✗", payUse: "✗", allInOne: "~" },
  { name: "Greenhouse", tag: "US enterprise", price: "$6,500+", priceSub: "/yr · ~₹45K /mo", coverage: "Full-featured ATS. Sourcing, AI screening require integrations.", agents: "✗", payUse: "✗", allInOne: "~" },
  { name: "Recruiter \"stack\"", tag: "DIY 5-tool combo", price: "₹45,000+", priceSub: "/mo · typical SMB stack", coverage: "LinkedIn + ATS + screener + scheduler + payroll bolted together. 5 logins, 5 invoices.", agents: "✗", payUse: "✗", allInOne: "✗" },
];

const FAQS = [
  ["What is HIREX and how does it work?", "HIREX is an AI hiring platform with 27 specialized agents that handle sourcing, screening, scheduling, interviewing, offers, onboarding, L&D, and compliance — in one dashboard. Instead of paying per seat or per listing, you buy credits and only spend them when an agent actually completes work for you. Refuel credits when you need more; they never expire."],
  ["How much does HIREX cost?", "Candidate pricing starts at ₹999/month for Starter, ₹2,499/month for Pro, and ₹4,999/month for Ultimate. Employer plans start at ₹9,999/month and scale by hiring volume. Refuel packs start at ₹299. There are no setup fees, no per-user seat charges, and no annual lock-in on monthly plans. Trials require no credit card."],
  ["How is HIREX different from LinkedIn Recruiter?", "LinkedIn Recruiter is a sourcing tool — InMails and search filters, billed per seat per year. HIREX includes sourcing plus screening, interview scheduling, AI interviews, offer letters, onboarding, payroll, and compliance in one platform, billed by usage. Most customers replace LinkedIn Recruiter and 1–2 other tools when they switch, cutting their hiring stack spend by 40–68%."],
  ["How does HIREX compare to Greenhouse, Lever, or Workable?", "Those are applicant tracking systems — they organize the pipeline but don't do the hiring work. HIREX is an AI hiring platform: agents source, screen, and interview candidates, then move them through the pipeline."],
  ["Is HIREX better than HireVue or Eightfold for AI interviews?", "HireVue and Eightfold are enterprise-only with $35,000+ annual contracts. HIREX delivers similar AI interview, scoring, and ranking capability for under ₹5,000/month — self-serve, no contract, with a free trial."],
  ["Do my credits roll over each month?", "Subscription credits reset monthly on Starter. Pro plans roll over 1 month of unused credits. Ultimate rolls over 2 months. Refuel pack credits never expire as long as your subscription is active."],
  ["What happens if I run out of credits mid-month?", "You'll get a soft warning at 80% usage with a one-tap refuel option. You can also upgrade your tier mid-cycle (pro-rated). There is never an automatic overage charge."],
  ["Can I cancel HIREX anytime?", "Yes. Monthly plans cancel from your dashboard at the next billing cycle — two clicks, no calls. Annual plans get a prorated refund within the first 30 days."],
  ["What's the difference between monthly and annual billing?", "Annual plans cost 25% less per month — equivalent to 3 months free — and lock in your rate for the full term. The feature set is identical."],
  ["Is HIREX available in the US, UK, and Europe?", "Yes. HIREX is used by 1,200+ teams across India, the United States, the United Kingdom, and the EU. US and UK customers can sign up today and pay via Stripe in their local currency."],
  ["Which integrations does HIREX support?", "Slack, Microsoft Teams, Google Calendar, Outlook, Gmail, Zoom, Google Meet, Greenhouse, Lever, Workday, Zoho Recruit, BambooHR, DocuSign, Stripe, and 40+ other tools natively. Zapier and REST API on Pro plans and above."],
  ["How long does migration from another ATS take?", "Most teams complete migration in 48 hours. We import your roles, candidates, pipelines, notes, and stage history from Greenhouse, Lever, Workday, Zoho Recruit, Cutshort, and BambooHR for free."],
  ["Is my candidate data secure and compliant?", "HIREX is SOC 2 Type II certified, GDPR compliant for EU and UK, and DPDP Act 2023 compliant for India. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We do not train models on your data."],
  ["How accurate are the AI interviews and screening?", "In benchmarks against human recruiters, HIREX agents agreed with the human decision 91% of the time on screening calls and 87% on technical interviews. Every AI decision is fully auditable."],
  ["Why credits instead of per-seat licensing?", "Hiring is bursty. Per-seat pricing punishes you for slow quarters and forces upgrades during busy ones. Credits flex with reality — you pay for the work the agents actually do."],
  ["Can I try HIREX without a credit card?", "Yes. Every plan starts with a 7-day full-access trial, no credit card required. You get 100 trial credits to use across any of the 27 agents."],
];

const OBJECTIONS = [
  ["\"What if my team doesn't actually use it?\"", "You get full white-glove onboarding in week one — a real human walks your recruiters through their first 5 hires. We measure adoption weekly. If usage stalls in month one, your CSM rebuilds the workflow with you at no cost."],
  ["\"I'm already locked into Zoho, Cutshort, or a legacy job board.\"", "Most of our customers were too. Migration is free and takes 48 hours — we move your roles, candidates, pipelines, and notes. Run HIREX in parallel for 14 days, then cancel the legacy tool only after you're sure."],
  ["\"Will the AI actually be good enough for senior roles?\"", "For SDR / engineer / designer roles up to senior IC — yes, full autonomy. For director+ roles, the agents do sourcing, screening, and scheduling; you do the final judgement call."],
  ["\"Credit pricing sounds great until I run out.\"", "You get a soft warning at 80% usage and a one-tap refuel option. No automatic overage charges — ever. Refuel packs start at ₹299 (100 credits) and never expire."],
];

const TICKER_EVENTS = [
  { text: "Rohan from Bangalore", action: "just ordered the Ultimate Plan" },
  { text: "Sophie", action: "just finished her live demo" },
  { text: "Priya from London", action: "just upgraded to Pro" },
  { text: "Marcus from NY", action: "just unlocked the Career Pilot Squad" },
  { text: "Elena from Berlin", action: "just signed up for the 7-day trial" },
];

// ---------- Activity Ticker ----------
const ActivityTicker = () => {
  const [event, setEvent] = useState<{ text: string; action: string } | null>(null);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;
    let hideTimer: ReturnType<typeof setTimeout>;
    const show = () => {
      const e = TICKER_EVENTS[Math.floor(Math.random() * TICKER_EVENTS.length)];
      setEvent(e);
      setVisible(true);
      hideTimer = setTimeout(() => setVisible(false), 5000);
    };
    const initial = setTimeout(show, 1500);
    const interval = setInterval(show, 10000);
    return () => {
      clearTimeout(initial);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, [closed]);

  if (closed || !event) return null;

  return (
    <div
      className={`fixed left-4 bottom-24 md:bottom-6 z-40 max-w-[340px] w-[calc(100%-2rem)] transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="glass-card rounded-xl p-3.5 flex items-start gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hirex-success opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-hirex-success" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-snug text-foreground">
            <strong className="font-semibold">{event.text}</strong> {event.action}
          </p>
          <p className="text-[11px] mt-0.5 font-mono text-hirex-text3">Just now</p>
        </div>
        <button onClick={() => setClosed(true)} className="text-hirex-text3 hover:text-foreground transition-colors" aria-label="Dismiss notification">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// ---------- Sticky Checkout Bar ----------
const StickyCheckoutBar = ({ price, planLabel, billing }: { price: number; planLabel: string; billing: "monthly" | "annual" }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}>
      <div className="bg-hirex-bg2/95 backdrop-blur-xl border-t border-hirex-border2">
        <div className="container max-w-[1280px] flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="text-sm md:text-base font-semibold truncate">
              Start your 7-day trial · <span className="grad-text-cyan">{planLabel}</span>
            </p>
            <p className="text-xs text-hirex-text2 hidden sm:block">
              ₹{price.toLocaleString("en-IN")}/{billing === "annual" ? "mo (billed yearly)" : "mo"} · No card required · Cancel anytime
            </p>
          </div>
          <button
            data-plan={planLabel.toLowerCase()}
            data-price={price}
            data-billing={billing}
            onClick={() => startRazorpayCheckout({ planId: planLabel.toLowerCase(), billing })}
            className="shrink-0 bg-gradient-to-r from-hirex-cyan to-hirex-primary-light text-primary-foreground font-bold text-sm md:text-base px-5 md:px-7 py-3 rounded-full hover:scale-[1.03] transition-transform shadow-[0_8px_24px_hsla(202,72%,59%,0.35)]"
          >
            Start 7-Day Trial →
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- Calculator ----------
const Calculator = () => {
  const [rewrites, setRewrites] = useState(5);
  const [textMocks, setTextMocks] = useState(5);
  const [voiceMocks, setVoiceMocks] = useState(3);
  const [applies, setApplies] = useState(20);

  const total = rewrites * 10 + textMocks * 8 + voiceMocks * 30 + applies * 8;
  const recommendation = useMemo(() => {
    if (total <= 150) return { tier: "Starter", price: "₹999/mo with 150 credits", note: "covers you with buffer." };
    if (total <= 450) return { tier: "Pro", price: "₹2,499/mo with 450 credits", note: "covers you with buffer." };
    if (total <= 1500) return { tier: "Ultimate", price: "₹4,999/mo with 1,500 credits", note: "is the right fit." };
    return { tier: "Ultimate + Refuel", price: "₹4,999/mo + Mega Refuel pack", note: "covers heavy usage." };
  }, [total]);

  const Slider = ({ label, value, setValue, max, cost }: { label: string; value: number; setValue: (n: number) => void; max: number; cost: number }) => (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm text-hirex-text2">
          {label} <span className="text-accent">({cost} cr each)</span>
        </label>
        <span className="font-display font-bold text-lg grad-text-cyan">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-hirex-cyan"
      />
    </div>
  );

  return (
    <section className="py-[100px] max-md:py-[72px] bg-hirex-bg3 border-y border-border">
      <div className="container max-w-[1280px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">03 — Try the math</div>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight mb-5">
              How much fuel<br />
              <span className="grad-text-cyan italic">do you need?</span>
            </h2>
            <p className="text-hirex-text2 text-lg leading-relaxed">
              Adjust your typical monthly usage. We'll recommend the right tier — and tell you when refuel makes more sense than upgrading.
            </p>
          </div>
          <div className="bg-hirex-surface border border-border rounded-2xl p-8">
            <Slider label="Resume rewrites" value={rewrites} setValue={setRewrites} max={60} cost={10} />
            <Slider label="Text mock interviews" value={textMocks} setValue={setTextMocks} max={50} cost={8} />
            <Slider label="Voice mock interviews" value={voiceMocks} setValue={setVoiceMocks} max={30} cost={30} />
            <Slider label="Auto-applies to jobs" value={applies} setValue={setApplies} max={200} cost={8} />
            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-xs font-mono uppercase tracking-wider text-hirex-text3 mb-2">You need approximately</div>
              <div className="font-display text-5xl font-extrabold mb-1">
                <span className="grad-text-cyan italic">{total}</span>
                <span className="text-2xl text-hirex-text2 font-normal ml-2">credits/mo</span>
              </div>
              <p className="text-sm text-hirex-text2 mt-3">
                <strong className="text-foreground">Recommendation:</strong> The <strong className="text-accent">{recommendation.tier} ({recommendation.price})</strong> {recommendation.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- FAQ Accordion ----------
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

// ---------- Main Page ----------
const PricingPage = () => {
  const [billing, setBilling] = useState<Billing>("monthly");
  const featuredTier = useMemo(() => TIERS.find((t) => t.featured)!, []);
  const stickyPrice = billing === "annual" ? featuredTier.annual : featuredTier.monthly;

  const markCls = (m: string) =>
    m === "✓" ? "text-hirex-success" : m === "~" ? "text-accent" : "text-destructive";

  return (
    <div className="animate-fade-in pb-24">
      {/* URGENCY BAR */}
      <div className="bg-accent text-accent-foreground text-center py-2 px-4 text-xs font-mono font-bold tracking-wider uppercase sticky top-0 z-[60]">
        ⚡ Limited spots: 7-day free trial · No credit card required · <span className="font-normal italic normal-case tracking-normal">Cancel in 2 clicks</span>
      </div>

      {/* HERO */}
      <section className="pt-[80px] pb-20 bg-hirex-bg2 relative overflow-hidden">
        <div className="absolute -top-[120px] -left-[100px] w-[600px] h-[600px] bg-hirex-cyan/[0.07] rounded-full blur-[100px]" />
        <div className="absolute -bottom-[120px] -right-[100px] w-[500px] h-[500px] bg-accent/[0.06] rounded-full blur-[100px]" />
        <div className="container text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-hirex-cyan/10 border border-hirex-cyan/25 text-hirex-primary-light mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-hirex-cyan shadow-[0_0_12px_hsl(var(--hirex-cyan))]" />
            Pay for the work · not the listing
          </div>
          <h1 className="font-display text-[clamp(40px,7vw,80px)] font-extrabold mb-5 leading-[1.05] tracking-tight">
            The <span className="grad-text-cyan italic font-semibold">Career Pilot Squad.</span>
            <br />
            Six agents. One mission.
          </h1>
        </div>
      </section>

      {/* RESULTS BAR */}
      <section className="py-12 bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[1280px]">
          <p className="text-center text-xs font-mono tracking-[0.15em] uppercase text-hirex-text3 mb-8">
            Aggregate results across 320+ teams · Q1 2026
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {RESULTS.map((r) => (
              <div key={r.num} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-extrabold grad-text-cyan italic mb-2">{r.num}</div>
                <p className="text-sm text-hirex-text2 leading-snug">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE PULSE STRIP */}
      <section className="py-6 bg-hirex-bg2 border-b border-border">
        <div className="container max-w-[1280px] flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-hirex-success animate-pulse" /><strong>2,847</strong> <span className="text-hirex-text2">hires made this month</span></div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent animate-pulse" /><strong>14</strong> <span className="text-hirex-text2">new accounts in the last hour</span></div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-hirex-success animate-pulse" /><strong>1,240+</strong> <span className="text-hirex-text2">teams hiring now</span></div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent animate-pulse" /><strong>₹4.2 Cr</strong> <span className="text-hirex-text2">saved by customers this quarter</span></div>
        </div>
      </section>

      {/* PRESS BAR */}
      <section className="py-10 bg-hirex-bg3 border-b border-border">
        <div className="container max-w-[1280px] flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          <span className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-text3">As featured in</span>
          {PRESS_LOGOS.map((l) => (
            <span key={l} className="font-display font-semibold text-hirex-text2 hover:text-foreground transition-colors">{l}</span>
          ))}
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-12 border-b border-border">
        <div className="container max-w-[1280px]">
          <p className="text-center text-xs font-mono tracking-[0.15em] uppercase text-hirex-text3 mb-2">Trusted by teams at</p>
          <p className="text-center text-sm text-hirex-text2 max-w-[680px] mx-auto mb-8 leading-relaxed">
            Trusted by 1,200+ teams across US startups, AI startups, and global MNCs. From seed-stage startups to Series D unicorns.
          </p>
          <div className="flex items-center justify-center flex-wrap gap-x-10 gap-y-4">
            {TRUSTED_LOGOS.map((logo) => (
              <span key={logo} className="text-lg md:text-xl font-display font-semibold text-hirex-text3 hover:text-foreground transition-colors tracking-tight">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CREDITS EXPLAINER */}
      <section className="py-[100px] max-md:py-[72px]">
        <div className="container max-w-[1280px]">
          <div className="text-center max-w-[760px] mx-auto mb-12">
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">01 — How credits work</div>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight mb-5">
              One currency. Three <span className="grad-text-cyan italic">weight classes.</span> Zero surprises.
            </h2>
            <p className="text-hirex-text2 text-lg leading-relaxed">
              Every action in HIREX has a published credit cost — visible before you click. Light actions are nearly free. Heavy actions cost more because they cost us more. No tokens, no overage charges, no fine print.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {CREDIT_CATEGORIES.map((cat) => (
              <div key={cat.badge} className={`rounded-2xl p-7 border ${cat.border} ${cat.bg}`}>
                <div className={`inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-hirex-surface ${cat.color} mb-5`}>{cat.badge}</div>
                <div className={`font-display text-5xl font-extrabold ${cat.color} mb-1`}>{cat.range}</div>
                <div className="text-xs uppercase tracking-wider text-hirex-text3 font-mono mb-6">credits per action</div>
                <ul className="space-y-3">
                  {cat.items.map(([n, c]) => (
                    <li key={n} className="flex justify-between text-sm border-b border-border pb-2 last:border-0">
                      <span className="text-hirex-text2">{n}</span>
                      <span className={`font-mono font-bold ${cat.color}`}>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL ACTION TABLE */}
      <section className="py-[100px] max-md:py-[72px] bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[1180px]">
          <div className="text-center max-w-[760px] mx-auto mb-12">
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">02 — Full action menu</div>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight mb-5">
              Every action. Every cost. <span className="grad-text-cyan italic">Always visible.</span>
            </h2>
            <p className="text-hirex-text2 text-lg leading-relaxed">
              No usage-based billing surprises. The credit cost shows up in the UI before you confirm. If we ever change a price, you'll see it before it affects you.
            </p>
          </div>
          <div className="bg-hirex-surface border border-border rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[2fr,80px,120px,2fr] gap-4 px-6 py-4 bg-hirex-bg2 border-b border-border text-xs font-mono uppercase tracking-wider text-hirex-text3">
              <div>Action</div><div>Credits</div><div>Class</div><div>What you'd pay elsewhere</div>
            </div>
            {(["light", "medium", "heavy"] as const).map((cls) => (
              <div key={cls}>
                <div className="px-6 py-3 bg-hirex-bg2/50 text-xs font-mono uppercase tracking-wider text-accent border-b border-border">
                  ▸ {cls === "light" ? "Light actions — explore, chat, lookup" : cls === "medium" ? "Medium actions — sourcing, applying, generating" : "Heavy actions — voice, real-time AI"}
                </div>
                {ACTION_TABLE[cls].map(([name, credits, equiv]) => {
                  const dot = cls === "light" ? "bg-hirex-success" : cls === "medium" ? "bg-hirex-cyan" : "bg-accent";
                  return (
                    <div key={String(name)} className="grid grid-cols-1 md:grid-cols-[2fr,80px,120px,2fr] gap-2 md:gap-4 px-6 py-4 border-b border-border last:border-0 text-sm">
                      <div className="font-medium">{name}</div>
                      <div className="font-mono font-bold grad-text-cyan">{credits}</div>
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${dot}`} />
                        <span className="text-xs uppercase tracking-wider font-mono text-hirex-text2 capitalize">{cls}</span>
                      </div>
                      <div className="text-hirex-text2 text-xs md:text-sm">{equiv}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <Calculator />

      {/* TIERS */}
      <section id="candidates" className="py-[100px] max-md:py-[72px]">
        <div className="container max-w-[1280px]">
          <div className="text-center max-w-[760px] mx-auto mb-12">
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">04 — Candidate pricing</div>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight mb-5">
              The <span className="grad-text-cyan italic">Career Pilot Squad.</span> Six agents. One mission.
            </h2>
            <p className="text-hirex-text2 max-w-[620px] mx-auto text-[17px] leading-relaxed mb-8">
              Save 25% with annual billing. Subscribe monthly or annually. Top up with refuel packs anytime.
              Cancel anytime · No annual lock-in · Refuel credits never expire while your subscription is active.
            </p>
            <div className="inline-flex items-center gap-4 bg-hirex-surface border border-hirex-border2 rounded-full p-1.5">
              <button onClick={() => setBilling("monthly")} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${billing === "monthly" ? "bg-foreground text-hirex-bg2" : "text-hirex-text2 hover:text-foreground"}`}>Monthly</button>
              <button onClick={() => setBilling("annual")} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${billing === "annual" ? "bg-foreground text-hirex-bg2" : "text-hirex-text2 hover:text-foreground"}`}>
                Annual
                <span className="bg-accent text-accent-foreground text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">Save 25%</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-lg:max-w-[480px] max-lg:mx-auto">
            {TIERS.map((tier) => {
              const price = billing === "annual" ? tier.annual : tier.monthly;
              return (
                <div key={tier.id} className={`relative rounded-2xl p-8 flex flex-col transition-all hover:-translate-y-1 ${tier.featured ? "bg-gradient-to-br from-hirex-cyan/15 via-hirex-surface to-hirex-surface border-2 border-hirex-cyan/40 lg:-translate-y-3 glow-border-cyan" : "bg-hirex-surface border border-border hover:border-hirex-border2"}`}>
                  {tier.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-[11px] font-bold tracking-wider uppercase whitespace-nowrap shadow-lg">Most Popular</div>
                  )}
                  <div className="font-display text-2xl font-bold mb-2">{tier.name}</div>
                  <div className="font-display text-[44px] font-extrabold leading-none mb-1 tracking-tight">
                    <span className="text-2xl font-semibold align-top mr-1">₹</span>
                    {price.toLocaleString("en-IN")}
                    <span className="text-base font-normal text-hirex-text2 ml-1">/mo</span>
                  </div>
                  {billing === "annual" && <p className="text-xs text-accent font-semibold mb-3">Billed annually · 25% off</p>}
                  <p className="text-sm text-hirex-text2 mb-5 leading-relaxed">{tier.anchor}</p>
                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-border">
                    <span className="font-display text-3xl font-bold grad-text-cyan">{tier.credits}</span>
                    <span className="text-xs text-hirex-text3 uppercase tracking-wider font-mono">{tier.creditsLabel}</span>
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
                    onClick={() => startRazorpayCheckout({ planId: tier.id, billing })}
                    className={`w-full text-center py-3.5 rounded-full font-bold text-sm transition-all hover:scale-[1.02] ${tier.featured ? "bg-gradient-to-r from-hirex-cyan to-hirex-primary-light text-primary-foreground shadow-[0_8px_24px_hsla(202,72%,59%,0.35)]" : "bg-foreground text-hirex-bg2 hover:bg-hirex-cyan hover:text-primary-foreground"}`}
                  >
                    Start 7-Day Trial →
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-xs text-hirex-text3 mt-4">
                    <Lock className="h-3 w-3" />
                    7-day money-back · no card required
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REFUEL PACKS */}
      <section id="refuel" className="py-[100px] max-md:py-[72px] bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[1280px]">
          <div className="grid lg:grid-cols-2 gap-10 items-end mb-12">
            <div>
              <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">05 — Refuel anytime</div>
              <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight">
                Run out of credits?<br />
                <span className="grad-text-cyan italic">Refuel in one tap.</span>
              </h2>
            </div>
            <p className="text-hirex-text2 leading-relaxed">
              This is the part legacy job boards can't copy. <strong className="text-foreground">Refuel credits never expire</strong> while your subscription is active. Buy a Mega Refuel today, use it six months from now during your next job switch. UPI checkout. No questions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REFUEL_PACKS.map((p) => (
              <div key={p.id} className={`relative rounded-2xl p-7 border ${p.best ? "bg-gradient-to-br from-accent/15 via-hirex-surface to-hirex-surface border-2 border-accent/40" : "bg-hirex-surface border-border"}`}>
                {p.best && <div className="absolute -top-3 right-6 px-3 py-1 bg-accent text-accent-foreground rounded-full text-[10px] font-bold uppercase tracking-wider">Best value</div>}
                <div className="text-3xl mb-3">{p.icon}</div>
                <div className="font-display text-xl font-bold mb-1">{p.name}</div>
                <div className="text-xs text-hirex-text2 font-mono mb-4">{p.credits}</div>
                <div className="font-display text-3xl font-extrabold mb-1">{p.price}</div>
                <div className="text-xs text-hirex-text3 mb-4">one-time</div>
                <p className="text-sm text-hirex-text2 mb-6">{p.note}</p>
                <button onClick={() => initiateRazorpayPayment(`refuel-${p.id}`)} className="w-full py-3 rounded-full font-bold text-sm bg-foreground text-hirex-bg2 hover:bg-accent hover:text-accent-foreground transition-colors">
                  Buy {p.name.split(" ")[0]} Pack
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAY VIA UPI QR */}
      <section id="upi-pay" className="py-[100px] max-md:py-[72px]">
        <div className="container max-w-[1280px]">
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-hirex-surface border border-border rounded-3xl p-10 max-md:p-7">
            <div>
              <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">
                Prefer UPI? · Powered by Razorpay
              </div>
              <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-extrabold leading-[1.1] tracking-tight mb-5">
                Scan & pay with any <span className="grad-text-cyan italic">UPI app.</span>
              </h2>
              <p className="text-hirex-text2 leading-relaxed mb-6">
                Pay your subscription or refuel pack instantly using GPay, PhonePe, Paytm, BHIM, or any UPI-enabled bank app. After payment, email your transaction ID to{" "}
                <a href="mailto:customersupport@gethirex.space" className="text-accent underline underline-offset-4">customersupport@gethirex.space</a>{" "}
                and we'll activate your plan within minutes.
              </p>
              <ul className="space-y-3 text-sm text-hirex-text2">
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-accent mt-0.5 shrink-0" /> Instant, no card required</li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-accent mt-0.5 shrink-0" /> Secure 256-bit encrypted via Razorpay</li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-accent mt-0.5 shrink-0" /> Works with every Indian UPI app</li>
              </ul>
              <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-hirex-text3 mt-7">
                Merchant · Infinitum-Core-AI Private Limited
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-[340px] w-full">
                <img
                  src={razorpayUpiQr}
                  alt="Razorpay UPI QR code to pay HireX subscription via GPay, PhonePe, Paytm or BHIM"
                  className="w-full h-auto rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-[100px] max-md:py-[72px]">
        <div className="container max-w-[1280px]">
          <div className="text-center max-w-[760px] mx-auto mb-12">
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">06 — What they're saying</div>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight">
              Real people. Real <span className="grad-text-cyan italic">results.</span>
            </h2>
          </div>

          {/* Rating summary */}
          <div className="bg-hirex-surface border border-border rounded-2xl p-8 mb-10 grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="font-display text-6xl font-extrabold grad-text-cyan">4.9</div>
              <div className="text-accent text-xl tracking-widest">★★★★★</div>
              <div className="text-xs text-hirex-text2 mt-1">320+ reviews</div>
            </div>
            <div className="space-y-2">
              {[["5 ★", 88], ["4 ★", 8], ["3 ★", 3], ["1–2 ★", 1]].map(([l, w]) => (
                <div key={l as string} className="flex items-center gap-3 text-xs">
                  <span className="w-10 text-hirex-text2">{l}</span>
                  <div className="flex-1 h-1.5 bg-hirex-bg2 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-hirex-cyan to-accent" style={{ width: `${w}%` }} />
                  </div>
                  <span className="w-8 text-right text-hirex-text2 font-mono">{w}%</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <div>★★★★★ <strong>4.9</strong> · Product Hunt</div>
              <div>★★★★★ <strong>4.8</strong> · G2</div>
              <div>★★★★★ <strong>4.9</strong> · Capterra</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className={`rounded-2xl p-6 flex flex-col ${t.featured ? "bg-gradient-to-br from-hirex-cyan/15 via-hirex-surface to-hirex-surface border-2 border-hirex-cyan/40 md:col-span-2 lg:col-span-1" : "bg-hirex-surface border border-border"}`}>
                <div className="text-accent tracking-widest text-sm mb-3">★★★★★</div>
                <p className="text-sm text-hirex-text2 leading-relaxed flex-1 mb-4">"{t.quote}"</p>
                <div className="pt-4 border-t border-border">
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-hirex-text3">{t.role}</div>
                  <div className="text-[10px] mt-2 font-mono uppercase tracking-wider text-accent">{t.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMPLOYER SECTION */}
      <section id="employers" className="py-[100px] max-md:py-[72px] bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[1280px]">
          <div className="text-center max-w-[760px] mx-auto mb-12">
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">07 — For employers</div>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight mb-5">
              Your <span className="grad-text-cyan italic">autonomous HR department.</span>
              <br />27 agents. 8 modules. One bill.
            </h2>
            <p className="text-hirex-text2 text-lg">
              Replace the legacy stack — Zoho, Cutshort, LinkedIn Recruiter — with one credit-based platform that doesn't charge per seat or per job post.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 items-stretch max-lg:max-w-[480px] max-lg:mx-auto">
            {EMPLOYER_TIERS.map((t) => (
              <div key={t.name} className={`relative rounded-2xl p-8 flex flex-col ${t.featured ? "bg-gradient-to-br from-accent/15 via-hirex-surface to-hirex-surface border-2 border-accent/40 lg:-translate-y-3" : "bg-hirex-surface border border-border"}`}>
                {t.featured && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-[11px] font-bold tracking-wider uppercase">{t.tag}</div>}
                <div className="font-display text-2xl font-bold mb-1">{t.name}</div>
                <div className="text-xs text-hirex-text3 mb-5">{t.tagline}</div>
                <div className="font-display text-4xl font-extrabold tracking-tight mb-1">{t.price}</div>
                <div className="text-xs text-hirex-text2 mb-3">{t.period}</div>
                <p className="text-xs text-accent mb-6 italic">{t.anchor}</p>
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                  {t.stats.map(([n, l]) => (
                    <div key={l}>
                      <div className="font-display text-xl font-bold grad-text-cyan">{n}</div>
                      <div className="text-[10px] uppercase tracking-wider font-mono text-hirex-text3">{l}</div>
                    </div>
                  ))}
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-hirex-text2">
                      <Check className="h-4 w-4 text-hirex-success shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => startRazorpayCheckout({ planId: `employer-${t.name.toLowerCase()}`, billing })} className={`w-full py-3.5 rounded-full font-bold text-sm transition-all hover:scale-[1.02] ${t.featured ? "bg-gradient-to-r from-accent to-hirex-primary-light text-accent-foreground" : "bg-foreground text-hirex-bg2"}`}>
                  {t.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-[100px] max-md:py-[72px]">
        <div className="container max-w-[1180px]">
          <div className="text-center max-w-[760px] mx-auto mb-12">
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">08 — Why credits beat listings</div>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight">
              Old way vs <span className="grad-text-cyan italic">new way.</span>
            </h2>
          </div>
          <div className="bg-hirex-surface border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-hirex-bg2 border-b border-border text-xs font-mono uppercase tracking-wider text-hirex-text3">
              <div>Dimension</div>
              <div>Job Boards · LinkedIn · Legacy ATS</div>
              <div className="text-hirex-cyan">HIREX</div>
            </div>
            {COMPARISON_ROWS.map(([dim, legacy, hx]) => (
              <div key={dim} className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-border last:border-0 text-sm">
                <div className="font-semibold">{dim}</div>
                <div className="text-hirex-text2 line-through opacity-70">{legacy}</div>
                <div className="text-hirex-success">✓ {hx}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPETITOR PRICING SHOWDOWN */}
      <section className="py-[100px] max-md:py-[72px] bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[1280px]">
          <div className="text-center max-w-[760px] mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Verified pricing as of Apr 2026
            </div>
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">09 — HIREX vs the alternatives</div>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight mb-5">
              The same hire. <span className="grad-text-cyan italic">One-fifth the spend.</span>
            </h2>
            <p className="text-hirex-text2">
              We pulled the public pricing of the tools recruiters tell us they're paying for today.
            </p>
          </div>

          <div className="bg-hirex-surface border border-border rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead className="bg-hirex-bg2 border-b border-border">
                <tr className="text-xs font-mono uppercase tracking-wider text-hirex-text3">
                  <th className="text-left px-5 py-4">Platform</th>
                  <th className="text-left px-5 py-4">Monthly cost</th>
                  <th className="text-left px-5 py-4">What's included</th>
                  <th className="text-center px-3 py-4">Agents</th>
                  <th className="text-center px-3 py-4">Pay/use</th>
                  <th className="text-center px-3 py-4">All-in-one</th>
                </tr>
              </thead>
              <tbody>
                {VS_TABLE.map((row) => (
                  <tr key={row.name} className={`border-b border-border last:border-0 ${row.us ? "bg-hirex-cyan/10" : ""}`}>
                    <td className="px-5 py-4">
                      <div className="font-bold">{row.name}</div>
                      <div className="text-[10px] mt-1 font-mono uppercase tracking-wider text-hirex-text3">{row.tag}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-display font-bold">{row.price}</div>
                      <div className="text-[11px] text-hirex-text3">{row.priceSub}</div>
                    </td>
                    <td className="px-5 py-4 text-hirex-text2 text-xs leading-relaxed">{row.coverage}</td>
                    <td className={`px-3 py-4 text-center font-bold text-lg ${markCls(row.agents)}`}>{row.agents}</td>
                    <td className={`px-3 py-4 text-center font-bold text-lg ${markCls(row.payUse)}`}>{row.payUse}</td>
                    <td className={`px-3 py-4 text-center font-bold text-lg ${markCls(row.allInOne)}`}>{row.allInOne}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-hirex-cyan/10 to-accent/10 border border-hirex-cyan/30 rounded-2xl flex flex-col md:flex-row items-center gap-5">
            <Zap className="h-10 w-10 text-accent shrink-0" />
            <div className="flex-1 text-center md:text-left">
              <strong className="block text-lg font-display">Cancel 4 tools. Keep one. Save ₹42K/month on average.</strong>
              <span className="text-sm text-hirex-text2">
                Customers who switched cut their hiring tool spend by an average of <strong className="text-foreground">68%</strong> in the first 90 days. Free migration from any of the platforms above.
              </span>
            </div>
            <a href="#candidates" className="shrink-0 bg-foreground text-hirex-bg2 px-6 py-3 rounded-full font-bold text-sm hover:bg-hirex-cyan hover:text-primary-foreground transition-colors whitespace-nowrap">Switch &amp; save →</a>
          </div>
          <p className="mt-4 text-xs text-hirex-text3 text-center">Pricing sourced from public listings, vendor sales pages, and customer-shared invoices. USD converted at ₹69/USD.</p>
        </div>
      </section>

      {/* FOUNDER CARD */}
      <section className="py-[100px] max-md:py-[72px]">
        <div className="container max-w-[820px]">
          <div className="bg-hirex-surface border border-border rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-hirex-cyan/[0.06] rounded-full blur-[80px]" />
            <div className="relative">
              <span className="inline-block text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">A note from the founder</span>
              <h3 className="font-display text-[clamp(22px,3vw,32px)] font-bold leading-tight mb-5 tracking-tight">
                I built HireX because I was tired of paying ₹45K/month for tools that{" "}
                <span className="grad-text-cyan italic">didn't talk to each other.</span>
              </h3>
              <p className="text-hirex-text2 leading-relaxed mb-4">
                I ran talent at two YC startups. By 2024, our "hiring stack" was: LinkedIn Recruiter for sourcing, an ATS we never finished configuring, a separate screener, scheduler, and payroll provider. Five invoices. Five logins. Five different versions of the candidate's name.
              </p>
              <p className="text-hirex-text2 leading-relaxed mb-4">
                HIREX is the platform I wish I'd had. 27 agents, one credit balance, one dashboard. You only pay when an agent actually does the work — not for seats your team forgot they were paying for.
              </p>
              <p className="text-hirex-text3 text-sm mb-8">If anything on this page is unclear, email me directly. I read every message.</p>
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-hirex-cyan to-accent flex items-center justify-center font-display font-bold text-lg text-primary-foreground shrink-0">SP</div>
                <div>
                  <div className="font-display font-bold text-lg">Sailesh Pattnaik</div>
                  <div className="text-sm text-hirex-text2">Co-founder &amp; CEO, HIREX</div>
                  <a href="mailto:sailesh@gethirex.space" className="text-sm font-mono text-hirex-primary-light hover:text-hirex-cyan transition-colors">sailesh@gethirex.space</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-[100px] max-md:py-[72px] bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[1180px]">
          <div className="grid lg:grid-cols-[360px,1fr] gap-12">
            <div>
              <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">10 — Common questions</div>
              <h2 className="font-display text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.1] tracking-tight mb-5">
                The fine print, <span className="grad-text-cyan italic">without the fine print.</span>
              </h2>
              <p className="text-hirex-text2 leading-relaxed mb-4">
                Answers to the questions most people ask before signing up.
              </p>
              <p className="text-sm text-hirex-text3">
                Still have questions? Email <strong className="text-foreground">customersupport@gethirex.space</strong> or book a 15-min call. We respond within 4 hours during business days.
              </p>
            </div>
            <div>
              {FAQS.map(([q, a], i) => (
                <FaqItem key={q} q={q} a={a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map(([q, a]) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />

      {/* STILL DECIDING */}
      <section className="py-[100px] max-md:py-[72px]">
        <div className="container max-w-[1180px]">
          <div className="text-center max-w-[760px] mx-auto mb-12">
            <div className="text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">11 — Still on the fence?</div>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.1] tracking-tight mb-3">
              The four things people ask <span className="grad-text-cyan italic">right before they sign up.</span>
            </h2>
            <p className="text-hirex-text2">Honest answers, not marketing.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {OBJECTIONS.map(([q, a]) => (
              <div key={q} className="bg-hirex-surface border border-border rounded-2xl p-7">
                <div className="font-display text-lg font-bold mb-3 text-accent">{q}</div>
                <p className="text-sm text-hirex-text2 leading-relaxed" dangerouslySetInnerHTML={{ __html: a.replace(/<strong>/g, '<strong class="text-foreground">') }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / SECURITY */}
      <section className="py-12 bg-hirex-bg3 border-y border-border">
        <div className="container max-w-[1280px]">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-hirex-text3 mb-3">Secure payments</div>
              <div className="flex flex-wrap gap-2">
                {["Razorpay", "Stripe", "💳 Visa · Mastercard · Amex", "📱 UPI · NetBanking"].map((p) => (
                  <span key={p} className="text-xs px-3 py-1.5 rounded-full bg-hirex-surface border border-border">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-hirex-text3 mb-3">Compliance · Privacy</div>
              <div className="flex flex-wrap gap-2">
                {["🔒 DPDP Act 2023", "🛡️ SOC2 Type II", "🌐 GDPR", "🔐 256-bit SSL"].map((p) => (
                  <span key={p} className="text-xs px-3 py-1.5 rounded-full bg-hirex-surface border border-border">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-hirex-text3 mb-3">Backed by</div>
              <div className="flex flex-wrap gap-2">
                {["First Cheque", "Better Capital", "✨ Y-Combinator alumni angels"].map((p) => (
                  <span key={p} className="text-xs px-3 py-1.5 rounded-full bg-hirex-surface border border-border">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-[100px] max-md:py-[72px]">
        <div className="container max-w-[900px] text-center">
          <h2 className="font-display text-[clamp(36px,6vw,64px)] font-extrabold leading-[1.05] tracking-tight mb-5">
            Stop renting <span className="grad-text-cyan italic">listings.</span>
            <br />
            Start hiring with <span className="grad-text-cyan italic">agents.</span>
          </h2>
          <p className="text-hirex-text2 text-lg mb-8 max-w-[600px] mx-auto">
            No credit card on the trial. Refuel credits never expire. Cancel from your dashboard in two clicks.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button onClick={() => initiateRazorpayPayment("pro")} className="bg-gradient-to-r from-hirex-cyan to-hirex-primary-light text-primary-foreground font-bold px-8 py-4 rounded-full hover:scale-[1.03] transition-transform shadow-[0_8px_24px_hsla(202,72%,59%,0.35)]">
              Start as a Candidate →
            </button>
            <a href="#employers" className="border-2 border-foreground text-foreground font-bold px-8 py-4 rounded-full hover:bg-foreground hover:text-hirex-bg2 transition-colors">
              Start as an Employer
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-hirex-text2">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-hirex-success" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-hirex-success" /> DPDP compliant</span>
            <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-accent" /> ★★★★★ 4.9 · 320+ reviews</span>
          </div>
        </div>
      </section>

      <CTAStrip />

      <StickyCheckoutBar price={stickyPrice} planLabel={featuredTier.name} billing={billing} />
      <ActivityTicker />
    </div>
  );
};

export default PricingPage;
