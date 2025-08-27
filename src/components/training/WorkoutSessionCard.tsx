import React from 'react';
import { TrainingSession } from '@/types/coach-athlete';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { 
  Clock, 
  Zap, 
  Dumbbell, 
  Activity, 
  Heart, 
  CheckCircle, 
  Play, 
  Upload,
  MessageSquare
} from 'lucide-react';

interface WorkoutSessionCardProps {
  session: TrainingSession;
  isCoach: boolean;
  onComplete?: (sessionId: string) => void;
  onUploadVideo?: (sessionId: string) => void;
  onAddNotes?: (sessionId: string, notes: string) => void;
}

const WorkoutSessionCard: React.FC<WorkoutSessionCardProps> = ({
  session,
  isCoach,
  onComplete,
  onUploadVideo,
  onAddNotes
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'track': return <Activity size={20} />;
      case 'weights': return <Dumbbell size={20} />;
      case 'recovery': return <Heart size={20} />;
      default: return <Zap size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'track': return athleticTechTheme.colors.events.sprints;
      case 'weights': return athleticTechTheme.colors.events.weights;
      case 'recovery': return athleticTechTheme.colors.performance.recovery;
      case 'technique': return athleticTechTheme.colors.primary.field;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'low': return athleticTechTheme.colors.performance.good;
      case 'moderate': return athleticTechTheme.colors.events.jumps;
      case 'high': return athleticTechTheme.colors.events.sprints;
      case 'max': return athleticTechTheme.colors.primary.power;
      default: return athleticTechTheme.colors.text.muted;
    }
  };

  const completedExercises = session.exercises.filter(e => e.completed).length;
  const totalExercises = session.exercises.length;

  return (
    <div
      className="rounded-xl p-6 border transition-all duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: session.completed 
          ? athleticTechTheme.colors.surface.elevated 
          : athleticTechTheme.colors.surface.secondary,
        borderColor: session.completed 
          ? athleticTechTheme.colors.performance.completed 
          : athleticTechTheme.colors.interactive.border,
        boxShadow: session.completed 
          ? athleticTechTheme.shadows.glow 
          : athleticTechTheme.shadows.card
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div
            className="p-3 rounded-full"
            style={{
              backgroundColor: `${getTypeColor(session.type)}20`,
              color: getTypeColor(session.type)
            }}
          >
            {getTypeIcon(session.type)}
          </div>
          
          <div className="flex-1">
            <h3 
              className="text-lg font-bold mb-1"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              {session.name}
            </h3>
            <p 
              className="text-sm opacity-80"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              {session.description}
            </p>
            
            {/* Session Details */}
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Clock size={14} style={{ color: athleticTechTheme.colors.text.muted }} />
                <span 
                  className="text-xs"
                  style={{ color: athleticTechTheme.colors.text.muted }}
                >
                  {session.duration} min
                </span>
              </div>
              
              <div 
                className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${getIntensityColor(session.intensity)}20`,
                  color: getIntensityColor(session.intensity)
                }}
              >
                <Zap size={12} />
                <span className="capitalize">{session.intensity}</span>
              </div>
            </div>
          </div>
        </div>
        
        {session.completed && (
          <div 
            className="flex items-center space-x-1 text-sm font-medium"
            style={{ color: athleticTechTheme.colors.performance.completed }}
          >
            <CheckCircle size={16} />
            <span>Completed</span>
          </div>
        )}
      </div>

      {/* Exercise Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span 
            className="text-sm font-medium"
            style={{ color: athleticTechTheme.colors.text.secondary }}
          >
            Exercises
          </span>
          <span 
            className="text-sm font-bold"
            style={{ color: athleticTechTheme.colors.primary.field }}
          >
            {completedExercises}/{totalExercises}
          </span>
        </div>
        
        <div 
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: athleticTechTheme.colors.surface.accent }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0}%`,
              backgroundColor: getTypeColor(session.type)
            }}
          />
        </div>
      </div>

      {/* Exercise List Preview */}
      <div className="mb-4">
        <div className="space-y-2">
          {session.exercises.slice(0, 3).map((exercise, index) => (
            <div 
              key={exercise.id}
              className="flex items-center justify-between p-2 rounded-lg"
              style={{ backgroundColor: athleticTechTheme.colors.surface.accent }}
            >
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${exercise.completed ? 'opacity-100' : 'opacity-30'}`}
                  style={{ backgroundColor: getTypeColor(session.type) }}
                />
                <span 
                  className="text-sm"
                  style={{ color: athleticTechTheme.colors.text.secondary }}
                >
                  {exercise.name}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-xs">
                {exercise.sets && (
                  <span style={{ color: athleticTechTheme.colors.text.muted }}>
                    {exercise.sets} sets
                  </span>
                )}
                {exercise.reps && (
                  <span style={{ color: athleticTechTheme.colors.text.muted }}>
                    {exercise.reps} reps
                  </span>
                )}
                {exercise.weight && (
                  <span style={{ color: athleticTechTheme.colors.text.muted }}>
                    {exercise.weight}kg
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {session.exercises.length > 3 && (
            <div 
              className="text-center text-xs py-1"
              style={{ color: athleticTechTheme.colors.text.muted }}
            >
              +{session.exercises.length - 3} more exercises
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {(session.athleteNotes || session.coachNotes) && (
        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.accent }}>
          {session.athleteNotes && (
            <div className="mb-2">
              <p className="text-xs font-medium mb-1" style={{ color: athleticTechTheme.colors.roles.athlete }}>
                Athlete Notes:
              </p>
              <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                {session.athleteNotes}
              </p>
            </div>
          )}
          {session.coachNotes && (
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: athleticTechTheme.colors.roles.coach }}>
                Coach Notes:
              </p>
              <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                {session.coachNotes}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {!session.completed && !isCoach && onComplete && (
          <button
            className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
            style={{
              backgroundColor: athleticTechTheme.colors.performance.excellent,
              color: athleticTechTheme.colors.text.primary
            }}
            onClick={() => onComplete(session.id)}
          >
            <Play size={16} />
            <span>Start Workout</span>
          </button>
        )}
        
        {onUploadVideo && (
          <button
            className="py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2 border"
            style={{
              backgroundColor: 'transparent',
              borderColor: athleticTechTheme.colors.primary.field,
              color: athleticTechTheme.colors.primary.field
            }}
            onClick={() => onUploadVideo(session.id)}
          >
            <Upload size={16} />
            <span>Upload Video</span>
          </button>
        )}
        
        {onAddNotes && (
          <button
            className="py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2 border"
            style={{
              backgroundColor: 'transparent',
              borderColor: athleticTechTheme.colors.text.muted,
              color: athleticTechTheme.colors.text.muted
            }}
            onClick={() => {
              const notes = prompt(isCoach ? 'Add coach notes:' : 'Add athlete notes:');
              if (notes) onAddNotes(session.id, notes);
            }}
          >
            <MessageSquare size={16} />
            <span>Notes</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkoutSessionCard;
