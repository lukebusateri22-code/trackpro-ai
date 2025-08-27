import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  User, Trophy, Target, Calendar, Edit3, Save, X, Plus, Award, TrendingUp,
  Settings, Activity, BarChart3, Medal, Clock, MapPin, Star
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import athleticTechTheme from '@/lib/athleticTechTheme';

const ProfileScreen: React.FC = () => {
  const { user, isCoach } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [editForm, setEditForm] = useState({
    username: user?.username || 'John Athlete',
    age: user?.age || 22,
    height: user?.height || '5\'10"',
    weight: user?.weight || '165 lbs',
    experience: user?.experience || 'Intermediate'
  });
  const [newPRDialog, setNewPRDialog] = useState(false);
  const [newPR, setNewPR] = useState({
    event: '',
    value: '',
    date: new Date().toISOString().split('T')[0],
    location: ''
  });

  // Mock data - in real app, this would come from user context/API
  const personalRecords = [
    { event: '100m', value: 11.23, unit: 's', date: '2024-03-15', location: 'State Championships' },
    { event: '200m', value: 22.87, unit: 's', date: '2024-02-28', location: 'Regional Meet' },
    { event: 'Long Jump', value: 7.12, unit: 'm', date: '2024-03-01', location: 'Indoor Meet' },
    { event: '400m', value: 52.45, unit: 's', date: '2024-01-20', location: 'Winter Classic' }
  ];

  const recentActivity = [
    { type: 'training', description: 'Completed Sprint Training Session', date: '2024-03-20', icon: Activity },
    { type: 'pr', description: 'New 100m Personal Best: 11.23s', date: '2024-03-15', icon: Trophy },
    { type: 'goal', description: 'Set new goal: Sub-11 second 100m', date: '2024-03-10', icon: Target },
    { type: 'video', description: 'Uploaded high jump technique video', date: '2024-03-08', icon: BarChart3 }
  ];

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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="records">Personal Records</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default ProfileScreen;
