import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://miqhyoiejjqpsomubmoa.supabase.co';
const supabaseKey = 'sb_publishable_WiuBn2rMCXm0SKKrxNURkA_4Y98OEkc';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };