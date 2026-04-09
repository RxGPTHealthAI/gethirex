import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="pt-16 min-h-screen flex items-center justify-center bg-navy-dark">
    <div className="text-center">
      <h1 className="font-syne text-6xl font-bold text-cyan-cta mb-4">404</h1>
      <p className="text-white/60 font-inter text-lg mb-8">Page not found</p>
      <Link to="/" className="btn-cta">Go Home</Link>
    </div>
  </main>
);

export default NotFound;
