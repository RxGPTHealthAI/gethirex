import { motion } from 'framer-motion';
import DemoCtaStrip from '@/components/campaign/DemoCtaStrip';

const careerSquad = [
  { name: 'ResumeBot', desc: 'AI-powered resume builder & optimizer', icon: '📝' },
  { name: 'InterviewCoach', desc: 'Mock interview practice with AI feedback', icon: '🎤' },
  { name: 'JobMatchAI', desc: 'Find roles that match your skills perfectly', icon: '🎯' },
  { name: 'SkillMapper', desc: 'Identify skill gaps & learning paths', icon: '🧭' },
  { name: 'SalaryNinja', desc: 'Real-time compensation benchmarks', icon: '💰' },
  { name: 'CareerGPS', desc: 'Personalized career trajectory planning', icon: '🗺️' },
];

const CandidatePage = () => {
  return (
    <main className="pt-16">
      <DemoCtaStrip message="Watch AI fix your resume in 2 minutes — Book Free Demo →" />

      {/* Hero */}
      <section className="bg-hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(0,229,255,0.08),transparent_60%)]" />
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-cyan-cta font-mono text-sm tracking-wider">HIREX FOR CANDIDATES</span>
            <h1 className="font-syne text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              Your 6 AI <span className="text-cyan-cta">Career Squad</span>
            </h1>
            <p className="text-white/70 font-inter text-lg mb-8">
              Six AI-powered agents dedicated to your career — from resume building to salary negotiation.
              Your unfair advantage in the job market.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://bit.ly/4doSxab" target="_blank" rel="noopener noreferrer" className="btn-cta">
                Get Started Free
              </a>
              <a href="/how-it-works" className="btn-outline">Learn More</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6 AI Career Squad */}
      <section className="section-padding bg-navy-dark">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-cyan-cta font-mono text-sm">YOUR AI CAREER TEAM</span>
            <h2 className="font-syne text-3xl md:text-5xl font-bold text-white mt-2">
              6 AI People, <span className="text-cyan-cta">Your Squad</span>
            </h2>
            <p className="text-white/60 font-inter mt-4 max-w-xl mx-auto">
              Each AI agent is specialized to handle a specific part of your career journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerSquad.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-glow p-8 hover:border-cyan-cta/40 transition-all group"
              >
                <div className="text-4xl mb-4">{agent.icon}</div>
                <h3 className="font-syne text-xl font-bold text-white group-hover:text-cyan-cta transition-colors mb-2">
                  {agent.name}
                </h3>
                <p className="text-white/60 font-inter">{agent.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Demo */}
      <section className="section-padding bg-gradient-to-b from-navy-dark to-navy-primary">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="font-syne text-3xl font-bold text-white">
              See Your <span className="text-cyan-cta">Career Squad</span> in Action
            </h2>
          </div>
          <div className="max-w-3xl mx-auto glass-card-glow overflow-hidden">
            <div className="relative pb-[56.25%]">
              <iframe
                src="https://www.youtube.com/embed/oTvA-86ZiM0?rel=0"
                title="HireX Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-dark text-center">
        <div className="container-main">
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Supercharge Your Career?
          </h2>
          <p className="text-white/60 font-inter mb-8">
            Join thousands of candidates using AI to land their dream job.
          </p>
          <a href="https://bit.ly/4doSxab" target="_blank" rel="noopener noreferrer" className="btn-cta text-lg">
            Start Free →
          </a>
        </div>
      </section>
    </main>
  );
};

export default CandidatePage;
