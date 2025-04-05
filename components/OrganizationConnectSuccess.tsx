'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Building2, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { addOrganizationStripeId } from '@/lib/services/organizationService';
import { typedApiClient } from '@/lib/client';

export default function OrganizationConnectSuccess() {
  const { locale, stripeId } = useParams();
  const t = useTranslations('OrganizationConnectSuccess');
  const [orgName, setOrgName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const organizationId = localStorage.getItem('organizationId');

  useEffect(() => {
    // TODO: SEND ORGANIZATION STRIPE ID TO API
    (async () => {
      if (organizationId) {
        const response = await typedApiClient.POST(
          '/organizations/billing/stripe',
          {
            body: {
              organizationId,
              stripeId: stripeId as string,
            },
          }
        );
        console.log('response', response);
      }
    })();
    const timer = setTimeout(() => {
      setOrgName('Your Organization');
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" />
            <p className="text-black font-medium">
              {t('finalizingConnection')}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle
                  className="w-20 h-20 text-black"
                  strokeWidth={1.5}
                />
              </motion.div>
              <h1 className="text-3xl font-bold text-black">
                {t('connectionSuccessful')}
              </h1>
              <p className="text-gray-600 max-w-sm">
                {t('connectionSuccessfulDescription')}
              </p>
            </div>

            <Card className="border-2 border-black">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('organization')}</span>
                  <span className="font-medium">{orgName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('status')}</span>
                  <span className="bg-black text-white px-2 py-1 text-xs rounded-full">
                    {t('connected')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('accessLevel')}</span>
                  <span className="font-medium">{t('fullAccess')}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="font-semibold text-lg text-black">
                {t('whatsNext')}
              </h2>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Building2 className="w-5 h-5 text-black mt-0.5" />
                  <div>
                    <h3 className="font-medium text-black">
                      {t('manageYourOrganization')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('manageYourOrganizationDescription')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-black mt-0.5" />
                  <div>
                    <h3 className="font-medium text-black">
                      {t('inviteYourTeam')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('inviteYourTeamDescription')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-black mt-0.5" />
                  <div>
                    <h3 className="font-medium text-black">
                      {t('setUpPermissions')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('setUpPermissionsDescription')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <Link href="/dashboard" className="w-full">
                <Button className="w-full bg-black hover:bg-gray-800 text-white">
                  {t('goToDashboard')}
                </Button>
              </Link>
              <Link href="/settings/organization" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-black text-black hover:bg-gray-100"
                >
                  {t('organizationSettings')}
                </Button>
              </Link>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>
                {t('needHelp')}
                <a
                  href="mailto:support@yhdisteri.com"
                  className="underline hover:text-black"
                >
                  {t('supportEmail')}
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
