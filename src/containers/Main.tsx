import React, { useState } from "react";
import { geocode, getWeather } from "../services/weather";
import WeatherDisplay from "../components/WeatherDisplay";
import WeatherForm from "../components/WeatherForm";
import { useDebouncedCallback } from "use-debounce";

const WeatherContainer: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [locations, setLocations] = useState<GeocodeResponse[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<GeocodeResponse | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const handleCityChangeDebounced = useDebouncedCallback((value: string) => {
    handleCityChange(value);
  }, 1000);

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
    }
  };

  const handleLocationSelect = (location: GeocodeResponse) => {
    setSelectedLocation(location);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedLocation) {
      try {
        const weatherReport = await getWeather(
          selectedLocation.lat,
          selectedLocation.lon
        );
        setWeather(weatherReport?.current || null);
        setError("");
      } catch (err) {
        setWeather(null);
        setError("Failed to fetch weather data");
      }
    } else {
      setError("Please select a location");
    }
  };

  return (
    <div className="main">
      <h1>Weather App</h1>
      <WeatherForm
        city={city}
        locations={locations}
        onCityChange={(s: string) => {
          setCity(s);
          handleCityChangeDebounced(s);
        }}
        onLocationSelect={handleLocationSelect}
        onSubmit={handleSubmit}
      />
      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
};

export default WeatherContainer;
