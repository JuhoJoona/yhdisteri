'use client';

import {
  createAccount,
  createAccountLink,
} from '@/lib/services/billingService';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

const BrandLogo = () => (
  <div className="w-16 h-16 bg-indigo-200 rounded-full mb-4 flex items-center justify-center text-indigo-700 font-bold">
    Y
  </div>
);

export default function Home() {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState('');
  const t = useTranslations('StripeConnect');
  const searchParams = useSearchParams();
  const [organizationId, setOrganizationId] = useState<string | null>(null);

  useEffect(() => {
    const orgId = searchParams.get('organizationId');
    setOrganizationId(orgId);
    console.log('organizationId from query params', orgId);
  }, [searchParams]);

  const handleCreateAccount = async () => {
    setAccountCreatePending(true);
    setError(false);
    try {
      if (!organizationId) {
        console.error('Organization ID is missing');
        setError(true);
        return;
      }
      const res = await createAccount(organizationId);
      console.log('Account creation response:', res);
      if (res?.account) {
        setConnectedAccountId(res.account);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error creating account:', err);
      setError(true);
    } finally {
      setAccountCreatePending(false);
    }
  };

  const handleCreateAccountLink = async () => {
    if (!connectedAccountId) return;
    setAccountLinkCreatePending(true);
    setError(false);
    try {
      const res = await createAccountLink(connectedAccountId);
      console.log('Account link response:', res);
      if (res?.url) {
        window.location.href = res.url;
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error creating account link:', err);
      setError(true);
    } finally {
      setAccountLinkCreatePending(false);
    }
  };

  const buttonBaseStyle =
    'px-6 py-3 rounded-md text-white font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out';
  const primaryButtonStyle = `${buttonBaseStyle} bg-indigo-600 dark:bg-indigo-800 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50`;
  const loadingButtonStyle = `${buttonBaseStyle} bg-gray-400 dark:bg-gray-400 cursor-not-allowed`;

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8  p-8 sm:p-10 shadow-lg rounded-xl">
        <div className="flex flex-col items-center">
          <BrandLogo />
          {!connectedAccountId ? (
            <>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                {t('connectStripeAccount')}
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-white">
                {t('connectStripeAccountDescription')}
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                {t('completeYourAccountSetup')}
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-white">
                {t('completeYourAccountSetupDescription')}
              </p>
            </>
          )}
        </div>

        <div className="mt-8 space-y-6">
          {!connectedAccountId && (
            <button
              onClick={handleCreateAccount}
              disabled={accountCreatePending}
              className={`${
                accountCreatePending ? loadingButtonStyle : primaryButtonStyle
              } w-full`}
            >
              {accountCreatePending
                ? 'Creating Account...'
                : 'Create Stripe Account'}
            </button>
          )}

          {connectedAccountId && (
            <button
              onClick={handleCreateAccountLink}
              disabled={accountLinkCreatePending}
              className={`${
                accountLinkCreatePending
                  ? loadingButtonStyle
                  : primaryButtonStyle
              } w-full`}
            >
              {accountLinkCreatePending
                ? 'Generating Link...'
                : 'Add Information via Stripe'}
            </button>
          )}

          {error && (
            <p className="mt-2 text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">
              Something went wrong! Please try again.
            </p>
          )}

          {(connectedAccountId ||
            accountCreatePending ||
            accountLinkCreatePending) && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md text-sm text-gray-700 space-y-2">
              {connectedAccountId && (
                <p>
                  {t('yourConnectedAccountId')}
                  <code className="font-mono bg-gray-200 px-1 rounded">
                    {connectedAccountId}
                  </code>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
