import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, TrendingUp, Calendar, Award, Plus, BarChart3, Target, Clock } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface PerformanceRecord {
  id: string;
  event: string;
  value: string;
  unit: string;
  date: string;
  location?: string;
  conditions?: string;
  notes?: string;
}

interface WorkoutMetric {
  id: string;
  exercise: string;
  date: string;
  sets: number;
  reps: number;
  weight?: number;
  distance?: string;
  time?: string;
  notes?: string;
}

interface ProgressTrackingModalProps {
  onClose: () => void;
}

const ProgressTrackingModal: React.FC<ProgressTrackingModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('performance');
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [showAddMetric, setShowAddMetric] = useState(false);
  
  // Mock performance records
  const [performanceRecords, setPerformanceRecords] = useState<PerformanceRecord[]>([
    {
      id: '1',
      event: '100m',
      value: '11.24',
      unit: 'seconds',
      date: '2025-08-25',
      location: 'Local Track',
      conditions: 'Sunny, light wind',
      notes: 'Great start, maintained form well'
    },
    {
      id: '2',
      event: '100m',
      value: '11.31',
      unit: 'seconds',
      date: '2025-08-15',
      location: 'Training Facility',
      notes: 'Working on technique'
    },
    {
      id: '3',
      event: '200m',
      value: '22.89',
      unit: 'seconds',
      date: '2025-08-20',
      location: 'Local Track',
      conditions: 'Perfect conditions',
      notes: 'Personal best! Felt strong throughout'
    },
    {
      id: '4',
      event: 'Long Jump',
      value: '7.45',
      unit: 'meters',
      date: '2025-08-18',
      location: 'Training Facility',
      notes: 'Good approach speed'
    }
  ]);

  // Mock workout metrics
  const [workoutMetrics, setWorkoutMetrics] = useState<WorkoutMetric[]>([
    {
      id: '1',
      exercise: 'Back Squat',
      date: '2025-08-25',
      sets: 4,
      reps: 6,
      weight: 185,
      notes: 'New PR!'
    },
    {
      id: '2',
      exercise: 'Back Squat',
      date: '2025-08-18',
      sets: 4,
      reps: 6,
      weight: 180,
      notes: 'Felt strong'
    },
    {
      id: '3',
      exercise: 'Deadlift',
      date: '2025-08-23',
      sets: 3,
      reps: 5,
      weight: 225,
      notes: 'Good form'
    },
    {
      id: '4',
      exercise: 'Bench Press',
      date: '2025-08-21',
      sets: 4,
      reps: 8,
      weight: 135,
      notes: 'Steady progress'
    }
  ]);

  const [newRecord, setNewRecord] = useState({
    event: '',
    value: '',
    unit: '',
    date: '',
    location: '',
    conditions: '',
    notes: ''
  });

  const [newMetric, setNewMetric] = useState({
    exercise: '',
    date: '',
    sets: '',
    reps: '',
    weight: '',
    distance: '',
    time: '',
    notes: ''
  });

  const events = [
    { name: '100m', unit: 'seconds' },
    { name: '200m', unit: 'seconds' },
    { name: '400m', unit: 'seconds' },
    { name: '800m', unit: 'minutes:seconds' },
    { name: '1500m', unit: 'minutes:seconds' },
    { name: 'Long Jump', unit: 'meters' },
    { name: 'High Jump', unit: 'meters' },
    { name: 'Triple Jump', unit: 'meters' },
    { name: 'Shot Put', unit: 'meters' },
    { name: 'Discus', unit: 'meters' },
    { name: 'Javelin', unit: 'meters' }
  ];

  const exercises = [
    'Back Squat', 'Front Squat', 'Deadlift', 'Romanian Deadlift',
    'Bench Press', 'Incline Press', 'Pull-ups', 'Rows',
    'Overhead Press', 'Clean', 'Snatch', 'Hip Thrusts'
  ];

  const handleAddRecord = () => {
    if (!newRecord.event || !newRecord.value || !newRecord.date) {
      alert('Please fill in required fields');
      return;
    }

    const record: PerformanceRecord = {
      id: Date.now().toString(),
      event: newRecord.event,
      value: newRecord.value,
      unit: newRecord.unit,
      date: newRecord.date,
      location: newRecord.location || undefined,
      conditions: newRecord.conditions || undefined,
      notes: newRecord.notes || undefined
    };

    setPerformanceRecords(prev => [record, ...prev]);
    setNewRecord({
      event: '',
      value: '',
      unit: '',
      date: '',
      location: '',
      conditions: '',
      notes: ''
    });
    setShowAddRecord(false);
  };

  const handleAddMetric = () => {
    if (!newMetric.exercise || !newMetric.date || !newMetric.sets || !newMetric.reps) {
      alert('Please fill in required fields');
      return;
    }

    const metric: WorkoutMetric = {
      id: Date.now().toString(),
      exercise: newMetric.exercise,
      date: newMetric.date,
      sets: parseInt(newMetric.sets),
      reps: parseInt(newMetric.reps),
      weight: newMetric.weight ? parseFloat(newMetric.weight) : undefined,
      distance: newMetric.distance || undefined,
      time: newMetric.time || undefined,
      notes: newMetric.notes || undefined
    };

    setWorkoutMetrics(prev => [metric, ...prev]);
    setNewMetric({
      exercise: '',
      date: '',
      sets: '',
      reps: '',
      weight: '',
      distance: '',
      time: '',
      notes: ''
    });
    setShowAddMetric(false);
  };

  const getPersonalBest = (event: string) => {
    const eventRecords = performanceRecords.filter(r => r.event === event);
    if (eventRecords.length === 0) return null;
    
    // For time-based events, lower is better
    const timeEvents = ['100m', '200m', '400m', '800m', '1500m', '5000m', '10000m'];
    if (timeEvents.includes(event)) {
      return eventRecords.reduce((best, current) => 
        parseFloat(current.value) < parseFloat(best.value) ? current : best
      );
    } else {
      // For distance/height events, higher is better
      return eventRecords.reduce((best, current) => 
        parseFloat(current.value) > parseFloat(best.value) ? current : best
      );
    }
  };

  const getExercisePR = (exercise: string) => {
    const exerciseMetrics = workoutMetrics.filter(m => m.exercise === exercise && m.weight);
    if (exerciseMetrics.length === 0) return null;
    
    return exerciseMetrics.reduce((best, current) => 
      (current.weight || 0) > (best.weight || 0) ? current : best
    );
  };

  const calculateProgress = (exercise: string) => {
    const exerciseMetrics = workoutMetrics
      .filter(m => m.exercise === exercise && m.weight)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (exerciseMetrics.length < 2) return 0;
    
    const first = exerciseMetrics[0];
    const last = exerciseMetrics[exerciseMetrics.length - 1];
    
    return ((last.weight! - first.weight!) / first.weight!) * 100;
  };

  const uniqueEvents = [...new Set(performanceRecords.map(r => r.event))];
  const uniqueExercises = [...new Set(workoutMetrics.map(m => m.exercise))];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp size={24} style={{ color: athleticTechTheme.colors.primary.track }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Progress Tracking</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">Performance Records</TabsTrigger>
              <TabsTrigger value="strength">Strength Progress</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="goals">Goal Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Track & Field Records
                </h3>
                <Button onClick={() => setShowAddRecord(true)} style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                  <Plus size={16} className="mr-2" />
                  Add Record
                </Button>
              </div>

              {/* Personal Bests Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {uniqueEvents.map(event => {
                  const pb = getPersonalBest(event);
                  return pb ? (
                    <Card key={event} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                      <CardContent className="p-4 text-center">
                        <Award size={20} className="mx-auto mb-2" style={{ color: athleticTechTheme.colors.primary.power }} />
                        <h4 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {event}
                        </h4>
                        <div className="text-lg font-bold" style={{ color: athleticTechTheme.colors.primary.track }}>
                          {pb.value} {pb.unit}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {new Date(pb.date).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ) : null;
                })}
              </div>

              {/* Recent Records */}
              <div className="space-y-3">
                {performanceRecords.slice(0, 10).map(record => (
                  <Card key={record.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {record.event}
                          </h4>
                          <div className="text-lg font-bold" style={{ color: athleticTechTheme.colors.primary.track }}>
                            {record.value} {record.unit}
                          </div>
                          {record.location && (
                            <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              📍 {record.location}
                            </p>
                          )}
                          {record.notes && (
                            <p className="text-sm mt-1" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              {record.notes}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {new Date(record.date).toLocaleDateString()}
                          </div>
                          {record.conditions && (
                            <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              {record.conditions}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="strength" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Strength Training Progress
                </h3>
                <Button onClick={() => setShowAddMetric(true)} style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                  <Plus size={16} className="mr-2" />
                  Add Workout
                </Button>
              </div>

              {/* Strength PRs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {uniqueExercises.map(exercise => {
                  const pr = getExercisePR(exercise);
                  const progress = calculateProgress(exercise);
                  return pr ? (
                    <Card key={exercise} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {exercise}
                          </h4>
                          {progress > 0 && (
                            <Badge style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}>
                              +{progress.toFixed(1)}%
                            </Badge>
                          )}
                        </div>
                        <div className="text-lg font-bold" style={{ color: athleticTechTheme.colors.primary.track }}>
                          {pr.weight}lbs
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {pr.sets} × {pr.reps} on {new Date(pr.date).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ) : null;
                })}
              </div>

              {/* Recent Workouts */}
              <div className="space-y-3">
                {workoutMetrics.slice(0, 10).map(metric => (
                  <Card key={metric.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                            {metric.exercise}
                          </h4>
                          <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {metric.sets} sets × {metric.reps} reps
                            {metric.weight && ` @ ${metric.weight}lbs`}
                            {metric.distance && ` - ${metric.distance}`}
                            {metric.time && ` in ${metric.time}`}
                          </div>
                          {metric.notes && (
                            <p className="text-sm mt-1" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              {metric.notes}
                            </p>
                          )}
                        </div>
                        <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {new Date(metric.date).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 size={20} />
                      <span>Training Frequency</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>This Week</span>
                        <span className="font-semibold">4 sessions</span>
                      </div>
                      <div className="flex justify-between">
                        <span>This Month</span>
                        <span className="font-semibold">16 sessions</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average/Week</span>
                        <span className="font-semibold">3.8 sessions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp size={20} />
                      <span>Improvement Trends</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>100m Time</span>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}>
                          -0.07s
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Squat Strength</span>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}>
                          +5lbs
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Training Volume</span>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                          +12%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <div className="text-center py-8">
                <Target size={48} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Goal Progress Tracking
                </h3>
                <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Set goals first to track your progress towards them
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Record Modal */}
      {showAddRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-60">
          <Card className="w-full max-w-md" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
            <CardHeader>
              <CardTitle>Add Performance Record</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Event *</Label>
                <Select value={newRecord.event} onValueChange={(value) => {
                  const event = events.find(e => e.name === value);
                  setNewRecord(prev => ({ 
                    ...prev, 
                    event: value,
                    unit: event?.unit || ''
                  }));
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map(event => (
                      <SelectItem key={event.name} value={event.name}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="value">Performance *</Label>
                  <Input
                    id="value"
                    value={newRecord.value}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="11.24"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newRecord.location}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Track name or location"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="How did it feel? Any observations?"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddRecord(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRecord} style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                  Add Record
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Metric Modal */}
      {showAddMetric && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-60">
          <Card className="w-full max-w-md" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
            <CardHeader>
              <CardTitle>Add Workout Metric</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Exercise *</Label>
                <Select value={newMetric.exercise} onValueChange={(value) => setNewMetric(prev => ({ ...prev, exercise: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exercise" />
                  </SelectTrigger>
                  <SelectContent>
                    {exercises.map(exercise => (
                      <SelectItem key={exercise} value={exercise}>
                        {exercise}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sets">Sets *</Label>
                  <Input
                    id="sets"
                    type="number"
                    value={newMetric.sets}
                    onChange={(e) => setNewMetric(prev => ({ ...prev, sets: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="reps">Reps *</Label>
                  <Input
                    id="reps"
                    type="number"
                    value={newMetric.reps}
                    onChange={(e) => setNewMetric(prev => ({ ...prev, reps: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={newMetric.weight}
                    onChange={(e) => setNewMetric(prev => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={newMetric.date}
                  onChange={(e) => setNewMetric(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={newMetric.notes}
                  onChange={(e) => setNewMetric(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="How did it feel?"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddMetric(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMetric} style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                  Add Metric
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProgressTrackingModal;
