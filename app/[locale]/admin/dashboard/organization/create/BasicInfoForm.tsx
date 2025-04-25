'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function BasicInfoForm({ plan }: { plan: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations('CreateOrganization');

  function createOrganization(formData: FormData) {
    localStorage.setItem(
      'organization',
      JSON.stringify(Object.fromEntries(formData))
    );
    router.push('/admin/dashboard/organization/create/address');
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    await createOrganization(new FormData(event.currentTarget));
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-md mx-auto dark:bg-black">
      <CardHeader>
        <CardTitle>{t('createOrganization')}</CardTitle>
        <CardDescription>{t('enterOrganizationInfo')}</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2 mb-4">
            <Label htmlFor="name">{t('organizationName')}</Label>
            <Input id="name" name="name" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('creating')}
              </>
            ) : (
              t('next')
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
