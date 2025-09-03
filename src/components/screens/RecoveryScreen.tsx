import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUser } from '@/contexts/UserContext';
import { 
  Heart, Battery, Moon, Droplets, Brain, Activity, 
  TrendingUp, AlertCircle, Zap, Target, Clock, Award,
  Thermometer, Wind, Sun, CloudRain, Save, Plus
} from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

const RecoveryScreen: React.FC = () => {
  const { isCoach, isAthlete } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [showMentalHealthDialog, setShowMentalHealthDialog] = useState(false);
  const [showSleepDialog, setShowSleepDialog] = useState(false);
  const [mentalHealthData, setMentalHealthData] = useState({
    mood: 5,
    stress: 3,
    anxiety: 2,
    motivation: 7,
    notes: ''
  });
  const [sleepData, setSleepData] = useState({
    bedTime: '22:00',
    wakeTime: '07:00',
    quality: 7,
    duration: 9,
    notes: ''
  });

  // Mock recovery data - in real app, this would come from context/API
  const recoveryScore = 7.8;
  const todaysMetrics = {
    sleep: 8.2,
    hrv: 7.5,
    restingHR: 6.8,
    stress: 3.2,
    hydration: 8.5,
    nutrition: 7.9,
    soreness: 4.1,
    energy: 8.0,
    mood: 8.3
  };

  const weeklyTrend = [
    { day: 'Mon', score: 8.1, sleep: 7.8, stress: 3.5 },
    { day: 'Tue', score: 7.9, sleep: 8.2, stress: 2.8 },
    { day: 'Wed', score: 6.5, sleep: 6.9, stress: 5.2 },
    { day: 'Thu', score: 7.2, sleep: 7.5, stress: 4.1 },
    { day: 'Fri', score: 8.3, sleep: 8.8, stress: 2.1 },
    { day: 'Sat', score: 7.8, sleep: 8.0, stress: 3.0 },
    { day: 'Sun', score: 8.0, sleep: 8.5, stress: 2.5 }
  ];

  const recommendations = [
    {
      type: 'sleep',
      title: 'Optimize Sleep Quality',
      description: 'Aim for 8-9 hours of quality sleep. Consider a consistent bedtime routine.',
      priority: 'high',
      icon: Moon
    },
    {
      type: 'hydration',
      title: 'Maintain Hydration',
      description: 'Excellent hydration levels! Keep drinking 3-4L of water daily.',
      priority: 'good',
      icon: Droplets
    },
    {
      type: 'recovery',
      title: 'Active Recovery',
      description: 'Light stretching or yoga would benefit your current recovery state.',
      priority: 'medium',
      icon: Activity
    },
    {
      type: 'nutrition',
      title: 'Post-Workout Nutrition',
      description: 'Focus on protein intake within 30 minutes after training sessions.',
      priority: 'medium',
      icon: Target
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8) return athleticTechTheme.colors.performance.excellent;
    if (score >= 6) return athleticTechTheme.colors.performance.good;
    if (score >= 4) return athleticTechTheme.colors.performance.average;
    return athleticTechTheme.colors.performance.poor;
  };

  const getScoreText = (score: number) => {
    if (score >= 8) return 'Excellent Recovery';
    if (score >= 6) return 'Good Recovery';
    if (score >= 4) return 'Moderate Recovery';
    return 'Poor Recovery';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return athleticTechTheme.colors.performance.poor;
      case 'medium': return athleticTechTheme.colors.events.jumps;
      case 'good': return athleticTechTheme.colors.performance.excellent;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  const handleSaveMentalHealth = () => {
    // In a real app, this would save to your backend
    console.log('Saving mental health data:', mentalHealthData);
    alert('Mental health check-in saved successfully!');
    setShowMentalHealthDialog(false);
    // Reset form
    setMentalHealthData({
      mood: 5,
      stress: 3,
      anxiety: 2,
      motivation: 7,
      notes: ''
    });
  };

  const handleSaveSleep = () => {
    // In a real app, this would save to your backend
    console.log('Saving sleep data:', sleepData);
    alert('Sleep log saved successfully!');
    setShowSleepDialog(false);
    // Reset form
    setSleepData({
      bedTime: '22:00',
      wakeTime: '07:00',
      quality: 7,
      duration: 9,
      notes: ''
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
      {/* Header */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: athleticTechTheme.gradients.hero,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Recovery Hub</h1>
              <p className="text-white/80">Monitor your wellness and optimize recovery</p>
            </div>
            <div 
              className="p-4 rounded-2xl"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Recovery Score Card in Header */}
          <div 
            className="rounded-2xl p-6 border backdrop-blur-sm"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Today's Recovery Score</h3>
                <p className="text-white/80">{getScoreText(recoveryScore)}</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white mb-2"
                    style={{ backgroundColor: getScoreColor(recoveryScore) }}
                  >
                    {recoveryScore}
                  </div>
                  <p className="text-xs text-white/60">Overall</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: getScoreColor(todaysMetrics.sleep) }}
                    >
                      {todaysMetrics.sleep}
                    </div>
                    <p className="text-xs text-white/60 mt-1">Sleep</p>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: getScoreColor(todaysMetrics.hrv) }}
                    >
                      {todaysMetrics.hrv}
                    </div>
                    <p className="text-xs text-white/60 mt-1">HRV</p>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: getScoreColor(todaysMetrics.energy) }}
                    >
                      {todaysMetrics.energy}
                    </div>
                    <p className="text-xs text-white/60 mt-1">Energy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="metrics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="metrics">Wellness Metrics</TabsTrigger>
            <TabsTrigger value="trends">Weekly Trends</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          {/* Wellness Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              {isAthlete && (
                <Button
                  onClick={() => setShowMentalHealthDialog(true)}
                  className="flex items-center space-x-2"
                  style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
                >
                  <Brain size={16} />
                  <span>Mental Health Check-in</span>
                </Button>
              )}
              
              <Button
                onClick={() => setShowSleepDialog(true)}
                className="flex items-center space-x-2"
                style={{ backgroundColor: athleticTechTheme.colors.primary.field }}
              >
                <Moon size={16} />
                <span>Log Sleep</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center space-x-2"
                style={{ borderColor: athleticTechTheme.colors.primary.power, color: athleticTechTheme.colors.primary.power }}
              >
                <Plus size={16} />
                <span>Log Injury</span>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(todaysMetrics).map(([key, value]) => {
                const icons: { [key: string]: any } = {
                  sleep: Moon,
                  hrv: Heart,
                  restingHR: Activity,
                  stress: AlertCircle,
                  hydration: Droplets,
                  nutrition: Target,
                  soreness: Zap,
                  energy: Battery,
                  mood: Sun
                };
                
                const Icon = icons[key] || Activity;
                const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                
                return (
                  <Card key={key} className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
                    <CardContent className="p-4 text-center">
                      <div 
                        className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                        style={{ backgroundColor: `${getScoreColor(value)}20` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: getScoreColor(value) }} />
                      </div>
                      <p className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {value.toFixed(1)}
                      </p>
                      <p className="text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        {label}
                      </p>
                      <Progress value={(value / 10) * 100} className="mt-2 h-1" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Detailed Breakdown */}
            <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  <Activity className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
                  Detailed Wellness Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(todaysMetrics).map(([key, value]) => {
                  const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {label}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge style={{ backgroundColor: getScoreColor(value), color: 'white' }}>
                            {value.toFixed(1)}/10
                          </Badge>
                          <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {value >= 8 ? 'Excellent' : value >= 6 ? 'Good' : value >= 4 ? 'Fair' : 'Poor'}
                          </span>
                        </div>
                      </div>
                      <Progress value={(value / 10) * 100} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Weekly Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  <TrendingUp className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
                  7-Day Recovery Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Overall Score Trend */}
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: athleticTechTheme.colors.text.primary }}>
                      Overall Recovery Score
                    </h4>
                    <div className="flex items-end justify-between space-x-2 h-32">
                      {weeklyTrend.map((day, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                            style={{ 
                              height: `${(day.score / 10) * 100}%`,
                              backgroundColor: getScoreColor(day.score),
                              minHeight: '20px'
                            }}
                          />
                          <div className="mt-2 text-xs font-medium" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {day.day}
                          </div>
                          <div className="text-xs font-bold" style={{ color: getScoreColor(day.score) }}>
                            {day.score}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sleep & Stress Comparison */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: athleticTechTheme.colors.text.primary }}>
                        Sleep Quality
                      </h4>
                      <div className="flex items-end justify-between space-x-1 h-20">
                        {weeklyTrend.map((day, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                              className="w-full rounded-t-lg"
                              style={{ 
                                height: `${(day.sleep / 10) * 100}%`,
                                backgroundColor: athleticTechTheme.colors.performance.recovery,
                                minHeight: '8px'
                              }}
                            />
                            <div className="mt-1 text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              {day.day}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: athleticTechTheme.colors.text.primary }}>
                        Stress Levels
                      </h4>
                      <div className="flex items-end justify-between space-x-1 h-20">
                        {weeklyTrend.map((day, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                              className="w-full rounded-t-lg"
                              style={{ 
                                height: `${(day.stress / 10) * 100}%`,
                                backgroundColor: athleticTechTheme.colors.performance.poor,
                                minHeight: '8px'
                              }}
                            />
                            <div className="mt-1 text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              {day.day}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid gap-4">
              {recommendations.map((rec, index) => {
                const IconComponent = rec.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${getPriorityColor(rec.priority)}20` }}
                        >
                          <IconComponent className="h-6 w-6" style={{ color: getPriorityColor(rec.priority) }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                              {rec.title}
                            </h4>
                            <Badge 
                              variant="outline" 
                              style={{ 
                                borderColor: getPriorityColor(rec.priority),
                                color: getPriorityColor(rec.priority)
                              }}
                            >
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {rec.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="border-0 shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                  <Brain className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
                  AI Recovery Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${athleticTechTheme.colors.performance.excellent}10` }}>
                  <h4 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                    🎯 Key Insight
                  </h4>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Your recovery score has improved by 15% over the past week. The combination of consistent sleep patterns and proper hydration is showing excellent results.
                  </p>
                </div>
                
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${athleticTechTheme.colors.events.jumps}10` }}>
                  <h4 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                    📈 Trend Analysis
                  </h4>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Your stress levels are inversely correlated with your sleep quality. Focus on maintaining 8+ hours of sleep to keep stress levels below 3.0.
                  </p>
                </div>
                
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${athleticTechTheme.colors.performance.poor}10` }}>
                  <h4 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                    ⚠️ Watch Out
                  </h4>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Your soreness levels are slightly elevated. Consider incorporating more active recovery sessions and ensure proper post-workout nutrition.
                  </p>
                </div>
                
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${athleticTechTheme.colors.primary.track}10` }}>
                  <h4 className="font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                    🚀 Optimization Tip
                  </h4>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Based on your current metrics, you're ready for high-intensity training. Your recovery capacity can handle 85-90% effort sessions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Mental Health Check-in Dialog - Athletes Only */}
      {isAthlete && (
        <Dialog open={showMentalHealthDialog} onOpenChange={setShowMentalHealthDialog}>
          <DialogContent className="max-w-md" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                <Brain className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
                Mental Health Check-in
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="mood">Mood (1-10)</Label>
                <Input
                  id="mood"
                  type="number"
                  min="1"
                  max="10"
                  value={mentalHealthData.mood}
                  onChange={(e) => setMentalHealthData(prev => ({ ...prev, mood: parseInt(e.target.value) }))}
                  style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                />
              </div>
              
              <div>
                <Label htmlFor="stress">Stress Level (1-10)</Label>
                <Input
                  id="stress"
                  type="number"
                  min="1"
                  max="10"
                  value={mentalHealthData.stress}
                  onChange={(e) => setMentalHealthData(prev => ({ ...prev, stress: parseInt(e.target.value) }))}
                  style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                />
              </div>
              
              <div>
                <Label htmlFor="anxiety">Anxiety Level (1-10)</Label>
                <Input
                  id="anxiety"
                  type="number"
                  min="1"
                  max="10"
                  value={mentalHealthData.anxiety}
                  onChange={(e) => setMentalHealthData(prev => ({ ...prev, anxiety: parseInt(e.target.value) }))}
                  style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                />
              </div>
              
              <div>
                <Label htmlFor="motivation">Motivation (1-10)</Label>
                <Input
                  id="motivation"
                  type="number"
                  min="1"
                  max="10"
                  value={mentalHealthData.motivation}
                  onChange={(e) => setMentalHealthData(prev => ({ ...prev, motivation: parseInt(e.target.value) }))}
                  style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                />
              </div>
              
              <div>
                <Label htmlFor="mental-notes">Additional Notes</Label>
                <Textarea
                  id="mental-notes"
                  placeholder="How are you feeling today? Any specific thoughts or concerns?"
                  value={mentalHealthData.notes}
                  onChange={(e) => setMentalHealthData(prev => ({ ...prev, notes: e.target.value }))}
                  style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                />
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={handleSaveMentalHealth}
                  className="flex-1 flex items-center justify-center space-x-2"
                  style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}
                >
                  <Save size={16} />
                  <span>Save Check-in</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowMentalHealthDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Sleep Log Dialog */}
      <Dialog open={showSleepDialog} onOpenChange={setShowSleepDialog}>
        <DialogContent className="max-w-md" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2" style={{ color: athleticTechTheme.colors.text.primary }}>
              <Moon className="h-5 w-5" style={{ color: athleticTechTheme.colors.primary.track }} />
              Sleep Log
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedtime">Bed Time</Label>
                <Input
                  id="bedtime"
                  type="time"
                  value={sleepData.bedTime}
                  onChange={(e) => setSleepData(prev => ({ ...prev, bedTime: e.target.value }))}
                  style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                />
              </div>
              
              <div>
                <Label htmlFor="waketime">Wake Time</Label>
                <Input
                  id="waketime"
                  type="time"
                  value={sleepData.wakeTime}
                  onChange={(e) => setSleepData(prev => ({ ...prev, wakeTime: e.target.value }))}
                  style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="sleep-quality">Sleep Quality (1-10)</Label>
              <Input
                id="sleep-quality"
                type="number"
                min="1"
                max="10"
                value={sleepData.quality}
                onChange={(e) => setSleepData(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
              />
            </div>
            
            <div>
              <Label htmlFor="sleep-duration">Duration (hours)</Label>
              <Input
                id="sleep-duration"
                type="number"
                min="1"
                max="12"
                step="0.5"
                value={sleepData.duration}
                onChange={(e) => setSleepData(prev => ({ ...prev, duration: parseFloat(e.target.value) }))}
                style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
              />
            </div>
            
            <div>
              <Label htmlFor="sleep-notes">Sleep Notes</Label>
              <Textarea
                id="sleep-notes"
                placeholder="How did you sleep? Any factors that affected your sleep?"
                value={sleepData.notes}
                onChange={(e) => setSleepData(prev => ({ ...prev, notes: e.target.value }))}
                style={{ backgroundColor: athleticTechTheme.colors.surface.primary }}
              />
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button
                onClick={handleSaveSleep}
                className="flex-1 flex items-center justify-center space-x-2"
                style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}
              >
                <Save size={16} />
                <span>Save Sleep Log</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSleepDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecoveryScreen;
