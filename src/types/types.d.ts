interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherData {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather;
}

interface WeatherReport {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: WeatherData;
}

interface GeocodeResponse {
  name: string;
  local_names: { en: string };
  country: string;
  state: string;
  lat: number;
  lon: number;
}
