-- TrackPro AI Database Schema
-- Complete production-ready schema for track and field training platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('athlete', 'coach', 'admin')) DEFAULT 'athlete',
  age INTEGER,
  height TEXT,
  weight TEXT,
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'elite')) DEFAULT 'beginner',
  primary_events TEXT[],
  bio TEXT,
  location TEXT,
  phone TEXT,
  emergency_contact JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coach-Athlete relationships
CREATE TABLE public.coach_athlete_relationships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  coach_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'active', 'inactive')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(coach_id, athlete_id)
);

-- Training Plans
CREATE TABLE public.training_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  coach_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_focus TEXT NOT NULL,
  phase TEXT CHECK (phase IN ('base', 'build', 'peak', 'recovery', 'competition')) DEFAULT 'base',
  duration_weeks INTEGER DEFAULT 12,
  goals TEXT[],
  status TEXT CHECK (status IN ('draft', 'active', 'completed', 'archived')) DEFAULT 'draft',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training Sessions
CREATE TABLE public.training_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  training_plan_id UUID REFERENCES public.training_plans(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  session_type TEXT CHECK (session_type IN ('track', 'weights', 'recovery', 'technique', 'competition')) NOT NULL,
  scheduled_date DATE,
  duration_minutes INTEGER,
  intensity_level INTEGER CHECK (intensity_level BETWEEN 1 AND 10),
  location TEXT,
  equipment_needed TEXT[],
  weather_conditions JSONB,
  notes TEXT,
  status TEXT CHECK (status IN ('scheduled', 'in_progress', 'completed', 'skipped')) DEFAULT 'scheduled',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercises
CREATE TABLE public.exercises (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  training_session_id UUID REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('sprint', 'distance', 'jumps', 'throws', 'strength', 'flexibility', 'plyometric', 'technique')) NOT NULL,
  sets INTEGER,
  reps INTEGER,
  distance_meters DECIMAL,
  weight_kg DECIMAL,
  rest_seconds INTEGER,
  intensity_percent INTEGER CHECK (intensity_percent BETWEEN 0 AND 100),
  target_time INTERVAL,
  actual_time INTERVAL,
  notes TEXT,
  completed BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Personal Records
CREATE TABLE public.personal_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  performance_value DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  competition_name TEXT,
  location TEXT,
  date_achieved DATE NOT NULL,
  wind_speed DECIMAL,
  temperature INTEGER,
  conditions TEXT,
  verified BOOLEAN DEFAULT FALSE,
  video_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(athlete_id, event, performance_value, date_achieved)
);

-- Video Analysis
CREATE TABLE public.video_analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  coach_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  event TEXT NOT NULL,
  video_url TEXT NOT NULL,
  video_filename TEXT,
  performance_result TEXT,
  competition_type TEXT CHECK (competition_type IN ('practice', 'competition')) DEFAULT 'practice',
  weather_conditions JSONB,
  analysis_results JSONB, -- Stores AI analysis results
  freeze_frames JSONB[], -- Array of freeze frame data
  main_weakness TEXT,
  recommendations TEXT[],
  overall_score DECIMAL CHECK (overall_score BETWEEN 0 AND 10),
  technical_scores JSONB, -- Breakdown by technique phases
  status TEXT CHECK (status IN ('processing', 'completed', 'failed')) DEFAULT 'processing',
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Goals
CREATE TABLE public.goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  coach_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  event TEXT,
  goal_type TEXT CHECK (goal_type IN ('performance', 'technique', 'training', 'competition')) NOT NULL,
  target_value DECIMAL,
  current_value DECIMAL DEFAULT 0,
  unit TEXT,
  target_date DATE,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('active', 'completed', 'paused', 'cancelled')) DEFAULT 'active',
  progress_percentage INTEGER DEFAULT 0,
  milestones JSONB[],
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements
CREATE TABLE public.achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT CHECK (category IN ('performance', 'training', 'consistency', 'improvement', 'competition')) NOT NULL,
  rarity TEXT CHECK (rarity IN ('bronze', 'silver', 'gold', 'platinum')) DEFAULT 'bronze',
  points INTEGER DEFAULT 0,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  related_goal_id UUID REFERENCES public.goals(id) ON DELETE SET NULL,
  related_pr_id UUID REFERENCES public.personal_records(id) ON DELETE SET NULL
);

