'use client';

import React from 'react'

import { weatherCodeFile } from '@/constant/bmkg';

import LottieAnimation from '../LottieAnimation'


type WeatherProps = {
    unit: keyof typeof weatherCodeFile;
}

const Weather = ({ unit }: WeatherProps) => {
    return (
        <LottieAnimation
            importAnimation={(cb) => import(`src/lib/lotties/${weatherCodeFile[unit]}.json`).then(cb)}
        />
    )
}

export default Weather