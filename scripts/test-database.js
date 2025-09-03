#!/usr/bin/env node

/**
 * Database Connection Test Script
 * 
 * Tests the Supabase connection and verifies database setup
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🧪 Testing TrackPro AI Database Connection');
console.log('==========================================\n');

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing Supabase credentials');
  console.log('   Make sure .env file has:');
  console.log('   VITE_SUPABASE_URL=your_url');
  console.log('   VITE_SUPABASE_ANON_KEY=your_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('🔗 Testing connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.log('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (err) {
    console.log('❌ Connection error:', err.message);
    return false;
  }
}

async function testTables() {
  console.log('\n📊 Checking database tables...');
  
  const requiredTables = [
    'profiles',
    'coach_athlete_relationships',
    'training_plans',
    'workout_sessions',
    'workout_assignments',
    'video_uploads',
    'mental_health_logs',
    'sleep_logs',
    'energy_logs',
    'injury_reports',
    'supplement_logs',
    'nutrition_logs',
    'personal_records',
    'achievements',
    'notifications'
  ];
  
  let tablesFound = 0;
  
  for (const table of requiredTables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (!error) {
        console.log(`✅ ${table}`);
        tablesFound++;
      } else {
        console.log(`❌ ${table} - ${error.message}`);
      }
    } catch (err) {
      console.log(`❌ ${table} - ${err.message}`);
    }
  }
  
  console.log(`\n📈 Tables found: ${tablesFound}/${requiredTables.length}`);
  
  if (tablesFound === requiredTables.length) {
    console.log('🎉 All required tables are present!');
    return true;
  } else {
    console.log('⚠️  Some tables are missing. Run database/schema.sql in Supabase SQL Editor.');
    return false;
  }
}

async function testAuth() {
  console.log('\n🔐 Testing authentication...');
  
  try {
    // Test if auth is configured
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.log('❌ Auth configuration error:', error.message);
      return false;
    }
    
    console.log('✅ Authentication system is configured');
    return true;
  } catch (err) {
    console.log('❌ Auth test failed:', err.message);
    return false;
  }
}

async function testStorage() {
  console.log('\n📁 Testing storage buckets...');
  
  try {
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.log('❌ Storage test failed:', error.message);
      return false;
    }
    
    const bucketNames = data.map(bucket => bucket.name);
    const requiredBuckets = ['videos', 'avatars'];
    
    let bucketsFound = 0;
    for (const bucket of requiredBuckets) {
      if (bucketNames.includes(bucket)) {
        console.log(`✅ ${bucket} bucket exists`);
        bucketsFound++;
      } else {
        console.log(`❌ ${bucket} bucket missing`);
      }
    }
    
    if (bucketsFound === requiredBuckets.length) {
      console.log('🎉 All storage buckets are configured!');
      return true;
    } else {
      console.log('⚠️  Create missing buckets in Supabase Storage');
      return false;
    }
  } catch (err) {
    console.log('❌ Storage test failed:', err.message);
    return false;
  }
}

async function runTests() {
  const connectionOk = await testConnection();
  
  if (!connectionOk) {
    console.log('\n❌ Cannot proceed without database connection');
    process.exit(1);
  }
  
  const tablesOk = await testTables();
  const authOk = await testAuth();
  const storageOk = await testStorage();
  
  console.log('\n📋 Test Summary:');
  console.log('================');
  console.log(`Database Connection: ${connectionOk ? '✅' : '❌'}`);
  console.log(`Database Tables: ${tablesOk ? '✅' : '❌'}`);
  console.log(`Authentication: ${authOk ? '✅' : '❌'}`);
  console.log(`Storage Buckets: ${storageOk ? '✅' : '❌'}`);
  
  if (connectionOk && tablesOk && authOk && storageOk) {
    console.log('\n🎉 All tests passed! Your database is ready for production!');
    console.log('\n🚀 Next steps:');
    console.log('   1. npm run build');
    console.log('   2. npm run dev (test locally)');
    console.log('   3. Deploy to production');
  } else {
    console.log('\n⚠️  Some tests failed. Check the issues above and:');
    console.log('   1. Verify your .env file has correct credentials');
    console.log('   2. Run database/schema.sql in Supabase SQL Editor');
    console.log('   3. Create storage buckets in Supabase Dashboard');
  }
}

runTests().catch(console.error);
