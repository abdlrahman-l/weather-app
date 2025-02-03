import type { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

import RegionSearchModal from '@/components/region/RegionSearchModal';
import Skeleton from '@/components/Skeleton';
import WeatherProvider from '@/components/WeatherProvider';

import { repoApiUrl } from '@/constant/env';

/**
 * Default metadata.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata
 */
export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Weather App forecast Indonesia regions',
};

const SearchLayout = async ({ code }: { code: string }) => {
  const res = await fetch(`${repoApiUrl}/api/search/${code}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const placeholder = (await res.json())?.data;

  return <RegionSearchModal code={code} placeholder={placeholder} />;
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
      {/* <RegionSearchModal code={params.code} /> */}
      <section className='mb-5 max-w-screen-sm'>
        <Suspense fallback={<Skeleton className='h-10 w-72 rounded-lg' />}>
          <SearchLayout code={params.code} />
        </Suspense>
      </section>
      {children}
    </WeatherProvider>
  );
}
