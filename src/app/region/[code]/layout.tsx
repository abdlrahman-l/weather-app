import type { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

import GeolocationButton from '@/components/GeolocationButton';
import RegionSearchModal from '@/components/region/RegionSearchModal';
import Skeleton from '@/components/Skeleton';
import WeatherProvider from '@/components/WeatherProvider';

import { repoApiUrl } from '@/constant/env';
import Providers from '@/query/provider';

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
    <Providers>
      <WeatherProvider>
        {/* <RegionSearchModal code={params.code} /> */}
        <section className='mb-5 max-w-screen-sm w-full flex flex-nowrap space-x-2 items-center justify-center'>
          <Suspense fallback={<Skeleton className='h-10 w-full rounded-lg' />}>
            <SearchLayout code={params.code} />
            <GeolocationButton />
          </Suspense>
        </section>
        {children}
      </WeatherProvider>
    </Providers>
  );
}
