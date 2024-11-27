import clsx from 'clsx';
import { Compass, Droplets, Wind } from 'lucide-react';
import React, { ReactNode } from 'react';

type WeatherDetailsProps = {
  date: string;
  formattedHours: string;
  lottie: ReactNode;
  details?: string;
  temp?: string;
  humidity: string;
  windDirection: string;
  windSpeed: string;
};

const WeatherDetails = ({
  date,
  formattedHours,
  lottie,
  details,
  temp,
  humidity,
  windDirection,
  windSpeed,
}: WeatherDetailsProps) => {
  return (
    <>
      <div className='flex justify-between items-center  w-full'>
        <h6 className='font-medium text-lg'>{date}</h6>
        <h6 className='font-bold text-xl lg:text-2xl'>{formattedHours}</h6>
      </div>
      <div className='flex flex-row space-x-2  items-center justify-center mt-2'>
        {lottie}
        <div>
          {/* <h6 className='font-bold text-xl'>{time}</h6> */}
          <h6 className='font-medium text-lg lg:text-xl'>{details}</h6>
          <h6 className='font-bold text-xl lg:text-4xl'>{temp}</h6>
        </div>
      </div>
      <div className='flex space-x-3 md:space-x-5 justify-center items-center mt-5 text-xs'>
        <div
          className={clsx(
            'p-2 flex flex-col justify-center items-center space-y-1'
          )}
        >
          <Droplets color='#FFFFFF' />
          <h6 className='font-bold'>{humidity}</h6>
          <h6 className='font-medium'>Kelembapan</h6>
        </div>
        {windDirection && (
          <>
            <div className='border-l border-white h-24' />
            <div
              className={clsx(
                'p-2 flex flex-col justify-center items-center space-y-1'
              )}
            >
              <Compass color='#FFFFFF' />
              <h6 className='font-bold'>{windDirection}</h6>
              <h6 className='font-medium'>Arah Angin</h6>
            </div>
          </>
        )}
        <div className='border-l border-white h-24' />
        <div
          className={clsx(
            'p-2 flex flex-col justify-center items-center space-y-1'
          )}
        >
          <Wind color='#FFFFFF' />
          <h6 className='font-bold'>{windSpeed}</h6>
          <h6 className='font-medium '>Kec. Angin</h6>
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
