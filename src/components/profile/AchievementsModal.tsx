import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Trophy, Medal, Award, Target, Zap, Calendar, TrendingUp } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface PersonalRecord {
  id: string;
  event: string;
  performance: string;
  date: string;
  location: string;
  conditions?: string;
  isSeasonBest: boolean;
  isPersonalBest: boolean;
}

interface LiftingRecord {
  id: string;
  exercise: string;
  weight: number;
  unit: string;
  reps: number;
  date: string;
  bodyweight?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  category: 'performance' | 'consistency' | 'improvement' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementsModalProps {
  onClose: () => void;
}

const AchievementsModal: React.FC<AchievementsModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('track');

  // Mock data for personal records
  const trackRecords: PersonalRecord[] = [
    {
      id: '1',
      event: '100m',
      performance: '12.45',
      date: '2025-07-15',
      location: 'State Championships',
      conditions: 'Wind: +1.2 m/s',
      isSeasonBest: true,
      isPersonalBest: true
    },
    {
      id: '2',
      event: '200m',
      performance: '25.12',
      date: '2025-06-20',
      location: 'Regional Meet',
      conditions: 'Wind: +0.8 m/s',
      isSeasonBest: true,
      isPersonalBest: false
    },
    {
      id: '3',
      event: 'Long Jump',
      performance: '6.85m',
      date: '2025-08-01',
      location: 'Summer Classic',
      conditions: 'Wind: +1.5 m/s',
      isSeasonBest: true,
      isPersonalBest: true
    },
    {
      id: '4',
      event: '400m',
      performance: '55.23',
      date: '2025-05-10',
      location: 'Spring Invitational',
      isSeasonBest: false,
      isPersonalBest: false
    }
  ];

  const liftingRecords: LiftingRecord[] = [
    {
      id: '1',
      exercise: 'Back Squat',
      weight: 315,
      unit: 'lbs',
      reps: 1,
      date: '2025-08-10',
      bodyweight: 165
    },
    {
      id: '2',
      exercise: 'Bench Press',
      weight: 225,
      unit: 'lbs',
      reps: 1,
      date: '2025-07-25',
      bodyweight: 165
    },
    {
      id: '3',
      exercise: 'Deadlift',
      weight: 405,
      unit: 'lbs',
      reps: 1,
      date: '2025-08-05',
      bodyweight: 165
    },
    {
      id: '4',
      exercise: 'Power Clean',
      weight: 185,
      unit: 'lbs',
      reps: 1,
      date: '2025-07-30',
      bodyweight: 165
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Speed Demon',
      description: 'Broke 13 seconds in the 100m',
      icon: '⚡',
      date: '2025-07-15',
      category: 'performance',
      rarity: 'epic'
    },
    {
      id: '2',
      title: 'Consistency King',
      description: 'Completed 30 consecutive training sessions',
      icon: '🔥',
      date: '2025-08-01',
      category: 'consistency',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Personal Best',
      description: 'Set a new PR in Long Jump',
      icon: '🏆',
      date: '2025-08-01',
      category: 'performance',
      rarity: 'legendary'
    },
    {
      id: '4',
      title: 'Strength Milestone',
      description: 'Squatted 2x bodyweight',
      icon: '💪',
      date: '2025-08-10',
      category: 'milestone',
      rarity: 'epic'
    },
    {
      id: '5',
      title: 'Improvement Streak',
      description: 'Improved 100m time by 0.5s this season',
      icon: '📈',
      date: '2025-07-15',
      category: 'improvement',
      rarity: 'rare'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return athleticTechTheme.colors.primary.power;
      case 'epic': return athleticTechTheme.colors.events.sprints;
      case 'rare': return athleticTechTheme.colors.primary.track;
      case 'common': return athleticTechTheme.colors.text.secondary;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return Trophy;
      case 'consistency': return Target;
      case 'improvement': return TrendingUp;
      case 'milestone': return Medal;
      default: return Award;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Trophy size={24} style={{ color: athleticTechTheme.colors.primary.power }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Achievements & Records</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="track">Track & Field PRs</TabsTrigger>
              <TabsTrigger value="lifting">Lifting PRs</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="track" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trackRecords.map((record) => (
                  <Card key={record.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {record.event}
                        </h3>
                        <div className="flex space-x-1">
                          {record.isPersonalBest && (
                            <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.power }}>
                              PB
                            </Badge>
                          )}
                          {record.isSeasonBest && (
                            <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
                              SB
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.performance.excellent }}>
                        {record.performance}
                      </div>
                      
                      <div className="space-y-1 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        <div>{record.location}</div>
                        {record.conditions && <div>{record.conditions}</div>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lifting" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {liftingRecords.map((record) => (
                  <Card key={record.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {record.exercise}
                      </h3>
                      
                      <div className="text-2xl font-bold mb-2" style={{ color: athleticTechTheme.colors.performance.excellent }}>
                        {record.weight} {record.unit}
                        {record.reps > 1 && <span className="text-base ml-2">x{record.reps}</span>}
                      </div>
                      
                      <div className="space-y-1 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        {record.bodyweight && (
                          <div>
                            Bodyweight: {record.bodyweight} lbs
                            <span className="ml-2 font-medium">
                              ({(record.weight / record.bodyweight).toFixed(1)}x BW)
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => {
                  const CategoryIcon = getCategoryIcon(achievement.category);
                  return (
                    <Card key={achievement.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="text-3xl">{achievement.icon}</div>
                          <Badge style={{ backgroundColor: getRarityColor(achievement.rarity) }}>
                            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                          </Badge>
                        </div>
                        
                        <h3 className="font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                          {achievement.title}
                        </h3>
                        
                        <p className="text-sm mb-3" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {achievement.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CategoryIcon size={14} style={{ color: athleticTechTheme.colors.primary.track }} />
                            <span className="text-xs capitalize" style={{ color: athleticTechTheme.colors.text.secondary }}>
                              {achievement.category}
                            </span>
                          </div>
                          <span className="text-xs" style={{ color: athleticTechTheme.colors.text.secondary }}>
                            {new Date(achievement.date).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsModal;
