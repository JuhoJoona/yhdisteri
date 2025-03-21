'use client';

import {
  createAccount,
  createAccountLink,
} from '@/lib/services/billingService';
import React, { useState } from 'react';

export default function Home() {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState('');

  return (
    <div className="container">
      <div className="banner">
        <h2>Rocket Rides</h2>
      </div>
      <div className="content">
        {!connectedAccountId && <h2>Get ready for take off</h2>}
        {!connectedAccountId && (
          <p>
            Rocket Rides is the world&apos;s leading air travel platform: join
            our team of pilots to help people travel faster.
          </p>
        )}
        {connectedAccountId && (
          <h2>Add information to start accepting money</h2>
        )}
        {connectedAccountId && (
          <p>
            Matt&apos;s Mats partners with Stripe to help you receive payments
            and keep your personal bank and details secure.
          </p>
        )}
        {!accountCreatePending && !connectedAccountId && (
          <button
            onClick={async () => {
              setAccountCreatePending(true);
              setError(false);
              const res = await createAccount();
              console.log('res', res);
              setAccountCreatePending(false);
              if (!res) {
                setError(true);
                return;
              }
              if (res.account) {
                setConnectedAccountId(res.account);
              }

              if (res?.error) {
                setError(true);
              }
            }}
          >
            Create an account!
          </button>
        )}
        {connectedAccountId && !accountLinkCreatePending && (
          <button
            onClick={async () => {
              setAccountLinkCreatePending(true);
              setError(false);
              const res = await createAccountLink(connectedAccountId);
              console.log('res', res);
              setAccountLinkCreatePending(false);
              if (!res) {
                setError(true);
                return;
              }

              if (res.url) {
                window.location.href = res.url;
              }

              if (error) {
                setError(true);
              }
            }}
          >
            Add information
          </button>
        )}
        {error && <p className="error">Something went wrong!</p>}
        {(connectedAccountId ||
          accountCreatePending ||
          accountLinkCreatePending) && (
          <div className="dev-callout">
            {connectedAccountId && (
              <p>
                Your connected account ID is:{' '}
                <code className="bold">{connectedAccountId}</code>
              </p>
            )}
            {accountCreatePending && <p>Creating a connected account...</p>}
            {accountLinkCreatePending && <p>Creating a new Account Link...</p>}
          </div>
        )}
        <div className="info-callout">
          <p>
            This is a sample app for Stripe-hosted Connect onboarding.{' '}
            <a
              href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted"
              target="_blank"
              rel="noopener noreferrer"
            >
              View docs
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
