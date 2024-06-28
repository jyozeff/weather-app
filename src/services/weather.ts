import {
  WEATHER_API_KEY,
  WEATHER_BASE_URL,
  GEOCODE_BASE_URL,
} from "../config/api";
// import { getWeatherTestData, geocodeTestData } from "./testData";

async function handleResponse(res: Response) {
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.cod + ": " + json?.message);
  }

  return json;
}

export async function getWeather(
  latitue: number,
  longitue: number
): Promise<WeatherReport> {
  console.log("API call to OpenWeather!");
  const res = await fetch(
    `${WEATHER_BASE_URL}?lat=${latitue}&lon=${longitue}&units=metric&appid=${WEATHER_API_KEY}`
  );

  return await handleResponse(res);

  // to use test data instead of real data
  // return getWeatherTestData();
}

export async function geocode(city: string): Promise<GeocodeResponse[]> {
  // TODO uncomment to make actual api calls
  console.log("API call to OpenWeather!");
  const res = await fetch(
    `${GEOCODE_BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}`
  );

  return await handleResponse(res);

  // to use test data instead of real data
  // return geocodeTestData();
}
