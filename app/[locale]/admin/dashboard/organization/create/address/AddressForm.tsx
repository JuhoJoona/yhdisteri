'use client';

import React, { useState } from 'react';
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

export default function AddressForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations('OrganizationCreate');
  async function saveAddress(formData: FormData) {
    const organization = JSON.parse(
      localStorage.getItem('organization') || '{}'
    );
    const address = Object.fromEntries(formData);
    organization.street = address.street;
    organization.city = address.city;
    organization.zipCode = address.zipCode;
    localStorage.setItem('organization', JSON.stringify(organization));
    router.push('/admin/dashboard/organization/create/plan');
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    await saveAddress(new FormData(event.currentTarget));
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">{t('street')}</Label>
            <Input id="street" name="street" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">{t('city')}</Label>
            <Input id="city" name="city" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">{t('zipCode')}</Label>
            <Input id="zipCode" name="zipCode" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full mt-12" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('saving')}
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
