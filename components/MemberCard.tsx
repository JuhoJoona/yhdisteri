import { useState } from 'react';
import {
  MoreHorizontal,
  Edit,
  Trash,
  Mail,
  CalendarDays,
  CheckIcon,
  UserX,
  UserCheck,
  Shield,
  Eye,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { OrganizationMember } from '@/lib/types/member';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { approveMember, suspendMember } from '@/lib/services/userClientService';

interface MemberCardProps {
  member: OrganizationMember;
  organizationId: string;
  locale: string;
}

export function MemberCard({
  member,
  organizationId,
  locale,
}: MemberCardProps) {
  const t = useTranslations('Member');
  const [isHovered, setIsHovered] = useState(false);

  const [memberStatus, setMemberStatus] = useState(member.status);

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(locale, options);
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'active':
        return <UserCheck className="h-3 w-3 mr-1" />;
      case 'inactive':
        return <UserX className="h-3 w-3 mr-1" />;
      case 'pending':
        return <Shield className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  const handleApprove = async () => {
    setMemberStatus('active');
    await approveMember(organizationId, member.id!);
  };

  const handleDeactivate = async () => {
    setMemberStatus('inactive');
    await suspendMember(organizationId, member.id!);
  };

  return (
    <Card
      className={`overflow-hidden transition-all ${
        isHovered ? 'shadow-md border-primary/40 scale-[1.01]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <Badge
            className={`flex items-center ${getStatusColor(memberStatus)}`}
          >
            {getStatusIcon(memberStatus)}
            {memberStatus?.charAt(0).toUpperCase() || ''}
            {memberStatus?.slice(1) || ''}
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

              {memberStatus === 'pending' && (
                <DropdownMenuItem
                  onClick={handleApprove}
                  className="flex items-center"
                >
                  <CheckIcon className="mr-2 h-4 w-4" />
                  {t('approveMember')}
                </DropdownMenuItem>
              )}

              {memberStatus === 'active' && (
                <DropdownMenuItem
                  onClick={handleDeactivate}
                  className="flex items-center"
                >
                  <UserX className="mr-2 h-4 w-4" />
                  {t('deactivate')}
                </DropdownMenuItem>
              )}

              {memberStatus !== 'pending' && <DropdownMenuSeparator />}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive flex items-center"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    {t('delete')}
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('confirmDeletion')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('areYouSureYouWantToDeleteThisMember')}{' '}
                      {member.firstName} {member.lastName}?{' '}
                      {t('thisActionCannotBeUndone')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground">
                      {t('delete')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <Link
        href={`/admin/dashboard/organization/members/${member.id}?organizationId=${organizationId}`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-4">
            <Avatar className="h-20 w-20 mb-4 border-2 border-primary/10">
              <AvatarImage
                src={member.profileImageUrl}
                alt={`${member.firstName} ${member.lastName}`}
              />
              <AvatarFallback className="text-lg bg-primary/5 text-primary">
                {member.firstName?.charAt(0)}
                {member.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg leading-none">
              {member.firstName} {member.lastName}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {member.role || t('member')}
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
      </Link>
    </Card>
  );
}
