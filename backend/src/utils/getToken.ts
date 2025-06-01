import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: resolve(__dirname, '../../.env') });

console.log('[DEBUG] Loaded ENV vars:', {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  TOKEN_TEST_EMAIL: process.env.TOKEN_TEST_EMAIL,
  TOKEN_TEST_PASSWORD: process.env.TOKEN_TEST_PASSWORD,
});

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
