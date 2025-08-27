import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import ProfileScreen from '@/components/screens/ProfileScreen';
import athleticTechTheme from '@/lib/athleticTechTheme';

const ProfilePage: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
    >
      <Header title="Profile" showSettings />
      <div className="flex-1 p-4 pb-20">
        <ProfileScreen />
      </div>
      <Navigation activeTab="profile" />
    </div>
  );
};

export default ProfilePage;
