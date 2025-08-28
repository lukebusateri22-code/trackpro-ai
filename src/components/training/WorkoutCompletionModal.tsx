import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Play, CheckCircle, Clock, Zap, Heart, Camera, AlertTriangle } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps?: number;
  duration?: string;
  weight?: number;
  restPeriod: number;
  instructions?: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  estimatedDuration: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
}

interface WorkoutCompletionModalProps {
  workout: Workout;
  onClose: () => void;
  onComplete: (completionData: any) => void;
}

const WorkoutCompletionModal: React.FC<WorkoutCompletionModalProps> = ({ workout, onClose, onComplete }) => {
  const [status, setStatus] = useState<'not_started' | 'started' | 'completed'>('not_started');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [completedExercises, setCompletedExercises] = useState<{ [key: string]: any }>({});
  const [difficultyRating, setDifficultyRating] = useState([5]);
  const [energyBefore, setEnergyBefore] = useState([5]);
  const [energyAfter, setEnergyAfter] = useState([5]);
  const [notes, setNotes] = useState('');
  const [injuries, setInjuries] = useState('');
  const [modifications, setModifications] = useState('');

  const startWorkout = () => {
    setStatus('started');
    setStartTime(new Date());
  };

  const completeExercise = (exerciseId: string, data: any) => {
    setCompletedExercises(prev => ({
      ...prev,
      [exerciseId]: { ...data, completed: true }
    }));
  };

  const completeWorkout = () => {
    const completionData = {
      workoutId: workout.id,
      status: 'completed',
      startedAt: startTime?.toISOString(),
      completedAt: new Date().toISOString(),
      actualDuration: startTime ? Math.round((new Date().getTime() - startTime.getTime()) / 60000) : 0,
      difficultyRating: difficultyRating[0],
      energyBefore: energyBefore[0],
      energyAfter: energyAfter[0],
      exerciseCompletions: completedExercises,
      notes,
      injuries,
      modifications
    };
    
    onComplete(completionData);
    setStatus('completed');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return athleticTechTheme.colors.performance.excellent;
      case 'moderate': return athleticTechTheme.colors.primary.track;
      case 'hard': return athleticTechTheme.colors.primary.power;
      case 'extreme': return '#ef4444';
      default: return athleticTechTheme.colors.primary.track;
    }
  };

  if (status === 'completed') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardHeader className="text-center">
            <CheckCircle size={48} className="mx-auto mb-4" style={{ color: athleticTechTheme.colors.performance.excellent }} />
            <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
              Workout Completed! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4" style={{ color: athleticTechTheme.colors.text.secondary }}>
              Great job completing "{workout.name}"! Your progress has been logged.
            </p>
            <Button onClick={onClose} className="w-full" style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Zap size={24} style={{ color: athleticTechTheme.colors.primary.power }} />
                <span style={{ color: athleticTechTheme.colors.text.primary }}>{workout.name}</span>
              </CardTitle>
              <p className="mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                {workout.description}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge style={{ backgroundColor: getDifficultyColor(workout.difficulty) }}>
                  {workout.difficulty.toUpperCase()}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Clock size={16} style={{ color: athleticTechTheme.colors.text.secondary }} />
                  <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    {workout.estimatedDuration} min
                  </span>
                </div>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {status === 'not_started' && (
            <div className="text-center py-8">
              <Play size={64} className="mx-auto mb-4" style={{ color: athleticTechTheme.colors.primary.track }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                Ready to Start?
              </h3>
              <p className="mb-6" style={{ color: athleticTechTheme.colors.text.secondary }}>
                This workout has {workout.exercises.length} exercises and should take about {workout.estimatedDuration} minutes.
              </p>
              
              <div className="mb-6">
                <Label className="block mb-2">Energy Level Before Workout</Label>
                <div className="flex items-center space-x-4">
                  <Heart size={20} style={{ color: athleticTechTheme.colors.performance.recovery }} />
                  <Slider
                    value={energyBefore}
                    onValueChange={setEnergyBefore}
                    max={10}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium">{energyBefore[0]}/10</span>
                </div>
              </div>
              
              <Button onClick={startWorkout} size="lg" style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                <Play size={20} className="mr-2" />
                Start Workout
              </Button>
            </div>
          )}

          {status === 'started' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                    Workout In Progress
                  </span>
                </div>
                <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Started: {startTime?.toLocaleTimeString()}
                </div>
              </div>

              {/* Exercise List */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Exercises ({Object.keys(completedExercises).length}/{workout.exercises.length} completed)
                </h3>
                
                {workout.exercises.map((exercise, index) => {
                  const isCompleted = completedExercises[exercise.id]?.completed;
                  
                  return (
                    <Card key={exercise.id} style={{ 
                      backgroundColor: isCompleted ? athleticTechTheme.colors.performance.excellent + '20' : athleticTechTheme.colors.surface.elevated,
                      border: isCompleted ? `2px solid ${athleticTechTheme.colors.performance.excellent}` : 'none'
                    }}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold flex items-center space-x-2">
                              {isCompleted && <CheckCircle size={16} style={{ color: athleticTechTheme.colors.performance.excellent }} />}
                              <span style={{ color: athleticTechTheme.colors.text.primary }}>
                                {index + 1}. {exercise.name}
                              </span>
                            </h4>
                            <p className="text-sm mt-1" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              {exercise.sets} sets × {exercise.reps ? `${exercise.reps} reps` : exercise.duration}
                              {exercise.weight && ` @ ${exercise.weight}lbs`}
                            </p>
                            {exercise.instructions && (
                              <p className="text-sm mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                                💡 {exercise.instructions}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {!isCompleted && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                            <div>
                              <Label className="text-xs">Actual Sets</Label>
                              <Input
                                type="number"
                                placeholder={exercise.sets.toString()}
                                onChange={(e) => completeExercise(exercise.id, {
                                  ...completedExercises[exercise.id],
                                  actualSets: parseInt(e.target.value) || exercise.sets
                                })}
                              />
                            </div>
                            {exercise.reps && (
                              <div>
                                <Label className="text-xs">Actual Reps</Label>
                                <Input
                                  type="number"
                                  placeholder={exercise.reps.toString()}
                                  onChange={(e) => completeExercise(exercise.id, {
                                    ...completedExercises[exercise.id],
                                    actualReps: parseInt(e.target.value) || exercise.reps
                                  })}
                                />
                              </div>
                            )}
                            {exercise.weight && (
                              <div>
                                <Label className="text-xs">Weight (lbs)</Label>
                                <Input
                                  type="number"
                                  placeholder={exercise.weight.toString()}
                                  onChange={(e) => completeExercise(exercise.id, {
                                    ...completedExercises[exercise.id],
                                    actualWeight: parseInt(e.target.value) || exercise.weight
                                  })}
                                />
                              </div>
                            )}
                            <div>
                              <Label className="text-xs">Rest (sec)</Label>
                              <Input
                                type="number"
                                placeholder={exercise.restPeriod.toString()}
                                onChange={(e) => completeExercise(exercise.id, {
                                  ...completedExercises[exercise.id],
                                  actualRest: parseInt(e.target.value) || exercise.restPeriod
                                })}
                              />
                            </div>
                          </div>
                        )}
                        
                        {!isCompleted && (
                          <Button 
                            className="w-full mt-3" 
                            onClick={() => completeExercise(exercise.id, { completed: true })}
                            style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}
                          >
                            <CheckCircle size={16} className="mr-2" />
                            Mark Complete
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Completion Form */}
              {Object.keys(completedExercises).length === workout.exercises.length && (
                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
                      Workout Complete! 🎉
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Overall Difficulty Rating</Label>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm">Easy</span>
                        <Slider
                          value={difficultyRating}
                          onValueChange={setDifficultyRating}
                          max={10}
                          min={1}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm">Hard</span>
                        <span className="text-sm font-medium">{difficultyRating[0]}/10</span>
                      </div>
                    </div>

                    <div>
                      <Label>Energy Level After Workout</Label>
                      <div className="flex items-center space-x-4 mt-2">
                        <Heart size={20} style={{ color: athleticTechTheme.colors.performance.recovery }} />
                        <Slider
                          value={energyAfter}
                          onValueChange={setEnergyAfter}
                          max={10}
                          min={1}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium">{energyAfter[0]}/10</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="modifications">Modifications Made</Label>
                      <Textarea
                        id="modifications"
                        value={modifications}
                        onChange={(e) => setModifications(e.target.value)}
                        placeholder="Any changes you made to the workout..."
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="injuries">Injuries or Pain</Label>
                      <Textarea
                        id="injuries"
                        value={injuries}
                        onChange={(e) => setInjuries(e.target.value)}
                        placeholder="Report any injuries or pain experienced..."
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="How did the workout feel? Any other comments..."
                        rows={3}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1" style={{ backgroundColor: athleticTechTheme.colors.primary.power }}>
                        <Camera size={16} className="mr-2" />
                        Upload Video
                      </Button>
                      <Button 
                        className="flex-1" 
                        onClick={completeWorkout}
                        style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Submit Workout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutCompletionModal;
