import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, TrendingDown, Target, Trophy, Calendar, 
  BarChart3, Activity, Zap, Award, Clock, MapPin
} from 'lucide-react';
import PerformanceChart from '@/components/analytics/PerformanceChart';
import athleticTechTheme from '@/lib/athleticTechTheme';

const AnalyticsScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedEvent, setSelectedEvent] = useState('all');

  // Mock performance data - in real app, this would come from API
  const performanceData = {
    '100m': [
      { date: '2024-01-15', value: 11.45, event: '100m', competition: 'Indoor Meet' },
      { date: '2024-02-20', value: 11.38, event: '100m', competition: 'Regional Championship' },
      { date: '2024-03-15', value: 11.23, event: '100m', competition: 'State Championship' },
      { date: '2024-04-10', value: 11.31, event: '100m', competition: 'Spring Classic' },
      { date: '2024-05-05', value: 11.19, event: '100m', competition: 'Conference Meet' }
    ],
    'Long Jump': [
      { date: '2024-01-20', value: 6.85, event: 'Long Jump', competition: 'Indoor Meet' },
      { date: '2024-02-25', value: 7.02, event: 'Long Jump', competition: 'Regional Championship' },
      { date: '2024-03-20', value: 7.12, event: 'Long Jump', competition: 'State Championship' },
      { date: '2024-04-15', value: 6.98, event: 'Long Jump', competition: 'Spring Classic' },
      { date: '2024-05-10', value: 7.25, event: 'Long Jump', competition: 'Conference Meet' }
    ]
  };

  const trainingData = [
    { date: '2024-01-01', sessions: 4, volume: 12.5, intensity: 7.2 },
    { date: '2024-01-08', sessions: 5, volume: 15.2, intensity: 7.8 },
    { date: '2024-01-15', sessions: 4, volume: 11.8, intensity: 6.9 },
    { date: '2024-01-22', sessions: 6, volume: 18.3, intensity: 8.1 },
    { date: '2024-01-29', sessions: 5, volume: 16.7, intensity: 7.5 }
  ];

  const recoveryData = [
    { date: '2024-01-01', score: 7.2, sleep: 8.1, stress: 3.2 },
    { date: '2024-01-02', score: 7.8, sleep: 8.5, stress: 2.8 },
    { date: '2024-01-03', score: 6.9, sleep: 7.2, stress: 4.1 },
    { date: '2024-01-04', score: 8.1, sleep: 8.8, stress: 2.1 },
    { date: '2024-01-05', score: 7.5, sleep: 8.0, stress: 3.0 }
  ];

  const stats = {
    totalWorkouts: 47,
    avgWeeklyVolume: 15.2,
    personalBests: 8,
    competitionsEntered: 12,
    improvementRate: 8.5,
    consistencyScore: 92
  };

  const achievements = [
    { title: 'Sub-11.20 100m', date: '2024-05-05', type: 'performance', icon: '⚡' },
    { title: '30-Day Streak', date: '2024-04-30', type: 'consistency', icon: '🔥' },
    { title: '7m+ Long Jump', date: '2024-05-10', type: 'performance', icon: '🏆' },
    { title: 'Perfect Week', date: '2024-04-15', type: 'training', icon: '💪' }
  ];

  const getStatColor = (value: number, type: 'performance' | 'consistency' | 'improvement') => {
    if (type === 'performance' || type === 'improvement') {
      return value >= 8 ? athleticTechTheme.colors.performance.excellent :
             value >= 6 ? athleticTechTheme.colors.performance.good :
             athleticTechTheme.colors.performance.average;
    }
    return value >= 90 ? athleticTechTheme.colors.performance.excellent :
           value >= 75 ? athleticTechTheme.colors.performance.good :
           athleticTechTheme.colors.performance.average;
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4" style={{ color: athleticTechTheme.colors.performance.excellent }} />;
    if (current < previous) return <TrendingDown className="h-4 w-4" style={{ color: athleticTechTheme.colors.performance.poor }} />;
    return <Activity className="h-4 w-4" style={{ color: athleticTechTheme.colors.text.secondary }} />;
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div 
        className="relative overflow-hidden rounded-2xl p-8"
        style={{ background: athleticTechTheme.gradients.hero }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Performance Analytics</h1>
            <p className="text-white/80">Track your progress and identify improvement opportunities</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="100m">100m</SelectItem>
                <SelectItem value="Long Jump">Long Jump</SelectItem>
                <SelectItem value="200m">200m</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Total Workouts
                </p>
                <p className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {stats.totalWorkouts}
                </p>
              </div>
              <Activity className="h-8 w-8" style={{ color: athleticTechTheme.colors.primary.track }} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Weekly Volume
                </p>
                <p className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {stats.avgWeeklyVolume}h
                </p>
              </div>
              <Clock className="h-8 w-8" style={{ color: athleticTechTheme.colors.events.sprints }} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Personal Bests
                </p>
                <p className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {stats.personalBests}
                </p>
              </div>
              <Trophy className="h-8 w-8" style={{ color: athleticTechTheme.colors.primary.power }} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Competitions
                </p>
                <p className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {stats.competitionsEntered}
                </p>
              </div>
              <Target className="h-8 w-8" style={{ color: athleticTechTheme.colors.events.jumps }} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Improvement
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold" style={{ color: getStatColor(stats.improvementRate, 'improvement') }}>
                    {stats.improvementRate}%
                  </p>
                  {getTrendIcon(stats.improvementRate, 7.2)}
                </div>
              </div>
              <Zap className="h-8 w-8" style={{ color: athleticTechTheme.colors.performance.excellent }} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Consistency
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold" style={{ color: getStatColor(stats.consistencyScore, 'consistency') }}>
                    {stats.consistencyScore}%
                  </p>
                  {getTrendIcon(stats.consistencyScore, 88)}
                </div>
              </div>
              <BarChart3 className="h-8 w-8" style={{ color: athleticTechTheme.colors.primary.track }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="training">Training Load</TabsTrigger>
          <TabsTrigger value="recovery">Recovery</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Performance Charts */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <PerformanceChart
              data={performanceData['100m']}
              title="100m Sprint Progress"
              event="100m"
              unit="s"
              type="line"
            />
            <PerformanceChart
              data={performanceData['Long Jump']}
              title="Long Jump Progress"
              event="Long Jump"
              unit="m"
              type="area"
            />
          </div>
          
          {/* Performance Insights */}
          <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
            <CardHeader>
              <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${athleticTechTheme.colors.performance.excellent}10` }}
                >
                  <h4 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.performance.excellent }}>
                    🎯 Strength Areas
                  </h4>
                  <ul className="space-y-1 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    <li>• Consistent improvement in 100m times</li>
                    <li>• Strong competition performance</li>
                    <li>• Excellent long jump technique development</li>
                  </ul>
                </div>
                
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${athleticTechTheme.colors.events.jumps}10` }}
                >
                  <h4 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.events.jumps }}>
                    📈 Focus Areas
                  </h4>
                  <ul className="space-y-1 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    <li>• Speed endurance for 200m events</li>
                    <li>• Consistency in technical events</li>
                    <li>• Competition strategy refinement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Load */}
        <TabsContent value="training" className="space-y-6">
          <PerformanceChart
            data={trainingData.map(d => ({ ...d, value: d.volume, event: 'Training Volume' }))}
            title="Weekly Training Volume"
            event="Training Volume"
            unit="h"
            type="area"
          />
        </TabsContent>

        {/* Recovery */}
        <TabsContent value="recovery" className="space-y-6">
          <PerformanceChart
            data={recoveryData.map(d => ({ ...d, value: d.score, event: 'Recovery Score' }))}
            title="Recovery Score Trend"
            event="Recovery Score"
            unit=""
            type="line"
          />
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <Card 
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${athleticTechTheme.colors.primary.power}20` }}
                    >
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {achievement.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          style={{ 
                            backgroundColor: `${athleticTechTheme.colors.primary.track}20`,
                            color: athleticTechTheme.colors.primary.track
                          }}
                        >
                          {achievement.type}
                        </Badge>
                        <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {new Date(achievement.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsScreen;
