import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Upload, Brain, Calendar, UserCheck, Zap, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hr-ai-interface.jpg";
import agentsImg from "@/assets/ai-agents-collab.jpg";

const AnimatedCounter = ({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const step = end / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
};

const steps = [
  { icon: Upload, title: "Drop Your Job Description", time: "Minute 1", desc: "Upload your JD in any format. HireX AI instantly parses requirements and builds a custom 17-point scoring algorithm specific to your role.", bullets: ["Supports JD in English, Hindi, and 12 regional Indian languages", "Auto-builds Boolean search strings for all connected job boards", "Notifies team via Slack/email: 'Sourcing started — results in 60 minutes'"] },
  { icon: Brain, title: "Get Perfect Shortlist in 60 Seconds", time: "60 Seconds", desc: "HireX's multi-agent AI screens every incoming application. Top 10% delivered to your inbox—pre-ranked with AI confidence scores.", bullets: ["Skills match (40%), Experience (30%), Culture (20%), Logistics (10%)", "Zero demographic bias: Name, gender, age stripped from scoring", "AI confidence scores and highlight summaries per candidate"] },
  { icon: Calendar, title: "Candidates Self-Schedule Interviews", time: "Hours 2–24", desc: "AI sends personalized outreach to each candidate with a self-scheduling link. No-show rate drops 80%.", bullets: ["Integrates with Google Calendar, Outlook, Calendly", "Video interview links auto-created for each session", "Automated follow-up if candidate hasn't scheduled in 24h"] },
  { icon: UserCheck, title: "Hire & Onboard — HRIS Auto-Syncs", time: "Day 3–7", desc: "Offer letter generated, e-signed, background check initiated, onboarding checklist auto-assigned.", bullets: ["DigiLocker integration for document verification in India", "HRIS sync: Workday, BambooHR, Darwinbox, SAP, Zoho People", "Analytics: Time-to-hire, cost-per-hire, source ROI, diversity metrics"] },
];

const metrics = [
  { label: "Candidates Screened", value: 47283, suffix: "+" },
  { label: "Hires Completed", value: 2847, suffix: "" },
  { label: "Total Savings", value: 4.7, suffix: "M", prefix: "$" },
  { label: "Avg Days to Hire", value: 8.3, suffix: "" },
  { label: "No-Show Rate", value: 4, suffix: "%", prefix: "<" },
];

const HowItWorksPage = () => (
  <div className="min-h-screen bg-background">
    {/* Hero */}
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="AI recruitment interface" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">4-Step AI Hiring Workflow</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          How HireX AI Recruitment <span className="grad-text-cyan">Works</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          From job post to hired candidate in as little as 3 days. No black-box AI. No manual work. Every step is visible, explainable, and auditable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">Book Demo</Link>
          <Link to="/business/pricing" className="px-8 py-4 rounded-xl glass-card text-foreground font-semibold hover:bg-white/10 transition">Start Free Trial</Link>
        </div>
      </div>
    </section>

    {/* Steps */}
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="space-y-16">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            {i < steps.length - 1 && (
              <div className="absolute left-8 top-24 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent hidden lg:block" />
            )}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {i + 1}</span>
                  <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">{step.time}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{step.title}</h2>
                <p className="text-muted-foreground mb-4 max-w-2xl">{step.desc}</p>
                <div className="space-y-2">
                  {step.bullets.map((b, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center my-8 lg:hidden">
                <ArrowDown className="w-6 h-6 text-primary/50 animate-bounce" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>

    {/* Live Metrics */}
    <section className="py-20 bg-card/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 grad-text-cyan">Live Platform Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center glow-border-cyan">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {m.prefix || ""}<AnimatedCounter end={m.value} suffix={m.suffix} />
              </div>
              <div className="text-sm text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Visual */}
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="rounded-3xl overflow-hidden glow-border-cyan">
        <img src={agentsImg} alt="AI agents collaborating" className="w-full h-64 md:h-96 object-cover" loading="lazy" width={1920} height={1080} />
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Hiring?</h2>
        <p className="text-lg text-muted-foreground mb-8">Watch AI screen 100 real resumes in 60 seconds — live, for your role.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/demo" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition">Watch 60-sec Demo</Link>
          <Link to="/business/pricing" className="px-8 py-4 rounded-xl glass-card font-semibold hover:bg-white/10 transition">Start 14-Day Free Trial</Link>
        </div>
      </div>
    </section>
  </div>
);

export default HowItWorksPage;
