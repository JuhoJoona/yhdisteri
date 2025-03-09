'use server';

import { revalidatePath } from 'next/cache';
import { typedApiClient } from '@/lib/apiClientServer';
import { auth } from '@clerk/nextjs/server';

export async function createUserAction(formData: FormData) {
  console.log('createUserAction', formData);
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const organizationTab = formData.get('organizationTab') as 'join' | 'create';
  const organizationCode = formData.get('organizationCode') as string;
  const organizationName = formData.get('organizationName') as string;

  const currentUser = await auth();
  const externalId = currentUser.userId;

  console.log('organizationTab', organizationTab);
  console.log('organizationCode', organizationCode);
  console.log('organizationName', organizationName);
  console.log('firstName', firstName);
  console.log('lastName', lastName);
  console.log('phone', phone);

  if (organizationTab === 'join' && organizationCode.length !== 6) {
    return { error: 'Invalid organization code' };
  }

  if (organizationTab === 'create' && !organizationName) {
    return { error: 'Organization name required' };
  }

  try {
    const organizationInfo =
      organizationTab === 'join'
        ? { type: 'join' as const, code: organizationCode }
        : { type: 'create' as const, name: organizationName };

    const response = await typedApiClient.POST('/users/create', {
      body: {
        user: {
          firstName,
          lastName,
          organizationInfo,
          externalId: externalId ?? undefined,
          phone,
          email,
        },
      },
    });
    console.log('response', response);

    if (!response.data) {
      console.error('Registration failed:', response);
      return { error: 'Registration failed' };
    }

    const data = response.data;
    console.log(data);

    revalidatePath('/'); // Revalidate the root path or any relevant paths

    return { success: true, data };
  } catch (error: any) {
    console.error('Error during registration:', error);
    return { error: error.message || 'An unexpected error occurred' };
  }
}
