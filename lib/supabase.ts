import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://jpknmfiuuwknywnfokxa.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwa25tZml1dXdrbnl3bmZva3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MzExMTQsImV4cCI6MjA1NzIwNzExNH0.RCFAUeqEHkP3KPHEtz_xjQGsf9qDdZe0I8c628HUnGQ';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to get the current session
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return data.session;
};

// Function to get the current user
export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  return data.user;
};

// Function to get the access token
export const getAccessToken = async (): Promise<string | null> => {
  const session = await getSession();
  return session?.access_token || null;
};

// Function to sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    return false;
  }
  return true;
};
