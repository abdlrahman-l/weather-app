import { notFound } from "next/navigation";

import dayjs from "@/lib/date";
import { getProvinceWeather } from "@/lib/queries";
import { FormattedWeather } from "@/lib/types";

import DayTabs from "@/components/DayTabs";
import SearchArea from "@/components/SearchArea";

export default async function SearchAreaWithDetailsSC({
    provinceId,
    areaId,
}: {
    provinceId: string;
    areaId?: string
}) {

    const { formattedData } = await getProvinceWeather(provinceId) || {}

    if (!formattedData) {
        notFound();
    }

    const area = formattedData?.find?.(d => d.id === areaId) || formattedData[0]
    const { paramObj } = area;

    if (!paramObj.weather?.timerange) {
        notFound();
    }

    const groupedTimerange = paramObj.weather?.timerange.reduce<{
        [key: string]: FormattedWeather[];
    }>((acc, curr) => {
        const key = `${dayjs(curr.datetime.slice(0, 8)).format('ddd, D MMM')}`
        const timeIndex = paramObj.temperature?.timerange.findIndex(t => t.datetime === curr.datetime)
        const specificTemp = paramObj.temperature?.timerange[timeIndex].value;
        return {
            ...acc,
            [key]: [...(acc[key] || []), {
                dateTime: curr.datetime,
                temperature: specificTemp,
                weatherUnit: Number(curr.value[0].text),
            }]
        }
    }, {})

    return (
        <div>
            <SearchArea
                areas={formattedData}
                defaultArea={area}
            />
            <div className='mt-5 m-auto'>
                <DayTabs groupedTimeRange={groupedTimerange} />
            </div>
        </div>
    )
}
