import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useAuth } from '@/components/auth/AuthProvider';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { VideoAnalysisModal } from '@/components/VideoAnalysisModal';
import AICoachChat from '@/components/AICoachChat';
import { TrainingPlanModal } from '@/components/modals/TrainingPlanModal';
import { AnalyticsModal } from '@/components/modals/AnalyticsModal';
import { 
  Calendar, 
  Video, 
  BarChart3, 
  Bot,
  Target,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';

const HomeScreen: React.FC = () => {
  const { user, isCoach } = useUser();
  const { user: authUser, profile } = useAuth();
  const [showVideoAnalysis, setShowVideoAnalysis] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showTrainingPlan, setShowTrainingPlan] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const mainActions = [
    {
      id: 'daily-workouts',
      title: isCoach ? 'Create Training Plan' : 'Workouts for the Day',
      description: isCoach ? 'Design workouts for your athletes' : 'View today\'s scheduled training sessions',
      icon: Calendar,
      color: athleticTechTheme.colors.primary.track,
      gradient: athleticTechTheme.gradients.speed,
      onClick: () => {
        if (isCoach) {
          setShowTrainingPlan(true);
        } else {
          // Navigate to training page for athletes
          window.location.href = '/training';
        }
      }
    },
    {
      id: 'video-analysis',
      title: 'Video Analysis',
      description: isCoach ? 'Analyze athlete performance videos' : 'Upload videos for AI analysis',
      icon: Video,
      color: athleticTechTheme.colors.primary.power,
      gradient: athleticTechTheme.gradients.power,
      onClick: () => setShowVideoAnalysis(true)
    },
    ...(isCoach ? [{
      id: 'analytics',
      title: 'Analytics',
      description: 'Track athlete progress and metrics',
      icon: BarChart3,
      color: athleticTechTheme.colors.primary.field,
      gradient: athleticTechTheme.gradients.endurance,
      onClick: () => setShowAnalytics(true)
    }] : []),
    {
      id: 'ai-coach',
      title: 'AI Coach',
      description: isCoach ? 'Get AI insights for coaching' : 'Chat with your AI training assistant',
      icon: Bot,
      color: athleticTechTheme.colors.primary.tech,
      gradient: athleticTechTheme.gradients.tech,
      onClick: () => setShowAIChat(true)
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div 
        className="p-6 rounded-xl text-center"
        style={{
          background: athleticTechTheme.gradients.hero,
          color: athleticTechTheme.colors.text.inverse
        }}
      >
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {authUser?.email?.split('@')[0] || profile?.username || user?.username || 'Athlete'}! 🏃‍♂️
        </h1>
        <p className="opacity-90">
          {isCoach 
            ? 'Ready to elevate your athletes to new heights?' 
            : 'Ready to push your limits and achieve greatness?'
          }
        </p>
      </div>

      {/* Quick Stats - Show for both coaches and athletes but different content */}
      {isCoach ? (
        <div className="grid grid-cols-3 gap-4">
          <div
            className="p-4 rounded-xl text-center"
            style={{
              backgroundColor: athleticTechTheme.colors.surface.secondary,
              border: `1px solid ${athleticTechTheme.colors.interactive.border}`
            }}
          >
            <Target 
              size={24} 
              style={{ color: athleticTechTheme.colors.primary.track }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              12
            </p>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Athletes
            </p>
          </div>
          
          <div
            className="p-4 rounded-xl text-center"
            style={{
              backgroundColor: athleticTechTheme.colors.surface.secondary,
              border: `1px solid ${athleticTechTheme.colors.interactive.border}`
            }}
          >
            <Zap 
              size={24} 
              style={{ color: athleticTechTheme.colors.events.sprints }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              8
            </p>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Active Plans
            </p>
          </div>
          
          <div
            className="p-4 rounded-xl text-center"
            style={{
              backgroundColor: athleticTechTheme.colors.surface.secondary,
              border: `1px solid ${athleticTechTheme.colors.interactive.border}`
            }}
          >
            <TrendingUp 
              size={24} 
              style={{ color: athleticTechTheme.colors.performance.excellent }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              94%
            </p>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Completion
            </p>
          </div>
        </div>
      ) : (
        // Athlete stats - Today's workouts
        <div className="grid grid-cols-3 gap-4">
          <div
            className="p-4 rounded-xl text-center"
            style={{
              backgroundColor: athleticTechTheme.colors.surface.secondary,
              border: `1px solid ${athleticTechTheme.colors.interactive.border}`
            }}
          >
            <Calendar 
              size={24} 
              style={{ color: athleticTechTheme.colors.primary.track }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              3
            </p>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Today's Workouts
            </p>
          </div>
          
          <div
            className="p-4 rounded-xl text-center"
            style={{
              backgroundColor: athleticTechTheme.colors.surface.secondary,
              border: `1px solid ${athleticTechTheme.colors.interactive.border}`
            }}
          >
            <Award 
              size={24} 
              style={{ color: athleticTechTheme.colors.primary.power }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              12.5s
            </p>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              100m PB
            </p>
          </div>
          
          <div
            className="p-4 rounded-xl text-center"
            style={{
              backgroundColor: athleticTechTheme.colors.surface.secondary,
              border: `1px solid ${athleticTechTheme.colors.interactive.border}`
            }}
          >
            <TrendingUp 
              size={24} 
              style={{ color: athleticTechTheme.colors.performance.excellent }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              85%
            </p>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Recovery Score
            </p>
          </div>
        </div>
      )}

      {/* Main Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {mainActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className="p-6 rounded-xl text-left transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: athleticTechTheme.colors.surface.secondary,
                border: `1px solid ${athleticTechTheme.colors.interactive.border}`,
                boxShadow: athleticTechTheme.shadows.md
              }}
            >
              <div className="flex items-center space-x-4 mb-3">
                <div 
                  className="p-3 rounded-xl"
                  style={{
                    background: action.gradient,
                    boxShadow: `0 4px 12px ${action.color}30`
                  }}
                >
                  <Icon 
                    size={24} 
                    style={{ color: athleticTechTheme.colors.text.inverse }}
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    className="font-bold text-lg mb-1"
                    style={{ color: athleticTechTheme.colors.text.primary }}
                  >
                    {action.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: athleticTechTheme.colors.text.secondary }}
                  >
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modals */}
      <TrainingPlanModal 
        isOpen={showTrainingPlan} 
        onClose={() => setShowTrainingPlan(false)} 
      />
      
      <VideoAnalysisModal 
        isOpen={showVideoAnalysis} 
        onClose={() => setShowVideoAnalysis(false)} 
      />
      
      <AnalyticsModal 
        isOpen={showAnalytics} 
        onClose={() => setShowAnalytics(false)} 
      />
      
      <AICoachChat 
        isOpen={showAIChat} 
        onClose={() => setShowAIChat(false)} 
      />
    </div>
  );
};

export default HomeScreen;
