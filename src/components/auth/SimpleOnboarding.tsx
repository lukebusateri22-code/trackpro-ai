import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, User, Trophy, Target, Award } from 'lucide-react';
import { TRACK_EVENTS, getEventsByCategory } from '@/lib/events';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface OnboardingData {
  fullName: string;
  email: string;
  password: string;
  role: 'athlete' | 'coach';
  age?: number;
  yearsExperience?: number;
  primaryEvents?: string[];
  personalRecords?: { [key: string]: string };
  trainingGoals?: string;
  coachingLevel?: string;
  yearsCoaching?: number;
  specialtyEvents?: string[];
  coachingPhilosophy?: string;
}

interface SimpleOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

const SimpleOnboarding: React.FC<SimpleOnboardingProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    fullName: '',
    email: '',
    password: '',
    role: 'athlete'
  });

  const totalSteps = data.role === 'athlete' ? 4 : 4;
  const progress = (step / totalSteps) * 100;

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleComplete = () => {
    onComplete(data);
  };

  // Step 1: Basic Info & Role Selection
  const BasicInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
          Welcome to TrackPro AI
        </h2>
        <p style={{ color: athleticTechTheme.colors.text.secondary }}>
          Let's get you set up with a personalized experience
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => updateData({ password: e.target.value })}
            placeholder="••••••••"
          />
        </div>

        <div>
          <Label>I am a...</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Card 
              className={`cursor-pointer transition-all ${data.role === 'athlete' ? 'ring-2 ring-blue-500' : ''}`}
              style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
              onClick={() => updateData({ role: 'athlete' })}
            >
              <CardContent className="p-4 text-center">
                <User className="h-8 w-8 mx-auto mb-2" style={{ color: athleticTechTheme.colors.primary.track }} />
                <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>Athlete</h3>
                <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Track my performance and training
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${data.role === 'coach' ? 'ring-2 ring-blue-500' : ''}`}
              style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
              onClick={() => updateData({ role: 'coach' })}
            >
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2" style={{ color: athleticTechTheme.colors.primary.power }} />
                <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>Coach</h3>
                <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Manage athletes and training plans
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Role-specific info
  const RoleInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
          {data.role === 'athlete' ? 'Athletic Background' : 'Coaching Background'}
        </h2>
        <p style={{ color: athleticTechTheme.colors.text.secondary }}>
          Tell us about your {data.role === 'athlete' ? 'athletic' : 'coaching'} experience
        </p>
      </div>

      <div className="space-y-4">
        {data.role === 'athlete' ? (
          <>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={data.age || ''}
                onChange={(e) => updateData({ age: parseInt(e.target.value) || undefined })}
                placeholder="18"
              />
            </div>
            <div>
              <Label htmlFor="experience">Years in Track & Field</Label>
              <Input
                id="experience"
                type="number"
                value={data.yearsExperience || ''}
                onChange={(e) => updateData({ yearsExperience: parseInt(e.target.value) || undefined })}
                placeholder="5"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Label>Coaching Level</Label>
              <Select value={data.coachingLevel} onValueChange={(value) => updateData({ coachingLevel: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your coaching level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high_school">High School Coach</SelectItem>
                  <SelectItem value="college">College Coach</SelectItem>
                  <SelectItem value="club">Club Coach</SelectItem>
                  <SelectItem value="professional">Professional Coach</SelectItem>
                  <SelectItem value="personal_trainer">Personal Trainer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="yearsCoaching">Years Coaching</Label>
              <Input
                id="yearsCoaching"
                type="number"
                value={data.yearsCoaching || ''}
                onChange={(e) => updateData({ yearsCoaching: parseInt(e.target.value) || undefined })}
                placeholder="5"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Step 3: Events and Specialization
  const EventsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Target className="h-12 w-12 mx-auto mb-4" style={{ color: athleticTechTheme.colors.primary.track }} />
        <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
          {data.role === 'athlete' ? 'Your Events' : 'Coaching Specialties'}
        </h2>
        <p style={{ color: athleticTechTheme.colors.text.secondary }}>
          {data.role === 'athlete' 
            ? 'Select up to 3 events you compete in or want to focus on'
            : 'Select the events you specialize in coaching'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto">
        {['Sprints', 'Jumps', 'Throws', 'Distance'].map((category) => {
          const events = getEventsByCategory(category);
          return (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-2 capitalize" style={{ color: athleticTechTheme.colors.text.primary }}>
                {category}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {events.map((event) => {
                  const currentEvents = data.role === 'athlete' ? data.primaryEvents : data.specialtyEvents;
                  const isSelected = currentEvents?.includes(event.name) || false;
                  const maxReached = data.role === 'athlete' && (currentEvents?.length || 0) >= 3;
                  
                  return (
                    <div key={event.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={event.id}
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          const current = currentEvents || [];
                          if (checked && (!maxReached || isSelected)) {
                            const updated = [...current, event.name];
                            updateData(data.role === 'athlete' 
                              ? { primaryEvents: updated }
                              : { specialtyEvents: updated }
                            );
                          } else if (!checked) {
                            const updated = current.filter(e => e !== event.name);
                            updateData(data.role === 'athlete'
                              ? { primaryEvents: updated }
                              : { specialtyEvents: updated }
                            );
                          }
                        }}
                        disabled={maxReached && !isSelected && data.role === 'athlete'}
                      />
                      <Label htmlFor={event.id} className="text-sm">{event.name}</Label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {data.role === 'athlete' && (
        <div className="text-center text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
          Selected: {data.primaryEvents?.length || 0}/3 events
        </div>
      )}
    </div>
  );

  // Step 4: Personal Records and Goals
  const PersonalRecordsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Award className="h-12 w-12 mx-auto mb-4" style={{ color: athleticTechTheme.colors.primary.power }} />
        <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
          {data.role === 'athlete' ? 'Personal Records & Goals' : 'Coaching Philosophy'}
        </h2>
        <p style={{ color: athleticTechTheme.colors.text.secondary }}>
          {data.role === 'athlete'
            ? 'Share your best times/distances and training goals'
            : 'Tell us about your coaching approach and philosophy'
          }
        </p>
      </div>

      <div className="space-y-4">
        {data.role === 'athlete' ? (
          <>
            {data.primaryEvents && data.primaryEvents.length > 0 && (
              <div>
                <Label>Personal Records (Optional)</Label>
                <div className="space-y-2 mt-2">
                  {data.primaryEvents.map((event) => (
                    <div key={event} className="flex items-center space-x-2">
                      <Label className="text-sm w-24">{event}:</Label>
                      <Input
                        placeholder="e.g., 12.50s or 6.20m"
                        value={data.personalRecords?.[event] || ''}
                        onChange={(e) => {
                          const newPRs = { ...data.personalRecords, [event]: e.target.value };
                          updateData({ personalRecords: newPRs });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="goals">Training Goals</Label>
              <Textarea
                id="goals"
                placeholder="What are your main training goals? (e.g., qualify for nationals, improve 100m time, etc.)"
                value={data.trainingGoals || ''}
                onChange={(e) => updateData({ trainingGoals: e.target.value })}
                rows={3}
              />
            </div>
          </>
        ) : (
          <div>
            <Label htmlFor="philosophy">Coaching Philosophy</Label>
            <Textarea
              id="philosophy"
              placeholder="Describe your coaching philosophy and approach to training athletes..."
              value={data.coachingPhilosophy || ''}
              onChange={(e) => updateData({ coachingPhilosophy: e.target.value })}
              rows={4}
            />
          </div>
        )}
      </div>
    </div>
  );

  // Step 5: Confirmation
  const ConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
          Ready to Get Started!
        </h2>
        <p style={{ color: athleticTechTheme.colors.text.secondary }}>
          Review your information and complete your registration
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
          <h3 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
            Account Information
          </h3>
          <p><strong>Name:</strong> {data.fullName}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Role:</strong> {data.role}</p>
          {data.role === 'athlete' && data.age && <p><strong>Age:</strong> {data.age}</p>}
          {data.role === 'athlete' && data.yearsExperience && <p><strong>Experience:</strong> {data.yearsExperience} years</p>}
          {data.role === 'athlete' && data.primaryEvents && data.primaryEvents.length > 0 && (
            <p><strong>Events:</strong> {data.primaryEvents.join(', ')}</p>
          )}
          {data.role === 'coach' && data.coachingLevel && <p><strong>Level:</strong> {data.coachingLevel}</p>}
          {data.role === 'coach' && data.yearsCoaching && <p><strong>Coaching Experience:</strong> {data.yearsCoaching} years</p>}
          {data.role === 'coach' && data.specialtyEvents && data.specialtyEvents.length > 0 && (
            <p><strong>Specialties:</strong> {data.specialtyEvents.join(', ')}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1: return <BasicInfoStep />;
      case 2: return <RoleInfoStep />;
      case 3: return <EventsStep />;
      case 4: return <PersonalRecordsStep />;
      case 5: return <ConfirmationStep />;
      default: return <BasicInfoStep />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: athleticTechTheme.gradients.hero }}>
      <Card className="w-full max-w-2xl" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={step === 1 ? onBack : prevStep}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
              Step {step} of {totalSteps}
            </div>
          </div>
          <Progress value={progress} className="mb-4" />
        </CardHeader>

        <CardContent>
          {renderStep()}

          <div className="flex justify-end mt-8">
            {step === 5 ? (
              <Button 
                onClick={handleComplete}
                style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                disabled={!data.fullName || !data.email || !data.password}
              >
                Complete Setup
                <Trophy className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={nextStep}
                style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                disabled={step === 1 && (!data.fullName || !data.email || !data.password)}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleOnboarding;
