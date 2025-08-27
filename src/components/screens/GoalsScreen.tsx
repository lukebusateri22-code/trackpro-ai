import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, Target, Trophy, Calendar, Award, TrendingUp, 
  CheckCircle, Clock, Zap, Star, Medal, Flag
} from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

const GoalsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  // Mock data - in real app, this would come from context/API
  const activeGoals = [
    {
      id: '1',
      title: 'Break 11.00s in 100m',
      description: 'Achieve a new personal best in the 100m sprint',
      currentValue: 11.23,
      targetValue: 10.99,
      unit: 's',
      progress: 85,
      priority: 'High',
      event: '100m Sprint',
      targetDate: '2024-06-15',
      status: 'Active'
    },
    {
      id: '2',
      title: 'Long Jump 7.50m',
      description: 'Reach 7.50m in long jump competition',
      currentValue: 7.12,
      targetValue: 7.50,
      unit: 'm',
      progress: 65,
      priority: 'High',
      event: 'Long Jump',
      targetDate: '2024-07-20',
      status: 'Active'
    },
    {
      id: '3',
      title: 'Complete 12-Week Training Plan',
      description: 'Finish comprehensive sprint training program',
      currentValue: 8,
      targetValue: 12,
      unit: 'weeks',
      progress: 67,
      priority: 'Medium',
      event: 'Training',
      targetDate: '2024-05-30',
      status: 'Active'
    }
  ];

  const completedGoals = [
    {
      id: '4',
      title: 'Sub-12 Second 100m',
      description: 'Break the 12-second barrier in 100m',
      achievedValue: 11.89,
      targetValue: 11.99,
      unit: 's',
      completedDate: '2024-03-15',
      event: '100m Sprint'
    },
    {
      id: '5',
      title: 'Consistent Training',
      description: 'Train 5 days per week for 8 weeks',
      achievedValue: 8,
      targetValue: 8,
      unit: 'weeks',
      completedDate: '2024-02-28',
      event: 'Training'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'Speed Demon',
      description: 'Broke personal best in 100m',
      icon: '⚡',
      unlockedDate: '2024-03-15',
      rarity: 'Gold'
    },
    {
      id: '2',
      title: 'Consistency King',
      description: 'Trained for 30 consecutive days',
      icon: '👑',
      unlockedDate: '2024-02-28',
      rarity: 'Silver'
    },
    {
      id: '3',
      title: 'First Steps',
      description: 'Completed your first training session',
      icon: '🎯',
      unlockedDate: '2024-01-10',
      rarity: 'Bronze'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return athleticTechTheme.colors.primary.track;
      case 'Completed': return athleticTechTheme.colors.performance.excellent;
      case 'Paused': return athleticTechTheme.colors.events.jumps;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return athleticTechTheme.colors.performance.poor;
      case 'Medium': return athleticTechTheme.colors.events.jumps;
      case 'Low': return athleticTechTheme.colors.performance.excellent;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Gold': return '#FFD700';
      case 'Silver': return '#C0C0C0';
      case 'Bronze': return '#CD7F32';
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        className="relative overflow-hidden rounded-2xl p-8"
        style={{ background: athleticTechTheme.gradients.hero }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Goals & Achievements</h1>
            <p className="text-white/80">Track your progress and achieve greatness</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              className="px-6 py-3 rounded-xl font-medium"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card 
          className="border-0 shadow-lg"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.primary.track}20` }}
              >
                <Target className="h-6 w-6" style={{ color: athleticTechTheme.colors.primary.track }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                {activeGoals.length}
              </p>
              <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Active Goals
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-lg"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.performance.excellent}20` }}
              >
                <CheckCircle className="h-6 w-6" style={{ color: athleticTechTheme.colors.performance.excellent }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                {completedGoals.length}
              </p>
              <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Completed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-lg"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.primary.power}20` }}
              >
                <Trophy className="h-6 w-6" style={{ color: athleticTechTheme.colors.primary.power }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                {achievements.length}
              </p>
              <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Achievements
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-lg"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.events.sprints}20` }}
              >
                <TrendingUp className="h-6 w-6" style={{ color: athleticTechTheme.colors.events.sprints }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                78%
              </p>
              <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Avg Progress
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Active Goals */}
        <TabsContent value="active" className="space-y-4">
          {activeGoals.map((goal) => {
            const daysLeft = Math.ceil(
              (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );
            
            return (
              <Card 
                key={goal.id} 
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {goal.title}
                      </h3>
                      <p className="text-sm mb-3" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        {goal.description}
                      </p>
                      
                      <div className="flex items-center space-x-2">
                        <Badge 
                          style={{ 
                            backgroundColor: `${getStatusColor(goal.status)}20`,
                            color: getStatusColor(goal.status)
                          }}
                        >
                          {goal.status}
                        </Badge>
                        <Badge 
                          style={{ 
                            backgroundColor: `${getPriorityColor(goal.priority)}20`,
                            color: getPriorityColor(goal.priority)
                          }}
                        >
                          {goal.priority}
                        </Badge>
                        <Badge variant="outline">{goal.event}</Badge>
                      </div>
                    </div>
                    
                    <div className="text-right ml-6">
                      <div 
                        className="text-3xl font-bold mb-1"
                        style={{ color: athleticTechTheme.colors.primary.track }}
                      >
                        {goal.progress}%
                      </div>
                      <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Progress value={goal.progress} className="h-3" />
                    
                    <div className="flex justify-between text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      <span>Current: {goal.currentValue} {goal.unit}</span>
                      <span>Target: {goal.targetValue} {goal.unit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Completed Goals */}
        <TabsContent value="completed" className="space-y-4">
          {completedGoals.map((goal) => (
            <Card 
              key={goal.id} 
              className="border-0 shadow-lg"
              style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle 
                        className="h-5 w-5" 
                        style={{ color: athleticTechTheme.colors.performance.excellent }} 
                      />
                      <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {goal.title}
                      </h3>
                    </div>
                    <p className="text-sm mb-3" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      {goal.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        style={{ 
                          backgroundColor: `${athleticTechTheme.colors.performance.excellent}20`,
                          color: athleticTechTheme.colors.performance.excellent
                        }}
                      >
                        Completed
                      </Badge>
                      <Badge variant="outline">{goal.event}</Badge>
                    </div>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div 
                      className="text-2xl font-bold mb-1"
                      style={{ color: athleticTechTheme.colors.performance.excellent }}
                    >
                      {goal.achievedValue} {goal.unit}
                    </div>
                    <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      {new Date(goal.completedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                      style={{ backgroundColor: `${getRarityColor(achievement.rarity)}20` }}
                    >
                      {achievement.icon}
                    </div>
                    <h4 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {achievement.title}
                    </h4>
                    <p className="text-sm mb-3" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <Badge 
                        style={{ 
                          backgroundColor: `${getRarityColor(achievement.rarity)}20`,
                          color: getRarityColor(achievement.rarity)
                        }}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-xs mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      {new Date(achievement.unlockedDate).toLocaleDateString()}
                    </p>
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

export default GoalsScreen;
