import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import TrainingScreen from '@/components/screens/TrainingScreen';
import athleticTechTheme from '@/lib/athleticTechTheme';

const TrainingPage: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
    >
      <Header title="Training" showSettings />
      <div className="flex-1 p-4 pb-20">
        <TrainingScreen />
      </div>
      <Navigation activeTab="training" />
    </div>
  );
};

export default TrainingPage;
