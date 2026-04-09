import { motion } from 'framer-motion';
import DemoCtaStrip from '@/components/campaign/DemoCtaStrip';

const agents = [
  { name: 'ResumeX', desc: 'Screen 10,000 resumes in minutes', icon: '📄' },
  { name: 'InterviewX', desc: 'Automate scheduling across timezones', icon: '🎯' },
  { name: 'MatchX', desc: 'AI-powered candidate-role matching', icon: '🔗' },
  { name: 'ScreenX', desc: 'Custom pre-screening assessments', icon: '🔍' },
  { name: 'OfferX', desc: 'Generate competitive offer letters', icon: '📋' },
  { name: 'OnboardX', desc: 'Day-1 ready onboarding flows', icon: '🚀' },
  { name: 'ComplianceX', desc: 'Auto regulatory compliance', icon: '⚖️' },
  { name: 'AnalyticsX', desc: 'Real-time hiring analytics', icon: '📊' },
  { name: 'DiversityX', desc: 'Bias-free inclusive screening', icon: '🌍' },
  { name: 'EngageX', desc: 'Keep candidates warm & engaged', icon: '💬' },
  { name: 'ReferX', desc: 'Smart employee referral engine', icon: '👥' },
  { name: 'CalendarX', desc: 'Intelligent calendar sync', icon: '📅' },
  { name: 'FeedbackX', desc: 'Structured interviewer feedback', icon: '⭐' },
  { name: 'SourceX', desc: 'Source from 50+ platforms', icon: '🌐' },
  { name: 'BrandX', desc: 'Amplify employer brand', icon: '🏷️' },
  { name: 'PayrollX', desc: 'Compensation benchmarking AI', icon: '💰' },
  { name: 'LegalX', desc: 'Employment law compliance', icon: '🔒' },
  { name: 'TrainingX', desc: 'Skills gap analysis', icon: '📚' },
  { name: 'RetentionX', desc: 'Predict & prevent attrition', icon: '🔄' },
  { name: 'CultureX', desc: 'Culture fit scoring', icon: '🎭' },
  { name: 'RemoteX', desc: 'Remote hiring optimization', icon: '🏠' },
  { name: 'DataX', desc: 'HR data lake management', icon: '🗃️' },
  { name: 'PipelineX', desc: 'Build talent pipelines', icon: '📈' },
  { name: 'ChatX', desc: 'Recruitment chatbot 24/7', icon: '🤖' },
  { name: 'ReportX', desc: 'Custom HR reports & dashboards', icon: '📑' },
  { name: 'VetX', desc: 'Background verification AI', icon: '✅' },
  { name: 'FlowX', desc: 'Workflow orchestration', icon: '⚡' },
];

const BusinessPage = () => {
  return (
    <main className="pt-16">
      <DemoCtaStrip message="See HireX screen 10,000 resumes live — Book Free Demo →" />

      {/* Hero */}
      <section className="bg-hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,229,255,0.08),transparent_60%)]" />
        <div className="container-main relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-cyan-cta font-mono text-sm tracking-wider">HIREX FOR EMPLOYERS</span>
            <h1 className="font-syne text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              The 27-Agent <span className="text-cyan-cta">Hiring Machine</span>
            </h1>
            <p className="text-white/70 font-inter text-lg mb-8">
              From sourcing to onboarding, 27 AI agents work in perfect sync to fill roles 10x faster, 
              with zero bias and full compliance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://bit.ly/4doSxab" target="_blank" rel="noopener noreferrer" className="btn-cta">
                Book Demo — See It Live
              </a>
              <a href="/how-it-works" className="btn-outline">How It Works</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* YouTube Demo */}
      <section className="section-padding bg-navy-dark">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-white">
              Watch the <span className="text-cyan-cta">27 Agents</span> in Action
            </h2>
          </div>
          <div className="max-w-4xl mx-auto glass-card-glow overflow-hidden">
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

      {/* 27 Agent Grid */}
      <section className="section-padding bg-gradient-to-b from-navy-dark to-navy-primary">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="text-cyan-cta font-mono text-sm">FULL AGENT ROSTER</span>
            <h2 className="font-syne text-3xl md:text-5xl font-bold text-white mt-2">
              27 Agents, <span className="text-cyan-cta">1 Mission</span>
            </h2>
            <p className="text-white/60 font-inter mt-4 max-w-lg mx-auto">
              Every agent specializes. Together, they replace 10 tools and 50 hours of manual work per hire.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="glass-card p-4 text-center hover:border-cyan-cta/40 transition-all group"
              >
                <div className="text-2xl mb-2">{agent.icon}</div>
                <h3 className="font-syne text-sm font-bold text-white group-hover:text-cyan-cta transition-colors">{agent.name}</h3>
                <p className="text-white/40 text-xs font-inter mt-1">{agent.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-dark text-center">
        <div className="container-main">
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-white/60 font-inter mb-8 max-w-lg mx-auto">
            Join the companies already using HireX to hire smarter, faster, and fairer.
          </p>
          <a href="https://bit.ly/4doSxab" target="_blank" rel="noopener noreferrer" className="btn-cta text-lg">
            Reserve My Demo →
          </a>
        </div>
      </section>
    </main>
  );
};

export default BusinessPage;
