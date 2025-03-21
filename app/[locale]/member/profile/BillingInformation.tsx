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
import { CreditCard, Save } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { getUserBillingDetails } from '@/lib/services/usersService';

const BillingInformation = async () => {
  const t = await getTranslations({ namespace: 'billingInformation' });
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
        {userBillingInformation.paymentMethods && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t('paymentMethods')}</h3>
            {userBillingInformation.paymentMethods.map((method) => (
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
        )}

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
