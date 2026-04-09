import { motion } from 'framer-motion';

const TYPEFORM_URL = 'https://bit.ly/4doSxab';

interface DemoCtaStripProps {
  message?: string;
}

const DemoCtaStrip = ({ message = "⚡ Limited Early Access — Only 100 licenses. Book your demo today." }: DemoCtaStripProps) => {
  return (
    <div className="bg-gradient-to-r from-cyan-cta/10 via-cyan-cta/5 to-cyan-cta/10 border-y border-cyan-cta/20 py-3">
      <div className="container-main flex items-center justify-between flex-wrap gap-3">
        <p className="text-white/90 font-inter text-sm font-medium">{message}</p>
        <a
          href={TYPEFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-cta text-navy-dark font-inter font-bold text-sm px-5 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
        >
          Book Free Demo →
        </a>
      </div>
    </div>
  );
};

export default DemoCtaStrip;
