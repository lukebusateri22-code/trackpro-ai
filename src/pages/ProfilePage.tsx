import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import PageLayout from '@/components/layout/PageLayout';
import ActionCard from '@/components/ui/ActionCard';
import CoachCodeDisplay from '@/components/CoachCodeDisplay';
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
  const { signOut, user: authUser, profile } = useAuth();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Get additional onboarding data from localStorage
  const getOnboardingData = () => {
    try {
      const data = localStorage.getItem('onboardingData');
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  };
  
  const onboardingData = getOnboardingData();

  const profileStats = [
    {
      icon: Award,
      value: isCoach ? (onboardingData.specialtyEvents?.length || '3') : (onboardingData.personalRecords ? Object.keys(onboardingData.personalRecords).filter(k => onboardingData.personalRecords[k]).length : '3'),
      label: isCoach ? 'Specialties' : 'PRs Set',
      color: athleticTechTheme.colors.performance.excellent
    },
    {
      icon: BarChart3,
      value: isCoach ? '24' : (onboardingData.primaryEvents?.length || '3'),
      label: isCoach ? 'Plans Created' : 'Events',
      color: athleticTechTheme.colors.primary.track
    },
    {
      icon: User,
      value: onboardingData.yearsExperience ? `${onboardingData.yearsExperience}y` : (onboardingData.yearsCoaching ? `${onboardingData.yearsCoaching}y` : '2.5y'),
      label: 'Experience',
      color: athleticTechTheme.colors.primary.power
    },
    {
      icon: Shield,
      value: profile?.role || (isCoach ? 'Coach' : 'Athlete'),
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
          title={profile?.full_name || authUser?.email?.split('@')[0] || user?.username || 'Your Profile'}
          subtitle={`${profile?.role || (isCoach ? 'Coach' : 'Athlete')} • Member since ${new Date().getFullYear()}`}
          headerIcon={User}
          headerGradient={athleticTechTheme.gradients.hero}
          showStats={true}
          stats={profileStats}
        >
          {/* Coach Code Display (for coaches only) */}
          {profile?.role === 'coach' && (
            <CoachCodeDisplay />
          )}
          
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
                  {authUser?.email || 'demo@trackpro.ai'}
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
                  {profile?.username || authUser?.email?.split('@')[0] || user?.username || 'demo_user'}
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
                  {profile?.role || (isCoach ? 'Coach' : 'Athlete')}
                </span>
              </div>
              
              {/* Additional onboarding data */}
              {onboardingData.yearsExperience && (
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Experience
                  </span>
                  <span style={{ color: athleticTechTheme.colors.text.primary }}>
                    {onboardingData.yearsExperience} years
                  </span>
                </div>
              )}
              
              {onboardingData.primaryEvents && onboardingData.primaryEvents.length > 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Events
                  </span>
                  <span style={{ color: athleticTechTheme.colors.text.primary }}>
                    {onboardingData.primaryEvents.join(', ')}
                  </span>
                </div>
              )}
              
              {onboardingData.specialtyEvents && onboardingData.specialtyEvents.length > 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Specialties
                  </span>
                  <span style={{ color: athleticTechTheme.colors.text.primary }}>
                    {onboardingData.specialtyEvents.join(', ')}
                  </span>
                </div>
              )}
              
              {onboardingData.coachingLevel && (
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Coaching Level
                  </span>
                  <span style={{ color: athleticTechTheme.colors.text.primary }}>
                    {onboardingData.coachingLevel.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              )}
              
              {onboardingData.hasCoach && (
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Coach Status
                  </span>
                  <span 
                    className="px-2 py-1 rounded-md text-sm font-medium"
                    style={{
                      backgroundColor: athleticTechTheme.colors.performance.excellent,
                      color: athleticTechTheme.colors.text.inverse
                    }}
                  >
                    Connected to Coach
                  </span>
                </div>
              )}
              
              {!onboardingData.hasCoach && profile?.role === 'athlete' && (
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Coach Status
                  </span>
                  <span 
                    className="px-2 py-1 rounded-md text-sm font-medium"
                    style={{
                      backgroundColor: athleticTechTheme.colors.surface.elevated,
                      color: athleticTechTheme.colors.text.secondary
                    }}
                  >
                    Independent Training
                  </span>
                </div>
              )}
            </div>
            
            {/* Personal Records Section */}
            {onboardingData.personalRecords && Object.keys(onboardingData.personalRecords).length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Personal Records
                </h4>
                <div className="space-y-2">
                  {Object.entries(onboardingData.personalRecords).map(([event, record]) => (
                    record && (
                      <div key={event} className="flex justify-between items-center">
                        <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {event}
                        </span>
                        <span className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {String(record)}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
            
            {/* Training Goals */}
            {onboardingData.trainingGoals && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Training Goals
                </h4>
                <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  {onboardingData.trainingGoals}
                </p>
              </div>
            )}
            
            {/* Coaching Philosophy */}
            {onboardingData.coachingPhilosophy && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Coaching Philosophy
                </h4>
                <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  {onboardingData.coachingPhilosophy}
                </p>
              </div>
            )}
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
