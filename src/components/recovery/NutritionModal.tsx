import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { X, Apple, Plus, Utensils, Droplets, TrendingUp } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface NutritionEntry {
  id: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  hydration: number;
  meals: string[];
}

interface NutritionModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const NutritionModal: React.FC<NutritionModalProps> = ({ onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('today');
  const [showAddMeal, setShowAddMeal] = useState(false);
  
  const [nutritionEntries] = useState<NutritionEntry[]>([
    {
      id: '1',
      date: '2025-08-27',
      calories: 2100,
      protein: 140,
      carbs: 250,
      fat: 70,
      hydration: 2.8,
      meals: ['Oatmeal with banana', 'Chicken salad', 'Protein shake', 'Salmon with rice']
    },
    {
      id: '2',
      date: '2025-08-26',
      calories: 2300,
      protein: 155,
      carbs: 280,
      fat: 75,
      hydration: 3.2,
      meals: ['Greek yogurt', 'Turkey sandwich', 'Post-workout shake', 'Steak with vegetables']
    }
  ]);

  const [todayEntry, setTodayEntry] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    hydration: 0
  });

  const targets = {
    calories: 2500,
    protein: 150,
    carbs: 300,
    fat: 85,
    hydration: 3.5
  };

  const getMacroColor = (macro: string) => {
    switch (macro) {
      case 'protein': return athleticTechTheme.colors.primary.power;
      case 'carbs': return athleticTechTheme.colors.primary.track;
      case 'fat': return athleticTechTheme.colors.events.sprints;
      default: return athleticTechTheme.colors.text.secondary;
    }
  };

  const getTodaysEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    return nutritionEntries.find(entry => entry.date === today) || {
      id: 'today',
      date: today,
      calories: 870,
      protein: 61,
      carbs: 124,
      fat: 17,
      hydration: 2.5,
      meals: ['Oatmeal breakfast', 'Post-workout shake']
    };
  };

  const currentEntry = getTodaysEntry();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Apple size={24} style={{ color: athleticTechTheme.colors.performance.excellent }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Nutrition Tracker</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={() => setShowAddMeal(true)} style={{ backgroundColor: athleticTechTheme.colors.performance.excellent }}>
                <Plus size={16} className="mr-2" />
                Add Meal
              </Button>
              <Button variant="ghost" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-6">
              {/* Macro Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                      {currentEntry.calories}
                    </div>
                    <div className="text-sm mb-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      / {targets.calories} calories
                    </div>
                    <Progress value={(currentEntry.calories / targets.calories) * 100} />
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold" style={{ color: getMacroColor('protein') }}>
                      {currentEntry.protein}g
                    </div>
                    <div className="text-sm mb-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      / {targets.protein}g protein
                    </div>
                    <Progress value={(currentEntry.protein / targets.protein) * 100} />
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold" style={{ color: getMacroColor('carbs') }}>
                      {currentEntry.carbs}g
                    </div>
                    <div className="text-sm mb-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      / {targets.carbs}g carbs
                    </div>
                    <Progress value={(currentEntry.carbs / targets.carbs) * 100} />
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold" style={{ color: getMacroColor('fat') }}>
                      {currentEntry.fat}g
                    </div>
                    <div className="text-sm mb-2" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      / {targets.fat}g fat
                    </div>
                    <Progress value={(currentEntry.fat / targets.fat) * 100} />
                  </CardContent>
                </Card>
              </div>

              {/* Hydration */}
              <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Droplets size={20} style={{ color: athleticTechTheme.colors.primary.track }} />
                    <span>Hydration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span>{currentEntry.hydration}L</span>
                        <span>{targets.hydration}L target</span>
                      </div>
                      <Progress value={(currentEntry.hydration / targets.hydration) * 100} />
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">+250ml</Button>
                      <Button size="sm" variant="outline">+500ml</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Today's Meals */}
              <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Utensils size={20} />
                    <span>Today's Meals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentEntry.meals.map((meal, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
                        <span>{meal}</span>
                        <Badge variant="outline">Logged</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {nutritionEntries.map((entry) => (
                <Card key={entry.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {new Date(entry.date).toLocaleDateString()}
                      </h3>
                      <Badge>{entry.calories} calories</Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold" style={{ color: getMacroColor('protein') }}>
                          {entry.protein}g
                        </div>
                        <div style={{ color: athleticTechTheme.colors.text.secondary }}>Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold" style={{ color: getMacroColor('carbs') }}>
                          {entry.carbs}g
                        </div>
                        <div style={{ color: athleticTechTheme.colors.text.secondary }}>Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold" style={{ color: getMacroColor('fat') }}>
                          {entry.fat}g
                        </div>
                        <div style={{ color: athleticTechTheme.colors.text.secondary }}>Fat</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold" style={{ color: athleticTechTheme.colors.primary.track }}>
                          {entry.hydration}L
                        </div>
                        <div style={{ color: athleticTechTheme.colors.text.secondary }}>Water</div>
                      </div>
                    </div>
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
                      <div className="flex justify-between">
                        <span>Calories</span>
                        <Badge>2200/day</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Protein</span>
                        <Badge style={{ backgroundColor: getMacroColor('protein') }}>148g/day</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Carbs</span>
                        <Badge style={{ backgroundColor: getMacroColor('carbs') }}>265g/day</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Fat</span>
                        <Badge style={{ backgroundColor: getMacroColor('fat') }}>72g/day</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Hydration</span>
                        <Badge style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>3.0L/day</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                  <CardHeader>
                    <CardTitle>Nutrition Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                      <div>• Eat protein within 30 minutes post-workout</div>
                      <div>• Hydrate consistently throughout the day</div>
                      <div>• Time carbs around training sessions</div>
                      <div>• Include healthy fats for hormone production</div>
                      <div>• Plan meals to meet macro targets</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showAddMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-60">
          <Card className="w-full max-w-md" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
            <CardHeader>
              <CardTitle>Quick Meal Log</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Meal description (e.g., Chicken salad)" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Calories" type="number" />
                <Input placeholder="Protein (g)" type="number" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddMeal(false)}>Cancel</Button>
                <Button onClick={() => { setShowAddMeal(false); onSave({}); }}>Add Meal</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NutritionModal;
