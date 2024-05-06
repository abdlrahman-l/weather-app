'use client'

import { ReactNode, useContext, useState } from "react"

import { Province } from "@/lib/types"

import WeatherContext from "./WeatherContext"

export function useWeatherContext() {
  return useContext(WeatherContext)
}


/**
 * The WeatherProvider component.
 */
export default function WeatherProvider({children}: { children: ReactNode }) {
  const [province, setProvince] = useState<Province | null>(null)

  console.log({
    province
  })

  return (
    <WeatherContext.Provider
      value={{
        province,
        setProvince,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}
