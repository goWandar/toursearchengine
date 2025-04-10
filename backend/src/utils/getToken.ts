import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase URL or Anon Key in environment variables.");
    process.exit(1);
}

console.log("Supabase environment variables loaded.");

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth logic
(async () => {
    const email = process.env.SUPABASE_USER;
    const password = process.env.SUPABASE_PASSWORD; //TODO: fix schema and add password
    console.log("SUPABASE_USER:", process.env.SUPABASE_USER);
    console.log("SUPABASE_PASSWORD:", process.env.SUPABASE_PASSWORD);

    if (!email || !password) {
        console.error("Missing SUPABASE_EMAIL or SUPABASE_PASSWORD in .env");
        process.exit(1);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error(" Login failed:", error.message);
        console.error("Raw error object:", error);
        process.exit(1);
    }

    console.log("Logged in. Access token:");
    console.log(data?.session?.access_token);
})();
