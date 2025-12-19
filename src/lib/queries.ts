import { weatherBaseUrl } from '@/constant/env';

import { Area, FormattedArea, ProvinceList, ProvinceWeather } from './types';

export const getProvinceList = async (): Promise<
  ProvinceList['data']['provinces'] | null
> => {
  try {
    const response = await fetch(`${weatherBaseUrl}/provinces`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const provinceListData =
      (await response.json()) as ProvinceList['data']['provinces'];
    const data = provinceListData?.data;

    if (data === null || data.length <= 0) {
      throw new Error('Data not found!');
    }

    return provinceListData;
  } catch (error) {
    return null;
  }
};

export const getProvinceWeather = async (
  provinceId: string,
): Promise<{
  formattedData: FormattedArea[];
} | null> => {
  try {
    const response = await fetch(`${weatherBaseUrl}/weather/${provinceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 86400, tags: ['weather', provinceId] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const provinceWeatherData =
      (await response.json()) as ProvinceWeather['data']['weather'];

    if (provinceWeatherData === null) {
      throw new Error('Data not found!');
    }

    const areaList = provinceWeatherData.data.forecast.area;
    const formattedData = [...areaList].map<FormattedArea>((a) => ({
      ...a,
      paramObj: {
        humidity: a.parameter?.[0],
        maxHumidity: a.parameter?.[1],
        maxTemperature: a.parameter?.[2],
        minHumidity: a.parameter?.[3],
        minTemperature: a.parameter?.[4],
        temperature: a.parameter?.[5],
        weather: a.parameter?.[6],
        windDirection: a.parameter?.[7],
        windSpeed: a.parameter?.[8],
      },
    }));

    return { formattedData };
  } catch (error) {
    return null;
  }
};

export const getProvinceDescriptionId = async (
  provinceId: string,
): Promise<{
  areaList: Area[];
} | null> => {
  try {
    const response = await fetch(`${weatherBaseUrl}/weather/${provinceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 86400, tags: ['weather', provinceId] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const provinceWeatherData =
      (await response.json()) as ProvinceWeather['data']['weather'];

    if (provinceWeatherData === null) {
      throw new Error('Data not found!');
    }

    const areaList = provinceWeatherData.data.forecast.area;

    return { areaList };
  } catch (error) {
    return null;
  }
};
