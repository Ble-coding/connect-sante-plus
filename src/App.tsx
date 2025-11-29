
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PharmacySearchPage from "./pages/PharmacySearchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ForPatientsPage from "./pages/ForPatientsPage";
import ForDoctorsPage from "./pages/ForDoctorsPage";
import ForPharmaciesPage from "./pages/ForPharmaciesPage";
import ForInsurancesPage from "./pages/ForInsurancesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import DashboardPage from "./pages/DashboardPage";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import PharmacyDashboardPage from "./pages/PharmacyDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import FAQPage from "./pages/FAQPage";
import SupportPage from "./pages/SupportPage";
import ContactPage from "./pages/ContactPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CareersPage from "./pages/CareersPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiesPage from "./pages/CookiesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pharmacy-search" element={<PharmacySearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/for-patients" element={<ForPatientsPage />} />
          <Route path="/for-doctors" element={<ForDoctorsPage />} />
          <Route path="/for-pharmacies" element={<ForPharmaciesPage />} />
          <Route path="/for-insurances" element={<ForInsurancesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/cookie-policy" element={<CookiesPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/doctor-dashboard/*" element={<DoctorDashboardPage />} />
          <Route path="/pharmacy-dashboard/*" element={<PharmacyDashboardPage />} />
          <Route path="/admin-dashboard/*" element={<AdminDashboardPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
