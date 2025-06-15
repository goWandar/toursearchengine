import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, supabaseAdmin, getSupabaseWithToken } from '../config/supabase.js';

import { ServiceResponse as SupabaseResult } from '../types/types.js';

import { formatSupabaseError } from '../utils/supabaseErrorHandler.js';

export const SupabaseProvider = {
  client: supabase, // Expose Supabase client instance

  async createUser(
    email: string,
    password: string,
  ): Promise<SupabaseResult<{ id: string; email: string }>> {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error || !data?.user?.id) {
      return formatSupabaseError(
        'createUser',
        error || { message: 'Missing user in Supabase response' },
      );
    }

    return {
      success: true,
      data: {
        id: data.user.id,
        email: data.user.email!,
      },
    };
  },

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

  async getUserData(): Promise<SupabaseResult<SupabaseUser | null>> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return formatSupabaseError('getUserData', error);
    }

    return { success: true, data: user };
  },

  async userChangePassword(
    token: string,
    newPassword: string,
  ): Promise<SupabaseResult<SupabaseUser>> {
    const supabaseWithToken = getSupabaseWithToken(token);

    const { data, error } = await supabaseWithToken.auth.updateUser({ password: newPassword });

    if (error || !data?.user) {
      return formatSupabaseError(
        'userChangePassword',
        error || { message: 'Failed to update user password' },
      );
    }

    return { success: true, data: data.user };
  },

  async sendMagicLink(email: string): Promise<SupabaseResult<null>> {
    const redirectUrl = process.env.SUPABASE_REDIRECT_URL;

    if (!redirectUrl) {
      return {
        success: false,
        error: '[sendMagicLink] Missing SUPABASE_REDIRECT_URL env variable',
      };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      return formatSupabaseError('sendMagicLink', error);
    }

    return { success: true, data: null };
  },

  async deleteUserProfile(userId: string): Promise<SupabaseResult<null>> {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      return formatSupabaseError('deleteUserProfile', error);
    }

    return { success: true, data: null };
  },

  async refreshToken(
    refreshToken: string,
  ): Promise<SupabaseResult<{ user: SupabaseUser; session: Session }>> {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

    if (error || !data?.session || !data?.user) {
      return formatSupabaseError('refreshToken', error || { message: 'Failed to refresh session' });
    }

    return { success: true, data: { user: data.user, session: data.session } };
  },
};
