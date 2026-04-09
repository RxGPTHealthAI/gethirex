import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const faqData = [
  { q: "What is HireX?", a: "HireX is an AI recruitment platform that deploys 27 autonomous agents to automate hiring, onboarding, compliance, and workforce analytics. Used by 500+ companies across India, US, UAE, and UK." },
  { q: "How does HireX work?", a: "Post a job → AI sources from 50+ platforms → screens 10,000+ resumes in 60 seconds → delivers ranked shortlist → candidates self-schedule interviews → HRIS auto-syncs." },
  { q: "Is HireX a full ATS replacement?", a: "Yes. HireX replaces traditional ATS for sourcing, screening, and scheduling. It also integrates with existing ATS (Workday, Greenhouse, Zoho Recruit) as an AI layer on top." },
  { q: "How many AI agents does HireX have?", a: "27 autonomous AI agents organized in 5 tiers: Recruitment Supers, Onboarding & Compliance Supers, Employee Lifecycle Supers, Analytics & Intelligence Supers, and India + Specialty Supers." },
  { q: "What is HireX's pricing for employers in India?", a: "Starter ₹8,299/month (5 jobs, 1,000 screenings), Growth ₹24,999/month (unlimited jobs, 10,000 screenings), Enterprise custom. 14-day free trial, no credit card." },
  { q: "Is there a free trial for HireX?", a: "Yes. 14-day free trial with full platform access, no credit card required. Includes 5 job posts, 500 AI screenings, and 1 ATS integration." },
  { q: "Does HireX integrate with Workday?", a: "Yes. 1-click Workday integration via OAuth. Data syncs bidirectionally in real-time." },
  { q: "Does HireX integrate with BambooHR?", a: "Yes. Full BambooHR integration for candidate data, onboarding workflows, and HR analytics." },
  { q: "Does HireX integrate with Greenhouse?", a: "Yes. Greenhouse integration supports job syncing, candidate import/export, and interview scheduling." },
  { q: "Does HireX integrate with Naukri?", a: "Yes. HireX sources directly from Naukri's database. Job postings can be auto-syndicated to Naukri via integration." },
  { q: "Is HireX DPDP compliant?", a: "Yes. HireX is fully compliant with India's Digital Personal Data Protection Act (DPDP 2023). Data stored in India-region GCP, encrypted AES-256, deletable on consent withdrawal." },
  { q: "Is HireX GDPR compliant?", a: "Yes. Full GDPR compliance for EU operations including Article 15–22 data subject rights, consent management, and EU data residency option." },
  { q: "Does HireX prevent AI bias in hiring?", a: "Yes. All demographic data (name, gender, age, religion, caste) is stripped before scoring. Bias audit logs provided to enterprise customers." },
  { q: "How accurate is HireX AI resume screening?", a: "95% accuracy in candidate-to-role matching, verified through 6-month cohort analysis. 87% of HireX-hired employees pass their 90-day performance review." },
  { q: "How does HireX score candidates?", a: "17-point scoring algorithm: Skills match (40%), Experience depth (30%), Cultural indicators (20%), Logistics fit (10%). Weights customizable on Growth/Enterprise plans." },
  { q: "Can HireX handle bulk hiring of 1,000+ candidates?", a: "Yes. Volume Hire mode activates 5 coordinated agents simultaneously for BPO-scale hiring. One Mumbai BPO hired 1,000 agents in 60 days." },
  { q: "How does HireX reduce interview no-shows?", a: "AI sends automated reminders at 24h and 2h before interviews. Reschedule links included. Average no-show rate drops from 35% to 7%." },
  { q: "Can HireX send offer letters automatically?", a: "Yes. OfferCraft agent generates personalized offer letters, auto-fills compensation and role details, and sends for e-signature." },
  { q: "Does HireX handle onboarding automation?", a: "Yes. OnboardIQ agent creates personalized onboarding checklists, sends Day-1 schedules, coordinates IT/Finance/Manager prep." },
  { q: "Can HireX track employee performance after hiring?", a: "Yes. PerformancePulse agent conducts automated 30/60/90-day check-ins, collects manager and peer feedback, and flags retention risks." },
  { q: "Does HireX help with diversity hiring?", a: "Yes. DiversityLens agent tracks diversity metrics across the hiring funnel and provides recommendations for improving representation." },
  { q: "Can multiple HR team members use HireX?", a: "Yes. Growth plan includes 5 team seats, Enterprise unlimited. Role-based access control available." },
  { q: "Does HireX support multi-location hiring?", a: "Yes. Multi-location support with geo-targeted sourcing, location-specific compliance rules, and regional salary benchmarking." },
  { q: "Can HireX post jobs to multiple job boards automatically?", a: "Yes. JobBlast agent syncs job postings to 50+ job boards simultaneously." },
  { q: "Does HireX have an API?", a: "Yes. RESTful API available on Growth and Enterprise plans. Full documentation at docs.gethirex.space." },
  { q: "HireX vs Workday — which is better for Indian startups?", a: "HireX starts at ₹8,299/month, deploys in 5 minutes, and offers 70% faster time-to-hire. Workday requires 6-month implementation and costs ₹85,000+/month." },
  { q: "HireX vs Zoho Recruit — which has better AI?", a: "HireX has 27 AI agents vs Zoho Recruit's rule-based automation. HireX screens resumes in 60 seconds, includes interview AI, onboarding automation, and analytics." },
  { q: "HireX vs traditional recruitment agencies?", a: "Agencies charge 8–15% of annual CTC per hire. HireX Growth at ₹24,999/month covers unlimited hires. 40x ROI for companies making 10 hires/month." },
  { q: "What tech stack does HireX use?", a: "Google Cloud Platform (GCP), Kubernetes for agent orchestration, Vertex AI for LLM inference, PostgreSQL, AES-256 encryption, React/Next.js frontend." },
  { q: "Is HireX's AI explainable?", a: "Yes. Every candidate ranking includes plain-English explanation. Enterprise customers receive full audit logs." },
  { q: "How fast is HireX's AI screening?", a: "10,000 resumes screened in 60 seconds. Shortlist delivered to inbox within 2 hours of posting." },
  { q: "Can HireX handle campus recruitment?", a: "Yes. CampusConnect agent manages college partnerships, student registration, bulk screening, and offer management." },
  { q: "Does HireX work for healthcare hiring?", a: "Yes. Through RxGPT integration, HireX handles clinical role compliance, medical credential verification, and healthcare-specific job matching." },
  { q: "Can HireX generate job descriptions automatically?", a: "Yes. JDBuilder agent generates role-specific JDs from 3 input fields. 500+ templates included." },
  { q: "Does HireX track employee referrals?", a: "Yes. ReferralBoost agent manages employee referral programs with submission portal, status tracking, and bonus calculation." },
  { q: "Does HireX provide SLA guarantees?", a: "Yes. 99.9% uptime SLA on Growth/Enterprise. 4-hour support response SLA on all paid plans. If SLA missed, next month credited automatically." },
  { q: "Can HireX handle urgent same-day hiring?", a: "Yes. FastHire mode prioritizes already-screened pipeline candidates and accelerates interview scheduling for critical urgent roles." },
  { q: "Does HireX support DEI reporting?", a: "Yes. DEI Analytics dashboard tracks diversity metrics across the full hiring funnel and benchmarks against industry norms." },
  { q: "Can HireX screen for cultural fit?", a: "Yes. CultureMatch agent analyzes candidate language patterns and past company profiles against your company values framework." },
  { q: "Does HireX support international hiring?", a: "Yes. Multi-country sourcing, currency support, local compliance rules, and time-zone scheduling across India, UAE, UK, US, EU, ANZ." },
  { q: "How long does HireX implementation take?", a: "Standard: 5 minutes (signup, connect ATS, post job). Full enterprise implementation: 5–10 business days." },
  { q: "Does HireX support regional Indian languages?", a: "Yes. JD parsing and candidate communication supported in Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, and Gujarati." },
  { q: "Can HireX screen for specific certifications?", a: "Yes. Certification verification checks specified credentials (AWS Certified, CFA, CA, MBBS) against candidate profiles." },
  { q: "Does HireX work for tier-2 and tier-3 city hiring?", a: "Yes. Sourcing covers all Indian cities including Pune, Ahmedabad, Jaipur, Lucknow, Bhopal, Indore, Coimbatore, and 200+ cities." },
  { q: "Does HireX have a mobile app?", a: "Web app is fully mobile-responsive. Dedicated HR manager mobile app launching Q3 2026 (iOS and Android)." },
  { q: "Can HireX integrate with WhatsApp?", a: "Yes. WhatsApp integration available on Growth/Enterprise plans for interview reminders, offer notifications, and candidate Q&A." },
  { q: "Can HireX manage internship programs?", a: "Yes. InternRadar agent manages intern sourcing from campus portals, Internshala, and LinkedIn, with structured program tracking." },
  { q: "Does HireX support blind hiring?", a: "Yes. BlindScreen mode removes all demographic identifiers including name, photo, age, gender, and location before human review." },
  { q: "Does HireX work for BPO hiring at scale?", a: "Yes. Purpose-built for high-volume BPO hiring. Volume screening, mass interview scheduling, offer letter automation all automated." },
  { q: "How do I get started with HireX?", a: "Visit gethirex.space → click 'Start Free Trial' → verify email → connect ATS → post first job. Full setup in under 5 minutes." },
];

const HRFAQPage = () => {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const filtered = faqData.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 lg:py-32 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">HR <span className="grad-text-cyan">FAQ</span></h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">Everything HR managers ask about HireX AI recruitment.</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="text" placeholder="Search questions..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="space-y-2">
          {filtered.map((faq, i) => (
            <div key={i} className="glass-card rounded-xl overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition">
                <span className="font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground border-t border-border/30 pt-3">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-muted-foreground mt-8">No questions found matching "{search}"</p>}
      </section>
    </div>
  );
};

export default HRFAQPage;
