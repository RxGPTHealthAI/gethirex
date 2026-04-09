import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DemoOverlay = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('hirex_demo_overlay_seen');
    if (!seen) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('hirex_demo_overlay_seen', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card-glow max-w-lg w-full p-8 text-center"
          >
            <p className="text-4xl mb-4">🚀</p>
            <h2 className="font-syne text-2xl font-bold text-white mb-2">
              DEMO CAMPAIGN LIVE
            </h2>
            <p className="text-white/70 font-inter mb-2">
              Limited Early Access. Fill the form now.
            </p>
            <CountdownSmall />
            <a
              href="https://bit.ly/4doSxab"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta mt-6 inline-block"
            >
              Book Demo →
            </a>
            <button
              onClick={dismiss}
              className="block mx-auto mt-4 text-white/40 text-sm hover:text-white/60 transition-colors"
            >
              Maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CountdownSmall = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 71, m: 59, s: 59 });

  useEffect(() => {
    const end = Date.now() + 72 * 60 * 60 * 1000;
    const stored = localStorage.getItem('hirex_countdown_end');
    const endTime = stored ? parseInt(stored) : end;
    if (!stored) localStorage.setItem('hirex_countdown_end', String(end));

    const tick = () => {
      const diff = Math.max(0, endTime - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-cyan-cta font-mono text-lg font-bold">
      Closes in {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
    </p>
  );
};

export default DemoOverlay;
