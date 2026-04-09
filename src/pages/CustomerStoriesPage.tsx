import { Link } from "react-router-dom";
import { TrendingUp, Clock, DollarSign, Users, Star, Quote } from "lucide-react";
import heroImg from "@/assets/hero-team-meeting.jpg";

const caseStudies = [
  { title: "Bangalore SaaS Startup", subtitle: "25 Engineers in 45 Days", industry: "B2B Software", color: "from-primary/20 to-primary/5",
    quote: "We were bleeding cash on recruiters. HireX paid for itself in week 1. Our engineers are still with us.", author: "CTO, Bangalore SaaS Startup",
    metrics: [{ label: "Time to Hire", before: "120 days", after: "45 days", improvement: "63% faster" }, { label: "Cost Per Hire", before: "₹1.5 Lakh", after: "₹8,299", improvement: "94% reduction" }, { label: "Offer Acceptance", before: "60%", after: "91%", improvement: "+31pp" }, { label: "Total Saved", before: "—", after: "₹12 Lakh", improvement: "" }]
  },
  { title: "Mumbai BPO Giant", subtitle: "1,000 Agents in 60 Days", industry: "BPO", color: "from-accent/20 to-accent/5",
    quote: "Impossible volume. Zero manual screening. Our margins exploded.", author: "Head of Talent Acquisition, Mumbai BPO",
    metrics: [{ label: "Time to Fill", before: "180 days", after: "60 days", improvement: "67% faster" }, { label: "HR Staff Required", before: "40 FTEs", after: "8 FTEs", improvement: "80% reduction" }, { label: "Cost Per Hire", before: "₹25,000", after: "₹3,100", improvement: "88% reduction" }, { label: "Total Saved", before: "—", after: "₹85 Lakh", improvement: "" }]
  },
  { title: "Singapore Enterprise", subtitle: "300 Roles, 5 Countries", industry: "Fortune 500 Manufacturing", color: "from-primary/20 to-primary/5",
    quote: "Global hiring complexity solved. Time-to-hire down 70%. Compliance zero issues.", author: "VP People, Fortune 500, Singapore",
    metrics: [{ label: "Time to Hire", before: "90 days", after: "27 days", improvement: "70% faster" }, { label: "Compliance Violations", before: "3/quarter", after: "0", improvement: "100%" }, { label: "HR Team Size", before: "15", after: "6", improvement: "60% reduction" }, { label: "Annual Savings", before: "—", after: "$1.2M", improvement: "" }]
  },
  { title: "Delhi NBFC", subtitle: "50 BFSI Roles in 21 Days", industry: "Financial Services", color: "from-accent/20 to-accent/5",
    quote: "", author: "",
    metrics: [{ label: "Time to Hire", before: "75 days", after: "21 days", improvement: "72% faster" }, { label: "BGV Time", before: "14 days", after: "3 days", improvement: "79% faster" }, { label: "Compliance Issues", before: "—", after: "0", improvement: "" }, { label: "Saved", before: "—", after: "₹18 Lakh", improvement: "" }]
  },
  { title: "Hyderabad IT MNC", subtitle: "200 Tech Roles", industry: "IT Services", color: "from-primary/20 to-primary/5",
    quote: "", author: "",
    metrics: [{ label: "Candidates Assessed", before: "—", after: "2,400", improvement: "Automated" }, { label: "Time to Hire", before: "100 days", after: "35 days", improvement: "65% faster" }, { label: "90-Day Retention", before: "—", after: "94%", improvement: "" }, { label: "Saved", before: "—", after: "₹45 Lakh", improvement: "" }]
  },
];

const candidateStories = [
  { name: "Priya S.", situation: "Product Manager, laid off Feb 2026", result: "4 offers in 30 days. Accepted ₹28 LPA role at Series C startup. 3x previous salary.", stars: 5 },
  { name: "Amit R.", situation: "Lead Developer, startup collapsed", result: "Freelance income in Week 1. Full-time ₹35 LPA offer in Week 5.", stars: 5 },
  { name: "Rahul K.", situation: "CS graduate, 60+ rejections", result: "Cleared TCS Digital coding test. ₹7 LPA offer. Joined within 30 days.", stars: 5 },
];

const CustomerStoriesPage = () => (
  <div className="min-h-screen bg-background">
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Team meeting" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          HireX Customer Stories — <span className="grad-text-cyan">Real Numbers. Zero Fluff.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          500+ companies. From Bangalore startups to Singapore enterprises. Every metric is from real HireX platform data.
        </p>
      </div>
    </section>

    {/* Aggregate Impact */}
    <section className="py-12 bg-card/50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Users, label: "Candidates Screened", value: "47,283+" },
          { icon: TrendingUp, label: "Hires Facilitated", value: "2,847" },
          { icon: Clock, label: "Avg Time-to-Hire", value: "8.3 days" },
          { icon: DollarSign, label: "Avg Cost Saved/Company", value: "₹34L/yr" },
        ].map((s, i) => (
          <div key={i} className="glass-card rounded-xl p-6 text-center">
            <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Case Studies */}
    <section className="py-20 max-w-6xl mx-auto px-6 space-y-12">
      {caseStudies.map((cs, i) => (
        <div key={i} className={`glass-card rounded-2xl p-8 bg-gradient-to-br ${cs.color}`}>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div>
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Case Study {i + 1}</div>
              <h2 className="text-2xl font-bold">{cs.title}</h2>
              <p className="text-accent font-medium">{cs.subtitle}</p>
              <span className="text-xs text-muted-foreground">{cs.industry}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {cs.metrics.map((m, j) => (
              <div key={j} className="bg-background/50 rounded-xl p-4">
                <div className="text-xs text-muted-foreground mb-1">{m.label}</div>
                {m.before !== "—" && <div className="text-sm text-destructive line-through">{m.before}</div>}
                <div className="text-lg font-bold text-primary">{m.after}</div>
                {m.improvement && <div className="text-xs text-accent">{m.improvement}</div>}
              </div>
            ))}
          </div>
          {cs.quote && (
            <div className="flex items-start gap-3 bg-background/30 rounded-xl p-4">
              <Quote className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="italic text-muted-foreground">"{cs.quote}"</p>
                <p className="text-xs text-primary mt-2">— {cs.author}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>

    {/* Candidate Stories */}
    <section className="py-20 bg-card/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Candidate <span className="grad-text">Success Stories</span></h2>
        <div className="grid md:grid-cols-3 gap-6">
          {candidateStories.map((s, i) => (
            <div key={i} className="glass-card-warm rounded-2xl p-6 hover:glow-border-teal transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: s.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="text-lg font-bold mb-1">{s.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{s.situation}</p>
              <p className="text-sm text-accent">{s.result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Join 500+ Companies Transforming Hiring</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/business/pricing" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition">Start Free Trial</Link>
          <Link to="/demo" className="px-8 py-4 rounded-xl glass-card font-semibold hover:bg-white/10 transition">Book Demo</Link>
        </div>
      </div>
    </section>
  </div>
);

export default CustomerStoriesPage;
