'use server';

import { revalidatePath } from 'next/cache';
import api from '@/lib/api';

export async function createOrganization(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const street = formData.get('street') as string;
    const city = formData.get('city') as string;
    const zipCode = formData.get('zipCode') as string;
    const country = formData.get('country') as string;

    // Use the API client which already handles authentication
    const response = await api.post('/organizations/create', {
      name,
      paymentsActive: false,
      street,
      city,
      zipCode,
      country,
    });

    if (!response.ok) {
      throw new Error('Failed to create organization');
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error creating organization:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
