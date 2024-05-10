import { notFound } from 'next/navigation'
import React from 'react'

import { getProvinceWeather } from '@/lib/queries'
import { FormattedWeather } from '@/lib/types'

import DayTabs from '@/components/DayTabs'


export async function generateStaticParams({
  params: { province },
}: {
  params: { province: string }
}) {
  const { formattedData } = await getProvinceWeather(province) || {}

  if (!formattedData) return []

  return formattedData.map(d => ({
    area: d.id
  }))
}


export default async function DomainDetailsPage({
  params,
}: {
  params: { province: string; area: string }
}) {

  const { formattedData } = await getProvinceWeather(params.province) || {}
  const area = formattedData?.find?.(d => d.id === params.area)

  if (!area) {
    notFound();
  }

  const { paramObj } = area;

  const groupedTimerange = paramObj.weather.timerange.reduce<{
    [key: string]: FormattedWeather[];
  }>((acc, curr) => {
    const key = curr.datetime.slice(0, 8)
    const timeIndex = paramObj.temperature.timerange.findIndex(t => t.datetime === curr.datetime)
    const specificTemp = paramObj.temperature.timerange[timeIndex].value;
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
    <div className='flex align-items-center justify-center'>
      <DayTabs groupedTimeRange={groupedTimerange} />
    </div>
  )
}
