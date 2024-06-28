import React, { useState } from "react";
import { API_KEY, BASE_URL } from "../config/api";
import WeatherDisplay from "../components/WeatherDisplay";
import WeatherForm from "../components/WeatherForm";
import { WeatherData } from "../types/weather";

const MainContainer: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data: WeatherData = await response.json();
      setWeather(data);
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
