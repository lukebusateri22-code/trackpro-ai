import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Moon, 
  Zap, 
  AlertTriangle, 
  Pill, 
  Apple, 
  Brain, 
  Activity,
  Plus,
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface RecoveryMetrics {
  mentalHealth: number;
  sleepQuality: number;
  energyLevel: number;
  overallRecovery: number;
}

interface RecoveryDashboardProps {
  onOpenModal: (modalType: string) => void;
}

const RecoveryDashboard: React.FC<RecoveryDashboardProps> = ({ onOpenModal }) => {
  // Mock recovery data
  const [recoveryMetrics] = useState<RecoveryMetrics>({
    mentalHealth: 78,
    sleepQuality: 85,
    energyLevel: 72,
    overallRecovery: 78
  });

  const [recentInjuries] = useState([
    {
      id: '1',
      type: 'Minor',
      location: 'Left Hamstring',
      date: '2025-08-25',
      status: 'Recovering',
      severity: 3
    },
    {
      id: '2',
      type: 'Soreness',
      location: 'Right Knee',
      date: '2025-08-23',
      status: 'Resolved',
      severity: 2
    }
  ]);

  const [currentSupplements] = useState([
    { name: 'Whey Protein', dosage: '25g', timing: 'Post-workout', status: 'active' },
    { name: 'Creatine', dosage: '5g', timing: 'Daily', status: 'active' },
    { name: 'Vitamin D', dosage: '2000 IU', timing: 'Morning', status: 'active' },
    { name: 'Magnesium', dosage: '400mg', timing: 'Evening', status: 'active' }
  ]);

  const [todaysMetrics] = useState({
    sleepHours: 7.5,
    sleepQuality: 8,
    energyLevel: 7,
    stressLevel: 4,
    hydration: 85,
    nutrition: 78
  });

  const getRecoveryColor = (score: number) => {
    if (score >= 80) return athleticTechTheme.colors.performance.excellent;
    if (score >= 60) return athleticTechTheme.colors.primary.track;
    return athleticTechTheme.colors.primary.power;
  };

  const getInjuryStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return athleticTechTheme.colors.performance.excellent;
      case 'Recovering': return athleticTechTheme.colors.primary.track;
      case 'Active': return athleticTechTheme.colors.primary.power;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  const recoveryCards = [
    {
      title: 'Mental Health',
      description: 'Track mood, stress, and mental wellbeing',
      icon: Brain,
      color: athleticTechTheme.colors.primary.power,
      gradient: athleticTechTheme.gradients.power,
      score: recoveryMetrics.mentalHealth,
      onClick: () => onOpenModal('mental-health')
    },
    {
      title: 'Sleep Tracker',
      description: 'Monitor sleep quality and duration',
      icon: Moon,
      color: athleticTechTheme.colors.primary.track,
      gradient: athleticTechTheme.gradients.endurance,
      score: recoveryMetrics.sleepQuality,
      onClick: () => onOpenModal('sleep-tracker')
    },
    {
      title: 'Energy Levels',
      description: 'Track daily energy and fatigue',
      icon: Zap,
      color: athleticTechTheme.colors.events.sprints,
      gradient: athleticTechTheme.gradients.tech,
      score: recoveryMetrics.energyLevel,
      onClick: () => onOpenModal('energy-tracker')
    },
    {
      title: 'Injury Log',
      description: 'Record and monitor injuries',
      icon: AlertTriangle,
      color: athleticTechTheme.colors.primary.power,
      gradient: athleticTechTheme.gradients.power,
      count: recentInjuries.filter(i => i.status !== 'Resolved').length,
      onClick: () => onOpenModal('injury-log')
    },
    {
      title: 'Supplements',
      description: 'Track supplement intake',
      icon: Pill,
      color: athleticTechTheme.colors.primary.field,
      gradient: athleticTechTheme.gradients.endurance,
      count: currentSupplements.filter(s => s.status === 'active').length,
      onClick: () => onOpenModal('supplements')
    },
    {
      title: 'Nutrition',
      description: 'Log meals and nutrition data',
      icon: Apple,
      color: athleticTechTheme.colors.performance.excellent,
      gradient: athleticTechTheme.gradients.tech,
      score: todaysMetrics.nutrition,
      onClick: () => onOpenModal('nutrition')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Recovery Overview */}
      <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart size={24} style={{ color: athleticTechTheme.colors.primary.power }} />
            <span style={{ color: athleticTechTheme.colors.text.primary }}>Recovery Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <div className="absolute inset-0 rounded-full" style={{ 
                  background: `conic-gradient(${getRecoveryColor(recoveryMetrics.overallRecovery)} ${recoveryMetrics.overallRecovery * 3.6}deg, ${athleticTechTheme.colors.surface.elevated} 0deg)` 
                }}>
                  <div className="absolute inset-2 rounded-full flex items-center justify-center" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                    <span className="text-lg font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {recoveryMetrics.overallRecovery}%
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                Overall Recovery
              </h3>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>Mental Health</span>
                <span className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {recoveryMetrics.mentalHealth}%
                </span>
              </div>
              <Progress value={recoveryMetrics.mentalHealth} className="mb-4" />
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>Sleep Quality</span>
                <span className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {recoveryMetrics.sleepQuality}%
                </span>
              </div>
              <Progress value={recoveryMetrics.sleepQuality} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>Energy Level</span>
                <span className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {recoveryMetrics.energyLevel}%
                </span>
              </div>
              <Progress value={recoveryMetrics.energyLevel} className="mb-4" />
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>Hydration</span>
                <span className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {todaysMetrics.hydration}%
                </span>
              </div>
              <Progress value={todaysMetrics.hydration} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>Sleep</span>
                <span className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {todaysMetrics.sleepHours}h
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>Stress</span>
                <Badge style={{ backgroundColor: getRecoveryColor(100 - (todaysMetrics.stressLevel * 10)) }}>
                  {todaysMetrics.stressLevel}/10
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>Energy</span>
                <Badge style={{ backgroundColor: getRecoveryColor(todaysMetrics.energyLevel * 10) }}>
                  {todaysMetrics.energyLevel}/10
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recovery Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recoveryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
              onClick={card.onClick}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: card.color + '20' }}
                  >
                    <Icon size={24} style={{ color: card.color }} />
                  </div>
                  {card.score !== undefined && (
                    <Badge style={{ backgroundColor: getRecoveryColor(card.score) }}>
                      {card.score}%
                    </Badge>
                  )}
                  {card.count !== undefined && (
                    <Badge style={{ backgroundColor: card.color }}>
                      {card.count}
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-lg font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {card.title}
                </h3>
                <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Injuries */}
        <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle size={20} style={{ color: athleticTechTheme.colors.primary.power }} />
                <span style={{ color: athleticTechTheme.colors.text.primary }}>Recent Injuries</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onOpenModal('injury-log')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInjuries.slice(0, 3).map((injury) => (
                <div key={injury.id} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <div>
                    <h4 className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {injury.location}
                    </h4>
                    <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      {injury.type} • {new Date(injury.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge style={{ backgroundColor: getInjuryStatusColor(injury.status) }}>
                    {injury.status}
                  </Badge>
                </div>
              ))}
              {recentInjuries.length === 0 && (
                <div className="text-center py-4">
                  <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                    No recent injuries recorded
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Active Supplements */}
        <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Pill size={20} style={{ color: athleticTechTheme.colors.primary.field }} />
                <span style={{ color: athleticTechTheme.colors.text.primary }}>Active Supplements</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onOpenModal('supplements')}>
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentSupplements.slice(0, 3).map((supplement, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <div>
                    <h4 className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {supplement.name}
                    </h4>
                    <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      {supplement.dosage} • {supplement.timing}
                    </p>
                  </div>
                  <Badge style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}>
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecoveryDashboard;
