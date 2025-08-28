import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Users, Calendar, Clock, Zap } from 'lucide-react';
import { Workout, Exercise } from '@/types/workout';
import { EXERCISE_DATABASE } from '@/lib/workoutLibrary';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface WorkoutCreatorProps {
  onSave: (workout: Workout) => void;
  onCancel: () => void;
  athletes?: { id: string; name: string; }[];
}

const WorkoutCreator: React.FC<WorkoutCreatorProps> = ({ onSave, onCancel, athletes = [] }) => {
  const [workout, setWorkout] = useState<Partial<Workout>>({
    name: '',
    description: '',
    targetDate: '',
    estimatedDuration: 60,
    difficulty: 'moderate',
    category: 'strength',
    exercises: [],
    assignedTo: [],
    priority: 'medium',
    specialInstructions: '',
    trackProgress: true
  });

  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [customExercise, setCustomExercise] = useState<Partial<Exercise>>({
    name: '',
    sets: 3,
    reps: 10,
    restPeriod: 60,
    instructions: '',
    category: 'strength'
  });

  const addExerciseFromDatabase = () => {
    if (!selectedExercise) return;
    
    const exercise = EXERCISE_DATABASE.find(e => e.id === selectedExercise);
    if (exercise) {
      setWorkout(prev => ({
        ...prev,
        exercises: [...(prev.exercises || []), { ...exercise, id: `${exercise.id}_${Date.now()}` }]
      }));
      setSelectedExercise('');
    }
  };

  const addCustomExercise = () => {
    if (!customExercise.name) return;
    
    const exercise: Exercise = {
      id: `custom_${Date.now()}`,
      name: customExercise.name,
      sets: customExercise.sets || 3,
      reps: customExercise.reps,
      duration: customExercise.duration,
      weight: customExercise.weight,
      restPeriod: customExercise.restPeriod || 60,
      instructions: customExercise.instructions,
      formCues: customExercise.formCues,
      category: customExercise.category || 'strength'
    };
    
    setWorkout(prev => ({
      ...prev,
      exercises: [...(prev.exercises || []), exercise]
    }));
    
    setCustomExercise({
      name: '',
      sets: 3,
      reps: 10,
      restPeriod: 60,
      instructions: '',
      category: 'strength'
    });
  };

  const removeExercise = (index: number) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises?.filter((_, i) => i !== index) || []
    }));
  };

  const updateExercise = (index: number, updates: Partial<Exercise>) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises?.map((ex, i) => i === index ? { ...ex, ...updates } : ex) || []
    }));
  };

  const toggleAthlete = (athleteId: string) => {
    setWorkout(prev => ({
      ...prev,
      assignedTo: prev.assignedTo?.includes(athleteId)
        ? prev.assignedTo.filter(id => id !== athleteId)
        : [...(prev.assignedTo || []), athleteId]
    }));
  };

  const handleSave = () => {
    if (!workout.name || !workout.exercises?.length) return;
    
    const completeWorkout: Workout = {
      id: `workout_${Date.now()}`,
      name: workout.name,
      description: workout.description || '',
      targetDate: workout.targetDate || new Date().toISOString().split('T')[0],
      estimatedDuration: workout.estimatedDuration || 60,
      difficulty: workout.difficulty || 'moderate',
      category: workout.category || 'strength',
      exercises: workout.exercises,
      assignedTo: workout.assignedTo || [],
      priority: workout.priority || 'medium',
      specialInstructions: workout.specialInstructions,
      modifications: '',
      trackProgress: workout.trackProgress || true,
      createdBy: 'current_coach_id',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSave(completeWorkout);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus size={24} style={{ color: athleticTechTheme.colors.primary.power }} />
            <span style={{ color: athleticTechTheme.colors.text.primary }}>Create New Workout</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Basic Details */}
      <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>Basic Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workoutName">Workout Name *</Label>
              <Input
                id="workoutName"
                value={workout.name}
                onChange={(e) => setWorkout(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Sprint Power Development"
              />
            </div>
            <div>
              <Label htmlFor="targetDate">Target Date</Label>
              <Input
                id="targetDate"
                type="date"
                value={workout.targetDate}
                onChange={(e) => setWorkout(prev => ({ ...prev, targetDate: e.target.value }))}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={workout.description}
              onChange={(e) => setWorkout(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the workout goals and focus..."
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={workout.estimatedDuration}
                onChange={(e) => setWorkout(prev => ({ ...prev, estimatedDuration: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label>Difficulty</Label>
              <Select value={workout.difficulty} onValueChange={(value) => setWorkout(prev => ({ ...prev, difficulty: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="extreme">Extreme</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={workout.category} onValueChange={(value) => setWorkout(prev => ({ ...prev, category: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="technique">Technique</SelectItem>
                  <SelectItem value="recovery">Recovery</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Selection */}
      <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>Add Exercises</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* From Database */}
          <div>
            <Label>Add from Exercise Database</Label>
            <div className="flex space-x-2">
              <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select an exercise..." />
                </SelectTrigger>
                <SelectContent>
                  {EXERCISE_DATABASE.map(exercise => (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.name} ({exercise.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addExerciseFromDatabase} disabled={!selectedExercise}>
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Custom Exercise */}
          <div className="border-t pt-4">
            <Label>Or Create Custom Exercise</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Input
                placeholder="Exercise name"
                value={customExercise.name}
                onChange={(e) => setCustomExercise(prev => ({ ...prev, name: e.target.value }))}
              />
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  placeholder="Sets"
                  value={customExercise.sets}
                  onChange={(e) => setCustomExercise(prev => ({ ...prev, sets: parseInt(e.target.value) }))}
                />
                <Input
                  type="number"
                  placeholder="Reps"
                  value={customExercise.reps || ''}
                  onChange={(e) => setCustomExercise(prev => ({ ...prev, reps: parseInt(e.target.value) || undefined }))}
                />
                <Input
                  type="number"
                  placeholder="Rest (s)"
                  value={customExercise.restPeriod}
                  onChange={(e) => setCustomExercise(prev => ({ ...prev, restPeriod: parseInt(e.target.value) }))}
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
              <Textarea
                placeholder="Instructions..."
                value={customExercise.instructions}
                onChange={(e) => setCustomExercise(prev => ({ ...prev, instructions: e.target.value }))}
                rows={2}
                className="flex-1"
              />
              <Button onClick={addCustomExercise} disabled={!customExercise.name}>
                Add Custom
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise List */}
      {workout.exercises && workout.exercises.length > 0 && (
        <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardHeader>
            <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
              Workout Exercises ({workout.exercises.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workout.exercises.map((exercise, index) => (
                <div key={index} className="border rounded-lg p-4" style={{ borderColor: athleticTechTheme.colors.surface.elevated }}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {exercise.name}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExercise(index)}
                      style={{ color: '#ef4444' }}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                    <div>
                      <Label className="text-xs">Sets</Label>
                      <Input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(index, { sets: parseInt(e.target.value) || 0 })}
                        size="sm"
                      />
                    </div>
                    {exercise.reps && (
                      <div>
                        <Label className="text-xs">Reps</Label>
                        <Input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(index, { reps: parseInt(e.target.value) || 0 })}
                          size="sm"
                        />
                      </div>
                    )}
                    {exercise.duration && (
                      <div>
                        <Label className="text-xs">Duration</Label>
                        <Input
                          value={exercise.duration}
                          onChange={(e) => updateExercise(index, { duration: e.target.value })}
                          size="sm"
                        />
                      </div>
                    )}
                    <div>
                      <Label className="text-xs">Rest (s)</Label>
                      <Input
                        type="number"
                        value={exercise.restPeriod}
                        onChange={(e) => updateExercise(index, { restPeriod: parseInt(e.target.value) || 0 })}
                        size="sm"
                      />
                    </div>
                  </div>
                  
                  {exercise.instructions && (
                    <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      {exercise.instructions}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assignment Details */}
      <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users size={20} style={{ color: athleticTechTheme.colors.primary.track }} />
            <span style={{ color: athleticTechTheme.colors.text.primary }}>Assignment Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Athlete Selection */}
          <div>
            <Label>Assign to Athletes</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {athletes.map(athlete => (
                <Badge
                  key={athlete.id}
                  variant={workout.assignedTo?.includes(athlete.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleAthlete(athlete.id)}
                >
                  {athlete.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Priority Level</Label>
              <Select value={workout.priority} onValueChange={(value) => setWorkout(prev => ({ ...prev, priority: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Special Instructions</Label>
            <Textarea
              value={workout.specialInstructions}
              onChange={(e) => setWorkout(prev => ({ ...prev, specialInstructions: e.target.value }))}
              placeholder="Any special instructions or modifications for athletes..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!workout.name || !workout.exercises?.length}
          style={{ backgroundColor: athleticTechTheme.colors.primary.power }}
        >
          Create Workout
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCreator;
