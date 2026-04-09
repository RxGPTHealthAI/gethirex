import { Link } from "react-router-dom";
import { Calendar, Video, Mail, Clock, CheckCircle2, ArrowRight } from "lucide-react";

const demoTypes = [
  { type: "Quick Win Demo", duration: "15 minutes", best: "Startups, first look", book: "Calendly" },
  { type: "Enterprise Deep Dive", duration: "60 minutes", best: "MNCs, compliance focus", book: "Email sales@gethirex.space" },
  { type: "BPO Volume Demo", duration: "30 minutes", best: "BPO/volume hiring", book: "Email sales@gethirex.space" },
  { type: "Candidate Platform", duration: "20 minutes", best: "HR teams evaluating candidate UX", book: "Calendly" },
  { type: "API/Integration Demo", duration: "45 minutes", best: "CTOs, tech teams", book: "Email tech@gethirex.space" },
];

const whatYoullSee = [
  "AI screens 100 real resumes for YOUR role in 60 seconds",
  "Live ranking with AI confidence scores and explanations",
  "Your exact ATS integration demonstrated (Workday/BambooHR/Greenhouse)",
  "Custom pricing built for your company size and hiring volume",
  "30-day ROI projection based on your current hiring costs",
  "Q&A with a HireX AI recruitment specialist",
];

const postDemo = [
  "Free trial activated immediately (14 days, full access)",
  "Custom implementation plan sent within 24 hours",
  "ATS integration walkthrough scheduled if needed",
  "Pricing proposal tailored to your exact needs",
  "Slack channel opened with your HireX specialist",
];

const DemoPage = () => (
  <div className="min-h-screen bg-background">
    <section className="py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <Video className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">93% of HR teams that see HireX live sign up same day</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          See HireX Screen 100 Resumes <span className="grad-text-cyan">Live</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          15-minute demo, zero fluff. A real HireX specialist will screen actual candidates for YOUR specific role, live on screen, in real time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://calendly.com/hirex/15min-demo" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition inline-flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Book 15-Min Demo
          </a>
          <a href="mailto:demo@gethirex.space" className="px-8 py-4 rounded-xl glass-card font-semibold hover:bg-white/10 transition inline-flex items-center gap-2">
            <Mail className="w-5 h-5" /> Email for Priority Scheduling
          </a>
        </div>
        <p className="text-sm text-muted-foreground mt-4">Available: Mon–Fri, 10 AM – 6 PM IST | 9 AM – 5 PM EST | 10 AM – 5 PM GST</p>
      </div>
    </section>

    <section className="py-16 bg-card/50">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">What You'll See in 15 Minutes</h2>
          <div className="space-y-3">
            {whatYoullSee.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">After Your Demo</h2>
          <div className="space-y-3">
            {postDemo.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Demo Types</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoTypes.map((d, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 hover:glow-border-cyan transition-shadow">
            <h3 className="text-lg font-bold mb-2">{d.type}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Clock className="w-4 h-4 text-primary" /> {d.duration}
            </div>
            <p className="text-sm text-muted-foreground mb-4">Best for: {d.best}</p>
            <p className="text-xs text-primary font-medium">{d.book}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="py-20 text-center bg-card/50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Can't Find a Slot?</h2>
        <p className="text-muted-foreground mb-6">Email demo@gethirex.space for priority scheduling. Response within 2 hours.</p>
        <Link to="/contact" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition inline-block">Contact Us</Link>
      </div>
    </section>
  </div>
);

export default DemoPage;
