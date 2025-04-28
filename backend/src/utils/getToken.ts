import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env
config({ path: resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

const tokenTestEmail = process.env.TOKEN_TEST_EMAIL;
const tokenTestPassword = process.env.TOKEN_TEST_PASSWORD;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

(async () => {
  const email = tokenTestEmail;
  const password = tokenTestPassword;

  if (!email || !password) {
    console.error('Email or password is missing in environment variables.');
    process.exit(1);
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login failed:', error.message);
    console.error('Raw error object:', error);
    process.exit(1);
  }

  console.log('Logged in. Access token:');
  console.log(data?.session?.access_token);
})();
