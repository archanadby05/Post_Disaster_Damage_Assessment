import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/DashboardSidebar.css';

const DashboardSidebar = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const lat = 26.7;
  const lon = 67.8;
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("Weather API key is missing.");
      return;
    }

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, [lat, lon, apiKey]);

  return (
    <div className="dashboard-sidebar">
      <h2>Weather Report</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!weather && !error && <p className="text-muted">Loading weather...</p>}
      {weather && (
        <>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Location</h5>
              <p>{weather.name}, {weather.sys?.country}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Temperature</h5>
              <p>{weather.main?.temp} °C</p>
              <p>
                <strong>Condition:</strong> {weather.weather?.[0]?.description}
                {weather.weather?.[0]?.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="Weather icon"
                    style={{ verticalAlign: 'middle', marginLeft: '8px' }}
                  />
                )}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Humidity & Pressure</h5>
              <p>Humidity: {weather.main?.humidity}%</p>
              <p>Pressure: {weather.main?.pressure} hPa</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Wind</h5>
              <p>{weather.wind?.speed} m/s at {weather.wind?.deg}°</p>
              <p>Cloudiness: {weather.clouds?.all}%</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Rain & Sun</h5>
              <p>Rain (last 1h): {weather.rain?.['1h'] ? `${weather.rain['1h']} mm` : 'No rain'}</p>
              <p>Sunrise: {new Date(weather.sys?.sunrise * 1000).toLocaleTimeString()}</p>
              <p>Sunset: {new Date(weather.sys?.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSidebar;
