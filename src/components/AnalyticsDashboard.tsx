import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, Trophy, Calendar, Activity } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useTraining } from '@/contexts/TrainingContext';
import { useRecovery } from '@/contexts/RecoveryContext';
import { useGoals } from '@/contexts/GoalsContext';
import { trackTheme, getEventColor } from '@/lib/theme';

export default function AnalyticsDashboard() {
  const { user } = useUser();
  const { getTrainingStats, workouts } = useTraining();
  const { getRecoveryTrend } = useRecovery();
  const { goals, getProgressPercentage } = useGoals();
  
  const trainingStats = getTrainingStats();
  const recoveryTrend = getRecoveryTrend(7);
  const activeGoals = goals.filter(g => g.status === 'Active');
  
  // Calculate trends
  const recentWorkouts = workouts.slice(0, 4);
  const avgRecentRPE = recentWorkouts.reduce((sum, w) => sum + (w.overallRPE || 0), 0) / recentWorkouts.length;
  const recoveryTrendDirection = recoveryTrend[recoveryTrend.length - 1] > recoveryTrend[0];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Training Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Weekly Hours</span>
                <span className="font-bold">{(trainingStats.totalHours / 4).toFixed(1)}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg RPE</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{avgRecentRPE.toFixed(1)}/10</span>
                  {avgRecentRPE > 7 ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
              <Progress value={(avgRecentRPE / 10) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              Recovery Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">7-Day Trend</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{recoveryTrend[recoveryTrend.length - 1]?.toFixed(1) || '0'}/10</span>
                  {recoveryTrendDirection ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                {recoveryTrend.map((score, index) => (
                  <div
                    key={index}
                    className="flex-1 h-8 rounded"
                    style={{
                      backgroundColor: score >= 8 ? trackTheme.colors.status.completed :
                                     score >= 6 ? trackTheme.colors.performance.intermediate :
                                     score >= 4 ? trackTheme.colors.status.warning :
                                     trackTheme.colors.status.missed,
                      opacity: 0.7 + (score / 10) * 0.3
                    }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Goals</span>
                <span className="font-bold">{activeGoals.length}</span>
              </div>
              {activeGoals.slice(0, 2).map(goal => {
                const progress = getProgressPercentage(goal);
                return (
                  <div key={goal.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 truncate">{goal.title}</span>
                      <span className="text-xs font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-1" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Records Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Personal Records by Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(user?.personalRecords || {}).map(([event, record]) => (
              <div 
                key={event} 
                className="p-4 rounded-lg border-l-4"
                style={{ borderLeftColor: getEventColor(event) }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{event}</h4>
                  <Badge 
                    className="text-xs"
                    style={{ 
                      backgroundColor: `${getEventColor(event)}20`,
                      color: getEventColor(event)
                    }}
                  >
                    PR
                  </Badge>
                </div>
                <p className="text-2xl font-bold" style={{ color: getEventColor(event) }}>
                  {typeof record.value === 'number' ? 
                    (event.includes('m') && !event.includes('Hurdles') ? 
                      `${record.value.toFixed(2)}${event.includes('Jump') || event.includes('Put') || event.includes('Throw') ? 'm' : 's'}` :
                      `${record.value.toFixed(2)}s`
                    ) : record.value
                  }
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(record.date).toLocaleDateString()}
                  {record.location && ` • ${record.location}`}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Training Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(trainingStats.workoutsByType).map(([type, count]) => {
              const percentage = (count / trainingStats.totalWorkouts) * 100;
              return (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{type}</span>
                    <span className="text-sm text-gray-600">{count} sessions ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: getEventColor(type)
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
