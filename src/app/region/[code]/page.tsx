// import { getProvinceList } from '@/lib/queries';

import { notFound } from 'next/navigation';

import dayjs from '@/lib/date';
import { FormattedWeather, WeatherResponse } from '@/lib/types';

import DayTabs from '@/components/DayTabs';

import { weatherBaseUrl } from '@/constant/env';
import regionCode from '@/constant/kode-wilayah.json';

export async function generateStaticParams() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return Object.keys(regionCode.DATA).reduce((acc, curr) => {
    const isProvince = !curr.includes('.');

    return !isProvince
      ? acc
      : [
          ...acc,
          {
            code: curr,
          },
        ];
  }, []);
}

export const revalidate = 86400;

export default async function ProvincePage({
  params,
}: {
  params: { code: keyof (typeof regionCode)['DATA'] };
}) {
  const splitted = params.code.split('.');
  const query = `adm${splitted.length > 0 ? splitted.length : 1}=${
    params.code
  }`;
  const url = `${weatherBaseUrl}?${query}`;
  const data = await fetch(url);
  const weatherData = (await data.json()) as WeatherResponse;

  const grouppedTimeRange = weatherData.data[0].cuaca
    .flatMap((d) => d)
    .reduce<{
      [key: string]: FormattedWeather[];
    }>((acc, curr) => {
      const date = dayjs(curr.local_datetime);
      const key = `${date.format('ddd, D MMM')}`;
      try {
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
      } catch (error) {
        notFound();
      }
    }, {});

  return (
    <>
      <DayTabs groupedTimeRange={grouppedTimeRange} />
    </>
  );
}
