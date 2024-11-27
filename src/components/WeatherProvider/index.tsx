'use client';

import { ReactNode, useContext, useState } from 'react';

import WeatherContext from './WeatherContext';

export function useWeatherContext() {
  return useContext(WeatherContext);
}

/**
 * The WeatherProvider component.
 */
export default function WeatherProvider({ children }: { children: ReactNode }) {
  const [isTablist, setIsTablist] = useState<boolean>(false);

  return (
    <WeatherContext.Provider
      value={{
        isTablist,
        setIsTablist,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
