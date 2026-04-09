import { CheckCircle2, Mail } from "lucide-react";

const RefundPolicyPage = () => (
  <div className="min-h-screen bg-background">
    <section className="py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Refund <span className="grad-text-cyan">Policy</span></h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">14 Days. Full Refund. No Questions Asked.</p>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-6 pb-20 space-y-8">
      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4 text-primary">Employer Refund Policy</h2>
        <div className="space-y-3">
          {["14-Day Full Refund: Cancel any paid plan within 14 days for 100% refund, no questions asked",
            "Monthly Plans: Cancel anytime. No refund for partial months after day 14.",
            "Annual Plans: Full refund within 14 days. Pro-rated refund months 2–12 minus 10% admin fee.",
            "Enterprise: Custom refund terms per contract. Minimum 30-day notice.",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4 text-accent">Candidate Refund Policy</h2>
        <div className="space-y-3">
          {["7-Day Free Trial: No charge. Cancel before day 7 with zero obligation.",
            "Month 1 Results Guarantee: No interviews in first paid month (Pro/Turbo)? Full refund.",
            "Annual Plans: Refundable in full during Month 1. Prorated after.",
            "Turbo Plan: Same 30-day results guarantee applies.",
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">How to Request a Refund</h2>
        <p className="text-sm text-muted-foreground mb-4">Email support@gethirex.space with:</p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Account email address</li>
          <li>Reason for refund (optional but appreciated)</li>
          <li>Payment reference number</li>
        </ol>
        <p className="text-sm text-muted-foreground mt-4">Refunds processed within 5–7 business days to original payment method.</p>
        <div className="mt-4 flex items-center gap-2 text-sm text-primary">
          <Mail className="w-4 h-4" /> support@gethirex.space — Response within 24 hours
        </div>
      </div>
    </section>
  </div>
);

export default RefundPolicyPage;
