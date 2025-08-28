import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://miqhyoiejjqpsomubmoa.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcWh5b2llampxcHNvbXVibW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMjc2NjIsImV4cCI6MjA1MDkwMzY2Mn0.WiuBn2rMCXm0SKKrxNURkA_4Y98OEkc';

// Create Supabase client with TypeScript types
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Helper function to check connection
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (error) {
      console.warn('Supabase connection issue:', error.message);
      return false;
    }
    console.log('✅ Supabase connected successfully');
    return true;
  } catch (err) {
    console.warn('❌ Supabase connection failed:', err);
    return false;
  }
};

// Export for backward compatibility
export default supabase;