'use client';

import React, { Fragment, useMemo, useState } from 'react';

import dayjs from '@/lib/date';
import { FormattedWeather, WeatherResponse } from '@/lib/types';

import VerticalWeather from '@/features/weather/components/VerticalWeather';

type WeatherListGroupProps = {
  weatherData: WeatherResponse;
};

const WeatherListGroup = ({ weatherData }: WeatherListGroupProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const grouppedTimeRange = useMemo(
    () =>
      weatherData.data[0].cuaca
        .flatMap((d) => d)
        .reduce<{
          [key: string]: FormattedWeather[];

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
        }>((acc, curr) => {
          const date = dayjs(curr.local_datetime);
          const key = date.format('dddd, D MMMM');
          return {
            ...acc,
            [key]: [
              ...(acc[key] || []),
              {
                dateTime: curr.local_datetime,
                date: key,
                humidity: `${curr.hu}%`,
                windSpeed: `${curr.ws} km/j`,
                windDirection: `${curr.wd}-${curr.wd_to}`,
                weatherUnit: curr.weather,
                temp: `${curr.t} °C`,
                details: curr.weather_desc,
              },
            ],
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, {}),
    []
  );

  return (
    <div className='mt-5'>
      {Object.keys(grouppedTimeRange).map((t) => (
        <Fragment key={t}>
          <h4 className='text-sm'>{t}</h4>
          <div className='flex flex-nowrap overflow-x-auto space-x-4 py-5 no-scrollbar'>
            {grouppedTimeRange[t].map((w) => (
              <div key={w.dateTime} onClick={() => setExpandedId(w.dateTime)}>
                <VerticalWeather
                  unit={w.weatherUnit}
                  time={w.dateTime}
                  temperature={w.temperature}
                  date={w.date}
                  windSpeed={w.windSpeed}
                  humidity={w.humidity}
                  windDirection={w.windDirection}
                  temp={w.temp}
                  details={w.details}
                  isExpanded={w.dateTime === expandedId}
                />
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default WeatherListGroup;
