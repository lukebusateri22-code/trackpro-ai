import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Clock, Zap, Target, Dumbbell, Heart, TrendingUp, X } from 'lucide-react';
import { WORKOUT_TEMPLATES } from '@/lib/workoutLibrary';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface WorkoutLibraryProps {
  onSelectWorkout: (workout: any) => void;
  onClose: () => void;
}

const WorkoutLibrary: React.FC<WorkoutLibraryProps> = ({ onSelectWorkout, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredWorkouts = WORKOUT_TEMPLATES.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || workout.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || workout.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strength': return Dumbbell;
      case 'weight_loss': return TrendingUp;
      case 'muscle_building': return Zap;
      case 'endurance': return Heart;
      case 'speed': return Target;
      case 'power': return Zap;
      default: return Dumbbell;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength': return athleticTechTheme.colors.primary.track;
      case 'weight_loss': return athleticTechTheme.colors.performance.excellent;
      case 'muscle_building': return athleticTechTheme.colors.primary.power;
      case 'endurance': return athleticTechTheme.colors.primary.field;
      case 'speed': return athleticTechTheme.colors.events.sprints;
      case 'power': return athleticTechTheme.colors.primary.power;
      default: return athleticTechTheme.colors.primary.track;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return athleticTechTheme.colors.performance.excellent;
      case 'intermediate': return athleticTechTheme.colors.primary.track;
      case 'advanced': return athleticTechTheme.colors.primary.power;
      default: return athleticTechTheme.colors.primary.track;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Search size={24} style={{ color: athleticTechTheme.colors.primary.track }} />
                <span style={{ color: athleticTechTheme.colors.text.primary }}>Workout Library</span>
              </CardTitle>
              <p className="mt-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Browse and select from our collection of proven workout templates
              </p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search workouts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="strength">Strength Training</SelectItem>
                  <SelectItem value="weight_loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle_building">Muscle Building</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="speed">Speed & Power</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p style={{ color: athleticTechTheme.colors.text.secondary }}>
              {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Workout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredWorkouts.map((workout) => {
              const CategoryIcon = getCategoryIcon(workout.category);
              
              return (
                <Card 
                  key={workout.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}
                  onClick={() => onSelectWorkout(workout)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <CategoryIcon 
                        size={24} 
                        style={{ color: getCategoryColor(workout.category) }}
                      />
                      <Badge style={{ backgroundColor: getDifficultyColor(workout.difficulty) }}>
                        {workout.difficulty}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {workout.name}
                    </h3>
                    
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      {workout.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} style={{ color: athleticTechTheme.colors.text.secondary }} />
                        <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {workout.estimatedDuration} min
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Dumbbell size={14} style={{ color: athleticTechTheme.colors.text.secondary }} />
                        <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {workout.exercises.length} exercises
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {workout.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs"
                          style={{ borderColor: athleticTechTheme.colors.interactive.border }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full mt-3" 
                      style={{ backgroundColor: getCategoryColor(workout.category) }}
                    >
                      Select Workout
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredWorkouts.length === 0 && (
            <div className="text-center py-8">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                No workouts found
              </h3>
              <p style={{ color: athleticTechTheme.colors.text.secondary }}>
                Try adjusting your search criteria or browse all categories
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutLibrary;
