-- TrackPro AI Database Schema
-- Complete schema for production-ready athletics platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- AUTHENTICATION & USER MANAGEMENT
-- =============================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
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
  coach_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coach-Athlete relationships
CREATE TABLE IF NOT EXISTS coach_athlete_relationships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  coach_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('active', 'pending', 'inactive')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(coach_id, athlete_id)
);

-- =============================================
-- TRAINING SYSTEM
-- =============================================

-- Training Plans
CREATE TABLE IF NOT EXISTS training_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  coach_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration_weeks INTEGER,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'elite')),
  goals TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workout Sessions
CREATE TABLE IF NOT EXISTS workout_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  training_plan_id UUID REFERENCES training_plans(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  session_type TEXT CHECK (session_type IN ('track', 'weights', 'recovery', 'technique', 'conditioning')),
  estimated_duration INTEGER, -- minutes
  difficulty TEXT CHECK (difficulty IN ('easy', 'moderate', 'hard', 'very_hard')),
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercises
CREATE TABLE IF NOT EXISTS exercises (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workout_session_id UUID REFERENCES workout_sessions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  exercise_type TEXT CHECK (exercise_type IN ('sprint', 'distance', 'jump', 'throw', 'strength', 'plyometric', 'recovery')),
  sets INTEGER,
  reps INTEGER,
  weight DECIMAL,
  distance DECIMAL,
  duration INTEGER, -- seconds
  rest_period INTEGER, -- seconds
  instructions TEXT,
  order_index INTEGER DEFAULT 0
);

-- Workout Assignments
CREATE TABLE IF NOT EXISTS workout_assignments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  coach_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  workout_session_id UUID REFERENCES workout_sessions(id) ON DELETE CASCADE,
  assigned_date DATE NOT NULL,
  due_date DATE,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  notes TEXT,
  status TEXT CHECK (status IN ('assigned', 'started', 'completed', 'skipped')) DEFAULT 'assigned',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workout Completions
CREATE TABLE IF NOT EXISTS workout_completions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  assignment_id UUID REFERENCES workout_assignments(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  duration_minutes INTEGER,
  difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 10),
  effort_rating INTEGER CHECK (effort_rating >= 1 AND effort_rating <= 10),
  notes TEXT,
  exercise_results JSONB -- Store actual performance data
);

-- =============================================
-- VIDEO ANALYSIS SYSTEM
-- =============================================

-- Video Uploads
CREATE TABLE IF NOT EXISTS video_uploads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  coach_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  file_size BIGINT,
  duration_seconds INTEGER,
  upload_status TEXT CHECK (upload_status IN ('uploading', 'processing', 'ready', 'failed')) DEFAULT 'uploading',
  analysis_status TEXT CHECK (analysis_status IN ('pending', 'analyzing', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Video Analysis Results
CREATE TABLE IF NOT EXISTS video_analysis (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  video_id UUID REFERENCES video_uploads(id) ON DELETE CASCADE,
  coach_id UUID REFERENCES profiles(id),
  analysis_data JSONB, -- Store AI analysis results
  coach_feedback TEXT,
  technique_scores JSONB,
  improvement_suggestions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- RECOVERY SYSTEM
-- =============================================

-- Mental Health Logs
CREATE TABLE IF NOT EXISTS mental_health_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 10),
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  motivation_level INTEGER CHECK (motivation_level >= 1 AND motivation_level <= 10),
  anxiety_level INTEGER CHECK (anxiety_level >= 1 AND anxiety_level <= 10),
  confidence_level INTEGER CHECK (confidence_level >= 1 AND confidence_level <= 10),
  mood_triggers TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(athlete_id, log_date)
);

-- Sleep Logs
CREATE TABLE IF NOT EXISTS sleep_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  bedtime TIME,
  wake_time TIME,
  sleep_duration_hours DECIMAL,
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  time_to_fall_asleep INTEGER, -- minutes
  night_wakeups INTEGER,
  restfulness INTEGER CHECK (restfulness >= 1 AND restfulness <= 10),
  sleep_factors TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(athlete_id, log_date)
);

