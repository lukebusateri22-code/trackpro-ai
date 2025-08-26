import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, BarChart3, TrendingUp, Target, Trophy, Calendar, 
  Clock, Zap, Activity, Award, Users, MapPin, Timer, Flame
} from 'lucide-react';
import athleticTechTheme, { getEventColor } from '@/lib/athleticTechTheme';

interface AnalyticsScreenProps {
  onClose: () => void;
}

const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock analytics data
  const performanceMetrics = {
    totalWorkouts: 24,
    totalDistance: 156.8,
    avgPerformance: 8.2,
    personalBests: 3,
    consistencyScore: 87,
    improvementRate: 12.5
  };

  const eventProgress = [
    { event: '100m Sprint', current: '10.85s', target: '10.50s', progress: 78, color: athleticTechTheme.colors.events.sprints },
    { event: 'Long Jump', current: '6.45m', target: '7.00m', progress: 65, color: athleticTechTheme.colors.events.jumps },
    { event: 'Shot Put', current: '12.3m', target: '14.0m', progress: 58, color: athleticTechTheme.colors.events.throws },
    { event: '1500m', current: '4:12.8', target: '3:55.0', progress: 72, color: athleticTechTheme.colors.events.distance }
  ];

  const monthlyTrends = [
    { month: 'Jan', sprints: 85, jumps: 78, throws: 65, distance: 82 },
    { month: 'Feb', sprints: 88, jumps: 82, throws: 68, distance: 85 },
    { month: 'Mar', sprints: 92, jumps: 85, throws: 72, distance: 88 },
    { month: 'Apr', sprints: 89, jumps: 88, throws: 75, distance: 90 },
    { month: 'May', sprints: 94, jumps: 90, throws: 78, distance: 92 },
    { month: 'Jun', sprints: 96, jumps: 92, throws: 82, distance: 94 }
  ];

  const achievements = [
    { title: 'Speed Demon', description: 'Sub-11 second 100m', date: '2 days ago', icon: Zap, color: athleticTechTheme.colors.events.sprints },
    { title: 'Consistency King', description: '7-day training streak', date: '1 week ago', icon: Target, color: athleticTechTheme.colors.performance.excellent },
    { title: 'Distance Warrior', description: 'New 1500m PR', date: '2 weeks ago', icon: Trophy, color: athleticTechTheme.colors.events.distance },
    { title: 'Power House', description: 'Shot put improvement', date: '3 weeks ago', icon: Flame, color: athleticTechTheme.colors.events.throws }
  ];

  const trainingLoad = [
    { week: 'Week 1', load: 65, recovery: 85, performance: 78 },
    { week: 'Week 2', load: 72, recovery: 82, performance: 82 },
    { week: 'Week 3', load: 85, recovery: 75, performance: 88 },
    { week: 'Week 4', load: 68, recovery: 88, performance: 85 },
    { week: 'Week 5', load: 78, recovery: 80, performance: 90 },
    { week: 'Week 6', load: 82, recovery: 78, performance: 92 }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
      {/* Header */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: athleticTechTheme.gradients.hero,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
              <p className="text-white/80">Deep insights into your athletic progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
            <CardContent className="p-4 text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.events.sprints}20` }}
              >
                <Activity className="h-6 w-6" style={{ color: athleticTechTheme.colors.events.sprints }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                {performanceMetrics.totalWorkouts}
              </p>
              <p className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Total Workouts
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
            <CardContent className="p-4 text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.events.distance}20` }}
              >
                <MapPin className="h-6 w-6" style={{ color: athleticTechTheme.colors.events.distance }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                {performanceMetrics.totalDistance}km
              </p>
              <p className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Total Distance
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
            <CardContent className="p-4 text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.performance.excellent}20` }}
              >
                <BarChart3 className="h-6 w-6" style={{ color: athleticTechTheme.colors.performance.excellent }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                {performanceMetrics.avgPerformance}
              </p>
              <p className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Avg Performance
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
            <CardContent className="p-4 text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.events.jumps}20` }}
              >
                <Trophy className="h-6 w-6" style={{ color: athleticTechTheme.colors.events.jumps }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                {performanceMetrics.personalBests}
              </p>
              <p className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Personal Bests
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
            <CardContent className="p-4 text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.primary.track}20` }}
              >
                <Target className="h-6 w-6" style={{ color: athleticTechTheme.colors.primary.track }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                {performanceMetrics.consistencyScore}%
              </p>
              <p className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Consistency
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
            <CardContent className="p-4 text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.events.throws}20` }}
              >
                <TrendingUp className="h-6 w-6" style={{ color: athleticTechTheme.colors.events.throws }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                +{performanceMetrics.improvementRate}%
              </p>
              <p className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Improvement
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="progress">Event Progress</TabsTrigger>
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
            <TabsTrigger value="training">Training Load</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Event Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
              <CardHeader>
                <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
                  Goal Progress by Event
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {eventProgress.map((event, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: event.color }}
                        />
                        <h4 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {event.event}
                        </h4>
                      </div>
                      <Badge style={{ backgroundColor: event.color, color: 'white' }}>
                        {event.progress}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Current: <strong>{event.current}</strong>
                      </span>
                      <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Target: <strong>{event.target}</strong>
                      </span>
                    </div>
                    <Progress value={event.progress} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
              <CardHeader>
                <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
                  6-Month Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {['sprints', 'jumps', 'throws', 'distance'].map((category, categoryIndex) => (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getEventColor(category) }}
                        />
                        <h4 className="font-semibold capitalize" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {category}
                        </h4>
                      </div>
                      <div className="flex items-end justify-between space-x-2 h-20">
                        {monthlyTrends.map((month, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                              className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                              style={{ 
                                height: `${month[category as keyof typeof month]}%`,
                                backgroundColor: getEventColor(category),
                                minHeight: '8px'
                              }}
                            />
                            <div className="mt-1 text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              {month.month}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Load Tab */}
          <TabsContent value="training" className="space-y-6">
            <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
              <CardHeader>
                <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
                  Training Load vs Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingLoad.map((week, index) => (
                    <div key={index} className="p-4 rounded-xl" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                      <h4 className="font-semibold mb-3" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {week.week}
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              Training Load
                            </span>
                            <span className="text-sm font-bold" style={{ color: athleticTechTheme.colors.events.throws }}>
                              {week.load}%
                            </span>
                          </div>
                          <Progress value={week.load} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              Recovery
                            </span>
                            <span className="text-sm font-bold" style={{ color: athleticTechTheme.colors.performance.recovery }}>
                              {week.recovery}%
                            </span>
                          </div>
                          <Progress value={week.recovery} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              Performance
                            </span>
                            <span className="text-sm font-bold" style={{ color: athleticTechTheme.colors.performance.excellent }}>
                              {week.performance}%
                            </span>
                          </div>
                          <Progress value={week.performance} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
              <CardHeader>
                <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105" style={{ backgroundColor: `${achievement.color}10` }}>
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: achievement.color }}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {achievement.title}
                          </h4>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {achievement.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" style={{ borderColor: achievement.color, color: achievement.color }}>
                            {achievement.date}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
