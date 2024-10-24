// import { getProvinceList } from '@/lib/queries';

import { WeatherResponse } from '@/lib/types';

// import WeatherListGroup from '@/components/WeatherListGroup';
// import { weatherBaseUrl } from '@/constant/env';
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

export async function generateStaticParams() {
  return [];
}

export const revalidate = 50;

const getWeatherData = async () => {
  // const url = `${weatherBaseUrl}?${query}`;
  const data = await fetch(`http://localhost:3000/api/test`);
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

  const weatherData = await getWeatherData();

  return (
    <>
      {JSON.stringify(weatherData)}
      {JSON.stringify(query)}
      {/* <WeatherListGroup weatherData={weatherData} /> */}
    </>
  );
}
