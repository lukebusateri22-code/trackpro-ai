import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, User, Trophy, Target, Users } from 'lucide-react';
import { TRACK_EVENTS, getEventsByCategory } from '@/lib/events';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface OnboardingData {
  // Basic Info
  fullName: string;
  email: string;
  password: string;
  role: 'athlete' | 'coach';
  
  // Athlete-specific
  age?: number;
  yearsExperience?: number;
  primaryEvents?: string[];
  personalRecords?: { event: string; time: string; date: string }[];
  coachCode?: string;
  trainingGoals?: string;
  currentLevel?: 'high_school' | 'college' | 'club' | 'professional' | 'recreational';
  
  // Coach-specific
  coachingLevel?: 'high_school' | 'college' | 'club' | 'professional' | 'personal_trainer';
  specialtyEvents?: string[];
  yearsCoaching?: number;
  certifications?: string[];
  coachingPhilosophy?: string;
  maxAthletes?: number;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    fullName: '',
    email: '',
    password: '',
    role: 'athlete'
  });

  const totalSteps = data.role === 'athlete' ? 5 : 4;
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
              className={`cursor-pointer transition-all ${data.role === 'athlete' ? 'ring-2' : ''}`}
              style={{ 
                ringColor: data.role === 'athlete' ? athleticTechTheme.colors.primary.track : 'transparent',
                backgroundColor: athleticTechTheme.colors.surface.elevated
              }}
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
              className={`cursor-pointer transition-all ${data.role === 'coach' ? 'ring-2' : ''}`}
              style={{ 
                ringColor: data.role === 'coach' ? athleticTechTheme.colors.primary.power : 'transparent',
                backgroundColor: athleticTechTheme.colors.surface.elevated
              }}
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

  // Step 2: Athlete Events & Experience
  const AthleteEventsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
          Your Track & Field Events
        </h2>
        <p style={{ color: athleticTechTheme.colors.text.secondary }}>
          Tell us about your athletic background
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div>
          <Label>Current Level</Label>
          <Select value={data.currentLevel} onValueChange={(value: any) => updateData({ currentLevel: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your current level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high_school">High School</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="club">Club</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="recreational">Recreational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Primary Events (select up to 3)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
            {Object.entries(trackFieldEvents).map(([category, events]) => (
              <div key={category}>
                <h4 className="font-semibold text-sm mb-1 capitalize" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {category}
                </h4>
                {events.map((event) => (
                  <div key={event} className="flex items-center space-x-2 mb-1">
                    <Checkbox
                        id={event.id}
                        checked={data.primaryEvents?.includes(event.name) || false}
                      onCheckedChange={(checked) => {
                          const current = data.primaryEvents || [];
                          if (checked && current.length < 3) {
                            updateData({ primaryEvents: [...current, event.name] });
                          } else if (!checked) {
                            updateData({ primaryEvents: current.filter(e => e !== event.name) });
                        }
                      }}
                        disabled={(data.primaryEvents?.length || 0) >= 3 && !data.primaryEvents?.includes(event.name)}
                    />
                      <Label htmlFor={event.id} className="text-sm">{event.name}</Label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Step 3: Personal Records
  const PersonalRecordsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
          Personal Records
        </h2>
        <p style={{ color: athleticTechTheme.colors.text.secondary }}>
          Share your best performances (optional)
        </p>
      </div>

      <div className="space-y-4">
        {data.primaryEvents?.map((event, index) => (
          <div key={event} className="p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
            <h4 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>{event}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`pr-${index}`}>Personal Best</Label>
                <Input
                  id={`pr-${index}`}
                  placeholder="e.g., 10.50, 6.20m, 45'2&quot;"
                  value={data.personalRecords?.find(pr => pr.event === event)?.time || ''}
                  onChange={(e) => {
                    const current = data.personalRecords || [];
                    const updated = current.filter(pr => pr.event !== event);
                    if (e.target.value) {
                      updated.push({ event, time: e.target.value, date: '' });
                    }
                    updateData({ personalRecords: updated });
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`date-${index}`}>Date Achieved</Label>
                <Input
                  id={`date-${index}`}
                  type="date"
                  value={data.personalRecords?.find(pr => pr.event === event)?.date || ''}
                  onChange={(e) => {
                    const current = data.personalRecords || [];
                    const existing = current.find(pr => pr.event === event);
                    if (existing) {
                      existing.date = e.target.value;
                      updateData({ personalRecords: [...current] });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 4: Coach Connection & Goals
  const CoachConnectionStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
          Coach & Training Goals
        </h2>
        <p style={{ color: athleticTechTheme.colors.text.secondary }}>
          Connect with your coach and set your goals
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="coachCode">Coach Code (optional)</Label>
          <Input
            id="coachCode"
            value={data.coachCode || ''}
            onChange={(e) => updateData({ coachCode: e.target.value })}
            placeholder="Enter your coach's code to connect"
          />
          <p className="text-sm mt-1" style={{ color: athleticTechTheme.colors.text.secondary }}>
            If your coach uses TrackPro AI, they can provide you with a code to link your accounts
          </p>
        </div>

        <div>
          <Label htmlFor="goals">Training Goals</Label>
          <Textarea
            id="goals"
            value={data.trainingGoals || ''}
            onChange={(e) => updateData({ trainingGoals: e.target.value })}
            placeholder="What are your main training goals? (e.g., qualify for state, improve 100m time, etc.)"
            rows={4}
          />
        </div>
      </div>
    </div>
  );

  // Coach Steps
  const CoachInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
          Coaching Background
        </h2>
        <p style={{ color: athleticTechTheme.colors.text.secondary }}>
          Tell us about your coaching experience
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Coaching Level</Label>
          <Select value={data.coachingLevel} onValueChange={(value: any) => updateData({ coachingLevel: value })}>
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

        <div>
          <Label>Specialty Events</Label>
          <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
            {Object.entries(trackFieldEvents).map(([category, events]) => (
              <div key={category}>
                <h4 className="font-semibold text-sm mb-1 capitalize" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {category}
                </h4>
                {events.map((event) => (
                  <div key={event} className="flex items-center space-x-2 mb-1">
                    <Checkbox
                      id={`coach-${event}`}
                      checked={data.specialtyEvents?.includes(event) || false}
                      onCheckedChange={(checked) => {
                        const current = data.specialtyEvents || [];
                        if (checked) {
                          updateData({ specialtyEvents: [...current, event] });
                        } else {
                          updateData({ specialtyEvents: current.filter(e => e !== event) });
                        }
                      }}
                    />
                    <Label htmlFor={`coach-${event}`} className="text-sm">{event}</Label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="philosophy">Coaching Philosophy</Label>
          <Textarea
            id="philosophy"
            value={data.coachingPhilosophy || ''}
            onChange={(e) => updateData({ coachingPhilosophy: e.target.value })}
            placeholder="Describe your coaching philosophy and approach..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    if (step === 1) return <BasicInfoStep />;
    
    if (data.role === 'athlete') {
      switch (step) {
        case 2: return <AthleteEventsStep />;
        case 3: return <PersonalRecordsStep />;
        case 4: return <CoachConnectionStep />;
        default: return <BasicInfoStep />;
      }
    } else {
      switch (step) {
        case 2: return <CoachInfoStep />;
        default: return <BasicInfoStep />;
      }
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
            {step === totalSteps ? (
              <Button 
                onClick={handleComplete}
                style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                disabled={!data.fullName || !data.email || !data.password}
              >
                Complete Setup
                <Target className="h-4 w-4 ml-2" />
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

export default OnboardingFlow;
