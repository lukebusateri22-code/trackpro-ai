#!/usr/bin/env node

/**
 * TrackPro AI Database Setup Script
 * 
 * This script helps set up the Supabase database with all required tables,
 * policies, and initial data for the TrackPro AI platform.
 * 
 * Usage:
 * 1. Set up your Supabase project
 * 2. Add your Supabase URL and service role key to .env
 * 3. Run: node scripts/setup-database.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 TrackPro AI Database Setup');
console.log('==============================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('Please create a .env file with your Supabase credentials:');
  console.log('');
  console.log('VITE_SUPABASE_URL=your_supabase_project_url');
  console.log('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.log('VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
  console.log('');
  process.exit(1);
}

console.log('✅ Environment file found');

// Read the SQL schema
const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
if (!fs.existsSync(schemaPath)) {
  console.log('❌ Database schema file not found!');
  console.log('Expected: database/schema.sql');
  process.exit(1);
}

const schema = fs.readFileSync(schemaPath, 'utf8');
console.log('✅ Database schema loaded');

console.log('\n📋 Setup Instructions:');
console.log('======================');
console.log('');
console.log('1. Go to your Supabase project dashboard');
console.log('2. Navigate to the SQL Editor');
console.log('3. Create a new query and paste the contents of database/schema.sql');
console.log('4. Run the query to create all tables and policies');
console.log('');
console.log('5. Go to Storage and create the following buckets:');
console.log('   - videos (for video uploads)');
console.log('   - avatars (for profile pictures)');
console.log('');
console.log('6. Set up Row Level Security policies for the storage buckets');
console.log('');
console.log('🎯 Your database will include:');
console.log('   ✅ User profiles and authentication');
console.log('   ✅ Coach-athlete relationships');
console.log('   ✅ Complete training system');
console.log('   ✅ Recovery tracking (6 modules)');
console.log('   ✅ Video upload system');
console.log('   ✅ Performance analytics');
console.log('   ✅ Real-time notifications');
console.log('   ✅ 21 track & field events');
console.log('');
console.log('🔐 Security Features:');
console.log('   ✅ Row Level Security (RLS) on all tables');
console.log('   ✅ Coach-athlete data isolation');
console.log('   ✅ Automatic injury notifications');
console.log('   ✅ Real-time data syncing');
console.log('');
console.log('📊 After setup, your platform will have:');
console.log('   🏃‍♂️ Complete athlete management');
console.log('   🏋️‍♀️ Training plan creation and assignment');
console.log('   🎥 Video analysis workflow');
console.log('   💤 Comprehensive recovery tracking');
console.log('   🏆 Achievement and PR systems');
console.log('   📈 Performance analytics');
console.log('   🔔 Real-time coach notifications');
console.log('');
console.log('🚀 Ready to transform your coaching platform!');
console.log('');
console.log('Need help? Check the README.md for detailed setup instructions.');

// Optional: If we have Supabase client available, we could run the setup automatically
// For now, we'll provide manual instructions to ensure users understand the process
