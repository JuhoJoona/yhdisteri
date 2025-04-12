import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import { OwnMembershipInfo } from '@/lib/types/member';
import { OrganizationMembershipType } from '@/lib/types/plans';
import { CreditCard, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

const OrganizationBilling = ({
  membershipInfo,
  membershipTypes,
}: {
  membershipInfo: OwnMembershipInfo | undefined;
  membershipTypes: OrganizationMembershipType[] | undefined;
}) => {
  const t = useTranslations('Member');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {t('active')}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            {t('pending')}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            {t('inactive')}
          </Badge>
        );
    }
  };

  const hasPaidMembership = membershipInfo?.membershipType !== null;

  return (
    <TabsContent value="subscription">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Membership Details */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('yourMembership')}</CardTitle>
              <CardDescription>
                {hasPaidMembership
                  ? t('manageYourMembershipAndPayments')
                  : t('noActivePaidMembership')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {t('membershipType')}
                  </h3>
                  <p className="font-medium">
                    {hasPaidMembership
                      ? membershipInfo?.role
                      : t('noMembership')}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {t('status')}
                  </h3>
                  {getStatusBadge(
                    hasPaidMembership
                      ? membershipInfo?.status || 'inactive'
                      : 'inactive'
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {t('startDate')}
                  </h3>
                  <p className="font-medium">
                    {membershipInfo?.joinDate && hasPaidMembership
                      ? formatDate(new Date(membershipInfo.joinDate))
                      : '-'}
                  </p>
                </div>
              </div>

              <Separator />

              {hasPaidMembership ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button>
                    <CreditCard className="h-4 w-4 mr-2" />
                    {t('updatePaymentMethod')}
                  </Button>
                  <Button variant="outline">{t('viewPaymentHistory')}</Button>
                  <Button
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                  >
                    {t('cancelMembership')}
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t('selectMembershipBelow')}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Available Membership Types */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('availableMemberships')}</CardTitle>
              <CardDescription>
                {hasPaidMembership
                  ? t('chooseYourMembershipType')
                  : t('selectYourFirstMembership')}
              </CardDescription>
            </CardHeader>
            {membershipTypes ? (
              <CardContent className="space-y-4">
                {membershipTypes.map((type) => (
                  <Card key={type.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{type.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            {type.price}€/{type.interval}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link
                        href={`/member/organization/${type.organizationId}/billing/${type.id}`}
                      >
                        <Button className="w-full" variant="outline">
                          {hasPaidMembership
                            ? t('selectMembership')
                            : t('startMembership')}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </CardContent>
            ) : (
              <CardContent>
                <p>{t('noMembershipTypes')}</p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </TabsContent>
  );
};

export default OrganizationBilling;
