import React from "react";

interface WeatherFormProps {
  city: string;
  locations: GeocodeResponse[];
  onCityChange: (city: string) => void;
  onLocationSelect: (location: GeocodeResponse) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({
  city,
  locations,
  onCityChange,
  onLocationSelect,
  onSubmit,
}) => (
  <div className="weather-form">
    <form onSubmit={onSubmit}>
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
        <select
          onChange={(e) => {
            const selectedLocation = locations[parseInt(e.target.value)];
            onLocationSelect(selectedLocation);
          }}
        >
          <option value="">Select a location</option>
          {locations.map((location, index) => (
            <option key={index} value={index}>
              {location.name}, {location.state || ""} {location.country}
            </option>
          ))}
        </select>
      )}
      <button type="submit">Get Weather</button>
    </form>
  </div>
);

export default WeatherForm;
