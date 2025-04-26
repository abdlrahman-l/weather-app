'use client';

import React, { useState } from 'react';

import dayjs from '@/lib/date';
import { DataItem, WeatherResponse } from '@/lib/types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import VerticalWeather from '@/features/weather/components/VerticalWeather';

// import Accordion from '../Accordion';
import { CarouselComp } from '../CarouselComp';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { CarouselItem } from '../ui/carousel';

type WeatherListGroupProps = {
  weatherData: WeatherResponse;
};

const getTitle = (d: DataItem) =>
  d.lokasi?.desa ||
  d.lokasi?.kecamatan ||
  d.lokasi?.kotkab ||
  d.lokasi?.kota ||
  '';

const FormattedWeather = ({
  d,
  isExpanded,
}: {
  d: DataItem;
  isExpanded: boolean;
}) => {
  const [tab, setTab] = useState(
    dayjs(d.cuaca[0][0].local_datetime).format('dddd, D MMMM')
  );

  return (
    <>
      <Tabs
        onValueChange={setTab}
        defaultValue={tab}
        className='w-full'
        value={tab}
      >
        <TabsList>
          {d.cuaca.map((weatherList) => {
            const formattedTitle = dayjs(weatherList[0].local_datetime).format(
              'dddd, D MMMM'
            );

            return (
              <TabsTrigger value={formattedTitle} key={formattedTitle}>
                {formattedTitle}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {d.cuaca.map((weatherList) => {
          const formattedTitle = dayjs(weatherList[0].local_datetime).format(
            'dddd, D MMMM'
          );

          return (
            <TabsContent value={formattedTitle} key={formattedTitle}>
              {d.cuaca.map((weatherList, i) => {
                return (
                  <CarouselComp key={i}>
                    {weatherList.map((c) => {
                      const date = dayjs(c.local_datetime);
                      const key = date.format('dddd, D MMMM');

                      if (formattedTitle !== key) {
                        return null;
                      }

                      return (
                        <CarouselItem
                          key={c.local_datetime}
                          className='basis-full md:basis-7/12'
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
                            isExpanded={isExpanded}
                          />
                        </CarouselItem>
                      );
                    })}
                  </CarouselComp>
                );
              })}
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
};

const WeatherListGroup = ({ weatherData }: WeatherListGroupProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isOneLengthData = weatherData.data.length === 1;

  return (
    <div className='mt-5'>
      {/* <CarouselComp /> */}
      {isOneLengthData ? (
        <FormattedWeather
          d={weatherData.data[0]}
          title={getTitle(weatherData.data[0])}
          isExpanded
        />
      ) : (
        <Accordion type='single' collapsible>
          {weatherData.data.map((d) => {
            const title = getTitle(d);
            return (
              <AccordionItem value={title} key={title}>
                <AccordionTrigger
                  className='text-base'
                  onClick={() => setExpandedId(title)}
                >
                  {title}
                </AccordionTrigger>
                <AccordionContent>
                  <FormattedWeather d={d} isExpanded={expandedId === title} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};

export default WeatherListGroup;
