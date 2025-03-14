// Page for members to see their dashboard, organizations and manage their profile
import { getUserOrganizations } from '@/lib/services/usersService';
import {
  Building,
  Settings,
  Users,
  ChevronRight,
  Calendar,
  Bell,
  User,
  CreditCard,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function MemberDashboard({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const organizations = await getUserOrganizations();
  // Uncomment when translations are needed
  // const t = await getTranslations({ locale, namespace: 'dashboard' });

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'join',
      organization: 'Sports Club',
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      icon: <Users className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 2,
      type: 'payment',
      organization: 'Neighborhood Association',
      date: new Date(Date.now() - 86400000 * 5), // 5 days ago
      icon: <CreditCard className="h-4 w-4 text-green-500" />,
    },
    {
      id: 3,
      type: 'notification',
      organization: 'Book Club',
      date: new Date(Date.now() - 86400000 * 7), // 7 days ago
      icon: <Bell className="h-4 w-4 text-amber-500" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Member Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your organizations and profile
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/member/profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/join">Join Organization</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="organizations" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="organizations">My Organizations</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="organizations">
          {!organizations || organizations.length === 0 ? (
            <Card className="border-dashed border-2 p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <Building className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No Organizations Yet
                </h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  You haven&apos;t joined any organizations yet. Join an
                  existing organization or create a new one.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild>
                    <Link href="/join">Join Organization</Link>
                  </Button>
                </div>
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
                            {org.code || 'No code'}
                          </CardDescription>
                        </div>
                      </div>
                      {org.paymentsActive && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>Joined: {formatDate(org.joinDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>Role: {org.role || 'Member'}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-2 h-auto"
                      asChild
                    >
                      <Link href={`/member/organization/${org.id}`}>
                        <span className="flex items-center text-primary">
                          View Details
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

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest interactions across organizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="mr-4 mt-0.5">
                      <div className="bg-muted rounded-full p-2">
                        {activity.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <p className="font-medium">
                          {activity.type === 'join' && 'Joined organization'}
                          {activity.type === 'payment' && 'Payment processed'}
                          {activity.type === 'notification' &&
                            'New notification'}
                        </p>
                        <span className="text-sm text-muted-foreground">
                          {activity.date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.organization}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <User className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Update your personal information
              </p>
              <Button variant="outline" size="sm" asChild className="mt-auto">
                <Link href="/member/profile?tab=personal">View Profile</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <CreditCard className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium">Payments</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Manage your payment methods
              </p>
              <Button variant="outline" size="sm" asChild className="mt-auto">
                <Link href="/member/profile?tab=billing">View Payments</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Bell className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Configure notification settings
              </p>
              <Button variant="outline" size="sm" asChild className="mt-auto">
                <Link href="/member/profile?tab=communication">
                  View Notifications
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Settings className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium">Settings</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Adjust your account settings
              </p>
              <Button variant="outline" size="sm" asChild className="mt-auto">
                <Link href="/member/profile?tab=security">View Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
