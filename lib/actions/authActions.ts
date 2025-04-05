'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient, typedApiClient } from '@/lib/server';

export async function login(
  formData: FormData,
  locale: string,
  redirectDestination?: string,
  code?: string
) {
  console.log('login', redirectDestination, code);
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  console.log('data', data);

  const { error } = await supabase.auth.signInWithPassword(data);
  console.log('error', error);
  if (error) {
    const errorMessage = error.message.includes('Invalid login credentials')
      ? 'invalidCredentials'
      : 'generalError';

    redirect(
      `/${locale}/sign-in?error=${errorMessage}&redirect=${redirectDestination}&code=${code}`
    );
  }

  if (redirectDestination) {
    if (redirectDestination === 'join_with_code') {
      redirect(`/${locale}/join/${code}`);
    } else {
      redirect(`/${locale}/${redirectDestination}`);
    }
  }

  revalidatePath('/', 'layout');

  redirect(`/${locale}/lander`);
}

export async function signup(
  formData: FormData,
  locale: string,
  redirectDestination?: string,
  code?: string
) {
  const supabase = await createClient();

  const signInData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    address: formData.get('address') as string,
    city: formData.get('city') as string,
    zip_code: formData.get('zip_code') as string,
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
    let errorMessage = 'generalError';
    if (error?.message.includes('Password should be')) {
      errorMessage = 'passwordRequirements';
    } else if (error?.message.includes('User already registered')) {
      errorMessage = 'emailExists';
    }

    redirect(
      `/${locale}/sign-up?error=${errorMessage}&redirect=${redirectDestination}&code=${code}`
    );
  }

  const resp = await typedApiClient.POST('/users/create', {
    body: {
      user: {
        externalId: user.id,
        firstName: user.user_metadata.first_name,
        lastName: user.user_metadata.last_name,
        email: user.email,
        address: signInData.address,
        city: signInData.city,
        zip_code: signInData.zip_code,
      },
    },
  });

  console.log('resp', resp);

  revalidatePath('/', 'layout');
  if (redirectDestination) {
    if (redirectDestination === 'join_with_code') {
      redirect(`/${locale}/join/${code}`);
    } else {
      redirect(`/${locale}/${redirectDestination}`);
    }
  } else {
    redirect(`/${locale}/lander`);
  }
}
