import React from 'react';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { LucideProps } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
  color: string;
  gradient: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  gradient,
  onClick,
  disabled = false,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-6 rounded-xl text-left transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      style={{
        backgroundColor: athleticTechTheme.colors.surface.secondary,
        border: `1px solid ${athleticTechTheme.colors.interactive.border}`,
        boxShadow: athleticTechTheme.shadows.md
      }}
    >
      <div className="flex items-center space-x-4 mb-3">
        <div 
          className="p-3 rounded-xl"
          style={{
            background: gradient,
            boxShadow: `0 4px 12px ${color}30`
          }}
        >
          <Icon 
            size={24} 
            style={{ color: athleticTechTheme.colors.text.inverse }}
          />
        </div>
        <div className="flex-1">
          <h3 
            className="font-bold text-lg mb-1"
            style={{ color: athleticTechTheme.colors.text.primary }}
          >
            {title}
          </h3>
          <p 
            className="text-sm"
            style={{ color: athleticTechTheme.colors.text.secondary }}
          >
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default ActionCard;
