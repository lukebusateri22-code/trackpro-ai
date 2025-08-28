import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, History, Calendar, Clock, Zap, TrendingUp, Filter, Search } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface WorkoutHistory {
  id: string;
  workoutName: string;
  completedAt: string;
  duration: number;
  difficultyRating: number;
  energyBefore: number;
  energyAfter: number;
  type: 'strength' | 'cardio' | 'technique' | 'recovery';
  exercises: ExerciseCompletion[];
  notes?: string;
  injuries?: string;
  coachFeedback?: string;
}

interface ExerciseCompletion {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: string;
  completed: boolean;
}

interface TrainingHistoryModalProps {
  onClose: () => void;
}

const TrainingHistoryModal: React.FC<TrainingHistoryModalProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPeriod, setFilterPeriod] = useState<string>('all');

  // Mock training history data
  const mockHistory: WorkoutHistory[] = [
    {
      id: '1',
      workoutName: 'Sprint Power Development',
      completedAt: '2025-08-27T18:30:00Z',
      duration: 85,
      difficultyRating: 8,
      energyBefore: 7,
      energyAfter: 4,
      type: 'technique',
      exercises: [
        { name: '60m Sprints', sets: 6, reps: 1, completed: true },
        { name: 'Block Starts', sets: 8, reps: 1, completed: true },
        { name: 'Flying 30m', sets: 4, reps: 1, completed: true }
      ],
      notes: 'Felt strong on the first 4 intervals, struggled with the last 2',
      coachFeedback: 'Great improvement in acceleration phase. Work on maintaining form when fatigued.'
    },
    {
      id: '2',
      workoutName: 'Lower Body Strength',
      completedAt: '2025-08-25T16:00:00Z',
      duration: 75,
      difficultyRating: 7,
      energyBefore: 8,
      energyAfter: 5,
      type: 'strength',
      exercises: [
        { name: 'Back Squat', sets: 4, reps: 6, weight: 185, completed: true },
        { name: 'Romanian Deadlift', sets: 3, reps: 8, weight: 155, completed: true },
        { name: 'Bulgarian Split Squats', sets: 3, reps: 10, completed: true },
        { name: 'Calf Raises', sets: 4, reps: 15, weight: 45, completed: true }
      ],
      notes: 'New PR on squats! Felt really strong today.',
      coachFeedback: 'Excellent progress on squat strength. Ready to increase weight next session.'
    },
    {
      id: '3',
      workoutName: 'Recovery Run',
      completedAt: '2025-08-23T07:00:00Z',
      duration: 30,
      difficultyRating: 3,
      energyBefore: 6,
      energyAfter: 7,
      type: 'recovery',
      exercises: [
        { name: 'Easy Jog', sets: 1, reps: 1, duration: '20 min', completed: true },
        { name: 'Dynamic Stretching', sets: 1, reps: 1, duration: '10 min', completed: true }
      ],
      notes: 'Legs felt much better after this easy session'
    },
    {
      id: '4',
      workoutName: 'Track Intervals',
      completedAt: '2025-08-21T17:30:00Z',
      duration: 90,
      difficultyRating: 9,
      energyBefore: 8,
      energyAfter: 3,
      type: 'cardio',
      exercises: [
        { name: '400m Repeats', sets: 6, reps: 1, completed: true },
        { name: '200m Cooldown', sets: 1, reps: 1, completed: true }
      ],
      notes: 'Tough workout but hit all target times',
      coachFeedback: 'Outstanding session! Your 400m splits are getting more consistent.'
    },
    {
      id: '5',
      workoutName: 'Upper Body Strength',
      completedAt: '2025-08-19T15:00:00Z',
      duration: 60,
      difficultyRating: 6,
      energyBefore: 7,
      energyAfter: 6,
      type: 'strength',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: 8, weight: 135, completed: true },
        { name: 'Pull-ups', sets: 3, reps: 8, completed: true },
        { name: 'Overhead Press', sets: 3, reps: 10, weight: 85, completed: true }
      ],
      notes: 'Good session, felt balanced'
    }
  ];

  const filteredHistory = mockHistory.filter(workout => {
    const matchesSearch = workout.workoutName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || workout.type === filterType;
    
    const workoutDate = new Date(workout.completedAt);
    const now = new Date();
    let matchesPeriod = true;
    
    if (filterPeriod === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesPeriod = workoutDate >= weekAgo;
    } else if (filterPeriod === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesPeriod = workoutDate >= monthAgo;
    }
    
    return matchesSearch && matchesType && matchesPeriod;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'strength': return athleticTechTheme.colors.primary.track;
      case 'cardio': return athleticTechTheme.colors.events.sprints;
      case 'technique': return athleticTechTheme.colors.primary.power;
      case 'recovery': return athleticTechTheme.colors.performance.recovery;
      default: return athleticTechTheme.colors.primary.track;
    }
  };

  const getDifficultyColor = (rating: number) => {
    if (rating <= 3) return athleticTechTheme.colors.performance.excellent;
    if (rating <= 6) return athleticTechTheme.colors.primary.track;
    return athleticTechTheme.colors.primary.power;
  };

  const calculateStats = () => {
    const totalWorkouts = filteredHistory.length;
    const totalDuration = filteredHistory.reduce((sum, w) => sum + w.duration, 0);
    const avgDifficulty = filteredHistory.reduce((sum, w) => sum + w.difficultyRating, 0) / totalWorkouts;
    const completionRate = 100; // All workouts in history are completed
    
    return { totalWorkouts, totalDuration, avgDifficulty, completionRate };
  };

  const stats = calculateStats();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <History size={24} style={{ color: athleticTechTheme.colors.primary.track }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Training History</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {stats.totalWorkouts}
                </div>
                <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Total Workouts
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {Math.round(stats.totalDuration / 60)}h
                </div>
                <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Total Training Time
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {stats.avgDifficulty.toFixed(1)}
                </div>
                <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Avg Difficulty
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {stats.completionRate}%
                </div>
                <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Completion Rate
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: athleticTechTheme.colors.text.secondary }} />
                <Input
                  placeholder="Search workouts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="technique">Technique</SelectItem>
                <SelectItem value="recovery">Recovery</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Workout History List */}
          <div className="space-y-4">
            {filteredHistory.map((workout) => (
              <Card key={workout.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {workout.workoutName}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{new Date(workout.completedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{workout.duration} min</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge style={{ backgroundColor: getTypeColor(workout.type) }}>
                        {workout.type.toUpperCase()}
                      </Badge>
                      <Badge style={{ backgroundColor: getDifficultyColor(workout.difficultyRating) }}>
                        {workout.difficultyRating}/10
                      </Badge>
                    </div>
                  </div>

                  <Tabs defaultValue="exercises" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="exercises">Exercises</TabsTrigger>
                      <TabsTrigger value="metrics">Metrics</TabsTrigger>
                      <TabsTrigger value="feedback">Notes & Feedback</TabsTrigger>
                    </TabsList>

                    <TabsContent value="exercises" className="space-y-2">
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                          <div>
                            <span className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                              {exercise.name}
                            </span>
                          </div>
                          <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {exercise.sets} × {exercise.reps}
                            {exercise.weight && ` @ ${exercise.weight}lbs`}
                            {exercise.duration && ` (${exercise.duration})`}
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="metrics">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                        <div className="text-center">
                          <div className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {workout.difficultyRating}/10
                          </div>
                          <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            Difficulty
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="feedback" className="space-y-3">
                      {workout.notes && (
                        <div className="p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                          <h4 className="font-medium mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                            Your Notes:
                          </h4>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {workout.notes}
                          </p>
                        </div>
                      )}
                      {workout.coachFeedback && (
                        <div className="p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.primary.track + '20' }}>
                          <h4 className="font-medium mb-1" style={{ color: athleticTechTheme.colors.primary.track }}>
                            Coach Feedback:
                          </h4>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {workout.coachFeedback}
                          </p>
                        </div>
                      )}
                      {workout.injuries && (
                        <div className="p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.primary.power + '20' }}>
                          <h4 className="font-medium mb-1" style={{ color: athleticTechTheme.colors.primary.power }}>
                            Injury Report:
                          </h4>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {workout.injuries}
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8">
              <History size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                No workouts found
              </h3>
              <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingHistoryModal;
