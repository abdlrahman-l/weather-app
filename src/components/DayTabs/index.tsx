'use client';

import React from 'react'

import { FormattedWeather } from '@/lib/types';

import Weather from '@/features/weather/components/Weather'

import Tabs from '../Tabs'

type DayTabsProps = {
    groupedTimeRange: {
      [key: string]: FormattedWeather[];
    }
};

const DayTabs = ({ groupedTimeRange }: DayTabsProps) => {
  return (
    <Tabs tabs={Object.keys(groupedTimeRange).map(t => ({
      tab: t,
      panel: (
        <div className='d-flex grid gap-5'>
          {
            groupedTimeRange[t].map(w => (
              <Weather 
                key={w.dateTime} 
                unit={w.weatherUnit} 
                time={w.dateTime} 
                temperature={w.temperature} 
                date={w.date}
                windSpeed={w.windSpeed}
                humidity={w.humidity}
                windDirection={w.windDirection}
              />
            ))}
        </div>
      )
    }))} />
  )
}

export default DayTabs
