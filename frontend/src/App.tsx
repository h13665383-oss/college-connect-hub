import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import NoticesPage from "./pages/NoticesPage";
import EventsPage from "./pages/EventsPage";
import PlacementsPage from "./pages/PlacementsPage";
import SkillsPage from "./pages/SkillsPage";
import FeedbackPage from "./pages/FeedbackPage";
import ResourcesPage from "./pages/ResourcesPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/student" element={<Dashboard />} />
            <Route path="/dashboard/teacher" element={<Dashboard />} />
            <Route path="/dashboard/admin" element={<Dashboard />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/placements" element={<PlacementsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
