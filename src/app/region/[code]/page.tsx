// import { getProvinceList } from '@/lib/queries';

import { WeatherResponse } from '@/lib/types';

import WeatherListGroup from '@/components/WeatherListGroup';

import { weatherBaseUrl } from '@/constant/env';
import regionCode from '@/constant/kode-wilayah.json';

// export async function generateStaticParams() {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   //@ts-ignore
//   return Object.keys(regionCode.DATA).reduce((acc, curr) => {
//     const isProvince = !curr.includes('.');

//     return !isProvince
//       ? acc
//       : [
//           ...acc,
//           {
//             code: curr,
//           },
//         ];
//   }, []);
// }

export const revalidate = 3600;

const getWeatherData = async (query: string) => {
  const url = `${weatherBaseUrl}?${query}`;

  try {
    const data = await fetch(url);
    return (await data.json()) as WeatherResponse;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({
      error,
      url,
    });
  }
};

export default async function ProvincePage({
  params,
}: {
  params: Promise<{ code: keyof (typeof regionCode)['DATA'] }>;
}) {
  const { code } = await params;
  const splitted = code.split('.');
  const query = `adm${splitted.length > 0 ? splitted.length : 1}=${code}`;

  const weatherData = await getWeatherData(query);

  return <>{weatherData && <WeatherListGroup weatherData={weatherData} />}</>;
}
