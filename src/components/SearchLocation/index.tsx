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
                options={provinces.map(v => ({ id: v.slug || v.id, value: v.name }))}
                defaultOption={
                    selectedProvince ? {
                        id: selectedProvince.slug || selectedProvince.id,
                        value: selectedProvince.name,
                    } : undefined
                }
                onSelect={({ id }) => {
                    const selectedProvince = provinces.find(p => (p.slug || p.id) === id)
                    if (selectedProvince) {
                        setProvince(selectedProvince)
                        router.push(`/weather/${selectedProvince.slug}`)
                    }
                }}
            />
        </div>
    )
}

export default SearchLocation