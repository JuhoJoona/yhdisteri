'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient, typedApiClient } from '@/lib/server';

export async function login(formData: FormData, locale: string) {
  console.log('login');
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  console.log('data', data);

  const { error } = await supabase.auth.signInWithPassword(data);
  console.log('error', error);
  if (error) {
    redirect(`/${locale}/error`);
  }

  revalidatePath('/', 'layout');

  redirect(`/${locale}/lander`);
}

export async function signup(formData: FormData, locale: string) {
  const supabase = await createClient();

  const signInData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    phone: formData.get('phone') as string,
  };

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: signInData.email,
    password: signInData.password,
    options: {
      data: {
        first_name: signInData.first_name,
        last_name: signInData.last_name,
      },
    },
  });

  console.log('signUpData', signUpData);
  console.log('error', error);

  const { user } = signUpData;
  console.log('user', user);
  if (error || !user) {
    console.log('error');
    redirect(`/${locale}/error`);
  }

  const resp = await typedApiClient.POST('/users/create', {
    body: {
      user: {
        externalId: user.id,
        firstName: user.user_metadata.first_name,
        lastName: user.user_metadata.last_name,
        email: user.email,
        phone: user.phone,
      },
    },
  });

  console.log('resp', resp);

  revalidatePath('/', 'layout');
  redirect(`/${locale}/lander`);
}
