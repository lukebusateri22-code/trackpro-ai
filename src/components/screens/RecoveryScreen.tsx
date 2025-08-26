import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Moon, Battery, Heart, Apple, Menu, Settings, Activity,
  Droplets, Brain, Utensils, Clock, TrendingUp, AlertCircle
} from 'lucide-react';
import { useRecovery } from '@/contexts/RecoveryContext';
import { trackTechTheme, getPerformanceColor } from '@/lib/trackTechTheme';

const RecoveryScreen: React.FC = () => {
  const { 
    getRecoveryScore, 
    getTodaysMetrics, 
    getRecoveryTrend, 
    getRecommendations,
    injuries 
  } = useRecovery();
  
  const recoveryScore = getRecoveryScore();
  const todaysMetrics = getTodaysMetrics();
  const recoveryTrend = getRecoveryTrend(7);
  const recommendations = getRecommendations();
  const today = new Date();
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return trackTechTheme.colors.performance.excellent;
    if (score >= 6) return trackTechTheme.colors.performance.good;
    if (score >= 4) return trackTechTheme.colors.performance.average;
    return trackTechTheme.colors.performance.poor;
  };
  
  const getScoreText = (score: number) => {
    if (score >= 8) return 'Excellent - Ready for intense training';
    if (score >= 6) return 'Good - Moderate training recommended';
    if (score >= 4) return 'Fair - Light training suggested';
    return 'Poor - Focus on recovery';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: trackTechTheme.colors.light.background }}>
      {/* Dark Tech Header */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: trackTechTheme.gradients.darkHeader,
          color: trackTechTheme.colors.dark.text
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Menu className="h-6 w-6" style={{ color: trackTechTheme.colors.dark.textSecondary }} />
              <div className="text-sm" style={{ color: trackTechTheme.colors.dark.textSecondary }}>
                Recovery
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Settings className="h-6 w-6" style={{ color: trackTechTheme.colors.dark.textSecondary }} />
            </div>
          </div>

          {/* Main Header Content */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Recovery Hub
              </h1>
              <p className="text-lg" style={{ color: trackTechTheme.colors.dark.textSecondary }}>
                Monitor your wellness and optimize recovery
              </p>
            </div>
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
              <Heart className="h-8 w-8" style={{ color: trackTechTheme.colors.performance.recovery }} />
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
                    {getScoreText(recoveryScore)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div 
                      className="w-20 h-20 rounded-full border-4 flex items-center justify-center"
                      style={{ 
                        borderColor: getScoreColor(recoveryScore),
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className="text-2xl font-bold">{recoveryScore.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Health Metrics */}
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
                  <Moon className="h-6 w-6" style={{ color: trackTechTheme.colors.accents.blue }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {todaysMetrics?.sleepQuality?.toFixed(1) || 'N/A'}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Sleep Quality
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
                  <Battery className="h-6 w-6" style={{ color: trackTechTheme.colors.performance.excellent }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {todaysMetrics?.energy?.toFixed(1) || 'N/A'}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Energy Level
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
                  <Brain className="h-6 w-6" style={{ color: trackTechTheme.colors.accents.orange }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {todaysMetrics?.stress?.toFixed(1) || 'N/A'}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Stress Level
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
                  <Droplets className="h-6 w-6" style={{ color: trackTechTheme.colors.accents.purple }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {todaysMetrics?.hydration?.toFixed(1) || 'N/A'}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Hydration
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <Card 
          className="border-0 shadow-lg mb-8"
          style={{ backgroundColor: trackTechTheme.colors.light.surface }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: trackTechTheme.colors.light.text }}>
              <Activity className="h-5 w-5" style={{ color: trackTechTheme.colors.accents.blue }} />
              Today's Wellness Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {todaysMetrics && Object.entries(todaysMetrics).map(([key, value]) => {
              if (typeof value === 'number') {
                const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: trackTechTheme.colors.light.text }}>
                        {label}
                      </span>
                      <span className="text-sm font-bold" style={{ color: getPerformanceColor(value) }}>
                        {value.toFixed(1)}/10
                      </span>
                    </div>
                    <Progress value={(value / 10) * 100} className="h-2" />
                  </div>
                );
              }
              return null;
            })}
          </CardContent>
        </Card>

        {/* Recovery Recommendations */}
        <Card 
          className="border-0 shadow-lg"
          style={{ backgroundColor: trackTechTheme.colors.light.surface }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: trackTechTheme.colors.light.text }}>
              <TrendingUp className="h-5 w-5" style={{ color: trackTechTheme.colors.performance.excellent }} />
              Recovery Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl border-l-4"
                style={{ 
                  backgroundColor: `${getPerformanceColor(8)}10`,
                  borderLeftColor: getPerformanceColor(8)
                }}
              >
                <p className="text-sm font-medium" style={{ color: trackTechTheme.colors.light.text }}>
                  {rec}
                </p>
              </div>
            ))}
            
            {injuries.length > 0 && (
              <div 
                className="p-4 rounded-xl border-l-4"
                style={{ 
                  backgroundColor: `${trackTechTheme.colors.status.warning}10`,
                  borderLeftColor: trackTechTheme.colors.status.warning
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4" style={{ color: trackTechTheme.colors.status.warning }} />
                  <span className="text-sm font-medium" style={{ color: trackTechTheme.colors.light.text }}>
                    Active Injuries
                  </span>
                </div>
                {injuries.map(injury => (
                  <p key={injury.id} className="text-sm" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                    {injury.type} - {injury.severity}
                  </p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecoveryScreen;