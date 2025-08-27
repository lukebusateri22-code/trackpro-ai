import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import HomeScreen from '@/components/screens/HomeScreen';
import athleticTechTheme from '@/lib/athleticTechTheme';

const HomePage: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
    >
      <Header title="TrackPro AI" />
      <div className="flex-1 p-4 pb-20">
        <HomeScreen />
      </div>
      <Navigation />
    </div>
  );
};

export default HomePage;
