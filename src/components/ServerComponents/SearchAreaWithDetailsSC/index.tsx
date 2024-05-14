import { notFound } from "next/navigation";

import dayjs from "@/lib/date";
import { getProvinceWeather } from "@/lib/queries";
import { FormattedWeather } from "@/lib/types";

import DayTabs from "@/components/DayTabs";
import SearchArea from "@/components/SearchArea";
import { windDirectionCode } from "@/constant/bmkg";

export default async function SearchAreaWithDetailsSC({
    provinceId,
    areaId,
}: {
    provinceId: string;
    areaId?: string
}) {

    const { formattedData, } = await getProvinceWeather(provinceId) || {}

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
        const dateDayTime = curr.datetime.slice(0, 8)
        const date = dayjs(dateDayTime)
        const key = `${date.format('ddd, D MMM')}`
        // hourly
        const timeIndex = paramObj.temperature?.timerange.findIndex(t => t.datetime === curr.datetime)
        const specificTemp = paramObj.temperature?.timerange[timeIndex].value;
        const humidity = paramObj.humidity.timerange[timeIndex].value
        const windSpeed = paramObj.windSpeed.timerange[timeIndex].value
        const windDirection = paramObj.windDirection.timerange[timeIndex].value
        return {
            ...acc,
            [key]: [...(acc[key] || []), {
                dateTime: curr.datetime,
                temperature: specificTemp,
                weatherUnit: Number(curr.value[0].text),
                date: curr.datetime,
                humidity: `${humidity[0].text} ${humidity[0].unit}`,
                windSpeed: `${windSpeed[2].text} km/j`,
                windDirection: windDirectionCode[windDirection[1].text]
            }]
        }
    }, {})

    return (
        <div>
            <div>
                {/* {JSON.stringify(paramObj, null, 2)} */}
            </div>
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
