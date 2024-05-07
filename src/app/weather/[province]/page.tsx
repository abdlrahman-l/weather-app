import { notFound } from "next/navigation";

import { getProvinceList, getProvinceWeather } from "@/lib/queries";

import SearchArea from "@/components/SearchArea";
import SearchLocation from "@/components/SearchLocation";


export async function generateStaticParams() {
    const provinceList = await getProvinceList();

    if (!provinceList) return []

    return provinceList?.data?.provinces?.data?.map?.(p => ({
        province: p.id
    }))
}


export default async function ProvincePage({ params }: { params: { province: string } }) {
    const { province } = params

    const provinceList = await getProvinceList();
    const { formattedData } = await getProvinceWeather(province) || {}

    if (!provinceList || !formattedData) {
        notFound();
    }

    const provinces = provinceList.data.provinces.data
    const selectedProvince = provinces.find(({ id }) => id === province)

    return (
        <section>
            <div className="grid gap-y-2">
                <SearchLocation
                    provinces={provinces}
                    defaultProvince={selectedProvince}
                />
                <SearchArea
                    areas={formattedData}
                />
            </div>
        </section>
    )
}