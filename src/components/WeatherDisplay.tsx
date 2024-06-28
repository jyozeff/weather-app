import React from "react";
import "./WeatherDisplay.scss";

interface WeatherDisplayProps {
  weather: WeatherData;
  city?: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather, city }) => (
  <div className="weather-display">
    <h2>Weather in {city}</h2>
    <p>Temperature: {weather.temp}°C</p>
    <p>Feels like: {weather.feels_like}°C</p>
    <p>Humidity: {weather.humidity}%</p>
    <p>Wind Speed: {weather.wind_speed} m/s</p>
    <p>UVI: {weather.uvi}</p>
    <p>Pressure: {weather.pressure} millibars</p>
  </div>
);

export default WeatherDisplay;
