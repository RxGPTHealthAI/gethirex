import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const isBusinessPath = location.pathname.startsWith('/business') || location.pathname === '/employers';
  const isCandidatePath = location.pathname.startsWith('/candidate') || location.pathname === '/career-pilot';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-dark/80 backdrop-blur-xl border-b border-navy-light/30">
      <div className="container-main flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-cta to-teal-links rounded-lg flex items-center justify-center font-syne font-bold text-navy-dark text-xl">
            #
          </div>
          <span className="font-syne font-bold text-xl text-white">HireX</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/business"
            className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all ${
              isBusinessPath
                ? 'bg-cyan-cta/10 text-cyan-cta'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            For Employers
          </Link>
          <Link
            to="/candidate"
            className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all ${
              isCandidatePath
                ? 'bg-cyan-cta/10 text-cyan-cta'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            For Candidates
          </Link>
          <Link
            to="/how-it-works"
            className="px-4 py-2 rounded-lg font-inter text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            How It Works
          </Link>
          <Link
            to="/pricing"
            className="px-4 py-2 rounded-lg font-inter text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            Pricing
          </Link>
          <Link
            to="/demo"
            className="btn-cta text-sm !py-2 !px-5"
          >
            Book Demo
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
