import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import saileshImg from "@/assets/team/sailesh.jpg";
import pragyaImg from "@/assets/team/pragya.jpg";
import richardImg from "@/assets/team/richard.jpg";
import samarthImg from "@/assets/team/samarth.jpg";
import jayanthImg from "@/assets/team/jayanth.jpg";
import tanayImg from "@/assets/team/tanay.jpg";
import lucasImg from "@/assets/team/lucas.jpg";
import hrishirajImg from "@/assets/team/hrishiraj.jpg";
import christinImg from "@/assets/team/christin.jpg";
import abinayaImg from "@/assets/team/abinaya.jpg";
import davidImg from "@/assets/team/david.jpg";
import rakshithaImg from "@/assets/team/rakshitha.jpg";
import jamesImg from "@/assets/team/james.jpg";
import bibhutiImg from "@/assets/team/bibhuti.png";
import harshImg from "@/assets/team/harsh.png";
import abhinayaRImg from "@/assets/team/abhinaya-r.png";
import rohitImg from "@/assets/team/rohit.png";
import samarthGImg from "@/assets/team/samarth-g.png";
import frankImg from "@/assets/team/frank.png";
import wernerImg from "@/assets/team/werner.png";
import aayushImg from "@/assets/team/aayush.png";
import palakImg from "@/assets/team/palak.png";
import ambroseImg from "@/assets/team/ambrose.png";
import preranaImg from "@/assets/team/prerana.png";

type Member = {
  name: string;
  role: string;
  img?: string;
  bio: string;
  awards?: string[];
  education?: string;
  passion?: string;
  initials?: string;
  gradient?: string;
};

const leadership: Member[] = [
  { name: "Sailesh Pattnaik", role: "Founder & CEO", img: saileshImg,
    bio: "CEO and CXO leader with 20+ years driving agentic AI, generative AI, LLM platforms, digital marketing, global operations, and technology strategy across APAC, US, MENA, EU, and ANZ.",
    awards: ["Cargill Town Hall Awards (FY25 Q1, FY24 Q2)", "International Star Award (NITI Aayog/G20)", "International Icon Award", "MMA Global Asia Speaker"],
    passion: "Building human-centric AI systems at the intersection of behavior, recruitment, healthcare, and scalable agentic architectures." },
  { name: "Pragya Patnaik", role: "Managing Director", img: pragyaImg,
    bio: "Across roles as recruiter, lead recruiter, and now Managing Director, the focus has been consistent: building high-performing teams, creating structured opportunities for women in tech, and ensuring a smooth, transparent hiring experience.",
    passion: "Operational excellence and client success programs." },
  { name: "Richard Eddington", role: "Interim CTO Advisor", img: richardImg,
    bio: "Technology executive with decades of experience leading cybersecurity, cloud infrastructure, and IT strategy across high-growth and enterprise organizations.",
    education: "BS Computer Science, MBA St. Edwards University",
    passion: "Tinkering with technology—experimenting across hardware, software, and cloud platforms." },
];

const techTeam: Member[] = [
  { name: "Jayanth Sai Srinivas", role: "GCP Lead", img: jayanthImg,
    bio: "Cloud DevOps Engineer with 3 years of deep experience in DevOps automation. Now at RxGPT, translates efficiency into leading the GCP ecosystem, deploying advanced Kubernetes strategies that allow the AI to scale globally without latency.",
    education: "B.Tech Mechanical Engineering, Sai Ganapathi Engineering College, Visakhapatnam" },
  { name: "Samarth Manojkumar Naik", role: "Tech Lead Intern", img: samarthImg,
    bio: "Drives engineering initiatives across the HIREXAI platform, contributing to AI-powered features and product development." },
  { name: "Tanay Chordia", role: "AI & Data Science Lead", img: tanayImg,
    bio: "Strong expertise in data science, embedded systems, and AI-driven solutions. Contributed to ICARUS CubeSat initiative. 2nd place NeuraAI Hackathon." },
  { name: "Lucas Ballario", role: "Frontend Developer", img: lucasImg,
    bio: "Hands-on experience in React, Next.js, and Tailwind CSS. Strong track record building scalable, user-friendly applications and AI-powered platforms." },
  { name: "Hrishiraj", role: "Full Stack Developer", img: hrishirajImg,
    bio: "Software engineer with experience building web-based platforms. Ensures clean interfaces and smooth user access to AI-driven solutions.",
    education: "B.Tech CSE from LPU Punjab | M.Tech CSE from IIIT Guwahati" },
  { name: "Christin", role: "Agentic AI", img: christinImg,
    bio: "With a passion for intuitive design and seamless user experiences, Christin brings fresh energy to our mission of building smarter hospitals and delivering better care.",
    education: "IIT Bengaluru" },
];

