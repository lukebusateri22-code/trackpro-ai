import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { TrainingPlan, TrainingSession } from '@/types/coach-athlete';
import TrainingPlanCard from '@/components/training/TrainingPlanCard';
import WorkoutSessionCard from '@/components/training/WorkoutSessionCard';
import athleticTechTheme from '@/lib/athleticTechTheme';
import { 
  Plus, 
  Users, 
  Calendar, 
  Target, 
  TrendingUp, 
  Filter,
  Search
} from 'lucide-react';

// Mock data for demonstration
const mockTrainingPlans: TrainingPlan[] = [
  {
    id: '1',
    coachId: 'coach1',
    athleteId: 'athlete1',
    name: 'Sprint Development Program',
    description: 'Comprehensive 12-week program focused on improving 100m and 200m times',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    phase: 'build',
    sessions: [],
    goals: ['Sub 11.0s 100m', 'Improve acceleration', 'Build max speed'],
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    coachId: 'coach1',
    athleteId: 'athlete1',
    name: 'Strength Foundation',
    description: 'Building fundamental strength for track performance',
    startDate: '2024-01-01',
    endDate: '2024-03-01',
    phase: 'base',
    sessions: [],
    goals: ['Increase squat 1RM', 'Improve power output', 'Injury prevention'],
    status: 'completed',
    createdAt: '2023-12-20',
    updatedAt: '2024-03-01'
  }
];

const mockSessions: TrainingSession[] = [
  {
    id: '1',
    planId: '1',
    date: new Date().toISOString().split('T')[0],
    type: 'track',
    name: 'Speed Endurance',
    description: 'Focus on maintaining speed over longer distances',
    exercises: [
      {
        id: '1',
        name: '150m x 4',
        type: 'track',
        category: 'sprints',
        sets: 4,
        distance: 150,
        rest: 180,
        completed: false
      },
      {
        id: '2',
        name: '100m x 2',
        type: 'track',
        category: 'sprints',
        sets: 2,
        distance: 100,
        rest: 300,
        completed: false
      }
    ],
    duration: 90,
    intensity: 'high',
    completed: false,
    videoUploads: []
  },
  {
    id: '2',
    planId: '1',
    date: new Date().toISOString().split('T')[0],
    type: 'weights',
    name: 'Lower Body Power',
    description: 'Explosive strength development',
    exercises: [
      {
        id: '3',
        name: 'Back Squat',
        type: 'weights',
        category: 'strength',
        sets: 4,
        reps: 6,
        weight: 120,
        rest: 180,
        completed: true
      },
      {
        id: '4',
        name: 'Jump Squats',
        type: 'plyometric',
        category: 'power',
        sets: 3,
        reps: 8,
        rest: 120,
        completed: true
      }
    ],
    duration: 75,
    intensity: 'high',
    completed: true,
    completedAt: new Date().toISOString(),
    athleteNotes: 'Felt strong today, increased weight from last session',
    videoUploads: []
  }
];

