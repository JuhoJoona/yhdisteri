'use client';
import { Button } from '@/components/ui/button';
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
import { Separator } from '@/components/ui/separator';
import { OwnData } from '@/lib/types/member';
import { updateUserById } from '@/lib/services/userClientService';
import { Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const PersonalInformation = ({ userData }: { userData: OwnData }) => {
  const t = useTranslations('Member');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const updateData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        address: {
          street: formData.get('street') as string,
          city: formData.get('city') as string,
          zipCode: formData.get('zipCode') as string,
        },
      };

      await updateUserById(userData.id!, updateData);
      setSuccess(t('profileUpdatedSuccessfully'));
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(t('profileUpdateFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="">{t('personalInformation')}</CardTitle>
          <CardDescription className="my-4">
            {t('updateYourPersonalDetails')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t('firstName')}</Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={userData.firstName}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t('lastName')}</Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={userData.lastName}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={userData.email}
                required
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>{t('address')}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">{t('street')}</Label>
                <Input
                  id="street"
                  name="street"
                  defaultValue={userData.address}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">{t('city')}</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={userData.city}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">{t('zipCode')}</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  defaultValue={userData.zip}
                  required
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-end">
          {success && (
            <div className="mb-4 text-green-600 mr-12">{success}</div>
          )}
          {error && <div className="mb-4 text-red-600 mr-12">{error}</div>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {t('saveChanges')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PersonalInformation;
