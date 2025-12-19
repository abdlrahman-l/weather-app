'use client';
import React from 'react';

import Button from '../buttons/Button';
import { useWeatherContext } from '../WeatherProvider';

const TemperatureSelect = () => {
  const { isCelcius, setIsCelcius } = useWeatherContext();
  return (
    <Button
      onClick={() => setIsCelcius(!isCelcius)}
      size='sm'
      variant='outline'
    >
      °{!isCelcius ? 'C' : 'F'}
    </Button>
  );
};

export default TemperatureSelect;
