import { Link } from "react-router-dom";
import { Clock, Zap, Users, FileCheck, Building2, CheckCircle2 } from "lucide-react";

const phases = [
  { icon: Zap, title: "ONBOARDING", time: "Minutes 0–5", color: "text-primary", steps: [
    "Minute 0: Click 'Start Free Trial'. No credit card. Email verification in 30 seconds.",
    "Minute 1: AI connects to your ATS in 1 click (Workday / BambooHR / Greenhouse / Lever).",
    "Minute 2: Upload your first JD or choose from 500+ pre-built templates.",
    "Minute 3: AI parses JD, builds scoring algorithm, confirms requirements.",
    "Minute 5: Sourcing begins across 50+ platforms simultaneously.",
  ]},
  { icon: Users, title: "SOURCING & SCREENING", time: "Hours 1–2", color: "text-accent", steps: [
    "Hour 1: 1,247 candidates sourced on average from Naukri, LinkedIn, Indeed, and 47 more.",
    "Hour 1.5: AI screens all using 17-point scoring. Demographics stripped.",
    "Hour 2: Shortlist of top 10% (avg: 124 candidates) delivered with AI confidence scores, skills match %, and suggested interview questions.",
  ]},
  { icon: Clock, title: "INTERVIEW SCHEDULING", time: "Hours 2–24", color: "text-primary", steps: [
    "Hour 2: AI sends personalized outreach (email + WhatsApp optional).",
    "Hour 3: Candidates begin self-scheduling. Calendar sync handles conflicts.",
    "Hour 6: First interviews confirmed. Zoom/Meet links auto-generated.",
    "Hour 24: 18 interviews scheduled on average. Zero scheduling emails for your team.",
  ]},
  { icon: FileCheck, title: "INTERVIEWS & EVALUATION", time: "Days 1–3", color: "text-accent", steps: [
    "Day 1: Interviews begin. AI sends structured scorecard pre-meeting.",
    "Day 2: Interviewer feedback collected via AI-prompted form (2 min per candidate).",
    "Day 3: AI aggregates scores, highlights top 3, flags red flags, recommends next steps.",
    "Day 3 (evening): Offer extended to best candidate.",
  ]},
  { icon: Building2, title: "OFFER, ONBOARDING & HRIS SYNC", time: "Day 3–7", color: "text-primary", steps: [
    "Day 3: Offer letter generated with dynamic fields. E-signed via DigiSign/DocuSign.",
    "Day 4: Background check initiated via AuthBridge/Checkr.",
    "Day 5: Onboarding checklist sent to candidate + internal teams.",
    "Day 7: New hire data auto-pushed to HRIS. Cost-per-hire dropped 60%.",
  ]},
];

const results = [
  { company: "Bangalore SaaS Startup", volume: "25 engineers", before: "120 days", after: "45 days", saved: "₹12 Lakh" },
  { company: "Mumbai BPO Giant", volume: "1,000 agents", before: "6 months", after: "60 days", saved: "₹85 Lakh" },
  { company: "Singapore Enterprise", volume: "300 roles (5 countries)", before: "90 days", after: "27 days", saved: "$1.2M" },
  { company: "Delhi NBFC", volume: "50 BFSI roles", before: "75 days", after: "21 days", saved: "₹18 Lakh" },
  { company: "Hyderabad IT MNC", volume: "200 tech roles", before: "100 days", after: "35 days", saved: "₹45 Lakh" },
];

const ProcessPage = () => (
  <div className="min-h-screen bg-background">
    <section className="py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          The Exact HireX AI Process — <span className="grad-text-cyan">Trial to First Hire in 72 Hours</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Walk through the minute-by-minute workflow that 500+ companies experience. Every step is real. Every metric is verified.
        </p>
      </div>
    </section>

    <section className="py-12 max-w-5xl mx-auto px-6">
      <div className="space-y-12">
        {phases.map((phase, i) => (
          <div key={i} className="glass-card rounded-2xl p-8 hover:glow-border-cyan transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <phase.icon className={`w-6 h-6 ${phase.color}`} />
              </div>
              <div>
                <div className="text-xs font-bold text-primary uppercase tracking-widest">Phase {i + 1}</div>
                <h2 className="text-xl md:text-2xl font-bold">{phase.title}</h2>
              </div>
              <span className="ml-auto text-sm font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full">{phase.time}</span>
            </div>
            <div className="space-y-3">
              {phase.steps.map((s, j) => (
                <div key={j} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="py-20 bg-card/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Real Companies. <span className="grad-text-cyan">Real Numbers.</span></h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Company</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Volume</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Before</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">After HireX</th>
                <th className="text-left py-4 px-4 text-muted-foreground font-medium">Saved</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-card/50">
                  <td className="py-4 px-4 font-medium">{r.company}</td>
                  <td className="py-4 px-4 text-muted-foreground">{r.volume}</td>
                  <td className="py-4 px-4 text-destructive">{r.before}</td>
                  <td className="py-4 px-4 text-accent font-semibold">{r.after}</td>
                  <td className="py-4 px-4 text-primary font-bold">{r.saved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Start Your First Hire Today</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/business/pricing" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition">Free Trial — No Card</Link>
          <Link to="/demo" className="px-8 py-4 rounded-xl glass-card font-semibold hover:bg-white/10 transition">Book Demo</Link>
        </div>
      </div>
    </section>
  </div>
);

export default ProcessPage;
