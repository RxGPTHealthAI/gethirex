import { Link } from "react-router-dom";

const heroStats = [
  { val: "40,000+", label: "Colleges Across India" },
  { val: "13M", label: "Students Graduate Every Year" },
  { val: "AI-First", label: "Workforce Is The Future" },
  { val: "Global", label: "Remote Opportunities" },
];

const problemPoints = [
  "Poor resumes",
  "Lack of AI skills",
  "Weak LinkedIn profiles",
  "No industry projects",
  "Limited internship experience",
  "Low interview confidence",
  "No employer visibility",
  "Limited networking opportunities",
];

const journey = [
  {
    year: "Year 2",
    title: "Career Discovery",
    items: ["AI Career Assessment", "Career GPS", "Resume Foundation", "LinkedIn Optimization", "Skill Gap Analysis"],
  },
  {
    year: "Year 3",
    title: "Industry Readiness",
    items: ["AI Upskilling", "Technical Projects", "Internship Matching", "Industry Mentorship", "Remote Work Opportunities"],
  },
  {
    year: "Year 4",
    title: "Placement Readiness",
    items: ["Resume Reviews", "Mock Interviews", "AI Assessments", "Placement Readiness Score", "Employer Matching"],
  },
  {
    year: "Graduation",
    title: "Career Acceleration",
    items: ["Full-Time Jobs", "Remote Jobs", "Consulting Opportunities", "Side Gigs", "Startup Opportunities"],
  },
];

const campusAgents = [
  { icon: "📊", name: "Placement Readiness Agent", desc: "Measures student readiness and identifies improvement areas." },
  { icon: "📄", name: "Resume Builder Agent", desc: "Creates ATS-friendly resumes optimized for technology hiring." },
  { icon: "🎤", name: "Interview Coach Agent", desc: "Provides mock interviews and real-time feedback." },
  { icon: "🤖", name: "AI Upskilling Agent", desc: "Prepares students for AI-first workplaces." },
  { icon: "🧭", name: "Career GPS Agent", desc: "Guides students toward the right technology career paths." },
  { icon: "🤝", name: "Employer Connect Agent", desc: "Matches students with hiring companies." },
  { icon: "🌐", name: "Remote Opportunities Agent", desc: "Finds remote jobs, freelance projects, and consulting opportunities." },
];

const differences = [
  { most: "Placement Drives", us: "Career Outcomes" },
  { most: "Starts in final year", us: "Starts in second year" },
  { most: "Help students find jobs", us: "Help students become employable" },
  { most: "Track placements", us: "Track career readiness" },
  { most: "Focus on local jobs", us: "Global, Remote, Side Gigs, Consulting, Startups" },
];

const exclusiveFeatures = [
  {
    tag: "Feature 1",
    name: "AI Readiness Index™",
    desc: "Measure how prepared students are for AI-first workplaces.",
    items: ["Bronze", "Silver", "Gold", "AI Fluency Levels"],
  },
  {
    tag: "Feature 2",
    name: "Placement Readiness Score™",
    desc: "Track employability across the dimensions that matter to employers.",
    items: ["Technical Skills", "Communication", "Projects", "Certifications", "Interview Readiness", "AI Literacy"],
  },
  {
    tag: "Feature 3",
    name: "Career GPS™",
    desc: "Identify the best-fit technology career path for every student.",
    items: ["Software Engineer", "AI Engineer", "Data Scientist", "Cybersecurity Analyst", "Cloud Engineer", "Product Manager", "Technical Sales", "Growth Marketer"],
  },
  {
    tag: "Feature 4",
    name: "HireX Remote Agent™",
    desc: "One Profile. One Click. Global Opportunities. From $50/hour to $200+/hour worldwide.",
    items: ["Remote Jobs", "Freelance Work", "Consulting Projects", "Contract Opportunities", "Side Gigs"],
  },
  {
    tag: "Feature 5",
    name: "Industry Project Marketplace™",
    desc: "Students gain real-world experience before graduation by working on live company projects.",
    items: ["AI Projects", "Software Projects", "Research Assignments", "Product Work", "Marketing Projects"],
  },
];

const careerDomains = [
  "Software Engineering",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "Product Management",
  "Technology Consulting",
  "Technical Sales",
  "Digital Marketing",
  "Startup Ecosystem",
];

const collegeBenefits = [
  "Higher Placement Rates",
  "Better Student Outcomes",
  "AI-Ready Graduates",
  "Improved Employability",
  "Stronger Employer Network",
  "Better Internship Outcomes",
  "Increased Industry Engagement",
  "Reduced Placement Team Workload",
  "Better NIRF & Outcome Metrics",
];

const studentBenefits = [
  "Better Resumes",
  "Better LinkedIn Profiles",
  "More Internships",
  "More Industry Exposure",
  "AI Skills Development",
  "Interview Readiness",
  "Remote Opportunities",
  "Global Job Access",
  "Stronger Career Outcomes",
];

