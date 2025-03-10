import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function getServerSession() {
  // Create a Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  return supabase.auth.getSession();
}

export async function getServerUser() {
  const {
    data: { session },
  } = await getServerSession();
  return session?.user || null;
}

export async function isAuthenticated() {
  const {
    data: { session },
  } = await getServerSession();
  return !!session;
}

export async function hasRole(role: string) {
  const {
    data: { session },
  } = await getServerSession();
  if (!session) return false;

  // This is a placeholder - you would implement your actual role checking logic here
  // For example, querying a roles table in your database
  return session.user.app_metadata?.roles?.includes(role) || false;
}
