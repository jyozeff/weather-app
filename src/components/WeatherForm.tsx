import React from "react";
import "./WeatherForm.scss";

interface WeatherFormProps {
  city: string;
  locations: GeocodeResponse[];
  onCityChange: (city: string) => void;
  onLocationSelect: (location: GeocodeResponse) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({
  city,
  locations,
  onCityChange,
  onLocationSelect,
}) => (
  <div className="weather-form">
    <form>
      <input
        type="text"
        value={city}
        onChange={(e) => {
          onCityChange(e.target.value);
        }}
        placeholder="Enter city name"
        required
      />
      {locations.length > 0 && (
        <ul>
          {locations.map((location, index) => (
            <li key={index} onClick={() => onLocationSelect(location)}>
              {location.name}, {location.state || ""} {location.country}
            </li>
          ))}
        </ul>
      )}
    </form>
  </div>
);

export default WeatherForm;
