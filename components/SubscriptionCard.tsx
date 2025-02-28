
import { Subscription, Plan } from "@/types/payment";
import { Calendar, CheckCircle, AlertCircle, BadgeAlert, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SubscriptionCardProps {
  subscription: Subscription;
  plan: Plan;
  onCancel: (atPeriodEnd: boolean) => Promise<void>;
  onRenew?: () => Promise<void>;
  onUpgrade?: () => void;
}

export const SubscriptionCard = ({
  subscription,
  plan,
  onCancel,
  onRenew,
  onUpgrade
}: SubscriptionCardProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status: Subscription['status']) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-700 dark:text-green-500">Active</Badge>;
      case "canceled":
        return <Badge className="bg-red-500/10 text-red-700 dark:text-red-500">Canceled</Badge>;
      case "past_due":
        return <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-500">Past Due</Badge>;
      case "trialing":
        return <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-500">Trial</Badge>;
      case "incomplete":
        return <Badge className="bg-gray-500/10 text-gray-700 dark:text-gray-500">Incomplete</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const calculateProgress = () => {
    const start = new Date(subscription.currentPeriodStart).getTime();
    const end = new Date(subscription.currentPeriodEnd).getTime();
    const now = Date.now();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    return Math.round(((now - start) / (end - start)) * 100);
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{plan.name} Plan</CardTitle>
          {getStatusBadge(subscription.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {formatCurrency(plan.price)} per {plan.interval}
          </div>
          {subscription.cancelAtPeriodEnd && (
            <Badge variant="outline" className="bg-orange-500/10 text-orange-700 dark:text-orange-500">
              Cancels at end of period
            </Badge>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Current period</span>
            <span>{formatDate(subscription.currentPeriodEnd)}</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatDate(subscription.currentPeriodStart)}</span>
            <span>{formatDate(subscription.currentPeriodEnd)}</span>
          </div>
        </div>
        
        {(subscription.status === "active" || subscription.status === "trialing") && !subscription.cancelAtPeriodEnd && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1 text-green-500" />
            Renews automatically on {formatDate(subscription.currentPeriodEnd)}
          </div>
        )}
        
        {subscription.cancelAtPeriodEnd && (
          <div className="flex items-center text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 mr-1 text-orange-500" />
            Your subscription will end on {formatDate(subscription.currentPeriodEnd)}
          </div>
        )}
        
        {subscription.status === "past_due" && (
          <div className="flex items-center text-sm text-red-500">
            <BadgeAlert className="h-4 w-4 mr-1" />
            Payment past due. Please update your payment information.
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex flex-col sm:flex-row gap-2">
        {subscription.status === "active" && !subscription.cancelAtPeriodEnd && (
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={() => onCancel(true)}
          >
            Cancel at Period End
          </Button>
        )}
        
        {subscription.status === "active" && subscription.cancelAtPeriodEnd && (
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => onRenew && onRenew()}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Continue Subscription
          </Button>
        )}
        
        {subscription.status === "past_due" && (
          <Button className="w-full sm:w-auto">
            Update Payment
          </Button>
        )}
        
        {onUpgrade && (
          <Button 
            className="w-full sm:w-auto" 
            onClick={onUpgrade}
          >
            Upgrade Plan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
