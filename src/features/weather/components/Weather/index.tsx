'use client';

import clsx from 'clsx';
import { Compass, Droplets, Wind } from 'lucide-react';
import React from 'react';

import { isEvening, isNight } from '@/lib/date';
import dayjs from '@/lib/date';
import { FormattedWeather } from '@/lib/types';

import {
  eveningColorCode,
  nightColorCode,
  weatherCodeFile,
  weatherColorCode,
} from '@/constant/bmkg';
import useModalState from '@/helpers/hooks/useModalState';

import useLottieSourceFile from '../../hooks/useLottieSourceFile';
import LottieAnimation from '../../../../components/LottieAnimation';
import Modal from '../../../../components/Modal';

// use dynamic ssr false import due to react leaflet is only working in the client
// const MapLocationContainer = dynamic(() => import("@/components/Map/MapLocationContainer"), {
//     ssr: false,
//     loading: () => <p>loadinggg....</p>
// })

type WeatherProps = {
  unit: keyof typeof weatherCodeFile;
  time: string;
  temperature: FormattedWeather['temperature'];
  date: string;
  humidity: string;
  windSpeed: string;
  windDirection: string;
  temp?: string;
  details?: string;
};

const getPrimaryColor = ({
  time,
  unit,
}: Pick<WeatherProps, 'time' | 'unit'>) => {
  if (isEvening(time)) return eveningColorCode;
  if (isNight(time)) return nightColorCode;
  return weatherColorCode[unit];
};

const Weather = ({
  unit,
  time,
  date,
  humidity,
  windSpeed,
  windDirection,
  temp,
  details,
}: WeatherProps) => {
  const { isOpenModal, openModal, closeModal } = useModalState();

  const lottieNameFile = useLottieSourceFile(time, unit);

  const primaryColor = getPrimaryColor({ time, unit });
  const bgColor = primaryColor?.split?.('-');
  const formattedHours = dayjs(time).format('HH:mm');

  return (
    <>
      <div
        onClick={openModal}
        className={clsx(
          'h-20 flex justify-between items-center shadow-lg rounded-lg p-3 cursor-pointer',
          `${bgColor?.[0]}`,
          `bg-primary-${bgColor?.[1]}`,
          'transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
        )}
      >
        <div className='flex flex-start items-center space-x-2'>
          <LottieAnimation
            importAnimation={(cb) =>
              import(`src/lib/lotties/${lottieNameFile}.json`).then(cb)
            }
            lottieProps={{
              style: {
                height: 60,
              },
              interactivity: {
                mode: 'cursor',
                actions: [
                  {
                    position: { x: [0, 1], y: [0, 1] },
                    type: 'play',
                    frames: [0, 180],
                  },
                  {
                    position: { x: -1, y: -1 },
                    type: 'stop',
                    frames: [0, 180],
                  },
                ],
              },
            }}
          />

          <h6 className='font-medium text-lg text-white'>{`${temp} / ${details}`}</h6>
        </div>
        <h6 className='font-medium text-2xl text-white'>{formattedHours}</h6>
      </div>
      <Modal
        isOpen={isOpenModal}
        onClose={closeModal}
        containerClassname={clsx(
          'min-h-80',
          `${bgColor?.[0]}`,
          `bg-primary-${bgColor?.[1]}`
        )}
      >
        <div>
          <div className='flex justify-between items-center'>
            <h6 className='font-medium text-lg'>{date}</h6>
            <h6 className='font-bold text-2xl'>{formattedHours}</h6>
          </div>
          <div className='flex flex-row space-x-2 text-white items-center justify-center mt-2'>
            <LottieAnimation
              importAnimation={(cb) =>
                import(`src/lib/lotties/${lottieNameFile}.json`).then(cb)
              }
              lottieProps={{
                style: {
                  height: 120,
                },
                autoplay: true,
              }}
            />
            <div>
              {/* <h6 className='font-bold text-xl'>{time}</h6> */}
              <h6 className='font-medium text-xl'>{details}</h6>
              <h6 className='font-bold text-4xl'>{temp}</h6>
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
              <h6 className='font-medium'>Kec. Angin</h6>
            </div>
          </div>
          {/* {
                        area?.longitude && area.latitude && (
                            <div className='mt-5'>
                                <MapLocationContainer lat={area.latitude} long={area.longitude} />
                            </div>
                        )
                    } */}
        </div>
      </Modal>
    </>
  );
};

export default Weather;
