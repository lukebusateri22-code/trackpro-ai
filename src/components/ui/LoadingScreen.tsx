import React from 'react';
import { Loader2, Zap } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading TrackPro AI...', 
  fullScreen = true 
}) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 z-50 flex items-center justify-center'
    : 'flex items-center justify-center p-8';

  return (
    <div 
      className={containerClass}
      style={{ 
        background: fullScreen ? athleticTechTheme.gradients.hero : 'transparent'
      }}
    >
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"
            style={{ backgroundColor: `${athleticTechTheme.colors.primary.track}20` }}
          >
            <Zap 
              className="w-10 h-10 animate-bounce" 
              style={{ color: athleticTechTheme.colors.primary.track }}
            />
          </div>
          
          {/* Spinning Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 
              className="w-24 h-24 animate-spin opacity-30" 
              style={{ color: athleticTechTheme.colors.primary.power }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-2">
          TrackPro AI
        </h2>
        <p className="text-white/80 text-lg mb-6">
          {message}
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ 
                backgroundColor: athleticTechTheme.colors.primary.track,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>

        {/* Subtle Branding */}
        <p className="text-white/50 text-sm mt-8">
          Elevating athletic performance through technology
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
