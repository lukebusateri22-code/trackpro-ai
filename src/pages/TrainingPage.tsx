import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import PageLayout from '@/components/layout/PageLayout';
import ActionCard from '@/components/ui/ActionCard';
import WorkoutCreator from '@/components/workout/WorkoutCreator';
import { useUser } from '@/contexts/UserContext';
import { useAuth } from '@/components/auth/AuthProvider';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { 
  Dumbbell, 
  Calendar, 
  Target, 
  Users, 
  TrendingUp, 
  Clock, 
  Award,
  Plus,
  Play,
  CheckCircle,
  Library,
  Search,
  Settings,
  BarChart3,
  Camera,
  Heart
} from 'lucide-react';

const TrainingPage: React.FC = () => {
  const { user, isCoach } = useUser();
  const { profile } = useAuth();
  const [showWorkoutCreator, setShowWorkoutCreator] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  
  // Get onboarding data to check if athlete has coach
  const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
  const hasCoach = onboardingData.hasCoach || false;
  
  // Determine user type: coach, athlete_with_coach, athlete_without_coach
  const userType = profile?.role === 'coach' ? 'coach' : 
                   (hasCoach ? 'athlete_with_coach' : 'athlete_without_coach');
  
  // Debug logging
  console.log('🚀 TrainingPage Rendered!', { userType, profile: profile?.role, hasCoach, onboardingData });

  // Stats based on user type
  const getStatsForUserType = () => {
    switch (userType) {
      case 'coach':
        return [
          { icon: Users, value: '12', label: 'Athletes', color: athleticTechTheme.colors.primary.track },
          { icon: Target, value: '8', label: 'Active Plans', color: athleticTechTheme.colors.primary.power },
          { icon: TrendingUp, value: '+15%', label: 'Improvement', color: athleticTechTheme.colors.performance.excellent },
          { icon: Clock, value: '24h', label: 'This Week', color: athleticTechTheme.colors.primary.field }
        ];
      case 'athlete_with_coach':
        return [
          { icon: Target, value: '3', label: 'Assigned', color: athleticTechTheme.colors.primary.track },
          { icon: CheckCircle, value: '85%', label: 'Completed', color: athleticTechTheme.colors.performance.excellent },
          { icon: TrendingUp, value: '+2.3%', label: 'Progress', color: athleticTechTheme.colors.primary.power },
          { icon: Clock, value: '4.5h', label: 'Avg Session', color: athleticTechTheme.colors.primary.field }
        ];
      case 'athlete_without_coach':
        return [
          { icon: Dumbbell, value: '5', label: 'This Week', color: athleticTechTheme.colors.primary.track },
          { icon: Award, value: '12', label: 'Streak Days', color: athleticTechTheme.colors.performance.excellent },
          { icon: Target, value: '3', label: 'Goals Active', color: athleticTechTheme.colors.primary.power },
          { icon: TrendingUp, value: '+8%', label: 'Strength', color: athleticTechTheme.colors.primary.field }
        ];
      default:
        return [];
    }
  };

  // Actions based on user type
  const getActionsForUserType = () => {
    switch (userType) {
      case 'coach':
        return [
          {
            title: 'Create Workout',
            description: 'Design new workouts with exercises, sets, reps, and instructions',
            icon: Plus,
            color: athleticTechTheme.colors.primary.track,
            gradient: athleticTechTheme.gradients.speed,
            onClick: () => setShowWorkoutCreator(true)
          },
          {
            title: 'Assign Workouts',
            description: 'Assign workouts to athletes with priority and modifications',
            icon: Users,
            color: athleticTechTheme.colors.primary.power,
            gradient: athleticTechTheme.gradients.power,
            onClick: () => setActiveView('assign')
          },
          {
            title: 'Athlete Progress',
            description: 'Monitor completion rates, performance data, and videos',
            icon: BarChart3,
            color: athleticTechTheme.colors.primary.field,
            gradient: athleticTechTheme.gradients.endurance,
            onClick: () => setActiveView('progress')
          },
          {
            title: 'Training Library',
            description: 'Browse and manage workout templates',
            icon: Library,
            color: athleticTechTheme.colors.primary.tech,
            gradient: athleticTechTheme.gradients.tech,
            onClick: () => setActiveView('library')
          }
        ];
      case 'athlete_with_coach':
        return [
          {
            title: 'Today\'s Workout',
            description: 'View and complete your assigned workout',
            icon: Play,
            color: athleticTechTheme.colors.primary.track,
            gradient: athleticTechTheme.gradients.speed,
            onClick: () => setActiveView('today')
          },
          {
            title: 'Complete Workout',
            description: 'Log sets, reps, weights, and rate difficulty',
            icon: CheckCircle,
            color: athleticTechTheme.colors.performance.excellent,
            gradient: athleticTechTheme.gradients.power,
            onClick: () => setActiveView('complete')
          },
          {
            title: 'Upload Video',
            description: 'Record and send training videos to your coach',
            icon: Camera,
            color: athleticTechTheme.colors.primary.power,
            gradient: athleticTechTheme.gradients.endurance,
            onClick: () => setActiveView('video')
          },
          {
            title: 'Training History',
            description: 'Review past workouts and progress',
            icon: Award,
            color: athleticTechTheme.colors.primary.field,
            gradient: athleticTechTheme.gradients.tech,
            onClick: () => setActiveView('history')
          }
        ];
      case 'athlete_without_coach':
        return [
          {
            title: 'Browse Workouts',
            description: 'Find workouts by goal: strength, weight loss, muscle building',
            icon: Search,
            color: athleticTechTheme.colors.primary.track,
            gradient: athleticTechTheme.gradients.speed,
            onClick: () => setActiveView('browse')
          },
          {
            title: 'Create Custom Workout',
            description: 'Build your own workout from exercise database',
            icon: Plus,
            color: athleticTechTheme.colors.primary.power,
            gradient: athleticTechTheme.gradients.power,
            onClick: () => setShowWorkoutCreator(true)
          },
          {
            title: 'Set Goals',
            description: 'Define fitness goals and track progress',
            icon: Target,
            color: athleticTechTheme.colors.primary.field,
            gradient: athleticTechTheme.gradients.endurance,
            onClick: () => setActiveView('goals')
          },
          {
            title: 'Track Progress',
            description: 'Log workouts, measurements, and photos',
            icon: TrendingUp,
            color: athleticTechTheme.colors.primary.tech,
            gradient: athleticTechTheme.gradients.tech,
            onClick: () => setActiveView('progress')
          }
        ];
      default:
        return [];
    }
  };

  const getPageTitle = () => {
    switch (userType) {
      case 'coach': return 'Training Management';
      case 'athlete_with_coach': return 'My Training';
      case 'athlete_without_coach': return 'Personal Training';
      default: return 'Training';
    }
  };
  
  const getPageSubtitle = () => {
    switch (userType) {
      case 'coach': return 'Create workouts and monitor athlete progress';
      case 'athlete_with_coach': return 'Complete assigned workouts and track progress';
      case 'athlete_without_coach': return 'Design your own training and achieve your goals';
      default: return 'Track your fitness journey';
    }
  };
  
  if (showWorkoutCreator) {
    return (
      <div 
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
      >
        <Header title="Create Workout" showSettings />
        <div className="flex-1 p-4 pb-20">
          <WorkoutCreator
            onSave={(workout) => {
              console.log('Workout created:', workout);
              setShowWorkoutCreator(false);
            }}
            onCancel={() => setShowWorkoutCreator(false)}
            athletes={userType === 'coach' ? [
              { id: '1', name: 'John Smith' },
              { id: '2', name: 'Sarah Johnson' },
              { id: '3', name: 'Mike Wilson' }
            ] : []}
          />
        </div>
        <Navigation activeTab="training" />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
    >
      <Header title="Training" showSettings />
      <div className="flex-1 p-4 pb-20">
        <PageLayout
          title={getPageTitle()}
          subtitle={getPageSubtitle()}
          headerIcon={Dumbbell}
          headerGradient={athleticTechTheme.gradients.speed}
          showStats={true}
          stats={getStatsForUserType()}
        >
          {/* User Type Indicator */}
          <div 
            className="p-4 rounded-lg mb-6"
            style={{
              backgroundColor: athleticTechTheme.colors.surface.secondary,
              border: `1px solid ${athleticTechTheme.colors.interactive.border}`
            }}
          >
            <div className="flex items-center space-x-3">
              {userType === 'coach' && <Users className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.power }} />}
              {userType === 'athlete_with_coach' && <Heart className="h-5 w-5" style={{ color: athleticTechTheme.colors.performance.excellent }} />}
              {userType === 'athlete_without_coach' && <Target className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />}
              <div>
                <p className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {userType === 'coach' && 'Coach Dashboard'}
                  {userType === 'athlete_with_coach' && 'Training with Coach'}
                  {userType === 'athlete_without_coach' && 'Independent Training'}
                </p>
                <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  {userType === 'coach' && 'Manage athletes and create training programs'}
                  {userType === 'athlete_with_coach' && 'Follow your coach\'s training plan'}
                  {userType === 'athlete_without_coach' && 'Create and track your own workouts'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Training Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getActionsForUserType().map((action, index) => (
              <ActionCard
                key={index}
                title={action.title}
                description={action.description}
                icon={action.icon}
                color={action.color}
                gradient={action.gradient}
                onClick={action.onClick}
              />
            ))}
          </div>

          {/* Recent Activity Section */}
          <div 
            className="p-6 rounded-xl"
            style={{
              backgroundColor: athleticTechTheme.colors.surface.secondary,
              border: `1px solid ${athleticTechTheme.colors.interactive.border}`
            }}
          >
            <h3 
              className="text-lg font-bold mb-4"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {userType === 'coach' && 'Recent Activity'}
              {userType === 'athlete_with_coach' && 'Assigned Workouts'}
              {userType === 'athlete_without_coach' && 'Recent Workouts'}
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div 
                  key={item}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{
                    backgroundColor: athleticTechTheme.colors.surface.elevated,
                    border: `1px solid ${athleticTechTheme.colors.interactive.border}`
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                    />
                    <div>
                      <p 
                        className="font-medium"
                        style={{ color: athleticTechTheme.colors.text.primary }}
                      >
                        {userType === 'coach' && `Workout assigned to Athlete ${item}`}
                        {userType === 'athlete_with_coach' && `Sprint Training ${item}`}
                        {userType === 'athlete_without_coach' && `Custom Workout ${item}`}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: athleticTechTheme.colors.text.secondary }}
                      >
                        {userType === 'coach' && 'Created 2 hours ago'}
                        {userType === 'athlete_with_coach' && 'Due tomorrow at 6:00 AM'}
                        {userType === 'athlete_without_coach' && 'Completed yesterday'}
                      </p>
                    </div>
                  </div>
                  <button 
                    className="px-3 py-1 rounded-md text-sm font-medium"
                    style={{
                      backgroundColor: athleticTechTheme.colors.primary.track,
                      color: athleticTechTheme.colors.text.inverse
                    }}
                  >
                    {userType === 'coach' && 'View'}
                    {userType === 'athlete_with_coach' && 'Start'}
                    {userType === 'athlete_without_coach' && 'Repeat'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </PageLayout>
      </div>
      <Navigation activeTab="training" />
    </div>
  );
};

export default TrainingPage;
