interface MetaResponse {
    copyright: string,
    website: string,
    url_reference: string
}

interface ErrorResponse {
    message: string,
    code: number
}

interface Response<T> {
    meta: MetaResponse;
    data: T;
    error: ErrorResponse;
}


interface Value {
    unit: string;
    text: string;
}

export interface Timerange {
    type: string;
    datetime: string;
    value: Value[];
}

export interface Parameter {
    description: string;
    timerange: Timerange[]
}

export interface Area {
    id: string;
    latitude: string;
    longitude: string;
    coordinate: string;
    type: string;
    region: string;
    level: string;
    description: string;
    domain: string;
    tags: string;
    name: string[];
    parameter: Parameter[];
}

interface Forecast {
    domain: string;
    timestamp: string;
    area: Area[];
}

interface DataWeather {
    weather: {
        data: {
            forecast: Forecast
        }
    }
}

export interface Province {
    id: string,
    name: string
}

interface ProvinceListData {
    provinces: {
        data: Province[]
    }
}

export type ProvinceList = Response<ProvinceListData>

export type ProvinceWeather = Response<DataWeather>

export type FormattedParameter = {
    humidity: Parameter,
    maxHumidity: Parameter,
    maxTemperature: Parameter,
    minHumidity: Parameter,
    minTemperature: Parameter,
    temperature: Parameter,
    weather: Parameter,
    windDirection: Parameter,
}

export type FormattedArea = Area & {
    paramObj: FormattedParameter
}

export type FormattedWeather = {
    dateTime: string;
    temperature: Value[];
    weatherUnit: number;
}
