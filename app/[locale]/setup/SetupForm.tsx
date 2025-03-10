'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { createOrganization } from './actions';

export default function SetupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Get form element and create FormData from it
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await createOrganization(formData);
      console.log('Action result:', result);
      if (!result.success) {
        setError(result.error || 'Failed to create organization');
      } else {
        router.push('/dashboard'); // Redirect to dashboard on success
      }
    } catch (err) {
      console.error('Action error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create Your Organization
        </CardTitle>
        <CardDescription className="text-center">
          Enter your organization information to get started with Yhdisteri
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input id="name" name="name" placeholder="Acme Inc." required />
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              name="street"
              placeholder="123 Main St"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="New York" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input id="zipCode" name="zipCode" placeholder="10001" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              placeholder="United States"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating organization...
              </>
            ) : (
              'Create Organization'
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an organization?{' '}
            <Link href="/dashboard" className="text-primary hover:underline">
              Go to Dashboard
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
