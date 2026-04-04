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

const leadership = [
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

const techTeam = [
  { name: "Samarth Manojkumar Naik", role: "Chief Technology Officer", img: samarthImg,
    bio: "Technology enthusiast and architect of HireX's 27-agent orchestration engine. Strong knowledge of backend development and AI-driven systems.",
    education: "B.Tech from VIT Vellore | BS in Data Science from IIT Madras" },
  { name: "Jayanth Sai Srinivas", role: "GCP Lead", img: jayanthImg,
    bio: "Cloud DevOps Engineer with 3 years of deep experience in DevOps automation. Now at RxGPT, translates efficiency into leading the GCP ecosystem, deploying advanced Kubernetes strategies that allow the AI to scale globally without latency.",
    education: "B.Tech Mechanical Engineering, Sai Ganapathi Engineering College, Visakhapatnam" },
  { name: "Tanay Chordia", role: "AI & Data Science Lead", img: tanayImg,
    bio: "Strong expertise in data science, embedded systems, and AI-driven solutions. Contributed to ICARUS CubeSat initiative. 2nd place NeuraAI Hackathon." },
  { name: "Lucas Ballario", role: "Frontend Developer", img: lucasImg,
    bio: "Hands-on experience in React, Next.js, and Tailwind CSS. Strong track record building scalable, user-friendly applications and AI-powered platforms." },
  { name: "Hrishiraj", role: "Full Stack Developer", img: hrishirajImg,
    bio: "Software engineer with experience building web-based platforms. Ensures clean interfaces and smooth user access to AI-driven solutions.",
    education: "B.Tech CSE from LPU Punjab | M.Tech CSE from IIIT Guwahati" },
];

const hrTeam = [
  { name: "Abinaya", role: "HR Lead", img: abinayaImg,
    bio: "Supports recruitment, employee engagement, and workplace culture across India, UAE, UK, and USA." },
  { name: "Ayomiposi David Dairo", role: "HR & Talent Acquisition", img: davidImg,
    bio: "Detail-oriented Auditor and Accountant bringing analytical mindset with B.Sc. in Mathematics into talent acquisition." },
];

const marketing = [
  { name: "Rakshitha", role: "Content Writer", img: rakshithaImg,
    bio: "Pursuing B.Tech in Computer Science (AIML) at Dayananda Sagar University. Unique blend of technical writing and creativity." },
  { name: "James Mwathi", role: "Content Writer", img: jamesImg,
    bio: "5+ years crafting persuasive content across websites, blogs, social media, and academic publications." },
];

const TeamSection = ({ title, members }: { title: string; members: Array<{ name: string; role: string; img: string; bio: string; awards?: string[]; education?: string; passion?: string }> }) => (
  <div className="mb-20">
    <h2 className="text-2xl md:text-3xl font-bold mb-8 grad-text-cyan">{title}</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((m, i) => (
        <div key={i} className="glass-card rounded-2xl overflow-hidden hover:glow-border-cyan transition-shadow duration-300 group">
          <div className="h-64 overflow-hidden">
            <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold">{m.name}</h3>
            <p className="text-sm text-primary font-medium mb-3">{m.role}</p>
            <p className="text-sm text-muted-foreground mb-3">{m.bio}</p>
            {"awards" in m && m.awards && (
              <div className="space-y-1 mb-3">
                {m.awards.map((a: string, j: number) => (
                  <span key={j} className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mr-1 mb-1">{a}</span>
                ))}
              </div>
            )}
            {"education" in m && m.education && (
              <p className="text-xs text-muted-foreground italic">🎓 {m.education}</p>
            )}
            {"passion" in m && m.passion && (
              <p className="text-xs text-accent mt-2">💡 {m.passion}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TeamPage = () => (
  <div className="min-h-screen bg-background">
    <section className="py-24 lg:py-32 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Meet the Team Building <span className="grad-text-cyan">AI's Biggest HR Revolution</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          20+ years of combined AI, recruitment, cloud, and enterprise operations experience across APAC, US, MENA, EU, and ANZ.
        </p>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-6 pb-20">
      <TeamSection title="Founders & Leadership" members={leadership} />
      <TeamSection title="Technology Team" members={techTeam} />
      <TeamSection title="HR & Operations" members={hrTeam} />
      <TeamSection title="Marketing & Content" members={marketing} />
    </section>
  </div>
);

export default TeamPage;
