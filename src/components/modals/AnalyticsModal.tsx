import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { useUser } from '@/contexts/UserContext';
import { 
  TrendingUp, 
  TrendingDown,
  Target, 
  Clock, 
  Zap,
  Award,
  Calendar,
  Activity,
  BarChart3,
  Users,
  Timer
} from 'lucide-react';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  change: number; // percentage
  trend: 'up' | 'down' | 'stable';
  category: 'speed' | 'power' | 'endurance' | 'technique';
}

interface TrainingStats {
  totalSessions: number;
  completedSessions: number;
  totalHours: number;
  averageIntensity: number;
  weeklyGoal: number;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose }) => {
  const { isCoach } = useUser();
  const [activeTimeframe, setActiveTimeframe] = useState<'week' | 'month' | 'season'>('month');

  // Mock performance data
  const performanceMetrics: PerformanceMetric[] = [
    {
      id: '1',
      name: '100m Personal Best',
      value: '10.85',
      unit: 's',
      change: -2.1,
      trend: 'up',
      category: 'speed'
    },
    {
      id: '2',
      name: 'Long Jump PB',
      value: '7.45',
      unit: 'm',
      change: 3.2,
      trend: 'up',
      category: 'power'
    },
    {
      id: '3',
      name: '400m Split Time',
      value: '48.92',
      unit: 's',
      change: -1.8,
      trend: 'up',
      category: 'speed'
    },
    {
      id: '4',
      name: 'Squat 1RM',
      value: '185',
      unit: 'kg',
      change: 8.5,
      trend: 'up',
      category: 'power'
    }
  ];

  const trainingStats: TrainingStats = {
    totalSessions: 24,
    completedSessions: 22,
    totalHours: 36,
    averageIntensity: 78,
    weeklyGoal: 6
  };

  // Mock coach analytics
  const coachMetrics = {
    totalAthletes: 12,
    activePrograms: 8,
    completionRate: 94,
    averageImprovement: 12.3
  };

  const weeklyProgress = [
    { week: 'Week 1', sessions: 6, intensity: 75 },
    { week: 'Week 2', sessions: 5, intensity: 82 },
    { week: 'Week 3', sessions: 6, intensity: 78 },
    { week: 'Week 4', sessions: 7, intensity: 85 }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'speed': return athleticTechTheme.colors.events.sprints;
      case 'power': return athleticTechTheme.colors.primary.power;
      case 'endurance': return athleticTechTheme.colors.events.distance;
      case 'technique': return athleticTechTheme.colors.primary.field;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  const renderMetricCard = (metric: PerformanceMetric) => (
    <Card 
      key={metric.id}
      className="hover:shadow-lg transition-all duration-200"
      style={{ 
        backgroundColor: athleticTechTheme.colors.surface.secondary,
        border: `1px solid ${athleticTechTheme.colors.interactive.border}`
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p 
              className="text-sm font-medium"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              {metric.name}
            </p>
            <div className="flex items-baseline space-x-1">
              <span 
                className="text-2xl font-bold"
                style={{ color: athleticTechTheme.colors.text.primary }}
              >
                {metric.value}
              </span>
              <span 
                className="text-sm"
                style={{ color: athleticTechTheme.colors.text.secondary }}
              >
                {metric.unit}
              </span>
            </div>
          </div>
          <Badge 
            style={{ 
              backgroundColor: `${getCategoryColor(metric.category)}20`,
              color: getCategoryColor(metric.category)
            }}
          >
            {metric.category}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          {metric.trend === 'up' ? (
            <TrendingUp 
              size={16} 
              style={{ color: athleticTechTheme.colors.performance.excellent }}
            />
          ) : (
            <TrendingDown 
              size={16} 
              style={{ color: athleticTechTheme.colors.performance.poor }}
            />
          )}
          <span 
            className="text-sm font-medium"
            style={{ 
              color: metric.trend === 'up' 
                ? athleticTechTheme.colors.performance.excellent 
                : athleticTechTheme.colors.performance.poor 
            }}
          >
            {Math.abs(metric.change)}% {metric.trend === 'up' ? 'improvement' : 'decline'}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  const renderTrainingOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card style={{ 
          backgroundColor: athleticTechTheme.colors.surface.secondary,
          border: `1px solid ${athleticTechTheme.colors.interactive.border}`
        }}>
          <CardContent className="p-4 text-center">
            <Activity 
              size={32} 
              style={{ color: athleticTechTheme.colors.primary.track }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-2xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {trainingStats.completedSessions}/{trainingStats.totalSessions}
            </p>
            <p 
              className="text-sm"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Sessions Completed
            </p>
            <Progress 
              value={(trainingStats.completedSessions / trainingStats.totalSessions) * 100} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card style={{ 
          backgroundColor: athleticTechTheme.colors.surface.secondary,
          border: `1px solid ${athleticTechTheme.colors.interactive.border}`
        }}>
          <CardContent className="p-4 text-center">
            <Clock 
              size={32} 
              style={{ color: athleticTechTheme.colors.primary.field }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-2xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {trainingStats.totalHours}h
            </p>
            <p 
              className="text-sm"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Total Training Time
            </p>
            <p 
              className="text-xs mt-1"
              style={{ color: athleticTechTheme.colors.performance.excellent }}
            >
              +15% vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card style={{ 
        backgroundColor: athleticTechTheme.colors.surface.secondary,
        border: `1px solid ${athleticTechTheme.colors.interactive.border}`
      }}>
        <CardHeader>
          <CardTitle 
            className="text-lg"
            style={{ color: athleticTechTheme.colors.text.primary }}
          >
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyProgress.map((week, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
              >
                <div className="flex items-center space-x-3">
                  <Calendar 
                    size={16} 
                    style={{ color: athleticTechTheme.colors.primary.power }}
                  />
                  <span 
                    className="font-medium"
                    style={{ color: athleticTechTheme.colors.text.primary }}
                  >
                    {week.week}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p 
                      className="text-sm font-bold"
                      style={{ color: athleticTechTheme.colors.text.primary }}
                    >
                      {week.sessions}
                    </p>
                    <p 
                      className="text-xs"
                      style={{ color: athleticTechTheme.colors.text.secondary }}
                    >
                      sessions
                    </p>
                  </div>
                  <div className="text-center">
                    <p 
                      className="text-sm font-bold"
                      style={{ color: athleticTechTheme.colors.text.primary }}
                    >
                      {week.intensity}%
                    </p>
                    <p 
                      className="text-xs"
                      style={{ color: athleticTechTheme.colors.text.secondary }}
                    >
                      intensity
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCoachAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card style={{ 
          backgroundColor: athleticTechTheme.colors.surface.secondary,
          border: `1px solid ${athleticTechTheme.colors.interactive.border}`
        }}>
          <CardContent className="p-4 text-center">
            <Users 
              size={24} 
              style={{ color: athleticTechTheme.colors.primary.track }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {coachMetrics.totalAthletes}
            </p>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Athletes
            </p>
          </CardContent>
        </Card>

        <Card style={{ 
          backgroundColor: athleticTechTheme.colors.surface.secondary,
          border: `1px solid ${athleticTechTheme.colors.interactive.border}`
        }}>
          <CardContent className="p-4 text-center">
            <Target 
              size={24} 
              style={{ color: athleticTechTheme.colors.primary.field }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {coachMetrics.activePrograms}
            </p>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Programs
            </p>
          </CardContent>
        </Card>

        <Card style={{ 
          backgroundColor: athleticTechTheme.colors.surface.secondary,
          border: `1px solid ${athleticTechTheme.colors.interactive.border}`
        }}>
          <CardContent className="p-4 text-center">
            <Award 
              size={24} 
              style={{ color: athleticTechTheme.colors.performance.excellent }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {coachMetrics.completionRate}%
            </p>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Completion
            </p>
          </CardContent>
        </Card>

        <Card style={{ 
          backgroundColor: athleticTechTheme.colors.surface.secondary,
          border: `1px solid ${athleticTechTheme.colors.interactive.border}`
        }}>
          <CardContent className="p-4 text-center">
            <TrendingUp 
              size={24} 
              style={{ color: athleticTechTheme.colors.primary.power }}
              className="mx-auto mb-2"
            />
            <p 
              className="text-xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              +{coachMetrics.averageImprovement}%
            </p>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Avg Improvement
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
      >
        <DialogHeader>
          <DialogTitle 
            className="text-2xl font-bold flex items-center space-x-3"
            style={{ color: athleticTechTheme.colors.text.primary }}
          >
            <BarChart3 size={28} style={{ color: athleticTechTheme.colors.primary.field }} />
            <span>{isCoach ? 'Coaching Analytics' : 'Performance Analytics'}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex space-x-2 mb-6">
          {['week', 'month', 'season'].map((timeframe) => (
            <Button
              key={timeframe}
              variant={activeTimeframe === timeframe ? 'default' : 'outline'}
              onClick={() => setActiveTimeframe(timeframe as any)}
              style={{
                backgroundColor: activeTimeframe === timeframe ? athleticTechTheme.colors.primary.field : 'transparent',
                color: activeTimeframe === timeframe ? athleticTechTheme.colors.text.inverse : athleticTechTheme.colors.text.primary,
                borderColor: athleticTechTheme.colors.interactive.border
              }}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </Button>
          ))}
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList 
            className="grid w-full grid-cols-3"
            style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
          >
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            {isCoach && <TabsTrigger value="coaching">Coaching</TabsTrigger>}
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: athleticTechTheme.colors.text.primary }}
              >
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {performanceMetrics.map(renderMetricCard)}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="training">
            {renderTrainingOverview()}
          </TabsContent>

          {isCoach && (
            <TabsContent value="coaching">
              {renderCoachAnalytics()}
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
