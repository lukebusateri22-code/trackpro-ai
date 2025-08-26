import React, { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import HomeScreen from './screens/HomeScreen';
import TrainingScreen from './screens/TrainingScreen';
import RecoveryScreen from './screens/RecoveryScreen';
import GoalsScreen from './screens/GoalsScreen';
import ProfileScreen from './screens/ProfileScreen';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'training': return <TrainingScreen />;
      case 'recovery': return <RecoveryScreen />;
      case 'goals': return <GoalsScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'home': return 'TrackPro';
      case 'training': return 'Training';
      case 'recovery': return 'Recovery';
      case 'goals': return 'Goals';
      case 'profile': return 'Profile';
      default: return 'TrackPro';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title={getTitle()} showSettings />
      <div className="flex-1 p-4 pb-20">
        {renderScreen()}
      </div>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default AppLayout;
