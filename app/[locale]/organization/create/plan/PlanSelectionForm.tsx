'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Check } from 'lucide-react';
import { Plan } from '@/lib/types/plans';
import { CreateOrganizationRequest } from '@/lib/types/organization';
export default function PlanSelectionForm({
  plans,
  submitOrganization,
}: {
  plans: Plan;
  submitOrganization: (
    organization: CreateOrganizationRequest,
    planId: string
  ) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedPlan) return;
    setIsLoading(true);
    const organizationDetails = JSON.parse(
      localStorage.getItem('organization') || '{}'
    );

    await submitOrganization(organizationDetails, selectedPlan);
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose a Plan</CardTitle>
        <CardDescription>
          Select the best plan for your organization
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <RadioGroup onValueChange={setSelectedPlan} className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`flex items-center space-x-2 rounded-lg border p-4 ${
                  plan.isPopular ? 'border-primary' : ''
                }`}
              >
                <RadioGroupItem value={plan.id || ''} id={plan.id || ''} />
                <Label
                  htmlFor={plan.id}
                  className="flex flex-1 cursor-pointer justify-between"
                >
                  <div>
                    <p className="font-medium">{plan.name}</p>
                    <ul className="mt-2 text-sm text-gray-500">
                      {plan.features?.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="mr-2 h-4 w-4" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${plan.price}/{plan.interval}
                    </p>
                    {plan.isPopular && (
                      <span className="text-xs text-primary">Popular</span>
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isLoading || !selectedPlan}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Complete Setup'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
