export async function geocodeTestData(): Promise<GeocodeResponse[]> {
  return new Promise((resolve) => {
    resolve(
      JSON.parse(`
        [
          {
              "name": "Old Toronto",
              "local_names": {
                  "en": "Old Toronto"
              },
              "lat": 43.6534817,
              "lon": -79.3839347,
              "country": "CA",
              "state": "Ontario"
          },
          {
            "name": "New Toronto",
            "local_names": {
                "en": "New Toronto"
            },
            "lat": 42.6534817,
            "lon": -78.3839347,
            "country": "CA",
            "state": "Ontario"
        }
      ]
    `)
    );
  });
}

export async function getWeatherTestData(): Promise<WeatherReport> {
  return new Promise((resolve) => {
    resolve(
      JSON.parse(`
        {
          "lat":43.6535,
          "lon":-79.3839,
          "timezone":"America/Toronto",
          "timezone_offset":-14400,
          "current":{
            "dt":1719596883,
            "sunrise":1719567510,
            "sunset":1719622984,
            "temp":21.66,
            "feels_like":21.16,
            "pressure":1017,
            "humidity":49,
            "dew_point":10.49,
            "uvi":8.77,
            "clouds":19,
            "visibility":10000,
            "wind_speed":1.79,
            "wind_deg":93,
            "wind_gust":4.47,
            "weather":[
                {
                  "id":801,
                  "main":"Clouds",
                  "description":"few clouds",
                  "icon":"02d"
                }
            ]
          }
        }
      `)
    );
  });
}
