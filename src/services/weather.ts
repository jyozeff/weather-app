import { WEATHER_API_KEY, WEATHER_BASE_URL } from "../config/api";

export async function getWeather(city: string): Promise<WeatherReport> {
  const res = await fetch(
    `${WEATHER_BASE_URL}?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
  );

  const { data, errors } = await res.json();
  if (!res.ok) {
    throw new Error(errors?.map((e: any) => e.message).join("\n") ?? "unknown");
  }

  return data;
}
