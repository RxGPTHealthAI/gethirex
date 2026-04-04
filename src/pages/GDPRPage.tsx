import { CheckCircle2, Shield } from "lucide-react";

const GDPRPage = () => (
  <div className="min-h-screen bg-background">
    <section className="py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">GDPR & DPDP <span className="grad-text-cyan">Compliance</span></h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Full data rights for every user. EU GDPR and India DPDP 2023 compliant.</p>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-6 pb-20 space-y-8">
      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> GDPR Compliance — EU Users</h2>
        <h3 className="text-sm font-semibold text-accent mb-3">Legal Basis for Processing</h3>
        <div className="space-y-2 mb-6">
          {["Contractual necessity: Data processing required to deliver recruitment services",
            "Legitimate interest: Security, fraud prevention, platform improvement",
            "Consent: AI interview analysis, marketing (explicit opt-in)",
            "Legal obligation: Tax, audit, regulatory compliance",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{t}</span>
            </div>
          ))}
        </div>
        <h3 className="text-sm font-semibold text-accent mb-3">Your GDPR Rights (Articles 15–22)</h3>
        <div className="space-y-2">
          {["Art 15 — Right to Access: Request a copy of your data (30 days)",
            "Art 16 — Right to Rectification: Correct inaccurate data",
            "Art 17 — Right to Erasure: Delete account and data (72h)",
            "Art 18 — Right to Restriction: Pause processing during disputes",
            "Art 20 — Right to Portability: Machine-readable format",
            "Art 21 — Right to Object: Opt out of AI scoring",
            "Art 22 — Automated Decisions: Request human review of AI decisions",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-accent" /> India DPDP 2023 Compliance</h2>
        <div className="space-y-2">
          {["Data Fiduciary: GetHired Global registered as Data Fiduciary",
            "Consent Manager: Granular consent per processing purpose",
            "Data Minimization: Only necessary recruitment data collected",
            "Data Localization: Indian data stored in India-region GCP (asia-south1)",
            "Consent Withdrawal: One-click available in account settings",
            "Grievance Officer: dpo@gethirex.space | Response within 30 days",
            "Data Breach: Notification within 72 hours to DPDP Board and affected users",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">Data Processing Agreements</h2>
        <p className="text-sm text-muted-foreground">HireX maintains signed DPAs with Google Cloud Platform, Stripe/Razorpay, AuthBridge/Checkr, and all ATS integration partners.</p>
        <p className="text-sm text-primary mt-3">📧 GDPR/DPDP requests: dpo@gethirex.space</p>
      </div>
    </section>
  </div>
);

export default GDPRPage;
