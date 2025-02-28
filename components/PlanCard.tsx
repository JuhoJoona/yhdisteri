
import { Plan } from "@/types/payment";
import { Check, AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PlanCardProps {
  plan: Plan;
  isCurrentPlan?: boolean;
  onSelect: (plan: Plan) => void;
}

export const PlanCard = ({ plan, isCurrentPlan = false, onSelect }: PlanCardProps) => {
  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Card className={`relative border-2 ${isCurrentPlan ? 'border-primary' : ''} ${plan.isPopular ? 'border-blue-500 dark:border-blue-400' : ''}`}>
      {plan.isPopular && (
        <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-blue-500 text-white">
          Most Popular
        </Badge>
      )}
      
      {isCurrentPlan && (
        <Badge className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 bg-green-500 text-white">
          Current Plan
        </Badge>
      )}
      
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <div className="text-3xl font-bold mt-2">
          {formatCurrency(plan.price)}
          <span className="text-sm font-normal text-muted-foreground">
            /{plan.interval}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {plan.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-6">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onSelect(plan)}
          variant={isCurrentPlan ? "outline" : "default"}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? "Current Plan" : "Select Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
};
