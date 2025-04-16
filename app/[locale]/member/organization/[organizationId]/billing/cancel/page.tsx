'use client';

import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function CancelPage() {
  const t = useTranslations('Member');

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <XCircle className="h-8 w-8 mr-2 text-red-500" />
            {t('paymentCancelled')}
          </CardTitle>
          <CardDescription className="text-center">
            {t('paymentCancelledDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t('paymentCancelledDetails')}
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/member/organization">
              <Button variant="outline">{t('returnToOrganization')}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
