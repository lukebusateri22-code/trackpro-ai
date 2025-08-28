import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, User, Trophy } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface OnboardingData {
  fullName: string;
  email: string;
  password: string;
  role: 'athlete' | 'coach';
  age?: number;
  yearsExperience?: number;
  coachingLevel?: string;
  yearsCoaching?: number;
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

  const totalSteps = 3;
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

  // Step 3: Confirmation
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
          {data.role === 'coach' && data.coachingLevel && <p><strong>Level:</strong> {data.coachingLevel}</p>}
          {data.role === 'coach' && data.yearsCoaching && <p><strong>Coaching Experience:</strong> {data.yearsCoaching} years</p>}
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1: return <BasicInfoStep />;
      case 2: return <RoleInfoStep />;
      case 3: return <ConfirmationStep />;
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
            {step === totalSteps ? (
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
