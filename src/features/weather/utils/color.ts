import dayjs from '@/lib/date';
import { FormattedWeather } from '@/lib/types';

import {
  eveningColorCode,
  morningColorCode,
  nightColorCode,
  weatherCodeFile,
  weatherColorCode,
} from '@/constant/bmkg';

export type WeatherProps = {
  unit: keyof typeof weatherCodeFile;
  time: string;
  temperature: FormattedWeather['temperature'];
  date: string;
  humidity: string;
  windSpeed: string;
  windDirection: string;
  temp?: string;
  details?: string;
  isExpanded?: boolean;
};
export const getPrimaryColor = ({
  time,
  unit,
}: Pick<WeatherProps, 'time' | 'unit'>) => {
  const hour = dayjs(time).get('hour');
  if (hour >= 7 && hour <= 11) {
    return morningColorCode;
  } else if (hour >= 12 && hour <= 16) {
    return weatherColorCode[unit];
  } else if (hour >= 17 && hour <= 20) {
    return eveningColorCode;
  } else {
    return nightColorCode;
  }
};
