import { CheckCircle2, Clock, Zap } from "lucide-react";

const atsIntegrations = [
  { name: "Workday", type: "OAuth 2.0", setup: "60 sec", plan: "Growth+", sync: "Bidirectional" },
  { name: "Greenhouse", type: "Harvest API", setup: "60 sec", plan: "Starter+", sync: "Bidirectional" },
  { name: "Lever", type: "OAuth 2.0", setup: "60 sec", plan: "Starter+", sync: "Bidirectional" },
  { name: "BambooHR", type: "API Key", setup: "60 sec", plan: "Starter+", sync: "Bidirectional" },
  { name: "Zoho Recruit", type: "OAuth 2.0", setup: "60 sec", plan: "Starter+", sync: "Bidirectional" },
  { name: "SmartRecruiters", type: "OAuth 2.0", setup: "60 sec", plan: "Growth+", sync: "Bidirectional" },
  { name: "Darwinbox", type: "OAuth 2.0", setup: "60 sec", plan: "Growth+", sync: "Bidirectional" },
  { name: "SAP SuccessFactors", type: "API", setup: "24h", plan: "Enterprise", sync: "Bidirectional" },
  { name: "ADP Workforce Now", type: "OAuth 2.0", setup: "24h", plan: "Enterprise", sync: "Bidirectional" },
  { name: "Keka", type: "API Key", setup: "60 sec", plan: "Starter+", sync: "Bidirectional" },
  { name: "greytHR", type: "API", setup: "60 sec", plan: "Starter+", sync: "Bidirectional" },
  { name: "iCIMS", type: "API", setup: "60 sec", plan: "Enterprise", sync: "Bidirectional" },
];

const jobBoards = [
  "Naukri.com", "LinkedIn", "Indeed", "Shine.com", "Monster India", "TimesJobs",
  "Apna", "Internshala", "Freshersworld", "AngelList / Wellfound", "Glassdoor",
  "RemoteOK", "We Work Remotely", "Otta", "Reed", "Seek", "JobStreet", "Bayt",
];

const commTools = [
  { name: "Google Calendar", use: "Interview scheduling" },
  { name: "Outlook Calendar", use: "Interview scheduling" },
  { name: "Zoom", use: "Video interviews" },
  { name: "Microsoft Teams", use: "Video + collaboration" },
  { name: "Google Meet", use: "Video interviews" },
  { name: "Slack", use: "HR team notifications" },
  { name: "WhatsApp Business", use: "Candidate communication" },
  { name: "Calendly", use: "Demo/interview booking" },
];

const bgvPartners = [
  { name: "AuthBridge", region: "India", services: "Employment, education, criminal, ID" },
  { name: "Checkr", region: "USA", services: "Criminal, employment, MVR" },
  { name: "Sterling", region: "Global", services: "Comprehensive BGV" },
];

const IntegrationsPage = () => (
  <div className="min-h-screen bg-background">
    <section className="py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">50+ Integrations. 60-Second Setup.</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Connect Your Entire <span className="grad-text-cyan">HR Tech Stack</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          HireX plugs into your existing ATS, HRIS, job boards, and communication tools via 1-click OAuth. No IT tickets. No 6-month implementation.
        </p>
      </div>
    </section>

    {/* ATS */}
    <section className="py-16 max-w-6xl mx-auto px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">ATS Integrations</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {atsIntegrations.map((a, i) => (
          <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4 hover:glow-border-cyan transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-primary">{a.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{a.name}</div>
              <div className="text-xs text-muted-foreground">{a.type} · {a.sync}</div>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Clock className="w-3 h-3 text-primary" />
              <span className="text-primary">{a.setup}</span>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Job Boards */}
    <section className="py-16 bg-card/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Job Board Sourcing</h2>
        <div className="flex flex-wrap gap-3">
          {jobBoards.map((jb, i) => (
            <span key={i} className="px-4 py-2 glass-card rounded-full text-sm font-medium hover:bg-primary/10 transition">{jb}</span>
          ))}
        </div>
      </div>
    </section>

    {/* Communication & Scheduling */}
    <section className="py-16 max-w-6xl mx-auto px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Communication & Scheduling</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {commTools.map((t, i) => (
          <div key={i} className="glass-card rounded-xl p-4 text-center hover:glow-border-cyan transition-shadow">
            <div className="font-semibold text-sm mb-1">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.use}</div>
          </div>
        ))}
      </div>
    </section>

    {/* BGV */}
    <section className="py-16 bg-card/50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Background Verification</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {bgvPartners.map((b, i) => (
            <div key={i} className="glass-card rounded-xl p-6">
              <h3 className="font-bold mb-1">{b.name}</h3>
              <p className="text-sm text-primary mb-2">{b.region}</p>
              <p className="text-sm text-muted-foreground">{b.services}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default IntegrationsPage;
