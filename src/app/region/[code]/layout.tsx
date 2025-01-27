import type { Metadata } from 'next';
import { ReactNode } from 'react';

import RegionSearchModal from '@/components/region/RegionSearchModal';
import WeatherProvider from '@/components/WeatherProvider';

/**
 * Default metadata.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata
 */
export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Weather App forecast Indonesia regions',
};

/**
 * The weather (client) root layout.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function WeatherLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { code: string };
}) {
  return (
    <WeatherProvider>
      <RegionSearchModal code={params.code} />
      {children}
    </WeatherProvider>
  );
}
