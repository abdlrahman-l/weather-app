import React from 'react'

import { getProvinceWeather } from '@/lib/queries'


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


  return (
    <div>

      <div>DomainDetailsPage</div>
      <div>{JSON.stringify(area, null, 2)}</div>
    </div>
  )
}
