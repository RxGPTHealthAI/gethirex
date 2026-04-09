import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  { q: 'What is HireX?', a: 'HireX is an AI-powered recruitment platform with 27 specialized AI agents that automate the entire hiring pipeline — from sourcing to onboarding.' },
  { q: 'Who can use HireX?', a: 'HireX serves both employers (HR teams, recruiters, founders) and candidates (job seekers, career changers).' },
  { q: 'How is HireX different from other HR tools?', a: 'Unlike point solutions, HireX deploys 27 AI agents that work together as a team. Each agent specializes in a critical function, creating an end-to-end hiring experience.' },
  { q: 'Is there a free trial?', a: 'Yes! Book a demo to get started with a free trial. Limited to 100 early access licenses.' },
  { q: 'What industries does HireX support?', a: 'HireX works across all industries — tech, healthcare, finance, BPO, manufacturing, and more.' },
];

const FaqPage = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="pt-16">
      <section className="bg-hero-gradient section-padding">
        <div className="container-main text-center">
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-cyan-cta">Questions</span>
          </h1>
        </div>
      </section>

      <section className="section-padding bg-navy-dark">
        <div className="container-main max-w-3xl">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card mb-4 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left px-6 py-5 flex items-center justify-between">
                <span className="font-syne font-bold text-white pr-4">{faq.q}</span>
                <span className="text-cyan-cta text-xl flex-shrink-0">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <div className="px-6 pb-5"><p className="text-white/60 font-inter">{faq.a}</p></div>}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FaqPage;
