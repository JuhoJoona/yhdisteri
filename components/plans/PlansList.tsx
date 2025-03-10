'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AuthProvider } from '@/components/auth/AuthProvider';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  features: string[];
  isPopular?: boolean;
}

interface PlansListProps {
  isAuthenticated: boolean;
  userId?: string;
  locale: string;
}

export function PlansList({ isAuthenticated, userId, locale }: PlansListProps) {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: 'plan_free',
      name: 'Free',
      description: 'For organizations with up to 5 members',
      price: 0,
      interval: 'month',
      features: [
        'Up to 5 members',
        'Basic organization tools',
        'Limited access to features',
        'Community support',
      ],
    },
    {
      id: 'plan_basic',
      name: 'Basic',
      description: 'For growing organizations with billing expenses',
      price: 4.99,
      interval: 'month',
      features: [
        '100 members',
        'Email support',
        'Analytics',
        'Advanced organization tools',
        'API access',
      ],
      isPopular: true,
    },
    {
      id: 'plan_premium',
      name: 'Premium',
      description: 'Complete solution for established organizations',
      price: 19.99,
      interval: 'month',
      features: [
        'All Basic features',
        'Premium support',
        'Advanced analytics',
        'Unlimited members',
        'Priority feature access',
        'Dedicated account manager',
      ],
    },
  ];

  const handleSelectPlan = (plan: Plan) => {
    if (!isAuthenticated) {
      // Redirect to sign in if not authenticated
      router.push(`/${locale}/sign-in?redirect=/plans`);
      return;
    }

    setSelectedPlanId(plan.id);

    toast({
      title: `${plan.name} Plan Selected`,
      description:
        plan.price === 0
          ? 'Your organization is now on the Free plan.'
          : `Your organization is now on the ${plan.name} plan. Billing will begin after your free trial.`,
    });

    // In a real app, you would save the selected plan to the backend
    setTimeout(() => {
      router.push(`/${locale}/dashboard`);
    }, 1500);
  };

  return (
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
                <span className="text-muted-foreground">/{plan.interval}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.isPopular ? 'default' : 'outline'}
                onClick={() => handleSelectPlan(plan)}
                disabled={selectedPlanId === plan.id}
              >
                {selectedPlanId === plan.id
                  ? t('plans.selected')
                  : t('plans.selectPlan')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        <p>{t('plans.trialInfo')}</p>
        <p className="mt-2">{t('plans.needHelp')}</p>
      </div>
    </>
  );
}
