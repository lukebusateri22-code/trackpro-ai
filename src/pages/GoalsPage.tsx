import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import GoalsScreen from '@/components/screens/GoalsScreen';
import athleticTechTheme from '@/lib/athleticTechTheme';

const GoalsPage: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
    >
      <Header title="Goals" showSettings />
      <div className="flex-1 p-4 pb-20">
        <GoalsScreen />
      </div>
      <Navigation activeTab="goals" />
    </div>
  );
};

export default GoalsPage;
