import { createClient, Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';

import { formatSupabaseError } from '../utils/supabaseErrorHandler';

type SupabaseResult<T> = { success: true; data: T } | { success: false; error: string };

export const SupabaseProvider = {
  client: supabase, // Expose Supabase client instance

  async signUp(
    email: string,
    password: string,
  ): Promise<SupabaseResult<{ user: SupabaseUser | null; session: Session | null }>> {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return formatSupabaseError('signUp', error);
    }

    return { success: true, data };
  },

  async signIn(
    email: string,
    password: string,
  ): Promise<SupabaseResult<{ user: SupabaseUser; session: Session }>> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.session || !data?.user) {
      return formatSupabaseError(
        'signIn',
        error || {
          message: 'Missing session or user in Supabase response.',
        },
      );
    }

    return { success: true, data };
  },

  async signOut(): Promise<SupabaseResult<null>> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return formatSupabaseError('signOut', error);
    }

    return { success: true, data: null };
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

  async deleteUserProfile(userId: string): Promise<SupabaseResult<null>> {
    const adminClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { error } = await adminClient.auth.admin.deleteUser(userId);

    if (error) {
      return formatSupabaseError('deleteUser', error);
    }

    return { success: true, data: null };
  },

  async refreshToken(refreshToken: string) {
    return await supabase.auth.refreshSession({ refresh_token: refreshToken });
  },
};
