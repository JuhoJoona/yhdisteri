// sign out page

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/server';

export default async function SignOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect('/');
}
