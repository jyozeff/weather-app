import React from "react";
import "./WeatherForm.scss";

interface WeatherFormProps {
  city: string;
  locations: GeocodeResponse[];
  onCityChange: (city: string) => void;
  onLocationSelect: (location: GeocodeResponse) => void;
  onSubmit: () => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({
  city,
  locations,
  onCityChange,
  onLocationSelect,
  onSubmit,
}) => {
  const handleSubmit = (e: any) => {
    e?.preventDefault();
    onSubmit();
  };

  return (
    <div className="weather-form">
      <form onSubmit={handleSubmit}>
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
        <button>Search</button>
      </form>
    </div>
  );
};

export default WeatherForm;
