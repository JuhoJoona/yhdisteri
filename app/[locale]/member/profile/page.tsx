import {
  Phone,
  Calendar,
  MapPin,
  Shield,
  Camera,
  ChevronLeft,
  Save,
  Lock,
  CreditCard,
  LogOut,
  Trash2,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // Get the active tab from URL query parameters or default to "personal"
  const activeTab = searchParams?.tab || 'personal';

  // Mock user data - in a real app, you would fetch this from your API
  const userData = {
    id: authUser?.id || 'user-123',
    firstName: authUser?.user_metadata?.first_name || 'John',
    lastName: authUser?.user_metadata?.last_name || 'Doe',
    email: authUser?.email || 'john.doe@example.com',
    phone: authUser?.phone || '+358 50 123 4567',
    joinDate: '2023-01-15T12:00:00Z',
    status: 'active',
    profileImageUrl:
      authUser?.user_metadata?.avatar_url ||
      'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'member',
    lastActive: new Date().toISOString(),
    address: {
      street: '123 Main Street',
      city: 'Helsinki',
      zipCode: '00100',
      country: 'Finland',
    },
    communicationPreferences: {
      email: true,
      sms: false,
      push: true,
      newsletter: true,
    },
    billingDetails: {
      paymentMethods: [
        {
          id: 'pm-1',
          type: 'card',
          last4: '4242',
          brand: 'Visa',
          expiryMonth: 12,
          expiryYear: 2025,
          isDefault: true,
        },
      ],
    },
  };

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
          Back to Dashboard
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Sidebar */}
        <div className="w-full md:w-80">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={userData.profileImageUrl}
                      alt={`${userData.firstName} ${userData.lastName}`}
                    />
                    <AvatarFallback className="text-xl">
                      {userData.firstName[0]}
                      {userData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change profile picture</span>
                  </Button>
                </div>
                <h2 className="text-xl font-bold">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {userData.email}
                </p>
                <Badge
                  variant="outline"
                  className="mt-2 bg-green-50 text-green-700 border-green-200"
                >
                  {userData.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">
                    Joined {formatDate(userData.joinDate)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">{userData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">
                    {userData.address.city}, {userData.address.country}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 flex flex-col gap-2">
              <Button variant="outline" className="w-full" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </div>

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
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={userData.firstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={userData.lastName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={userData.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue={userData.phone} />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street</Label>
                        <Input
                          id="street"
                          defaultValue={userData.address.street}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue={userData.address.city} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          defaultValue={userData.address.zipCode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          defaultValue={userData.address.country}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself"
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Communication Tab */}
            <TabsContent value="communication">
              <Card>
                <CardHeader>
                  <CardTitle>Communication Preferences</CardTitle>
                  <CardDescription>Manage how we contact you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about your account activity and
                          important updates
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        defaultChecked={userData.communicationPreferences.email}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">
                          SMS Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive text messages for important updates and
                          reminders
                        </p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        defaultChecked={userData.communicationPreferences.sms}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications in the mobile app
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        defaultChecked={userData.communicationPreferences.push}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newsletter">Newsletter</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive our newsletter with updates and promotions
                        </p>
                      </div>
                      <Switch
                        id="newsletter"
                        defaultChecked={
                          userData.communicationPreferences.newsletter
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Update your password to keep your account secure
                      </p>
                      <div className="grid gap-2 pt-2">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">
                            Current Password
                          </Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirm New Password
                          </Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      <Button className="mt-4">
                        <Lock className="h-4 w-4 mr-2" />
                        Update Password
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                      <Button variant="outline" className="mt-2">
                        <Shield className="h-4 w-4 mr-2" />
                        Enable Two-Factor Authentication
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-destructive">
                        Danger Zone
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all of your data
                      </p>
                      <Button variant="destructive" className="mt-2">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                    {userData.billingDetails.paymentMethods.map((method) => (
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
                    ))}
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
                          defaultValue={`${userData.firstName} ${userData.lastName}`}
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
                          defaultValue={userData.address.street}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-city">City</Label>
                        <Input
                          id="billing-city"
                          defaultValue={userData.address.city}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-zip">Zip Code</Label>
                        <Input
                          id="billing-zip"
                          defaultValue={userData.address.zipCode}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-country">Country</Label>
                        <Input
                          id="billing-country"
                          defaultValue={userData.address.country}
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