const pricingFactors = [
  "Student Strength",
  "Number of Departments",
  "Placement Objectives",
  "AI Upskilling Requirements",
  "Employer Access Requirements",
  "Career Services Scope",
];

const CollegesPage = () => {
  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 40%, #0F1425 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(hsla(202, 72%, 59%, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, hsla(202, 72%, 59%, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }} />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-hirex-cyan/[0.06]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-primary/[0.08]" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-[900px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase glass-card text-hirex-cyan mb-8">
              <span className="w-2 h-2 rounded-full bg-hirex-cyan animate-pulse" />
              HireX For Colleges
            </div>

            <h1 className="font-display text-[clamp(40px,7vw,64px)] font-bold leading-[1.1] mb-6">
              From Second Year
              <br />
              <span className="grad-text-cyan">To First Job.</span>
            </h1>
            <p className="text-hirex-text2 text-lg md:text-xl max-w-[720px] mx-auto mb-6 opacity-90">
              HireX helps colleges prepare students for AI and technology careers through career discovery, AI upskilling, placement readiness, internships, remote opportunities, and employer connections.
            </p>
            <p className="text-hirex-text3 text-base max-w-[680px] mx-auto mb-10">
              Most placement platforms start in the final year. HireX starts in the <span className="text-hirex-cyan font-semibold">second year</span> — helping students become industry-ready long before graduation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <Link
                to="/contact"
                className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline text-foreground transition-all hover:-translate-y-0.5"
                style={{ background: "#4AB8E6" }}
              >
                Book Demo →
              </Link>
              <Link
                to="/contact"
                className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline glass-card text-foreground hover:bg-foreground/10 transition-all"
              >
                Become A Campus Partner →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {heroStats.map((s) => (
                <div key={s.label} className="glass-card rounded-xl p-5 text-center">
                  <div className="text-[24px] md:text-[28px] font-bold text-hirex-cyan">{s.val}</div>
                  <div className="text-xs text-hirex-text3 mt-2 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="container">
          <div className="text-center mb-12 max-w-[760px] mx-auto">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">The Gap</p>
            <h2 className="font-display text-[clamp(30px,5vw,40px)] font-semibold mb-5">
              The Problem <span className="opacity-40">Colleges Face.</span>
            </h2>
            <p className="text-hirex-text2 text-base md:text-lg">
              Most colleges focus on placements only during the final year. By then, it's often too late.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[900px] mx-auto mb-10">
            {problemPoints.map((p) => (
              <div key={p} className="glass-card rounded-xl p-4 text-sm text-hirex-text2 text-center">
                {p}
              </div>
            ))}
          </div>

          <p className="text-center text-hirex-text3 max-w-[680px] mx-auto">
            The result: <span className="text-foreground">Students graduate with degrees but not enough career readiness.</span>
          </p>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="py-24" style={{ background: "#0F1425" }}>
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">Student Journey</p>
            <h2 className="font-display text-[clamp(32px,5vw,40px)] font-semibold">
              The HireX <span className="grad-text-cyan">Student Journey.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {journey.map((j, i) => (
              <div key={j.year} className="glass-card glow-border-cyan rounded-2xl p-6 hover:-translate-y-1 transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase bg-hirex-cyan/10 text-hirex-cyan mb-4">
                  Stage {i + 1}
                </div>
                <div className="text-sm font-bold text-hirex-cyan mb-1">{j.year}</div>
                <h3 className="text-xl font-semibold mb-4">{j.title}</h3>
                <ul className="space-y-2">
                  {j.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-hirex-text2">
                      <span className="text-hirex-cyan mt-0.5">✓</span> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS AGENTS */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">AI Agents</p>
            <h2 className="font-display text-[clamp(32px,5vw,40px)] font-semibold">
              Meet The HireX <span className="grad-text-cyan">Campus AI Agents.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {campusAgents.map((a) => (
              <div key={a.name} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all group">
                <div className="text-3xl mb-4">{a.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-hirex-cyan transition-colors">{a.name}</h3>
                <p className="text-hirex-text2 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="py-24" style={{ background: "#0F1425" }}>
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">What Makes Us Different</p>
            <h2 className="font-display text-[clamp(32px,5vw,40px)] font-semibold">
              What Makes <span className="grad-text-cyan">HireX Different.</span>
            </h2>
          </div>

          <div className="max-w-[900px] mx-auto space-y-4">
            {differences.map((d, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-5">
                  <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-hirex-text3 mb-2">Most Platforms</div>
                  <div className="text-hirex-text2">{d.most}</div>
                </div>
                <div className="glass-card glow-border-cyan rounded-xl p-5">
                  <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-hirex-cyan mb-2">HireX</div>
                  <div className="text-foreground font-medium">{d.us}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXCLUSIVE FEATURES */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">Exclusive</p>
            <h2 className="font-display text-[clamp(32px,5vw,40px)] font-semibold">
              Exclusive Features <span className="opacity-40">Only On HireX.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {exclusiveFeatures.map((f) => (
              <div key={f.name} className="glass-card glow-border-cyan rounded-2xl p-6 hover:-translate-y-1 transition-all">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase bg-hirex-cyan/10 text-hirex-cyan mb-4">
                  {f.tag}
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.name}</h3>
                <p className="text-hirex-text2 text-sm leading-relaxed mb-5">{f.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {f.items.map((it) => (
                    <span key={it} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-hirex-cyan/10 text-hirex-cyan/80 border border-hirex-cyan/10">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER DOMAINS */}
      <section className="py-24" style={{ background: "#0F1425" }}>
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">Career Domains</p>
            <h2 className="font-display text-[clamp(32px,5vw,40px)] font-semibold">
              Built For <span className="grad-text-cyan">AI & Technology Careers.</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-[900px] mx-auto">
            {careerDomains.map((c) => (
              <div key={c} className="glass-card rounded-full px-5 py-2.5 text-sm text-hirex-text2 hover:text-hirex-cyan hover:-translate-y-0.5 transition-all">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-8">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-3">For Colleges</p>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-6">Benefits For Colleges</h3>
              <ul className="space-y-3">
                {collegeBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-hirex-text2">
                    <span className="text-hirex-cyan mt-0.5">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card glow-border-cyan rounded-2xl p-8">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-3">For Students</p>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-6">Benefits For Students</h3>
              <ul className="space-y-3">
                {studentBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-hirex-text2">
                    <span className="text-hirex-cyan mt-0.5">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="py-24" style={{ background: "#0F1425" }}>
        <div className="container">
          <div className="max-w-[820px] mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">Why Partner</p>
            <h2 className="font-display text-[clamp(32px,5vw,40px)] font-semibold mb-6">
              Why Colleges Partner <span className="grad-text-cyan">With HireX.</span>
            </h2>
            <p className="text-hirex-text2 text-lg mb-3">HireX is not a placement platform.</p>
            <p className="text-foreground text-xl font-semibold mb-8">HireX is a career infrastructure platform.</p>
            <p className="text-hirex-text2 mb-6">We help colleges prepare students for:</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["AI Careers", "Technology Careers", "Startup Careers", "Remote Work", "Future Workforce Opportunities"].map((t) => (
                <span key={t} className="glass-card rounded-full px-4 py-2 text-sm text-hirex-cyan">✓ {t}</span>
              ))}
            </div>
            <p className="text-hirex-text3 italic">Starting from the second year, not the final semester.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 100%)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-hirex-cyan mb-4">Pricing</p>
            <h2 className="font-display text-[clamp(32px,5vw,40px)] font-semibold mb-4">
              Customized For <span className="grad-text-cyan">Every Institution.</span>
            </h2>
            <p className="text-hirex-text2 max-w-[640px] mx-auto">
              Every institution has different needs. Pricing is customized based on your scope and objectives.
            </p>
          </div>

          <div className="max-w-[760px] mx-auto glass-card glow-border-cyan rounded-2xl p-8 md:p-10">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {pricingFactors.map((p) => (
                <li key={p} className="flex items-start gap-3 text-hirex-text2">
                  <span className="text-hirex-cyan mt-0.5">✓</span> {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="weave-hover inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base no-underline text-foreground transition-all hover:-translate-y-0.5"
                style={{ background: "#4AB8E6" }}
              >
                Request Proposal →
              </Link>
              <Link
                to="/contact"
                className="weave-hover inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base no-underline glass-card text-foreground hover:bg-foreground/10 transition-all"
              >
                Book Demo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center relative" style={{ background: "linear-gradient(180deg, #0F1425 0%, #1C2351 50%, #0F1425 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] bg-hirex-cyan/[0.08]" />
        </div>
        <div className="container relative z-10">
          <h2 className="font-display text-[clamp(32px,5vw,44px)] font-semibold mb-5 max-w-[820px] mx-auto leading-tight">
            Help Students Become <span className="grad-text-cyan">AI-Ready</span> Before They Graduate.
          </h2>
          <p className="text-hirex-text2 text-lg max-w-[680px] mx-auto mb-10">
            From career discovery to internships, placements, remote work, and AI careers — HireX helps colleges build the next generation of technology talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline text-foreground transition-all"
              style={{ background: "#4AB8E6" }}
            >
              Book Demo →
            </Link>
            <Link
              to="/contact"
              className="weave-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-[18px] no-underline glass-card text-foreground hover:bg-foreground/10 transition-all"
            >
              Become A Campus Partner →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollegesPage;
