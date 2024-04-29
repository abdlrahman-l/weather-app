'use client'

import {ReactNode, createContext, useContext, useState} from 'react'

const WeatherContext = createContext({} as ServerWeatherContextProps)

// Create a custom hook to use the context.
export function useWeatherContext() {
  return useContext(WeatherContext)
}

/**
 * The WeatherProvider component.
 */
export default function WeatherProvider({children}: { children: ReactNode }) {
  const [location, setLocation] = useState('Enterprise, AL')
  const [unit, setUnit] = useState('imperial')

  return (
    <WeatherContext.Provider
      value={{
        location,
        setLocation,
        unit,
        setUnit
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
