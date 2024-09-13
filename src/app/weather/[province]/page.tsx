import { Suspense } from 'react';

import { getProvinceList } from '@/lib/queries';

import SearchAreaWithDetailsSC from '@/components/ServerComponents/SearchAreaWithDetailsSC';
import Skeleton from '@/components/Skeleton';

export async function generateStaticParams() {
  const provinceList = await getProvinceList();

  if (!provinceList) return [];

  return provinceList?.data?.map?.((p) => ({
    province: p.id,
  }));
}

export default async function ProvincePage({
  params,
}: {
  params: { province: string };
}) {
  return (
    <Suspense fallback={<Skeleton className='h-[40px] rounded-lg w-full' />}>
      <SearchAreaWithDetailsSC provinceId={params.province} />
    </Suspense>
  );
}
