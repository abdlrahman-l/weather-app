'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

import { FormattedArea } from '@/lib/types';
import { slugify } from '@/lib/utils';

import DropdownSelect from '../DropdownSelect';
import { useWeatherContext } from '../WeatherProvider'


type SearchAreaProps = {
    areas: FormattedArea[];
    defaultArea?: FormattedArea;
}

const SearchArea = ({ areas, defaultArea }: SearchAreaProps) => {
    const { setArea, province } = useWeatherContext()
    const router = useRouter();
    const selectedArea = defaultArea || areas?.[0];

    useEffect(() => {
        if (defaultArea) 
            setArea(defaultArea)

    }, [defaultArea, setArea])

    return (
        <div>
            <DropdownSelect
                options={areas.map(v => ({ id: v.id, value: v.description }))}
                defaultOption={
                    selectedArea ? {
                        id: selectedArea.id,
                        value: selectedArea.description,
                    } : undefined
                }
                onSelect={({ id }) => {
                    const selectedAreaOption = areas?.find(a => a.id === id)
                    if (selectedAreaOption && province) {
                        setArea(selectedAreaOption)
                        router.push(`/weather/${province?.slug}/${slugify(selectedAreaOption?.description)}`)
                    }
                }}
            />
        </div>
    )
}

export default SearchArea