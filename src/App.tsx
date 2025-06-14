
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
import HowItWorksPage from "./pages/HowItWorksPage";
import DashboardPage from "./pages/DashboardPage";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import PharmacyDashboardPage from "./pages/PharmacyDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

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