-- Energy Logs
CREATE TABLE IF NOT EXISTS energy_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  morning_energy INTEGER CHECK (morning_energy >= 1 AND morning_energy <= 10),
  afternoon_energy INTEGER CHECK (afternoon_energy >= 1 AND afternoon_energy <= 10),
  evening_energy INTEGER CHECK (evening_energy >= 1 AND evening_energy <= 10),
  overall_fatigue INTEGER CHECK (overall_fatigue >= 1 AND overall_fatigue <= 10),
  mental_fatigue INTEGER CHECK (mental_fatigue >= 1 AND mental_fatigue <= 10),
  physical_fatigue INTEGER CHECK (physical_fatigue >= 1 AND physical_fatigue <= 10),
  motivation_level INTEGER CHECK (motivation_level >= 1 AND motivation_level <= 10),
  energy_factors TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(athlete_id, log_date)
);

-- Injury Reports
CREATE TABLE IF NOT EXISTS injury_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  coach_id UUID REFERENCES profiles(id),
  injury_type TEXT CHECK (injury_type IN ('injury', 'soreness', 'pain', 'discomfort')),
  severity INTEGER CHECK (severity >= 1 AND severity <= 10),
  body_part TEXT NOT NULL,
  location_description TEXT,
  cause TEXT,
  description TEXT,
  treatment TEXT,
  pain_level INTEGER CHECK (pain_level >= 1 AND pain_level <= 10),
  mobility_impact INTEGER CHECK (mobility_impact >= 1 AND mobility_impact <= 10),
  status TEXT CHECK (status IN ('active', 'recovering', 'resolved')) DEFAULT 'active',
  follow_up_date DATE,
  notes TEXT,
  reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Supplement Tracking
CREATE TABLE IF NOT EXISTS supplement_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  supplement_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  unit TEXT NOT NULL,
  timing TEXT,
  frequency TEXT,
  purpose TEXT,
  status TEXT CHECK (status IN ('active', 'paused', 'discontinued')) DEFAULT 'active',
  effectiveness_rating INTEGER CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 10),
  side_effects TEXT,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily Supplement Intake
CREATE TABLE IF NOT EXISTS daily_supplement_intake (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  supplement_log_id UUID REFERENCES supplement_logs(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  intake_date DATE NOT NULL,
  taken BOOLEAN DEFAULT FALSE,
  time_taken TIME,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(supplement_log_id, intake_date)
);

-- Nutrition Logs
CREATE TABLE IF NOT EXISTS nutrition_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  total_calories INTEGER,
  protein_grams DECIMAL,
  carbs_grams DECIMAL,
  fat_grams DECIMAL,
  hydration_liters DECIMAL,
  meal_data JSONB, -- Store detailed meal information
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(athlete_id, log_date)
);

-- =============================================
-- PERFORMANCE & ANALYTICS
-- =============================================

-- Personal Records
CREATE TABLE IF NOT EXISTS personal_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  performance_value DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  competition_date DATE,
  location TEXT,
  conditions TEXT,
  is_personal_best BOOLEAN DEFAULT TRUE,
  is_season_best BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('performance', 'consistency', 'improvement', 'milestone')),
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')) DEFAULT 'common',
  icon_emoji TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  criteria_met JSONB -- Store the criteria that was met to earn this achievement
);

-- Training Statistics
CREATE TABLE IF NOT EXISTS training_statistics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  athlete_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stat_date DATE NOT NULL,
  total_workouts INTEGER DEFAULT 0,
  total_training_time INTEGER DEFAULT 0, -- minutes
  average_intensity DECIMAL,
  completion_rate DECIMAL,
  performance_metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(athlete_id, stat_date)
);

