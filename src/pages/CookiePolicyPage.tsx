const CookiePolicyPage = () => (
  <div className="min-h-screen bg-background">
    <section className="py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Cookie <span className="grad-text-cyan">Policy</span></h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">What we track, why, and how to control it.</p>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-6 pb-20 space-y-8">
      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-6">Types of Cookies We Use</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Purpose</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Opt Out?</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Retention</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Essential", purpose: "Login session, security tokens, CSRF", opt: "❌ Required", retention: "Session" },
                { type: "Functional", purpose: "Language preference, dashboard layout", opt: "✅ Optional", retention: "12 months" },
                { type: "Analytics", purpose: "Anonymized page visits, feature usage", opt: "✅ Optional", retention: "26 months" },
                { type: "Performance", purpose: "Page load speed, CDN optimization", opt: "✅ Optional", retention: "30 days" },
                { type: "Marketing", purpose: "❌ NOT USED", opt: "N/A", retention: "N/A" },
              ].map((r, i) => (
                <tr key={i} className="border-b border-border/30">
                  <td className="py-3 px-4 font-medium">{r.type}</td>
                  <td className="py-3 px-4 text-muted-foreground">{r.purpose}</td>
                  <td className="py-3 px-4">{r.opt}</td>
                  <td className="py-3 px-4 text-muted-foreground">{r.retention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">Third-Party Cookies</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Google Analytics 4: Anonymized usage analytics (IP anonymization enabled)</li>
          <li>• Stripe: Payment session management (billing pages only)</li>
          <li>• Calendly: Demo booking widget (only on /demo page)</li>
          <li>• Hotjar: Optional UX heatmaps (can be opted out)</li>
        </ul>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">How to Manage Cookies</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✅ Cookie Consent Banner: Accept all, customize, or decline optional cookies</li>
          <li>✅ Browser Settings: Block cookies at browser level</li>
          <li>✅ Google Analytics opt-out: tools.google.com/dlpage/gaoptout</li>
        </ul>
      </div>

      <p className="text-sm text-primary text-center">⚙️ Questions: privacy@gethirex.space</p>
    </section>
  </div>
);

export default CookiePolicyPage;
