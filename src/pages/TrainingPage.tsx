import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import PageLayout from '@/components/layout/PageLayout';
import ActionCard from '@/components/ui/ActionCard';
import WorkoutCreator from '@/components/workout/WorkoutCreator';
import WorkoutCompletionModal from '@/components/training/WorkoutCompletionModal';
import WorkoutLibrary from '@/components/training/WorkoutLibrary';
import { WORKOUT_TEMPLATES } from '@/lib/workoutLibrary';
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
  const [showWorkoutCompletion, setShowWorkoutCompletion] = useState(false);
  const [showWorkoutLibrary, setShowWorkoutLibrary] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [activeView, setActiveView] = useState('dashboard');
  
  // Mock workout data for demonstration
  const mockAssignedWorkout = {
    id: 'workout_1',
    name: 'Sprint Power Development',
    description: 'High-intensity sprint training with plyometric exercises',
    exercises: [
      {
        id: 'ex1',
        name: '100m Sprint Intervals',
        sets: 6,
        duration: '100m',
        restPeriod: 180,
        instructions: 'Sprint at 95% effort, focus on form'
      },
      {
        id: 'ex2',
        name: 'Box Jumps',
        sets: 4,
        reps: 8,
        restPeriod: 90,
        instructions: 'Explosive takeoff, soft landing'
      },
      {
        id: 'ex3',
        name: 'Depth Jumps',
        sets: 3,
        reps: 5,
        restPeriod: 120,
        instructions: 'Step off box, land and immediately jump up'
      }
    ],
    estimatedDuration: 90,
    difficulty: 'hard' as const
  };
  
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
            onClick: () => alert('Athlete assignment feature coming soon!')
          },
          {
            title: 'Athlete Progress',
            description: 'Monitor completion rates, performance data, and videos',
            icon: BarChart3,
            color: athleticTechTheme.colors.primary.field,
            gradient: athleticTechTheme.gradients.endurance,
            onClick: () => alert('Athlete progress monitoring coming soon!')
          },
          {
            title: 'Training Library',
            description: 'Browse and manage workout templates',
            icon: Library,
            color: athleticTechTheme.colors.primary.tech,
            gradient: athleticTechTheme.gradients.tech,
            onClick: () => setShowWorkoutLibrary(true)
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
            onClick: () => {
              setSelectedWorkout(mockAssignedWorkout);
              setShowWorkoutCompletion(true);
            }
          },
          {
            title: 'Complete Workout',
            description: 'Log sets, reps, weights, and rate difficulty',
            icon: CheckCircle,
            color: athleticTechTheme.colors.performance.excellent,
            gradient: athleticTechTheme.gradients.power,
            onClick: () => {
              setSelectedWorkout(mockAssignedWorkout);
              setShowWorkoutCompletion(true);
            }
          },
          {
            title: 'Upload Video',
            description: 'Record and send training videos to your coach',
            icon: Camera,
            color: athleticTechTheme.colors.primary.power,
            gradient: athleticTechTheme.gradients.endurance,
            onClick: () => alert('Video upload feature coming soon!')
          },
          {
            title: 'Training History',
            description: 'Review past workouts and progress',
            icon: Award,
            color: athleticTechTheme.colors.primary.field,
            gradient: athleticTechTheme.gradients.tech,
            onClick: () => alert('Training history feature coming soon!')
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
            onClick: () => setShowWorkoutLibrary(true)
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
            onClick: () => alert('Goal setting feature coming soon!')
          },
          {
            title: 'Track Progress',
            description: 'Log workouts, measurements, and photos',
            icon: TrendingUp,
            color: athleticTechTheme.colors.primary.tech,
            gradient: athleticTechTheme.gradients.tech,
            onClick: () => alert('Progress tracking feature coming soon!')
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
      
      {/* Modals */}
      {showWorkoutCompletion && selectedWorkout && (
        <WorkoutCompletionModal
          workout={selectedWorkout}
          onClose={() => {
            setShowWorkoutCompletion(false);
            setSelectedWorkout(null);
          }}
          onComplete={(completionData) => {
            console.log('Workout completed:', completionData);
            setShowWorkoutCompletion(false);
            setSelectedWorkout(null);
            alert('Workout completed successfully! 🎉');
          }}
        />
      )}
      
      {showWorkoutLibrary && (
        <WorkoutLibrary
          onSelectWorkout={(workout) => {
            setSelectedWorkout(workout);
            setShowWorkoutLibrary(false);
            setShowWorkoutCompletion(true);
          }}
          onClose={() => setShowWorkoutLibrary(false)}
        />
      )}
    </div>
  );
};

export default TrainingPage;
