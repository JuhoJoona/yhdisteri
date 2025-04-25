import { Calendar, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { Organization } from '@/lib/types/organization';
import { formatDateString } from '@/lib/utils';
import { CreditCard, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { OwnMembershipInfo, OrganizationMember } from '@/lib/types/member';

const OrganizationDetails = async ({
  organization,
  membershipInfo,
  members,
  locale,
}: {
  organization: Organization | undefined;
  membershipInfo: OwnMembershipInfo | undefined;
  members: OrganizationMember[] | undefined;
  locale: string;
}) => {
  if (!organization || !membershipInfo || !members) {
    return null;
  }

  const t = await getTranslations({ locale, namespace: 'Member' });
  return (
    <TabsContent value="overview">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('organizationDetails')}</CardTitle>
              <CardDescription>
                {t('basicInformationAboutTheOrganization')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {t('organizationName')}
                  </h3>
                  <p className="font-medium">
                    {organization.organization?.name}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {t('invitationCode')}
                  </h3>
                  <p className="font-medium">
                    {organization.organization?.code || 'N/A'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {t('createdOn')}
                  </h3>
                  <p className="font-medium">
                    {formatDateString(organization.organization?.createdAt)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {t('lastUpdated')}
                  </h3>
                  <p className="font-medium">
                    {formatDateString(organization.organization?.updatedAt)}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  {t('address')}
                </h3>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                  <div>
                    <p className="font-medium">
                      {organization.organizationAddress?.street}
                    </p>
                    <p className="text-muted-foreground">
                      {organization.organizationAddress?.city},{' '}
                      {organization.organizationAddress?.zipCode}
                    </p>
                    <p className="text-muted-foreground">
                      {organization.organizationAddress?.country}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('membershipSummary')}</CardTitle>
              <CardDescription>{t('yourMembershipDetails')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {t('yourRole')}
                </h3>
                <p className="font-medium">
                  {membershipInfo?.role || 'Member'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {t('joinDate')}
                </h3>
                <p className="font-medium">
                  {formatDateString(membershipInfo?.joinDate)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {t('status')}
                </h3>
                <Badge
                  variant="outline"
                  className={
                    membershipInfo?.status === 'active'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }
                >
                  {membershipInfo?.status || t('notAvailable')}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {t('paymentStatus')}
                </h3>
                <Badge
                  variant="outline"
                  className={
                    membershipInfo?.membershipType?.paymentStatus === 'paid'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }
                >
                  {membershipInfo?.membershipType?.paymentStatus ||
                    t('notAvailable')}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t('quickStats')}</CardTitle>
              <CardDescription>{t('organizationStatistics')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">
                    {t('totalMembers')}
                  </span>
                </div>
                <span className="font-medium">{members?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">
                    {t('activeSince')}
                  </span>
                </div>
                <span className="font-medium">
                  {formatDateString(organization.organization?.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
};

export default OrganizationDetails;
