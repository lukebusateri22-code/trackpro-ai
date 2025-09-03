import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, User, Trophy, Target, CheckCircle } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

export interface OnboardingData {
  fullName: string;
  email: string;
  password: string;
  username: string;
  role: 'athlete' | 'coach';
  experienceLevel: string;
  primaryEvents: string[];
  personalRecords: { [key: string]: string };
  trainingGoals: string;
  coachCode?: string;
  hasCoach: boolean;
  specialtyEvents: string[];
  coachingLevel: string;
  yearsCoaching: string;
  coachingPhilosophy: string;
}

interface FixedOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

const FixedOnboarding: React.FC<FixedOnboardingProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'athlete' | 'coach'>('athlete');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [primaryEvents, setPrimaryEvents] = useState<string[]>([]);
  const [personalRecords, setPersonalRecords] = useState<{ [key: string]: string }>({});
  const [trainingGoals, setTrainingGoals] = useState('');
  const [coachCode, setCoachCode] = useState('');
  const [hasCoach, setHasCoach] = useState(false);
  const [specialtyEvents, setSpecialtyEvents] = useState<string[]>([]);
  const [coachingLevel, setCoachingLevel] = useState('');
  const [yearsCoaching, setYearsCoaching] = useState('');
  const [coachingPhilosophy, setCoachingPhilosophy] = useState('');

  // Track & Field Events
  const trackFieldEvents = [
    { name: '100m', category: 'Sprints' },
    { name: '200m', category: 'Sprints' },
    { name: '400m', category: 'Sprints' },
    { name: '800m', category: 'Middle Distance' },
    { name: '1500m', category: 'Middle Distance' },
    { name: '5000m', category: 'Distance' },
    { name: '10000m', category: 'Distance' },
    { name: '110m Hurdles', category: 'Hurdles' },
    { name: '400m Hurdles', category: 'Hurdles' },
    { name: 'Long Jump', category: 'Jumps' },
    { name: 'High Jump', category: 'Jumps' },
    { name: 'Triple Jump', category: 'Jumps' },
    { name: 'Pole Vault', category: 'Jumps' },
    { name: 'Shot Put', category: 'Throws' },
    { name: 'Discus', category: 'Throws' },
    { name: 'Hammer Throw', category: 'Throws' },
    { name: 'Javelin', category: 'Throws' }
  ];

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleComplete = () => {
    const data: OnboardingData = {
      fullName,
      email,
      password,
      username,
      role,
      experienceLevel,
      primaryEvents,
      personalRecords,
      trainingGoals,
      coachCode: hasCoach ? coachCode : undefined,
      hasCoach,
      specialtyEvents,
      coachingLevel,
      yearsCoaching,
      coachingPhilosophy
    };
    onComplete(data);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 mx-auto mb-4" style={{ color: athleticTechTheme.colors.primary.track }} />
              <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                Create Your Account
              </h2>
              <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                Let's start with your basic information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Trophy className="h-12 w-12 mx-auto mb-4" style={{ color: athleticTechTheme.colors.primary.power }} />
              <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                Choose Your Role
              </h2>
              <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                Are you an athlete or a coach?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${role === 'athlete' ? 'ring-2' : ''}`}
                style={{ 
                  backgroundColor: athleticTechTheme.colors.surface.elevated,
                  borderColor: role === 'athlete' ? athleticTechTheme.colors.primary.track : 'transparent'
                }}
                onClick={() => setRole('athlete')}
              >
                <CardContent className="p-6 text-center">
                  <User className="h-8 w-8 mx-auto mb-3" style={{ color: athleticTechTheme.colors.primary.track }} />
                  <h3 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                    Athlete
                  </h3>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Track your training, performance, and work with coaches
                  </p>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${role === 'coach' ? 'ring-2' : ''}`}
                style={{ 
                  backgroundColor: athleticTechTheme.colors.surface.elevated,
                  borderColor: role === 'coach' ? athleticTechTheme.colors.primary.power : 'transparent'
                }}
                onClick={() => setRole('coach')}
              >
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-3" style={{ color: athleticTechTheme.colors.primary.power }} />
                  <h3 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                    Coach
                  </h3>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Manage athletes, create training plans, and analyze performance
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="elite">Elite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        if (role === 'athlete') {
          return (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Target className="h-12 w-12 mx-auto mb-4" style={{ color: athleticTechTheme.colors.primary.field }} />
                <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Your Events & Coach
                </h2>
                <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Select your primary events and connect with a coach
                </p>
              </div>

              <div>
                <Label>Primary Events (select up to 3)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {trackFieldEvents.map((event) => (
                    <Button
                      key={event.name}
                      variant={primaryEvents.includes(event.name) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (primaryEvents.includes(event.name)) {
                          setPrimaryEvents(prev => prev.filter(e => e !== event.name));
                        } else if (primaryEvents.length < 3) {
                          setPrimaryEvents(prev => [...prev, event.name]);
                        }
                      }}
                      className="text-xs"
                    >
                      {event.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasCoach"
                    checked={hasCoach}
                    onChange={(e) => setHasCoach(e.target.checked)}
                  />
                  <Label htmlFor="hasCoach">I have a coach</Label>
                </div>

                {hasCoach && (
                  <div>
                    <Label htmlFor="coachCode">Coach Code</Label>
                    <Input
                      id="coachCode"
                      value={coachCode}
                      onChange={(e) => setCoachCode(e.target.value)}
                      placeholder="Enter your coach's code"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Trophy className="h-12 w-12 mx-auto mb-4" style={{ color: athleticTechTheme.colors.primary.power }} />
                <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Coaching Specialties
                </h2>
                <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Tell us about your coaching background
                </p>
              </div>

              <div>
                <Label>Specialty Events</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {trackFieldEvents.map((event) => (
                    <Button
                      key={event.name}
                      variant={specialtyEvents.includes(event.name) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (specialtyEvents.includes(event.name)) {
                          setSpecialtyEvents(prev => prev.filter(e => e !== event.name));
                        } else {
                          setSpecialtyEvents(prev => [...prev, event.name]);
                        }
                      }}
                      className="text-xs"
                    >
                      {event.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coachingLevel">Coaching Level</Label>
                  <Select value={coachingLevel} onValueChange={setCoachingLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youth">Youth</SelectItem>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="yearsCoaching">Years Coaching</Label>
                  <Input
                    id="yearsCoaching"
                    value={yearsCoaching}
                    onChange={(e) => setYearsCoaching(e.target.value)}
                    placeholder="e.g., 5"
                  />
                </div>
              </div>
            </div>
          );
        }

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 mx-auto mb-4" style={{ color: athleticTechTheme.colors.performance.excellent }} />
              <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                {role === 'athlete' ? 'Training Goals' : 'Coaching Philosophy'}
              </h2>
              <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                {role === 'athlete' 
                  ? 'What are your training and performance goals?'
                  : 'Share your coaching philosophy and approach'
                }
              </p>
            </div>

            <div>
              <Label htmlFor="goals">
                {role === 'athlete' ? 'Training Goals' : 'Coaching Philosophy'}
              </Label>
              <Textarea
                id="goals"
                value={role === 'athlete' ? trainingGoals : coachingPhilosophy}
                onChange={(e) => role === 'athlete' 
                  ? setTrainingGoals(e.target.value)
                  : setCoachingPhilosophy(e.target.value)
                }
                placeholder={role === 'athlete' 
                  ? 'Describe your training goals, target times, competitions you want to compete in...'
                  : 'Describe your coaching philosophy, training methods, athlete development approach...'
                }
                rows={6}
              />
            </div>
          </div>
        );

      default:
        return null;
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
          {renderStepContent()}

          <div className="flex justify-end mt-8">
            {step === totalSteps ? (
              <Button 
                onClick={handleComplete}
                style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                disabled={
                  (step === 1 && (!fullName || !email || !password || !username)) ||
                  (step === 2 && (!role || !experienceLevel)) ||
                  (step === 3 && role === 'athlete' && primaryEvents.length === 0) ||
                  (step === 3 && role === 'coach' && specialtyEvents.length === 0) ||
                  (step === 4 && role === 'athlete' && !trainingGoals) ||
                  (step === 4 && role === 'coach' && !coachingPhilosophy)
                }
              >
                Complete Setup
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={nextStep}
                style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                disabled={
                  (step === 1 && (!fullName || !email || !password || !username)) ||
                  (step === 2 && (!role || !experienceLevel)) ||
                  (step === 3 && role === 'athlete' && primaryEvents.length === 0) ||
                  (step === 3 && role === 'coach' && specialtyEvents.length === 0)
                }
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

export default FixedOnboarding;
