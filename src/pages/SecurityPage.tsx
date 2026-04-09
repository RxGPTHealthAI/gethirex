import { Shield, Lock, Server, Eye, CheckCircle2 } from "lucide-react";

const SecurityPage = () => (
  <div className="min-h-screen bg-background">
    <section className="py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">SOC2 Type 2 In Process | AES-256 | Zero Trust</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Security at <span className="grad-text-cyan">HireX</span></h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Enterprise-grade security protecting the data of 500+ companies and 50,000+ candidates.
        </p>
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-8">
      {[
        { icon: Lock, title: "Encryption", items: ["AES-256 encryption at rest", "TLS 1.3 encryption in transit", "Key management via Google Cloud KMS", "Automated key rotation every 90 days"] },
        { icon: Server, title: "Infrastructure", items: ["Google Cloud Platform (GCP)", "India data residency: asia-south1 (Mumbai)", "EU data residency: europe-west1", "99.9% uptime SLA guaranteed"] },
        { icon: Shield, title: "Compliance", items: ["SOC2 Type 2 audit in progress (Q3 2026)", "GDPR compliant for EU operations", "DPDP 2023 compliant for India", "EEOC fair hiring (US Enterprise)"] },
        { icon: Eye, title: "Access Controls", items: ["Role-based access control (RBAC)", "Multi-factor authentication (MFA) mandatory", "SAML 2.0 / Google SSO (Enterprise)", "Audit logging of all admin actions"] },
      ].map((s, i) => (
        <div key={i} className="glass-card rounded-2xl p-8 hover:glow-border-cyan transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <s.icon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold">{s.title}</h2>
          </div>
          <div className="space-y-3">
            {s.items.map((item, j) => (
              <div key={j} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  </div>
);

export default SecurityPage;
