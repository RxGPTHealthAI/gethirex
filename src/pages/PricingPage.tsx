import { useState } from "react";
import { Link } from "react-router-dom";
import CTAStrip from "@/components/CTAStrip";

const plans = [
  { label: "Essentials", name: "Startup", price: "$99", period: "/month", desc: "Perfect for early-stage companies scaling their first team.", items: ["5 Super-Agents of your choice", "Up to 1,000 resumes/month", "Basic ATS integration", "Email support", "Mobile app access"], featured: false },
  { label: "Best Value", name: "Growth", price: "$499", period: "/month", desc: "For scaling companies ready to automate their entire HR operation.", items: ["Up to 21 Super-Agents", "Unlimited resumes", "All integrations (ATS, payroll, ERP)", "Analytics & lifecycle agents", "Priority support", "Custom workflows"], featured: true },
  { label: "Full Suite", name: "Enterprise", price: "Custom", period: "", desc: "Full-scale HR automation for global enterprises.", items: ["All 27 Super-Agents", "White-label options", "SSO & audit logs", "Multi-region compliance", "Dedicated success team", "Custom SLA"], featured: false },
];

const features = [
  ["Super-Agents Included", "5", "21", "27"],
  ["Resume Parsing", "✓", "✓", "✓"],
  ["Monthly Resume Limit", "1,000", "Unlimited", "Unlimited"],
  ["ATS Integration", "✓", "✓", "✓"],
  ["Payroll Integration", "—", "✓", "✓"],
  ["ERP Integration", "—", "✓", "✓"],
  ["Analytics Dashboard", "—", "✓", "✓"],
  ["Lifecycle Agents", "—", "✓", "✓"],
  ["Compliance Automation", "—", "Basic", "Full"],
  ["Multi-Region Support", "—", "—", "✓"],
  ["White-Label Options", "—", "—", "✓"],
  ["SSO & Audit Logs", "—", "—", "✓"],
  ["Dedicated Success Manager", "—", "—", "✓"],
  ["Custom SLA", "—", "—", "✓"],
  ["Support Level", "Email", "Priority", "24/7"],
];

const faqs = [
  { q: "Is there a free trial?", a: "Yes! All plans start with a 14-day free trial. No credit card required. You can pick your 5 starter agents and begin automating your HR workflows immediately." },
  { q: "Can I change which agents I use?", a: "Absolutely. You can swap your selected agents at any time from your dashboard. Your allocation resets at the start of each billing cycle." },
  { q: "How is Enterprise pricing calculated?", a: "Enterprise pricing is customized based on your organization size, number of hiring pipelines, regions, and specific compliance requirements. Contact our sales team for a detailed quote." },
  { q: "What integrations are included?", a: "Startup includes basic ATS integration. Growth adds payroll and ERP connectors. Enterprise includes all integrations plus custom API access and SSO." },
  { q: "Can I cancel anytime?", a: "Yes. Month-to-month plans can be cancelled anytime. Annual plans can be cancelled at the end of the billing period with no penalties." },
  { q: "Is my data secure?", a: "HireX is SOC 2 Type II certified, GDPR compliant, and uses end-to-end encryption for all candidate data. Enterprise plans include dedicated data residency options." },
];

const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-[140px] pb-20 bg-hirex-bg2 relative overflow-hidden">
        <div className="absolute -top-[120px] -left-[100px] w-[600px] h-[600px] bg-accent/[0.05] rounded-full blur-[100px]" />
        <div className="container text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-accent/10 border border-accent/25 text-accent mb-6">
            Pay for Outcomes, Not Headcount
          </div>
          <h1 className="font-display text-[clamp(48px,7vw,88px)] font-extrabold mb-5">
            Pricing That<br /><span className="grad-text-2">Pays for Itself.</span>
          </h1>
          <p className="text-hirex-text2 max-w-[520px] mx-auto text-[17px] leading-relaxed">
            Every tier delivers autonomous HR that replaces manual operations and eliminates hiring bottlenecks.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-[100px] max-md:py-[72px]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start max-lg:max-w-[480px] max-lg:mx-auto">
            {plans.map((plan) => (
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
                    Most Popular
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
                  to="/contact"
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
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="pb-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-extrabold">Feature <em className="font-normal opacity-60">Comparison.</em></h2>
            <p className="text-hirex-text2 mt-3">Compare plans side-by-side to find the perfect fit.</p>
          </div>
          <div className="bg-hirex-surface border border-border rounded-lg overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left text-[13px] font-semibold uppercase tracking-wider text-hirex-text3 border-b border-border">Feature</th>
                  <th className="p-4 text-center text-[13px] font-semibold uppercase tracking-wider text-hirex-text3 border-b border-border">Startup</th>
                  <th className="p-4 text-center text-[13px] font-semibold uppercase tracking-wider text-primary-light border-b border-border bg-primary/[0.05]">Growth</th>
                  <th className="p-4 text-center text-[13px] font-semibold uppercase tracking-wider text-hirex-text3 border-b border-border">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={i} className="hover:bg-foreground/[0.02]">
                    <td className="p-3.5 text-sm font-medium border-b border-border">{row[0]}</td>
                    <td className={`p-3.5 text-sm text-center border-b border-border text-hirex-text2 ${row[1] === "✓" ? "text-hirex-success" : row[1] === "—" ? "text-hirex-text3" : ""}`}>{row[1] === "✓" ? <span className="font-bold">✓</span> : row[1]}</td>
                    <td className={`p-3.5 text-sm text-center border-b border-border bg-primary/[0.03] ${row[2] === "✓" ? "text-hirex-success" : row[2] === "—" ? "text-hirex-text3" : "text-hirex-text2"}`}>{row[2] === "✓" ? <span className="font-bold">✓</span> : <strong>{row[2]}</strong>}</td>
                    <td className={`p-3.5 text-sm text-center border-b border-border text-hirex-text2 ${row[3] === "✓" ? "text-hirex-success" : row[3] === "—" ? "text-hirex-text3" : ""}`}>{row[3] === "✓" ? <span className="font-bold">✓</span> : row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-[100px]">
        <div className="container max-w-[780px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-extrabold">Frequently Asked <em className="font-normal opacity-60">Questions.</em></h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  className="w-full flex items-center justify-between py-[22px] text-left gap-4 bg-transparent border-none text-foreground cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-display text-[17px] font-semibold">{faq.q}</span>
                  <span className={`shrink-0 text-xl text-hirex-text3 transition-transform duration-300 ${openFaq === i ? "rotate-45 text-primary-light" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="pb-5 text-[15px] text-hirex-text2 leading-relaxed animate-fade-in">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip />
    </div>
  );
};

export default PricingPage;
