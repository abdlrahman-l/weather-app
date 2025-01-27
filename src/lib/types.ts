interface MetaResponse {
  copyright: string;
  website: string;
  url_reference: string;
}

interface ErrorResponse {
  message: string;
  code: number;
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
  timerange: Timerange[];
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
      forecast: Forecast;
    };
  };
}

export interface Province {
  id: string;
  name: string;
}

interface ProvinceListData {
  provinces: {
    data: Province[];
  };
}

export type ProvinceList = Response<ProvinceListData>;

export type ProvinceWeather = Response<DataWeather>;

export type FormattedParameter = {
  humidity: Parameter;
  maxHumidity: Parameter;
  maxTemperature: Parameter;
  minHumidity: Parameter;
  minTemperature: Parameter;
  temperature: Parameter;
  weather: Parameter;
  windDirection: Parameter;
  windSpeed: Parameter;
};

export type FormattedArea = Area & {
  paramObj: FormattedParameter;
};

export type FormattedWeather = {
  date: string;
  dateTime: string;
  temperature: Value[];
  weatherUnit: number;
  humidity: string;
  windSpeed: string;
  windDirection: string;
  temp: string;
  details: string;
};

interface Lokasi {
  adm1: string;
  adm2: string;
  adm3: string;
  adm4: string;
  provinsi: string;
  kota?: string;
  kotkab?: string;
  kecamatan: string;
  desa: string;
  lon: number;
  lat: number;
  timezone: string;
  type?: string;
}

interface Cuaca {
  datetime: string;
  t: number;
  tcc: number;
  weather: number;
  weather_desc: string;
  weather_desc_en: string;
  wd_deg: number;
  wd: string;
  wd_to: string;
  ws: number;
  hu: number;
  vs: number;
  vs_text: string;
  time_index: string;
  analysis_date: string;
  image: string;
  utc_datetime: string;
  local_datetime: string;
}

export interface DataItem {
  lokasi: Lokasi;
  cuaca: Cuaca[][];
}

export interface WeatherResponse {
  lokasi: Lokasi;
  data: DataItem[];
}
