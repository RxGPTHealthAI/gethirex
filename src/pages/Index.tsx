import { motion } from 'framer-motion';
import CampaignBanner from '@/components/campaign/CampaignBanner';
import DemoCtaStrip from '@/components/campaign/DemoCtaStrip';

const agents = [
  { name: 'ResumeX', desc: 'AI resume screening in seconds', icon: '📄' },
  { name: 'InterviewX', desc: 'Automated interview scheduling', icon: '🎯' },
  { name: 'MatchX', desc: 'Candidate-role matching engine', icon: '🔗' },
  { name: 'ScreenX', desc: 'Pre-screening assessments', icon: '🔍' },
  { name: 'OfferX', desc: 'Smart offer letter generation', icon: '📋' },
  { name: 'OnboardX', desc: 'Automated onboarding flows', icon: '🚀' },
  { name: 'ComplianceX', desc: 'Regulatory compliance checks', icon: '⚖️' },
  { name: 'AnalyticsX', desc: 'Hiring pipeline analytics', icon: '📊' },
  { name: 'DiversityX', desc: 'Bias-free screening tools', icon: '🌍' },
  { name: 'EngageX', desc: 'Candidate engagement automation', icon: '💬' },
  { name: 'ReferX', desc: 'Employee referral management', icon: '👥' },
  { name: 'CalendarX', desc: 'Smart calendar coordination', icon: '📅' },
  { name: 'FeedbackX', desc: 'Structured feedback collection', icon: '⭐' },
  { name: 'SourceX', desc: 'Multi-platform talent sourcing', icon: '🌐' },
  { name: 'BrandX', desc: 'Employer branding assistant', icon: '🏷️' },
  { name: 'PayrollX', desc: 'Compensation benchmarking', icon: '💰' },
  { name: 'LegalX', desc: 'Employment law assistant', icon: '🔒' },
  { name: 'TrainingX', desc: 'Skills gap analysis', icon: '📚' },
  { name: 'RetentionX', desc: 'Employee retention predictor', icon: '🔄' },
  { name: 'CultureX', desc: 'Culture fit assessment', icon: '🎭' },
  { name: 'RemoteX', desc: 'Remote hiring optimization', icon: '🏠' },
  { name: 'DataX', desc: 'HR data lake management', icon: '🗃️' },
  { name: 'PipelineX', desc: 'Talent pipeline builder', icon: '📈' },
  { name: 'ChatX', desc: 'AI recruitment chatbot', icon: '🤖' },
  { name: 'ReportX', desc: 'Custom HR reporting', icon: '📑' },
  { name: 'VetX', desc: 'Background verification', icon: '✅' },
  { name: 'FlowX', desc: 'Workflow orchestration', icon: '⚡' },
];

const Index = () => {
  return (
    <main className="pt-16">
      {/* Campaign Banner */}
      <CampaignBanner />

      {/* YouTube Demo Section */}
      <section className="section-padding bg-navy-dark">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-white mb-4">
              Watch HireX in Action
            </h2>
            <p className="text-white/60 font-inter max-w-xl mx-auto">
              See how 27 AI agents collaborate in real-time to transform your hiring pipeline.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card-glow overflow-hidden"
          >
            <div className="relative pb-[56.25%]">
              <iframe
                src="https://www.youtube.com/embed/oTvA-86ZiM0?rel=0"
                title="HireX Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-hero-gradient section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,229,255,0.06),transparent_50%)]" />
        <div className="container-main relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-syne text-4xl md:text-6xl font-bold text-white mb-6">
              The Future of Hiring is <span className="text-cyan-cta">Agentic AI</span>
            </h2>
            <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto mb-10">
              27 AI Agents work in sync to screen, interview, and onboard candidates 10x faster. 
              For employers and candidates alike.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="/business" className="btn-cta">Explore for Employers</a>
              <a href="/candidate" className="btn-outline">Explore for Candidates</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 27 Agent Grid */}
      <section className="section-padding bg-navy-dark">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-cta font-mono text-sm tracking-wider">AGENT ECOSYSTEM</span>
            <h2 className="font-syne text-3xl md:text-5xl font-bold text-white mt-2">
              27 AI Agents, <span className="text-cyan-cta">Synced</span>
            </h2>
            <p className="text-white/60 font-inter mt-4 max-w-xl mx-auto">
              Each agent specializes in a critical hiring function. Together, they form an unstoppable recruitment engine.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="glass-card p-4 text-center hover:border-cyan-cta/40 transition-all group cursor-default"
              >
                <div className="text-2xl mb-2">{agent.icon}</div>
                <h3 className="font-syne text-sm font-bold text-white group-hover:text-cyan-cta transition-colors">
                  {agent.name}
                </h3>
                <p className="text-white/40 text-xs font-inter mt-1">{agent.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-b from-navy-dark to-navy-primary">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: '47K+', label: 'Candidates Screened' },
              { val: '27', label: 'AI Agents' },
              { val: '93%', label: 'Trial-to-Paid' },
              { val: '10x', label: 'Faster Hiring' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="font-syne text-4xl font-bold text-cyan-cta">{stat.val}</div>
                <div className="text-white/50 font-inter text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DemoCtaStrip />
    </main>
  );
};

export default Index;
