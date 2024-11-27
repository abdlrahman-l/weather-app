'use client';
import { createContext } from 'react';

type WeatherContextType = {
  setIsTablist: (v: boolean) => void;
  isTablist: boolean;
};

export default createContext<WeatherContextType>({
  isTablist: false,
  setIsTablist: () => {
    return;
  },
});
