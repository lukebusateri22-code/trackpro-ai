import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EditProfileModal from '@/components/profile/EditProfileModal';
import SettingsModal from '@/components/profile/SettingsModal';
import AchievementsModal from '@/components/profile/AchievementsModal';
import StatisticsModal from '@/components/profile/StatisticsModal';
import { 
  User, Trophy, Target, Edit3, Settings, Activity, BarChart3, Medal, Clock, MapPin, Star
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

  // Mock data - in real app, this would come from user context/API
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
    // Here you would save to your backend/database
  };
  
  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
    // Here you would handle account deletion
    alert('Account deletion functionality would be implemented here');
  };

  const stats = {
    totalWorkouts: 47,
    hoursTraining: 156,
    personalBests: personalRecords.length,
    goalsAchieved: 8
  };

  const handleSave = () => {
    // In real app, would call updateUser API
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      username: user?.username || 'John Athlete',
      age: user?.age || 22,
      height: user?.height || '5\'10"',
      weight: user?.weight || '165 lbs',
      experience: user?.experience || 'Intermediate'
    });
    setIsEditing(false);
  };

  const handleAddPR = () => {
    if (newPR.event && newPR.value && newPR.date) {
      // In real app, would call API to add personal record
      setNewPR({ event: '', value: '', date: new Date().toISOString().split('T')[0], location: '' });
      setNewPRDialog(false);
    }
  };

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'Beginner': return athleticTechTheme.colors.text.secondary;
      case 'Intermediate': return athleticTechTheme.colors.primary.track;
      case 'Advanced': return athleticTechTheme.colors.performance.excellent;
      case 'Elite': return athleticTechTheme.colors.primary.power;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  const formatRecord = (event: string, value: number, unit: string) => {
    if (unit === 's') {
      return value < 60 ? `${value.toFixed(2)}s` : `${Math.floor(value / 60)}:${(value % 60).toFixed(2)}`;
    }
    return `${value.toFixed(2)}${unit}`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'training': return Activity;
      case 'pr': return Trophy;
      case 'goal': return Target;
      case 'video': return BarChart3;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'training': return athleticTechTheme.colors.primary.track;
      case 'pr': return athleticTechTheme.colors.primary.power;
      case 'goal': return athleticTechTheme.colors.events.jumps;
      case 'video': return athleticTechTheme.colors.events.sprints;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div 
        className="relative overflow-hidden rounded-2xl p-8"
        style={{ background: athleticTechTheme.gradients.hero }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <User className="h-12 w-12" />
            </div>
            
            {/* Profile Info */}
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {editForm.username}
                </h1>
                <Badge 
                  style={{ 
                    backgroundColor: `${getExperienceColor(editForm.experience)}20`,
                    color: getExperienceColor(editForm.experience),
                    border: `1px solid ${getExperienceColor(editForm.experience)}40`
                  }}
                >
                  {editForm.experience}
                </Badge>
                {isCoach && (
                  <Badge 
                    style={{ 
                      backgroundColor: `${athleticTechTheme.colors.events.jumps}20`,
                      color: athleticTechTheme.colors.events.jumps,
                      border: `1px solid ${athleticTechTheme.colors.events.jumps}40`
                    }}
                  >
                    Coach
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-6 text-white/80">
                <span>Age: {editForm.age}</span>
                <span>Height: {editForm.height}</span>
                <span>Weight: {editForm.weight}</span>
              </div>
            </div>
          </div>
          
          {/* Edit Button */}
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white'
            }}
          >
            {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <Card 
          className="border-0 shadow-lg"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
        >
          <CardHeader>
            <CardTitle style={{ color: athleticTechTheme.colors.text.primary }}>
              Edit Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label style={{ color: athleticTechTheme.colors.text.primary }}>Username</Label>
                <Input
                  value={editForm.username}
                  onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                />
              </div>
              <div>
                <Label style={{ color: athleticTechTheme.colors.text.primary }}>Age</Label>
                <Input
                  type="number"
                  value={editForm.age}
                  onChange={(e) => setEditForm({...editForm, age: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label style={{ color: athleticTechTheme.colors.text.primary }}>Height</Label>
                <Input
                  value={editForm.height}
                  onChange={(e) => setEditForm({...editForm, height: e.target.value})}
                />
              </div>
              <div>
                <Label style={{ color: athleticTechTheme.colors.text.primary }}>Weight</Label>
                <Input
                  value={editForm.weight}
                  onChange={(e) => setEditForm({...editForm, weight: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label style={{ color: athleticTechTheme.colors.text.primary }}>Experience Level</Label>
              <Select value={editForm.experience} onValueChange={(value) => setEditForm({...editForm, experience: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner (0-2 years)</SelectItem>
                  <SelectItem value="Intermediate">Intermediate (2-5 years)</SelectItem>
                  <SelectItem value="Advanced">Advanced (5+ years)</SelectItem>
                  <SelectItem value="Elite">Elite/Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={handleSave}
                style={{
                  backgroundColor: athleticTechTheme.colors.performance.excellent,
                  color: 'white'
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card 
          className="border-0 shadow-lg"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.primary.track}20` }}
              >
                <Activity className="h-6 w-6" style={{ color: athleticTechTheme.colors.primary.track }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                {stats.totalWorkouts}
              </p>
              <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Total Workouts
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-lg"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.events.sprints}20` }}
              >
                <Clock className="h-6 w-6" style={{ color: athleticTechTheme.colors.events.sprints }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                {stats.hoursTraining}
              </p>
              <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Hours Training
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-lg"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.primary.power}20` }}
              >
                <Trophy className="h-6 w-6" style={{ color: athleticTechTheme.colors.primary.power }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                {stats.personalBests}
              </p>
              <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Personal Bests
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-0 shadow-lg"
          style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${athleticTechTheme.colors.performance.excellent}20` }}
              >
                <Target className="h-6 w-6" style={{ color: athleticTechTheme.colors.performance.excellent }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                {stats.goalsAchieved}
              </p>
              <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Goals Achieved
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="records">Records</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent PRs */}
            <Card 
              className="border-0 shadow-lg"
              style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  <Trophy className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.power }} />
                  Recent Personal Bests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {personalRecords.slice(0, 3).map((record, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                  >
                    <div>
                      <p className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {record.event}
                      </p>
                      <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        {new Date(record.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p 
                        className="text-lg font-bold"
                        style={{ color: athleticTechTheme.colors.primary.power }}
                      >
                        {formatRecord(record.event, record.value, record.unit)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Training Summary */}
            <Card 
              className="border-0 shadow-lg"
              style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  <BarChart3 className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
                  Training Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span style={{ color: athleticTechTheme.colors.text.secondary }}>This Week</span>
                    <span className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                      5 sessions
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: athleticTechTheme.colors.text.secondary }}>This Month</span>
                    <span className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                      18 sessions
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: athleticTechTheme.colors.text.secondary }}>Avg. Session Length</span>
                    <span className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                      87 minutes
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: athleticTechTheme.colors.text.secondary }}>Favorite Event</span>
                    <Badge 
                      style={{ 
                        backgroundColor: `${athleticTechTheme.colors.events.sprints}20`,
                        color: athleticTechTheme.colors.events.sprints
                      }}
                    >
                      100m Sprint
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Personal Records Tab */}
        <TabsContent value="records" className="space-y-4">
          <Card 
            className="border-0 shadow-lg"
            style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  <Medal className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.power }} />
                  Personal Records
                </CardTitle>
                <Dialog open={newPRDialog} onOpenChange={setNewPRDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm"
                      style={{
                        backgroundColor: athleticTechTheme.colors.primary.track,
                        color: 'white'
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Record
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Personal Record</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Event</Label>
                        <Select value={newPR.event} onValueChange={(value) => setNewPR({...newPR, event: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100m">100m</SelectItem>
                            <SelectItem value="200m">200m</SelectItem>
                            <SelectItem value="400m">400m</SelectItem>
                            <SelectItem value="800m">800m</SelectItem>
                            <SelectItem value="1500m">1500m</SelectItem>
                            <SelectItem value="Long Jump">Long Jump</SelectItem>
                            <SelectItem value="High Jump">High Jump</SelectItem>
                            <SelectItem value="Shot Put">Shot Put</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Performance</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={newPR.value}
                          onChange={(e) => setNewPR({...newPR, value: e.target.value})}
                          placeholder="Enter performance value"
                        />
                      </div>
                      <div>
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={newPR.date}
                          onChange={(e) => setNewPR({...newPR, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Location (Optional)</Label>
                        <Input
                          value={newPR.location}
                          onChange={(e) => setNewPR({...newPR, location: e.target.value})}
                          placeholder="Competition venue"
                        />
                      </div>
                      <Button onClick={handleAddPR} className="w-full">
                        Add Record
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {personalRecords.map((record, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg"
                  style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                >
                  <div>
                    <p className="font-medium text-lg" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {record.event}
                    </p>
                    <div className="flex items-center space-x-2 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(record.date).toLocaleDateString()}</span>
                      {record.location && (
                        <>
                          <MapPin className="h-3 w-3" />
                          <span>{record.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: athleticTechTheme.colors.primary.power }}
                    >
                      {formatRecord(record.event, record.value, record.unit)}
                    </p>
                    <Badge 
                      style={{ 
                        backgroundColor: `${athleticTechTheme.colors.performance.excellent}20`,
                        color: athleticTechTheme.colors.performance.excellent
                      }}
                    >
                      Personal Best
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card 
            className="border-0 shadow-lg"
            style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                <TrendingUp className="h-5 w-5" style={{ color: athleticTechTheme.colors.events.sprints }} />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => {
                const IconComponent = getActivityIcon(activity.type);
                return (
                  <div 
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg"
                    style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${getActivityColor(activity.type)}20` }}
                    >
                      <IconComponent className="h-5 w-5" style={{ color: getActivityColor(activity.type) }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {activity.description}
                      </p>
                      <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <Card 
            className="border-0 shadow-lg"
            style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                <Award className="h-5 w-5" style={{ color: athleticTechTheme.colors.performance.excellent }} />
                Achievements & PRs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Event PRs */}
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: athleticTechTheme.colors.text.primary }}>Track & Field PRs</h3>
                  <div className="space-y-2">
                    {personalRecords.map((record, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center p-3 rounded-lg"
                        style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                      >
                        <span style={{ color: athleticTechTheme.colors.text.primary }}>{record.event}</span>
                        <span 
                          className="font-bold"
                          style={{ color: athleticTechTheme.colors.primary.power }}
                        >
                          {formatRecord(record.event, record.value, record.unit)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Lifting PRs */}
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: athleticTechTheme.colors.text.primary }}>Lifting PRs</h3>
                  <div className="space-y-2">
                    {[
                      { exercise: 'Back Squat', weight: 140, unit: 'kg' },
                      { exercise: 'Bench Press', weight: 95, unit: 'kg' },
                      { exercise: 'Deadlift', weight: 160, unit: 'kg' },
                      { exercise: 'Clean & Jerk', weight: 75, unit: 'kg' }
                    ].map((lift, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center p-3 rounded-lg"
                        style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                      >
                        <span style={{ color: athleticTechTheme.colors.text.primary }}>{lift.exercise}</span>
                        <span 
                          className="font-bold"
                          style={{ color: athleticTechTheme.colors.primary.power }}
                        >
                          {lift.weight}{lift.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Achievement Badges */}
              <div>
                <h3 className="font-semibold mb-3" style={{ color: athleticTechTheme.colors.text.primary }}>Achievement Badges</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Sub-12 100m', color: athleticTechTheme.colors.performance.excellent },
                    { name: '7m Long Jump', color: athleticTechTheme.colors.events.jumps },
                    { name: '100 Workouts', color: athleticTechTheme.colors.primary.track },
                    { name: 'Consistency King', color: athleticTechTheme.colors.events.sprints }
                  ].map((badge, index) => (
                    <Badge 
                      key={index}
                      style={{ 
                        backgroundColor: `${badge.color}20`,
                        color: badge.color,
                        border: `1px solid ${badge.color}40`
                      }}
                    >
                      🏆 {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Statistics Tab */}
        <TabsContent value="statistics" className="space-y-4">
          <Card 
            className="border-0 shadow-lg"
            style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                <BarChart3 className="h-5 w-5" style={{ color: athleticTechTheme.colors.events.sprints }} />
                Performance Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Performance Graphs Placeholder */}
              <div className="grid md:grid-cols-2 gap-6">
                <div 
                  className="p-6 rounded-xl text-center"
                  style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                >
                  <h4 className="font-semibold mb-4" style={{ color: athleticTechTheme.colors.text.primary }}>100m Progress</h4>
                  <div className="h-32 flex items-center justify-center">
                    <p style={{ color: athleticTechTheme.colors.text.secondary }}>📈 Line graph showing 100m times over the season</p>
                  </div>
                  <p className="text-sm mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>Improvement: -0.3s this season</p>
                </div>
                
                <div 
                  className="p-6 rounded-xl text-center"
                  style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                >
                  <h4 className="font-semibold mb-4" style={{ color: athleticTechTheme.colors.text.primary }}>Long Jump Progress</h4>
                  <div className="h-32 flex items-center justify-center">
                    <p style={{ color: athleticTechTheme.colors.text.secondary }}>📊 Bar chart showing long jump distances</p>
                  </div>
                  <p className="text-sm mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>Best: 7.12m (+0.25m this season)</p>
                </div>
                
                <div 
                  className="p-6 rounded-xl text-center"
                  style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                >
                  <h4 className="font-semibold mb-4" style={{ color: athleticTechTheme.colors.text.primary }}>Training Volume</h4>
                  <div className="h-32 flex items-center justify-center">
                    <p style={{ color: athleticTechTheme.colors.text.secondary }}>📈 Weekly training hours and intensity</p>
                  </div>
                  <p className="text-sm mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>Avg: 12 hours/week</p>
                </div>
                
                <div 
                  className="p-6 rounded-xl text-center"
                  style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                >
                  <h4 className="font-semibold mb-4" style={{ color: athleticTechTheme.colors.text.primary }}>Strength Progress</h4>
                  <div className="h-32 flex items-center justify-center">
                    <p style={{ color: athleticTechTheme.colors.text.secondary }}>💪 Squat, bench, deadlift progression</p>
                  </div>
                  <p className="text-sm mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>Total: +45kg this year</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4">
            {/* Profile Settings */}
            <Card 
              className="border-0 shadow-lg"
              style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  <User className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline"
                    className="flex items-center justify-center space-x-2 p-4 h-auto"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 size={16} />
                    <span>Edit Profile</span>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex items-center justify-center space-x-2 p-4 h-auto"
                    style={{ borderColor: athleticTechTheme.colors.events.jumps, color: athleticTechTheme.colors.events.jumps }}
                  >
                    <User size={16} />
                    <span>Manage Coach</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* App Settings */}
            <Card 
              className="border-0 shadow-lg"
              style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  <Settings className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.field }} />
                  App Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <span style={{ color: athleticTechTheme.colors.text.primary }}>Notifications</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <span style={{ color: athleticTechTheme.colors.text.primary }}>Dark Mode</span>
                    <input type="checkbox" className="toggle" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <span style={{ color: athleticTechTheme.colors.text.primary }}>Auto-sync Data</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Danger Zone */}
            <Card 
              className="border-0 shadow-lg"
              style={{ backgroundColor: athleticTechTheme.colors.surface.secondary, borderColor: athleticTechTheme.colors.performance.poor }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.performance.poor }}>
                  <AlertCircle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="destructive"
                  className="w-full"
                  style={{ backgroundColor: athleticTechTheme.colors.performance.poor }}
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      alert('Account deletion would be processed here.');
                    }
                  }}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileScreen;
