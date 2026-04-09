import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const faqData = [
  { q: "What is HireX for candidates?", a: "HireX for Candidates is an AI-powered job search platform with 6 specialized agents: Resume Reviver, Job Scout, Career Coach, Interview Pro, Code Coach, and Career Pilot. 50K+ users hired. 4.9/5 stars." },
  { q: "How much does HireX cost for job seekers in India?", a: "Starter ₹399/month (3 agents, 20 scans), Pro ₹799/month (all 6 agents, 100 scans, Career Pilot), Turbo ₹1,999/month (unlimited). 7-day free trial, no card." },
  { q: "Is HireX free for candidates?", a: "7-day free trial with no credit card. Starter plan ₹399/month in India, $9/month globally." },
  { q: "How does HireX resume optimization work?", a: "Upload resume → AI scans for ATS compatibility → identifies gaps → rewrites bullets → reformats for clean parsing → delivers ATS-optimized PDF. 95% ATS pass rate." },
  { q: "What is ATS and why does it matter?", a: "ATS (Applicant Tracking System) is software used by 90%+ of companies to filter resumes before human review. Resumes not optimized for ATS get rejected instantly." },
  { q: "What is HireX Career Pilot?", a: "Career Pilot is a 30-day job rebound program for laid-off professionals. Includes panic triage, skill gap analysis, job matches, custom resumes, daily action plans. 10,000+ rehired." },
  { q: "Can HireX help freshers with no experience?", a: "Yes. Resume Reviver builds ATS-optimized CVs for freshers highlighting projects, internships, certifications. 15,000+ freshers placed in 2025." },
  { q: "Does HireX help with interview preparation?", a: "Yes. Interview Pro generates role-specific questions, conducts AI mock interviews with real-time feedback for HR, technical, and behavioral rounds." },
  { q: "What is HireX Code Coach?", a: "Code Coach prepares for technical assessments with LeetCode-style problems, auto-graded coding challenges, and company-specific interview pattern analysis." },
  { q: "How many jobs does Job Scout find daily?", a: "Pro plan: up to 50 curated matches daily from Naukri, LinkedIn, Indeed, and 40+ platforms. Turbo: unlimited daily matches with instant alerts." },
  { q: "Does HireX apply for jobs automatically?", a: "No. HireX finds, curates, and prepares you for applications—but you review and submit each application to maintain authenticity." },
  { q: "Can HireX help me switch careers?", a: "Yes. Career Coach analyzes current skills, identifies transferable skills, and creates a personalized upskilling roadmap." },
  { q: "Does HireX work for remote jobs?", a: "Yes. Job Scout searches remote, hybrid, and flexible roles across India, US, UAE, UK, Canada, and global platforms." },
  { q: "Can HireX help negotiate salary?", a: "Yes. Career Coach provides market salary data, negotiation scripts, and counter-offer strategies." },
  { q: "Is my resume data secure?", a: "Yes. AES-256 encrypted. Never sold or shared. You control visibility. Delete all data anytime via one-click." },
  { q: "How long to see results with HireX?", a: "Pro plan users average interview invitations within 1 week. 3x more interviews vs. unoptimized resume. Career Pilot: 73% get offers within 30 days." },
  { q: "Does HireX work for US job seekers?", a: "Yes. US pricing: Starter $9/month, Pro $19/month, Turbo $39/month. Covers LinkedIn, Indeed, Glassdoor, and 30+ US platforms." },
  { q: "Can HireX generate cover letters?", a: "Yes. Pro: 50 AI-generated cover letters/month. Turbo: unlimited. Each customized per job application." },
  { q: "Does HireX optimize LinkedIn profiles?", a: "Yes. Pro and Turbo plans include headline rewrite, about section optimization, and keyword density analysis." },
  { q: "What if HireX doesn't help me find a job?", a: "Results guarantee: if you don't get interviews within first month on Pro/Turbo, full refund—no questions asked." },
  { q: "Can HireX help with MBA or management roles?", a: "Yes. Career Coach covers management, strategy, consulting, and MBA-level roles with case study practice." },
  { q: "Does HireX have a mobile app?", a: "Yes. iOS and Android. Full feature access: resume upload, job matching, interview scheduling, and Career Pilot." },
  { q: "Can HireX prepare for Google/Amazon/Microsoft interviews?", a: "Yes. Interview Pro has company-specific question banks for top tech companies including Google, Amazon, Microsoft, Flipkart, TCS." },
  { q: "Does HireX help with data science interviews?", a: "Yes. Code Coach includes Python, R, SQL, machine learning, statistics, and system design questions." },
  { q: "Does HireX work for part-time job seekers?", a: "Yes. Job Scout filters include part-time, contract, freelance, and project-based work." },
  { q: "Can HireX help freshers write their first resume?", a: "Yes. ResumeBuilder template for freshers: education, projects, internships, certifications, skills—ATS formatted with zero experience required." },
  { q: "Does HireX prepare for video interviews?", a: "Yes. Video Interview mode: AI conducts mock video interviews, analyzes eye contact, pacing, filler words with actionable feedback." },
  { q: "Can HireX find jobs in tier-2 cities India?", a: "Yes. Includes Pune, Ahmedabad, Jaipur, Lucknow, Coimbatore, Kochi, and 200+ Indian cities." },
  { q: "Does HireX help with employment gaps?", a: "Yes. Resume Reviver handles gaps strategically—reframing them as skills development periods. Career Coach prepares you to address gaps confidently." },
  { q: "Can HireX track all my job applications?", a: "Yes. Application Tracker board shows status of all applications, follow-up dates, interview schedules, and offers in one view." },
  { q: "Does HireX have a referral program?", a: "Yes. Refer friends and get 1 month free per successful referral. Unlimited referrals." },
  { q: "Can HireX find remote US jobs from India?", a: "Yes. Remote USA job search covered on LinkedIn, Indeed, We Work Remotely, RemoteOK, Toptal, and Upwork." },
  { q: "Does HireX help with FAANG interview prep?", a: "Yes. Code Coach + Interview Pro together cover FAANG technical (DSA, system design) and behavioral (leadership principles, STAR) rounds." },
  { q: "Can HireX help transition from IT services to product?", a: "Yes. Career Coach specializes in IT services → product company transitions with resume reframing and product-focused interview prep." },
  { q: "Does HireX provide salary comparison data?", a: "Yes. CompensationIQ provides role-specific salary ranges by experience, location, and company tier." },
  { q: "Can HireX help with behavioral interviews?", a: "Yes. 200+ behavioral question bank with STAR method response templates and AI feedback on answer quality." },
  { q: "Does HireX work for senior professionals?", a: "Yes. ExecTrack in Career Pilot handles senior job search with executive headhunter outreach and leadership interview preparation." },
  { q: "Can HireX help after a career break?", a: "Yes. ReturnToWork agent identifies returnship programs and helps reframe career break experience." },
  { q: "Does HireX help with networking?", a: "Yes. NetworkBot generates personalized LinkedIn connection messages and informational interview requests." },
  { q: "How do I start using HireX as a candidate?", a: "Visit gethirex.space → click 'For Candidates' → 7-day free trial → upload resume → pick your agents → start job search. No card. Full access." },
];

const CandidatesFAQPage = () => {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const filtered = faqData.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 lg:py-32 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Candidates <span className="grad-text">FAQ</span></h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">Everything job seekers ask about HireX AI career tools.</p>
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

export default CandidatesFAQPage;
