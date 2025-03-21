import React from 'react';
import { useParams } from 'next/navigation';

export default function Return() {
  const { connectedAccountId } = useParams();
  console.log('connectedAccountId', connectedAccountId);
  return (
    <div className="container">
      <div className="banner">
        <h2>Rocket Rides</h2>
      </div>
      <div className="content">
        <h2>Details submitted</h2>
        <p>That&apos;s everything we need for now</p>
      </div>
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
  );
}
