import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DEMO_MODE } from 'src/demo/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jkgrtkldyzyllnensaym.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZ3J0a2xkeXp5bGxuZW5zYXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5Njg5NTQsImV4cCI6MjA3NTU0NDk1NH0.j1t_mQ6nIECqFawsPNnPK7AHCoAC3xwo2rS1N_DOjfw';

// Demo mode: an offline stub. Every query chain resolves to empty data, so no
// request ever reaches Supabase (pages fall back to their built-in defaults).
function createOfflineStub(single = false): any {
  const result = { data: single ? null : [], error: null, count: 0 };
  return new Proxy(function stub() {}, {
    get(_t, prop) {
      if (prop === 'then') return (res: any, rej: any) => Promise.resolve(result).then(res, rej);
      if (prop === 'single' || prop === 'maybeSingle') return () => createOfflineStub(true);
      return createOfflineStub(single);
    },
    apply() {
      return createOfflineStub(single);
    },
  });
}

export const supabase: SupabaseClient = DEMO_MODE
  ? createOfflineStub()
  : createClient(supabaseUrl, supabaseAnonKey);
