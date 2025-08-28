import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Clock, Zap, X } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface WorkoutEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
  type: 'strength' | 'cardio' | 'technique' | 'recovery';
  assignedBy?: string;
}

interface WorkoutCalendarProps {
  onClose: () => void;
  onSelectWorkout: (workout: WorkoutEvent) => void;
}

const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({ onClose, onSelectWorkout }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock workout data for the next few weeks
  const mockWorkouts: WorkoutEvent[] = [
    {
      id: '1',
      title: 'Sprint Power Development',
      date: '2025-08-29',
      time: '06:00',
      duration: 90,
      difficulty: 'hard',
      type: 'technique',
      assignedBy: 'Coach Smith'
    },
    {
      id: '2',
      title: 'Strength Training - Lower Body',
      date: '2025-08-30',
      time: '16:00',
      duration: 60,
      difficulty: 'moderate',
      type: 'strength',
      assignedBy: 'Coach Smith'
    },
    {
      id: '3',
      title: 'Recovery & Mobility',
      date: '2025-09-01',
      time: '10:00',
      duration: 45,
      difficulty: 'easy',
      type: 'recovery',
      assignedBy: 'Coach Smith'
    },
    {
      id: '4',
      title: 'Track Intervals',
      date: '2025-09-02',
      time: '07:00',
      duration: 75,
      difficulty: 'hard',
      type: 'cardio',
      assignedBy: 'Coach Smith'
    },
    {
      id: '5',
      title: 'Technique Focus - Long Jump',
      date: '2025-09-04',
      time: '15:30',
      duration: 90,
      difficulty: 'moderate',
      type: 'technique',
      assignedBy: 'Coach Smith'
    },
    {
      id: '6',
      title: 'Upper Body Strength',
      date: '2025-09-05',
      time: '17:00',
      duration: 50,
      difficulty: 'moderate',
      type: 'strength',
      assignedBy: 'Coach Smith'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getWorkoutsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockWorkouts.filter(workout => workout.date === dateStr);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return athleticTechTheme.colors.performance.excellent;
      case 'moderate': return athleticTechTheme.colors.primary.track;
      case 'hard': return athleticTechTheme.colors.primary.power;
      case 'extreme': return '#ef4444';
      default: return athleticTechTheme.colors.primary.track;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'strength': return athleticTechTheme.colors.primary.track;
      case 'cardio': return athleticTechTheme.colors.events.sprints;
      case 'technique': return athleticTechTheme.colors.primary.power;
      case 'recovery': return athleticTechTheme.colors.performance.recovery;
      default: return athleticTechTheme.colors.primary.track;
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const workouts = getWorkoutsForDate(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() && 
                     new Date().getFullYear() === currentDate.getFullYear();
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-1 ${isToday ? 'bg-blue-50' : ''}`}
          style={{ backgroundColor: isToday ? athleticTechTheme.colors.primary.track + '10' : 'transparent' }}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : ''}`}>
            {day}
          </div>
          <div className="space-y-1">
            {workouts.slice(0, 2).map((workout) => (
              <div
                key={workout.id}
                className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
                style={{ backgroundColor: getTypeColor(workout.type) + '20', color: getTypeColor(workout.type) }}
                onClick={() => onSelectWorkout(workout)}
              >
                <div className="font-medium truncate">{workout.title}</div>
                <div className="flex items-center space-x-1">
                  <Clock size={8} />
                  <span>{workout.time}</span>
                </div>
              </div>
            ))}
            {workouts.length > 2 && (
              <div className="text-xs text-gray-500">
                +{workouts.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  const upcomingWorkouts = mockWorkouts
    .filter(workout => new Date(workout.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Calendar size={24} style={{ color: athleticTechTheme.colors.primary.track }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Training Calendar</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {formatDate(currentDate)}
                </h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft size={16} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div 
                    key={day} 
                    className="h-8 flex items-center justify-center text-sm font-medium border-b border-gray-200"
                    style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                  >
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {renderCalendarDays()}
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: getTypeColor('strength') }}></div>
                  <span className="text-sm">Strength</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: getTypeColor('cardio') }}></div>
                  <span className="text-sm">Cardio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: getTypeColor('technique') }}></div>
                  <span className="text-sm">Technique</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: getTypeColor('recovery') }}></div>
                  <span className="text-sm">Recovery</span>
                </div>
              </div>
            </div>

            {/* Upcoming Workouts */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: athleticTechTheme.colors.text.primary }}>
                Upcoming Workouts
              </h3>
              <div className="space-y-3">
                {upcomingWorkouts.map((workout) => (
                  <Card 
                    key={workout.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                    onClick={() => onSelectWorkout(workout)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {workout.title}
                        </h4>
                        <Badge style={{ backgroundColor: getDifficultyColor(workout.difficulty) }}>
                          {workout.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>{new Date(workout.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>{workout.time} ({workout.duration} min)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap size={12} />
                          <span>{workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}</span>
                        </div>
                        {workout.assignedBy && (
                          <div className="text-xs" style={{ color: athleticTechTheme.colors.primary.track }}>
                            Assigned by {workout.assignedBy}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {upcomingWorkouts.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                    <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                      No upcoming workouts scheduled
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutCalendar;
