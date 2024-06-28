import React from "react";
import { WeatherData } from "../types/weather";

interface WeatherDisplayProps {
  weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => (
  <div className="weather-info">
    <h2>
      {weather.name}, {weather.sys.country}
    </h2>
    <p>Temperature: {weather.main.temp}°C</p>
    <p>Feels like: {weather.main.feels_like}°C</p>
    <p>Description: {weather.weather[0].description}</p>
    <p>Humidity: {weather.main.humidity}%</p>
    <p>Wind Speed: {weather.wind.speed} m/s</p>
  </div>
);

export default WeatherDisplay;
