
export interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    interval: "month" | "year";
    features: string[];
    isPopular?: boolean;
    metadata?: Record<string, string>;
  }
  
  export interface PaymentMethod {
    id: string;
    type: "card" | "bank" | "paypal";
    name: string;
    last4?: string;
    expiryMonth?: number;
    expiryYear?: number;
    isDefault: boolean;
    brand?: string;
    country?: string;
    email?: string;
    bankName?: string;
    cardDetails?: {
      brand: string;
      last4: string;
      expMonth: number;
      expYear: number;
      country: string;
      name?: string;
    };
    bankDetails?: {
      bankName: string;
      last4: string;
      country: string;
      name?: string;
    };
    createdAt: string;
  }
  
  export interface Subscription {
    id: string;
    memberId: string;
    planId: string;
    status: "active" | "canceled" | "past_due" | "trialing" | "incomplete";
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    canceledAt?: string;
    endedAt?: string;
    trialStart?: string;
    trialEnd?: string;
    paymentMethod?: string;
  }
  
  export interface Invoice {
    id: string;
    number: string;
    date: string;
    dueDate: string;
    amount: number;
    status: "paid" | "pending" | "overdue" | "draft" | "open" | "void" | "uncollectible";
    items: InvoiceItem[];
    currency: string;
    memberId?: string;
    subscriptionId?: string;
    invoiceNumber?: string;
    invoiceDate?: string;
    lineItems?: InvoiceLineItem[];
    pdf?: string;
  }
  
  export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }
  
  export interface InvoiceLineItem {
    id: string;
    description: string;
    amount: number;
    quantity: number;
    period?: {
      start: string;
      end: string;
    };
  }
  
  export interface PaymentIntent {
    id: string;
    amount: number;
    currency: string;
    status: "requires_payment_method" | "requires_confirmation" | "requires_action" | "processing" | "requires_capture" | "canceled" | "succeeded";
    clientSecret: string;
    receiptEmail?: string;
    canceledAt?: string;
    createdAt: string;
  }
  
  export interface ManualPayment {
    id: string;
    memberId: string;
    amount: number;
    currency: string;
    status: "pending" | "completed" | "failed";
    description: string;
    paymentDate: string;
    adminId: string;
    adminNote?: string;
    createdAt: string;
  }
  