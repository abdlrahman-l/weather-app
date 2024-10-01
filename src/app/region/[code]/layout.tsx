import type { Metadata } from 'next';
import { ReactNode } from 'react';

import RegionSearch from '@/components/region/RegionSearch';
import WeatherProvider from '@/components/WeatherProvider';

import regionCode from '@/constant/kode-wilayah.json';

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
  params: { code: keyof (typeof regionCode)['DATA'] };
}) {
  return (
    <WeatherProvider>
      <RegionSearch code={params.code} />
      {children}
    </WeatherProvider>
  );
}
