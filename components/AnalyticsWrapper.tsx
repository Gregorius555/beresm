import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

interface AnalyticsWrapperProps {
  children: ReactNode;
}

const AnalyticsWrapper = ({ children }: AnalyticsWrapperProps) => {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
};

export default AnalyticsWrapper;
