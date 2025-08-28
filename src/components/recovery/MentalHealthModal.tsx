import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Brain, Heart, Smile, Frown, Meh, Plus, TrendingUp, Calendar } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-10 scale
  stress: number; // 1-10 scale
  motivation: number; // 1-10 scale
  anxiety: number; // 1-10 scale
  confidence: number; // 1-10 scale
  notes?: string;
  triggers?: string[];
}

interface MentalHealthModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const MentalHealthModal: React.FC<MentalHealthModalProps> = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('today');
  
  // Mock mental health data
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      id: '1',
      date: '2025-08-27',
      mood: 8,
      stress: 4,
      motivation: 9,
      anxiety: 3,
      confidence: 8,
      notes: 'Great training session today. Feeling really positive about upcoming competition.',
      triggers: ['good_performance', 'coach_feedback']
    },
    {
      id: '2',
      date: '2025-08-26',
      mood: 6,
      stress: 7,
      motivation: 5,
      anxiety: 6,
      confidence: 6,
      notes: 'Struggled with technique today. Feeling a bit frustrated.',
      triggers: ['poor_performance', 'technique_issues']
    },
    {
      id: '3',
      date: '2025-08-25',
      mood: 7,
      stress: 5,
      motivation: 7,
      anxiety: 4,
      confidence: 7,
      notes: 'Decent day overall. Recovery session went well.',
      triggers: ['recovery_day', 'good_sleep']
    }
  ]);

  const [todayEntry, setTodayEntry] = useState({
    mood: [7],
    stress: [5],
    motivation: [7],
    anxiety: [4],
    confidence: [7],
    notes: '',
    triggers: [] as string[]
  });

  const commonTriggers = [
    'good_performance', 'poor_performance', 'coach_feedback', 'peer_pressure',
    'competition_anxiety', 'injury_concern', 'good_sleep', 'poor_sleep',
    'nutrition_issues', 'recovery_day', 'technique_issues', 'personal_life',
    'weather', 'training_intensity', 'goal_achievement', 'setback'
  ];

  const getTriggerLabel = (trigger: string) => {
    return trigger.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getMoodIcon = (mood: number) => {
    if (mood >= 8) return <Smile size={20} style={{ color: athleticTechTheme.colors.performance.excellent }} />;
    if (mood >= 6) return <Meh size={20} style={{ color: athleticTechTheme.colors.primary.track }} />;
    return <Frown size={20} style={{ color: athleticTechTheme.colors.primary.power }} />;
  };

  const getMoodColor = (value: number) => {
    if (value >= 8) return athleticTechTheme.colors.performance.excellent;
    if (value >= 6) return athleticTechTheme.colors.primary.track;
    if (value >= 4) return athleticTechTheme.colors.events.sprints;
    return athleticTechTheme.colors.primary.power;
  };

  const handleTriggerToggle = (trigger: string) => {
    setTodayEntry(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  const handleSaveToday = () => {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: todayEntry.mood[0],
      stress: todayEntry.stress[0],
      motivation: todayEntry.motivation[0],
      anxiety: todayEntry.anxiety[0],
      confidence: todayEntry.confidence[0],
      notes: todayEntry.notes || undefined,
      triggers: todayEntry.triggers.length > 0 ? todayEntry.triggers : undefined
    };

    setMoodEntries(prev => [entry, ...prev.filter(e => e.date !== entry.date)]);
    onSave(entry);
  };

  const calculateAverages = () => {
    if (moodEntries.length === 0) return { mood: 0, stress: 0, motivation: 0, anxiety: 0, confidence: 0 };
    
    const recent = moodEntries.slice(0, 7); // Last 7 entries
    return {
      mood: Math.round(recent.reduce((sum, e) => sum + e.mood, 0) / recent.length),
      stress: Math.round(recent.reduce((sum, e) => sum + e.stress, 0) / recent.length),
      motivation: Math.round(recent.reduce((sum, e) => sum + e.motivation, 0) / recent.length),
      anxiety: Math.round(recent.reduce((sum, e) => sum + e.anxiety, 0) / recent.length),
      confidence: Math.round(recent.reduce((sum, e) => sum + e.confidence, 0) / recent.length)
    };
  };

  const averages = calculateAverages();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Brain size={24} style={{ color: athleticTechTheme.colors.primary.power }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Mental Health Tracker</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today's Check-in</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  How are you feeling today?
                </h3>

                {/* Mood Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="flex items-center space-x-2">
                          <Heart size={16} style={{ color: athleticTechTheme.colors.primary.power }} />
                          <span>Overall Mood</span>
                        </Label>
                        <Badge style={{ backgroundColor: getMoodColor(todayEntry.mood[0]) }}>
                          {todayEntry.mood[0]}/10
                        </Badge>
                      </div>
                      <Slider
                        value={todayEntry.mood}
                        onValueChange={(value) => setTodayEntry(prev => ({ ...prev, mood: value }))}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <span>Very Low</span>
                        <span>Excellent</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Stress Level</Label>
                        <Badge style={{ backgroundColor: getMoodColor(11 - todayEntry.stress[0]) }}>
                          {todayEntry.stress[0]}/10
                        </Badge>
                      </div>
                      <Slider
                        value={todayEntry.stress}
                        onValueChange={(value) => setTodayEntry(prev => ({ ...prev, stress: value }))}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <span>Very Relaxed</span>
                        <span>Very Stressed</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Motivation</Label>
                        <Badge style={{ backgroundColor: getMoodColor(todayEntry.motivation[0]) }}>
                          {todayEntry.motivation[0]}/10
                        </Badge>
                      </div>
                      <Slider
                        value={todayEntry.motivation}
                        onValueChange={(value) => setTodayEntry(prev => ({ ...prev, motivation: value }))}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <span>No Motivation</span>
                        <span>Highly Motivated</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Anxiety Level</Label>
                        <Badge style={{ backgroundColor: getMoodColor(11 - todayEntry.anxiety[0]) }}>
                          {todayEntry.anxiety[0]}/10
                        </Badge>
                      </div>
                      <Slider
                        value={todayEntry.anxiety}
                        onValueChange={(value) => setTodayEntry(prev => ({ ...prev, anxiety: value }))}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <span>Very Calm</span>
                        <span>Very Anxious</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Confidence</Label>
                        <Badge style={{ backgroundColor: getMoodColor(todayEntry.confidence[0]) }}>
                          {todayEntry.confidence[0]}/10
                        </Badge>
                      </div>
                      <Slider
                        value={todayEntry.confidence}
                        onValueChange={(value) => setTodayEntry(prev => ({ ...prev, confidence: value }))}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <span>Not Confident</span>
                        <span>Very Confident</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Triggers */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">What's affecting your mood today?</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonTriggers.map((trigger) => (
                      <Button
                        key={trigger}
                        variant={todayEntry.triggers.includes(trigger) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTriggerToggle(trigger)}
                        style={{
                          backgroundColor: todayEntry.triggers.includes(trigger) ? athleticTechTheme.colors.primary.track : 'transparent'
                        }}
                      >
                        {getTriggerLabel(trigger)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={todayEntry.notes}
                    onChange={(e) => setTodayEntry(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="How are you feeling? What's on your mind? Any specific thoughts about training or competition?"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveToday} style={{ backgroundColor: athleticTechTheme.colors.primary.power }}>
                    Save Check-in
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {moodEntries.map((entry) => (
                <Card key={entry.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        {getMoodIcon(entry.mood)}
                        <span className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Badge style={{ backgroundColor: getMoodColor(entry.mood) }}>
                          Mood: {entry.mood}/10
                        </Badge>
                        <Badge style={{ backgroundColor: getMoodColor(11 - entry.stress) }}>
                          Stress: {entry.stress}/10
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.mood}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Mood
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.stress}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Stress
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.motivation}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Motivation
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.anxiety}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Anxiety
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.confidence}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Confidence
                        </div>
                      </div>
                    </div>

                    {entry.triggers && entry.triggers.length > 0 && (
                      <div className="mb-3">
                        <div className="text-sm font-medium mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                          Triggers:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {entry.triggers.map((trigger) => (
                            <Badge key={trigger} variant="outline" className="text-xs">
                              {getTriggerLabel(trigger)}
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
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Mood</span>
                        <Badge style={{ backgroundColor: getMoodColor(averages.mood) }}>
                          {averages.mood}/10
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Stress</span>
                        <Badge style={{ backgroundColor: getMoodColor(11 - averages.stress) }}>
                          {averages.stress}/10
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Motivation</span>
                        <Badge style={{ backgroundColor: getMoodColor(averages.motivation) }}>
                          {averages.motivation}/10
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Anxiety</span>
                        <Badge style={{ backgroundColor: getMoodColor(11 - averages.anxiety) }}>
                          {averages.anxiety}/10
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Confidence</span>
                        <Badge style={{ backgroundColor: getMoodColor(averages.confidence) }}>
                          {averages.confidence}/10
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Mental Health Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      <div>
                        <strong>For Better Mood:</strong> Regular exercise, adequate sleep, and social connections
                      </div>
                      <div>
                        <strong>Stress Management:</strong> Deep breathing, meditation, and time management
                      </div>
                      <div>
                        <strong>Boost Motivation:</strong> Set small achievable goals and celebrate progress
                      </div>
                      <div>
                        <strong>Reduce Anxiety:</strong> Practice mindfulness and challenge negative thoughts
                      </div>
                      <div>
                        <strong>Build Confidence:</strong> Focus on strengths and past successes
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthModal;
