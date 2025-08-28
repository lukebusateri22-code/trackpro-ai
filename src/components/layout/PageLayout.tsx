import React from 'react';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { LucideProps } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  headerIcon?: React.ComponentType<LucideProps>;
  headerGradient?: string;
  showStats?: boolean;
  stats?: Array<{
    icon: React.ComponentType<LucideProps>;
    value: string;
    label: string;
    color: string;
  }>;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  headerIcon: HeaderIcon,
  headerGradient = athleticTechTheme.gradients.hero,
  showStats = false,
  stats = []
}) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div 
        className="p-6 rounded-xl"
        style={{
          background: headerGradient,
          color: athleticTechTheme.colors.text.inverse
        }}
      >
        <div className="flex items-center space-x-4">
          {HeaderIcon && (
            <div 
              className="p-3 rounded-xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <HeaderIcon 
                size={32}
                style={{ color: athleticTechTheme.colors.text.inverse }}
              />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {title}
            </h1>
            {subtitle && (
              <p className="opacity-90 text-lg">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {showStats && stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl text-center transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: athleticTechTheme.colors.surface.secondary,
                  border: `1px solid ${athleticTechTheme.colors.interactive.border}`,
                  boxShadow: athleticTechTheme.shadows.sm
                }}
              >
                <StatIcon 
                  size={24} 
                  style={{ color: stat.color }}
                  className="mx-auto mb-2"
                />
                <p 
                  className="text-xl font-bold"
                  style={{ color: athleticTechTheme.colors.text.primary }}
                >
                  {stat.value}
                </p>
                <p 
                  className="text-xs"
                  style={{ color: athleticTechTheme.colors.text.secondary }}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Page Content */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
