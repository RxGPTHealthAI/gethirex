const TermsPage = () => (
  <div className="min-h-screen bg-background">
    <section className="py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Terms of <span className="grad-text-cyan">Service</span></h1>
        <p className="text-sm text-muted-foreground">Effective: January 1, 2026 | Operated by GetHired Global Pvt Ltd, Bangalore, India</p>
        <p className="text-sm text-muted-foreground mt-2">Questions: legal@gethirex.space</p>
      </div>
    </section>

    <section className="max-w-4xl mx-auto px-6 pb-20 space-y-8">
      {[
        { title: "1. Eligibility & Accounts", content: "You must be 18+ to use HireX. Employers must be legally registered businesses. Candidates must provide accurate profile information. One account per entity/individual. Sharing login credentials is prohibited." },
        { title: "2. Acceptable Use — Employers", content: "✅ Allowed: Posting genuine job openings, screening real candidates, using AI agents for legitimate hiring.\n❌ Not Allowed: Fake job postings, data scraping, candidate data export for non-hiring purposes, SPAM to candidates, discriminatory screening criteria." },
        { title: "3. Acceptable Use — Candidates", content: "✅ Allowed: Honest resume submission, genuine applications, interview scheduling, career coaching.\n❌ Not Allowed: False credentials, multiple accounts, proxy interviews, using platform for competitive intelligence." },
        { title: "4. Intellectual Property", content: "HireX platform, AI models, agents, and algorithms are proprietary to GetHired Global Pvt Ltd. Your data remains yours. You grant HireX a limited license to process your data to provide services." },
        { title: "5. Payment Terms", content: "Payments processed via Stripe (international) and Razorpay (India). Plans auto-renew unless cancelled. Price changes: 30-day advance notice. Disputed charges: Contact care@gethirex.space within 30 days." },
        { title: "6. Limitation of Liability", content: "HireX is not liable for: Hiring decisions made using AI recommendations, candidate misrepresentation, employer misrepresentation, third-party ATS/HRIS failures, or force majeure events. Maximum liability: 3 months of subscription fees paid." },
        { title: "7. Governing Law", content: "These Terms are governed by the laws of India. Disputes resolved by arbitration in Bangalore, Karnataka under the Arbitration and Conciliation Act 1996. EU users: GDPR rights supersede where applicable." },
      ].map((s, i) => (
        <div key={i} className="glass-card rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">{s.title}</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{s.content}</p>
        </div>
      ))}
    </section>
  </div>
);

export default TermsPage;
