'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getMembershipType } from '@/lib/services/plansClientService';
import { OrganizationMembershipType } from '@/lib/types/plans';
import { createCheckoutSession } from '@/lib/services/billingService';
import { getUser } from '@/lib/client';

export default function MembershipPaymentPage() {
  const params = useParams();
  const t = useTranslations('Member');
  const [membershipType, setMembershipType] =
    useState<OrganizationMembershipType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [memberId, setMemberId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser();
        console.log('user', user);
        if (user?.id) {
          setMemberId(user.id);
          console.log('memberId', memberId);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchMembershipType = async () => {
      try {
        const type = await getMembershipType(params.typeId as string);
        if (type) {
          setMembershipType(type);
        }
      } catch (err) {
        setError('Failed to load membership details');
        console.error('Error fetching membership type:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipType();
  }, [params.typeId]);

  const handleCheckout = async () => {
    if (!membershipType || !memberId) return;

    setCheckoutLoading(true);
    try {
      const session = await createCheckoutSession({
        organizationId: params.organizationId as string,
        membershipTypeId: membershipType.id as string,
        price: parseFloat(membershipType.price as string),
        interval: membershipType.interval as string,
        memberId: memberId,
      });

      if (session?.url) {
        window.location.href = session.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      setError('Failed to start checkout process');
      console.error('Error creating checkout session:', err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !membershipType) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-500">
              {error || 'Membership type not found'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{membershipType.name}</CardTitle>
          <CardDescription>{membershipType.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="font-medium">
              {membershipType.price}€/{membershipType.interval}
            </span>
          </div>
          <Button
            className="w-full"
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
