import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import PageLayout from '@/components/layout/PageLayout';
import ActionCard from '@/components/ui/ActionCard';
import { useUser } from '@/contexts/UserContext';
import { useAuth } from '@/components/auth/AuthProvider';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { 
  User, 
  Settings, 
  Award, 
  BarChart3, 
  Camera, 
  Edit,
  LogOut,
  Shield
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, isCoach } = useUser();
  const { signOut } = useAuth();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const profileStats = [
    {
      icon: Award,
      value: isCoach ? '12' : '8',
      label: isCoach ? 'Athletes' : 'PRs Set',
      color: athleticTechTheme.colors.performance.excellent
    },
    {
      icon: BarChart3,
      value: isCoach ? '24' : '156',
      label: isCoach ? 'Plans Created' : 'Workouts',
      color: athleticTechTheme.colors.primary.track
    },
    {
      icon: User,
      value: '2.5y',
      label: 'Experience',
      color: athleticTechTheme.colors.primary.power
    },
    {
      icon: Shield,
      value: isCoach ? 'Coach' : 'Athlete',
      label: 'Role',
      color: athleticTechTheme.colors.primary.field
    }
  ];

  const profileActions = [
    {
      title: 'Edit Profile',
      description: 'Update your personal information and preferences',
      icon: Edit,
      color: athleticTechTheme.colors.primary.track,
      gradient: athleticTechTheme.gradients.speed,
      onClick: () => setShowEditProfile(true)
    },
    {
      title: 'Settings',
      description: 'Manage app settings and notifications',
      icon: Settings,
      color: athleticTechTheme.colors.primary.tech,
      gradient: athleticTechTheme.gradients.tech,
      onClick: () => setShowSettings(true)
    },
    {
      title: 'Achievements',
      description: 'View your accomplishments and milestones',
      icon: Award,
      color: athleticTechTheme.colors.performance.excellent,
      gradient: athleticTechTheme.gradients.endurance,
      onClick: () => console.log('Achievements clicked')
    },
    {
      title: 'Statistics',
      description: 'Detailed analytics and performance metrics',
      icon: BarChart3,
      color: athleticTechTheme.colors.primary.power,
      gradient: athleticTechTheme.gradients.power,
      onClick: () => console.log('Statistics clicked')
    }
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
    >
      <Header title="Profile" showSettings />
      <div className="flex-1 p-4 pb-20">
        <PageLayout
          title={user?.username || 'Your Profile'}
          subtitle={`${isCoach ? 'Coach' : 'Athlete'} • Member since ${new Date().getFullYear()}`}
          headerIcon={User}
          headerGradient={athleticTechTheme.gradients.hero}
          showStats={true}
          stats={profileStats}
        >
          {/* Profile Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileActions.map((action, index) => (
              <ActionCard
                key={index}
                title={action.title}
                description={action.description}
                icon={action.icon}
                color={action.color}
                gradient={action.gradient}
                onClick={action.onClick}
              />
            ))}
          </div>

          {/* Profile Information */}
          <div 
            className="p-6 rounded-xl"
            style={{
              backgroundColor: athleticTechTheme.colors.surface.secondary,
              border: `1px solid ${athleticTechTheme.colors.interactive.border}`
            }}
          >
            <h3 
              className="text-lg font-bold mb-4"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              Profile Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span 
                  className="font-medium"
                  style={{ color: athleticTechTheme.colors.text.secondary }}
                >
                  Email
                </span>
                <span 
                  style={{ color: athleticTechTheme.colors.text.primary }}
                >
                  {'demo@trackpro.ai'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span 
                  className="font-medium"
                  style={{ color: athleticTechTheme.colors.text.secondary }}
                >
                  Username
                </span>
                <span 
                  style={{ color: athleticTechTheme.colors.text.primary }}
                >
                  {user?.username || 'demo_user'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span 
                  className="font-medium"
                  style={{ color: athleticTechTheme.colors.text.secondary }}
                >
                  Role
                </span>
                <span 
                  className="px-2 py-1 rounded-md text-sm font-medium"
                  style={{
                    backgroundColor: isCoach ? athleticTechTheme.colors.primary.power : athleticTechTheme.colors.primary.track,
                    color: athleticTechTheme.colors.text.inverse
                  }}
                >
                  {isCoach ? 'Coach' : 'Athlete'}
                </span>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="w-full p-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: athleticTechTheme.colors.surface.secondary,
              border: `2px solid #ef4444`,
              color: '#ef4444'
            }}
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </PageLayout>
      </div>
      <Navigation activeTab="profile" />
    </div>
  );
};

export default ProfilePage;
