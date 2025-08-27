import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { useUser } from '@/contexts/UserContext';
import { 
  Calendar, 
  Target, 
  Users, 
  Plus, 
  X, 
  Clock,
  Zap,
  Dumbbell,
  Activity
} from 'lucide-react';

interface TrainingPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // weeks
  phase: string;
  targetEvent: string;
  assignedAthletes: string[];
  sessions: TrainingSession[];
  goals: string[];
}

interface TrainingSession {
  id: string;
  name: string;
  type: 'track' | 'weights' | 'recovery' | 'technique';
  duration: number; // minutes
  intensity: 'low' | 'medium' | 'high' | 'max';
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  distance?: string;
  weight?: string;
  duration?: number;
  restTime?: number;
}

export const TrainingPlanModal: React.FC<TrainingPlanModalProps> = ({ isOpen, onClose }) => {
  const { isCoach } = useUser();
  const [activeTab, setActiveTab] = useState<'create' | 'view'>('view');
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null);
  const [newPlan, setNewPlan] = useState<Partial<TrainingPlan>>({
    name: '',
    description: '',
    duration: 4,
    phase: 'base',
    targetEvent: 'sprints',
    assignedAthletes: [],
    sessions: [],
    goals: []
  });

  // Mock existing plans
  const existingPlans: TrainingPlan[] = [
    {
      id: '1',
      name: 'Sprint Development Phase 1',
      description: 'Base building for 100m/200m sprinters with focus on acceleration and speed endurance',
      duration: 6,
      phase: 'base',
      targetEvent: 'sprints',
      assignedAthletes: ['John Doe', 'Sarah Smith'],
      sessions: [
        {
          id: '1',
          name: 'Speed Endurance',
          type: 'track',
          duration: 90,
          intensity: 'high',
          exercises: [
            { id: '1', name: '4x150m Build-ups', distance: '150m', sets: 4, restTime: 180 },
            { id: '2', name: '3x100m @ 95%', distance: '100m', sets: 3, restTime: 120 },
            { id: '3', name: '200m Cool-down jog', distance: '200m', sets: 1, restTime: 0 }
          ]
        },
        {
          id: '2',
          name: 'Strength Training',
          type: 'weights',
          duration: 75,
          intensity: 'high',
          exercises: [
            { id: '4', name: 'Back Squat', sets: 4, reps: 6, weight: '85% 1RM' },
            { id: '5', name: 'Romanian Deadlift', sets: 3, reps: 8, weight: '75% 1RM' },
            { id: '6', name: 'Bulgarian Split Squats', sets: 3, reps: 10, weight: 'Bodyweight + 20kg' },
            { id: '7', name: 'Calf Raises', sets: 4, reps: 15, weight: '60kg' }
          ]
        },
        {
          id: '3',
          name: 'Technical Work',
          type: 'technique',
          duration: 60,
          intensity: 'medium',
          exercises: [
            { id: '8', name: 'Block Starts', sets: 8, reps: 1, distance: '30m' },
            { id: '9', name: 'Acceleration Drills', sets: 6, reps: 1, distance: '20m' },
            { id: '10', name: 'High Knees', sets: 4, reps: 1, distance: '30m' }
          ]
        }
      ],
      goals: ['Improve acceleration', 'Build speed endurance', 'Technical refinement', 'Increase power output']
    },
    {
      id: '2',
      name: 'Jumps Power Program',
      description: 'Long jump and triple jump development with emphasis on takeoff power and approach consistency',
      duration: 8,
      phase: 'build',
      targetEvent: 'jumps',
      assignedAthletes: ['Mike Johnson'],
      sessions: [
        {
          id: '4',
          name: 'Plyometric Power',
          type: 'track',
          duration: 75,
          intensity: 'high',
          exercises: [
            { id: '11', name: 'Approach Runs', sets: 6, reps: 1, distance: '40m' },
            { id: '12', name: 'Bounding Series', distance: '30m', sets: 4, reps: 1 },
            { id: '13', name: 'Triple Jump Hops', sets: 5, reps: 3, distance: '15m' },
            { id: '14', name: 'Long Jump Practice', sets: 4, reps: 1, distance: 'Full approach' }
          ]
        },
        {
          id: '5',
          name: 'Power Development',
          type: 'weights',
          duration: 80,
          intensity: 'high',
          exercises: [
            { id: '15', name: 'Power Clean', sets: 5, reps: 3, weight: '80% 1RM' },
            { id: '16', name: 'Jump Squats', sets: 4, reps: 6, weight: '40% 1RM' },
            { id: '17', name: 'Single Leg Bounds', sets: 3, reps: 8, weight: 'Bodyweight' },
            { id: '18', name: 'Depth Jumps', sets: 4, reps: 5, weight: 'Bodyweight' }
          ]
        }
      ],
      goals: ['Increase takeoff power', 'Improve approach consistency', 'Enhance triple jump technique', 'Build explosive strength']
    },
    {
      id: '3',
      name: 'Distance Base Building',
      description: 'Aerobic base development for 800m and 1500m runners',
      duration: 10,
      phase: 'base',
      targetEvent: 'distance',
      assignedAthletes: ['Emma Wilson', 'David Chen'],
      sessions: [
        {
          id: '6',
          name: 'Tempo Run',
          type: 'track',
          duration: 45,
          intensity: 'medium',
          exercises: [
            { id: '19', name: 'Warm-up jog', distance: '1200m', sets: 1, restTime: 0 },
            { id: '20', name: 'Tempo intervals', distance: '400m', sets: 6, restTime: 90 },
            { id: '21', name: 'Cool-down', distance: '800m', sets: 1, restTime: 0 }
          ]
        },
        {
          id: '7',
          name: 'Core & Stability',
          type: 'recovery',
          duration: 30,
          intensity: 'low',
          exercises: [
            { id: '22', name: 'Plank Hold', sets: 3, duration: 60, reps: 1 },
            { id: '23', name: 'Side Planks', sets: 3, duration: 45, reps: 2 },
            { id: '24', name: 'Glute Bridges', sets: 3, reps: 15, weight: 'Bodyweight' }
          ]
        }
      ],
      goals: ['Build aerobic base', 'Improve running economy', 'Develop lactate threshold']
    }
  ];

  const phases = [
    { value: 'base', label: 'Base Building', color: athleticTechTheme.colors.performance.good },
    { value: 'build', label: 'Build Phase', color: athleticTechTheme.colors.primary.field },
    { value: 'peak', label: 'Peak Phase', color: athleticTechTheme.colors.primary.power },
    { value: 'recovery', label: 'Recovery', color: athleticTechTheme.colors.performance.recovery }
  ];

  const events = [
    { value: 'sprints', label: 'Sprints (100m-400m)', color: athleticTechTheme.colors.events.sprints },
    { value: 'jumps', label: 'Jumps', color: athleticTechTheme.colors.events.jumps },
    { value: 'throws', label: 'Throws', color: athleticTechTheme.colors.events.throws },
    { value: 'distance', label: 'Distance', color: athleticTechTheme.colors.events.distance },
    { value: 'hurdles', label: 'Hurdles', color: athleticTechTheme.colors.events.hurdles }
  ];

  const renderPlanCard = (plan: TrainingPlan) => (
    <Card 
      key={plan.id}
      className="mb-4 hover:shadow-lg transition-all duration-200"
      style={{ 
        backgroundColor: athleticTechTheme.colors.surface.secondary,
        border: `1px solid ${athleticTechTheme.colors.interactive.border}`
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle 
              className="text-lg mb-2"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {plan.name}
            </CardTitle>
            <p 
              className="text-sm mb-3"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              {plan.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge 
                style={{ 
                  backgroundColor: `${phases.find(p => p.value === plan.phase)?.color}20`,
                  color: phases.find(p => p.value === plan.phase)?.color
                }}
              >
                {phases.find(p => p.value === plan.phase)?.label}
              </Badge>
              <Badge 
                style={{ 
                  backgroundColor: `${events.find(e => e.value === plan.targetEvent)?.color}20`,
                  color: events.find(e => e.value === plan.targetEvent)?.color
                }}
              >
                {events.find(e => e.value === plan.targetEvent)?.label}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <Clock 
              size={20} 
              style={{ color: athleticTechTheme.colors.primary.track }}
              className="mx-auto mb-1"
            />
            <p 
              className="text-sm font-medium"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {plan.duration} weeks
            </p>
          </div>
          <div className="text-center">
            <Activity 
              size={20} 
              style={{ color: athleticTechTheme.colors.primary.field }}
              className="mx-auto mb-1"
            />
            <p 
              className="text-sm font-medium"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {plan.sessions.length} sessions
            </p>
          </div>
          <div className="text-center">
            <Users 
              size={20} 
              style={{ color: athleticTechTheme.colors.primary.power }}
              className="mx-auto mb-1"
            />
            <p 
              className="text-sm font-medium"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {plan.assignedAthletes.length} athletes
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            className="flex-1"
            onClick={() => setSelectedPlan(plan)}
            style={{
              backgroundColor: athleticTechTheme.colors.primary.track,
              color: athleticTechTheme.colors.text.inverse
            }}
          >
            View Details
          </Button>
          {isCoach && (
            <Button 
              variant="outline"
              style={{
                borderColor: athleticTechTheme.colors.interactive.border,
                color: athleticTechTheme.colors.text.primary
              }}
            >
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const addSession = () => {
    const newSession: TrainingSession = {
      id: Date.now().toString(),
      name: `Session ${(newPlan.sessions?.length || 0) + 1}`,
      type: 'track',
      duration: 60,
      intensity: 'medium',
      exercises: []
    };
    setNewPlan({ 
      ...newPlan, 
      sessions: [...(newPlan.sessions || []), newSession] 
    });
  };

  const addExercise = (sessionId: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: 'New Exercise',
      sets: 3,
      reps: 10
    };
    
    setNewPlan({
      ...newPlan,
      sessions: newPlan.sessions?.map(session => 
        session.id === sessionId 
          ? { ...session, exercises: [...session.exercises, newExercise] }
          : session
      ) || []
    });
  };

  const updateSession = (sessionId: string, updates: Partial<TrainingSession>) => {
    setNewPlan({
      ...newPlan,
      sessions: newPlan.sessions?.map(session => 
        session.id === sessionId ? { ...session, ...updates } : session
      ) || []
    });
  };

  const updateExercise = (sessionId: string, exerciseId: string, updates: Partial<Exercise>) => {
    setNewPlan({
      ...newPlan,
      sessions: newPlan.sessions?.map(session => 
        session.id === sessionId 
          ? {
              ...session,
              exercises: session.exercises.map(exercise => 
                exercise.id === exerciseId ? { ...exercise, ...updates } : exercise
              )
            }
          : session
      ) || []
    });
  };

  const removeSession = (sessionId: string) => {
    setNewPlan({
      ...newPlan,
      sessions: newPlan.sessions?.filter(session => session.id !== sessionId) || []
    });
  };

  const removeExercise = (sessionId: string, exerciseId: string) => {
    setNewPlan({
      ...newPlan,
      sessions: newPlan.sessions?.map(session => 
        session.id === sessionId 
          ? {
              ...session,
              exercises: session.exercises.filter(exercise => exercise.id !== exerciseId)
            }
          : session
      ) || []
    });
  };

  const renderCreateForm = () => (
    <div className="space-y-6">
      {/* Basic Plan Info */}
      <Card style={{ 
        backgroundColor: athleticTechTheme.colors.surface.secondary,
        border: `1px solid ${athleticTechTheme.colors.interactive.border}`
      }}>
        <CardHeader>
          <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
            Plan Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: athleticTechTheme.colors.text.primary }}
              >
                Plan Name
              </label>
              <Input 
                placeholder="e.g., Sprint Development Phase 1"
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
              />
            </div>
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: athleticTechTheme.colors.text.primary }}
              >
                Duration (weeks)
              </label>
              <Input 
                type="number"
                min="1"
                max="52"
                value={newPlan.duration}
                onChange={(e) => setNewPlan({ ...newPlan, duration: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              Description
            </label>
            <Textarea 
              placeholder="Describe the training plan objectives and focus areas..."
              value={newPlan.description}
              onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: athleticTechTheme.colors.text.primary }}
              >
                Training Phase
              </label>
              <Select value={newPlan.phase} onValueChange={(value) => setNewPlan({ ...newPlan, phase: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent>
                  {phases.map((phase) => (
                    <SelectItem key={phase.value} value={phase.value}>
                      {phase.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: athleticTechTheme.colors.text.primary }}
              >
                Target Event
              </label>
              <Select value={newPlan.targetEvent} onValueChange={(value) => setNewPlan({ ...newPlan, targetEvent: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.value} value={event.value}>
                      {event.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Sessions */}
      <Card style={{ 
        backgroundColor: athleticTechTheme.colors.surface.secondary,
        border: `1px solid ${athleticTechTheme.colors.interactive.border}`
      }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
              Training Sessions
            </CardTitle>
            <Button
              onClick={addSession}
              size="sm"
              style={{
                backgroundColor: athleticTechTheme.colors.primary.field,
                color: athleticTechTheme.colors.text.inverse
              }}
            >
              <Plus size={16} className="mr-2" />
              Add Session
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {newPlan.sessions?.length === 0 ? (
            <div className="text-center py-8">
              <Activity 
                size={48} 
                style={{ color: athleticTechTheme.colors.text.secondary }}
                className="mx-auto mb-4"
              />
              <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                No sessions added yet. Click "Add Session" to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {newPlan.sessions?.map((session, sessionIndex) => (
                <Card 
                  key={session.id}
                  style={{ 
                    backgroundColor: athleticTechTheme.colors.surface.elevated,
                    border: `1px solid ${athleticTechTheme.colors.interactive.border}`
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <Input 
                          placeholder="Session name"
                          value={session.name}
                          onChange={(e) => updateSession(session.id, { name: e.target.value })}
                        />
                        <Select 
                          value={session.type} 
                          onValueChange={(value: any) => updateSession(session.id, { type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="track">Track Work</SelectItem>
                            <SelectItem value="weights">Weight Training</SelectItem>
                            <SelectItem value="recovery">Recovery</SelectItem>
                            <SelectItem value="technique">Technique</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select 
                          value={session.intensity} 
                          onValueChange={(value: any) => updateSession(session.id, { intensity: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="max">Max</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSession(session.id)}
                        style={{
                          borderColor: athleticTechTheme.colors.performance.poor,
                          color: athleticTechTheme.colors.performance.poor
                        }}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 
                          className="font-medium"
                          style={{ color: athleticTechTheme.colors.text.primary }}
                        >
                          Exercises
                        </h4>
                        <Button
                          onClick={() => addExercise(session.id)}
                          size="sm"
                          variant="outline"
                          style={{
                            borderColor: athleticTechTheme.colors.primary.track,
                            color: athleticTechTheme.colors.primary.track
                          }}
                        >
                          <Plus size={14} className="mr-1" />
                          Add Exercise
                        </Button>
                      </div>
                      
                      {session.exercises.map((exercise, exerciseIndex) => (
                        <div 
                          key={exercise.id}
                          className="flex items-center space-x-3 p-3 rounded-lg"
                          style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                        >
                          <Input 
                            placeholder="Exercise name"
                            value={exercise.name}
                            onChange={(e) => updateExercise(session.id, exercise.id, { name: e.target.value })}
                            className="flex-1"
                          />
                          {session.type === 'track' ? (
                            <>
                              <Input 
                                placeholder="Distance"
                                value={exercise.distance || ''}
                                onChange={(e) => updateExercise(session.id, exercise.id, { distance: e.target.value })}
                                className="w-24"
                              />
                              <Input 
                                type="number"
                                placeholder="Sets"
                                value={exercise.sets || ''}
                                onChange={(e) => updateExercise(session.id, exercise.id, { sets: parseInt(e.target.value) })}
                                className="w-20"
                              />
                            </>
                          ) : (
                            <>
                              <Input 
                                type="number"
                                placeholder="Sets"
                                value={exercise.sets || ''}
                                onChange={(e) => updateExercise(session.id, exercise.id, { sets: parseInt(e.target.value) })}
                                className="w-20"
                              />
                              <Input 
                                type="number"
                                placeholder="Reps"
                                value={exercise.reps || ''}
                                onChange={(e) => updateExercise(session.id, exercise.id, { reps: parseInt(e.target.value) })}
                                className="w-20"
                              />
                              <Input 
                                placeholder="Weight"
                                value={exercise.weight || ''}
                                onChange={(e) => updateExercise(session.id, exercise.id, { weight: e.target.value })}
                                className="w-24"
                              />
                            </>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeExercise(session.id, exercise.id)}
                            style={{
                              borderColor: athleticTechTheme.colors.performance.poor,
                              color: athleticTechTheme.colors.performance.poor
                            }}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-3">
        <Button 
          variant="outline" 
          onClick={onClose}
          style={{
            borderColor: athleticTechTheme.colors.interactive.border,
            color: athleticTechTheme.colors.text.primary
          }}
        >
          Cancel
        </Button>
        <Button 
          style={{
            backgroundColor: athleticTechTheme.colors.primary.track,
            color: athleticTechTheme.colors.text.inverse
          }}
        >
          Create Plan
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
      >
        <DialogHeader>
          <DialogTitle 
            className="text-2xl font-bold"
            style={{ color: athleticTechTheme.colors.text.primary }}
          >
            {isCoach ? 'Training Plan Management' : 'My Training Plans'}
          </DialogTitle>
        </DialogHeader>

        {isCoach && (
          <div className="flex space-x-2 mb-6">
            <Button
              variant={activeTab === 'view' ? 'default' : 'outline'}
              onClick={() => setActiveTab('view')}
              style={{
                backgroundColor: activeTab === 'view' ? athleticTechTheme.colors.primary.track : 'transparent',
                color: activeTab === 'view' ? athleticTechTheme.colors.text.inverse : athleticTechTheme.colors.text.primary,
                borderColor: athleticTechTheme.colors.interactive.border
              }}
            >
              View Plans
            </Button>
            <Button
              variant={activeTab === 'create' ? 'default' : 'outline'}
              onClick={() => setActiveTab('create')}
              style={{
                backgroundColor: activeTab === 'create' ? athleticTechTheme.colors.primary.track : 'transparent',
                color: activeTab === 'create' ? athleticTechTheme.colors.text.inverse : athleticTechTheme.colors.text.primary,
                borderColor: athleticTechTheme.colors.interactive.border
              }}
            >
              <Plus size={16} className="mr-2" />
              Create New
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {selectedPlan ? (
            <div className="space-y-6">
              {/* Header with back button */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPlan(null)}
                  style={{
                    borderColor: athleticTechTheme.colors.interactive.border,
                    color: athleticTechTheme.colors.text.primary
                  }}
                >
                  ← Back to Plans
                </Button>
                <div>
                  <h2 
                    className="text-xl font-bold"
                    style={{ color: athleticTechTheme.colors.text.primary }}
                  >
                    {selectedPlan.name}
                  </h2>
                  <p 
                    className="text-sm"
                    style={{ color: athleticTechTheme.colors.text.secondary }}
                  >
                    {selectedPlan.description}
                  </p>
                </div>
              </div>

              {/* Training Sessions */}
              <div className="space-y-4">
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: athleticTechTheme.colors.text.primary }}
                >
                  Training Sessions ({selectedPlan.sessions.length})
                </h3>
                
                {selectedPlan.sessions.map((session, sessionIndex) => (
                  <Card 
                    key={session.id}
                    style={{ 
                      backgroundColor: athleticTechTheme.colors.surface.secondary,
                      border: `1px solid ${athleticTechTheme.colors.interactive.border}`
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle 
                            className="text-lg"
                            style={{ color: athleticTechTheme.colors.text.primary }}
                          >
                            Session {sessionIndex + 1}: {session.name}
                          </CardTitle>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge 
                              style={{ 
                                backgroundColor: `${athleticTechTheme.colors.events.sprints}20`,
                                color: athleticTechTheme.colors.events.sprints
                              }}
                            >
                              {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                            </Badge>
                            <Badge 
                              style={{ 
                                backgroundColor: `${session.intensity === 'high' ? athleticTechTheme.colors.performance.poor : session.intensity === 'medium' ? athleticTechTheme.colors.performance.average : athleticTechTheme.colors.performance.good}20`,
                                color: session.intensity === 'high' ? athleticTechTheme.colors.performance.poor : session.intensity === 'medium' ? athleticTechTheme.colors.performance.average : athleticTechTheme.colors.performance.good
                              }}
                            >
                              {session.intensity.charAt(0).toUpperCase() + session.intensity.slice(1)} Intensity
                            </Badge>
                            <span 
                              className="text-sm"
                              style={{ color: athleticTechTheme.colors.text.secondary }}
                            >
                              {session.duration} minutes
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h5 
                          className="font-medium"
                          style={{ color: athleticTechTheme.colors.text.primary }}
                        >
                          Exercises ({session.exercises.length})
                        </h5>
                        
                        {session.exercises.map((exercise, exerciseIndex) => (
                          <div 
                            key={exercise.id}
                            className="flex items-center justify-between p-3 rounded-lg"
                            style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                          >
                            <div className="flex-1">
                              <p 
                                className="font-medium"
                                style={{ color: athleticTechTheme.colors.text.primary }}
                              >
                                {exerciseIndex + 1}. {exercise.name}
                              </p>
                              <div className="flex items-center space-x-4 mt-1 text-sm">
                                {exercise.sets && (
                                  <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                                    {exercise.sets} sets
                                  </span>
                                )}
                                {exercise.reps && (
                                  <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                                    {exercise.reps} reps
                                  </span>
                                )}
                                {exercise.distance && (
                                  <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                                    {exercise.distance}
                                  </span>
                                )}
                                {exercise.weight && (
                                  <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                                    {exercise.weight}
                                  </span>
                                )}
                                {exercise.duration && (
                                  <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                                    {exercise.duration}s hold
                                  </span>
                                )}
                                {exercise.restTime && exercise.restTime > 0 && (
                                  <span style={{ color: athleticTechTheme.colors.performance.recovery }}>
                                    Rest: {exercise.restTime}s
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {!isCoach && (
                              <Button
                                size="sm"
                                variant="outline"
                                style={{
                                  borderColor: athleticTechTheme.colors.performance.excellent,
                                  color: athleticTechTheme.colors.performance.excellent
                                }}
                              >
                                ✓ Complete
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {!isCoach && (
                        <div className="mt-4 pt-4 border-t" style={{ borderColor: athleticTechTheme.colors.interactive.border }}>
                          <div className="flex space-x-3">
                            <Button
                              className="flex-1"
                              style={{
                                backgroundColor: athleticTechTheme.colors.performance.excellent,
                                color: athleticTechTheme.colors.text.inverse
                              }}
                            >
                              Mark Session Complete
                            </Button>
                            <Button
                              variant="outline"
                              style={{
                                borderColor: athleticTechTheme.colors.primary.field,
                                color: athleticTechTheme.colors.primary.field
                              }}
                            >
                              Add Notes
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : isCoach && activeTab === 'create' ? (
            renderCreateForm()
          ) : (
            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: athleticTechTheme.colors.text.primary }}
              >
                {isCoach ? 'Active Training Plans' : 'Your Assigned Plans'}
              </h3>
              {existingPlans.map(renderPlanCard)}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
