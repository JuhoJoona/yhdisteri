'use client';
import {
  MoreHorizontal,
  Edit,
  Trash,
  Mail,
  Phone,
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
import { Member } from '@/types/member';
import { useApiClient } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';

interface MemberCardProps {
  member: Member;
  organizationId: string;
}

export function MemberCard({ member, organizationId }: MemberCardProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const apiClient = useApiClient();
  const router = useRouter();

  const getStatusColor = (status: Member['status']) => {
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

  const onApprove = async () => {
    try {
      const resp = await apiClient.POST(
        '/organizations/{organizationId}/members/{memberId}/approve',
        {
          params: {
            path: {
              organizationId,
              memberId: member.id,
            },
          },
        }
      );

      if (resp.response?.ok) {
        console.log('Member approved successfully');
        // Refresh the page to show updated status
        router.refresh();
      } else {
        console.error('Failed to approve member:', resp);
      }
    } catch (error) {
      console.error('Error approving member:', error);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <Badge className={getStatusColor(member.status)}>
            {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button
                  onClick={() =>
                    router.push(
                      `/admin/dashboard/organization/members/${member.id}?organizationId=${organizationId}`
                    )
                  }
                >
                  View Profile
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  onClick={() =>
                    router.push(
                      `/admin/dashboard/organization/members/${member.id}?edit=true&organizationId=${organizationId}`
                    )
                  }
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {member.status === 'pending' && (
                <>
                  <DropdownMenuItem asChild>
                    <button
                      type="submit"
                      className="flex items-center w-full"
                      onClick={onApprove}
                    >
                      <CheckIcon className="mr-2 h-4 w-4" />
                      Approve Member
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild>
                <button
                  type="submit"
                  className="flex items-center text-destructive w-full"
                  onClick={() =>
                    router.push(
                      `/admin/dashboard/organization/members/${member.id}`
                    )
                  }
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage
              src={member.profileImage}
              alt={`${member.firstName} ${member.lastName}`}
            />
            <AvatarFallback className="text-lg">
              {member.firstName.charAt(0)}
              {member.lastName.charAt(0)}
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
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">{member.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">
              Joined {formatDate(member.joinDate)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-center border-t bg-muted/50"></CardFooter>
    </Card>
  );
}
