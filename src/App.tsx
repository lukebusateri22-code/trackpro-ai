
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import HomePage from "./pages/HomePage";
import TrainingPage from "./pages/TrainingPage";
import RecoveryPage from "./pages/RecoveryPage";
import GoalsPage from "./pages/GoalsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { UserProvider } from '@/contexts/UserContext';
import { TrainingProvider } from '@/contexts/TrainingContext';
import { RecoveryProvider } from '@/contexts/RecoveryContext';
import { GoalsProvider } from '@/contexts/GoalsContext';
import { AppProvider } from '@/contexts/AppContext';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <UserProvider>
            <TrainingProvider>
              <RecoveryProvider>
                <GoalsProvider>
                  <AppProvider>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/training" element={<TrainingPage />} />
                      <Route path="/recovery" element={<RecoveryPage />} />
                      <Route path="/goals" element={<GoalsPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AppProvider>
                </GoalsProvider>
              </RecoveryProvider>
            </TrainingProvider>
          </UserProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
