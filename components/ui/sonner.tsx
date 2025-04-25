'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      style={
        {
          '--normal-bg': '#910d0d',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--font-size': '1.1rem',
          '--width': '600px',
          '--height': '200px',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
