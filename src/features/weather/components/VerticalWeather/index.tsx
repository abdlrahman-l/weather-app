import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';

import LottieAnimation from '@/components/LottieAnimation';

import WeatherDetails from './WeatherDetails';
import useLottieSourceFile from '../../hooks/useLottieSourceFile';
import { getWeatherGradient, WeatherProps } from '../../utils/color';

const VerticalWeather = ({
  unit,
  time,
  date,
  humidity,
  windSpeed,
  windDirection,
  temp,
  details,
  isExpanded,
}: WeatherProps) => {
  const lottieNameFile = useLottieSourceFile(time, unit);
  const bgColor = getWeatherGradient({ time, unit });
  const formattedHours = dayjs(time).format('HH:mm');

  const lottie = (
    <LottieAnimation
      importAnimation={(cb) =>
        import(`src/lib/lotties/${lottieNameFile}.json`).then(cb)
      }
      lottieProps={{
        style: {
          height: isExpanded ? 120 : 60,
        },
        autoplay: false,
      }}
      playAnimation={isExpanded}
    />
  );

  return (
    <div
      className={clsx(
        'min-w-20 min-h-14 lg:min-h-[300px] flex flex-col justify-between items-center shadow-lg rounded-lg p-3 cursor-pointer',
        bgColor,
        ` text-white whitespace-nowrap`,
        isExpanded && 'min-w-[250px]',
        'transition-all duration-700 ease-in-out overflow-hidden '
      )}
    >
      {isExpanded ? (
        <WeatherDetails
          date={date}
          formattedHours={formattedHours}
          lottie={lottie}
          details={details}
          temp={temp}
          humidity={humidity}
          windDirection={windDirection}
          windSpeed={windSpeed}
        />
      ) : (
        <>
          <div className={clsx('flex flex-col items-center')}>
            {lottie}
            <h6 className='font-semibold text-md '>{`${temp}`}</h6>
          </div>
          <h6 className='font-bold text-md '>{formattedHours}</h6>
        </>
      )}
    </div>
  );
};

export default VerticalWeather;
