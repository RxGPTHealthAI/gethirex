import { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    label: "Free", name: "Explorer", price: "Free", period: "",
    desc: "Get started with basic AI career assistance.",
    items: ["1 AI Agent (ResumeReviver)", "5 resume optimizations/month", "Basic job matching", "Community support"],
    featured: false,
  },
  {
    label: "Most Popular", name: "Career Pro", price: "$29", period: "/month",
    desc: "Your full 6-agent squad for serious job seekers.",
    items: ["All 6 AI Agents", "Unlimited resume optimizations", "Mock interviews with feedback", "500+ job board scanning", "Priority matching"],
    featured: true,
  },
  {
    label: "Premium", name: "Executive", price: "$79", period: "/month",
    desc: "White-glove career acceleration for senior roles.",
    items: ["All 6 AI Agents (priority)", "Executive resume styling", "Salary negotiation coaching", "Direct recruiter connections", "Dedicated career strategist"],
    featured: false,
  },
];

const CandidatePricingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Is the Explorer plan really free?", a: "Yes! ResumeReviver is free with 5 optimizations per month. No credit card needed." },
    { q: "Can I cancel anytime?", a: "Absolutely. Cancel with one click. No contracts, no penalties." },
    { q: "Which agents do I get with Career Pro?", a: "All six: ResumeReviver, JobScout, CodeCoach, InterviewPro, CareerPilot, and OfferNinja." },
    { q: "How does interview practice work?", a: "InterviewPro conducts realistic mock interviews with real-time confidence scoring, keyword tracking, and personalized feedback." },
  ];

  return (
    <div className="animate-fade-in">
      <section className="pt-[140px] pb-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] bg-hirex-teal/[0.06] pointer-events-none" />
        <div className="container text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase glass-card-warm text-hirex-teal mb-6">
            Candidate Plans
          </div>
          <h1 className="text-[clamp(42px,6vw,64px)] font-bold mb-5">
            Invest in Your
            <br />
            <span className="bg-gradient-to-r from-hirex-teal to-hirex-orange bg-clip-text text-transparent">Dream Career.</span>
          </h1>
          <p className="text-hirex-text2 max-w-[500px] mx-auto text-lg">
            Premium AI career tools at a fraction of what a career coach costs.
          </p>
        </div>
      </section>

      <section className="py-20" style={{ background: "#0F1425" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-lg:max-w-[480px] max-lg:mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass-card-warm rounded-2xl p-8 relative transition-all hover:-translate-y-1 ${
                  plan.featured ? "glow-border-teal border-hirex-teal/30" : ""
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-foreground" style={{ background: "#68D5C1" }}>
                    Most Popular
                  </div>
                )}
                <div className="text-xs font-bold tracking-wider uppercase text-hirex-text3 mb-2">{plan.label}</div>
                <div className="text-2xl font-bold mb-2">{plan.name}</div>
                <div className="text-[42px] font-bold mb-2 text-hirex-teal">
                  {plan.price}<span className="text-base font-normal text-hirex-text3">{plan.period}</span>
                </div>
                <p className="text-sm text-hirex-text2 mb-6">{plan.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <span className="text-hirex-teal">✦</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`weave-hover block w-full text-center py-3.5 rounded-xl font-bold text-[18px] no-underline transition-all ${
                    plan.featured
                      ? "text-foreground hover:shadow-[0_0_20px_hsla(168,55%,63%,0.3)]"
                      : "glass-card-warm text-foreground hover:bg-foreground/10"
                  }`}
                  style={plan.featured ? { background: "#68D5C1" } : {}}
                >
                  {plan.price === "Free" ? "Get Started Free" : plan.featured ? "Activate Squad" : "Go Executive"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="container max-w-[700px]">
          <h2 className="text-3xl font-bold text-center mb-10">FAQ</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-foreground/10">
              <button
                className="w-full flex items-center justify-between py-5 text-left gap-4 bg-transparent border-none text-foreground cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-[16px] font-semibold">{faq.q}</span>
                <span className={`text-xl text-hirex-text3 transition-transform ${openFaq === i ? "rotate-45 text-hirex-teal" : ""}`}>+</span>
              </button>
              {openFaq === i && <div className="pb-5 text-sm text-hirex-text2 leading-relaxed animate-fade-in">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CandidatePricingPage;
