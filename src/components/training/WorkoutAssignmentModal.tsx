import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Users, User, Target, Calendar, Clock, Zap } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface Athlete {
  id: string;
  name: string;
  events: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: any[];
  estimatedDuration: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
}

interface WorkoutAssignmentModalProps {
  workout: Workout;
  onClose: () => void;
  onAssign: (assignmentData: any) => void;
}

const WorkoutAssignmentModal: React.FC<WorkoutAssignmentModalProps> = ({ workout, onClose, onAssign }) => {
  const [assignmentType, setAssignmentType] = useState<'individual' | 'event_group' | 'whole_team'>('individual');
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [notes, setNotes] = useState('');
  const [modifications, setModifications] = useState('');

  // Mock athlete data
  const mockAthletes: Athlete[] = [
    { id: '1', name: 'Sarah Johnson', events: ['100m', '200m'], level: 'advanced' },
    { id: '2', name: 'Mike Chen', events: ['Long Jump', 'Triple Jump'], level: 'intermediate' },
    { id: '3', name: 'Emma Davis', events: ['800m', '1500m'], level: 'advanced' },
    { id: '4', name: 'Jake Wilson', events: ['Shot Put', 'Discus'], level: 'beginner' },
    { id: '5', name: 'Lisa Rodriguez', events: ['100m', 'Long Jump'], level: 'intermediate' },
    { id: '6', name: 'Tom Anderson', events: ['400m', '800m'], level: 'advanced' },
    { id: '7', name: 'Maya Patel', events: ['High Jump', 'Pole Vault'], level: 'intermediate' },
    { id: '8', name: 'Alex Thompson', events: ['Javelin', 'Hammer Throw'], level: 'beginner' }
  ];

  const events = ['100m', '200m', '400m', '800m', '1500m', 'Long Jump', 'High Jump', 'Triple Jump', 'Pole Vault', 'Shot Put', 'Discus', 'Javelin', 'Hammer Throw'];

  const getAthletesByEvent = (event: string) => {
    return mockAthletes.filter(athlete => athlete.events.includes(event));
  };

  const handleAthleteToggle = (athleteId: string) => {
    setSelectedAthletes(prev => 
      prev.includes(athleteId) 
        ? prev.filter(id => id !== athleteId)
        : [...prev, athleteId]
    );
  };

  const handleAssign = () => {
    let targetAthletes: string[] = [];
    
    switch (assignmentType) {
      case 'individual':
        targetAthletes = selectedAthletes;
        break;
      case 'event_group':
        targetAthletes = getAthletesByEvent(selectedEvent).map(a => a.id);
        break;
      case 'whole_team':
        targetAthletes = mockAthletes.map(a => a.id);
        break;
    }

    const assignmentData = {
      workoutId: workout.id,
      assignmentType,
      targetAthletes,
      selectedEvent: assignmentType === 'event_group' ? selectedEvent : undefined,
      scheduledDate: scheduledDate || undefined,
      scheduledTime: scheduledTime || undefined,
      priority,
      notes: notes || undefined,
      modifications: modifications || undefined,
      assignedAt: new Date().toISOString()
    };

    onAssign(assignmentData);
  };

  const canAssign = () => {
    switch (assignmentType) {
      case 'individual':
        return selectedAthletes.length > 0;
      case 'event_group':
        return selectedEvent !== '';
      case 'whole_team':
        return true;
      default:
        return false;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return athleticTechTheme.colors.performance.excellent;
      case 'medium': return athleticTechTheme.colors.primary.track;
      case 'high': return athleticTechTheme.colors.primary.power;
      default: return athleticTechTheme.colors.primary.track;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return athleticTechTheme.colors.performance.excellent;
      case 'intermediate': return athleticTechTheme.colors.primary.track;
      case 'advanced': return athleticTechTheme.colors.primary.power;
      default: return athleticTechTheme.colors.primary.track;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target size={24} style={{ color: athleticTechTheme.colors.primary.power }} />
                <span style={{ color: athleticTechTheme.colors.text.primary }}>Assign Workout</span>
              </CardTitle>
              <p className="mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Assign "{workout.name}" to athletes with priority and scheduling options
              </p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Workout Summary */}
          <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                    {workout.name}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    {workout.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge style={{ backgroundColor: getPriorityColor(workout.difficulty) }}>
                    {workout.difficulty.toUpperCase()}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    <Clock size={14} />
                    <span>{workout.estimatedDuration} min</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignment Type */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Assignment Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${assignmentType === 'individual' ? 'ring-2 ring-blue-500' : ''}`}
                style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                onClick={() => setAssignmentType('individual')}
              >
                <CardContent className="p-4 text-center">
                  <User size={24} className="mx-auto mb-2" style={{ color: athleticTechTheme.colors.primary.track }} />
                  <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>Individual</h3>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Select specific athletes
                  </p>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${assignmentType === 'event_group' ? 'ring-2 ring-blue-500' : ''}`}
                style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                onClick={() => setAssignmentType('event_group')}
              >
                <CardContent className="p-4 text-center">
                  <Target size={24} className="mx-auto mb-2" style={{ color: athleticTechTheme.colors.primary.power }} />
                  <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>Event Group</h3>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    All athletes in an event
                  </p>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${assignmentType === 'whole_team' ? 'ring-2 ring-blue-500' : ''}`}
                style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                onClick={() => setAssignmentType('whole_team')}
              >
                <CardContent className="p-4 text-center">
                  <Users size={24} className="mx-auto mb-2" style={{ color: athleticTechTheme.colors.events.sprints }} />
                  <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>Whole Team</h3>
                  <p className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Assign to all athletes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Individual Selection */}
          {assignmentType === 'individual' && (
            <div>
              <Label className="text-base font-semibold mb-3 block">Select Athletes</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {mockAthletes.map((athlete) => (
                  <div 
                    key={athlete.id}
                    className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50"
                    style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                    onClick={() => handleAthleteToggle(athlete.id)}
                  >
                    <Checkbox 
                      checked={selectedAthletes.includes(athlete.id)}
                      onChange={() => handleAthleteToggle(athlete.id)}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {athlete.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge size="sm" style={{ backgroundColor: getLevelColor(athlete.level) }}>
                          {athlete.level}
                        </Badge>
                        <span className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {athlete.events.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Selected: {selectedAthletes.length} athlete{selectedAthletes.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {/* Event Group Selection */}
          {assignmentType === 'event_group' && (
            <div>
              <Label className="text-base font-semibold mb-3 block">Select Event Group</Label>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => {
                    const athleteCount = getAthletesByEvent(event).length;
                    return (
                      <SelectItem key={event} value={event}>
                        {event} ({athleteCount} athlete{athleteCount !== 1 ? 's' : ''})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {selectedEvent && (
                <div className="mt-3">
                  <p className="text-sm mb-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                    Athletes in {selectedEvent}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getAthletesByEvent(selectedEvent).map((athlete) => (
                      <Badge key={athlete.id} variant="outline">
                        {athlete.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Whole Team Info */}
          {assignmentType === 'whole_team' && (
            <div>
              <Label className="text-base font-semibold mb-3 block">Whole Team Assignment</Label>
              <div className="p-4 rounded-lg" style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                  This workout will be assigned to all {mockAthletes.length} athletes on your team.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {mockAthletes.slice(0, 6).map((athlete) => (
                    <Badge key={athlete.id} variant="outline">
                      {athlete.name}
                    </Badge>
                  ))}
                  {mockAthletes.length > 6 && (
                    <Badge variant="outline">
                      +{mockAthletes.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Scheduling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Scheduled Date (Optional)</Label>
              <Input
                id="date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="time">Scheduled Time (Optional)</Label>
              <Input
                id="time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Priority Level</Label>
            <div className="flex space-x-4">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <Button
                  key={level}
                  variant={priority === level ? "default" : "outline"}
                  onClick={() => setPriority(level)}
                  style={{
                    backgroundColor: priority === level ? getPriorityColor(level) : 'transparent'
                  }}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Notes and Modifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="notes">Notes for Athletes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions or notes..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="modifications">Suggested Modifications</Label>
              <Textarea
                id="modifications"
                value={modifications}
                onChange={(e) => setModifications(e.target.value)}
                placeholder="Modifications for different skill levels..."
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssign}
              disabled={!canAssign()}
              style={{ backgroundColor: athleticTechTheme.colors.primary.track }}
            >
              <Target size={16} className="mr-2" />
              Assign Workout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutAssignmentModal;
