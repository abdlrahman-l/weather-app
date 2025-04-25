'use client';
import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import IconButton from '../buttons/IconButton';

function getLocation(options = {}) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    const defaultOptions = {
      // enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    const finalOptions = { ...defaultOptions, ...options };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('User denied location access'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location unavailable'));
            break;
          case error.TIMEOUT:
            // Special handling for kCLErrorLocationUnknown
            if (error.message.includes('kCLErrorLocationUnknown')) {
              // Retry with different options
              getLocation({ ...finalOptions, enableHighAccuracy: false })
                .then(resolve)
                .catch(reject);
            } else {
              reject(new Error('Location request timed out'));
            }
            break;
          case error.UNKNOWN_ERROR:
            if (error.message.includes('kCLErrorLocationUnknown')) {
              // Wait and retry
              setTimeout(() => {
                getLocation(finalOptions).then(resolve).catch(reject);
              }, 1000);
            } else {
              reject(new Error('Unknown error occurred'));
            }
            break;
        }
      },
      finalOptions
    );
  });
}

const GeolocationButton = () => {
  const router = useRouter();
  const [coordinate, setCoordinate] = useState<{
    lat: number | null;
    lon: number | null;
  }>({
    lat: null,
    lon: null,
  });
  const { data } = useQuery({
    queryKey: [coordinate.lat, coordinate.lon],
    queryFn: async () => {
      const res = fetch(
        `/api/code?lat=${coordinate.lat}&lon=${coordinate.lon}`
      );
      return (await res).json();
    },
    enabled: !!coordinate.lat && !!coordinate.lon,
  });

  const onClickButton = () => {
    getLocation().then(({ lat, lon }) => {
      setCoordinate({
        lat,
        lon,
      });
    });
    // .catch(error => {
    // console.error("Error getting coordinates:", error.message);
    //todo handle error
    // Handle errors here
    // });
  };

  if (data) {
    router.replace(data.data);
  }

  return (
    <IconButton
      icon={MapPin}
      variant='dark'
      className='rounded-lg p-2'
      iconSize='25px'
      onClick={onClickButton}
    />
  );
};

export default GeolocationButton;
