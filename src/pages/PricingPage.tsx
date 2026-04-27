import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Lock, X } from "lucide-react";
import CTAStrip from "@/components/CTAStrip";

// ---------- Razorpay placeholder ----------
declare global {
  interface Window {
    initiateRazorpayPayment?: (planId: string) => void;
  }
}

function initiateRazorpayPayment(planId: string) {
  // Placeholder — to be wired to Razorpay checkout later
  // eslint-disable-next-line no-console
  console.log("[Razorpay] initiate payment for plan:", planId);
  alert(`Starting 7-day trial for ${planId}. Razorpay checkout will be wired here.`);
}

if (typeof window !== "undefined") {
  window.initiateRazorpayPayment = initiateRazorpayPayment;
}

// ---------- Pricing data ----------
type Billing = "monthly" | "annual";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    monthly: 999,
    annual: 749, // 25% off
    anchor: "3 AI agents to get search-ready.",
    credits: "150",
    creditsLabel: "credits / month",
    features: [
      "ResumeReviver, JobScout, CareerPilot",
      "3 resume rewrites + 5 text mock interviews",
      "JobScout scans up to 100 relevant roles/day (subject to market availability)",
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
      "50 LinkedIn auto-applies / month (subject to platform limits)",
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
      "500 LinkedIn auto-applies / month (subject to platform limits)",
      "2-month subscription credit rollover + best refuel rate",
      "WhatsApp + email support · 4h response",
    ],
    featured: false,
  },
];

const TRUSTED_LOGOS = ["Postman", "Notion", "Vercel", "Linear", "Ramp", "Monzo", "Wise"];

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
        <button
          onClick={() => setClosed(true)}
          className="text-hirex-text3 hover:text-foreground transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// ---------- Sticky Checkout Bar ----------
