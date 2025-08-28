import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, Target, Plus, Calendar, TrendingUp, Award, Edit, Trash2 } from 'lucide-react';
import athleticTechTheme from '@/lib/athleticTechTheme';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'technique' | 'fitness' | 'competition';
  priority: 'low' | 'medium' | 'high';
  targetDate: string;
  currentValue?: string;
  targetValue: string;
  unit?: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  milestones: Milestone[];
  createdAt: string;
}

interface Milestone {
  id: string;
  title: string;
  targetDate: string;
  completed: boolean;
  completedAt?: string;
}

interface GoalSettingModalProps {
  onClose: () => void;
  onSaveGoals: (goals: Goal[]) => void;
}

const GoalSettingModal: React.FC<GoalSettingModalProps> = ({ onClose, onSaveGoals }) => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Break 11.00s in 100m',
      description: 'Improve my 100m sprint time to break the 11-second barrier',
      category: 'performance',
      priority: 'high',
      targetDate: '2025-12-31',
      currentValue: '11.24',
      targetValue: '10.99',
      unit: 'seconds',
      progress: 65,
      status: 'active',
      milestones: [
        { id: 'm1', title: 'Run 11.15s', targetDate: '2025-10-15', completed: true, completedAt: '2025-08-20' },
        { id: 'm2', title: 'Run 11.10s', targetDate: '2025-11-15', completed: false },
        { id: 'm3', title: 'Run 11.05s', targetDate: '2025-12-15', completed: false }
      ],
      createdAt: '2025-07-01'
    },
    {
      id: '2',
      title: 'Increase Squat to 225lbs',
      description: 'Build leg strength to support sprint performance',
      category: 'fitness',
      priority: 'medium',
      targetDate: '2025-11-30',
      currentValue: '185',
      targetValue: '225',
      unit: 'lbs',
      progress: 40,
      status: 'active',
      milestones: [
        { id: 'm4', title: 'Squat 200lbs', targetDate: '2025-09-30', completed: false },
        { id: 'm5', title: 'Squat 215lbs', targetDate: '2025-10-31', completed: false }
      ],
      createdAt: '2025-07-15'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'performance' as Goal['category'],
    priority: 'medium' as Goal['priority'],
    targetDate: '',
    currentValue: '',
    targetValue: '',
    unit: '',
    milestones: [] as Omit<Milestone, 'id' | 'completed' | 'completedAt'>[]
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return athleticTechTheme.colors.primary.power;
      case 'technique': return athleticTechTheme.colors.primary.track;
      case 'fitness': return athleticTechTheme.colors.events.sprints;
      case 'competition': return athleticTechTheme.colors.performance.excellent;
      default: return athleticTechTheme.colors.primary.track;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return athleticTechTheme.colors.primary.track;
      case 'completed': return athleticTechTheme.colors.performance.excellent;
      case 'paused': return athleticTechTheme.colors.text.secondary;
      default: return athleticTechTheme.colors.primary.track;
    }
  };

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.targetValue || !newGoal.targetDate) {
      alert('Please fill in all required fields');
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      priority: newGoal.priority,
      targetDate: newGoal.targetDate,
      currentValue: newGoal.currentValue || undefined,
      targetValue: newGoal.targetValue,
      unit: newGoal.unit || undefined,
      progress: 0,
      status: 'active',
      milestones: newGoal.milestones.map((m, index) => ({
        id: `m${Date.now()}_${index}`,
        title: m.title,
        targetDate: m.targetDate,
        completed: false
      })),
      createdAt: new Date().toISOString()
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      title: '',
      description: '',
      category: 'performance',
      priority: 'medium',
      targetDate: '',
      currentValue: '',
      targetValue: '',
      unit: '',
      milestones: []
    });
    setShowCreateForm(false);
  };

  const handleDeleteGoal = (goalId: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setGoals(prev => prev.filter(g => g.id !== goalId));
    }
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(m => {
          if (m.id === milestoneId) {
            return {
              ...m,
              completed: !m.completed,
              completedAt: !m.completed ? new Date().toISOString() : undefined
            };
          }
          return m;
        });
        
        // Recalculate progress based on completed milestones
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const progress = updatedMilestones.length > 0 ? (completedCount / updatedMilestones.length) * 100 : 0;
        
        return {
          ...goal,
          milestones: updatedMilestones,
          progress: Math.round(progress)
        };
      }
      return goal;
    }));
  };

  const addMilestone = () => {
    setNewGoal(prev => ({
      ...prev,
      milestones: [...prev.milestones, { title: '', targetDate: '' }]
    }));
  };

  const removeMilestone = (index: number) => {
    setNewGoal(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const updateMilestone = (index: number, field: 'title' | 'targetDate', value: string) => {
    setNewGoal(prev => ({
      ...prev,
      milestones: prev.milestones.map((m, i) => 
        i === index ? { ...m, [field]: value } : m
      )
    }));
  };

  if (showCreateForm) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Target size={24} style={{ color: athleticTechTheme.colors.primary.power }} />
                <span style={{ color: athleticTechTheme.colors.text.primary }}>Create New Goal</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowCreateForm(false)}>
                <X size={20} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Goal Title *</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Break 11.00s in 100m"
                />
              </div>
              
              <div>
                <Label>Category</Label>
                <Select value={newGoal.category} onValueChange={(value: Goal['category']) => setNewGoal(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="technique">Technique</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="competition">Competition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newGoal.description}
                onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your goal and why it's important to you..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="currentValue">Current Value</Label>
                <Input
                  id="currentValue"
                  value={newGoal.currentValue}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, currentValue: e.target.value }))}
                  placeholder="11.24"
                />
              </div>
              
              <div>
                <Label htmlFor="targetValue">Target Value *</Label>
                <Input
                  id="targetValue"
                  value={newGoal.targetValue}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetValue: e.target.value }))}
                  placeholder="10.99"
                />
              </div>
              
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="seconds, lbs, meters"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Priority</Label>
                <Select value={newGoal.priority} onValueChange={(value: Goal['priority']) => setNewGoal(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="targetDate">Target Date *</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <Label>Milestones</Label>
                <Button variant="outline" size="sm" onClick={addMilestone}>
                  <Plus size={16} className="mr-1" />
                  Add Milestone
                </Button>
              </div>
              
              <div className="space-y-3">
                {newGoal.milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Input
                        value={milestone.title}
                        onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                        placeholder="Milestone title"
                      />
                    </div>
                    <div className="w-40">
                      <Input
                        type="date"
                        value={milestone.targetDate}
                        onChange={(e) => updateMilestone(index, 'targetDate', e.target.value)}
                      />
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeMilestone(index)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGoal} style={{ backgroundColor: athleticTechTheme.colors.primary.power }}>
                Create Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Target size={24} style={{ color: athleticTechTheme.colors.primary.power }} />
              <span style={{ color: athleticTechTheme.colors.text.primary }}>Goal Setting</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={() => setShowCreateForm(true)} style={{ backgroundColor: athleticTechTheme.colors.primary.power }}>
                <Plus size={16} className="mr-2" />
                New Goal
              </Button>
              <Button variant="ghost" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Goals Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {goals.filter(g => g.status === 'active').length}
                </div>
                <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Active Goals
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {goals.filter(g => g.status === 'completed').length}
                </div>
                <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Completed
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length) || 0}%
                </div>
                <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  Avg Progress
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold" style={{ color: athleticTechTheme.colors.text.primary }}>
                  {goals.filter(g => g.priority === 'high').length}
                </div>
                <div className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                  High Priority
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Goals List */}
          <div className="space-y-4">
            {goals.map((goal) => (
              <Card key={goal.id} style={{ backgroundColor: athleticTechTheme.colors.surface.elevated }}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                        {goal.title}
                      </h3>
                      <p className="text-sm mb-3" style={{ color: athleticTechTheme.colors.text.secondary }}>
                        {goal.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge style={{ backgroundColor: getCategoryColor(goal.category) }}>
                          {goal.category.toUpperCase()}
                        </Badge>
                        <Badge style={{ backgroundColor: getPriorityColor(goal.priority) }}>
                          {goal.priority.toUpperCase()}
                        </Badge>
                        <Badge style={{ backgroundColor: getStatusColor(goal.status) }}>
                          {goal.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteGoal(goal.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium" style={{ color: athleticTechTheme.colors.text.primary }}>
                          Progress
                        </span>
                        <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          {goal.progress}%
                        </span>
                      </div>
                      <Progress value={goal.progress} className="mb-4" />
                      
                      {goal.currentValue && goal.targetValue && (
                        <div className="flex justify-between text-sm">
                          <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                            Current: {goal.currentValue} {goal.unit}
                          </span>
                          <span style={{ color: athleticTechTheme.colors.text.secondary }}>
                            Target: {goal.targetValue} {goal.unit}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center space-x-1 mb-2">
                        <Calendar size={14} style={{ color: athleticTechTheme.colors.text.secondary }} />
                        <span className="text-sm" style={{ color: athleticTechTheme.colors.text.secondary }}>
                          Target: {new Date(goal.targetDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {goal.milestones.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                            Milestones:
                          </h4>
                          <div className="space-y-1">
                            {goal.milestones.map((milestone) => (
                              <div key={milestone.id} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={milestone.completed}
                                  onChange={() => toggleMilestone(goal.id, milestone.id)}
                                  className="rounded"
                                />
                                <span className={`text-sm ${milestone.completed ? 'line-through opacity-60' : ''}`} style={{ color: athleticTechTheme.colors.text.secondary }}>
                                  {milestone.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {goals.length === 0 && (
            <div className="text-center py-8">
              <Target size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2" style={{ color: athleticTechTheme.colors.text.primary }}>
                No goals set yet
              </h3>
              <p className="mb-4" style={{ color: athleticTechTheme.colors.text.secondary }}>
                Create your first goal to start tracking your progress
              </p>
              <Button onClick={() => setShowCreateForm(true)} style={{ backgroundColor: athleticTechTheme.colors.primary.power }}>
                <Plus size={16} className="mr-2" />
                Create Your First Goal
              </Button>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={() => onSaveGoals(goals)} style={{ backgroundColor: athleticTechTheme.colors.primary.track }}>
              Save Goals
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalSettingModal;
