import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import GlobalNav from "@/components/GlobalNav";
import Footer from "@/components/Footer";
import HamburgerDrawer from "@/components/HamburgerDrawer";
import PlatformSwitcher from "@/pages/PlatformSwitcher";
import BusinessPage from "@/pages/BusinessPage";
import CandidatePage from "@/pages/CandidatePage";
import AgentsPage from "@/pages/AgentsPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminPostEditorPage from "@/pages/AdminPostEditorPage";
import NotFound from "@/pages/NotFound";
import HowItWorksPage from "@/pages/HowItWorksPage";
import ProcessPage from "@/pages/ProcessPage";
import CustomerStoriesPage from "@/pages/CustomerStoriesPage";
import TeamPage from "@/pages/TeamPage";
import DemoPage from "@/pages/DemoPage";
import PricingPage from "@/pages/PricingPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import HRFAQPage from "@/pages/HRFAQPage";
import CandidatesFAQPage from "@/pages/CandidatesFAQPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import RefundPolicyPage from "@/pages/RefundPolicyPage";
import TermsPage from "@/pages/TermsPage";
import SecurityPage from "@/pages/SecurityPage";
import GDPRPage from "@/pages/GDPRPage";
import CookiePolicyPage from "@/pages/CookiePolicyPage";

const queryClient = new QueryClient();

const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isHome = location.pathname === "/";

  return (
    <>
      {!isAdmin && !isHome && <GlobalNav />}
      {!isAdmin && !isHome && <HamburgerDrawer />}
      <Routes>
        <Route path="/" element={<PlatformSwitcher />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/business/pricing" element={<Navigate to="/pricing" replace />} />
        <Route path="/candidate" element={<CandidatePage />} />
        <Route path="/candidate/pricing" element={<Navigate to="/pricing" replace />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/customer-stories" element={<CustomerStoriesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/hr-faq" element={<HRFAQPage />} />
        <Route path="/candidates-faq" element={<CandidatesFAQPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/refund" element={<RefundPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/gdpr" element={<GDPRPage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/posts/:id" element={<AdminPostEditorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && !isHome && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
