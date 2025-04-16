'use client';

import SuccessPage from './SuccessPage';
import { Confetti } from './Confetti';

export default function SuccessPageWithConfetti() {
  return (
    <>
      <Confetti />
      <SuccessPage />
    </>
  );
}
