import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, User, TrendingUp, Calendar, Dumbbell, Clock, Target, Award, Activity } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface AthleteData {
  id: string;
  name: string;
  events: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  personalRecords: { [event: string]: string };
  recentWorkouts: WorkoutCompletion[];
  liftingProgress: LiftingRecord[];
  weeklyStats: {
    workoutsCompleted: number;
    totalDuration: number;
    averageDifficulty: number;
    completionRate: number;
  };
}

interface WorkoutCompletion {
  id: string;
  workoutName: string;
  completedAt: string;
  duration: number;
  difficultyRating: number;
  energyBefore: number;
  energyAfter: number;
  notes?: string;
  injuries?: string;
}

interface LiftingRecord {
  exercise: string;
  date: string;
  sets: number;
  reps: number;
  weight: number;
  oneRepMax?: number;
}

interface AthleteProgressModalProps {
  onClose: () => void;
}

const AthleteProgressModal: React.FC<AthleteProgressModalProps> = ({ onClose }) => {
  const [selectedAthlete, setSelectedAthlete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock athlete data with comprehensive progress tracking
  const mockAthletes: AthleteData[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      events: ['100m', '200m'],
      level: 'advanced',
      personalRecords: { '100m': '11.24s', '200m': '22.89s' },
      recentWorkouts: [
        {
          id: 'w1',
          workoutName: 'Sprint Power Development',
          completedAt: '2025-08-27T18:30:00Z',
          duration: 85,
          difficultyRating: 8,
          energyBefore: 7,
          energyAfter: 4,
          notes: 'Felt strong on the first 4 intervals, struggled with the last 2'
        },
        {
          id: 'w2',
          workoutName: 'Lower Body Strength',
          completedAt: '2025-08-25T16:00:00Z',
          duration: 75,
          difficultyRating: 7,
          energyBefore: 8,
          energyAfter: 5,
          notes: 'New PR on squats!'
        }
      ],
      liftingProgress: [
        { exercise: 'Back Squat', date: '2025-08-25', sets: 4, reps: 6, weight: 185, oneRepMax: 215 },
        { exercise: 'Deadlift', date: '2025-08-23', sets: 3, reps: 5, weight: 225, oneRepMax: 255 },
        { exercise: 'Bench Press', date: '2025-08-21', sets: 4, reps: 8, weight: 135, oneRepMax: 165 },
        { exercise: 'Back Squat', date: '2025-08-18', sets: 4, reps: 6, weight: 180, oneRepMax: 210 },
        { exercise: 'Deadlift', date: '2025-08-16', sets: 3, reps: 5, weight: 220, oneRepMax: 250 }
      ],
      weeklyStats: {
        workoutsCompleted: 4,
        totalDuration: 320,
        averageDifficulty: 7.5,
        completionRate: 100
      }
    },
    {
      id: '2',
      name: 'Mike Chen',
      events: ['Long Jump', 'Triple Jump'],
      level: 'intermediate',
      personalRecords: { 'Long Jump': '7.45m', 'Triple Jump': '15.20m' },
      recentWorkouts: [
        {
          id: 'w3',
          workoutName: 'Jump Technique Focus',
          completedAt: '2025-08-26T15:00:00Z',
          duration: 90,
          difficultyRating: 6,
          energyBefore: 8,
          energyAfter: 6,
          notes: 'Working on approach consistency'
        }
      ],
      liftingProgress: [
        { exercise: 'Box Jumps', date: '2025-08-26', sets: 4, reps: 8, weight: 0 },
        { exercise: 'Bulgarian Split Squats', date: '2025-08-24', sets: 3, reps: 10, weight: 40 },
        { exercise: 'Single Leg RDL', date: '2025-08-22', sets: 3, reps: 8, weight: 35 }
      ],
      weeklyStats: {
        workoutsCompleted: 3,
        totalDuration: 240,
        averageDifficulty: 6.3,
        completionRate: 75
      }
    },
    {
      id: '3',
      name: 'Emma Davis',
      events: ['800m', '1500m'],
      level: 'advanced',
      personalRecords: { '800m': '2:08.45', '1500m': '4:32.10' },
      recentWorkouts: [
        {
          id: 'w4',
          workoutName: 'Lactate Threshold Run',
          completedAt: '2025-08-27T07:00:00Z',
          duration: 65,
          difficultyRating: 9,
          energyBefore: 7,
          energyAfter: 3,
          notes: 'Tough workout but hit all splits'
        }
      ],
      liftingProgress: [
        { exercise: 'Romanian Deadlift', date: '2025-08-25', sets: 3, reps: 8, weight: 155, oneRepMax: 190 },
        { exercise: 'Front Squat', date: '2025-08-23', sets: 4, reps: 6, weight: 125, oneRepMax: 145 },
        { exercise: 'Hip Thrusts', date: '2025-08-21', sets: 3, reps: 12, weight: 185 }
      ],
      weeklyStats: {
        workoutsCompleted: 5,
        totalDuration: 380,
        averageDifficulty: 8.2,
        completionRate: 100
      }
    }
  ];

  const filteredAthletes = mockAthletes.filter(athlete =>
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    athlete.events.some(event => event.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedAthleteData = mockAthletes.find(a => a.id === selectedAthlete);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return athleticTechTheme.colors.performance.excellent;
      case 'intermediate': return athleticTechTheme.colors.primary.track;
      case 'advanced': return athleticTechTheme.colors.primary.power;
      default: return athleticTechTheme.colors.primary.track;
    }
  };

  const getCompletionRateColor = (rate: number) => {
    if (rate >= 90) return athleticTechTheme.colors.performance.excellent;
    if (rate >= 70) return athleticTechTheme.colors.primary.track;
    return athleticTechTheme.colors.primary.power;
  };

  const calculateProgress = (records: LiftingRecord[], exercise: string) => {
    const exerciseRecords = records.filter(r => r.exercise === exercise).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (exerciseRecords.length < 2) return 0;
    
    const first = exerciseRecords[0];
    const last = exerciseRecords[exerciseRecords.length - 1];
    
    if (first.oneRepMax && last.oneRepMax) {
      return ((last.oneRepMax - first.oneRepMax) / first.oneRepMax) * 100;
    }
    
    const firstTotal = first.weight * first.reps;
    const lastTotal = last.weight * last.reps;
    return ((lastTotal - firstTotal) / firstTotal) * 100;
  };

  if (!selectedAthlete) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Activity size={24} style={{ color: athleticTechTheme.colors.primary.track }} />
                <span style={{ color: athleticTechTheme.colors.text.primary }}>Athlete Progress</span>
              </CardTitle>
              <Button variant="ghost" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <Input
                placeholder="Search athletes by name or event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAthletes.map((athlete) => (
                <Card 
                  key={athlete.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                  onClick={() => setSelectedAthlete(athlete.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <User size={24} style={{ color: athleticTechTheme.colors.primary.track }} />
                      <Badge style={{ backgroundColor: getLevelColor(athlete.level) }}>
                        {athlete.level}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {athlete.name}
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-1">
                        <Target size={14} style={{ color: athleticTechTheme.colors.text.secondary }} />
                        <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {athlete.events.join(', ')}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Completion Rate:
                        </span>
                        <Badge style={{ backgroundColor: getCompletionRateColor(athlete.weeklyStats.completionRate) }}>
                          {athlete.weeklyStats.completionRate}%
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                          This Week:
                        </span>
                        <span style={{ color: athleticTechTheme.colors.text.primary }}>
                          {athlete.weeklyStats.workoutsCompleted} workouts
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAthletes.length === 0 && (
              <div className="text-center py-8">
                <User size={48} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  No athletes found
                </h3>
                <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setSelectedAthlete(null)}>
                ← Back to Athletes
              </Button>
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <User size={24} style={{ color: athleticTechTheme.colors.primary.track }} />
                  <span style={{ color: athleticTechTheme.colors.text.primary }}>
                    {selectedAthleteData?.name}
                  </span>
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge style={{ backgroundColor: getLevelColor(selectedAthleteData?.level || 'intermediate') }}>
                    {selectedAthleteData?.level}
                  </Badge>
                  <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                    {selectedAthleteData?.events.join(', ')}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {selectedAthleteData && (
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="workouts">Recent Workouts</TabsTrigger>
                <TabsTrigger value="lifting">Lifting Progress</TabsTrigger>
                <TabsTrigger value="records">Personal Records</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4 text-center">
                      <Calendar size={24} className="mx-auto mb-2" style={{ color: athleticTechTheme.colors.primary.track }} />
                      <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {selectedAthleteData.weeklyStats.workoutsCompleted}
                      </div>
                      <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Workouts This Week
                      </div>
                    </CardContent>
                  </Card>

                  <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4 text-center">
                      <Clock size={24} className="mx-auto mb-2" style={{ color: athleticTechTheme.colors.primary.power }} />
                      <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {Math.round(selectedAthleteData.weeklyStats.totalDuration / 60)}h
                      </div>
                      <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Total Training Time
                      </div>
                    </CardContent>
                  </Card>

                  <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4 text-center">
                      <TrendingUp size={24} className="mx-auto mb-2" style={{ color: athleticTechTheme.colors.performance.excellent }} />
                      <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {selectedAthleteData.weeklyStats.completionRate}%
                      </div>
                      <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Completion Rate
                      </div>
                    </CardContent>
                  </Card>

                  <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4 text-center">
                      <Dumbbell size={24} className="mx-auto mb-2" style={{ color: athleticTechTheme.colors.events.sprints }} />
                      <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {selectedAthleteData.weeklyStats.averageDifficulty.toFixed(1)}
                      </div>
                      <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Avg Difficulty
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="workouts" className="space-y-4">
                {selectedAthleteData.recentWorkouts.map((workout) => (
                  <Card key={workout.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {workout.workoutName}
                          </h3>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {new Date(workout.completedAt).toLocaleDateString()} at {new Date(workout.completedAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                          Completed
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {workout.duration}m
                          </div>
                          <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            Duration
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {workout.difficultyRating}/10
                          </div>
                          <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            Difficulty
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {workout.energyBefore}/10
                          </div>
                          <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            Energy Before
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {workout.energyAfter}/10
                          </div>
                          <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            Energy After
                          </div>
                        </div>
                      </div>
                      
                      {workout.notes && (
                        <div className="p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            <strong>Notes:</strong> {workout.notes}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="lifting" className="space-y-4">
                {Object.entries(
                  selectedAthleteData.liftingProgress.reduce((acc, record) => {
                    if (!acc[record.exercise]) acc[record.exercise] = [];
                    acc[record.exercise].push(record);
                    return acc;
                  }, {} as { [exercise: string]: LiftingRecord[] })
                ).map(([exercise, records]) => {
                  const sortedRecords = records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                  const latestRecord = sortedRecords[0];
                  const progress = calculateProgress(records, exercise);
                  
                  return (
                    <Card key={exercise} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {exercise}
                          </h3>
                          <Badge style={{ 
                            backgroundColor: progress > 0 ? athleticTechTheme.colors.performance.excellent : athleticTechTheme.colors.primary.power 
                          }}>
                            {progress > 0 ? '+' : ''}{progress.toFixed(1)}%
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                              {latestRecord.weight}lbs
                            </div>
                            <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              Latest Weight
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                              {latestRecord.sets} × {latestRecord.reps}
                            </div>
                            <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              Sets × Reps
                            </div>
                          </div>
                          {latestRecord.oneRepMax && (
                            <div className="text-center">
                              <div className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                                {latestRecord.oneRepMax}lbs
                              </div>
                              <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                                1RM
                              </div>
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                              {new Date(latestRecord.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              Last Session
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>

              <TabsContent value="records" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedAthleteData.personalRecords).map(([event, record]) => (
                    <Card key={event} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                      <CardContent className="p-4 text-center">
                        <Award size={24} className="mx-auto mb-2" style={{ color: athleticTechTheme.colors.primary.power }} />
                        <h3 className="font-bold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {event}
                        </h3>
                        <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.primary.track }}>
                          {record}
                        </div>
                        <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Personal Best
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AthleteProgressModal;
