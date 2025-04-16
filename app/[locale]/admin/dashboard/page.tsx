import { getUserOrganizations } from '@/lib/services/usersService';
import {
  Building,
  Settings,
  Users,
  ChevronRight,
  Calendar,
  Bell,
  User,
  Plus,
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
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getTranslations } from 'next-intl/server';

export default async function Dashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const organizations = await getUserOrganizations();
  const t = await getTranslations({ locale, namespace: 'AdminDashboard' });

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t('yourOrganizations')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('manageYourOrganizationsAndAdministrativeSettings')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/*           <Button variant="outline" size="sm" asChild>
            <Link href="/admin/profile">
              <User className="h-4 w-4 mr-2" />
              {t('profile')}
            </Link>
          </Button> */}
          <Button size="sm" asChild>
            <Link href="/admin/dashboard/organization/create">
              <Plus className="h-4 w-4 mr-2" />
              {t('createOrganization')}
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="organizations" className="w-full">
        <TabsContent value="organizations">
          {!organizations || organizations.length === 0 ? (
            <Card className="border-dashed border-2 p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <Building className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {t('noOrganizationsYet')}
                </h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  {t('youHaveNotCreatedAnyOrganizationsYet')}
                </p>
                <Button asChild>
                  <Link href="/admin/dashboard/organization/create">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('createYourFirstOrganization')}
                  </Link>
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizations.map((org) => (
                <Card
                  key={org.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-md mr-3">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {org.name || 'Unnamed Organization'}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Code className="h-3.5 w-3.5 mr-1" />
                            {org.code || 'No Code'}
                          </CardDescription>
                        </div>
                      </div>
                      {org.paymentsActive ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {t('canReceivePayments')}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200"
                        >
                          {t('cannotReceivePayments')}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>
                        {t('created')}: {formatDate(org.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>
                        {t('role')}: {org.role || 'Admin'}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-2 h-auto"
                      asChild
                    >
                      <Link
                        href={`/admin/dashboard/organization?organizationId=${org.id}`}
                      >
                        <span className="flex items-center text-primary">
                          {t('goToDashboard')}
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
