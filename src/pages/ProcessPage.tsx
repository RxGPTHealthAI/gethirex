import { motion } from 'framer-motion';
import DemoCtaStrip from '@/components/campaign/DemoCtaStrip';
import { useState, useEffect } from 'react';

const ProcessPage = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="pt-16">
      <DemoCtaStrip message="⚡ Limited Early Access — Only 100 licenses. Book your demo today." />

      <section className="bg-hero-gradient section-padding">
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-cyan-cta">Process</span>
            </h1>
            <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
              From first contact to successful hire — see the HireX recruitment pipeline in detail.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-navy-dark">
        <div className="container-main max-w-4xl">
          {[
            { phase: 'Discovery', desc: 'Understand your hiring needs, culture, and goals. AI analyzes your job descriptions to identify ideal candidate profiles.', icon: '🔍' },
            { phase: 'Sourcing', desc: '27 agents simultaneously source candidates from 50+ platforms, social networks, and talent pools.', icon: '🌐' },
            { phase: 'Screening', desc: 'AI-powered resume screening, skill assessments, and culture fit analysis — all bias-free.', icon: '📊' },
            { phase: 'Interview', desc: 'Automated scheduling, AI-assisted interviews, and structured feedback collection.', icon: '🎯' },
            { phase: 'Decision', desc: 'Data-driven candidate ranking, compensation benchmarking, and offer letter generation.', icon: '📋' },
            { phase: 'Onboarding', desc: 'Seamless day-1 onboarding with compliance checks, documentation, and training paths.', icon: '🚀' },
          ].map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 mb-6 flex gap-6 items-start"
            >
              <span className="text-3xl">{p.icon}</span>
              <div>
                <h3 className="font-syne text-xl font-bold text-white mb-2">{p.phase}</h3>
                <p className="text-white/60 font-inter">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sticky CTA */}
      {showSticky && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <a
            href="https://bit.ly/4doSxab"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta shadow-2xl"
          >
            Book Demo →
          </a>
        </motion.div>
      )}
    </main>
  );
};

export default ProcessPage;
