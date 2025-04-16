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
import { Switch } from '@/components/ui/switch';
import { Save } from 'lucide-react';
import { getUserPreferences } from '@/lib/services/usersService';
import { getTranslations } from 'next-intl/server';

const CommunicationPreferences = async ({ locale }: { locale: string }) => {
  const userPreferences = await getUserPreferences();
  const t = await getTranslations({
    locale,
    namespace: 'CommunicationPreferences',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('communicationPreferences')}</CardTitle>
        <CardDescription>{t('manageHowWeContactYou')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">
                {t('emailNotifications')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('receiveEmailsAboutYourAccountActivityAndImportantUpdates')}
              </p>
            </div>
            <Switch
              id="email-notifications"
              defaultChecked={userPreferences?.email ?? false}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-end">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          {t('save')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunicationPreferences;
