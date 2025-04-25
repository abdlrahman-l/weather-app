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

export const getWeatherGradient = ({
  time,
  unit,
}: {
  time: string;
  unit: number;
}): string => {
  const hour = dayjs(time).hour();
  const weatherColor = weatherColorCode[unit] || 'gray-500';

  if (hour >= 7 && hour <= 11) {
    // Morning: soft sky → weather hue
    return `bg-gradient-to-br from-${morningColorCode} to-${weatherColor}`;
  } else if (hour >= 12 && hour <= 16) {
    // Afternoon: use a two-tone weather gradient
    // you can tweak these “to-” stops per code if you like
    return `bg-gradient-to-br from-${weatherColor} to-${weatherColor}-200`;
  } else if (hour >= 17 && hour <= 20) {
    // Evening: richer sky → weather hue
    return `bg-gradient-to-br from-${eveningColorCode} to-${weatherColor}`;
  } else {
    // Night: deep night sky → weather hue
    return `bg-gradient-to-br from-${nightColorCode} to-${weatherColor}`;
  }
};
