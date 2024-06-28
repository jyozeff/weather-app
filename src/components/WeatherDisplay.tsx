import React from "react";
import "./WeatherDisplay.scss";

interface WeatherDisplayProps {
  weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => (
  <div className="weather-display">
    <h2>Weather Report</h2>
    <p>Temperature: {weather.temp}°C</p>
    {/* <p>Feels like: {weather.main.feels_like}°C</p>
    <p>Description: {weather.weather[0].description}</p>
    <p>Humidity: {weather.main.humidity}%</p>
    <p>Wind Speed: {weather.wind.speed} m/s</p> */}
  </div>
);

export default WeatherDisplay;
