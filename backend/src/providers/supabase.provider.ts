// SupabaseProvider.signUp; DONE
// SupabaseProvider.signIn; DONE
// SupabaseProvider.signOut; DONE
// SupabaseProvider.getUser; DONE
// SupabaseProvider.changePassword; DONE
// SupabaseProvider.oneTimePassword; DONE
// SupabaseProvider.deleteUser; DONE

// SupabaseProvider.updateUser;
// SupabaseProvider.refreshToken;

import { createClient } from '@supabase/supabase-js';
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

  async getUserData(token: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return { user };
  },

  async userChangePassword(token: string, newPassword: string) {
    const supabaseWithToken = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return await supabaseWithToken.auth.updateUser({ password: newPassword });
  },

  async sendMagicLink(email: string) {
    return await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: process.env.SUPABASE_REDIRECT_URL,
      },
    });
  },

  async userDeleteOwnProfile(userId: string) {
    const adminClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    return await adminClient.auth.admin.deleteUser(userId);
  },
};
