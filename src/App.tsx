import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HamburgerDrawer from './components/HamburgerDrawer';
import DemoOverlay from './components/campaign/DemoOverlay';
import Index from './pages/Index';
import BusinessPage from './pages/BusinessPage';
import CandidatePage from './pages/CandidatePage';
import HowItWorksPage from './pages/HowItWorksPage';
import ProcessPage from './pages/ProcessPage';
import PricingPage from './pages/PricingPage';
import CustomerStoriesPage from './pages/CustomerStoriesPage';
import TeamPage from './pages/TeamPage';
import DemoPage from './pages/DemoPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import HrFaqPage from './pages/HrFaqPage';
import CandidatesFaqPage from './pages/CandidatesFaqPage';
import FaqPage from './pages/FaqPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import SecurityPage from './pages/SecurityPage';
import GdprPage from './pages/GdprPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="min-h-screen bg-navy-dark text-white">
      <Navbar />
      <HamburgerDrawer />
      <DemoOverlay />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/employers" element={<BusinessPage />} />
        <Route path="/candidate" element={<CandidatePage />} />
        <Route path="/candidates" element={<CandidatePage />} />
        <Route path="/career-pilot" element={<CandidatePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/customer-stories" element={<CustomerStoriesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/hr-faq" element={<HrFaqPage />} />
        <Route path="/candidates-faq" element={<CandidatesFaqPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/gdpr" element={<GdprPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
