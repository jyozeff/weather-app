import React, { useState } from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import WeatherForm from "../components/WeatherForm";
import { getWeather } from "../services/weather";

const MainContainer: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await getWeather(city);
      setWeather(response.data[0]); // only take the first
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
