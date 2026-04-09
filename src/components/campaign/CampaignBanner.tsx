import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TYPEFORM_URL = 'https://bit.ly/4doSxab';

const CampaignBanner = () => {
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
    <section className="relative bg-gradient-to-r from-navy-primary via-[#1a2860] to-navy-primary py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.08),transparent_70%)]" />
      <div className="container-main relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-cta/10 border border-cyan-cta/30 text-cyan-cta text-xs font-inter font-semibold tracking-wider mb-4">
            LIMITED EARLY ACCESS
          </span>
          <h1 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Book Your HIREX Demo
          </h1>
          <p className="font-inter text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Only 100 licenses. 23 demos booked in 2 days.
          </p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {[
              { val: timeLeft.h, label: 'Hours' },
              { val: timeLeft.m, label: 'Mins' },
              { val: timeLeft.s, label: 'Secs' },
            ].map((t) => (
              <div key={t.label} className="glass-card px-4 py-3 min-w-[72px]">
                <div className="font-mono text-2xl font-bold text-cyan-cta">{String(t.val).padStart(2, '0')}</div>
                <div className="text-white/40 text-xs font-inter">{t.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-xs text-white/50 font-inter mb-1">
              <span>77/100 spots claimed</span>
              <span>23 remaining</span>
            </div>
            <div className="h-2 bg-navy-light/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '77%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-cyan-cta to-teal-links rounded-full"
              />
            </div>
          </div>

          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta text-lg"
          >
            Reserve My Demo →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignBanner;
