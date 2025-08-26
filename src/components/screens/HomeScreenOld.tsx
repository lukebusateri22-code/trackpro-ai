import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, Target, TrendingUp, Calendar, Clock, Zap, 
  Trophy, Activity, Heart, Menu, Settings, ChevronRight,
  Timer, MapPin, Users, Flame, Bolt, Wind, Mountain,
  Video, BarChart3, Plus, Award
} from 'lucide-react';
import { useTraining } from '@/contexts/TrainingContext';
import { useUser } from '@/contexts/UserContext';
import athleticTechTheme, { getEventColor, getEventGradient } from '@/lib/athleticTechTheme';
import AICoachChat from '../AICoachChat';
import { VideoAnalysisModal } from '../VideoAnalysisModal';
import PerformanceRecorder from '../PerformanceRecorder';
import { useRecovery } from '@/contexts/RecoveryContext';
import { useGoals } from '@/contexts/GoalsContext';
import { trackTechTheme, getPerformanceColor } from '@/lib/trackTechTheme';

export default function HomeScreen() {
  const { user } = useUser();
  const { workouts, getTrainingStats } = useTraining();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showPerformanceRecorder, setShowPerformanceRecorder] = useState(false);
  
  const trainingStats = getTrainingStats();
  const completedWorkouts = workouts.filter(w => w.completed).length;
  
  const today = new Date();
  const greeting = () => {
    const hour = today.getHours();
    if (hour < 12) return 'Ready to Dominate';
    if (hour < 17) return 'Keep Pushing';
    return 'Finish Strong';
  };
  
  // Mock data for exciting visuals
  const weeklyProgress = [
    { day: 'Mon', value: 85, event: 'sprints' },
    { day: 'Tue', value: 92, event: 'jumps' },
    { day: 'Wed', value: 78, event: 'throws' },
    { day: 'Thu', value: 95, event: 'distance' },
    { day: 'Fri', value: 88, event: 'sprints' },
    { day: 'Sat', value: 90, event: 'jumps' },
    { day: 'Sun', value: 82, event: 'recovery' },
  ];
  
  const quickActions = [
    { 
      title: 'Video Analysis', 
      subtitle: 'Analyze technique', 
      icon: Video, 
      gradient: athleticTechTheme.gradients.tech,
      action: () => setShowVideoModal(true)
    },
    { 
      title: 'Record Performance', 
      subtitle: 'Log new results', 
      icon: Target, 
      gradient: athleticTechTheme.gradients.speed,
      action: () => setShowPerformanceRecorder(true)
    },
    { 
      title: 'AI Coach', 
      subtitle: 'Get insights', 
      icon: Zap, 
      gradient: athleticTechTheme.gradients.power,
      action: () => setShowAIChat(true)
    },
    { 
      title: 'Analytics', 
      subtitle: 'View progress', 
      icon: BarChart3, 
      gradient: athleticTechTheme.gradients.endurance,
      action: () => {}
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
      {/* Athletic Hero Section */}
      <div 
        className="relative overflow-hidden min-h-[40vh] flex items-center"
        style={{ 
          background: athleticTechTheme.gradients.hero,
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 animate-bounce">
            <Bolt className="h-16 w-16 text-white" />
          </div>
          <div className="absolute top-20 right-20 animate-pulse">
            <Wind className="h-12 w-12 text-white" />
              <p className="text-lg" style={{ color: trackTechTheme.colors.dark.textSecondary }}>
                Welcome, {user?.username || 'Athlete'}
              </p>
            </div>
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
              <Zap className="h-8 w-8" style={{ color: trackTechTheme.colors.accents.blue }} />
            </div>
          </div>

          {/* Recovery Score Card in Header */}
          <div className="mt-6">
            <div 
              className="rounded-2xl p-6 border"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Recovery Score</h3>
                  <p className="text-sm" style={{ color: trackTechTheme.colors.dark.textSecondary }}>
                    Connect Your Wearable!
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div 
                      className="w-16 h-16 rounded-full border-4 flex items-center justify-center"
                      style={{ 
                        borderColor: getPerformanceColor(recoveryScore),
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className="text-lg font-bold">{recoveryScore.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Today's Workout Card */}
        <Card 
          className="mb-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ 
            backgroundColor: trackTechTheme.colors.light.surface,
            boxShadow: trackTechTheme.shadows.lg
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: trackTechTheme.colors.light.text }}>
                Today's Workout
              </h2>
              <Badge 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${trackTechTheme.colors.accents.blue}20`,
                  color: trackTechTheme.colors.accents.blue
                }}
              >
                Dynamic
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: trackTechTheme.colors.performance.excellent }}
                />
                <span className="text-sm font-medium" style={{ color: trackTechTheme.colors.light.text }}>
                  Fence Sprint Drills (Basic)
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: trackTechTheme.colors.accents.blue }}
                />
                <span className="text-sm font-medium" style={{ color: trackTechTheme.colors.light.text }}>
                  Single Leg Drop Accel
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: trackTechTheme.colors.accents.cyan }}
                />
                <span className="text-sm font-medium" style={{ color: trackTechTheme.colors.light.text }}>
                  2 Point Accel
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card 
            className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: trackTechTheme.colors.light.surface }}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${trackTechTheme.colors.accents.blue}20` }}
                >
                  <Target className="h-6 w-6" style={{ color: trackTechTheme.colors.accents.blue }} />
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
                  <Activity className="h-6 w-6" style={{ color: trackTechTheme.colors.performance.excellent }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {trainingStats.totalWorkouts}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  This Week
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
                  <Trophy className="h-6 w-6" style={{ color: trackTechTheme.colors.accents.purple }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {Object.keys(user?.personalRecords || {}).length}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Personal Bests
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
                  <Clock className="h-6 w-6" style={{ color: trackTechTheme.colors.accents.orange }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {trainingStats.totalHours.toFixed(1)}h
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Training Hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                onClick={() => setVideoAnalysisOpen(true)}
                className="h-24 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center space-y-2 rounded-xl"
              >
                <Video className="h-8 w-8" />
                <span className="text-sm font-medium">Video Analysis</span>
              </Button>
              
              <Button 
                variant="outline"
                className="h-24 border-2 border-green-200 text-green-700 hover:bg-green-50 flex flex-col items-center justify-center space-y-2 rounded-xl"
              >
                <Play className="h-8 w-8" />
                <span className="text-sm font-medium">Start Training</span>
              </Button>
              
              <Button 
                variant="outline"
                className="h-24 border-2 border-purple-200 text-purple-700 hover:bg-purple-50 flex flex-col items-center justify-center space-y-2 rounded-xl"
              >
                <BarChart3 className="h-8 w-8" />
                <span className="text-sm font-medium">View Analytics</span>
              </Button>
              
              <Button 
                variant="outline"
                className="h-24 border-2 border-amber-200 text-amber-700 hover:bg-amber-50 flex flex-col items-center justify-center space-y-2 rounded-xl"
              >
                <Plus className="h-8 w-8" />
                <span className="text-sm font-medium">New Goal</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Recorder - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <PerformanceRecorder />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Coach Chat */}
            <AICoachChat />
            
            {/* Active Goals */}
            {activeGoals.length > 0 && (
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-lg font-semibold text-gray-900">Active Goals</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {activeGoals.slice(0, 3).map(goal => {
                      const progress = goal.currentValue && goal.targetValue ? 
                        Math.min(100, (goal.currentValue / goal.targetValue) * 100) : 0;
                      
                      return (
                        <div key={goal.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{goal.title}</h4>
                            <span className="text-xs text-gray-500">{progress.toFixed(0)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <p className="text-xs text-gray-600">{goal.event}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Deadlines */}
            {upcomingDeadlines.length > 0 && (
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-amber-600" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {upcomingDeadlines.slice(0, 3).map(goal => {
                      const daysLeft = Math.ceil(
                        (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                      );
                      
                      return (
                        <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{goal.title}</p>
                            <p className="text-xs text-gray-600">{goal.event}</p>
                          </div>
                          <Badge 
                            className={`ml-2 ${
                              daysLeft <= 3 ? 'bg-red-100 text-red-800' : 
                              daysLeft <= 7 ? 'bg-amber-100 text-amber-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {daysLeft}d
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Video Analysis Modal */}
      <VideoAnalysisModal 
        isOpen={videoAnalysisOpen} 
        onClose={() => setVideoAnalysisOpen(false)} 
      />
    </div>
  );
}
