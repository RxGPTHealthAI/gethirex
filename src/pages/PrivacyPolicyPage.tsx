import { Shield, Lock, Eye, Server, FileCheck, CheckCircle2 } from "lucide-react";

const sections = [
  { icon: Shield, title: "1. What Data We Collect", items: [
    { subtitle: "Employer Data", points: ["Company name, address, GST/TIN number", "HR admin email, phone, designation", "Job descriptions, hiring preferences, ATS credentials", "Payment information (processed via Stripe/Razorpay — not stored by HireX)", "Usage analytics (features used, sessions, API calls)"] },
    { subtitle: "Candidate Data", points: ["Resume content: name, contact details, work history, education, skills", "Self-assessments and test responses", "Interview recordings (with explicit consent only)", "Job preferences, salary expectations, location", "Application status and communication history"] },
  ]},
  { icon: Eye, title: "2. How We Use Your Data", items: [
    { subtitle: "", points: ["Employer data: Platform authentication, billing, ATS integration, service delivery, support", "Candidate data: AI matching, resume optimization, interview scheduling, personalization", "Aggregate analytics: Platform improvement (never individual-identified)", "Legal compliance: Regulatory reporting, fraud prevention, audit obligations"] },
  ]},
  { icon: Server, title: "3. Data Storage & Security", items: [
    { subtitle: "", points: ["All data stored on Google Cloud Platform (GCP), Mumbai region (asia-south1) for India, EU region for European users", "Encryption: AES-256 at rest, TLS 1.3 in transit", "Access controls: Role-based access, MFA required for all admin access", "Retention: Active account data retained during subscription + 90 days post-cancellation"] },
  ]},
  { icon: FileCheck, title: "4. Your Data Rights (DPDP / GDPR)", items: [
    { subtitle: "", points: ["Right to Access: Request a copy of all personal data", "Right to Correction: Update inaccurate or incomplete data", "Right to Erasure: Delete your account and all data (72-hour completion)", "Right to Portability: Export your data in JSON/CSV format", "Right to Object: Opt out of AI scoring or marketing", "Right to Withdraw Consent: Stop processing at any time", "Right to Lodge Complaint: Contact India DPDP Authority or EU supervisory authority"] },
  ]},
  { icon: Lock, title: "5. Data Sharing", items: [
    { subtitle: "", points: ["We NEVER sell candidate or employer data to third parties", "Shared with: Authorized ATS/HRIS partners (employer-directed)", "Payment processors (Stripe, Razorpay) — minimal billing data only", "Background verification partners (AuthBridge, Checkr) — employer-directed, candidate-consented", "Legal authorities: Only when legally compelled with written order"] },
  ]},
];

const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-background">
    <section className="py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Privacy <span className="grad-text-cyan">Policy</span></h1>
        <p className="text-sm text-muted-foreground mb-2">Effective: January 1, 2026 | Controller: GetHired Global Pvt Ltd</p>
        <p className="text-sm text-primary">DPO: dpo@gethirex.space</p>
        <p className="text-muted-foreground mt-6 max-w-3xl mx-auto text-sm">
          This Privacy Policy explains how HireX collects, uses, stores, and protects personal data. We comply with India's DPDP 2023, EU GDPR, and applicable laws in UAE, UK, and USA.
        </p>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-6 pb-20 space-y-12">
      {sections.map((s, i) => (
        <div key={i} className="glass-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <s.icon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold">{s.title}</h2>
          </div>
          {s.items.map((item, j) => (
            <div key={j} className="mb-4">
              {item.subtitle && <h3 className="text-sm font-semibold text-accent mb-2">{item.subtitle}</h3>}
              <div className="space-y-2">
                {item.points.map((p, k) => (
                  <div key={k} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">6. Cookies & Tracking</h2>
        <p className="text-sm text-muted-foreground">We use essential cookies (authentication, security), functional cookies (preferences), and analytics cookies (anonymized via Google Analytics). Third-party advertising cookies: NOT used.</p>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">7. Children's Privacy</h2>
        <p className="text-sm text-muted-foreground">HireX is not intended for users under 18. We do not knowingly collect data from minors.</p>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">8. Contact & DPO</h2>
        <p className="text-sm text-muted-foreground">Data Protection Officer: dpo@gethirex.space</p>
        <p className="text-sm text-muted-foreground">Response time: Within 30 days of verified request.</p>
      </div>
    </section>
  </div>
);

export default PrivacyPolicyPage;
