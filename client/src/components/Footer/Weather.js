import { useEffect, useState } from 'react';
import './Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'f80eb5c0782e480881861759251803';
  const DEFAULT_LOCATION = 'Diu';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${DEFAULT_LOCATION}&aqi=yes`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div>
      {error ? (
        <p className="weather-error">{error}</p>
      ) : weather ? (
        <div>
          <p><strong>Location:</strong> {weather.location.name}, {weather.location.country}</p>
          <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
          <p><strong>Condition:</strong> {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="Weather icon" />
          <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.current.wind_kph} kph</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;
