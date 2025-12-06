import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jkgrtkldyzyllnensaym.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZ3J0a2xkeXp5bGxuZW5zYXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5Njg5NTQsImV4cCI6MjA3NTU0NDk1NH0.j1t_mQ6nIECqFawsPNnPK7AHCoAC3xwo2rS1N_DOjfw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
