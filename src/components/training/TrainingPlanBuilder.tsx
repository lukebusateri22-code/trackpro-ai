import React, { useState } from 'react';
import { TrainingPlan, TrainingSession, Exercise } from '@/types/coach-athlete';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { 
  Plus, 
  X, 
  Calendar, 
  Target, 
  Clock,
  Zap,
  Dumbbell,
  Activity,
  Heart,
  Save,
  Users
} from 'lucide-react';

interface TrainingPlanBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: Partial<TrainingPlan>) => void;
  editingPlan?: TrainingPlan;
}

const TrainingPlanBuilder: React.FC<TrainingPlanBuilderProps> = ({
  isOpen,
  onClose,
  onSave,
  editingPlan
}) => {
  const [planData, setPlanData] = useState<Partial<TrainingPlan>>({
    name: editingPlan?.name || '',
    description: editingPlan?.description || '',
    startDate: editingPlan?.startDate || new Date().toISOString().split('T')[0],
    endDate: editingPlan?.endDate || '',
    phase: editingPlan?.phase || 'base',
    goals: editingPlan?.goals || [],
    sessions: editingPlan?.sessions || []
  });

  const [newGoal, setNewGoal] = useState('');
  const [activeSessionIndex, setActiveSessionIndex] = useState<number | null>(null);

  const phases = [
    { value: 'base', label: 'Base Building', color: athleticTechTheme.colors.performance.good },
    { value: 'build', label: 'Build Phase', color: athleticTechTheme.colors.primary.field },
    { value: 'peak', label: 'Peak Phase', color: athleticTechTheme.colors.primary.power },
    { value: 'recovery', label: 'Recovery', color: athleticTechTheme.colors.performance.recovery }
  ];

  const sessionTypes = [
    { value: 'track', label: 'Track Work', icon: Activity, color: athleticTechTheme.colors.events.sprints },
    { value: 'weights', label: 'Weight Training', icon: Dumbbell, color: athleticTechTheme.colors.events.weights },
    { value: 'recovery', label: 'Recovery', icon: Heart, color: athleticTechTheme.colors.performance.recovery },
    { value: 'technique', label: 'Technique', icon: Target, color: athleticTechTheme.colors.primary.field }
  ];

  const intensityLevels = [
    { value: 'low', label: 'Low', color: athleticTechTheme.colors.performance.good },
    { value: 'moderate', label: 'Moderate', color: athleticTechTheme.colors.events.jumps },
    { value: 'high', label: 'High', color: athleticTechTheme.colors.events.sprints },
    { value: 'max', label: 'Maximum', color: athleticTechTheme.colors.primary.power }
  ];

  const addGoal = () => {
    if (newGoal.trim()) {
      setPlanData(prev => ({
        ...prev,
        goals: [...(prev.goals || []), newGoal.trim()]
      }));
      setNewGoal('');
    }
  };

  const removeGoal = (index: number) => {
    setPlanData(prev => ({
      ...prev,
      goals: prev.goals?.filter((_, i) => i !== index) || []
    }));
  };

  const addSession = () => {
    const newSession: TrainingSession = {
      id: `session-${Date.now()}`,
      planId: '',
      date: new Date().toISOString().split('T')[0],
      type: 'track',
      name: 'New Session',
      exercises: [],
      duration: 60,
      intensity: 'moderate',
      completed: false,
      videoUploads: []
    };

    setPlanData(prev => ({
      ...prev,
      sessions: [...(prev.sessions || []), newSession]
    }));
  };

  const updateSession = (index: number, updates: Partial<TrainingSession>) => {
    setPlanData(prev => ({
      ...prev,
      sessions: prev.sessions?.map((session, i) => 
        i === index ? { ...session, ...updates } : session
      ) || []
    }));
  };

  const removeSession = (index: number) => {
    setPlanData(prev => ({
      ...prev,
      sessions: prev.sessions?.filter((_, i) => i !== index) || []
    }));
  };

  const addExercise = (sessionIndex: number) => {
    const newExercise: Exercise = {
      id: `exercise-${Date.now()}`,
      name: 'New Exercise',
      type: 'track',
      category: 'sprints',
      completed: false
    };

    setPlanData(prev => ({
      ...prev,
      sessions: prev.sessions?.map((session, i) => 
        i === sessionIndex 
          ? { ...session, exercises: [...session.exercises, newExercise] }
          : session
      ) || []
    }));
  };

  const updateExercise = (sessionIndex: number, exerciseIndex: number, updates: Partial<Exercise>) => {
    setPlanData(prev => ({
      ...prev,
      sessions: prev.sessions?.map((session, i) => 
        i === sessionIndex 
          ? {
              ...session,
              exercises: session.exercises.map((exercise, j) =>
                j === exerciseIndex ? { ...exercise, ...updates } : exercise
              )
            }
          : session
      ) || []
    }));
  };

  const handleSave = () => {
    onSave(planData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl"
        style={{
          backgroundColor: athleticTechTheme.colors.surface.primary,
          border: `1px solid ${athleticTechTheme.colors.interactive.border}`
        }}
      >
        {/* Header */}
        <div 
          className="sticky top-0 p-6 border-b"
          style={{
            backgroundColor: athleticTechTheme.colors.surface.primary,
            borderColor: athleticTechTheme.colors.interactive.border
          }}
        >
          <div className="flex items-center justify-between">
            <h2 
              className="text-2xl font-bold"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {editingPlan ? 'Edit Training Plan' : 'Create Training Plan'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: athleticTechTheme.colors.surface.secondary,
                color: athleticTechTheme.colors.text.secondary
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: athleticTechTheme.colors.text.secondary }}
              >
                Plan Name
              </label>
              <input
                type="text"
                value={planData.name}
                onChange={(e) => setPlanData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border bg-transparent"
                style={{
                  backgroundColor: athleticTechTheme.colors.surface.secondary,
                  borderColor: athleticTechTheme.colors.interactive.border,
                  color: athleticTechTheme.colors.text.primary
                }}
                placeholder="e.g., Sprint Development Program"
              />
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: athleticTechTheme.colors.text.secondary }}
              >
                Phase
              </label>
              <select
                value={planData.phase}
                onChange={(e) => setPlanData(prev => ({ ...prev, phase: e.target.value as any }))}
                className="w-full px-4 py-2 rounded-lg border bg-transparent"
                style={{
                  backgroundColor: athleticTechTheme.colors.surface.secondary,
                  borderColor: athleticTechTheme.colors.interactive.border,
                  color: athleticTechTheme.colors.text.primary
                }}
              >
                {phases.map(phase => (
                  <option key={phase.value} value={phase.value}>
                    {phase.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Description
            </label>
            <textarea
              value={planData.description}
              onChange={(e) => setPlanData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border bg-transparent"
              style={{
                backgroundColor: athleticTechTheme.colors.surface.secondary,
                borderColor: athleticTechTheme.colors.interactive.border,
                color: athleticTechTheme.colors.text.primary
              }}
              placeholder="Describe the training plan objectives and focus areas..."
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: athleticTechTheme.colors.text.secondary }}
              >
                Start Date
              </label>
              <input
                type="date"
                value={planData.startDate}
                onChange={(e) => setPlanData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border bg-transparent"
                style={{
                  backgroundColor: athleticTechTheme.colors.surface.secondary,
                  borderColor: athleticTechTheme.colors.interactive.border,
                  color: athleticTechTheme.colors.text.primary
                }}
              />
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: athleticTechTheme.colors.text.secondary }}
              >
                End Date
              </label>
              <input
                type="date"
                value={planData.endDate}
                onChange={(e) => setPlanData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border bg-transparent"
                style={{
                  backgroundColor: athleticTechTheme.colors.surface.secondary,
                  borderColor: athleticTechTheme.colors.interactive.border,
                  color: athleticTechTheme.colors.text.primary
                }}
              />
            </div>
          </div>

          {/* Goals */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Goals
            </label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                  className="flex-1 px-4 py-2 rounded-lg border bg-transparent"
                  style={{
                    backgroundColor: athleticTechTheme.colors.surface.secondary,
                    borderColor: athleticTechTheme.colors.interactive.border,
                    color: athleticTechTheme.colors.text.primary
                  }}
                  placeholder="Add a goal..."
                />
                <button
                  onClick={addGoal}
                  className="px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: athleticTechTheme.colors.primary.field,
                    color: athleticTechTheme.colors.text.primary
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {planData.goals?.map((goal, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${athleticTechTheme.colors.primary.power}20`,
                      color: athleticTechTheme.colors.primary.power
                    }}
                  >
                    <span className="text-sm">{goal}</span>
                    <button
                      onClick={() => removeGoal(index)}
                      className="hover:scale-110 transition-transform"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sessions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label 
                className="text-sm font-medium"
                style={{ color: athleticTechTheme.colors.text.secondary }}
              >
                Training Sessions
              </label>
              <button
                onClick={addSession}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: athleticTechTheme.colors.roles.coach,
                  color: athleticTechTheme.colors.text.primary
                }}
              >
                <Plus size={16} />
                <span>Add Session</span>
              </button>
            </div>

            <div className="space-y-4">
              {planData.sessions?.map((session, sessionIndex) => (
                <div
                  key={session.id}
                  className="p-4 rounded-xl border"
                  style={{
                    backgroundColor: athleticTechTheme.colors.surface.secondary,
                    borderColor: athleticTechTheme.colors.interactive.border
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="text"
                      value={session.name}
                      onChange={(e) => updateSession(sessionIndex, { name: e.target.value })}
                      className="text-lg font-semibold bg-transparent border-none outline-none"
                      style={{ color: athleticTechTheme.colors.text.primary }}
                    />
                    <button
                      onClick={() => removeSession(sessionIndex)}
                      className="p-1 rounded hover:scale-110 transition-transform"
                      style={{ color: athleticTechTheme.colors.performance.poor }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-xs mb-1" style={{ color: athleticTechTheme.colors.text.muted }}>
                        Type
                      </label>
                      <select
                        value={session.type}
                        onChange={(e) => updateSession(sessionIndex, { type: e.target.value as any })}
                        className="w-full px-2 py-1 rounded border bg-transparent text-sm"
                        style={{
                          backgroundColor: athleticTechTheme.colors.surface.accent,
                          borderColor: athleticTechTheme.colors.interactive.border,
                          color: athleticTechTheme.colors.text.primary
                        }}
                      >
                        {sessionTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs mb-1" style={{ color: athleticTechTheme.colors.text.muted }}>
                        Duration (min)
                      </label>
                      <input
                        type="number"
                        value={session.duration}
                        onChange={(e) => updateSession(sessionIndex, { duration: parseInt(e.target.value) })}
                        className="w-full px-2 py-1 rounded border bg-transparent text-sm"
                        style={{
                          backgroundColor: athleticTechTheme.colors.surface.accent,
                          borderColor: athleticTechTheme.colors.interactive.border,
                          color: athleticTechTheme.colors.text.primary
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs mb-1" style={{ color: athleticTechTheme.colors.text.muted }}>
                        Intensity
                      </label>
                      <select
                        value={session.intensity}
                        onChange={(e) => updateSession(sessionIndex, { intensity: e.target.value as any })}
                        className="w-full px-2 py-1 rounded border bg-transparent text-sm"
                        style={{
                          backgroundColor: athleticTechTheme.colors.surface.accent,
                          borderColor: athleticTechTheme.colors.interactive.border,
                          color: athleticTechTheme.colors.text.primary
                        }}
                      >
                        {intensityLevels.map(level => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs mb-1" style={{ color: athleticTechTheme.colors.text.muted }}>
                        Date
                      </label>
                      <input
                        type="date"
                        value={session.date}
                        onChange={(e) => updateSession(sessionIndex, { date: e.target.value })}
                        className="w-full px-2 py-1 rounded border bg-transparent text-sm"
                        style={{
                          backgroundColor: athleticTechTheme.colors.surface.accent,
                          borderColor: athleticTechTheme.colors.interactive.border,
                          color: athleticTechTheme.colors.text.primary
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => addExercise(sessionIndex)}
                    className="flex items-center space-x-2 px-3 py-1 rounded text-sm transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: `${athleticTechTheme.colors.primary.field}20`,
                      color: athleticTechTheme.colors.primary.field
                    }}
                  >
                    <Plus size={14} />
                    <span>Add Exercise</span>
                  </button>

                  {session.exercises.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {session.exercises.map((exercise, exerciseIndex) => (
                        <div
                          key={exercise.id}
                          className="flex items-center space-x-2 p-2 rounded"
                          style={{ backgroundColor: athleticTechTheme.colors.surface.accent }}
                        >
                          <input
                            type="text"
                            value={exercise.name}
                            onChange={(e) => updateExercise(sessionIndex, exerciseIndex, { name: e.target.value })}
                            className="flex-1 bg-transparent border-none outline-none text-sm"
                            style={{ color: athleticTechTheme.colors.text.primary }}
                          />
                          <div className="flex space-x-2 text-xs">
                            <input
                              type="number"
                              placeholder="Sets"
                              value={exercise.sets || ''}
                              onChange={(e) => updateExercise(sessionIndex, exerciseIndex, { sets: parseInt(e.target.value) || undefined })}
                              className="w-12 px-1 py-1 rounded border bg-transparent"
                              style={{
                                borderColor: athleticTechTheme.colors.interactive.border,
                                color: athleticTechTheme.colors.text.secondary
                              }}
                            />
                            <input
                              type="number"
                              placeholder="Reps"
                              value={exercise.reps || ''}
                              onChange={(e) => updateExercise(sessionIndex, exerciseIndex, { reps: parseInt(e.target.value) || undefined })}
                              className="w-12 px-1 py-1 rounded border bg-transparent"
                              style={{
                                borderColor: athleticTechTheme.colors.interactive.border,
                                color: athleticTechTheme.colors.text.secondary
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="sticky bottom-0 p-6 border-t"
          style={{
            backgroundColor: athleticTechTheme.colors.surface.primary,
            borderColor: athleticTechTheme.colors.interactive.border
          }}
        >
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: athleticTechTheme.colors.surface.secondary,
                color: athleticTechTheme.colors.text.secondary
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: athleticTechTheme.colors.roles.coach,
                color: athleticTechTheme.colors.text.primary
              }}
            >
              <Save size={16} />
              <span>{editingPlan ? 'Update Plan' : 'Create Plan'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlanBuilder;
