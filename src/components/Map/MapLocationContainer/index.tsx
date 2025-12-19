'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const MapLocationCoordinate = dynamic(
  () => import('../MapLocationCoordinate'),
  {
    ssr: false,
  },
);

type MapLocationCoordinateProps = {
  lat: string;
  long: string;
};
const MapLocationContainer = ({ lat, long }: MapLocationCoordinateProps) => {
  const [isReady, setisReady] = useState(false);

  useEffect(() => {
    setisReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <div className='w-100 h-100 rounded-lg overflow-hidden'>
      <MapLocationCoordinate lat={Number(lat)} long={Number(long)} />
    </div>
  );
};

export default MapLocationContainer;
