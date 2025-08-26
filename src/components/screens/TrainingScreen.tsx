import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { VideoAnalysisModal } from '../VideoAnalysisModal';
import { 
  Play, Plus, Calendar, Clock, Target, Zap, Menu, Settings,
  Activity, TrendingUp, Timer, Dumbbell, BarChart3
} from 'lucide-react';
import { useTraining } from '@/contexts/TrainingContext';
import { trackTechTheme, getPerformanceColor } from '@/lib/trackTechTheme';

export const TrainingScreen = () => {
  const [showVideoAnalysis, setShowVideoAnalysis] = useState(false);
  const { workouts, getTrainingStats, exercises } = useTraining();
  
  const trainingStats = getTrainingStats();
  const recentWorkouts = workouts.slice(0, 5);
  const today = new Date();
  
  const getRpeColor = (rpe: number) => {
    if (rpe >= 8) return trackTechTheme.colors.performance.poor;
    if (rpe >= 6) return trackTechTheme.colors.performance.average;
    return trackTechTheme.colors.performance.good;
  };
  
  const getStatusColor = (completed: boolean) => {
    return completed ? trackTechTheme.colors.status.completed : trackTechTheme.colors.status.paused;
  };
  
  const getStatusText = (completed: boolean) => {
    return completed ? 'Completed' : 'Planned';
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
                Training
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
                Training Hub
              </h1>
              <p className="text-lg" style={{ color: trackTechTheme.colors.dark.textSecondary }}>
                Track workouts and analyze technique
              </p>
            </div>
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
              <Dumbbell className="h-8 w-8" style={{ color: trackTechTheme.colors.performance.excellent }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button 
            className="h-24 rounded-xl font-medium transition-all duration-200 hover:scale-105"
            style={{ 
              backgroundColor: trackTechTheme.colors.accents.blue,
              color: trackTechTheme.colors.light.surface
            }}
            onClick={() => setShowVideoAnalysis(true)}
          >
            <div className="text-center">
              <Play className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Video Analysis</span>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 rounded-xl border-2 border-dashed transition-all duration-200 hover:scale-105"
            style={{ 
              borderColor: trackTechTheme.colors.accents.green,
              color: trackTechTheme.colors.accents.green
            }}
          >
            <div className="text-center">
              <Plus className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">New Workout</span>
            </div>
          </Button>
        </div>

        {/* Training Statistics */}
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
                  <Calendar className="h-6 w-6" style={{ color: trackTechTheme.colors.accents.blue }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {trainingStats.totalWorkouts}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Total Workouts
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
                  <Clock className="h-6 w-6" style={{ color: trackTechTheme.colors.performance.excellent }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {trainingStats.totalHours.toFixed(1)}h
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Total Hours
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
                  <Target className="h-6 w-6" style={{ color: trackTechTheme.colors.accents.purple }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {trainingStats.averageRPE.toFixed(1)}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Avg RPE
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
                  <TrendingUp className="h-6 w-6" style={{ color: trackTechTheme.colors.accents.orange }} />
                </div>
                <p className="text-2xl font-bold mb-1" style={{ color: trackTechTheme.colors.light.text }}>
                  {Object.keys(trainingStats.workoutsByType).length}
                </p>
                <p className="text-xs font-medium" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Exercise Types
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Workouts */}
        <Card 
          className="border-0 shadow-lg"
          style={{ backgroundColor: trackTechTheme.colors.light.surface }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: trackTechTheme.colors.light.text }}>
              <Activity className="h-5 w-5" style={{ color: trackTechTheme.colors.accents.blue }} />
              Recent Workouts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentWorkouts.length === 0 ? (
              <div className="text-center py-12">
                <Dumbbell className="h-16 w-16 mx-auto mb-4" style={{ color: trackTechTheme.colors.light.textTertiary }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: trackTechTheme.colors.light.text }}>
                  No workouts yet
                </h3>
                <p className="mb-6" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                  Start your first training session
                </p>
                <Button 
                  style={{ 
                    backgroundColor: trackTechTheme.colors.accents.blue,
                    color: trackTechTheme.colors.light.surface
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Workout
                </Button>
              </div>
            ) : (
              recentWorkouts.map((workout) => (
                <div 
                  key={workout.id} 
                  className="border rounded-xl p-6 hover:shadow-md transition-all duration-200"
                  style={{ borderColor: trackTechTheme.colors.light.border }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2" style={{ color: trackTechTheme.colors.light.text }}>
                        {workout.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm" style={{ color: trackTechTheme.colors.light.textSecondary }}>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(workout.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Timer className="h-4 w-4" />
                          {workout.duration || 'N/A'} min
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {workout.overallRPE && (
                        <Badge 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: `${getRpeColor(workout.overallRPE)}20`,
                            color: getRpeColor(workout.overallRPE)
                          }}
                        >
                          RPE {workout.overallRPE}
                        </Badge>
                      )}
                      <Badge 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${getStatusColor(workout.completed)}20`,
                          color: getStatusColor(workout.completed)
                        }}
                      >
                        {getStatusText(workout.completed)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {workout.exercises.slice(0, 3).map((workoutExercise, index) => {
                      const exercise = exercises.find(e => e.id === workoutExercise.exerciseId);
                      return (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs px-2 py-1"
                          style={{ 
                            borderColor: trackTechTheme.colors.light.border,
                            color: trackTechTheme.colors.light.textSecondary
                          }}
                        >
                          {exercise?.name || 'Unknown Exercise'}
                        </Badge>
                      );
                    })}
                    {workout.exercises.length > 3 && (
                      <Badge 
                        variant="outline" 
                        className="text-xs px-2 py-1"
                        style={{ 
                          borderColor: trackTechTheme.colors.light.border,
                          color: trackTechTheme.colors.light.textSecondary
                        }}
                      >
                        +{workout.exercises.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Video Analysis Modal */}
      <VideoAnalysisModal 
        isOpen={showVideoAnalysis}
        onClose={() => setShowVideoAnalysis(false)}
      />
    </div>
  );
};

export default TrainingScreen;