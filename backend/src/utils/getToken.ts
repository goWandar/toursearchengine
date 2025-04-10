import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env
config({ path: resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase URL or Anon Key in environment variables.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

(async () => {
    // Replace these if you want to hardcode
    const email = "jacekroszkowiakdev@gmail.com";
    const password = "SuperSecret123!";

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Login failed:", error.message);
        console.error("Raw error object:", error);
        process.exit(1);
    }

    console.log("Logged in. Access token:");
    console.log(data?.session?.access_token);
})();
