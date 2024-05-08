import { notFound } from 'next/navigation';
import React from 'react'

import { getProvinceWeather } from '@/lib/queries';

import SearchArea from '@/components/SearchArea';

type SearchAreaSCProps = {
    provinceId: string;
}

const SearchAreaSC = async ({ provinceId }: SearchAreaSCProps) => {
    const { formattedData } = await getProvinceWeather(provinceId) || {}

    if (!formattedData) {
        notFound();
    }

  return (
    <SearchArea
        areas={formattedData}
    />
  )
}

export default SearchAreaSC
