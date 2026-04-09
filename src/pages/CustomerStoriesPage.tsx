import { motion } from 'framer-motion';

const stories = [
  { company: 'TechCorp India', quote: 'HireX reduced our time-to-hire by 73%. The AI agents are incredible.', person: 'VP of HR', metric: '73% faster hiring' },
  { company: 'Mumbai BPO Solutions', quote: 'Best demo I\'ve ever seen — the AI literally screened 5,000 resumes live.', person: 'HR Head', metric: '5,000 resumes in minutes' },
  { company: 'FinServ Global', quote: 'We replaced 4 different HR tools with HireX. ROI was immediate.', person: 'CHRO', metric: '4 tools replaced' },
  { company: 'HealthTech Startup', quote: 'The candidate experience improved dramatically. Our Glassdoor rating went up.', person: 'Founder', metric: '4.8★ candidate rating' },
];

const CustomerStoriesPage = () => {
  return (
    <main className="pt-16">
      <section className="bg-hero-gradient section-padding">
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
              Customer <span className="text-cyan-cta">Stories</span>
            </h1>
            <p className="text-white/70 font-inter text-lg max-w-xl mx-auto">
              See how leading companies transformed their hiring with HireX.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-navy-dark">
        <div className="container-main max-w-4xl">
          {stories.map((s, i) => (
            <motion.div
              key={s.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 mb-6"
            >
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <p className="text-white/80 font-inter text-lg italic mb-4">"{s.quote}"</p>
                  <p className="text-white/50 font-inter text-sm">— {s.person}, {s.company}</p>
                </div>
                <div className="glass-card px-4 py-2 text-center">
                  <div className="text-cyan-cta font-syne font-bold text-lg">{s.metric}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CustomerStoriesPage;
