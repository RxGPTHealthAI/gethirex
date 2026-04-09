import { motion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  { q: 'Is HireX free for candidates?', a: 'Yes! Candidates can use the 6 AI Career Squad agents for free. Premium features are available with a paid plan.' },
  { q: 'How does the AI improve my resume?', a: 'ResumeBot analyzes your resume against job descriptions, suggests keyword optimization, formatting improvements, and ATS compatibility fixes.' },
  { q: 'Can the AI help me prepare for interviews?', a: 'InterviewCoach provides mock interviews with AI feedback, common question banks, and personalized tips based on the role you\'re applying for.' },
  { q: 'Is my data safe?', a: 'Absolutely. We are SOC2 certified and GDPR compliant. Your data is encrypted and never shared without consent.' },
  { q: 'How accurate is the salary benchmarking?', a: 'SalaryNinja uses real-time data from 50+ sources to provide competitive compensation ranges for your role, location, and experience level.' },
];

const CandidatesFaqPage = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="pt-16">
      <section className="bg-hero-gradient section-padding">
        <div className="container-main text-center">
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
            Candidates <span className="text-cyan-cta">FAQ</span>
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-xl mx-auto">
            Everything candidates need to know about HireX.
          </p>
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

export default CandidatesFaqPage;
