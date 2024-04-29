import { notFound } from "next/navigation";

import { getProvinceList, getProvinceWeather } from "@/lib/queries";
import { Area, FormattedParameter } from "@/lib/types";

export async function generateStaticParams() {
    const provinceList = await getProvinceList();

    if (!provinceList) return []

    return provinceList?.data?.provinces?.data?.map?.(p => ({
        province: p.id
    }))
}

type FormattedArea = Area & {
    paramObj: FormattedParameter
}

export default async function ProvincePage({ params }: { params: { province: string } }) {
    const { province } = params

    const provinceWeatherData = await getProvinceWeather(province)

    if (!provinceWeatherData) {
        notFound();
    }

    const areaList = provinceWeatherData.data.weather.data.forecast.area
    const formattedData = [...areaList].map<FormattedArea>(a => ({
        ...a,
        paramObj: {
            humidity: a.parameter[0],
            maxHumidity: a.parameter[1],
            maxTemperature: a.parameter[2],
            minHumidity: a.parameter[3],
            minTemperature: a.parameter[4],
            temperature: a.parameter[5],
            weather: a.parameter[6],
            windDirection: a.parameter[7],
        }
    }))


    return (
        <section>
            <h5>{province}</h5>
            <div className="flex flex-col">
                {formattedData.map(a => (
                    <div key={a.id}>
                        <h6>{`${a.description}, ${a.domain}`}</h6>
                        <ul>
                            <li>{a.paramObj.humidity.description}</li>
                            <li>{a.paramObj.maxHumidity.description}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}