-- =============================================
-- NOTIFICATIONS SYSTEM
-- =============================================

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id),
  notification_type TEXT CHECK (notification_type IN ('injury_report', 'workout_completion', 'achievement', 'message', 'reminder')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB, -- Additional notification data
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_athlete_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE mental_health_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sleep_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE injury_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplement_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_supplement_intake ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Coaches can view their athletes' profiles" ON profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM coach_athlete_relationships 
    WHERE coach_id = auth.uid() AND athlete_id = profiles.id AND status = 'active'
  )
);

-- Coach-Athlete relationship policies
CREATE POLICY "Users can view their relationships" ON coach_athlete_relationships FOR SELECT USING (
  auth.uid() = coach_id OR auth.uid() = athlete_id
);
CREATE POLICY "Coaches can create relationships" ON coach_athlete_relationships FOR INSERT WITH CHECK (
  auth.uid() = coach_id
);

-- Training system policies
CREATE POLICY "Coaches can manage their training plans" ON training_plans FOR ALL USING (auth.uid() = coach_id);
CREATE POLICY "Athletes can view assigned workouts" ON workout_assignments FOR SELECT USING (
  auth.uid() = athlete_id OR auth.uid() = coach_id
);

-- Recovery system policies (athletes own their data, coaches can view if permitted)
CREATE POLICY "Athletes own their mental health data" ON mental_health_logs FOR ALL USING (auth.uid() = athlete_id);
CREATE POLICY "Athletes own their sleep data" ON sleep_logs FOR ALL USING (auth.uid() = athlete_id);
CREATE POLICY "Athletes own their energy data" ON energy_logs FOR ALL USING (auth.uid() = athlete_id);

-- Injury reports - coaches get notified
CREATE POLICY "Athletes can manage injury reports" ON injury_reports FOR ALL USING (auth.uid() = athlete_id);
CREATE POLICY "Coaches can view athlete injuries" ON injury_reports FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM coach_athlete_relationships 
    WHERE coach_id = auth.uid() AND athlete_id = injury_reports.athlete_id AND status = 'active'
  )
);

-- Performance data policies
CREATE POLICY "Athletes own their performance data" ON personal_records FOR ALL USING (auth.uid() = athlete_id);
CREATE POLICY "Coaches can view athlete performance" ON personal_records FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM coach_athlete_relationships 
    WHERE coach_id = auth.uid() AND athlete_id = personal_records.athlete_id AND status = 'active'
  )
);

-- Notifications policies
CREATE POLICY "Users can view their notifications" ON notifications FOR SELECT USING (auth.uid() = recipient_id);
CREATE POLICY "Users can update their notifications" ON notifications FOR UPDATE USING (auth.uid() = recipient_id);

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_training_plans_updated_at BEFORE UPDATE ON training_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_injury_reports_updated_at BEFORE UPDATE ON injury_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_supplement_logs_updated_at BEFORE UPDATE ON supplement_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_nutrition_logs_updated_at BEFORE UPDATE ON nutrition_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create notification for injury reports
CREATE OR REPLACE FUNCTION notify_coach_of_injury()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert notification for the coach
  INSERT INTO notifications (recipient_id, sender_id, notification_type, title, message, data)
  SELECT 
    car.coach_id,
    NEW.athlete_id,
    'injury_report',
    'New Injury Report',
    'Your athlete has reported a new injury: ' || NEW.body_part,
    jsonb_build_object('injury_id', NEW.id, 'severity', NEW.severity)
  FROM coach_athlete_relationships car
  WHERE car.athlete_id = NEW.athlete_id AND car.status = 'active';
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for injury notifications
CREATE TRIGGER notify_coach_injury_trigger
  AFTER INSERT ON injury_reports
  FOR EACH ROW
  EXECUTE FUNCTION notify_coach_of_injury();

