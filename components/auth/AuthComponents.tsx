import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReactNode } from 'react';

// SignedIn component - only renders children when user is authenticated
export function SignedIn({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}

// SignedOut component - only renders children when user is not authenticated
export function SignedOut({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) return null;

  return <>{children}</>;
}

// UserButton component - displays user avatar and dropdown menu
export function UserButton() {
  const { user, signOut } = useAuth();
  const t = useTranslations();

  if (!user) return null;

  const initials = getInitials(user);
  const userImage = user.user_metadata?.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userImage} alt={user.email || ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.user_metadata?.first_name} {user.user_metadata?.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">{t('common.dashboard')}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">{t('common.profile')}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          {t('common.signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// SignInButton component
export function SignInButton() {
  const t = useTranslations();

  return (
    <Button asChild variant="ghost">
      <Link href="/sign-in">{t('signIn')}</Link>
    </Button>
  );
}

// SignUpButton component
export function SignUpButton() {
  const t = useTranslations();

  return (
    <Button asChild>
      <Link href="/sign-up">{t('signUp')}</Link>
    </Button>
  );
}

// Helper function to get initials from user
function getInitials(user: any): string {
  const firstName = user.user_metadata?.first_name || '';
  const lastName = user.user_metadata?.last_name || '';

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  if (user.email) {
    return user.email.charAt(0).toUpperCase();
  }

  return 'U';
}
