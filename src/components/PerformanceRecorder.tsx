import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { AIAnalysisModal } from './AIAnalysisModal';
import { Plus, Zap, Wind, Thermometer } from 'lucide-react';

interface PerformanceData {
  event: string;
  result: string;
  competition_type: 'practice' | 'competition';
  weather_conditions: {
    temperature: number;
    wind_speed: string;
    humidity: number;
    surface: string;
  };
  user_notes: string;
}

interface PerformanceRecorderProps {
  onPerformanceAdded?: (performance: any) => void;
}

export const PerformanceRecorder: React.FC<PerformanceRecorderProps> = ({
  onPerformanceAdded
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  const [formData, setFormData] = useState<PerformanceData>({
    event: '',
    result: '',
    competition_type: 'practice',
    weather_conditions: {
      temperature: 70,
      wind_speed: '0.0',
      humidity: 50,
      surface: 'track'
    },
    user_notes: ''
  });

  const events = {
    'Sprints': ['100m', '200m', '400m', '100m Hurdles', '110m Hurdles', '4x100m Relay', '4x400m Relay'],
    'Distance': ['800m', '1500m', '3000m Steeplechase', '5000m', '10000m'],
    'Jumps': ['Long Jump', 'Triple Jump', 'High Jump', 'Pole Vault'],
    'Throws': ['Shot Put', 'Discus', 'Hammer', 'Javelin']
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('weather_conditions.')) {
      const weatherField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        weather_conditions: {
          ...prev.weather_conditions,
          [weatherField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const analyzePerformance = async () => {
    if (!formData.event || !formData.result) {
      alert('Please fill in event and result');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-performance-analysis', {
        body: {
          event: formData.event,
          result: formData.result,
          experience_level: 'intermediate', // This would come from user profile
          competition_type: formData.competition_type,
          weather_conditions: formData.weather_conditions,
          athlete_data: {
            age: 17, // This would come from user profile
            weight: 145,
            height: "5'8\"",
            training_background: "2 years"
          },
          user_notes: formData.user_notes,
          previous_performances: [] // This would come from stored performances
        }
      });

      if (error) throw error;

      if (data.success) {
        setAnalysisResult(data.analysis);
        setShowAnalysis(true);
        
        // Save performance to local storage or context
        const newPerformance = {
          id: Date.now().toString(),
          ...formData,
          date: new Date().toISOString(),
          analysis: data.analysis
        };
        
        if (onPerformanceAdded) {
          onPerformanceAdded(newPerformance);
        }
        
        // Reset form
        setFormData({
          event: '',
          result: '',
          competition_type: 'practice',
          weather_conditions: {
            temperature: 70,
            wind_speed: '0.0',
            humidity: 50,
            surface: 'track'
          },
          user_notes: ''
        });
        setIsRecording(false);
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze performance. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isRecording) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <Button 
            onClick={() => setIsRecording(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Record New Performance
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Record Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Event Selection */}
          <div className="space-y-2">
            <Label htmlFor="event">Event</Label>
            <Select value={formData.event} onValueChange={(value) => handleInputChange('event', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select event" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(events).map(([category, eventList]) => (
                  <div key={category}>
                    <div className="px-2 py-1 text-sm font-semibold text-gray-500">{category}</div>
                    {eventList.map(event => (
                      <SelectItem key={event} value={event}>{event}</SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Result Input */}
          <div className="space-y-2">
            <Label htmlFor="result">Result</Label>
            <Input
              id="result"
              value={formData.result}
              onChange={(e) => handleInputChange('result', e.target.value)}
              placeholder="e.g., 11.24 (time), 6.45m (distance), 1.85m (height)"
            />
          </div>

          {/* Competition Type */}
          <div className="space-y-2">
            <Label>Type</Label>
            <div className="flex gap-2">
              <Button
                variant={formData.competition_type === 'practice' ? 'default' : 'outline'}
                onClick={() => handleInputChange('competition_type', 'practice')}
                size="sm"
              >
                Practice
              </Button>
              <Button
                variant={formData.competition_type === 'competition' ? 'default' : 'outline'}
                onClick={() => handleInputChange('competition_type', 'competition')}
                size="sm"
              >
                Competition
              </Button>
            </div>
          </div>

          {/* Weather Conditions */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Wind className="h-4 w-4" />
              Weather Conditions
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="temp" className="text-xs">Temperature (°F)</Label>
                <Input
                  id="temp"
                  type="number"
                  value={formData.weather_conditions.temperature}
                  onChange={(e) => handleInputChange('weather_conditions.temperature', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="wind" className="text-xs">Wind Speed (m/s)</Label>
                <Input
                  id="wind"
                  value={formData.weather_conditions.wind_speed}
                  onChange={(e) => handleInputChange('weather_conditions.wind_speed', e.target.value)}
                  placeholder="+1.2"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.user_notes}
              onChange={(e) => handleInputChange('user_notes', e.target.value)}
              placeholder="How did you feel? Any observations about technique or conditions?"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={analyzePerformance}
              disabled={isAnalyzing || !formData.event || !formData.result}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Get AI Analysis
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsRecording(false)}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      <AIAnalysisModal
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
        analysis={analysisResult}
        event={formData.event}
        result={formData.result}
        isLoading={isAnalyzing}
      />
    </>
  );
};

export default PerformanceRecorder;