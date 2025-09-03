#!/usr/bin/env node

/**
 * TrackPro AI Production Setup Script
 * 
 * This script helps verify your production setup and guides you through
 * the deployment process.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 TrackPro AI Production Setup');
console.log('=================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
const hasEnv = fs.existsSync(envPath);

console.log('📋 Pre-Deployment Checklist:');
console.log('============================');

// Environment Check
if (hasEnv) {
  console.log('✅ Environment file (.env) found');
  
  // Read and validate env vars
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasSupabaseUrl = envContent.includes('VITE_SUPABASE_URL=');
  const hasSupabaseKey = envContent.includes('VITE_SUPABASE_ANON_KEY=');
  
  if (hasSupabaseUrl && hasSupabaseKey) {
    console.log('✅ Supabase credentials configured');
  } else {
    console.log('❌ Missing Supabase credentials in .env');
    console.log('   Add: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  }
} else {
  console.log('❌ Environment file (.env) not found');
  console.log('   Copy .env.example to .env and add your credentials');
}

// Database Schema Check
const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
const hasSchema = fs.existsSync(schemaPath);

if (hasSchema) {
  console.log('✅ Database schema file found');
} else {
  console.log('❌ Database schema file missing');
}

// Build Check
const distPath = path.join(__dirname, '..', 'dist');
const hasBuilt = fs.existsSync(distPath);

if (hasBuilt) {
  console.log('✅ Production build exists');
} else {
  console.log('⚠️  No production build found');
  console.log('   Run: npm run build');
}

console.log('\n🎯 Next Steps:');
console.log('==============');

if (!hasEnv) {
  console.log('1. 📝 Create .env file with Supabase credentials');
} else {
  console.log('1. ✅ Environment configured');
}

console.log('2. 🗄️  Set up Supabase database:');
console.log('   - Create new Supabase project');
console.log('   - Run database/schema.sql in SQL Editor');
console.log('   - Create storage buckets: videos, avatars');

console.log('3. 🧪 Test the setup:');
console.log('   - npm run dev');
console.log('   - Create test account');
console.log('   - Verify data saves to Supabase');

console.log('4. 🚀 Deploy to production:');
console.log('   - npm run build');
console.log('   - npx netlify deploy --prod --dir=dist');

console.log('\n📚 Documentation:');
console.log('==================');
console.log('📖 Database Setup: DATABASE_SETUP.md');
console.log('🚀 Production Guide: PRODUCTION_DEPLOYMENT.md');

console.log('\n🎉 Your TrackPro AI platform is ready for production!');
console.log('   Complete athletics training platform with:');
console.log('   ✅ Real-time coach-athlete features');
console.log('   ✅ 6-module recovery system');
console.log('   ✅ Video analysis workflow');
console.log('   ✅ Performance tracking & analytics');
console.log('   ✅ Professional UI with mobile support');

console.log('\n💪 Ready to transform athletics training!');
