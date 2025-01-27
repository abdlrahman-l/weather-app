'use client';

import React, { useState } from 'react';

import dayjs from '@/lib/date';
import { DataItem, WeatherResponse } from '@/lib/types';

import VerticalWeather from '@/features/weather/components/VerticalWeather';

import Accordion from '../Accordion';

type WeatherListGroupProps = {
  weatherData: WeatherResponse;
};

const FormattedWeather = ({
  d,
  setExpandedId,
  expandedId,
  title,
}: {
  d: DataItem;
  setExpandedId: (s: string) => void;
  expandedId: string | null;
  title: string;
}) => {
  return (
    <>
      {d.cuaca.map((weatherList, i) => {
        return (
          <React.Fragment key={i}>
            <h4 className='text-sm'>
              {dayjs(weatherList[0].local_datetime).format('dddd, D MMMM')}
            </h4>
            <div className='flex flex-nowrap overflow-x-auto space-x-4 py-5 no-scrollbar'>
              {weatherList.map((c) => {
                const date = dayjs(c.local_datetime);
                const key = date.format('dddd, D MMMM');

                return (
                  <div
                    key={c.local_datetime}
                    onClick={() =>
                      setExpandedId(`${c.local_datetime}-${title}`)
                    }
                  >
                    <VerticalWeather
                      unit={c.weather}
                      time={c.local_datetime}
                      // temperature={c.temperature}
                      date={key}
                      windSpeed={`${c.ws} km/j`}
                      humidity={`${c.hu}%`}
                      windDirection={`${c.wd}-${c.wd_to}`}
                      temp={`${c.t} °C`}
                      details={c.weather_desc}
                      isExpanded={`${c.local_datetime}-${title}` === expandedId}
                    />
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

const getTitle = (d: DataItem) =>
  d.lokasi?.desa ||
  d.lokasi?.kecamatan ||
  d.lokasi?.kotkab ||
  d.lokasi?.kota ||
  '';

const WeatherListGroup = ({ weatherData }: WeatherListGroupProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isOneLengthData = weatherData.data.length === 1;

  return (
    <div className='mt-5'>
      {isOneLengthData ? (
        <FormattedWeather
          d={weatherData.data[0]}
          setExpandedId={setExpandedId}
          expandedId={expandedId}
          title={getTitle(weatherData.data[0])}
        />
      ) : (
        <Accordion
          items={weatherData.data.map((d) => {
            const title = getTitle(d);
            return {
              title,
              content: (
                <FormattedWeather
                  d={d}
                  setExpandedId={setExpandedId}
                  expandedId={expandedId}
                  title={title}
                />
              ),
            };
          })}
        />
      )}
    </div>
  );
};

export default WeatherListGroup;
