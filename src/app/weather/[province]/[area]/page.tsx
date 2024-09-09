import React, { Suspense } from 'react';

import { getProvinceDescriptionId } from '@/lib/queries';

import SearchAreaWithDetailsSC from '@/components/ServerComponents/SearchAreaWithDetailsSC';
import SearchLocationSC from '@/components/ServerComponents/SearchLocationSC';
import Skeleton from '@/components/Skeleton';

export async function generateStaticParams({
  params: { province },
}: {
  params: { province: string };
}) {
  const { areaList } = (await getProvinceDescriptionId(province)) || {};

  if (!areaList) return [];

  return areaList.map((d) => ({
    area: d.id,
  }));
}

export default async function DomainDetailsPage({
  params,
}: {
  params: { province: string; area: string };
}) {
  return (
    <div>
      <div className='space-y-3'>
        <Suspense
          fallback={<Skeleton className='h-[40px] rounded-lg w-full' />}
        >
          <SearchLocationSC provinceId={params.province} />
        </Suspense>
        <Suspense
          fallback={<Skeleton className='h-[40px] rounded-lg w-full' />}
        >
          <SearchAreaWithDetailsSC
            provinceId={params.province}
            areaId={params.area}
          />
        </Suspense>
      </div>
    </div>
  );
}
