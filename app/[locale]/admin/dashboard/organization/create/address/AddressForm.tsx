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

export default function AddressForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function saveAddress(formData: FormData) {
    const organization = JSON.parse(
      localStorage.getItem('organization') || '{}'
    );
    const address = Object.fromEntries(formData);
    organization.street = address.street;
    organization.city = address.city;
    organization.zipCode = address.zipCode;
    organization.country = address.country;
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
        <CardTitle>Organization Address</CardTitle>
        <CardDescription>
          Enter your organization&apos;s address details
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input id="street" name="street" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input id="zipCode" name="zipCode" required />
          </div>
          <div className="space-y-2 mb-4">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Next'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
