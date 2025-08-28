import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import PageLayout from '@/components/layout/PageLayout';
import ActionCard from '@/components/ui/ActionCard';
import { useUser } from '@/contexts/UserContext';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { 
  Dumbbell, 
  Calendar, 
  Target, 
  Users, 
  TrendingUp, 
  Clock, 
  Award,
  Plus
} from 'lucide-react';

const TrainingPage: React.FC = () => {
  const { user, isCoach } = useUser();
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [showAssignWorkout, setShowAssignWorkout] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const trainingStats = [
    {
      icon: Target,
      value: isCoach ? '8' : '3',
      label: isCoach ? 'Active Plans' : 'This Week',
      color: athleticTechTheme.colors.primary.track
    },
    {
      icon: Users,
      value: isCoach ? '12' : '85%',
      label: isCoach ? 'Athletes' : 'Completed',
      color: athleticTechTheme.colors.primary.power
    },
    {
      icon: TrendingUp,
      value: isCoach ? '+15%' : '+2.3%',
      label: isCoach ? 'Improvement' : 'This Month',
      color: athleticTechTheme.colors.performance.excellent
    },
    {
      icon: Clock,
      value: isCoach ? '24h' : '4.5h',
      label: isCoach ? 'This Week' : 'Avg Session',
      color: athleticTechTheme.colors.primary.field
    }
  ];

  const trainingActions = [
    {
      title: isCoach ? 'Create Training Plan' : 'Today\'s Workout',
      description: isCoach ? 'Design a new training program for athletes' : 'View your scheduled training session',
      icon: isCoach ? Plus : Dumbbell,
      color: athleticTechTheme.colors.primary.track,
      gradient: athleticTechTheme.gradients.speed,
      onClick: () => setShowCreatePlan(true)
    },
    {
      title: isCoach ? 'Assign Workouts' : 'Training History',
      description: isCoach ? 'Assign specific workouts to athletes' : 'Review your past training sessions',
      icon: isCoach ? Calendar : Award,
      color: athleticTechTheme.colors.primary.power,
      gradient: athleticTechTheme.gradients.power,
      onClick: () => setShowAssignWorkout(true)
    },
    {
      title: isCoach ? 'Athlete Progress' : 'Personal Records',
      description: isCoach ? 'Monitor athlete development and metrics' : 'Track your best performances',
      icon: TrendingUp,
      color: athleticTechTheme.colors.primary.field,
      gradient: athleticTechTheme.gradients.endurance,
      onClick: () => setShowProgress(true)
    },
    {
      title: isCoach ? 'Training Library' : 'Exercise Library',
      description: isCoach ? 'Browse and manage training templates' : 'Explore exercises and techniques',
      icon: Target,
      color: athleticTechTheme.colors.primary.tech,
      gradient: athleticTechTheme.gradients.tech,
      onClick: () => console.log('Training library clicked')
    }
  ];

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
    >
      <Header title="Training" showSettings />
      <div className="flex-1 p-4 pb-20">
        <PageLayout
          title={isCoach ? 'Training Management' : 'My Training'}
          subtitle={isCoach ? 'Design and monitor athlete training programs' : 'Track your workouts and progress'}
          headerIcon={Dumbbell}
          headerGradient={athleticTechTheme.gradients.speed}
          showStats={true}
          stats={trainingStats}
        >
          {/* Training Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingActions.map((action, index) => (
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

          {/* Quick Access Section */}
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
              {isCoach ? 'Recent Activity' : 'Upcoming Sessions'}
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
                        {isCoach ? `Training Plan ${item}` : `Sprint Training ${item}`}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: athleticTechTheme.colors.text.secondary }}
                      >
                        {isCoach ? 'Updated 2 hours ago' : 'Tomorrow at 6:00 AM'}
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
                    {isCoach ? 'View' : 'Start'}
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
