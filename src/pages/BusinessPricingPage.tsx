import { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    label: "Essentials", name: "Startup", price: "$99", period: "/month",
    desc: "Perfect for early-stage companies scaling their first team.",
    items: ["5 Super-Agents of your choice", "Up to 1,000 resumes/month", "Basic ATS integration", "Email support"],
    featured: false,
  },
  {
    label: "Most Popular", name: "Growth", price: "$499", period: "/month",
    desc: "For scaling companies ready to automate their entire HR operation.",
    items: ["Up to 21 Super-Agents", "Unlimited resumes", "All integrations (ATS, payroll, ERP)", "Analytics & lifecycle agents", "Priority support"],
    featured: true,
  },
  {
    label: "Full Suite", name: "Enterprise", price: "Custom", period: "",
    desc: "Full-scale HR automation for global enterprises.",
    items: ["All 27 Super-Agents", "White-label options", "SSO & audit logs", "Multi-region compliance", "Dedicated success team"],
    featured: false,
  },
];

const features = [
  ["Super-Agents Included", "5", "21", "27"],
  ["Resume Parsing", "✓", "✓", "✓"],
  ["Monthly Resume Limit", "1,000", "Unlimited", "Unlimited"],
  ["ATS Integration", "✓", "✓", "✓"],
  ["Payroll Integration", "—", "✓", "✓"],
  ["ERP Integration", "—", "✓", "✓"],
  ["Analytics Dashboard", "—", "✓", "✓"],
  ["Compliance Automation", "—", "Basic", "Full"],
  ["Multi-Region Support", "—", "—", "✓"],
  ["White-Label", "—", "—", "✓"],
  ["SSO & Audit Logs", "—", "—", "✓"],
  ["Dedicated CSM", "—", "—", "✓"],
];

const faqs = [
  { q: "Is there a free trial?", a: "Yes! All plans start with a 14-day free trial. No credit card required." },
  { q: "Can I change which agents I use?", a: "Absolutely. Swap agents anytime from your dashboard." },
  { q: "How is Enterprise pricing calculated?", a: "Based on org size, hiring pipelines, regions, and compliance needs. Contact sales for a quote." },
  { q: "Is my data secure?", a: "SOC 2 Type II certified, GDPR compliant, end-to-end encryption. Enterprise includes data residency." },
];

const BusinessPricingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-in">
      <section className="pt-[140px] pb-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] bg-hirex-cyan/[0.06] pointer-events-none" />
        <div className="container text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase glass-card text-hirex-cyan mb-6">
            Employer Plans
          </div>
          <h1 className="text-[clamp(42px,6vw,64px)] font-bold mb-5">
            Pricing That
            <br />
            <span className="grad-text-cyan">Pays for Itself.</span>
          </h1>
          <p className="text-hirex-text2 max-w-[500px] mx-auto text-lg">
            Pay for outcomes — not HR headcount.
          </p>
        </div>
      </section>

      <section className="py-20" style={{ background: "#0F1425" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-lg:max-w-[480px] max-lg:mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass-card rounded-2xl p-8 relative transition-all hover:-translate-y-1 ${
                  plan.featured ? "glow-border-cyan border-hirex-cyan/30" : ""
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-foreground" style={{ background: "#4AB8E6" }}>
                    Most Popular
                  </div>
                )}
                <div className="text-xs font-bold tracking-wider uppercase text-hirex-text3 mb-2">{plan.label}</div>
                <div className="text-2xl font-bold mb-2">{plan.name}</div>
                <div className="text-[42px] font-bold mb-2 text-hirex-cyan">
                  {plan.price}<span className="text-base font-normal text-hirex-text3">{plan.period}</span>
                </div>
                <p className="text-sm text-hirex-text2 mb-6">{plan.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <span className="text-hirex-cyan">✦</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`weave-hover block w-full text-center py-3.5 rounded-xl font-bold text-[18px] no-underline transition-all ${
                    plan.featured
                      ? "text-foreground hover:shadow-[0_0_20px_hsla(202,72%,59%,0.3)]"
                      : "glass-card text-foreground hover:bg-foreground/10"
                  }`}
                  style={plan.featured ? { background: "#4AB8E6" } : {}}
                >
                  {plan.featured ? "Get Started" : plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">Feature Comparison</h2>
          <div className="glass-card rounded-xl overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left text-[11px] font-bold uppercase tracking-wider text-hirex-text3 border-b border-foreground/10">Feature</th>
                  <th className="p-4 text-center text-[11px] font-bold uppercase tracking-wider text-hirex-text3 border-b border-foreground/10">Startup</th>
                  <th className="p-4 text-center text-[11px] font-bold uppercase tracking-wider text-hirex-cyan border-b border-foreground/10 bg-hirex-cyan/5">Growth</th>
                  <th className="p-4 text-center text-[11px] font-bold uppercase tracking-wider text-hirex-text3 border-b border-foreground/10">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={i} className="hover:bg-foreground/[0.02]">
                    <td className="p-3.5 text-sm font-medium border-b border-foreground/5">{row[0]}</td>
                    {[1, 2, 3].map((j) => (
                      <td key={j} className={`p-3.5 text-sm text-center border-b border-foreground/5 ${j === 2 ? "bg-hirex-cyan/[0.02]" : ""} ${row[j] === "✓" ? "text-hirex-cyan font-bold" : row[j] === "—" ? "text-hirex-text3" : "text-hirex-text2"}`}>
                        {row[j]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "#0F1425" }}>
        <div className="container max-w-[700px]">
          <h2 className="text-3xl font-bold text-center mb-10">FAQ</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-foreground/10">
              <button
                className="w-full flex items-center justify-between py-5 text-left gap-4 bg-transparent border-none text-foreground cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-[16px] font-semibold">{faq.q}</span>
                <span className={`text-xl text-hirex-text3 transition-transform ${openFaq === i ? "rotate-45 text-hirex-cyan" : ""}`}>+</span>
              </button>
              {openFaq === i && <div className="pb-5 text-sm text-hirex-text2 leading-relaxed animate-fade-in">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BusinessPricingPage;
