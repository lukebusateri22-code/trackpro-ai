# 🗄️ TrackPro AI Database Setup Guide

This guide will help you set up the complete Supabase database for TrackPro AI, transforming it from a demo into a fully functional platform.

## 🎯 What You'll Get

After completing this setup, your platform will have:

- ✅ **Real User Authentication** - No more mock data
- ✅ **Coach-Athlete Relationships** - Real connections with coach codes
- ✅ **Complete Training System** - Workout assignments, completions, history
- ✅ **6-Module Recovery System** - Mental health, sleep, energy, injury, supplements, nutrition
- ✅ **Video Upload & Analysis** - Real file storage and coach feedback
- ✅ **Performance Analytics** - Personal records, achievements, statistics
- ✅ **Real-time Notifications** - Instant injury alerts to coaches
- ✅ **Data Security** - Row Level Security protecting all user data

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (2-3 minutes)
3. Note your project URL and anon key from Settings > API

### Step 2: Configure Environment

1. Copy `.env.example` to `.env`
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 3: Set Up Database

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Create a new query
4. Copy and paste the entire contents of `database/schema.sql`
5. Click **Run** to execute

### Step 4: Set Up Storage

1. Go to **Storage** in your Supabase dashboard
2. Create these buckets:
   - `videos` (for video uploads)
   - `avatars` (for profile pictures)
3. Set both buckets to **Public** for now (we'll secure them later)

### Step 5: Test the Setup

```bash
npm run dev
```

Visit your app and try:
- Creating a new account
- Signing in/out
- Uploading a video
- Creating injury reports
- Viewing achievements

## 📊 Database Schema Overview

### Core Tables

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `profiles` | User profiles | Coach codes, athlete info, emergency contacts |
| `coach_athlete_relationships` | Coach-athlete connections | Status tracking, relationship management |
| `training_plans` | Workout templates | Coach-created, reusable training programs |
| `workout_assignments` | Assigned workouts | Due dates, priority, completion tracking |
| `video_uploads` | Video analysis | File storage, coach feedback, technique analysis |

### Recovery System Tables

| Table | Purpose | Data Tracked |
|-------|---------|--------------|
| `mental_health_logs` | Mental wellness | Mood, stress, anxiety, confidence (1-10 scales) |
| `sleep_logs` | Sleep tracking | Duration, quality, wake times, factors |
| `energy_logs` | Energy levels | Morning/afternoon/evening energy, fatigue |
| `injury_reports` | Injury tracking | Severity, body parts, treatment, recovery |
| `supplement_logs` | Supplement tracking | Dosages, effectiveness, side effects |
| `nutrition_logs` | Nutrition data | Calories, macros, hydration, meal details |

### Performance Tables

| Table | Purpose | Features |
|-------|---------|----------|
| `personal_records` | PR tracking | Event times/distances, competition data |
| `achievements` | Gamification | Badges, milestones, rarity system |
| `training_statistics` | Analytics | Performance trends, completion rates |

## 🔐 Security Features

### Row Level Security (RLS)

Every table has RLS policies ensuring:
- Athletes only see their own data
- Coaches only see their athletes' data
- Injury reports automatically notify coaches
- Mental health data can be private to athletes

### Real-time Features

- **Injury Notifications**: Coaches get instant alerts when athletes report injuries
- **Workout Completions**: Real-time updates when athletes finish workouts
- **Data Syncing**: All changes sync immediately across devices

## 🎮 Sample Data

The schema includes sample data for:
- Demo coach accounts with codes `COACH123` and `SMITH456`
- All 21 track & field events with proper units
- Achievement categories and rarity levels

## 🔧 Advanced Configuration

### Custom Coach Codes

Coach codes are automatically generated but can be customized:

```sql
UPDATE profiles 
SET coach_code = 'CUSTOM123' 
WHERE id = 'coach_user_id';
```

### Notification Settings

Configure notification triggers in the database:

```sql
-- Disable injury notifications for a specific coach
UPDATE coach_athlete_relationships 
SET status = 'no_injury_alerts' 
WHERE coach_id = 'coach_id';
```

### Storage Policies

Secure your storage buckets with RLS:

```sql
-- Only allow users to upload their own videos
CREATE POLICY "Users can upload own videos" ON storage.objects
FOR INSERT WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);
```

## 🚨 Troubleshooting

### Common Issues

**"Cannot connect to database"**
- Check your `.env` file has correct Supabase URL and key
- Ensure your Supabase project is active

**"RLS policy violation"**
- Make sure you're signed in when testing
- Check that policies allow your user role to access the data

**"Video upload fails"**
- Verify storage buckets are created
- Check bucket permissions are set to public
- Ensure file size is under Supabase limits

### Getting Help

1. Check the browser console for detailed error messages
2. Review Supabase logs in your project dashboard
3. Verify your database schema matches `database/schema.sql`

## 🎯 Next Steps

After your database is set up:

1. **Test Core Features**: Try all major workflows (signup, training, recovery)
2. **Customize Settings**: Adjust notification preferences and privacy settings
3. **Add Real Data**: Start using the platform with real athletes and coaches
4. **Monitor Performance**: Use Supabase analytics to track usage

## 📈 Production Checklist

Before going live:

- [ ] Set up proper backup policies
- [ ] Configure email templates for auth
- [ ] Set up monitoring and alerts
- [ ] Review and tighten RLS policies
- [ ] Set up proper storage limits
- [ ] Configure CORS for your domain
- [ ] Set up SSL certificates

---

🎉 **Congratulations!** Your TrackPro AI platform is now production-ready with a complete database backend!

The platform can now handle real users, store actual data, and provide the full coach-athlete experience you've built.
