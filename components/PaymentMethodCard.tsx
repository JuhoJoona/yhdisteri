
import { PaymentMethod } from "@/types/payment";
import {
  CreditCard,
  Trash2,
  CheckCircle,
  AlertCircle,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onSetDefault: (id: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const PaymentMethodCard = ({
  paymentMethod,
  onSetDefault,
  onRemove,
  isLoading = false
}: PaymentMethodCardProps) => {
  const handleSetDefault = async () => {
    try {
      await onSetDefault(paymentMethod.id);
      toast({
        title: "Default payment method updated",
        description: "Your default payment method has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update default payment method.",
        variant: "destructive",
      });
    }
  };

  const handleRemove = async () => {
    try {
      await onRemove(paymentMethod.id);
      toast({
        title: "Payment method removed",
        description: "Your payment method has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove payment method.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={`relative ${isLoading ? 'opacity-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            {paymentMethod.type === "card" ? (
              <div className="rounded-md bg-slate-100 dark:bg-slate-800 p-2 mr-3">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
            ) : (
              <div className="rounded-md bg-slate-100 dark:bg-slate-800 p-2 mr-3">
                <Building className="h-5 w-5 text-primary" />
              </div>
            )}
            
            <div>
              {paymentMethod.type === "card" && paymentMethod.cardDetails ? (
                <div>
                  <div className="flex items-center">
                    <span className="font-medium capitalize">
                      {paymentMethod.cardDetails.brand} •••• {paymentMethod.cardDetails.last4}
                    </span>
                    {paymentMethod.isDefault && (
                      <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">Default</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Expires {paymentMethod.cardDetails.expMonth}/{paymentMethod.cardDetails.expYear}
                  </div>
                </div>
              ) : paymentMethod.type === "bank" && paymentMethod.bankDetails ? (
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">
                      {paymentMethod.bankDetails.bankName} •••• {paymentMethod.bankDetails.last4}
                    </span>
                    {paymentMethod.isDefault && (
                      <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">Default</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {paymentMethod.bankDetails.name || "Bank Account"}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="font-medium">
                    Payment Method
                    {paymentMethod.isDefault && (
                      <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">Default</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Added on {new Date(paymentMethod.createdAt).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            {!paymentMethod.isDefault && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8"
                onClick={handleSetDefault}
                disabled={isLoading}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Set Default
              </Button>
            )}
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 text-destructive"
              onClick={handleRemove}
              disabled={isLoading || paymentMethod.isDefault}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
