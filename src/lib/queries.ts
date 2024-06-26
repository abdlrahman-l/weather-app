import { weatherBaseUrl } from "@/constant/env";

import { FormattedArea, ProvinceList, ProvinceWeather } from "./types";
import { separateWithSpaces, slugify } from "./utils";

export const getProvinceList = async (): Promise<ProvinceList | null> => {
    try {
        const response = await fetch(weatherBaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query ProvinceListQuery {
                    provinces {
                      data {
                        id
                        name
                      }
                      meta {
                        copyright
                        url_reference
                        website
                      }
                    }
                  }
                  `,
            })
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const provinceListData = (await response.json()) as ProvinceList
        const data = provinceListData?.data?.provinces?.data

        if (data === null || data.length <= 0) {
            throw new Error('Data not found!')
        }

        return {
            ...provinceListData,
            data: {
                provinces: {
                    ...provinceListData,
                    data: provinceListData.data.provinces.data.map(d => ({
                        ...d,
                        slug: slugify(separateWithSpaces(d.id)),
                    }))
                }
            }
        }
    } catch (error) {
        console.error(error)
        return null
    }
}


export const getProvinceWeather = async (provinceSlug: string): Promise<{ provinceWeatherData: ProvinceWeather; formattedData: FormattedArea[] } | null> => {
    try {
        const provinceList = await getProvinceList();
        const provinceId = provinceList?.data?.provinces?.data?.find?.(p => p.slug === provinceSlug)?.id
        const response = await fetch(weatherBaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 86400 // Cache the weather for 1 day.
            },
            body: JSON.stringify({
                query: `
                    query Data($provinceId: String!) {
                        weather(province_id: $provinceId) {
                        data {
                            forecast {
                            domain
                            timestamp
                            area {
                                id
                                latitude
                                longitude
                                coordinate
                                type
                                region
                                level
                                description
                                domain
                                tags
                                name
                                parameter {
                                description
                                timerange {
                                    type
                                    datetime
                                    value {
                                    unit
                                    text
                                    }
                                }
                                }
                            }
                            }
                        }
                        }
                    }
                  `,
                variables: {
                    provinceId: provinceId
                }
            })
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const provinceWeatherData = (await response.json()) as ProvinceWeather

        if (provinceWeatherData === null) {
            throw new Error('Data not found!')
        }

        const areaList = provinceWeatherData.data.weather.data.forecast.area
        const formattedData = [...areaList].map<FormattedArea>(a => ({
            ...a,
            paramObj: {
                humidity: a.parameter?.[0],
                maxHumidity: a.parameter?.[1],
                maxTemperature: a.parameter?.[2],
                minHumidity: a.parameter?.[3],
                minTemperature: a.parameter?.[4],
                temperature: a.parameter?.[5],
                weather: a.parameter?.[6],
                windDirection: a.parameter?.[7],
                windSpeed: a.parameter?.[8]
            }
        }))

        return { provinceWeatherData, formattedData }
    } catch (error) {
        console.error(error)
        return null
    }
}
