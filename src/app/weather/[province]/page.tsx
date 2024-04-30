import Link from "next/link";
import { notFound } from "next/navigation";

import { getProvinceList, getProvinceWeather } from "@/lib/queries";


export async function generateStaticParams() {
    const provinceList = await getProvinceList();

    if (!provinceList) return []

    return provinceList?.data?.provinces?.data?.map?.(p => ({
        province: p.id
    }))
}


export default async function ProvincePage({ params }: { params: { province: string } }) {
    const { province } = params

    const { provinceWeatherData, formattedData } = await getProvinceWeather(province) || {}

    if (!provinceWeatherData) {
        notFound();
    }

    return (
        <section>
            <h5>{province}</h5>
            <div>
                {formattedData?.map?.(a => (
                    <div key={a.id}>
                        <h6><Link href={`/weather/${province}/${a.id}`}>{`${a.description}, ${a.domain}`}</Link></h6>
                        {/* <p>{JSON.stringify(a.paramObj, null, 2)}</p> */}
                        {/* <div className="grid grid-cols-6 gap-4">
                            {
                                a.paramObj.weather.timerange.map(t => (
                                    <div key={t.datetime} className="shadow-lg rounded-xl grid align-items-center justify-items-center py-3 my-10">
                                        <Weather unit={Number(t.value[0].text)} />
                                        <h6>{}</h6>
                                    </div>
                                ))
                            }
                        </div> */}
                    </div>
                ))}
            </div>
        </section>
    )
}