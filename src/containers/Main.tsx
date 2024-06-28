import React, { useState } from "react";
import { geocode, getWeather } from "../services/weather";
import WeatherDisplay from "../components/WeatherDisplay";
import WeatherForm from "../components/WeatherForm";
import { useDebouncedCallback } from "use-debounce";
import "./Main.scss";

const WeatherContainer: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [locations, setLocations] = useState<GeocodeResponse[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const handleCityChangeDebounced = useDebouncedCallback((value: string) => {
    handleCityChange(value);
  }, 700);

  const handleCityChange = async (newCity: string) => {
    if (newCity.length > 2) {
      try {
        const fetchedLocations = await geocode(newCity);
        setLocations(fetchedLocations);
      } catch (err) {
        setError("Failed to fetch locations");
      }
    } else {
      setLocations([]);
      setWeather(null);
    }
  };

  const _handleCityChange = (s: string) => {
    setCity(s);
    handleCityChangeDebounced(s);
  };

  const handleLocationSelect = async (location: GeocodeResponse) => {
    setLocations([]);

    try {
      const weatherReport = await getWeather(location.lat, location.lon);
      setWeather(weatherReport?.current || null);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("Failed to fetch weather data");
    }
  };

  return (
    <div className="main">
      <h1>Weather App</h1>
      <WeatherForm
        city={city}
        locations={locations}
        onCityChange={_handleCityChange}
        onLocationSelect={handleLocationSelect}
      />
      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
};

export default WeatherContainer;
