import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Starter',
    price: '$299',
    period: '/month',
    desc: 'For small teams hiring up to 10 roles/month',
    features: ['5 AI Agents', 'Up to 500 candidates/month', 'Basic analytics', 'Email support', 'ATS integration'],
    cta: 'Start Free Trial',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$799',
    period: '/month',
    desc: 'For scaling companies with high-volume hiring',
    features: ['15 AI Agents', 'Up to 5,000 candidates/month', 'Advanced analytics', 'Priority support', 'Custom workflows', 'API access'],
    cta: 'Book Demo',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large organizations with complex needs',
    features: ['All 27 AI Agents', 'Unlimited candidates', 'Custom AI training', 'Dedicated CSM', 'SLA guarantee', 'On-prem option', 'SSO & SAML'],
    cta: 'Contact Sales',
    featured: false,
  },
];

const PricingPage = () => {
  return (
    <main className="pt-16">
      <section className="bg-hero-gradient section-padding">
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent <span className="text-cyan-cta">Pricing</span>
            </h1>
            <p className="text-white/70 font-inter text-lg max-w-xl mx-auto">
              Choose the plan that fits your hiring needs. Scale up anytime.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-navy-dark">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-8 flex flex-col ${plan.featured ? 'border-cyan-cta/50 shadow-[0_0_40px_rgba(0,229,255,0.1)] relative' : ''}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-cta text-navy-dark text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-syne text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="font-syne text-4xl font-bold text-cyan-cta">{plan.price}</span>
                  <span className="text-white/40 font-inter text-sm">{plan.period}</span>
                </div>
                <p className="text-white/60 font-inter text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-white/70 text-sm font-inter">
                      <span className="text-teal-links">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://bit.ly/4doSxab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={plan.featured ? 'btn-cta text-center' : 'btn-outline text-center'}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PricingPage;