const TrainingScreen: React.FC = () => {
  const { isCoach, isAthlete } = useUser();
  const [activeTab, setActiveTab] = useState<'plans' | 'sessions' | 'progress'>('plans');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  // Mock functions for demo
  const handleViewPlan = (plan: TrainingPlan) => {
    console.log('Viewing plan:', plan.name);
  };

  const handleEditPlan = (plan: TrainingPlan) => {
    console.log('Editing plan:', plan.name);
  };

  const handleCompleteSession = (sessionId: string) => {
    console.log('Completing session:', sessionId);
  };

  const handleUploadVideo = (sessionId: string) => {
    console.log('Uploading video for session:', sessionId);
  };

  const handleAddNotes = (sessionId: string, notes: string) => {
    console.log('Adding notes to session:', sessionId, notes);
  };

  const filteredPlans = mockTrainingPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || plan.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderCoachView = () => (
    <div className="space-y-6">
      {/* Coach Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 
            className="text-2xl font-bold mb-2"
            style={{ color: athleticTechTheme.colors.text.primary }}
          >
            Training Management
          </h2>
          <p 
            className="text-sm"
            style={{ color: athleticTechTheme.colors.text.secondary }}
          >
            Create and manage training plans for your athletes
          </p>
        </div>
        
        <button
          className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: athleticTechTheme.colors.roles.coach,
            color: athleticTechTheme.colors.text.primary
          }}
        >
          <Plus size={20} />
          <span>Create Plan</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: athleticTechTheme.colors.surface.secondary,
            border: `1px solid ${athleticTechTheme.colors.interactive.border}`
          }}
        >
          <div className="flex items-center space-x-3">
            <Users 
              size={24} 
              style={{ color: athleticTechTheme.colors.roles.athlete }}
            />
            <div>
              <p 
                className="text-2xl font-bold"
                style={{ color: athleticTechTheme.colors.text.primary }}
              >
                12
              </p>
              <p 
                className="text-sm"
                style={{ color: athleticTechTheme.colors.text.secondary }}
              >
                Active Athletes
              </p>
            </div>
          </div>
        </div>
        
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: athleticTechTheme.colors.surface.secondary,
            border: `1px solid ${athleticTechTheme.colors.interactive.border}`
          }}
        >
          <div className="flex items-center space-x-3">
            <Target 
              size={24} 
              style={{ color: athleticTechTheme.colors.primary.track }}
            />
            <div>
              <p 
                className="text-2xl font-bold"
                style={{ color: athleticTechTheme.colors.text.primary }}
              >
                8
              </p>
              <p 
                className="text-sm"
                style={{ color: athleticTechTheme.colors.text.secondary }}
              >
                Active Plans
              </p>
            </div>
          </div>
        </div>
        
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: athleticTechTheme.colors.surface.secondary,
            border: `1px solid ${athleticTechTheme.colors.interactive.border}`
          }}
        >
          <div className="flex items-center space-x-3">
            <TrendingUp 
              size={24} 
              style={{ color: athleticTechTheme.colors.performance.excellent }}
            />
            <div>
              <p 
                className="text-2xl font-bold"
                style={{ color: athleticTechTheme.colors.text.primary }}
              >
                94%
              </p>
              <p 
                className="text-sm"
                style={{ color: athleticTechTheme.colors.text.secondary }}
              >
                Completion Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAthleteView = () => (
    <div className="space-y-6">
      {/* Athlete Header */}
      <div className="text-center">
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ color: athleticTechTheme.colors.text.primary }}
        >
          Your Training
        </h1>
        <p 
          className="text-lg"
          style={{ color: athleticTechTheme.colors.text.secondary }}
        >
          Track your progress and complete your workouts
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: athleticTechTheme.colors.surface.elevated,
            border: `1px solid ${athleticTechTheme.colors.interactive.border}`
          }}
        >
          <Calendar 
            size={24} 
            style={{ color: athleticTechTheme.colors.primary.track }}
            className="mx-auto mb-2"
          />
          <p 
            className="text-xl font-bold"
            style={{ color: athleticTechTheme.colors.text.primary }}
          >
            {mockSessions.filter(s => !s.completed).length}
          </p>
          <p 
            className="text-xs"
            style={{ color: athleticTechTheme.colors.text.secondary }}
          >
            Pending
          </p>
        </div>
        
        <div
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: athleticTechTheme.colors.surface.elevated,
            border: `1px solid ${athleticTechTheme.colors.interactive.border}`
          }}
        >
          <Target 
            size={24} 
            style={{ color: athleticTechTheme.colors.performance.excellent }}
            className="mx-auto mb-2"
          />
          <p 
            className="text-xl font-bold"
            style={{ color: athleticTechTheme.colors.text.primary }}
          >
            {mockSessions.filter(s => s.completed).length}
          </p>
          <p 
            className="text-xs"
            style={{ color: athleticTechTheme.colors.text.secondary }}
          >
            Completed
          </p>
        </div>
        
        <div
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: athleticTechTheme.colors.surface.elevated,
            border: `1px solid ${athleticTechTheme.colors.interactive.border}`
          }}
        >
          <TrendingUp 
            size={24} 
            style={{ color: athleticTechTheme.colors.events.jumps }}
            className="mx-auto mb-2"
          />
          <p 
            className="text-xl font-bold"
            style={{ color: athleticTechTheme.colors.text.primary }}
          >
            85%
          </p>
          <p 
            className="text-xs"
            style={{ color: athleticTechTheme.colors.text.secondary }}
          >
            Completion
          </p>
        </div>
      </div>
      
      {/* Recent Workouts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 
            className="text-xl font-bold"
            style={{ color: athleticTechTheme.colors.text.primary }}
          >
            Recent Workouts
          </h2>
          <button 
            className="text-sm font-medium hover:underline"
            style={{ color: athleticTechTheme.colors.primary.track }}
          >
            View All
          </button>
        </div>
        
        <div className="grid gap-3">
          {mockSessions.slice(0, 3).map(session => (
            <div
              key={session.id}
              className="p-4 rounded-lg border transition-all duration-200 hover:scale-[1.01]"
              style={{
                backgroundColor: session.completed 
                  ? athleticTechTheme.colors.surface.elevated 
                  : athleticTechTheme.colors.surface.secondary,
                borderColor: session.completed 
                  ? athleticTechTheme.colors.performance.completed 
                  : athleticTechTheme.colors.interactive.border
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2 rounded-full"
                    style={{
                      backgroundColor: session.completed 
                        ? `${athleticTechTheme.colors.performance.excellent}20`
                        : `${athleticTechTheme.colors.primary.track}20`,
                      color: session.completed 
                        ? athleticTechTheme.colors.performance.excellent
                        : athleticTechTheme.colors.primary.track
                    }}
                  >
                    {session.completed ? <Target size={16} /> : <Calendar size={16} />}
                  </div>
                  <div>
                    <h3 
                      className="font-medium"
                      style={{ color: athleticTechTheme.colors.text.primary }}
                    >
                      {session.name}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: athleticTechTheme.colors.text.secondary }}
                    >
                      {session.type} • {session.duration} min
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {session.completed ? (
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${athleticTechTheme.colors.performance.excellent}20`,
                        color: athleticTechTheme.colors.performance.excellent
                      }}
                    >
                      Completed
                    </span>
                  ) : (
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${athleticTechTheme.colors.events.jumps}20`,
                        color: athleticTechTheme.colors.events.jumps
                      }}
                    >
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlansTab = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div 
          className="flex-1 flex items-center space-x-2 px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: athleticTechTheme.colors.surface.secondary,
            borderColor: athleticTechTheme.colors.interactive.border
          }}
        >
          <Search 
            size={20} 
            style={{ color: athleticTechTheme.colors.text.muted }}
          />
          <input
            type="text"
            placeholder="Search training plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none"
            style={{ color: athleticTechTheme.colors.text.primary }}
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 rounded-lg border bg-transparent"
          style={{
            backgroundColor: athleticTechTheme.colors.surface.secondary,
            borderColor: athleticTechTheme.colors.interactive.border,
            color: athleticTechTheme.colors.text.primary
          }}
        >
          <option value="all">All Plans</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Training Plans Grid */}
      <div className="grid gap-6">
        {filteredPlans.map(plan => (
          <TrainingPlanCard
            key={plan.id}
            plan={plan}
            isCoach={isCoach}
            onView={handleViewPlan}
            onEdit={isCoach ? handleEditPlan : undefined}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Role-specific header */}
      {isCoach ? renderCoachView() : renderAthleteView()}
      
      {/* Tab Navigation */}
      <div 
        className="flex space-x-1 p-1 rounded-lg"
        style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
      >
        {[
          { id: 'plans', label: 'Training Plans', icon: Target },
          { id: 'sessions', label: 'Sessions', icon: Calendar },
          { id: 'progress', label: 'Progress', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
                isActive ? 'transform scale-105' : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: isActive 
                  ? athleticTechTheme.colors.primary.track 
                  : 'transparent',
                color: isActive 
                  ? athleticTechTheme.colors.text.primary 
                  : athleticTechTheme.colors.text.secondary
              }}
            >
              <Icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'plans' && renderPlansTab()}
        {activeTab === 'sessions' && (
          <div className="grid gap-4">
            {mockSessions.map(session => (
              <WorkoutSessionCard
                key={session.id}
                session={session}
                isCoach={isCoach}
                onComplete={handleCompleteSession}
                onUploadVideo={handleUploadVideo}
                onAddNotes={handleAddNotes}
              />
            ))}
          </div>
        )}
        {activeTab === 'progress' && (
          <div 
            className="p-8 rounded-xl text-center"
            style={{ backgroundColor: athleticTechTheme.colors.surface.secondary }}
          >
            <TrendingUp 
              size={48} 
              style={{ color: athleticTechTheme.colors.text.muted }}
              className="mx-auto mb-4"
            />
            <p 
              className="text-lg font-medium"
              style={{ color: athleticTechTheme.colors.text.primary }}
            >
              Progress Analytics Coming Soon
            </p>
            <p 
              className="text-sm mt-2"
              style={{ color: athleticTechTheme.colors.text.secondary }}
            >
              Detailed performance metrics and progress tracking
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingScreen;
