import { Link } from "react-router-dom";
import { Check, Building2, Users } from "lucide-react";

const employerIndia = [
  { plan: "Starter", price: "₹8,299/mo", annual: "₹79,669/yr", badge: "", features: { "Active Jobs": "5", "AI Screenings": "1,000/mo", "AI Agents": "5 Core", "ATS Integration": "✅ 1-click", "HRIS": "❌", "Scheduler": "Basic", "Analytics": "Standard", "Support": "Email (24h)", "Free Trial": "14 days" }},
  { plan: "Growth", price: "₹24,999/mo", annual: "₹2,39,990/yr", badge: "Most Popular", features: { "Active Jobs": "Unlimited", "AI Screenings": "10,000/mo", "AI Agents": "15 Agents", "ATS Integration": "✅ 50+", "HRIS": "✅", "Scheduler": "Advanced", "Analytics": "Full", "Support": "Priority Slack", "Free Trial": "14 days" }},
  { plan: "Enterprise", price: "Custom", annual: "Custom", badge: "", features: { "Active Jobs": "Unlimited", "AI Screenings": "Unlimited", "AI Agents": "All 27", "ATS Integration": "✅ Custom API", "HRIS": "✅ + Dedicated", "Scheduler": "Custom", "Analytics": "Custom BI", "Support": "Dedicated CSM", "Free Trial": "Custom POC" }},
];

const candidateIndia = [
  { plan: "Starter", price: "₹399/mo", annual: "₹3,990/yr", target: "Casual browser", agents: "3", scans: "20", features: ["Resume Reviver", "Job Scout", "Career Coach"] },
  { plan: "Pro", price: "₹799/mo", annual: "₹5,990/yr", badge: "⭐ Popular", target: "Active/Laid-off", agents: "All 6", scans: "100", features: ["All Starter +", "Interview Pro", "Code Coach", "Career Pilot 30-day", "LinkedIn Optimizer"] },
  { plan: "Turbo", price: "₹1,999/mo", annual: "₹14,990/yr", target: "Power hunter", agents: "All 6", scans: "Unlimited", features: ["Everything unlimited", "Daily coaching", "Instant priority alerts", "Weekly LinkedIn refresh"] },
];

const comparison = [
  { feature: "AI Agent Workforce", hirex: "27 Agents", workday: "❌", zoho: "❌", greenhouse: "❌" },
  { feature: "Resume Screen Speed", hirex: "60 seconds", workday: "Hours", zoho: "Hours", greenhouse: "Hours" },
  { feature: "India Job Boards", hirex: "✅ Naukri+50", workday: "Partial", zoho: "✅", greenhouse: "❌" },
  { feature: "DPDP Compliant", hirex: "✅", workday: "❌", zoho: "✅", greenhouse: "❌" },
  { feature: "Starting Price (India)", hirex: "₹8,299/mo", workday: "₹85,000+", zoho: "₹4,500", greenhouse: "₹42,000" },
  { feature: "Free Trial", hirex: "14 days", workday: "❌", zoho: "15 days", greenhouse: "❌" },
];

const UnifiedPricingPage = () => (
  <div className="min-h-screen bg-background">
    <section className="py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          HireX Pricing 2026 — <span className="grad-text-cyan">Pay for Results.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          14-day free trial for employers. 7-day free trial for candidates. No credit card required.
        </p>
      </div>
    </section>

    <section className="py-16 max-w-6xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-8">
        <Building2 className="w-6 h-6 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold">For Employers — India ₹</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {employerIndia.map((p, i) => (
          <div key={i} className={`glass-card rounded-2xl p-6 relative ${i === 1 ? "glow-border-cyan ring-2 ring-primary/30" : ""}`}>
            {p.badge && <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>}
            <h3 className="text-xl font-bold mb-1">{p.plan}</h3>
            <div className="text-3xl font-bold text-primary mb-1">{p.price}</div>
            <div className="text-xs text-muted-foreground mb-6">Annual: {p.annual} (save 20%)</div>
            <div className="space-y-3 text-sm">
              {Object.entries(p.features).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-muted-foreground">{k}</span>
                  <span className={v.startsWith("❌") ? "text-destructive" : "font-medium"}>{v}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="mt-6 block w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
              {p.plan === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
            </Link>
          </div>
        ))}
      </div>
    </section>

    <section className="py-16 max-w-6xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-6 h-6 text-accent" />
        <h2 className="text-2xl md:text-3xl font-bold">For Candidates — India ₹</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {candidateIndia.map((p, i) => (
          <div key={i} className={`glass-card-warm rounded-2xl p-6 relative ${i === 1 ? "glow-border-teal ring-2 ring-accent/30" : ""}`}>
            {"badge" in p && p.badge && <span className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>}
            <h3 className="text-xl font-bold mb-1">{p.plan}</h3>
            <div className="text-3xl font-bold text-accent mb-1">{p.price}</div>
            <div className="text-xs text-muted-foreground mb-2">Annual: {p.annual}</div>
            <div className="text-xs text-muted-foreground mb-4">{p.target} · {p.agents} agents · {p.scans} scans/mo</div>
            <div className="space-y-2">
              {p.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="mt-6 block w-full text-center py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition">
              Start 7-Day Free Trial
            </Link>
          </div>
        ))}
      </div>
    </section>

    <section className="py-16 bg-card/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">HireX vs Competitors</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground">Feature</th>
                <th className="text-left py-3 px-4 text-primary font-bold">HireX</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Workday</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Zoho</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Greenhouse</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((r, i) => (
                <tr key={i} className="border-b border-border/30">
                  <td className="py-3 px-4 font-medium">{r.feature}</td>
                  <td className="py-3 px-4 text-primary font-semibold">{r.hirex}</td>
                  <td className="py-3 px-4 text-muted-foreground">{r.workday}</td>
                  <td className="py-3 px-4 text-muted-foreground">{r.zoho}</td>
                  <td className="py-3 px-4 text-muted-foreground">{r.greenhouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Only 100 free licenses available</h2>
        <p className="text-muted-foreground mb-6">Access closes once filled.</p>
        <Link to="/demo" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition inline-block">Book Demo Now</Link>
      </div>
    </section>
  </div>
);

export default UnifiedPricingPage;
