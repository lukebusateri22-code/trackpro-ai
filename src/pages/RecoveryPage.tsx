import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import RecoveryScreen from '@/components/screens/RecoveryScreen';
import athleticTechTheme from '@/lib/athleticTechTheme';

const RecoveryPage: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
    >
      <Header title="Recovery" showSettings />
      <div className="flex-1 p-4 pb-20">
        <RecoveryScreen />
      </div>
      <Navigation activeTab="recovery" />
    </div>
  );
};

export default RecoveryPage;
