// import { getProvinceList } from '@/lib/queries';

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

export const revalidate = 40;

const getWeatherData = async () => {
  const url = 'https://official-joke-api.appspot.com/random_joke';
  const data = await fetch(url);
  const weatherData = await data.json();

  return weatherData;
};

export default async function ProvincePage({
  params,
}: {
  params: { code: keyof (typeof regionCode)['DATA'] };
}) {
  const weatherData = await getWeatherData();

  return (
    <>
      {' '}
      {JSON.stringify({
        code: params.code,
        weatherData,
      })}
    </>
  );
}
