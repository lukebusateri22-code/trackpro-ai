import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, BarChart3, TrendingUp, Calendar, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface PerformanceData {
  date: string;
  performance: number;
  event: string;
  meet?: string;
}

interface StatisticsModalProps {
  onClose: () => void;
}

const StatisticsModal: React.FC<StatisticsModalProps> = ({ onClose }) => {
  const [selectedEvent, setSelectedEvent] = useState('100m');
  const [timeRange, setTimeRange] = useState('season'); // season, year, all

  // Mock performance data
  const performanceData: Record<string, PerformanceData[]> = {
    '100m': [
      { date: '2025-03-15', performance: 13.2, event: '100m', meet: 'Spring Opener' },
      { date: '2025-04-10', performance: 12.95, event: '100m', meet: 'City Championships' },
      { date: '2025-05-05', performance: 12.78, event: '100m', meet: 'Regional Qualifier' },
      { date: '2025-06-01', performance: 12.65, event: '100m', meet: 'State Prelims' },
      { date: '2025-07-15', performance: 12.45, event: '100m', meet: 'State Championships' },
      { date: '2025-08-01', performance: 12.52, event: '100m', meet: 'Summer Classic' }
    ],
    '200m': [
      { date: '2025-03-20', performance: 26.8, event: '200m', meet: 'Spring Opener' },
      { date: '2025-04-15', performance: 26.2, event: '200m', meet: 'City Championships' },
      { date: '2025-05-10', performance: 25.9, event: '200m', meet: 'Regional Qualifier' },
      { date: '2025-06-05', performance: 25.4, event: '200m', meet: 'State Prelims' },
      { date: '2025-06-20', performance: 25.12, event: '200m', meet: 'Regional Meet' }
    ],
    'Long Jump': [
      { date: '2025-03-25', performance: 6.2, event: 'Long Jump', meet: 'Spring Opener' },
      { date: '2025-04-20', performance: 6.45, event: 'Long Jump', meet: 'City Championships' },
      { date: '2025-05-15', performance: 6.58, event: 'Long Jump', meet: 'Regional Qualifier' },
      { date: '2025-06-10', performance: 6.72, event: 'Long Jump', meet: 'State Prelims' },
      { date: '2025-08-01', performance: 6.85, event: 'Long Jump', meet: 'Summer Classic' }
    ],
    'Triple Jump': [
      { date: '2025-04-05', performance: 13.2, event: 'Triple Jump', meet: 'City Championships' },
      { date: '2025-05-20', performance: 13.8, event: 'Triple Jump', meet: 'Regional Qualifier' },
      { date: '2025-06-15', performance: 14.1, event: 'Triple Jump', meet: 'State Prelims' },
      { date: '2025-07-20', performance: 14.35, event: 'Triple Jump', meet: 'Summer Meet' }
    ]
  };

  // Training volume data
  const trainingVolumeData = [
    { week: 'Week 1', volume: 25, intensity: 65 },
    { week: 'Week 2', volume: 28, intensity: 70 },
    { week: 'Week 3', volume: 32, intensity: 75 },
    { week: 'Week 4', volume: 20, intensity: 60 }, // Recovery week
    { week: 'Week 5', volume: 30, intensity: 80 },
    { week: 'Week 6', volume: 35, intensity: 85 },
    { week: 'Week 7', volume: 38, intensity: 90 },
    { week: 'Week 8', volume: 22, intensity: 65 }, // Taper
  ];

  const events = ['100m', '200m', '400m', 'Long Jump', 'Triple Jump', 'High Jump'];
  
  const currentData = performanceData[selectedEvent] || [];
  
  // Calculate statistics
  const personalBest = Math.min(...currentData.map(d => d.performance));
  const seasonBest = personalBest; // Assuming all data is from current season
  const improvement = currentData.length > 1 
    ? ((currentData[0].performance - personalBest) / currentData[0].performance * 100).toFixed(1)
    : '0';
  
  const averagePerformance = (currentData.reduce((sum, d) => sum + d.performance, 0) / currentData.length).toFixed(2);

  // Format performance based on event type
  const formatPerformance = (value: number, event: string) => {
    if (event.includes('Jump')) {
      return `${value.toFixed(2)}m`;
    } else {
      return `${value.toFixed(2)}s`;
    }
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-lg shadow-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
          <p className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
            {data.meet || label}
          </p>
          <p style={{ color: athleticTechTheme.colors.primary.track }}>
            Performance: {formatPerformance(payload[0].value, selectedEvent)}
          </p>
          <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
            {new Date(data.date).toLocaleDateString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 size={24} style={{ color: athleticTechTheme.colors.primary.field }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Performance Statistics</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="performance">Event Performance</TabsTrigger>
              <TabsTrigger value="training">Training Volume</TabsTrigger>
              <TabsTrigger value="summary">Season Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              {/* Controls */}
              <div className="flex space-x-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                    Event
                  </label>
                  <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map(event => (
                        <SelectItem key={event} value={event}>
                          {event}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                    Time Range
                  </label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="season">Season</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Performance Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.performance.excellent }}>
                      {formatPerformance(personalBest, selectedEvent)}
                    </div>
                    <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      Personal Best
                    </div>
                  </CardContent>
                </Card>
                
                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.primary.track }}>
                      {formatPerformance(seasonBest, selectedEvent)}
                    </div>
                    <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      Season Best
                    </div>
                  </CardContent>
                </Card>
                
                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.primary.power }}>
                      {improvement}%
                    </div>
                    <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      Improvement
                    </div>
                  </CardContent>
                </Card>
                
                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold mb-1" style={{ color: athleticTechTheme.colors.primary.field }}>
                      {formatPerformance(parseFloat(averagePerformance), selectedEvent)}
                    </div>
                    <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      Average
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp size={20} />
                    <span>{selectedEvent} Performance Progression</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={athleticTechTheme.colors.interactive.border} />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          stroke={athleticTechTheme.colors.text.secondary}
                        />
                        <YAxis 
                          domain={['dataMin - 0.1', 'dataMax + 0.1']}
                          tickFormatter={(value) => formatPerformance(value, selectedEvent)}
                          stroke={athleticTechTheme.colors.text.secondary}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line 
                          type="monotone" 
                          dataKey="performance" 
                          stroke={athleticTechTheme.colors.primary.track}
                          strokeWidth={3}
                          dot={{ fill: athleticTechTheme.colors.primary.track, strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, fill: athleticTechTheme.colors.performance.excellent }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training" className="space-y-6">
              <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <CardHeader>
                  <CardTitle>Training Volume & Intensity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trainingVolumeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={athleticTechTheme.colors.interactive.border} />
                        <XAxis dataKey="week" stroke={athleticTechTheme.colors.text.secondary} />
                        <YAxis stroke={athleticTechTheme.colors.text.secondary} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: athleticTechTheme.colors.surface.elevated,
                            border: `1px solid ${athleticTechTheme.colors.interactive.border}`,
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="volume" fill={athleticTechTheme.colors.primary.track} name="Volume (hours)" />
                        <Bar dataKey="intensity" fill={athleticTechTheme.colors.primary.power} name="Intensity %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Season Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Competitions</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personal Bests Set</span>
                        <span className="font-semibold">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Podium Finishes</span>
                        <span className="font-semibold">7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Training Sessions</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Training Hours</span>
                        <span className="font-semibold">234</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Event Rankings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {events.slice(0, 5).map((event, index) => (
                        <div key={event} className="flex justify-between items-center">
                          <span>{event}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${90 - index * 10}%`,
                                  backgroundColor: athleticTechTheme.colors.primary.track 
                                }}
                              />
                            </div>
                            <span className="text-sm font-semibold">#{index + 1}</span>
                          </div>
                        </div>
                      ))}
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

export default StatisticsModal;