const hrTeam: Member[] = [
  { name: "Abinaya", role: "HR Lead", img: abinayaImg,
    bio: "Supports recruitment, employee engagement, and workplace culture across India, UAE, UK, and USA." },
  { name: "Ayomiposi David Dairo", role: "HR & Talent Acquisition", img: davidImg,
    bio: "Detail-oriented Auditor and Accountant bringing analytical mindset with B.Sc. in Mathematics into talent acquisition." },
];

const marketing: Member[] = [
  { name: "Rakshitha", role: "Content Writer", img: rakshithaImg,
    bio: "Pursuing B.Tech in Computer Science (AIML) at Dayananda Sagar University. Unique blend of technical writing and creativity." },
  { name: "James Mwathi", role: "Content Writer", img: jamesImg,
    bio: "5+ years crafting persuasive content across websites, blogs, social media, and academic publications." },
];

// Department gradients (HSL via tailwind-friendly inline styles)
const grad = {
  engineering: "linear-gradient(135deg, hsl(217 91% 60%), hsl(199 89% 48%))",
  design: "linear-gradient(135deg, hsl(280 75% 60%), hsl(316 73% 60%))",
  hr: "linear-gradient(135deg, hsl(152 60% 45%), hsl(173 70% 45%))",
  content: "linear-gradient(135deg, hsl(28 90% 55%), hsl(45 95% 55%))",
  sales: "linear-gradient(135deg, hsl(0 75% 60%), hsl(15 85% 55%))",
};

const initialsOf = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();

// Extended team — new members from latest roster
const extendedTeam: Member[] = [
  { name: "Bibhuti Bhusan Biswal", role: "Data Science Intern", img: bibhutiImg,
    bio: "Drives advanced analytics and AI-powered insights at HIREXAI. Strong foundation in machine learning, statistical analysis, and data modeling to optimize recruitment intelligence and workforce analytics frameworks." },
  { name: "Harsh Garg", role: "UI/UX Designer", img: harshImg,
    bio: "Creates intuitive and visually engaging digital product experiences. Skilled in wireframing, rapid prototyping, and user-centered design methodologies that balance functionality with clean aesthetics." },
  { name: "Abhinaya R", role: "HR Associate", img: abhinayaRImg,
    bio: "Manages daily recruitment, onboarding pathways, and strategic employee engagement programs. People-first management philosophy that streamlines HR workflows and maintains collaborative culture." },
  { name: "Rohit Maurya", role: "Data Analyst & Developer", img: rohitImg,
    bio: "Bridges data analytics and agile software engineering to deliver scalable backend systems. Focuses on system automation, data-driven optimization, and engineering problem-solving across core projects." },
  { name: "Samarth Guddadar", role: "HR Associate", img: samarthGImg,
    bio: "Focuses on talent recruitment, new-hire onboarding, and team engagement initiatives. Combines sharp interpersonal skills with a structured approach to maintain seamless internal operations." },
  { name: "Frank Jiang", role: "AI LLM Scientist", img: frankImg,
    bio: "Specialises in fine-tuning, training, and scaling large language models and NLP systems that power HIREXAI's automated screening, recruitment insights, and predictive workforce analytics." },
  { name: "Werner Docx", role: "International Sales Manager", img: wernerImg,
    bio: "Heads up global sales initiatives and cross-border client acquisition. Deep experience in international B2B sales and complex contract negotiations to expand HIREXAI's enterprise footprint." },
  { name: "Aayush Kumar", role: "AI Backend Developer", img: aayushImg,
    bio: "Specialises in high-throughput backend systems and algorithm optimization. Strong algorithmic foundations, data structure design, and AI framework integration powering the platform." },
  { name: "Palak Ahuja", role: "Content Writer", img: palakImg,
    bio: "B.Sc. and M.Sc. in Biotechnology (Jamia Hamdard) with industry experience at Dabur Research Foundation and Fresenius Kabi. Combines technical medical writing precision with creative brand communication." },
  { name: "Ambrose Othniel", role: "WordPress & AI-Assisted Full Stack Developer", img: ambroseImg,
    bio: "3+ years of application deployment experience. Built platforms like Uniride.ng with Mapbox, Dojah, Termii integrations. Workflow spans React, Next.js, and AI-assisted engineering with Copilot and GPT-4." },
  { name: "Prerana Veerabhadrappa Kadi", role: "UI/UX Design Intern", img: preranaImg,
    bio: "Applies skills in Figma, wireframing, and dashboard design. Pursuing B.Tech in CSE at VIT Vellore. Previously designed layouts for FinSight AI and SEED." },
];

