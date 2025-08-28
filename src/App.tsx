import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import AuthModal from './components/auth/AuthModal';
import FixedOnboardingV2 from "./components/auth/FixedOnboardingV2";
import LoadingScreen from '@/components/ui/LoadingScreen';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

// Main App Routes Component
const AppRoutes: React.FC = () => {
  const { user, loading, signOut, signUp } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen message="Initializing TrackPro AI..." />;
  }

  // Show onboarding flow
  if (showOnboarding) {
    return (
      <FixedOnboardingV2 
        onComplete={async (data) => {
          // Store additional onboarding data in localStorage for now
          // TODO: Extend database schema to support these fields
          const additionalData = {
            primaryEvents: data.primaryEvents,
            personalRecords: data.personalRecords,
            trainingGoals: data.trainingGoals,
            coachingLevel: data.coachingLevel,
            yearsCoaching: data.yearsCoaching,
            specialtyEvents: data.specialtyEvents,
            coachingPhilosophy: data.coachingPhilosophy,
            yearsExperience: data.yearsExperience,
            coachCode: data.coachCode,
            hasCoach: !!data.coachCode
          };
          localStorage.setItem('onboardingData', JSON.stringify(additionalData));
          
          const { error } = await signUp(data.email, data.password, {
            full_name: data.fullName,
            role: data.role,
            username: data.email.split('@')[0],
            age: data.age
          });
          
          if (error) {
            console.error('Registration error:', error);
            // Handle error - maybe show error message
          } else {
            setShowOnboarding(false);
          }
        }}
        onBack={() => {
          setShowOnboarding(false);
          setShowAuthModal(true);
        }}
      />
    );
  }

  // Show auth modal for unauthenticated users
  if (!user) {
    return (
      <>
        <div 
          className="min-h-screen flex items-center justify-center p-4"
          style={{ background: athleticTechTheme.gradients.hero }}
        >
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold text-white mb-4">TrackPro AI</h1>
            <p className="text-white/80 text-lg mb-8">
              The ultimate AI-powered training platform for track and field athletes and coaches.
            </p>
            <Button 
              onClick={() => setShowAuthModal(true)}
              size="lg"
              className="bg-white text-slate-900 hover:bg-gray-100"
            >
              Get Started
            </Button>
          </div>
        </div>
        <AuthModal 
          open={showAuthModal} 
          onOpenChange={setShowAuthModal}
          onStartOnboarding={() => setShowOnboarding(true)}
        />
      </>
    );
  }

  // Main authenticated app
  return (
    <UserProvider>
      <TrainingProvider>
        <RecoveryProvider>
          <GoalsProvider>
            <AppProvider>
              {/* Quick Auth Controls */}
              <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <User className="h-4 w-4 text-white" />
                  <span className="text-white text-sm">{user.email}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>

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
  );
};

const App = () => (
  <ThemeProvider defaultTheme="light">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
