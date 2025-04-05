import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getUserBillingDetails } from '@/lib/services/usersService';

const BillingInformation = async () => {
  const t = await getTranslations({
    locale: 'en',
    namespace: 'billingInformation',
  });
  const userBillingInformation = await getUserBillingDetails();

  if (!userBillingInformation) {
    return <div>{t('error')}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Billing Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billing-name">Full Name</Label>
              <Input
                id="billing-name"
                defaultValue={`${userBillingInformation.billingFullname}`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-company">Company (Optional)</Label>
              <Input id="billing-company" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-street">Street Address</Label>
              <Input
                id="billing-street"
                defaultValue={userBillingInformation.billingStreet}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-city">City</Label>
              <Input
                id="billing-city"
                defaultValue={userBillingInformation.billingCity}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-zip">Zip Code</Label>
              <Input
                id="billing-zip"
                defaultValue={userBillingInformation.billingZip}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-company">{t('company')}</Label>
              <Input
                id="billing-company"
                defaultValue={userBillingInformation.billingCompany}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-company-id">{t('companyId')}</Label>
              <Input
                id="billing-company-id"
                defaultValue={userBillingInformation.billingCompanyId}
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
  );
};
export default BillingInformation;
