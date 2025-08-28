import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  gradient,
  onClick,
  disabled = false,
  badge
}) => {
  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 overflow-hidden ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={disabled ? undefined : onClick}
    >
      <div 
        className="h-32 flex items-center justify-center relative"
        style={{ background: gradient }}
      >
        {badge && (
          <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-xs font-medium text-white">{badge}</span>
          </div>
        )}
        <Icon className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      <CardContent className="p-6" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <h3 className="font-bold text-lg mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: athleticTechTheme.colors.text.secondary }}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
