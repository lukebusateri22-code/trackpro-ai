import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Target, Trophy, Calendar, Award, Menu, Settings } from 'lucide-react';
import { useGoals } from '@/contexts/GoalsContext';
import athleticTechTheme from '@/lib/athleticTechTheme';

export default function GoalsScreen() {
  const { goals, achievements, getProgressPercentage, getActiveGoals } = useGoals();
  
  const activeGoals = getActiveGoals();
  const completedGoals = goals.filter(g => g.status === 'Completed');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
      {/* Dark Tech Header */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: athleticTechTheme.gradients.hero,
          color: 'white'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Menu className="h-6 w-6" style={{ color: 'rgba(255,255,255,0.7)' }} />
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Goals
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Settings className="h-6 w-6" style={{ color: 'rgba(255,255,255,0.7)' }} />
            </div>
          </div>

          {/* Main Header Content */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Goals & Achievements
              </h1>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Track your progress and achieve greatness
              </p>
            </div>
            <Button 
              className="px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: athleticTechTheme.colors.primary.track,
                color: 'white'
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card 
            className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: trackTechTheme.colors.light.surface }}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${athleticTechTheme.colors.primary.track}20` }}
                >
                  <Target className="h-6 w-6" style={{ color: athleticTechTheme.colors.primary.track }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {activeGoals.length}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Active Goals
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: trackTechTheme.colors.light.surface }}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${trackTechTheme.colors.performance.excellent}20` }}
                >
                  <Trophy className="h-6 w-6" style={{ color: trackTechTheme.colors.performance.excellent }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {completedGoals.length}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Completed
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: trackTechTheme.colors.light.surface }}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${trackTechTheme.colors.accents.purple}20` }}
                >
                  <Award className="h-6 w-6" style={{ color: trackTechTheme.colors.accents.purple }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {achievements.length}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Achievements
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: trackTechTheme.colors.light.surface }}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${trackTechTheme.colors.accents.orange}20` }}
                >
                  <Calendar className="h-6 w-6" style={{ color: trackTechTheme.colors.accents.orange }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0}%
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Success Rate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Goals */}
        <Card className="bg-white border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle>Active Goals</CardTitle>
          </CardHeader>
          <CardContent>
            {activeGoals.length === 0 ? (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No active goals</h3>
                <p className="text-gray-600 mb-6">Create your first goal to start tracking progress</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Goal
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeGoals.map((goal) => {
                  const progress = getProgressPercentage(goal);
                  const daysLeft = Math.ceil(
                    (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );
                  
                  return (
                    <div key={goal.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                          
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(goal.status)}>
                              {goal.status}
                            </Badge>
                            <Badge className={`bg-${goal.priority === 'High' ? 'red' : goal.priority === 'Medium' ? 'yellow' : 'green'}-100 text-${goal.priority === 'High' ? 'red' : goal.priority === 'Medium' ? 'yellow' : 'green'}-800`}>
                              {goal.priority}
                            </Badge>
                            {goal.event && (
                              <Badge variant="outline">{goal.event}</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right ml-6">
                          <div className="text-3xl font-bold text-blue-600 mb-1">{progress.toFixed(0)}%</div>
                          <div className="text-sm text-gray-500">
                            {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Progress value={progress} className="h-3" />
                        
                        {goal.currentValue && goal.targetValue && (
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Current: {goal.currentValue} {goal.unit}</span>
                            <span>Target: {goal.targetValue} {goal.unit}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        {achievements.length > 0 && (
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-600" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.slice(0, 6).map((achievement) => (
                  <div key={achievement.id} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h4 className="font-medium text-gray-900 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <p className="text-xs text-purple-600">
                        {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
