
import { Invoice } from "@/types/payment";
import { CalendarDays, FileText, Download, ArrowDownToLine, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface InvoiceCardProps {
  invoice: Invoice;
  onClick?: (invoice: Invoice) => void;
}

export const InvoiceCard = ({ invoice, onClick }: InvoiceCardProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500/10 text-green-700 dark:text-green-500">Paid</Badge>;
      case "open":
        return <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-500">Outstanding</Badge>;
      case "void":
        return <Badge className="bg-red-500/10 text-red-700 dark:text-red-500">Void</Badge>;
      case "draft":
        return <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-500">Draft</Badge>;
      case "uncollectible":
        return <Badge className="bg-gray-500/10 text-gray-700 dark:text-gray-500">Uncollectible</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md" 
      onClick={() => onClick && onClick(invoice)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">{invoice.invoiceNumber}</span>
            </div>
            <div className="flex items-center mt-1">
              <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {formatDate(invoice.invoiceDate)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-semibold">
              {formatCurrency(invoice.amount, invoice.currency)}
            </div>
            <div className="mt-1">
              {getStatusBadge(invoice.status)}
            </div>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {invoice.lineItems[0]?.description || ""}
          </div>
          {invoice.pdf && (
            <Button variant="ghost" size="sm" className="h-8">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
