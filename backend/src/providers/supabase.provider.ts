// SupabaseProvider.signUp; DONE
// SupabaseProvider.signIn; DONE
// SupabaseProvider.signOut; DONE
// SupabaseProvider.getUser; DONE

// SupabaseProvider.changePassword;
// SupabaseProvider.oneTimePassword;
// SupabaseProvider.updateUser;
// SupabaseProvider.refreshToken;
// SupabaseProvider.verifyToken;
// SupabaseProvider.deleteUser;

import { supabase } from '../config/supabase';

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

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getUser(token: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return { user };
  },

  async resetPassword(email: string) {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.SUPABASE_REDIRECT_URL,
    });
  },
};
