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
import { User } from '@supabase/supabase-js';

export default function SecuritySettings({ user }: { user: User }) {
  console.log('user', user);
  const supabaseClient = createClient();
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

  const handleTwoFactorAuth = async () => {
    setIsLoading((prev) => ({ ...prev, twoFactor: true }));

    try {
      // Redirect to Supabase's 2FA setup
      // This is a simplified approach - in a real implementation you would:
      // 1. Request the 2FA setup from Supabase
      // 2. Get the QR code or secret to display to the user
      // 3. Handle verification of the setup

      console.log(
        'Two-factor authentication setup is not fully implemented yet'
      );

      // When implemented, might look like:
      // const { data, error } = await supabaseClient.auth.mfa.enroll();
      // if (error) throw error;
      // Handle the MFA setup flow...
    } catch (error: Error | unknown) {
      console.error('Error setting up 2FA:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to setup two-factor authentication';
      console.log(errorMessage);
    } finally {
      setIsLoading((prev) => ({ ...prev, twoFactor: false }));
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
      // In a real application, you would likely have an API endpoint to handle account deletion
      // This would ensure that all user data is properly cleaned up

      // For a simpler implementation, we can use the admin API if available:
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;

      // Note: For actual account deletion, you would need a server-side function
      // with admin privileges to call supabase.auth.admin.deleteUser(user.id)

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
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your account security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <form onSubmit={handlePasswordChange} className="space-y-2">
            <h3 className="text-lg font-medium">Change Password</h3>
            <p className="text-sm text-muted-foreground">
              Update your password to keep your account secure
            </p>
            <div className="grid gap-2 pt-2">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
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
                <Label htmlFor="new-password">New Password</Label>
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
                <Label htmlFor="confirm-password">Confirm New Password</Label>
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
                'Updating...'
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Update Password
                </>
              )}
            </Button>
          </form>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={handleTwoFactorAuth}
              disabled={isLoading.twoFactor}
            >
              {isLoading.twoFactor ? (
                'Setting up...'
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Enable Two-Factor Authentication
                </>
              )}
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-destructive">
              Danger Zone
            </h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all of your data
            </p>
            <Button
              variant="destructive"
              className="mt-2"
              onClick={handleDeleteAccount}
              disabled={isLoading.deleteAccount}
            >
              {isLoading.deleteAccount ? (
                'Deleting...'
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
