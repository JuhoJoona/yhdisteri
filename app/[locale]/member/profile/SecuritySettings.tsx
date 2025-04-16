'use client';

import { useState } from 'react';
import { Lock, Shield, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/client';
import { OwnData } from '@/lib/types/member';
import { useTranslations } from 'next-intl';
export default function SecuritySettings({ user }: { user: OwnData }) {
  const supabaseClient = createClient();
  const t = useTranslations('SecuritySettings');
  const router = useRouter();

  const [isLoading, setIsLoading] = useState({
    password: false,
    twoFactor: false,
    deleteAccount: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      console.log('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      console.log('Password must be at least 8 characters');
      return;
    }

    setIsLoading((prev) => ({ ...prev, password: true }));

    try {
      // Supabase requires the user to be logged in to update password
      const { error } = await supabaseClient.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) throw error;

      console.log('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: Error | unknown) {
      console.error('Error updating password:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update password';
      console.log(errorMessage);
    } finally {
      setIsLoading((prev) => ({ ...prev, password: false }));
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsLoading((prev) => ({ ...prev, deleteAccount: true }));

    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;

      console.log('Account deleted, you have been signed out');
      router.push('/'); // Redirect to homepage
    } catch (error: Error | unknown) {
      console.error('Error deleting account:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete account';
      console.log(errorMessage);
    } finally {
      setIsLoading((prev) => ({ ...prev, deleteAccount: false }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('securitySettings')}</CardTitle>
        <CardDescription>{t('manageYourAccountSecurity')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <form onSubmit={handlePasswordChange} className="space-y-2">
            <h3 className="text-lg font-medium">{t('changePassword')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('updateYourPasswordToKeepYourAccountSecure')}
            </p>
            <div className="grid gap-2 pt-2">
              <div className="space-y-2">
                <Label htmlFor="current-password">{t('currentPassword')}</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">{t('newPassword')}</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">
                  {t('confirmNewPassword')}
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
            <Button
              className="mt-4"
              disabled={isLoading.password}
              type="submit"
            >
              {isLoading.password ? (
                t('updating')
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  {t('updatePassword')}
                </>
              )}
            </Button>
          </form>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-destructive">
              {t('dangerZone')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('permanentlyDeleteYourAccountAndAllOfYourData')}
            </p>
            <Button
              variant="destructive"
              className="mt-2"
              onClick={handleDeleteAccount}
              disabled={isLoading.deleteAccount}
            >
              {isLoading.deleteAccount ? (
                t('deleting')
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t('deleteAccount')}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
