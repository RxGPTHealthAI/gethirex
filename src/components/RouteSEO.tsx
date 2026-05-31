import { useLocation } from "react-router-dom";
import SEO from "./SEO";

type Meta = { title: string; description: string };

const META: Record<string, Meta> = {
  "/": {
    title: "HIREXAI | AI-Powered Hiring & Talent Intelligence",
    description: "AI recruitment platform with 27 autonomous agents. Source, screen, and hire 70% faster. Trusted by 500+ companies in India, US, UAE & UK.",
  },
  "/business": {
    title: "For Employers | HIREXAI AI Recruitment Platform",
    description: "Automate sourcing, screening, scheduling, onboarding & analytics with 27 AI agents. Replace your ATS or layer HIREXAI on top.",
  },
  "/candidate": {
    title: "For Candidates | Find Your Next Role with HIREXAI",
    description: "Discover roles, self-schedule interviews, and get hired faster with HIREXAI's AI-driven candidate experience.",
  },
  "/agents": {
    title: "Meet the 27 AI Agents | HIREXAI",
    description: "Explore HIREXAI's 27 autonomous AI agents across recruitment, onboarding, compliance, lifecycle, and analytics.",
  },
  "/how-it-works": {
    title: "How HIREXAI Works | AI Hiring End-to-End",
    description: "From job post to onboarding — see how HIREXAI's AI agents source, screen 10,000+ resumes in 60 seconds, and ship hires faster.",
  },
  "/process": {
    title: "Our Hiring Process | HIREXAI Implementation",
    description: "5-minute deployment, ATS integration, and AI-led hiring workflow — see HIREXAI's rollout process step by step.",
  },
  "/customer-stories": {
    title: "Customer Stories | HIREXAI Case Studies",
    description: "How 500+ companies use HIREXAI to cut time-to-hire by 70% and slash recruitment cost. Real case studies inside.",
  },
  "/team": {
    title: "Our Team | HIREXAI",
    description: "Meet the engineers, recruiters, and operators building HIREXAI's autonomous hiring platform.",
  },
  "/demo": {
    title: "Book a Demo | HIREXAI",
    description: "See HIREXAI live. Book a 30-minute demo and watch our AI agents source and screen candidates in real time.",
  },
  "/pricing": {
    title: "Pricing | HIREXAI Plans for India & Global",
    description: "Plans from ₹8,299/month. 14-day free trial, no credit card. Unlimited jobs on Growth. Custom Enterprise pricing available.",
  },
  "/integrations": {
    title: "Integrations | HIREXAI + Workday, Greenhouse, Naukri",
    description: "1-click integrations with Workday, Greenhouse, BambooHR, Zoho Recruit, Naukri, LinkedIn, Slack, and 50+ more.",
  },
  "/contact": {
    title: "Contact HIREXAI | Talk to Sales or Support",
    description: "Reach the HIREXAI team for sales, partnerships, or product support. Email care@gethirex.space or call +91 7735405034.",
  },
  "/blog": {
    title: "Blog | HIREXAI on AI Recruitment & HR",
    description: "Insights on AI-driven hiring, HR automation, recruitment strategy, and the future of talent acquisition.",
  },
  "/hr-faq": {
    title: "HR FAQ | Questions from Employers | HIREXAI",
    description: "Answers to the most common questions HR teams ask about HIREXAI: pricing, ATS integration, compliance, AI bias, and more.",
  },
  "/candidates-faq": {
    title: "Candidate FAQ | Job Seekers | HIREXAI",
    description: "Common questions from candidates about applying, AI interviews, profile privacy, and getting hired through HIREXAI.",
  },
  "/privacy": { title: "Privacy Policy | HIREXAI", description: "How HIREXAI collects, uses, and protects your personal data." },
  "/refund": { title: "Refund Policy | HIREXAI", description: "HIREXAI's refund and cancellation policy for subscription plans." },
  "/terms": { title: "Terms of Service | HIREXAI", description: "Terms governing the use of HIREXAI's AI recruitment platform." },
  "/security": { title: "Security | HIREXAI", description: "HIREXAI's security posture: AES-256 encryption, SOC 2 controls, DPDP & GDPR compliance." },
  "/gdpr": { title: "GDPR Compliance | HIREXAI", description: "How HIREXAI complies with the EU General Data Protection Regulation." },
  "/cookies": { title: "Cookie Policy | HIREXAI", description: "How HIREXAI uses cookies and similar technologies." },
};

const RouteSEO = () => {
  const { pathname } = useLocation();
  // Skip routes that handle their own SEO (blog post)
  if (pathname.startsWith("/blog/") && pathname !== "/blog") return null;
  if (pathname.startsWith("/admin")) return null;
  const meta = META[pathname];
  if (!meta) return null;
  return <SEO title={meta.title} description={meta.description} path={pathname} />;
};

export default RouteSEO;
