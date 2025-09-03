import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, User, Mail, Phone, MapPin, Calendar, UserMinus, UserPlus } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface EditProfileModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose, onSave }) => {
  const { profile } = useAuth();
  
  // Get onboarding data to check current coach status
  const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
  const [hasCoach, setHasCoach] = useState(onboardingData.hasCoach || false);
  const [currentCoachCode, setCurrentCoachCode] = useState(onboardingData.coachCode || '');
  
  const [profileData, setProfileData] = useState({
    firstName: profile?.full_name?.split(' ')[0] || '',
    lastName: profile?.full_name?.split(' ')[1] || '',
    email: '', // Will be handled by auth system
    phone: profile?.phone || '',
    dateOfBirth: '', // Not in current profile type
    location: profile?.location || '',
    bio: profile?.bio || '',
    primaryEvent: profile?.primary_events?.[0] || '',
    coachCode: currentCoachCode,
    emergencyContact: profile?.emergency_contact || '',
    emergencyPhone: '' // Not in current profile type
  });

  const trackFieldEvents = [
    '100m', '200m', '400m', '800m', '1500m', '5000m', '10000m', 'Marathon',
    '110m Hurdles', '400m Hurdles', '3000m Steeplechase',
    'High Jump', 'Pole Vault', 'Long Jump', 'Triple Jump',
    'Shot Put', 'Discus', 'Hammer Throw', 'Javelin',
    'Decathlon', 'Heptathlon'
  ];

  const handleRemoveCoach = () => {
    setHasCoach(false);
    setCurrentCoachCode('');
    setProfileData(prev => ({ ...prev, coachCode: '' }));
    
    // Update localStorage
    const updatedOnboardingData = { ...onboardingData, hasCoach: false, coachCode: '' };
    localStorage.setItem('onboardingData', JSON.stringify(updatedOnboardingData));
  };

  const handleAddCoach = () => {
    if (profileData.coachCode.trim()) {
      setHasCoach(true);
      setCurrentCoachCode(profileData.coachCode);
      
      // Update localStorage
      const updatedOnboardingData = { 
        ...onboardingData, 
        hasCoach: true, 
        coachCode: profileData.coachCode.trim().toUpperCase() 
      };
      localStorage.setItem('onboardingData', JSON.stringify(updatedOnboardingData));
    }
  };

  const handleSave = () => {
    const updatedProfile = {
      ...profileData,
      hasCoach,
      coachCode: hasCoach ? profileData.coachCode : ''
    };
    
    onSave(updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <User size={24} style={{ color: athleticTechTheme.colors.primary.tech }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Edit Profile</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="John"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Smith"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john.smith@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, State/Country"
              />
            </div>
          </div>

          {/* Athletic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
              Athletic Information
            </h3>
            
            <div>
              <Label>Primary Event</Label>
              <Select value={profileData.primaryEvent} onValueChange={(value) => setProfileData(prev => ({ ...prev, primaryEvent: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary event" />
                </SelectTrigger>
                <SelectContent>
                  {trackFieldEvents.map(event => (
                    <SelectItem key={event} value={event}>
                      {event}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about your athletic journey..."
                rows={3}
              />
            </div>
          </div>

          {/* Coach Connection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
              Coach Connection
            </h3>
            
            {hasCoach ? (
              <div className="p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                      Connected to Coach
                    </p>
                    <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      Coach Code: {currentCoachCode}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleRemoveCoach}
                    className="text-red-500 border-red-500 hover:bg-red-50"
                  >
                    <UserMinus size={16} className="mr-2" />
                    Remove Coach
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="coachCode">Coach Code</Label>
                  <Input
                    id="coachCode"
                    value={profileData.coachCode}
                    onChange={(e) => setProfileData(prev => ({ ...prev, coachCode: e.target.value.toUpperCase() }))}
                    placeholder="Enter coach code (e.g., COACH123)"
                  />
                </div>
                <Button
                  onClick={handleAddCoach}
                  disabled={!profileData.coachCode.trim()}
                  style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}
                >
                  <UserPlus size={16} className="mr-2" />
                  Connect to Coach
                </Button>
              </div>
            )}
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
              Emergency Contact
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={profileData.emergencyContact}
                  onChange={(e) => setProfileData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  placeholder="Parent/Guardian Name"
                />
              </div>
              
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={profileData.emergencyPhone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                  placeholder="+1 (555) 987-6543"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} style={{ backgroundColor: athleticTechTheme.colors.primary.tech }}>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfileModal;
