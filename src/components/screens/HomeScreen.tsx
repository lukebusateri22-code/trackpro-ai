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
import AnalyticsScreen from './AnalyticsScreen';

const HomeScreen: React.FC = () => {
  const { user } = useUser();
  const { workouts, getTrainingStats } = useTraining();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
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
      title: 'Training Plans', 
      subtitle: 'Custom workouts', 
      icon: Target, 
      gradient: athleticTechTheme.gradients.speed,
      action: () => {}
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
      action: () => setShowAnalytics(true)
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
          </div>
          <div className="absolute bottom-20 left-1/4 animate-bounce" style={{ animationDelay: '1s' }}>
            <Flame className="h-14 w-14 text-white" />
          </div>
          <div className="absolute bottom-10 right-1/3 animate-pulse" style={{ animationDelay: '2s' }}>
            <Mountain className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Menu className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium opacity-80">TrackPro AI</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Settings className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full" 
                   style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}>
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">{greeting()}</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
              <span className="block">UNLEASH YOUR</span>
              <span className="block bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                POTENTIAL
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-medium opacity-90 mb-8 max-w-2xl mx-auto">
              Welcome back, <span className="font-bold">{user?.username || 'Champion'}</span>! 
              Ready to dominate the track today?
            </p>
            
            {/* Quick Stats Bar */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-black">{completedWorkouts}</div>
                <div className="text-sm opacity-80">Workouts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black">94%</div>
                <div className="text-sm opacity-80">Performance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black">12</div>
                <div className="text-sm opacity-80">PRs This Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card 
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <div 
                    className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: action.gradient }}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                    {action.title}
                  </h3>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    {action.subtitle}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Performance Tracker */}
        <Card className="border-0 shadow-lg mb-8" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
              <Trophy className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
              Recent Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { event: '100m Sprint', time: '10.85s', improvement: '+0.12s', trend: 'up', color: athleticTechTheme.colors.events.sprints },
                { event: 'Long Jump', distance: '6.45m', improvement: '+0.08m', trend: 'up', color: athleticTechTheme.colors.events.jumps },
                { event: 'Shot Put', distance: '12.3m', improvement: '-0.05m', trend: 'down', color: athleticTechTheme.colors.events.throws },
                { event: '1500m', time: '4:12.8', improvement: '-2.1s', trend: 'up', color: athleticTechTheme.colors.events.distance }
              ].map((performance, index) => (
                <div key={index} className="p-4 rounded-xl transition-all duration-300 hover:scale-105" style={{ backgroundColor: `${performance.color}10` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: performance.color }}
                    />
                    <Badge 
                      className={`text-xs ${
                        performance.trend === 'up' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {performance.improvement}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                    {performance.event}
                  </h4>
                  <p className="text-lg font-bold" style={{ color: performance.color }}>
                    {performance.time || performance.distance}
                  </p>
                  <p className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Personal Best
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Today's Focus */}
          <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                <Target className="h-5 w-5" style={{ color: athleticTechTheme.colors.events.sprints }} />
                Today's Focus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: `${athleticTechTheme.colors.events.sprints}10` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                    Sprint Training
                  </span>
                  <Badge style={{ backgroundColor: athleticTechTheme.colors.events.sprints, color: 'white' }}>
                    High Priority
                  </Badge>
                </div>
                <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Focus on acceleration and top speed development
                </p>
                <Progress value={75} className="mt-3" />
              </div>
              
              <div className="p-4 rounded-xl" style={{ backgroundColor: `${athleticTechTheme.colors.events.jumps}10` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                    Technique Review
                  </span>
                  <Badge style={{ backgroundColor: athleticTechTheme.colors.events.jumps, color: 'white' }}>
                    Medium
                  </Badge>
                </div>
                <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Video analysis of yesterday's session
                </p>
                <Progress value={30} className="mt-3" />
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                <Award className="h-5 w-5" style={{ color: athleticTechTheme.colors.performance.excellent }} />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}
                >
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: athleticTechTheme.colors.text.primary }}>
                    New 100m PR!
                  </p>
                  <p className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    10.85s - Personal best
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: athleticTechTheme.colors.events.jumps }}
                >
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: athleticTechTheme.colors.text.primary }}>
                    Consistency Streak
                  </p>
                  <p className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    7 days of training
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: athleticTechTheme.colors.events.throws }}
                >
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: athleticTechTheme.colors.text.primary }}>
                    Goal Achieved
                  </p>
                  <p className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Sub-11 second 100m
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {showVideoModal && (
        <VideoAnalysisModal 
          isOpen={showVideoModal}
          onClose={() => setShowVideoModal(false)}
        />
      )}
      
      {showAIChat && (
        <AICoachChat 
          isOpen={showAIChat}
          onClose={() => setShowAIChat(false)}
        />
      )}
      
      {showAnalytics && (
        <AnalyticsScreen 
          onClose={() => setShowAnalytics(false)}
        />
      )}
    </div>
  );
};

export default HomeScreen;
