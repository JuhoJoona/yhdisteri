import { Calendar, Download, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { Organization } from '@/lib/types/organization';
import { formatDateString } from '@/lib/utils';
import { CreditCard, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { OwnMembershipInfo, OrganizationMember } from '@/lib/types/member';

const OrganizationDetails = ({
  organization,
  membershipInfo,
  members,
}: {
  organization: Organization | undefined;
  membershipInfo: OwnMembershipInfo | undefined;
  members: OrganizationMember[] | undefined;
}) => {
  if (!organization || !membershipInfo || !members) {
    return null;
  }

  const t = useTranslations('Member');
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
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  {membershipInfo?.status || 'Active'}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex flex-col items-stretch gap-2">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                {t('downloadMembershipCertificate')}
              </Button>
            </CardFooter>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">
                    {t('subscription')}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={
                    organization.organization?.paymentsActive
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }
                >
                  {organization.organization?.paymentsActive
                    ? t('active')
                    : t('inactive')}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
};

export default OrganizationDetails;
