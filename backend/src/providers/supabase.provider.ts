// SupabaseProvider.signUp;
// SupabaseProvider.signIn;
// SupabaseProvider.getUser;
// SupabaseProvider.refreshToken;
// SupabaseProvider.verifyToken;
// SupabaseProvider.deleteUser;

import { supabase } from "../config/supabase";

export const SupabaseProvider = {
    client: supabase, // Expose Supabase client instance

    async signUp(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        return { data, error };
    },

    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    async getUser(token: string) {
        return await supabase.auth.getUser(token);
    },
};