-- Function to create notification for workout completions
CREATE OR REPLACE FUNCTION notify_coach_of_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert notification for the coach
  INSERT INTO notifications (recipient_id, sender_id, notification_type, title, message, data)
  SELECT 
    wa.coach_id,
    NEW.athlete_id,
    'workout_completion',
    'Workout Completed',
    'Your athlete has completed their assigned workout',
    jsonb_build_object('completion_id', NEW.id, 'assignment_id', NEW.assignment_id)
  FROM workout_assignments wa
  WHERE wa.id = NEW.assignment_id;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for workout completion notifications
CREATE TRIGGER notify_coach_completion_trigger
  AFTER INSERT ON workout_completions
  FOR EACH ROW
  EXECUTE FUNCTION notify_coach_of_completion();

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_coach_code ON profiles(coach_code);
CREATE INDEX IF NOT EXISTS idx_coach_athlete_relationships_coach ON coach_athlete_relationships(coach_id);
CREATE INDEX IF NOT EXISTS idx_coach_athlete_relationships_athlete ON coach_athlete_relationships(athlete_id);
CREATE INDEX IF NOT EXISTS idx_workout_assignments_athlete ON workout_assignments(athlete_id);
CREATE INDEX IF NOT EXISTS idx_workout_assignments_coach ON workout_assignments(coach_id);
CREATE INDEX IF NOT EXISTS idx_workout_assignments_date ON workout_assignments(assigned_date);
CREATE INDEX IF NOT EXISTS idx_injury_reports_athlete ON injury_reports(athlete_id);
CREATE INDEX IF NOT EXISTS idx_injury_reports_status ON injury_reports(status);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_personal_records_athlete ON personal_records(athlete_id);
CREATE INDEX IF NOT EXISTS idx_personal_records_event ON personal_records(event_name);

-- =============================================
-- INITIAL DATA SETUP
-- =============================================

-- Insert sample coach codes for development
INSERT INTO profiles (id, username, full_name, role, coach_code) VALUES
  ('00000000-0000-0000-0000-000000000001', 'coach_demo', 'Demo Coach', 'coach', 'COACH123'),
  ('00000000-0000-0000-0000-000000000002', 'coach_smith', 'Sarah Smith', 'coach', 'SMITH456')
ON CONFLICT (id) DO NOTHING;

-- Sample track and field events for reference
CREATE TABLE IF NOT EXISTS track_field_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_name TEXT UNIQUE NOT NULL,
  event_type TEXT CHECK (event_type IN ('sprint', 'distance', 'hurdles', 'jump', 'throw', 'combined')),
  unit TEXT NOT NULL,
  is_timed BOOLEAN DEFAULT FALSE
);

INSERT INTO track_field_events (event_name, event_type, unit, is_timed) VALUES
  ('100m', 'sprint', 'seconds', TRUE),
  ('200m', 'sprint', 'seconds', TRUE),
  ('400m', 'sprint', 'seconds', TRUE),
  ('800m', 'distance', 'seconds', TRUE),
  ('1500m', 'distance', 'seconds', TRUE),
  ('5000m', 'distance', 'seconds', TRUE),
  ('10000m', 'distance', 'seconds', TRUE),
  ('Marathon', 'distance', 'seconds', TRUE),
  ('110m Hurdles', 'hurdles', 'seconds', TRUE),
  ('400m Hurdles', 'hurdles', 'seconds', TRUE),
  ('3000m Steeplechase', 'hurdles', 'seconds', TRUE),
  ('High Jump', 'jump', 'meters', FALSE),
  ('Pole Vault', 'jump', 'meters', FALSE),
  ('Long Jump', 'jump', 'meters', FALSE),
  ('Triple Jump', 'jump', 'meters', FALSE),
  ('Shot Put', 'throw', 'meters', FALSE),
  ('Discus', 'throw', 'meters', FALSE),
  ('Hammer Throw', 'throw', 'meters', FALSE),
  ('Javelin', 'throw', 'meters', FALSE),
  ('Decathlon', 'combined', 'points', FALSE),
  ('Heptathlon', 'combined', 'points', FALSE)
ON CONFLICT (event_name) DO NOTHING;
