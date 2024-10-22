// import { getProvinceList } from '@/lib/queries';

import { WeatherResponse } from '@/lib/types';

import WeatherListGroup from '@/components/WeatherListGroup';

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

const getWeatherData = async (query: string) => {
  const url = `${weatherBaseUrl}?${query}`;
  const data = await fetch(url);
  const weatherData = (await data.json()) as WeatherResponse;

  return weatherData;
};

export default async function ProvincePage({
  params,
}: {
  params: { code: keyof (typeof regionCode)['DATA'] };
}) {
  const splitted = params.code.split('.');
  const query = `adm${splitted.length > 0 ? splitted.length : 1}=${
    params.code
  }`;

  const weatherData = await getWeatherData(query);

  return (
    <>
      <WeatherListGroup weatherData={weatherData} />
    </>
  );
}
