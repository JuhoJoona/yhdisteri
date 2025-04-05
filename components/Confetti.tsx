'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function Confetti() {
  useEffect(() => {
    // Trigger confetti when component mounts
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const colors = ['#000000', '#ffffff', '#cccccc'];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
}
