import { FormattedWeather } from '@/lib/types';

import { useWeatherContext } from '@/components/WeatherProvider';

const useUnitTemperature = (temperature: FormattedWeather['temperature']) => {
  const { isCelcius } = useWeatherContext();

  const selectedUnitTemp = temperature[isCelcius ? 0 : 1];
  return `${selectedUnitTemp.text} °${selectedUnitTemp.unit}`;
};

export default useUnitTemperature;