const MemberCard = ({ m }: { m: Member }) => (
  <div className="glass-card rounded-2xl overflow-hidden hover:glow-border-cyan transition-all duration-300 group hover:-translate-y-1">
    <div className="h-64 overflow-hidden">
      {m.img ? (
        <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center text-5xl font-bold text-white"
          style={{ background: m.gradient }}
          aria-label={`${m.name} avatar`}
        >
          {m.initials}
        </div>
      )}
    </div>
    <div className="p-6">
      <h3 className="text-lg font-bold">{m.name}</h3>
      <p className="text-sm text-primary font-medium mb-3">{m.role}</p>
      <p className="text-sm text-muted-foreground mb-3">{m.bio}</p>
      {m.awards && (
        <div className="space-y-1 mb-3">
          {m.awards.map((a, j) => (
            <span key={j} className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mr-1 mb-1">{a}</span>
          ))}
        </div>
      )}
      {m.education && <p className="text-xs text-muted-foreground italic">🎓 {m.education}</p>}
      {m.passion && <p className="text-xs text-accent mt-2">💡 {m.passion}</p>}
    </div>
  </div>
);

const TeamSection = ({ title, members }: { title: string; members: Member[] }) => {
  if (!members.length) return null;
  return (
    <div className="mb-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 grad-text-cyan">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m) => <MemberCard key={`${title}-${m.name}`} m={m} />)}
      </div>
    </div>
  );
};

const TeamPage = () => {
  const [query, setQuery] = useState("");

  const filter = (arr: Member[]) => {
    if (!query.trim()) return arr;
    const q = query.toLowerCase();
    return arr.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.bio.toLowerCase().includes(q)
    );
  };

  const sections = useMemo(() => ({
    leadership: filter(leadership),
    tech: filter(techTeam),
    hr: filter(hrTeam),
    marketing: filter(marketing),
    extended: filter(extendedTeam),
  }), [query]);

  const totalCount = leadership.length + techTeam.length + hrTeam.length + marketing.length + extendedTeam.length;
  const visibleCount = Object.values(sections).reduce((s, a) => s + a.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 lg:py-32 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Meet the Team Building <span className="grad-text-cyan">AI's Biggest HR Revolution</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
            {totalCount}+ team members across AI, recruitment, cloud, design, and enterprise operations — spanning APAC, US, MENA, EU, and ANZ.
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, role, or skill…"
              className="w-full pl-11 pr-4 py-3 rounded-full glass-card border border-border/40 bg-background/40 text-sm focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
          {query && (
            <p className="text-xs text-muted-foreground mt-3">{visibleCount} match{visibleCount === 1 ? "" : "es"}</p>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <TeamSection title="Founders & Leadership" members={sections.leadership} />
        <TeamSection title="Technology Team" members={sections.tech} />
        <TeamSection title="HR & Operations" members={sections.hr} />
        <TeamSection title="Marketing & Content" members={sections.marketing} />
        <TeamSection title="Extended Team" members={sections.extended} />

        {visibleCount === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No team members match "{query}".
          </div>
        )}
      </section>
    </div>
  );
};

export default TeamPage;
