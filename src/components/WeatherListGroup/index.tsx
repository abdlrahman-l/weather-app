'use client';

import React from 'react';

import dayjs from '@/lib/date';
import { FormattedWeather, WeatherResponse } from '@/lib/types';

import DayTabs from '../DayTabs';

type WeatherListGroupProps = {
  weatherData: WeatherResponse;
};

const WeatherListGroup = ({ weatherData }: WeatherListGroupProps) => {
  const grouppedTimeRange = weatherData.data[0].cuaca
    .flatMap((d) => d)
    .reduce<{
      [key: string]: FormattedWeather[];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
    }>((acc, curr) => {
      const date = dayjs(curr.local_datetime);
      const key = `${date.format('ddd, D MMM')}`;
      return {
        ...acc,
        [key]: [
          ...(acc[key] || []),
          {
            dateTime: curr.local_datetime,
            date: date.format('dddd, D MMMM'),
            humidity: `${curr.hu}%`,
            windSpeed: `${curr.ws} km/j`,
            windDirection: `${curr.wd}-${curr.wd_to}`,
            weatherUnit: curr.weather,
            temp: `${curr.t} °C`,
            details: curr.weather_desc,
          },
        ],
      };
    }, {});

  return <DayTabs groupedTimeRange={grouppedTimeRange} />;
};

export default WeatherListGroup;
