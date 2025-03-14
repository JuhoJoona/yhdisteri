// Page for members to see the organization details and manage subscription
import { getOrganization } from '@/lib/services/organizationService';
import { getOrganizationMembers } from '@/lib/services/usersService';
import {
  Building,
  Users,
  Calendar,
  CreditCard,
  Mail,
  Phone,
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

// Define extended organization type with the properties we need
interface ExtendedOrganization {
  id?: string;
  name?: string;
  paymentsActive?: boolean;
  code?: string;
  createdAt?: string;
  updatedAt?: string;
  // Additional properties that might come from the API
  role?: string;
  status?: string;
  joinDate?: string;
}

export default async function OrganizationPage({
  params: { organizationId },
}: {
  params: { organizationId: string; locale: string };
}) {
  const organizationData = await getOrganization(organizationId);
  const members = await getOrganizationMembers(organizationId);

  // Cast to our extended type
  const organization = organizationData as ExtendedOrganization;

  if (!organization) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <Building className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Organization Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The organization you are looking for does not exist or you do not
            have access to it.
          </p>
          <Button asChild>
            <Link href="/member/dashboard">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
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

  // Mock data for subscription details
  const subscriptionDetails = {
    plan: 'Premium',
    status: 'Active',
    nextBillingDate: new Date(Date.now() + 86400000 * 30), // 30 days from now
    amount: '$29.99',
    paymentMethod: 'Visa ending in 4242',
  };

  // Mock data for organization address
  const organizationAddress = {
    street: '123 Main Street',
    city: 'Helsinki',
    zipCode: '00100',
    country: 'Finland',
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild className="mb-6">
          <Link href="/member/dashboard">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center">
            <div className="bg-primary/10 p-3 rounded-lg mr-4">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {organization.name}
              </h1>
              <div className="flex items-center mt-1 text-muted-foreground">
                <Code className="h-4 w-4 mr-1" />
                <span className="mr-4">Code: {organization.code || 'N/A'}</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span>Created: {formatDate(organization.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {organization.paymentsActive && (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                Active Subscription
              </Badge>
            )}
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Manage Subscription
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Details</CardTitle>
                  <CardDescription>
                    Basic information about the organization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Organization Name
                      </h3>
                      <p className="font-medium">{organization.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Invitation Code
                      </h3>
                      <p className="font-medium">
                        {organization.code || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Created On
                      </h3>
                      <p className="font-medium">
                        {formatDate(organization.createdAt)}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Last Updated
                      </h3>
                      <p className="font-medium">
                        {formatDate(organization.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Address
                    </h3>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                      <div>
                        <p className="font-medium">
                          {organizationAddress.street}
                        </p>
                        <p className="text-muted-foreground">
                          {organizationAddress.city},{' '}
                          {organizationAddress.zipCode}
                        </p>
                        <p className="text-muted-foreground">
                          {organizationAddress.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>organization@example.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                        <span>+358 50 123 4567</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Membership Summary</CardTitle>
                  <CardDescription>Your membership details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Your Role
                    </h3>
                    <p className="font-medium">
                      {organization.role || 'Member'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Join Date
                    </h3>
                    <p className="font-medium">
                      {formatDate(organization.joinDate)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Status
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {organization.status || 'Active'}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex flex-col items-stretch gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Membership Certificate
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Organization statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">
                        Total Members
                      </span>
                    </div>
                    <span className="font-medium">{members?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">
                        Active Since
                      </span>
                    </div>
                    <span className="font-medium">
                      {formatDate(organization.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">
                        Subscription
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        organization.paymentsActive
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }
                    >
                      {organization.paymentsActive ? 'Active' : 'Inactive'}
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
              <CardTitle>Organization Members</CardTitle>
              <CardDescription>
                People who are part of this organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!members || members.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Members Found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    There are no members in this organization yet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">
                          Member
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Role
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Join Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Status
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
                  <CardTitle>Subscription Details</CardTitle>
                  <CardDescription>
                    Information about your current subscription
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Current Plan
                      </h3>
                      <p className="font-medium">{subscriptionDetails.plan}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Status
                      </h3>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {subscriptionDetails.status}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Next Billing Date
                      </h3>
                      <p className="font-medium">
                        {formatDate(
                          subscriptionDetails.nextBillingDate.toISOString()
                        )}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Amount
                      </h3>
                      <p className="font-medium">
                        {subscriptionDetails.amount} / month
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Payment Method
                    </h3>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{subscriptionDetails.paymentMethod}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button>Update Payment Method</Button>
                    <Button variant="outline">Change Plan</Button>
                    <Button
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    Recent invoices and payments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md">
                    <div className="flex items-center justify-between p-3 border-b">
                      <div>
                        <p className="font-medium">Invoice #1234</p>
                        <p className="text-sm text-muted-foreground">
                          March 1, 2023
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Paid
                      </Badge>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <span>{subscriptionDetails.amount}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="flex items-center justify-between p-3 border-b">
                      <div>
                        <p className="font-medium">Invoice #1233</p>
                        <p className="text-sm text-muted-foreground">
                          February 1, 2023
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Paid
                      </Badge>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <span>{subscriptionDetails.amount}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="flex items-center justify-between p-3 border-b">
                      <div>
                        <p className="font-medium">Invoice #1232</p>
                        <p className="text-sm text-muted-foreground">
                          January 1, 2023
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Paid
                      </Badge>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <span>{subscriptionDetails.amount}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Invoices
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
