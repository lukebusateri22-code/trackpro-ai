import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Zap, Battery, TrendingUp, Sun, Sunset, Moon } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface EnergyEntry {
  id: string;
  date: string;
  morningEnergy: number; // 1-10 scale
  afternoonEnergy: number; // 1-10 scale
  eveningEnergy: number; // 1-10 scale
  overallFatigue: number; // 1-10 scale (10 = very fatigued)
  mentalFatigue: number; // 1-10 scale
  physicalFatigue: number; // 1-10 scale
  motivation: number; // 1-10 scale
  notes?: string;
  factors?: string[];
}

interface EnergyTrackerModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const EnergyTrackerModal: React.FC<EnergyTrackerModalProps> = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('today');
  
  // Mock energy data
  const [energyEntries, setEnergyEntries] = useState<EnergyEntry[]>([
    {
      id: '1',
      date: '2025-08-27',
      morningEnergy: 8,
      afternoonEnergy: 7,
      eveningEnergy: 6,
      overallFatigue: 4,
      mentalFatigue: 3,
      physicalFatigue: 5,
      motivation: 8,
      notes: 'Good energy throughout the day. Training went well.',
      factors: ['good_sleep', 'proper_nutrition', 'hydration']
    },
    {
      id: '2',
      date: '2025-08-26',
      morningEnergy: 5,
      afternoonEnergy: 4,
      eveningEnergy: 3,
      overallFatigue: 7,
      mentalFatigue: 8,
      physicalFatigue: 6,
      motivation: 4,
      notes: 'Felt drained all day. Hard training yesterday catching up.',
      factors: ['poor_sleep', 'intense_training', 'stress']
    },
    {
      id: '3',
      date: '2025-08-25',
      morningEnergy: 9,
      afternoonEnergy: 8,
      eveningEnergy: 7,
      overallFatigue: 2,
      mentalFatigue: 2,
      physicalFatigue: 3,
      motivation: 9,
      notes: 'Fantastic energy day! Everything felt effortless.',
      factors: ['great_sleep', 'recovery_day', 'good_mood', 'proper_nutrition']
    }
  ]);

  const [todayEntry, setTodayEntry] = useState({
    morningEnergy: [7],
    afternoonEnergy: [7],
    eveningEnergy: [7],
    overallFatigue: [4],
    mentalFatigue: [4],
    physicalFatigue: [4],
    motivation: [7],
    notes: '',
    factors: [] as string[]
  });

  const energyFactors = [
    'good_sleep', 'poor_sleep', 'proper_nutrition', 'poor_nutrition', 'hydration', 'dehydration',
    'intense_training', 'light_training', 'recovery_day', 'rest_day', 'stress', 'relaxed',
    'good_mood', 'bad_mood', 'caffeine', 'supplements', 'illness', 'injury_pain',
    'weather_good', 'weather_bad', 'social_support', 'isolation', 'goal_achievement', 'setback'
  ];

  const getFactorLabel = (factor: string) => {
    return factor.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getEnergyColor = (energy: number) => {
    if (energy >= 8) return athleticTechTheme.colors.performance.excellent;
    if (energy >= 6) return athleticTechTheme.colors.primary.track;
    if (energy >= 4) return athleticTechTheme.colors.events.sprints;
    return athleticTechTheme.colors.primary.power;
  };

  const getFatigueColor = (fatigue: number) => {
    // For fatigue, lower is better, so invert the color logic
    if (fatigue <= 3) return athleticTechTheme.colors.performance.excellent;
    if (fatigue <= 5) return athleticTechTheme.colors.primary.track;
    if (fatigue <= 7) return athleticTechTheme.colors.events.sprints;
    return athleticTechTheme.colors.primary.power;
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
    const entry: EnergyEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      morningEnergy: todayEntry.morningEnergy[0],
      afternoonEnergy: todayEntry.afternoonEnergy[0],
      eveningEnergy: todayEntry.eveningEnergy[0],
      overallFatigue: todayEntry.overallFatigue[0],
      mentalFatigue: todayEntry.mentalFatigue[0],
      physicalFatigue: todayEntry.physicalFatigue[0],
      motivation: todayEntry.motivation[0],
      notes: todayEntry.notes || undefined,
      factors: todayEntry.factors.length > 0 ? todayEntry.factors : undefined
    };

    setEnergyEntries(prev => [entry, ...prev.filter(e => e.date !== entry.date)]);
    onSave(entry);
  };

  const calculateAverages = () => {
    if (energyEntries.length === 0) return { 
      morningEnergy: 0, afternoonEnergy: 0, eveningEnergy: 0, 
      overallFatigue: 0, motivation: 0 
    };
    
    const recent = energyEntries.slice(0, 7); // Last 7 entries
    return {
      morningEnergy: Math.round(recent.reduce((sum, e) => sum + e.morningEnergy, 0) / recent.length),
      afternoonEnergy: Math.round(recent.reduce((sum, e) => sum + e.afternoonEnergy, 0) / recent.length),
      eveningEnergy: Math.round(recent.reduce((sum, e) => sum + e.eveningEnergy, 0) / recent.length),
      overallFatigue: Math.round(recent.reduce((sum, e) => sum + e.overallFatigue, 0) / recent.length),
      motivation: Math.round(recent.reduce((sum, e) => sum + e.motivation, 0) / recent.length)
    };
  };

  const averages = calculateAverages();

  const getTimeIcon = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'morning': return <Sun size={16} style={{ color: athleticTechTheme.colors.events.sprints }} />;
      case 'afternoon': return <Sunset size={16} style={{ color: athleticTechTheme.colors.primary.track }} />;
      case 'evening': return <Moon size={16} style={{ color: athleticTechTheme.colors.primary.power }} />;
      default: return <Zap size={16} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Zap size={24} style={{ color: athleticTechTheme.colors.events.sprints }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Energy Tracker</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today's Energy</TabsTrigger>
              <TabsTrigger value="history">Energy History</TabsTrigger>
              <TabsTrigger value="insights">Energy Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  Track your energy levels throughout the day
                </h3>

                {/* Energy Levels by Time of Day */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center space-x-2">
                        {getTimeIcon('morning')}
                        <span>Morning Energy</span>
                      </Label>
                      <Badge style={{ backgroundColor: getEnergyColor(todayEntry.morningEnergy[0]) }}>
                        {todayEntry.morningEnergy[0]}/10
                      </Badge>
                    </div>
                    <Slider
                      value={todayEntry.morningEnergy}
                      onValueChange={(value) => setTodayEntry(prev => ({ ...prev, morningEnergy: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      <span>Exhausted</span>
                      <span>Energized</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center space-x-2">
                        {getTimeIcon('afternoon')}
                        <span>Afternoon Energy</span>
                      </Label>
                      <Badge style={{ backgroundColor: getEnergyColor(todayEntry.afternoonEnergy[0]) }}>
                        {todayEntry.afternoonEnergy[0]}/10
                      </Badge>
                    </div>
                    <Slider
                      value={todayEntry.afternoonEnergy}
                      onValueChange={(value) => setTodayEntry(prev => ({ ...prev, afternoonEnergy: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      <span>Drained</span>
                      <span>Energized</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="flex items-center space-x-2">
                        {getTimeIcon('evening')}
                        <span>Evening Energy</span>
                      </Label>
                      <Badge style={{ backgroundColor: getEnergyColor(todayEntry.eveningEnergy[0]) }}>
                        {todayEntry.eveningEnergy[0]}/10
                      </Badge>
                    </div>
                    <Slider
                      value={todayEntry.eveningEnergy}
                      onValueChange={(value) => setTodayEntry(prev => ({ ...prev, eveningEnergy: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      <span>Depleted</span>
                      <span>Still Going</span>
                    </div>
                  </div>
                </div>

                {/* Fatigue Levels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="flex items-center space-x-2">
                          <Battery size={16} />
                          <span>Overall Fatigue</span>
                        </Label>
                        <Badge style={{ backgroundColor: getFatigueColor(todayEntry.overallFatigue[0]) }}>
                          {todayEntry.overallFatigue[0]}/10
                        </Badge>
                      </div>
                      <Slider
                        value={todayEntry.overallFatigue}
                        onValueChange={(value) => setTodayEntry(prev => ({ ...prev, overallFatigue: value }))}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <span>Fresh</span>
                        <span>Exhausted</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Mental Fatigue</Label>
                        <Badge style={{ backgroundColor: getFatigueColor(todayEntry.mentalFatigue[0]) }}>
                          {todayEntry.mentalFatigue[0]}/10
                        </Badge>
                      </div>
                      <Slider
                        value={todayEntry.mentalFatigue}
                        onValueChange={(value) => setTodayEntry(prev => ({ ...prev, mentalFatigue: value }))}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <span>Sharp</span>
                        <span>Brain Fog</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Physical Fatigue</Label>
                        <Badge style={{ backgroundColor: getFatigueColor(todayEntry.physicalFatigue[0]) }}>
                          {todayEntry.physicalFatigue[0]}/10
                        </Badge>
                      </div>
                      <Slider
                        value={todayEntry.physicalFatigue}
                        onValueChange={(value) => setTodayEntry(prev => ({ ...prev, physicalFatigue: value }))}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <span>Strong</span>
                        <span>Weak</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Motivation Level</Label>
                        <Badge style={{ backgroundColor: getEnergyColor(todayEntry.motivation[0]) }}>
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
                        <span>No Drive</span>
                        <span>Fired Up</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Energy Factors */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">What's affecting your energy today?</Label>
                  <div className="flex flex-wrap gap-2">
                    {energyFactors.map((factor) => (
                      <Button
                        key={factor}
                        variant={todayEntry.factors.includes(factor) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFactorToggle(factor)}
                        style={{
                          backgroundColor: todayEntry.factors.includes(factor) ? athleticTechTheme.colors.events.sprints : 'transparent'
                        }}
                      >
                        {getFactorLabel(factor)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes">Energy Notes</Label>
                  <Textarea
                    id="notes"
                    value={todayEntry.notes}
                    onChange={(e) => setTodayEntry(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="How are your energy levels affecting your training? Any patterns you notice?"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveToday} style={{ backgroundColor: athleticTechTheme.colors.events.sprints }}>
                    Save Energy Log
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {energyEntries.map((entry) => (
                <Card key={entry.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <Zap size={16} style={{ color: athleticTechTheme.colors.events.sprints }} />
                        <span className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Badge style={{ backgroundColor: getEnergyColor((entry.morningEnergy + entry.afternoonEnergy + entry.eveningEnergy) / 3) }}>
                          Avg Energy: {Math.round((entry.morningEnergy + entry.afternoonEnergy + entry.eveningEnergy) / 3)}/10
                        </Badge>
                        <Badge style={{ backgroundColor: getFatigueColor(entry.overallFatigue) }}>
                          Fatigue: {entry.overallFatigue}/10
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-7 gap-4 mb-3">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          {getTimeIcon('morning')}
                        </div>
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.morningEnergy}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Morning
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          {getTimeIcon('afternoon')}
                        </div>
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.afternoonEnergy}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Afternoon
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          {getTimeIcon('evening')}
                        </div>
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.eveningEnergy}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Evening
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.overallFatigue}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Overall Fatigue
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.mentalFatigue}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Mental Fatigue
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {entry.physicalFatigue}
                        </div>
                        <div className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Physical Fatigue
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
                    </div>

                    {entry.factors && entry.factors.length > 0 && (
                      <div className="mb-3">
                        <div className="text-sm font-medium mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                          Energy Factors:
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
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Morning Energy</span>
                        <Badge style={{ backgroundColor: getEnergyColor(averages.morningEnergy) }}>
                          {averages.morningEnergy}/10
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Afternoon Energy</span>
                        <Badge style={{ backgroundColor: getEnergyColor(averages.afternoonEnergy) }}>
                          {averages.afternoonEnergy}/10
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Evening Energy</span>
                        <Badge style={{ backgroundColor: getEnergyColor(averages.eveningEnergy) }}>
                          {averages.eveningEnergy}/10
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Overall Fatigue</span>
                        <Badge style={{ backgroundColor: getFatigueColor(averages.overallFatigue) }}>
                          {averages.overallFatigue}/10
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Motivation</span>
                        <Badge style={{ backgroundColor: getEnergyColor(averages.motivation) }}>
                          {averages.motivation}/10
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Energy Management Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      <div>
                        <strong>Morning Energy:</strong> Consistent sleep schedule, morning light exposure
                      </div>
                      <div>
                        <strong>Afternoon Dips:</strong> Light lunch, short walk, avoid heavy carbs
                      </div>
                      <div>
                        <strong>Sustained Energy:</strong> Balanced meals, regular hydration
                      </div>
                      <div>
                        <strong>Combat Fatigue:</strong> Active recovery, proper rest between sessions
                      </div>
                      <div>
                        <strong>Boost Motivation:</strong> Clear goals, celebrate small wins
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <CardHeader>
                  <CardTitle>Energy & Athletic Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                      <div className="text-lg font-bold mb-2" style={{ color: athleticTechTheme.colors.performance.excellent }}>
                        Peak Hours
                      </div>
                      <div style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Schedule high-intensity training during your natural energy peaks
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                      <div className="text-lg font-bold mb-2" style={{ color: athleticTechTheme.colors.primary.track }}>
                        Recovery Signs
                      </div>
                      <div style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Low energy may indicate need for rest or recovery training
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                      <div className="text-lg font-bold mb-2" style={{ color: athleticTechTheme.colors.events.sprints }}>
                        Consistency
                      </div>
                      <div style={{ color: athleticTechTheme.colors.text.secondary }}>
                        Stable energy patterns indicate good training adaptation
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

export default EnergyTrackerModal;
