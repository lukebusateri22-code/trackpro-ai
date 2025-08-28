import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Trophy, User, Shield } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface OnboardingData {
  fullName: string;
  email: string;
  password: string;
  role: 'athlete' | 'coach';
  coachCode?: string;
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

interface FixedOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

const FixedOnboarding: React.FC<FixedOnboardingProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  
  // Individual state for each field to prevent re-renders
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'athlete' | 'coach'>('athlete');
  const [coachCode, setCoachCode] = useState('');
  const [age, setAge] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [trainingGoals, setTrainingGoals] = useState('');
  const [coachingLevel, setCoachingLevel] = useState('');
  const [yearsCoaching, setYearsCoaching] = useState('');
  const [coachingPhilosophy, setCoachingPhilosophy] = useState('');
  const [primaryEvents, setPrimaryEvents] = useState<string[]>([]);
  const [personalRecords, setPersonalRecords] = useState<{ [key: string]: string }>({});
  
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
    { name: 'Javelin', category: 'Throws' },
    { name: 'Hammer Throw', category: 'Throws' }
  ];

  const totalSteps = role === 'athlete' ? 4 : 3; // 4 steps for athletes, 3 for coaches
  const progress = (step / totalSteps) * 100;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleComplete = () => {
    const data: OnboardingData = {
      fullName,
      email,
      password,
      role,
      coachCode: coachCode || undefined,
      age: age ? parseInt(age) : undefined,
      yearsExperience: yearsExperience ? parseInt(yearsExperience) : undefined,
      trainingGoals: trainingGoals || undefined,
      coachingLevel: coachingLevel || undefined,
      yearsCoaching: yearsCoaching ? parseInt(yearsCoaching) : undefined,
      coachingPhilosophy: coachingPhilosophy || undefined,
      primaryEvents: primaryEvents.length > 0 ? primaryEvents : undefined,
      personalRecords: Object.keys(personalRecords).length > 0 ? personalRecords : undefined,
    };
    onComplete(data);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                Create Your Account
              </h2>
              <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                Join TrackPro AI and elevate your performance
              </p>
            </div>
            
            <div className="space-y-4">
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                />
              </div>
              
              {role === 'athlete' && (
                <div>
                  <Label htmlFor="coachCode">Coach Code (Optional)</Label>
                  <Input
                    id="coachCode"
                    type="text"
                    value={coachCode}
                    onChange={(e) => setCoachCode(e.target.value.toUpperCase())}
                    placeholder="Enter your coach's code (e.g., COACH123)"
                    maxLength={10}
                  />
                  <p className="text-xs mt-1" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    If your coach gave you a code, enter it here to connect with them
                  </p>
                </div>
              )}

              <div>
                <Label>I am a...</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Card 
                    className={`cursor-pointer transition-all ${role === 'athlete' ? 'ring-2 ring-blue-500' : ''}`}
                    style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                    onClick={() => setRole('athlete')}
                  >
                    <CardContent className="p-4 text-center">
                      <User className="h-8 w-8 mx-auto mb-2" style={{ color: athleticTechTheme.colors.primary.track }} />
                      <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>Athlete</h3>
                      <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Track your training and performance
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer transition-all ${role === 'coach' ? 'ring-2 ring-blue-500' : ''}`}
                    style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                    onClick={() => setRole('coach')}
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

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                {role === 'athlete' ? 'Athletic Background' : 'Coaching Background'}
              </h2>
              <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                Tell us about your {role === 'athlete' ? 'athletic' : 'coaching'} experience
              </p>
            </div>
            
            <div className="space-y-4">
              {role === 'athlete' ? (
                <>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="18"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years in Track & Field</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                      placeholder="5"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label>Coaching Level</Label>
                    <Select value={coachingLevel} onValueChange={setCoachingLevel}>
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
                      value={yearsCoaching}
                      onChange={(e) => setYearsCoaching(e.target.value)}
                      placeholder="5"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 3:
        if (role === 'athlete') {
          return (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Your Events
                </h2>
                <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Select up to 3 events you compete in or want to focus on
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {trackFieldEvents.map((event) => {
                    const isSelected = primaryEvents.includes(event.name);
                    const maxReached = primaryEvents.length >= 3;
                    
                    return (
                      <Button
                        key={event.name}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className="justify-start text-left h-auto py-2"
                        disabled={maxReached && !isSelected}
                        onClick={() => {
                          if (isSelected) {
                            setPrimaryEvents(prev => prev.filter(e => e !== event.name));
                          } else if (!maxReached) {
                            setPrimaryEvents(prev => [...prev, event.name]);
                          }
                        }}
                        style={{
                          backgroundColor: isSelected ? athleticTechTheme.colors.primary.track : 'transparent'
                        }}
                      >
                        <div>
                          <div className="font-medium">{event.name}</div>
                          <div className="text-xs opacity-70">{event.category}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
                <p className="text-sm text-center" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Selected: {primaryEvents.length}/3
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Coaching Philosophy
                </h2>
                <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Describe your coaching approach
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="philosophy">Coaching Philosophy</Label>
                  <Textarea
                    id="philosophy"
                    placeholder="Describe your coaching philosophy and approach to training athletes..."
                    value={coachingPhilosophy}
                    onChange={(e) => setCoachingPhilosophy(e.target.value)}
                    rows={4}
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
              <h2 className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                Personal Records & Goals
              </h2>
              <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                Enter your current personal bests and training goals
              </p>
            </div>
            
            <div className="space-y-4">
              {primaryEvents.length > 0 && (
                <div>
                  <Label>Personal Records</Label>
                  <div className="space-y-3 mt-2">
                    {primaryEvents.map((event) => (
                      <div key={event} className="flex items-center space-x-2">
                        <Label className="text-sm w-24">{event}:</Label>
                        <Input
                          placeholder="e.g., 12.50s or 6.20m"
                          value={personalRecords[event] || ''}
                          onChange={(e) => {
                            setPersonalRecords(prev => ({
                              ...prev,
                              [event]: e.target.value
                            }));
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
                  value={trainingGoals}
                  onChange={(e) => setTrainingGoals(e.target.value)}
                  rows={3}
                />
              </div>
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
          {renderStep()}

          <div className="flex justify-end mt-8">
            {step === totalSteps ? (
              <Button 
                onClick={handleComplete}
                style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                disabled={!fullName || !email || !password}
              >
                Complete Setup
                <Trophy className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={nextStep}
                style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                disabled={step === 1 && (!fullName || !email || !password)}
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
