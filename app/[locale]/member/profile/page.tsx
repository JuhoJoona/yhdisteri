import { ChevronLeft, Save, CreditCard } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import ProfileSideBar from './Sidebar';
import { Suspense } from 'react';
import { getOwnData } from '@/lib/services/usersService';
import PersonalInformation from './PersonalInformation';
import CommunicationPreferences from './CommunicationPreferences';
import SecuritySettings from './SecuritySettings';
import { getTranslations } from 'next-intl/server';

export default async function ProfilePage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { tab?: string };
}) {
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const t = await getTranslations(locale);

  const userData = await getOwnData();

  const activeTab = searchParams?.tab || 'personal';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Button variant="outline" size="sm" asChild className="mb-6">
        <Link href="/member/dashboard">
          <ChevronLeft className="h-4 w-4 mr-2" />
          {t('nav.dashboard')}
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Sidebar */}
        <ProfileSideBar user={userData} />

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue={activeTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="personal" asChild>
                <Link href="/member/profile?tab=personal">
                  Personal Information
                </Link>
              </TabsTrigger>
              <TabsTrigger value="communication" asChild>
                <Link href="/member/profile?tab=communication">
                  Communication
                </Link>
              </TabsTrigger>
              <TabsTrigger value="security" asChild>
                <Link href="/member/profile?tab=security">Security</Link>
              </TabsTrigger>
              <TabsTrigger value="billing" asChild>
                <Link href="/member/profile?tab=billing">Billing</Link>
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <PersonalInformation userData={userData} />
            </TabsContent>

            {/* Communication Tab */}
            <TabsContent value="communication">
              <CommunicationPreferences />
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <SecuritySettings user={userData} />
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    {mockUserData.billingDetails.paymentMethods.map(
                      (method) => (
                        <div
                          key={method.id}
                          className="flex items-center justify-between border rounded-lg p-4"
                        >
                          <div className="flex items-center">
                            <div className="bg-muted rounded-md p-2 mr-4">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {method.brand} •••• {method.last4}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Expires {method.expiryMonth}/{method.expiryYear}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {method.isDefault && (
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200"
                              >
                                Default
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      )
                    )}
                    <Button variant="outline" className="mt-2">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billing-name">Full Name</Label>
                        <Input
                          id="billing-name"
                          defaultValue={`${mockUserData.firstName} ${userData.lastName}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-company">
                          Company (Optional)
                        </Label>
                        <Input id="billing-company" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-street">Street Address</Label>
                        <Input
                          id="billing-street"
                          defaultValue={mockUserData.address.street}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-city">City</Label>
                        <Input
                          id="billing-city"
                          defaultValue={mockUserData.address.city}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-zip">Zip Code</Label>
                        <Input
                          id="billing-zip"
                          defaultValue={mockUserData.address.zipCode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-country">Country</Label>
                        <Input
                          id="billing-country"
                          defaultValue={mockUserData.address.country}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Billing Information
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
