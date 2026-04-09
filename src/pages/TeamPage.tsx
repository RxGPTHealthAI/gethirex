import { motion } from 'framer-motion';

const leadership = [
  { name: 'Samarth Manojkumar Naik', role: 'Chief Technology Officer', bio: 'Leading the technology vision and architecture of HireX.' },
];

const techTeam = [
  { name: 'Jayanth Sai Srinivas', role: 'GCP Lead', bio: 'Cloud DevOps Engineer with 3 years of deep experience in DevOps automation. Leads the GCP ecosystem, deploying advanced Kubernetes strategies that allow the AI to scale globally without latency.' },
  { name: 'Christin', role: 'Agentic AI — IIT Bengaluru', bio: 'With a passion for intuitive design and seamless user experiences, Christin brings fresh energy to building smarter solutions and delivering better outcomes.' },
];

const TeamPage = () => {
  return (
    <main className="pt-16">
      <section className="bg-hero-gradient section-padding">
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
              Meet the <span className="text-cyan-cta">Team</span>
            </h1>
            <p className="text-white/70 font-inter text-lg max-w-xl mx-auto">
              The minds behind HireX — building the future of AI-powered recruitment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-navy-dark">
        <div className="container-main">
          <h2 className="font-syne text-2xl font-bold text-cyan-cta mb-8 text-center">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {leadership.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-cta/30 to-teal-links/20 mx-auto mb-4 flex items-center justify-center text-3xl">
                  👤
                </div>
                <h3 className="font-syne text-lg font-bold text-white">{m.name}</h3>
                <p className="text-cyan-cta text-sm font-inter mb-2">{m.role}</p>
                <p className="text-white/50 text-sm font-inter">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Team */}
      <section className="section-padding bg-gradient-to-b from-navy-dark to-navy-primary">
        <div className="container-main">
          <h2 className="font-syne text-2xl font-bold text-cyan-cta mb-8 text-center">Technology Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {techTeam.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-cta/30 to-teal-links/20 mx-auto mb-4 flex items-center justify-center text-3xl">
                  👤
                </div>
                <h3 className="font-syne text-lg font-bold text-white">{m.name}</h3>
                <p className="text-cyan-cta text-sm font-inter mb-2">{m.role}</p>
                <p className="text-white/50 text-sm font-inter">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TeamPage;
