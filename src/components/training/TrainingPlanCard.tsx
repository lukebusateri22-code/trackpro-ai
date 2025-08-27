import React from 'react';
import { TrainingPlan } from '@/types/coach-athlete';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { Calendar, Clock, Target, User, CheckCircle, Play, Pause } from 'lucide-react';

interface TrainingPlanCardProps {
  plan: TrainingPlan;
  isCoach: boolean;
  onView: (plan: TrainingPlan) => void;
  onEdit?: (plan: TrainingPlan) => void;
}

const TrainingPlanCard: React.FC<TrainingPlanCardProps> = ({
  plan,
  isCoach,
  onView,
  onEdit
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return athleticTechTheme.colors.performance.excellent;
      case 'completed': return athleticTechTheme.colors.performance.completed;
      case 'paused': return athleticTechTheme.colors.performance.recovery;
      default: return athleticTechTheme.colors.text.muted;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'paused': return <Pause size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const completedSessions = plan.sessions.filter(s => s.completed).length;
  const totalSessions = plan.sessions.length;
  const progressPercentage = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;

  return (
    <div
      className="rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 border"
      style={{
        backgroundColor: athleticTechTheme.colors.surface.secondary,
        borderColor: athleticTechTheme.colors.interactive.border,
        boxShadow: athleticTechTheme.shadows.card
      }}
      onClick={() => onView(plan)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 
            className="text-lg font-bold mb-1"
            style={{ color: athleticTechTheme.colors.text.primary }}
          >
            {plan.name}
          </h3>
          <p 
            className="text-sm opacity-80"
            style={{ color: athleticTechTheme.colors.text.secondary }}
          >
            {plan.description}
          </p>
        </div>
        
        <div 
          className="flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium"
          style={{ 
            backgroundColor: `${getStatusColor(plan.status)}20`,
            color: getStatusColor(plan.status)
          }}
        >
          {getStatusIcon(plan.status)}
          <span className="capitalize">{plan.status}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span 
            className="text-sm font-medium"
            style={{ color: athleticTechTheme.colors.text.secondary }}
          >
            Progress
          </span>
          <span 
            className="text-sm font-bold"
            style={{ color: athleticTechTheme.colors.primary.field }}
          >
            {completedSessions}/{totalSessions} sessions
          </span>
        </div>
        <div 
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: athleticTechTheme.colors.surface.accent }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPercentage}%`,
              background: athleticTechTheme.gradients.performance
            }}
          />
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar 
            size={16} 
            style={{ color: athleticTechTheme.colors.primary.field }}
          />
          <div>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.muted }}
            >
              Duration
            </p>
            <p 
              className="text-sm font-medium"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Target 
            size={16} 
            style={{ color: athleticTechTheme.colors.primary.power }}
          />
          <div>
            <p 
              className="text-xs"
              style={{ color: athleticTechTheme.colors.text.muted }}
            >
              Phase
            </p>
            <p 
              className="text-sm font-medium capitalize"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              {plan.phase}
            </p>
          </div>
        </div>
      </div>

      {/* Goals */}
      {plan.goals.length > 0 && (
        <div className="mb-4">
          <p 
            className="text-xs mb-2"
            style={{ color: athleticTechTheme.colors.text.muted }}
          >
            Goals
          </p>
          <div className="flex flex-wrap gap-2">
            {plan.goals.slice(0, 3).map((goal, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: `${athleticTechTheme.colors.primary.power}20`,
                  color: athleticTechTheme.colors.primary.power
                }}
              >
                {goal}
              </span>
            ))}
            {plan.goals.length > 3 && (
              <span
                className="px-2 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: `${athleticTechTheme.colors.text.muted}20`,
                  color: athleticTechTheme.colors.text.muted
                }}
              >
                +{plan.goals.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: athleticTechTheme.colors.primary.field,
            color: athleticTechTheme.colors.text.primary
          }}
          onClick={(e) => {
            e.stopPropagation();
            onView(plan);
          }}
        >
          View Details
        </button>
        
        {isCoach && onEdit && (
          <button
            className="py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 border"
            style={{
              backgroundColor: 'transparent',
              borderColor: athleticTechTheme.colors.primary.power,
              color: athleticTechTheme.colors.primary.power
            }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(plan);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default TrainingPlanCard;
