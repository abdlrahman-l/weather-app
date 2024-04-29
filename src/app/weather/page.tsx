import { getProvinceList } from "@/lib/queries";
import Link from "next/link";

export default async function TestPage() {
    const provinceList = await getProvinceList();

    if (!provinceList) return null

    return (
        <ul>
            <p>{provinceList.data.provinces.data.length}</p>
            {
                provinceList.data.provinces.data?.map?.(p => <Link key={p.id} href={`/weather/${p.id}`}>{p.name}</Link>)
            }
        </ul>
    )
}
