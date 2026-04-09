import { motion } from 'framer-motion';

const steps = [
  { step: '01', title: 'Connect Your ATS', desc: 'Integrate HireX with your existing ATS, HRIS, or job boards in under 5 minutes.', icon: '🔌' },
  { step: '02', title: 'Define Your Role', desc: 'Describe the role, skills, and culture fit — our AI understands nuance.', icon: '📝' },
  { step: '03', title: 'Agents Activate', desc: '27 AI agents begin sourcing, screening, and ranking candidates autonomously.', icon: '⚡' },
  { step: '04', title: 'Review & Interview', desc: 'Get a shortlist with AI-scored profiles. Schedule interviews with one click.', icon: '🎯' },
  { step: '05', title: 'Hire & Onboard', desc: 'Send offers, run compliance checks, and onboard — all automated.', icon: '🚀' },
];

const HowItWorksPage = () => {
  return (
    <main className="pt-16">
      <section className="bg-hero-gradient section-padding">
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-cyan-cta font-mono text-sm">THE PROCESS</span>
            <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              How HireX <span className="text-cyan-cta">Works</span>
            </h1>
            <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
              Five simple steps from job posting to onboarding — powered by 27 AI agents working in sync.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-navy-dark">
        <div className="container-main max-w-3xl">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex gap-6 mb-12 last:mb-0"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-cta/20 to-teal-links/10 border border-cyan-cta/30 flex items-center justify-center">
                <span className="text-2xl">{s.icon}</span>
              </div>
              <div>
                <span className="text-cyan-cta font-mono text-xs">STEP {s.step}</span>
                <h3 className="font-syne text-xl font-bold text-white mt-1 mb-2">{s.title}</h3>
                <p className="text-white/60 font-inter">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-navy-primary text-center">
        <div className="container-main">
          <h2 className="font-syne text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <a href="https://bit.ly/4doSxab" target="_blank" rel="noopener noreferrer" className="btn-cta">
            Book Your Demo →
          </a>
        </div>
      </section>
    </main>
  );
};

export default HowItWorksPage;
