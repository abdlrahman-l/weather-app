'use client';

import React from 'react'

import { FormattedWeather } from '@/lib/types';

import Tabs from '../Tabs'
import Weather from '../Weather'

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
              <Weather key={w.dateTime} unit={w.weatherUnit} time={w.dateTime} temperature={w.temperature} />
            ))}
        </div>
      )
    }))} />
  )
}

export default DayTabs
