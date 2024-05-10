'use client';

import clsx from 'clsx';
import React, { useRef } from 'react'

import { FormattedWeather } from '@/lib/types';

import { weatherCode, weatherCodeFile, weatherColorCode } from '@/constant/bmkg';

import LottieAnimation from '../LottieAnimation'


type WeatherProps = {
    unit: keyof typeof weatherCodeFile;
    time: string;
    temperature: FormattedWeather['temperature'];
}

const Weather = ({ unit, time, temperature }: WeatherProps) => {
    const bgColor = weatherColorCode[unit]?.split?.('-')
    const lottieRef = useRef<any>(null);
    const formattedTime = time.slice(8).replace(/^(\d{2})(\d{2})$/, "$1:$2")

    //TODO: make it dynamic with option select at Header
    const selectedUnitTemp = temperature[0]
    const formattedTemp = `${selectedUnitTemp.text} °${selectedUnitTemp.unit}`

    const details = weatherCode[unit]?.split('/')?.[0];

    return (
        <div className={clsx('h-20 flex justify-between items-center shadow-lg rounded-lg p-3 cursor-pointer', `${bgColor[0]}`, `bg-primary-${bgColor[1]}`)}>
            <div className='flex flex-start items-center space-x-2'>
                <LottieAnimation
                    importAnimation={(cb) => import(`src/lib/lotties/${weatherCodeFile[unit]}.json`).then(cb)}
                    lottieProps={{
                        style: {
                            height: 60
                        },
                        interactivity: {
                            mode: "cursor",
                            actions: [
                                {
                                    position: { x: [0, 1], y: [0, 1] },
                                    type: "play",
                                    frames: [0, 180],
                                },
                                {
                                    position: { x: -1, y: -1 },
                                    type: "stop",
                                    frames: [0, 180],
                                },
                            ],
                        }
                    }}
                    lottieRef={lottieRef}
                />

                <h6 className='font-medium text-lg text-white'>{`${formattedTemp} / ${details}`}</h6>
            </div>
            <h6 className='font-medium text-2xl text-white'>{formattedTime}</h6>
        </div>
    )
}

export default Weather