-- Recovery Data
CREATE TABLE public.recovery_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  sleep_hours DECIMAL,
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 10),
  resting_heart_rate INTEGER,
  hrv_score DECIMAL,
  stress_level INTEGER CHECK (stress_level BETWEEN 1 AND 10),
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
  mood_score INTEGER CHECK (mood_score BETWEEN 1 AND 10),
  soreness_level INTEGER CHECK (soreness_level BETWEEN 1 AND 10),
  hydration_level INTEGER CHECK (hydration_level BETWEEN 1 AND 10),
  nutrition_score INTEGER CHECK (nutrition_score BETWEEN 1 AND 10),
  overall_recovery_score DECIMAL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(athlete_id, date)
);

-- Chat Messages (AI Coach & Coach-Athlete)
CREATE TABLE public.chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  message_type TEXT CHECK (message_type IN ('ai_coach', 'coach_athlete', 'system')) NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB, -- For AI context, attachments, etc.
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('training', 'goal', 'achievement', 'coach', 'system')) NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  action_url TEXT,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Competition Calendar
CREATE TABLE public.competitions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  events TEXT[],
  competition_level TEXT CHECK (competition_level IN ('local', 'regional', 'national', 'international')) NOT NULL,
  registration_deadline DATE,
  website_url TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Competition Entries
CREATE TABLE public.competition_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  competition_id UUID REFERENCES public.competitions(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  events TEXT[] NOT NULL,
  status TEXT CHECK (status IN ('registered', 'confirmed', 'withdrawn')) DEFAULT 'registered',
  seed_times JSONB, -- Event -> time mapping
  results JSONB, -- Event -> result mapping
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(competition_id, athlete_id)
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_athlete_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recovery_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_entries ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Coaches can view their athletes" ON public.profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.coach_athlete_relationships 
    WHERE coach_id = auth.uid() AND athlete_id = profiles.id AND status = 'active'
  )
);

-- Coach-Athlete relationship policies
CREATE POLICY "Users can view their relationships" ON public.coach_athlete_relationships FOR SELECT USING (
  coach_id = auth.uid() OR athlete_id = auth.uid()
);
CREATE POLICY "Coaches can create relationships" ON public.coach_athlete_relationships FOR INSERT WITH CHECK (
  coach_id = auth.uid()
);

-- Training plans policies
CREATE POLICY "Users can view their training plans" ON public.training_plans FOR SELECT USING (
  coach_id = auth.uid() OR athlete_id = auth.uid()
);
CREATE POLICY "Coaches can manage training plans" ON public.training_plans FOR ALL USING (
  coach_id = auth.uid()
);

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.training_plans FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.training_sessions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.goals FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indexes for performance
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_coach_athlete_relationships_coach ON public.coach_athlete_relationships(coach_id);
CREATE INDEX idx_coach_athlete_relationships_athlete ON public.coach_athlete_relationships(athlete_id);
CREATE INDEX idx_training_plans_coach ON public.training_plans(coach_id);
CREATE INDEX idx_training_plans_athlete ON public.training_plans(athlete_id);
CREATE INDEX idx_training_sessions_plan ON public.training_sessions(training_plan_id);
CREATE INDEX idx_exercises_session ON public.exercises(training_session_id);
CREATE INDEX idx_personal_records_athlete ON public.personal_records(athlete_id);
CREATE INDEX idx_video_analyses_athlete ON public.video_analyses(athlete_id);
CREATE INDEX idx_goals_athlete ON public.goals(athlete_id);
CREATE INDEX idx_recovery_metrics_athlete_date ON public.recovery_metrics(athlete_id, date);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_chat_messages_recipient ON public.chat_messages(recipient_id);
