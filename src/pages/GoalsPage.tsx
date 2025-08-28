import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import PageLayout from '@/components/layout/PageLayout';
import ActionCard from '@/components/ui/ActionCard';
import { useUser } from '@/contexts/UserContext';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { 
  Target, 
  Trophy, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  Award,
  Plus
} from 'lucide-react';

const GoalsPage: React.FC = () => {
  const { user, isCoach } = useUser();
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const goalStats = [
    {
      icon: Target,
      value: '5',
      label: 'Active Goals',
      color: athleticTechTheme.colors.primary.track
    },
    {
      icon: CheckCircle,
      value: '12',
      label: 'Completed',
      color: athleticTechTheme.colors.performance.excellent
    },
    {
      icon: TrendingUp,
      value: '78%',
      label: 'Success Rate',
      color: athleticTechTheme.colors.primary.power
    },
    {
      icon: Clock,
      value: '3',
      label: 'Days Left',
      color: athleticTechTheme.colors.primary.field
    }
  ];

  const goalActions = [
    {
      title: 'Create New Goal',
      description: 'Set a new performance or training goal',
      icon: Plus,
      color: athleticTechTheme.colors.primary.track,
      gradient: athleticTechTheme.gradients.speed,
      onClick: () => setShowCreateGoal(true)
    },
    {
      title: 'Track Progress',
      description: 'Monitor your progress towards current goals',
      icon: TrendingUp,
      color: athleticTechTheme.colors.primary.power,
      gradient: athleticTechTheme.gradients.power,
      onClick: () => setShowProgress(true)
    },
    {
      title: 'Achievements',
      description: 'View your completed goals and milestones',
      icon: Trophy,
      color: athleticTechTheme.colors.performance.excellent,
      gradient: athleticTechTheme.gradients.endurance,
      onClick: () => console.log('Achievements clicked')
    },
    {
      title: 'Goal Templates',
      description: 'Browse pre-made goal templates for your event',
      icon: Target,
      color: athleticTechTheme.colors.primary.tech,
      gradient: athleticTechTheme.gradients.tech,
      onClick: () => console.log('Templates clicked')
    }
  ];

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
    >
      <Header title="Goals" showSettings />
      <div className="flex-1 p-4 pb-20">
        <PageLayout
          title="Goal Tracking"
          subtitle="Set, track, and achieve your athletic goals"
          headerIcon={Target}
          headerGradient={athleticTechTheme.gradients.speed}
          showStats={true}
          stats={goalStats}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goalActions.map((action, index) => (
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

          {/* Current Goals Section */}
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
              Current Goals
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Break 12.00s in 100m', progress: 85, deadline: '2 weeks' },
                { name: 'Increase squat to 150kg', progress: 60, deadline: '1 month' },
                { name: 'Complete 10 training sessions', progress: 70, deadline: '5 days' }
              ].map((goal, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg"
                  style={{
                    backgroundColor: athleticTechTheme.colors.surface.elevated,
                    border: `1px solid ${athleticTechTheme.colors.interactive.border}`
                  }}
                >
                  <div className="flex-1">
                    <p 
                      className="font-medium mb-1"
                      style={{ color: athleticTechTheme.colors.text.primary }}
                    >
                      {goal.name}
                    </p>
                    <div className="flex items-center space-x-2 mb-2">
                      <div 
                        className="flex-1 h-2 rounded-full"
                        style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                      >
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ 
                            width: `${goal.progress}%`,
                            backgroundColor: athleticTechTheme.colors.primary.track
                          }}
                        />
                      </div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: athleticTechTheme.colors.text.primary }}
                      >
                        {goal.progress}%
                      </span>
                    </div>
                    <p 
                      className="text-sm"
                      style={{ color: athleticTechTheme.colors.text.secondary }}
                    >
                      Deadline: {goal.deadline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageLayout>
      </div>
      <Navigation activeTab="goals" />
    </div>
  );
};

export default GoalsPage;
