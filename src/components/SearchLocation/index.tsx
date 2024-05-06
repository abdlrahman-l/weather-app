'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

import { Province } from '@/lib/types';

import DropdownSelect from '../DropdownSelect';
import { useWeatherContext } from '../WeatherProvider'


type SearchLocationProps = {
    provinces: Province[];
    defaultProvince?: Province;
}

const SearchLocation = ({ provinces, defaultProvince }: SearchLocationProps) => {
    const { setProvince, province } = useWeatherContext()
    const router = useRouter();
    const selectedProvince = province || defaultProvince

    useEffect(() => {
        if (defaultProvince) 
            setProvince(defaultProvince)

    }, [defaultProvince, setProvince])

    return (
        <div>
            <DropdownSelect
                options={provinces.map(v => ({ id: v.id, value: v.name }))}
                defaultOption={
                    selectedProvince ? {
                        id: selectedProvince.id,
                        value: selectedProvince.name,
                    } : undefined
                }
                onSelect={({ id, value }) => {
                    setProvince({
                        id,
                        name: value
                    })
                    router.push(`/weather/${id}`)
                }}
            />
        </div>
    )
}

export default SearchLocation