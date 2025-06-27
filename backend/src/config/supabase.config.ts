if (process.env.NODE_ENV === 'development' || process.env.ENVIRONMENT === 'DEVELOPMENT') {
  console.log('[ENV CHECK] SUPABASE_URL:', process.env.SUPABASE_URL);
  console.log('[ENV CHECK] SUPABASE_ANON_KEY loaded:', !!process.env.SUPABASE_ANON_KEY);
  console.log(
    '[ENV CHECK] SUPABASE_SERVICE_ROLE_KEY loaded:',
    !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
} else {
  console.log('[ENV CHECK] Supabase environment variables loaded');
}

export const SUPABASE_URL = process.env.SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('[Supabase Config] Missing one or more required environment variables');
}
