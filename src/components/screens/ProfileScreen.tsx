import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EditProfileModal from '@/components/profile/EditProfileModal';
import SettingsModal from '@/components/profile/SettingsModal';
import AchievementsModal from '@/components/profile/AchievementsModal';
import StatisticsModal from '@/components/profile/StatisticsModal';
import { 
  User, Trophy, Edit3, Settings, BarChart3, Medal, Clock, MapPin, Star, Activity, Target
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useAuth } from '@/components/auth/AuthProvider';
import athleticTechTheme from '@/lib/athleticTechTheme';

const ProfileScreen: React.FC = () => {
  const { user, isCoach } = useUser();
  const { profile } = useAuth();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  
  // Get onboarding data to check coach status
  const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
  const hasCoach = onboardingData.hasCoach || false;
  const coachCode = onboardingData.coachCode || '';

  // Mock data
  const personalRecords = [
    { event: '100m', value: 12.45, unit: 's', date: '2025-07-15', location: 'State Championships' },
    { event: '200m', value: 25.12, unit: 's', date: '2025-06-20', location: 'Regional Meet' },
    { event: 'Long Jump', value: 6.85, unit: 'm', date: '2025-08-01', location: 'Summer Classic' },
    { event: '400m', value: 55.23, unit: 's', date: '2025-05-10', location: 'Spring Invitational' }
  ];

  const recentActivity = [
    { type: 'training', description: 'Completed Sprint Training Session', date: '2025-08-27', icon: Activity },
    { type: 'pr', description: 'New Long Jump Personal Best: 6.85m', date: '2025-08-01', icon: Trophy },
    { type: 'goal', description: 'Set new goal: Sub-12 second 100m', date: '2025-07-20', icon: Target },
    { type: 'video', description: 'Uploaded sprint technique video', date: '2025-07-18', icon: BarChart3 }
  ];
  
  const handleSaveProfile = (profileData: any) => {
    console.log('Profile saved:', profileData);
  };
  
  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
    alert('Account deletion functionality would be implemented here');
  };

  const stats = {
    totalWorkouts: 47,
    personalBests: 8,
    weeklyGoal: 5,
    completedThisWeek: 3
  };

  const displayName = profile?.full_name || profile?.username || user?.username || 'Athlete';
  const userRole = profile?.role || (isCoach ? 'coach' : 'athlete');

  return (
    <div className="space-y-6 pb-6">
      {/* Profile Header */}
      <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ 
                backgroundColor: athleticTechTheme.colors.primary.track,
                color: athleticTechTheme.colors.text.inverse 
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                {displayName}
              </h1>
              <div className="flex items-center space-x-3 mt-2">
                <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.power }}>
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </Badge>
                {hasCoach && (
                  <Badge variant="outline">
                    <User size={12} className="mr-1" />
                    Coach: {coachCode}
                  </Badge>
                )}
                <div className="flex items-center text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  <MapPin size={14} className="mr-1" />
                  {profile?.location || 'Location not set'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.primary.track }}>
              {stats.totalWorkouts}
            </div>
            <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
              Total Workouts
            </div>
          </CardContent>
        </Card>
        
        <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.performance.excellent }}>
              {stats.personalBests}
            </div>
            <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
              Personal Bests
            </div>
          </CardContent>
        </Card>
        
        <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.primary.power }}>
              {stats.completedThisWeek}/{stats.weeklyGoal}
            </div>
            <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
              Weekly Goal
            </div>
          </CardContent>
        </Card>
        
        <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.primary.field }}>
              85%
            </div>
            <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
              Completion Rate
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          onClick={() => setShowEditProfile(true)}
          className="h-20 flex flex-col items-center justify-center space-y-2"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
          variant="outline"
        >
          <Edit3 size={24} style={{ color: athleticTechTheme.colors.primary.tech }} />
          <span style={{ color: athleticTechTheme.colors.text.primary }}>Edit Profile</span>
        </Button>
        
        <Button
          onClick={() => setShowSettings(true)}
          className="h-20 flex flex-col items-center justify-center space-y-2"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
          variant="outline"
        >
          <Settings size={24} style={{ color: athleticTechTheme.colors.primary.power }} />
          <span style={{ color: athleticTechTheme.colors.text.primary }}>Settings</span>
        </Button>
        
        <Button
          onClick={() => setShowAchievements(true)}
          className="h-20 flex flex-col items-center justify-center space-y-2"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
          variant="outline"
        >
          <Trophy size={24} style={{ color: athleticTechTheme.colors.performance.excellent }} />
          <span style={{ color: athleticTechTheme.colors.text.primary }}>Achievements</span>
        </Button>
        
        <Button
          onClick={() => setShowStatistics(true)}
          className="h-20 flex flex-col items-center justify-center space-y-2"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
          variant="outline"
        >
          <BarChart3 size={24} style={{ color: athleticTechTheme.colors.primary.field }} />
          <span style={{ color: athleticTechTheme.colors.text.primary }}>Statistics</span>
        </Button>
      </div>

      {/* Recent Personal Records */}
      <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Medal size={20} style={{ color: athleticTechTheme.colors.performance.excellent }} />
            <span>Recent Personal Records</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {personalRecords.slice(0, 3).map((record, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
              >
                <div>
                  <div className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                    {record.event}
                  </div>
                  <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    {record.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg" style={{ color: athleticTechTheme.colors.performance.excellent }}>
                    {record.value}{record.unit}
                  </div>
                  <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    {new Date(record.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock size={20} style={{ color: athleticTechTheme.colors.primary.track }} />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg"
                  style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                >
                  <Icon size={20} style={{ color: athleticTechTheme.colors.primary.track }} />
                  <div className="flex-1">
                    <div className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {activity.description}
                    </div>
                    <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      {new Date(activity.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showEditProfile && (
        <EditProfileModal
          onClose={() => setShowEditProfile(false)}
          onSave={handleSaveProfile}
        />
      )}
      
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onDeleteAccount={handleDeleteAccount}
        />
      )}
      
      {showAchievements && (
        <AchievementsModal
          onClose={() => setShowAchievements(false)}
        />
      )}
      
      {showStatistics && (
        <StatisticsModal
          onClose={() => setShowStatistics(false)}
        />
      )}
    </div>
  );
};

export default ProfileScreen;
