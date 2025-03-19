import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@radix-ui/react-switch';
import { Save } from 'lucide-react';
import { getUserPreferences } from '@/lib/services/usersService';

const CommunicationPreferences = async () => {
  const userPreferences = await getUserPreferences();
  if (!userPreferences) {
    return <div>User preferences not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication Preferences</CardTitle>
        <CardDescription>Manage how we contact you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about your account activity and important updates
              </p>
            </div>
            <Switch
              id="email-notifications"
              defaultChecked={userPreferences.email}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive text messages for important updates and reminders
              </p>
            </div>
            <Switch
              id="sms-notifications"
              defaultChecked={userPreferences.sms}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications in the mobile app
              </p>
            </div>
            <Switch
              id="push-notifications"
              defaultChecked={userPreferences.push}
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
              defaultChecked={userPreferences.marketing}
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
  );
};

export default CommunicationPreferences;
