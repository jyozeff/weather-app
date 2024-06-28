import React from "react";

interface WeatherFormProps {
  city: string;
  onCityChange: (city: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({
  city,
  onCityChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={city}
      onChange={(e) => onCityChange(e.target.value)}
      placeholder="Enter city name"
      required
    />
    <button type="submit">Get Weather</button>
  </form>
);

export default WeatherForm;
