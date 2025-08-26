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
  Menu, Settings, Activity, BarChart3, Medal
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { TRACK_EVENTS, getEventsByCategory } from '@/lib/events';
import { trackTechTheme, getEventColor } from '@/lib/trackTechTheme';

export default function ProfileScreen() {
  const { user, updateUser, updateExperienceLevel, updatePersonalRecord } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    age: user?.age || 18
  });
  const [newPRDialog, setNewPRDialog] = useState(false);
  const [newPR, setNewPR] = useState({
    event: '',
    value: '',
    date: new Date().toISOString().split('T')[0],
    location: ''
  });

  if (!user) return <div>Loading...</div>;

  const handleSave = () => {
    updateUser({
      username: editForm.username,
      age: editForm.age
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      username: user.username,
      age: user.age
    });
    setIsEditing(false);
  };

  const handleAddPR = () => {
    if (newPR.event && newPR.value && newPR.date) {
      updatePersonalRecord(newPR.event, parseFloat(newPR.value), newPR.date, newPR.location);
      setNewPR({ event: '', value: '', date: new Date().toISOString().split('T')[0], location: '' });
      setNewPRDialog(false);
    }
  };

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-gray-100 text-gray-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-green-100 text-green-800';
      case 'Pro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatRecord = (event: string, value: number) => {
    const eventData = TRACK_EVENTS.find(e => e.name === event);
    if (!eventData) return value.toString();
    
    switch (eventData.unit) {
      case 'seconds':
        return value < 60 ? `${value.toFixed(2)}s` : `${Math.floor(value / 60)}:${(value % 60).toFixed(2)}`;
      case 'meters':
        return `${value.toFixed(2)}m`;
      case 'feet':
        return `${value.toFixed(2)}ft`;
      default:
        return value.toString();
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: trackTechTheme.colors.light.background }}>
      {/* Dark Tech Header */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: trackTechTheme.gradients.darkHeader,
          color: trackTechTheme.colors.dark.text
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Menu className="h-6 w-6" style={{ color: trackTechTheme.colors.dark.textSecondary }} />
              <div className="text-sm" style={{ color: trackTechTheme.colors.dark.textSecondary }}>
                Profile
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Settings className="h-6 w-6" style={{ color: trackTechTheme.colors.dark.textSecondary }} />
            </div>
          </div>

          {/* Profile Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
                style={{ 
                  background: trackTechTheme.gradients.performance,
                  color: trackTechTheme.colors.light.surface
                }}
              >
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      value={editForm.username}
                      onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                      className="text-xl font-bold bg-white/10 border-white/20 text-white"
                      placeholder="Username"
                    />
                    <Input
                      type="number"
                      value={editForm.age}
                      onChange={(e) => setEditForm({...editForm, age: parseInt(e.target.value) || 18})}
                      className="w-20 bg-white/10 border-white/20 text-white"
                      min="13"
                      max="100"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold">{user.username}</h2>
                    <p className="text-lg" style={{ color: trackTechTheme.colors.dark.textSecondary }}>
                      Age: {user.age} • Member since {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button 
                    onClick={handleSave} 
                    size="sm" 
                    className="px-4 py-2 rounded-lg"
                    style={{ 
                      backgroundColor: trackTechTheme.colors.performance.excellent,
                      color: trackTechTheme.colors.light.surface
                    }}
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button 
                    onClick={handleCancel} 
                    variant="outline" 
                    size="sm"
                    className="px-4 py-2 rounded-lg border-white/20 text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)} 
                  variant="outline" 
                  size="sm"
                  className="px-4 py-2 rounded-lg border-white/20 text-white hover:bg-white/10"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{Object.keys(user.personalRecords).length}</p>
            <p className="text-sm text-gray-600">Personal Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{user.primaryEvents.length}</p>
            <p className="text-sm text-gray-600">Primary Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{Object.keys(user.experienceLevels).length}</p>
            <p className="text-sm text-gray-600">Events Tracked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">7.2</p>
            <p className="text-sm text-gray-600">Avg Analysis Score</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">Events & Experience</TabsTrigger>
          <TabsTrigger value="records">Personal Records</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          {/* Event Specializations by Category */}
          {['Sprints', 'Jumps', 'Throws', 'Distance'].map(category => {
            const categoryEvents = getEventsByCategory(category);
            const userEventsInCategory = categoryEvents.filter(event => 
              user.experienceLevels[event.name]
            );
            
            if (userEventsInCategory.length === 0) return null;
            
            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category}
                    <Badge variant="outline">{userEventsInCategory.length} events</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userEventsInCategory.map((event) => (
                      <div key={event.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{event.name}</span>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Select
                            value={user.experienceLevels[event.name]}
                            onValueChange={(value: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro') => 
                              updateExperienceLevel(event.name, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">Intermediate</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Pro">Pro</SelectItem>
                            </SelectContent>
                          </Select>
                          <Badge className={getExperienceColor(user.experienceLevels[event.name])}>
                            {user.experienceLevels[event.name]}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Personal Records</CardTitle>
              <Dialog open={newPRDialog} onOpenChange={setNewPRDialog}>
                <DialogTrigger asChild>
                  <Button size="sm">
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
                          {TRACK_EVENTS.map(event => (
                            <SelectItem key={event.id} value={event.name}>{event.name}</SelectItem>
                          ))}
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
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(user.personalRecords).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No personal records yet</p>
                    <p className="text-sm">Add your first record to get started!</p>
                  </div>
                ) : (
                  Object.entries(user.personalRecords).map(([event, record]) => (
                    <div key={event} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                      <div>
                        <p className="font-medium text-lg">{event}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(record.date).toLocaleDateString()}
                          {record.location && ` • ${record.location}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {formatRecord(event, record.value)}
                        </p>
                        <Badge variant="outline" className="mt-1">
                          Personal Best
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Progress tracking coming soon!</p>
                <p className="text-sm">We're working on detailed analytics and progress visualization.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};