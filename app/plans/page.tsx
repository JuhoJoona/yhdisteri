"use client";
import { useState } from "react";

import { PlanCard } from "@/components/PlanCard";
import { Plan } from "@/types/payment";
import { useToast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Plans() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: "plan_free",
      name: "Free",
      description: "For organizations with up to 5 members",
      price: 0,
      interval: "month",
      features: [
        "Up to 5 members",
        "Basic organization tools",
        "Limited access to features",
        "Community support"
      ]
    },
    {
      id: "plan_basic",
      name: "Basic",
      description: "For growing organizations with billing expenses",
      price: 4.99,
      interval: "month",
      features: [
        "100 members",
        "Email support",
        "Analytics",
        "Advanced organization tools",
        "API access"
      ],
      isPopular: true
    },
    {
      id: "plan_premium",
      name: "Premium",
      description: "Complete solution for established organizations",
      price: 19.99,
      interval: "month",
      features: [
        "All Basic features",
        "Premium support",
        "Advanced analytics",
        "Unlimited members",
        "Priority feature access",
        "Dedicated account manager"
      ]
    }
  ];

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlanId(plan.id);
    
    toast({
      title: `${plan.name} Plan Selected`,
      description: plan.price === 0 
        ? "Your organization is now on the Free plan."
        : `Your organization is now on the ${plan.name} plan. Billing will begin after your free trial.`,
    });

    // In a real app, you would save the selected plan to the backend
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };


  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-block p-3 rounded-full bg-primary/10">
              <Star className="h-6 w-6 text-primary" />
            </span>
          </div>
          <h1 className="text-3xl font-bold">Choose a Plan for organizationName</h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Select the best plan for your organization&apos;s needs. You can change or upgrade your plan anytime in the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={selectedPlanId === plan.id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          <p>All plans include a 14-day trial period. No credit card required for the Free plan.</p>
          <p className="mt-2">Need help choosing the right plan? Contact our support team.</p>
        </div>
      </div>
    </div>
  );
}
