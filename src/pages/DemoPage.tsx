import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TYPEFORM_URL = 'https://bit.ly/4doSxab';

const rewards = [
  { icon: '⭐', title: 'Testimonial Bonus', desc: 'Provide a quick text/video review after your demo → +7 days free access.' },
  { icon: '🤝', title: 'Referral Bonus', desc: 'Refer HIREX to other candidates or HRs → +1 month complimentary access for every successful conversion.' },
  { icon: '📧', title: 'Newsletter Bonus', desc: 'Subscribe to updates on new AI Agents and hiring hacks.' },
  { icon: '💼', title: 'LinkedIn Testimonial', desc: 'Post a quick LinkedIn review after your demo → +7 days free access.' },
];

const leaderboard = [
  { name: 'A.K.', referrals: 12 },
  { name: 'S.M.', referrals: 9 },
  { name: 'R.P.', referrals: 7 },
  { name: 'N.V.', referrals: 5 },
  { name: 'D.S.', referrals: 4 },
];

const DemoPage = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 71, m: 59, s: 59 });

  useEffect(() => {
    const stored = localStorage.getItem('hirex_countdown_end');
    const endTime = stored ? parseInt(stored) : Date.now() + 72 * 3600000;
    if (!stored) localStorage.setItem('hirex_countdown_end', String(endTime));

    const tick = () => {
      const diff = Math.max(0, endTime - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <main className="pt-16">
      {/* Top CTA */}
      <div className="bg-gradient-to-r from-cyan-cta/10 to-teal-links/10 border-b border-cyan-cta/20 py-4">
        <div className="container-main flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-white font-syne font-bold text-lg">Book Your Free Demo</p>
            <p className="text-white/60 font-inter text-sm">Limited early access — only 23 spots remaining</p>
          </div>
          <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
            Book Free Demo →
          </a>
        </div>
      </div>

      {/* Countdown + Progress */}
      <section className="py-12 bg-navy-primary">
        <div className="container-main text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            {[
              { val: timeLeft.h, label: 'Hours' },
              { val: timeLeft.m, label: 'Mins' },
              { val: timeLeft.s, label: 'Secs' },
            ].map((t) => (
              <div key={t.label} className="glass-card px-5 py-3 min-w-[80px]">
                <div className="font-mono text-3xl font-bold text-cyan-cta">{String(t.val).padStart(2, '0')}</div>
                <div className="text-white/40 text-xs font-inter">{t.label}</div>
              </div>
            ))}
          </div>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-xs text-white/50 font-inter mb-1">
              <span>77/100 spots claimed</span>
              <span>23 remaining</span>
            </div>
            <div className="h-2 bg-navy-light/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '77%' }}
                transition={{ duration: 1.5 }}
                className="h-full bg-gradient-to-r from-cyan-cta to-teal-links rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Typeform Embed */}
      <section className="section-padding bg-navy-dark">
        <div className="container-main max-w-3xl">
          <h2 className="font-syne text-3xl font-bold text-white text-center mb-8">
            Reserve Your <span className="text-cyan-cta">Demo Slot</span>
          </h2>
          <div className="glass-card-glow overflow-hidden" style={{ minHeight: '500px' }}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdummy/viewform?embedded=true"
              width="100%"
              height="500"
              className="w-full border-0"
              title="Book Demo"
              style={{ background: 'transparent' }}
            >
              Loading form...
            </iframe>
            <div className="p-6 text-center">
              <p className="text-white/60 font-inter text-sm mb-4">Or book directly:</p>
              <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
                Open Demo Form →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gradient-to-r from-cyan-cta/5 via-transparent to-cyan-cta/5 border-y border-cyan-cta/10">
        <div className="container-main">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="font-syne text-2xl font-bold text-cyan-cta">23</div>
              <div className="text-white/50 text-xs font-inter">demos in 2 days</div>
            </div>
            <div className="w-px h-8 bg-navy-light/30 hidden md:block" />
            <div>
              <div className="font-syne text-2xl font-bold text-cyan-cta">93%</div>
              <div className="text-white/50 text-xs font-inter">trial-to-paid</div>
            </div>
            <div className="w-px h-8 bg-navy-light/30 hidden md:block" />
            <div className="max-w-xs">
              <p className="text-white/70 font-inter text-sm italic">"Best demo I've ever seen"</p>
              <p className="text-white/40 text-xs font-inter mt-1">— HR Head, Mumbai BPO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="section-padding bg-navy-dark">
        <div className="container-main max-w-4xl">
          <h2 className="font-syne text-3xl font-bold text-white text-center mb-4">
            Exclusive <span className="text-gold-accent">Rewards</span>
          </h2>
          <p className="text-white/60 font-inter text-center mb-10">Unlock bonuses just for trying HireX</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rewards.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex gap-4 items-start"
              >
                <span className="text-3xl">{r.icon}</span>
                <div>
                  <h3 className="font-syne font-bold text-white mb-1">{r.title}</h3>
                  <p className="text-white/60 font-inter text-sm">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="section-padding bg-gradient-to-b from-navy-dark to-navy-primary">
        <div className="container-main max-w-lg">
          <h2 className="font-syne text-2xl font-bold text-white text-center mb-2">
            Top Referrers 🏆
          </h2>
          <p className="text-white/50 font-inter text-sm text-center mb-8">Leaderboard resets monthly</p>
          <div className="glass-card overflow-hidden">
            {leaderboard.map((l, i) => (
              <div key={l.name} className="flex items-center justify-between px-6 py-4 border-b border-navy-light/20 last:border-0">
                <div className="flex items-center gap-4">
                  <span className="text-white/40 font-mono text-sm w-6">#{i + 1}</span>
                  <span className="text-white font-inter font-medium">{l.name}</span>
                </div>
                <span className="text-cyan-cta font-mono font-bold">{l.referrals} refs</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-white/60 font-inter text-sm mb-4">
              📸 Post your demo screenshot → tag <span className="text-cyan-cta">#HIREXDemo</span> → win 1 month premium
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-navy-dark text-center">
        <div className="container-main">
          <h2 className="font-syne text-3xl font-bold text-white mb-6">Don't Miss Out</h2>
          <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="btn-cta text-lg">
            Book Free Demo →
          </a>
        </div>
      </section>
    </main>
  );
};

export default DemoPage;
