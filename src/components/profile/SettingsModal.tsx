import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Settings, Bell, Shield, Moon, Globe, Trash2, AlertTriangle } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

// Simple Switch component since it's not in shadcn/ui by default
const Switch: React.FC<{ checked: boolean; onCheckedChange: (checked: boolean) => void; id?: string }> = ({ checked, onCheckedChange, id }) => (
  <button
    id={id}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      checked ? 'bg-blue-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

interface SettingsModalProps {
  onClose: () => void;
  onDeleteAccount: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onDeleteAccount }) => {
  const [settings, setSettings] = useState({
    notifications: {
      workoutReminders: true,
      coachMessages: true,
      achievementAlerts: true,
      weeklyReports: false,
      pushNotifications: true,
      emailNotifications: true
    },
    privacy: {
      profileVisibility: 'coach_only', // public, coach_only, private
      shareProgress: true,
      shareAchievements: true,
      allowCoachAccess: true
    },
    preferences: {
      theme: 'dark', // dark, light, auto
      language: 'en',
      units: 'metric', // metric, imperial
      timeFormat: '24h', // 12h, 24h
      startOfWeek: 'monday' // sunday, monday
    }
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('userSettings', JSON.stringify(settings));
    console.log('Settings saved:', settings);
    onClose();
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      onDeleteAccount();
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Settings size={24} style={{ color: athleticTechTheme.colors.primary.tech }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Settings</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Notifications */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bell size={20} style={{ color: athleticTechTheme.colors.primary.track }} />
              <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                Notifications
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="workoutReminders">Workout Reminders</Label>
                <Switch
                  id="workoutReminders"
                  checked={settings.notifications.workoutReminders}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'workoutReminders', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="coachMessages">Coach Messages</Label>
                <Switch
                  id="coachMessages"
                  checked={settings.notifications.coachMessages}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'coachMessages', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="achievementAlerts">Achievement Alerts</Label>
                <Switch
                  id="achievementAlerts"
                  checked={settings.notifications.achievementAlerts}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'achievementAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="weeklyReports">Weekly Reports</Label>
                <Switch
                  id="weeklyReports"
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'weeklyReports', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <Switch
                  id="pushNotifications"
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'pushNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <Switch
                  id="emailNotifications"
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'emailNotifications', checked)}
                />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield size={20} style={{ color: athleticTechTheme.colors.primary.power }} />
              <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                Privacy
              </h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label>Profile Visibility</Label>
                <Select 
                  value={settings.privacy.profileVisibility} 
                  onValueChange={(value) => handleSettingChange('privacy', 'profileVisibility', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="coach_only">Coach Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="shareProgress">Share Progress with Coach</Label>
                <Switch
                  id="shareProgress"
                  checked={settings.privacy.shareProgress}
                  onCheckedChange={(checked) => handleSettingChange('privacy', 'shareProgress', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="shareAchievements">Share Achievements</Label>
                <Switch
                  id="shareAchievements"
                  checked={settings.privacy.shareAchievements}
                  onCheckedChange={(checked) => handleSettingChange('privacy', 'shareAchievements', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="allowCoachAccess">Allow Coach Access to Recovery Data</Label>
                <Switch
                  id="allowCoachAccess"
                  checked={settings.privacy.allowCoachAccess}
                  onCheckedChange={(checked) => handleSettingChange('privacy', 'allowCoachAccess', checked)}
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe size={20} style={{ color: athleticTechTheme.colors.primary.field }} />
              <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                Preferences
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Theme</Label>
                <Select 
                  value={settings.preferences.theme} 
                  onValueChange={(value) => handleSettingChange('preferences', 'theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Language</Label>
                <Select 
                  value={settings.preferences.language} 
                  onValueChange={(value) => handleSettingChange('preferences', 'language', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Units</Label>
                <Select 
                  value={settings.preferences.units} 
                  onValueChange={(value) => handleSettingChange('preferences', 'units', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric</SelectItem>
                    <SelectItem value="imperial">Imperial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Time Format</Label>
                <Select 
                  value={settings.preferences.timeFormat} 
                  onValueChange={(value) => handleSettingChange('preferences', 'timeFormat', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12 Hour</SelectItem>
                    <SelectItem value="24h">24 Hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="space-y-4 pt-6 border-t" style={{ borderColor: athleticTechTheme.colors.interactive.border }}>
            <div className="flex items-center space-x-2">
              <AlertTriangle size={20} style={{ color: athleticTechTheme.colors.primary.power }} />
              <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.primary.power }}>
                Danger Zone
              </h3>
            </div>
            
            <div className="p-4 rounded-lg border" style={{ 
              backgroundColor: `${athleticTechTheme.colors.primary.power}10`,
              borderColor: athleticTechTheme.colors.primary.power 
            }}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                    Delete Account
                  </h4>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <Button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 size={16} className="mr-2" />
                  {showDeleteConfirm ? 'Confirm Delete' : 'Delete Account'}
                </Button>
              </div>
              
              {showDeleteConfirm && (
                <div className="mt-3 p-3 rounded bg-red-50 border border-red-200">
                  <p className="text-sm text-red-800">
                    Are you sure? This will permanently delete your account, all your data, training history, and achievements. This action cannot be undone.
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Yes, Delete My Account
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettings} style={{ backgroundColor: athleticTechTheme.colors.primary.tech }}>
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsModal;
