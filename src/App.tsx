import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import GlobalNav from "@/components/GlobalNav";
import Footer from "@/components/Footer";
import PlatformSwitcher from "@/pages/PlatformSwitcher";
import BusinessPage from "@/pages/BusinessPage";
import CandidatePage from "@/pages/CandidatePage";
import BusinessPricingPage from "@/pages/BusinessPricingPage";
import CandidatePricingPage from "@/pages/CandidatePricingPage";
import AgentsPage from "@/pages/AgentsPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminPostEditorPage from "@/pages/AdminPostEditorPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isHome = location.pathname === "/";

  return (
    <>
      {!isAdmin && !isHome && <GlobalNav />}
      <Routes>
        <Route path="/" element={<PlatformSwitcher />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/business/pricing" element={<BusinessPricingPage />} />
        <Route path="/candidate" element={<CandidatePage />} />
        <Route path="/candidate/pricing" element={<CandidatePricingPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
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
