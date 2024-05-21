'use client'

import { ReactNode, useContext, useState } from "react"

import { FormattedArea, Province } from "@/lib/types"

import WeatherContext from "./WeatherContext"

export function useWeatherContext() {
  return useContext(WeatherContext)
}


/**
 * The WeatherProvider component.
 */
export default function WeatherProvider({children}: { children: ReactNode }) {
  const [province, setProvince] = useState<Province | null>(null)
  const [area, setArea] = useState<FormattedArea | null>(null)
  const [isCelcius, setIsCelcius] = useState<boolean>(true)

  return (
    <WeatherContext.Provider
      value={{
        province,
        setProvince,
        area,
        setArea,
        isCelcius,
        setIsCelcius
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
