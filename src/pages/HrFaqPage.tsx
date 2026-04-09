import { motion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  { q: 'How does HireX integrate with our existing ATS?', a: 'HireX connects via API with all major ATS platforms including Greenhouse, Lever, Workday, and more. Setup takes under 5 minutes.' },
  { q: 'Is HireX compliant with GDPR and DPDP?', a: 'Yes. HireX is SOC2 certified, GDPR compliant, and follows DPDP Act guidelines for Indian data protection.' },
  { q: 'How does the AI avoid hiring bias?', a: 'Our DiversityX agent uses blind screening techniques, removing identifying information before evaluation. All AI models are regularly audited for bias.' },
  { q: 'What is the typical ROI timeline?', a: 'Most companies see ROI within the first month — through reduced time-to-hire, lower recruiter workload, and better candidate quality.' },
  { q: 'Can we customize the AI agents?', a: 'Enterprise plans include custom AI training to match your company culture, industry terminology, and specific hiring criteria.' },
  { q: 'How many candidates can HireX process?', a: 'Our Growth plan handles up to 5,000 candidates/month. Enterprise plans support unlimited volume.' },
];

const HrFaqPage = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="pt-16">
      <section className="bg-hero-gradient section-padding">
        <div className="container-main text-center">
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
            HR <span className="text-cyan-cta">FAQ</span>
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-xl mx-auto">
            Common questions from HR leaders and hiring managers.
          </p>
        </div>
      </section>

      <section className="section-padding bg-navy-dark">
        <div className="container-main max-w-3xl">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card mb-4 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between"
              >
                <span className="font-syne font-bold text-white pr-4">{faq.q}</span>
                <span className="text-cyan-cta text-xl flex-shrink-0">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-white/60 font-inter">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HrFaqPage;
