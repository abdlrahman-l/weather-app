'use client';

import React from 'react'

import LottieAnimation from '../LottieAnimation'
import { weatherCode, weatherCodeFile } from '@/constant/bmkg';


type WeatherProps = {
    unit: keyof typeof  weatherCodeFile;
}

const Weather = ({ unit }: WeatherProps) => {
    return (
        <LottieAnimation
            importAnimation={(cb) => import(`src/lib/lotties/${weatherCodeFile[unit]}.json`).then(cb)}
        />
    )
}

export default Weather