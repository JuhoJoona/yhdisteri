import {
  MoreHorizontal,
  Edit,
  Trash,
  Mail,
  CalendarDays,
  CheckIcon,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OrganizationMember } from '@/lib/types/member';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
interface MemberCardProps {
  member: OrganizationMember;
  organizationId: string;
  locale: string;
}

export async function MemberCard({
  member,
  organizationId,
  locale,
}: MemberCardProps) {
  const t = await getTranslations({ locale, namespace: 'Member' });
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: OrganizationMember['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-700 dark:text-green-500';
      case 'inactive':
        return 'bg-red-500/10 text-red-700 dark:text-red-500';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-500';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-500';
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <Badge className={getStatusColor(member.status)}>
            {member.status?.charAt(0).toUpperCase() || ''}
            {member.status?.slice(1) || ''}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">{t('openMenu')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/admin/dashboard/organization/members/${member.id}?organizationId=${organizationId}`}
                >
                  {t('viewProfile')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/admin/dashboard/organization/edit-member/${member.id}`}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {t('edit')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {member.status === 'pending' && (
                <>
                  <DropdownMenuItem asChild>
                    <form action={`/api/members/${member.id}/approve`}>
                      <input
                        type="hidden"
                        name="organizationId"
                        value={organizationId}
                      />
                      <button
                        type="submit"
                        className="flex items-center w-full"
                      >
                        <CheckIcon className="mr-2 h-4 w-4" />
                        {t('approveMember')}
                      </button>
                    </form>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild>
                <form
                  action={`/api/members/${member.id}/delete`}
                  className="w-full"
                >
                  <input
                    type="hidden"
                    name="organizationId"
                    value={organizationId}
                  />
                  <button
                    type="submit"
                    className="flex items-center text-destructive w-full"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    {t('delete')}
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage
              src={member.profileImageUrl}
              alt={`${member.firstName} ${member.lastName}`}
            />
            <AvatarFallback className="text-lg">
              {member.firstName?.charAt(0)}
              {member.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg leading-none">
            {member.firstName} {member.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {member.role || 'Member'}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground truncate">
              {member.email}
            </span>
          </div>

          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">
              {t('joined')} {formatDate(member.joinDate || '')}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-center border-t bg-muted/50">
        <Link
          href={`/admin/dashboard/organization/members/${member.id}?organizationId=${organizationId}`}
          className="w-full"
        >
          <Button variant="outline" size="sm" className="w-full">
            {t('viewProfile')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
