import { getOrganization } from '@/lib/services/organizationService';
import { getOrganizationMembers } from '@/lib/services/usersService';
import {
  Building,
  Users,
  Calendar,
  CreditCard,
  MapPin,
  Shield,
  ChevronLeft,
  Download,
  Share2,
  Code,
} from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { getTranslations } from 'next-intl/server';
import { getOwnMembershipInfo } from '@/lib/services/usersService';
import { Organization } from '@/lib/types/organization';

export default async function OrganizationPage({
  params: { organizationId, locale },
}: {
  params: { organizationId: string; locale: string };
}) {
  const organizationData = await getOrganization(organizationId);
  const members = await getOrganizationMembers(organizationId);
  const membershipInfo = await getOwnMembershipInfo(organizationId);

  const t = await getTranslations({ locale, namespace: 'Member' });

  const organization = organizationData as Organization;

  if (!organization) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <Building className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">
            {t('organizationNotFound')}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t('organizationNotFoundDescription')}
          </p>
          <Button asChild>
            <Link href="/member/dashboard">
              <ChevronLeft className="h-4 w-4 mr-2" />
              {t('backToDashboard')}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild className="mb-6">
          <Link href="/member/dashboard">
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t('backToDashboard')}
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center">
            <div className="bg-primary/10 p-3 rounded-lg mr-4">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {organization.organization?.name}
              </h1>
              <div className="flex items-center mt-1 text-muted-foreground">
                <Code className="h-4 w-4 mr-1" />
                <span className="mr-4">
                  {t('code')}: {organization.organization?.code || 'N/A'}
                </span>
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {t('created')}{' '}
                  {formatDate(organization.organization?.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {organization.organization?.paymentsActive && (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {t('activeSubscription')}
              </Badge>
            )}
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              {t('share')}
            </Button>
            <Button size="sm">
              <Shield className="h-4 w-4 mr-2" />
              {t('manageSubscription')}
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
          <TabsTrigger value="members">{t('members')}</TabsTrigger>
          <TabsTrigger value="subscription">{t('subscription')}</TabsTrigger>
        </TabsList>

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
                        {formatDate(organization.organization?.createdAt)}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        {t('lastUpdated')}
                      </h3>
                      <p className="font-medium">
                        {formatDate(organization.organization?.updatedAt)}
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
                  <CardDescription>
                    {t('yourMembershipDetails')}
                  </CardDescription>
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
                      {formatDate(membershipInfo?.joinDate)}
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
                  <CardDescription>
                    {t('organizationStatistics')}
                  </CardDescription>
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
                      {formatDate(organization.organization?.createdAt)}
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
                        <th className="text-left py-3 px-4 font-medium">
                          {t('status')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => (
                        <tr
                          key={member.id}
                          className="border-b hover:bg-muted/50"
                        >
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
                            {formatDate(member.joinDate)}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={
                                member.status === 'active'
                                  ? 'bg-green-50 text-green-700 border-green-200'
                                  : member.status === 'pending'
                                  ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                  : 'bg-red-50 text-red-700 border-red-200'
                              }
                            >
                              {member.status || 'Unknown'}
                            </Badge>
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

        <TabsContent value="subscription">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('subscriptionDetails')}</CardTitle>
                  <CardDescription>
                    {t('informationAboutYourCurrentSubscription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        {t('currentPlan')}
                      </h3>
                      <p className="font-medium">{membershipInfo?.role}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        {t('status')}
                      </h3>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {membershipInfo?.status}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button>{t('updatePaymentMethod')}</Button>
                    <Button variant="outline">{t('changePlan')}</Button>
                    <Button
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                    >
                      {t('cancelSubscription')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
