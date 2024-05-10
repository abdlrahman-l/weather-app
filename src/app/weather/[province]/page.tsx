import { Suspense } from "react";

import { getProvinceList } from "@/lib/queries";

import SearchAreaSC from "@/components/ServerComponents/SearchAreaSC";
import SearchLocationSC from "@/components/ServerComponents/SearchLocationSC";
import Skeleton from "@/components/Skeleton";


export async function generateStaticParams() {
    const provinceList = await getProvinceList();

    if (!provinceList) return []

    return provinceList?.data?.provinces?.data?.map?.(p => ({
        province: p.id
    }))
}


export default async function ProvincePage({ params }: { params: { province: string } }) {
    const { province } = params

    return (
        <section>
            <div className="grid gap-y-2">
                <Suspense fallback={
                    <Skeleton className='h-[40px] rounded-lg w-full' />
                }>
                    <SearchLocationSC provinceId={province} />
                </Suspense>
                <Suspense fallback={
                    <Skeleton className='h-[40px] rounded-lg w-full' />
                }>
                    <SearchAreaSC provinceId={province} />
                </Suspense>
            </div>
        </section>
    )
}