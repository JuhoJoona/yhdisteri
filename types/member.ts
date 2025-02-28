export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: string;
  status: "active" | "inactive" | "pending";
  profileImage?: string;
  role?: string;
  lastActive?: string;
  address?: Address;
  membership?: Membership;
  communicationPreferences?: CommunicationPreferences;
  documents?: Document[];
  notes?: string;
  billingDetails?: BillingDetails;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Membership {
  type: "standard" | "premium" | "lifetime";
  startDate: string;
  endDate?: string;
  paymentStatus: "paid" | "pending" | "overdue";
  autoRenew: boolean;
}

export interface CommunicationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  url: string;
}

export interface BillingDetails {
  defaultPaymentMethod?: string;
  subscriptionId?: string;
  billingAddress?: Address;
  taxId?: string;
  lastPaymentDate?: string;
  nextBillingDate?: string;
}

export interface MemberStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  newThisMonth: number;
  retention: number;
}
