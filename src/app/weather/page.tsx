
import { getProvinceList } from "@/lib/queries";

import SearchLocation from "@/components/SearchLocation";


export default async function TestPage() {
    const provinceList = await getProvinceList();

    if (!provinceList) return null

    const provinces = provinceList.data.provinces.data
    const defaultProvince = provinces.find(p => p.name.toLowerCase().includes('jakarta'))

    return (
        <div className="flex flex-col">
            {/* <Geolocation /> */}
            <SearchLocation 
                provinces={provinces}
                defaultProvince={defaultProvince}
            />
        </div>
    )
}
