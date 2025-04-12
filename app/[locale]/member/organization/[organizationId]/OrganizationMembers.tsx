import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Card } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { OrganizationMember } from '@/lib/types/member';
import { formatDateString } from '@/lib/utils';
import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

const OrganizationMembers = ({
  members,
}: {
  members: OrganizationMember[] | undefined;
}) => {
  const t = useTranslations('Member');
  return (
    <TabsContent value="members">
      <Card>
        <CardHeader>
          <CardTitle>{t('organizationMembers')}</CardTitle>
          <CardDescription>
            {t('peopleWhoArePartOfThisOrganization')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!members || members.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {t('noMembersFound')}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {t('thereAreNoMembersInThisOrganizationYet')}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">
                      {t('member')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      {t('role')}
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      {t('joinDate')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage
                              src={member.profileImageUrl}
                              alt={`${member.firstName} ${member.lastName}`}
                            />
                            <AvatarFallback>
                              {member.firstName?.[0]}
                              {member.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {member.firstName} {member.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            member.role === 'admin' ? 'default' : 'outline'
                          }
                          className={
                            member.role === 'admin'
                              ? ''
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }
                        >
                          {member.role || 'Member'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {formatDateString(member.joinDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default OrganizationMembers;
