import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import PageLayout from '@/components/layout/PageLayout';
import ActionCard from '@/components/ui/ActionCard';
import { useUser } from '@/contexts/UserContext';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { 
  Heart, 
  Moon, 
  Activity, 
  Droplets, 
  Brain, 
  Thermometer,
  Battery,
  Zap
} from 'lucide-react';

const RecoveryPage: React.FC = () => {
  const { user, isCoach } = useUser();
  const [showSleepLog, setShowSleepLog] = useState(false);
  const [showWellness, setShowWellness] = useState(false);

  const recoveryStats = [
    {
      icon: Heart,
      value: '68',
      label: 'Resting HR',
      color: athleticTechTheme.colors.performance.excellent
    },
    {
      icon: Moon,
      value: '7.5h',
      label: 'Sleep',
      color: athleticTechTheme.colors.primary.power
    },
    {
      icon: Battery,
      value: '85%',
      label: 'Recovery',
      color: athleticTechTheme.colors.primary.field
    },
    {
      icon: Zap,
      value: '92',
      label: 'Readiness',
      color: athleticTechTheme.colors.primary.track
    }
  ];

  const recoveryActions = [
    {
      title: 'Sleep Tracking',
      description: 'Log and monitor your sleep quality and duration',
      icon: Moon,
      color: athleticTechTheme.colors.primary.power,
      gradient: athleticTechTheme.gradients.power,
      onClick: () => setShowSleepLog(true)
    },
    {
      title: 'Wellness Check',
      description: 'Daily wellness questionnaire and mood tracking',
      icon: Heart,
      color: athleticTechTheme.colors.performance.excellent,
      gradient: athleticTechTheme.gradients.endurance,
      onClick: () => setShowWellness(true)
    },
    {
      title: 'Hydration Log',
      description: 'Track your daily water intake and hydration levels',
      icon: Droplets,
      color: athleticTechTheme.colors.primary.field,
      gradient: athleticTechTheme.gradients.speed,
      onClick: () => console.log('Hydration clicked')
    },
    {
      title: 'Recovery Tools',
      description: 'Access recovery protocols and techniques',
      icon: Activity,
      color: athleticTechTheme.colors.primary.tech,
      gradient: athleticTechTheme.gradients.tech,
      onClick: () => console.log('Recovery tools clicked')
    }
  ];

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
    >
      <Header title="Recovery" showSettings />
      <div className="flex-1 p-4 pb-20">
        <PageLayout
          title="Recovery Center"
          subtitle="Monitor and optimize your recovery for peak performance"
          headerIcon={Heart}
          headerGradient={athleticTechTheme.gradients.endurance}
          showStats={true}
          stats={recoveryStats}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recoveryActions.map((action, index) => (
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
        </PageLayout>
      </div>
      <Navigation activeTab="recovery" />
    </div>
  );
};

export default RecoveryPage;
