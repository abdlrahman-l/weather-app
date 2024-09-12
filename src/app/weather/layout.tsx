import type { Metadata } from 'next';
import { ReactNode } from 'react';

import WeatherProvider from '@/components/WeatherProvider';

/**
 * Default metadata.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata
 */
export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Weather App forecast Indonesia areas',
};

/**
 * The weather (client) root layout.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function WeatherLayout({ children }: { children: ReactNode }) {
  return (
    <WeatherProvider>
      <section>{children}</section>
    </WeatherProvider>
  );
}
