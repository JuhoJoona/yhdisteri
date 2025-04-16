import { getTranslations } from 'next-intl/server';
import { getPlans } from '@/lib/services/plansService';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

export default async function PlansPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const plans = await getPlans();

  if (!plans) {
    return <div>No plans found</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">{t('plans.title')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('plans.description')}
          </p>
        </div>

        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`flex flex-col ${
                  plan.isPopular ? 'border-primary' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    {t('plans.mostPopular')}
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">
                      /{plan.interval}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {plan.features?.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground">
            <p>{t('plans.trialInfo')}</p>
            <p className="mt-2">{t('plans.needHelp')}</p>
          </div>
        </>
      </main>
    </div>
  );
}
