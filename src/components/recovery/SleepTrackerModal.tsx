import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Moon, Sun, Clock, TrendingUp, Calendar, Bed, Coffee } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface SleepEntry {
  id: string;
  date: string;
  bedTime: string;
  wakeTime: string;
  sleepDuration: number; // in hours
  sleepQuality: number; // 1-10 scale
  timeToFallAsleep: number; // in minutes
  nightWakeups: number;
  restfulness: number; // 1-10 scale
  notes?: string;
  factors?: string[];
}

interface SleepTrackerModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const SleepTrackerModal: React.FC<SleepTrackerModalProps> = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('today');
  
  // Mock sleep data
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([
    {
      id: '1',
      date: '2025-08-27',
      bedTime: '22:30',
      wakeTime: '06:00',
      sleepDuration: 7.5,
      sleepQuality: 8,
      timeToFallAsleep: 15,
      nightWakeups: 1,
      restfulness: 8,
      notes: 'Great sleep after good training day',
      factors: ['consistent_schedule', 'no_caffeine_late', 'cool_room']
    },
    {
      id: '2',
      date: '2025-08-26',
      bedTime: '23:15',
      wakeTime: '06:30',
      sleepDuration: 7.25,
      sleepQuality: 6,
      timeToFallAsleep: 30,
      nightWakeups: 2,
      restfulness: 6,
      notes: 'Had trouble falling asleep, mind was racing',
      factors: ['stress', 'late_meal', 'screen_time']
    },
    {
      id: '3',
      date: '2025-08-25',
      bedTime: '22:00',
      wakeTime: '05:45',
      sleepDuration: 7.75,
      sleepQuality: 9,
      timeToFallAsleep: 10,
      nightWakeups: 0,
      restfulness: 9,
      notes: 'Perfect sleep! Felt amazing in the morning',
      factors: ['early_bedtime', 'meditation', 'no_screens', 'cool_room']
    }
  ]);

  const [todayEntry, setTodayEntry] = useState({
    bedTime: '',
    wakeTime: '',
    sleepQuality: [7],
    timeToFallAsleep: '',
    nightWakeups: '',
    restfulness: [7],
    notes: '',
    factors: [] as string[]
  });

  const sleepFactors = [
    'consistent_schedule', 'early_bedtime', 'late_bedtime', 'meditation', 'reading',
    'no_screens', 'screen_time', 'caffeine_late', 'no_caffeine_late', 'alcohol',
    'large_meal', 'late_meal', 'exercise_late', 'stress', 'anxiety',
    'cool_room', 'warm_room', 'comfortable_bed', 'noise', 'quiet_environment',
    'natural_light', 'blackout_curtains', 'supplements', 'medication'
  ];

  const getFactorLabel = (factor: string) => {
    return factor.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getSleepQualityColor = (quality: number) => {
    if (quality >= 8) return athleticTechTheme.colors.performance.excellent;
    if (quality >= 6) return athleticTechTheme.colors.primary.track;
    if (quality >= 4) return athleticTechTheme.colors.events.sprints;
    return athleticTechTheme.colors.primary.power;
  };

  const calculateSleepDuration = (bedTime: string, wakeTime: string) => {
    if (!bedTime || !wakeTime) return 0;
    
    const bed = new Date(`2000-01-01T${bedTime}:00`);
    let wake = new Date(`2000-01-01T${wakeTime}:00`);
    
    // If wake time is earlier than bed time, assume it's the next day
    if (wake < bed) {
      wake = new Date(`2000-01-02T${wakeTime}:00`);
    }
    
    const diffMs = wake.getTime() - bed.getTime();
    return Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100; // Round to 2 decimal places
  };

  const handleFactorToggle = (factor: string) => {
    setTodayEntry(prev => ({
      ...prev,
      factors: prev.factors.includes(factor)
        ? prev.factors.filter(f => f !== factor)
        : [...prev.factors, factor]
    }));
  };

  const handleSaveToday = () => {
    if (!todayEntry.bedTime || !todayEntry.wakeTime) {
      alert('Please enter both bed time and wake time');
      return;
    }

    const sleepDuration = calculateSleepDuration(todayEntry.bedTime, todayEntry.wakeTime);
    
    const entry: SleepEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      bedTime: todayEntry.bedTime,
      wakeTime: todayEntry.wakeTime,
      sleepDuration,
      sleepQuality: todayEntry.sleepQuality[0],
      timeToFallAsleep: parseInt(todayEntry.timeToFallAsleep) || 0,
      nightWakeups: parseInt(todayEntry.nightWakeups) || 0,
      restfulness: todayEntry.restfulness[0],
      notes: todayEntry.notes || undefined,
      factors: todayEntry.factors.length > 0 ? todayEntry.factors : undefined
    };

    setSleepEntries(prev => [entry, ...prev.filter(e => e.date !== entry.date)]);
    onSave(entry);
  };

  const calculateAverages = () => {
    if (sleepEntries.length === 0) return { duration: 0, quality: 0, restfulness: 0, timeToSleep: 0 };
    
    const recent = sleepEntries.slice(0, 7); // Last 7 entries
    return {
      duration: Math.round((recent.reduce((sum, e) => sum + e.sleepDuration, 0) / recent.length) * 100) / 100,
      quality: Math.round(recent.reduce((sum, e) => sum + e.sleepQuality, 0) / recent.length),
      restfulness: Math.round(recent.reduce((sum, e) => sum + e.restfulness, 0) / recent.length),
      timeToSleep: Math.round(recent.reduce((sum, e) => sum + e.timeToFallAsleep, 0) / recent.length)
    };
  };

  const averages = calculateAverages();
  const currentDuration = calculateSleepDuration(todayEntry.bedTime, todayEntry.wakeTime);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Moon size={24} style={{ color: athleticTechTheme.colors.primary.track }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Sleep Tracker</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Log Sleep</TabsTrigger>
              <TabsTrigger value="history">Sleep History</TabsTrigger>
              <TabsTrigger value="insights">Sleep Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  How did you sleep last night?
                </h3>

                {/* Sleep Times */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bedTime" className="flex items-center space-x-2">
                      <Bed size={16} />
                      <span>Bed Time</span>
                    </Label>
                    <Input
                      id="bedTime"
                      type="time"
                      value={todayEntry.bedTime}
                      onChange={(e) => setTodayEntry(prev => ({ ...prev, bedTime: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="wakeTime" className="flex items-center space-x-2">
                      <Sun size={16} />
                      <span>Wake Time</span>
                    </Label>
                    <Input
                      id="wakeTime"
                      type="time"
                      value={todayEntry.wakeTime}
                      onChange={(e) => setTodayEntry(prev => ({ ...prev, wakeTime: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>Sleep Duration</span>
                    </Label>
                    <div className="h-10 flex items-center px-3 rounded-md border" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                      <span className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {currentDuration > 0 ? `${currentDuration} hours` : 'Enter times above'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sleep Quality Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Sleep Quality</Label>
                        <Badge style={{ backgroundColor: getSleepQualityColor(todayEntry.sleepQuality[0]) }}>
                          {todayEntry.sleepQuality[0]}/10
                        </Badge>
                      </div>
                      <Slider
                        value={todayEntry.sleepQuality}
                        onValueChange={(value) => setTodayEntry(prev => ({ ...prev, sleepQuality: value }))}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <span>Poor</span>
                        <span>Excellent</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>How Rested Do You Feel?</Label>
                        <Badge style={{ backgroundColor: getSleepQualityColor(todayEntry.restfulness[0]) }}>
                          {todayEntry.restfulness[0]}/10
                        </Badge>
                      </div>
                      <Slider
                        value={todayEntry.restfulness}
                        onValueChange={(value) => setTodayEntry(prev => ({ ...prev, restfulness: value }))}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <span>Exhausted</span>
                        <span>Fully Rested</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="timeToSleep">Time to Fall Asleep (minutes)</Label>
                      <Input
                        id="timeToSleep"
                        type="number"
                        value={todayEntry.timeToFallAsleep}
                        onChange={(e) => setTodayEntry(prev => ({ ...prev, timeToFallAsleep: e.target.value }))}
                        placeholder="15"
                      />
                    </div>

                    <div>
                      <Label htmlFor="wakeups">Number of Night Wakeups</Label>
                      <Input
                        id="wakeups"
                        type="number"
                        value={todayEntry.nightWakeups}
                        onChange={(e) => setTodayEntry(prev => ({ ...prev, nightWakeups: e.target.value }))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Sleep Factors */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">What factors affected your sleep?</Label>
                  <div className="flex flex-wrap gap-2">
                    {sleepFactors.map((factor) => (
                      <Button
                        key={factor}
                        variant={todayEntry.factors.includes(factor) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFactorToggle(factor)}
                        style={{
                          backgroundColor: todayEntry.factors.includes(factor) ? athleticTechTheme.colors.primary.track : 'transparent'
                        }}
                      >
                        {getFactorLabel(factor)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes">Sleep Notes</Label>
                  <Textarea
                    id="notes"
                    value={todayEntry.notes}
                    onChange={(e) => setTodayEntry(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="How did you feel when you woke up? Any dreams? What helped or hindered your sleep?"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveToday} style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                    Save Sleep Log
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {sleepEntries.map((entry) => (
                <Card key={entry.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <Moon size={16} style={{ color: athleticTechTheme.colors.primary.track }} />
                        <span className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Badge style={{ backgroundColor: getSleepQualityColor(entry.sleepQuality) }}>
                          Quality: {entry.sleepQuality}/10
                        </Badge>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.field }}>
                          {entry.sleepDuration}h
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                      <div>
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.bedTime}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Bed Time
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.wakeTime}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Wake Time
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.timeToFallAsleep}m
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Time to Sleep
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.nightWakeups}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Wakeups
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.restfulness}/10
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Restfulness
                        </div>
                      </div>
                    </div>

                    {entry.factors && entry.factors.length > 0 && (
                      <div className="mb-3">
                        <div className="text-sm font-medium mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                          Sleep Factors:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {entry.factors.map((factor) => (
                            <Badge key={factor} variant="outline" className="text-xs">
                              {getFactorLabel(factor)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.notes && (
                      <div className="p-3 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                        <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {entry.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp size={20} />
                      <span>7-Day Averages</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Sleep Duration</span>
                        <Badge style={{ backgroundColor: getSleepQualityColor(averages.duration >= 7 ? 8 : 6) }}>
                          {averages.duration}h
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sleep Quality</span>
                        <Badge style={{ backgroundColor: getSleepQualityColor(averages.quality) }}>
                          {averages.quality}/10
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Restfulness</span>
                        <Badge style={{ backgroundColor: getSleepQualityColor(averages.restfulness) }}>
                          {averages.restfulness}/10
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Time to Fall Asleep</span>
                        <Badge style={{ backgroundColor: getSleepQualityColor(averages.timeToSleep <= 20 ? 8 : 6) }}>
                          {averages.timeToSleep}m
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Sleep Optimization Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      <div>
                        <strong>Optimal Sleep Duration:</strong> 7-9 hours for athletes
                      </div>
                      <div>
                        <strong>Consistent Schedule:</strong> Go to bed and wake up at the same time daily
                      </div>
                      <div>
                        <strong>Pre-Sleep Routine:</strong> Wind down 1 hour before bed
                      </div>
                      <div>
                        <strong>Environment:</strong> Cool (65-68°F), dark, and quiet room
                      </div>
                      <div>
                        <strong>Avoid:</strong> Caffeine 6 hours before bed, screens 1 hour before
                      </div>
                      <div>
                        <strong>Recovery:</strong> Quality sleep is crucial for athletic performance
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <CardHeader>
                  <CardTitle>Sleep & Performance Connection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                      <div className="text-lg font-bold mb-2" style={{ color: athleticTechTheme.colors.performance.excellent }}>
                        7-9 Hours
                      </div>
                      <div style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Optimal sleep duration for peak athletic performance and recovery
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                      <div className="text-lg font-bold mb-2" style={{ color: athleticTechTheme.colors.primary.track }}>
                        30% Faster
                      </div>
                      <div style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Recovery time with adequate sleep compared to sleep deprivation
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                      <div className="text-lg font-bold mb-2" style={{ color: athleticTechTheme.colors.primary.power }}>
                        23% Better
                      </div>
                      <div style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Reaction time and decision making with quality sleep
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepTrackerModal;