const StickyCheckoutBar = ({ price, planLabel }: { price: number; planLabel: string }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-hirex-bg2/95 backdrop-blur-xl border-t border-hirex-border2">
        <div className="container max-w-[1280px] flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="text-sm md:text-base font-semibold truncate">
              Start your 7-day trial · <span className="grad-text-cyan">{planLabel}</span>
            </p>
            <p className="text-xs text-hirex-text2 hidden sm:block">
              ₹{price.toLocaleString("en-IN")}/mo · No card required · Cancel anytime
            </p>
          </div>
          <button
            data-plan={planLabel.toLowerCase()}
            data-price={price}
            onClick={() => initiateRazorpayPayment(planLabel.toLowerCase())}
            className="shrink-0 bg-gradient-to-r from-hirex-cyan to-hirex-primary-light text-primary-foreground font-bold text-sm md:text-base px-5 md:px-7 py-3 rounded-full hover:scale-[1.03] transition-transform shadow-[0_8px_24px_hsla(202,72%,59%,0.35)]"
          >
            Start 7-Day Trial →
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- Main Page ----------
const PricingPage = () => {
  const [billing, setBilling] = useState<Billing>("monthly");

  const featuredTier = useMemo(() => TIERS.find((t) => t.featured)!, []);
  const stickyPrice = billing === "annual" ? featuredTier.annual : featuredTier.monthly;

  return (
    <div className="animate-fade-in pb-24">
      {/* ============== HERO ============== */}
      <section className="pt-[140px] pb-20 bg-hirex-bg2 relative overflow-hidden">
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
          <p className="text-hirex-text2 max-w-[620px] mx-auto text-[17px] leading-relaxed mb-8">
            Save 25% with annual billing. Subscribe monthly or annually. Top up with refuel packs anytime.
            Cancel anytime · No annual lock-in · Refuel credits never expire while your subscription is active.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-hirex-surface border border-hirex-border2 rounded-full p-1.5">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                billing === "monthly"
                  ? "bg-foreground text-hirex-bg2"
                  : "text-hirex-text2 hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                billing === "annual"
                  ? "bg-foreground text-hirex-bg2"
                  : "text-hirex-text2 hover:text-foreground"
              }`}
            >
              Annual
              <span className="bg-accent text-accent-foreground text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">
                Save 25%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ============== TRUSTED BY ============== */}
      <section className="py-12 border-y border-border bg-hirex-bg3">
        <div className="container max-w-[1280px]">
          <p className="text-center text-xs font-mono tracking-[0.15em] uppercase text-hirex-text3 mb-2">
            Trusted by teams at
          </p>
          <p className="text-center text-sm text-hirex-text2 max-w-[680px] mx-auto mb-8 leading-relaxed">
            Trusted by 1,200+ teams across US startups, AI startups, and global MNCs. From seed-stage startups to Series D unicorns.
          </p>
          <div className="flex items-center justify-center flex-wrap gap-x-10 gap-y-4">
            {TRUSTED_LOGOS.map((logo) => (
              <span
                key={logo}
                className="text-lg md:text-xl font-display font-semibold text-hirex-text3 hover:text-foreground transition-colors tracking-tight"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============== TIERS ============== */}
      <section className="py-[100px] max-md:py-[72px]">
        <div className="container max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-lg:max-w-[480px] max-lg:mx-auto">
            {TIERS.map((tier) => {
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

                  <div className="font-display text-2xl font-bold mb-2">{tier.name}</div>

                  <div className="font-display text-[44px] font-extrabold leading-none mb-1 tracking-tight">
                    <span className="text-2xl font-semibold align-top mr-1">₹</span>
                    {price.toLocaleString("en-IN")}
                    <span className="text-base font-normal text-hirex-text2 ml-1">/mo</span>
                  </div>
                  {billing === "annual" && (
                    <p className="text-xs text-accent font-semibold mb-3">Billed annually · 25% off</p>
                  )}

                  <p className="text-sm text-hirex-text2 mb-5 leading-relaxed">{tier.anchor}</p>

                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-border">
                    <span className="font-display text-3xl font-bold grad-text-cyan">{tier.credits}</span>
                    <span className="text-xs text-hirex-text3 uppercase tracking-wider font-mono">
                      {tier.creditsLabel}
                    </span>
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
                    onClick={() => initiateRazorpayPayment(tier.id)}
                    className={`w-full text-center py-3.5 rounded-full font-bold text-sm transition-all hover:scale-[1.02] ${
                      tier.featured
                        ? "bg-gradient-to-r from-hirex-cyan to-hirex-primary-light text-primary-foreground shadow-[0_8px_24px_hsla(202,72%,59%,0.35)]"
                        : "bg-foreground text-hirex-bg2 hover:bg-hirex-cyan hover:text-primary-foreground"
                    }`}
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

      {/* ============== FOUNDER CARD ============== */}
      <section className="pb-[100px]">
        <div className="container max-w-[820px]">
          <div className="bg-hirex-surface border border-border rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-hirex-cyan/[0.06] rounded-full blur-[80px]" />
            <div className="relative">
              <span className="inline-block text-xs font-mono tracking-[0.15em] uppercase text-hirex-primary-light mb-4">
                A note from the founder
              </span>
              <h3 className="font-display text-[clamp(22px,3vw,32px)] font-bold leading-tight mb-5 tracking-tight">
                I built HireX because I was tired of paying for tools that{" "}
                <span className="grad-text-cyan italic">didn't talk to each other.</span>
              </h3>
              <p className="text-hirex-text2 leading-relaxed mb-4">
                HireX is the platform I wish I'd had as a hiring lead. 27 agents, one credit balance,
                one dashboard. You only pay when an agent actually does the work — not for seats your
                team forgot they were paying for.
              </p>
              <p className="text-hirex-text3 text-sm mb-8">
                If anything on this page is unclear, email me directly. I read every message.
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-hirex-cyan to-accent flex items-center justify-center font-display font-bold text-lg text-primary-foreground shrink-0">
                  SP
                </div>
                <div>
                  <div className="font-display font-bold text-lg">Sailesh Pattnaik</div>
                  <div className="text-sm text-hirex-text2">Founder, HIREX</div>
                  <a
                    href="mailto:sailesh@gethirex.space"
                    className="text-sm font-mono text-hirex-primary-light hover:text-hirex-cyan transition-colors"
                  >
                    sailesh@gethirex.space
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAStrip />

      {/* ============== Sticky Checkout Bar ============== */}
      <StickyCheckoutBar price={stickyPrice} planLabel={featuredTier.name} />

      {/* ============== Activity Ticker ============== */}
      <ActivityTicker />
    </div>
  );
};

export default PricingPage;
