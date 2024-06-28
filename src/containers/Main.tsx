import React, { useState } from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import WeatherForm from "../components/WeatherForm";
import { getWeather, geocode } from "../services/weather";

const MainContainer: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // TODO disambiguate city by adding country, state field
      const [{ lat, lon }] = await geocode(city); // only take the first element
      const response = await getWeather(lat, lon);
      setWeather(response.current);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("City not found. Please try again.");
    }
  };

  return (
    <>
      <h1>Weather App</h1>
      <WeatherForm city={city} onCityChange={setCity} onSubmit={handleSubmit} />
      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </>
  );
};

export default MainContainer;
