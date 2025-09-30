import React, { useState, useEffect } from 'react';
import { X, Thermometer, Droplets, Wind, Gauge } from 'lucide-react';
import { getWeatherIcon, getWeatherTheme } from '../utils/weathericons.jsx';
import '../styles/weatherCard.css';

const WeatherCard = ({ cityData, unit, onRemove, isCurrentLocation = false }) => {
  const {
    name,
    country,
    temp,
    feels_like,
    humidity,
    pressure,
    wind_speed,
    description,
    icon,
    forecast,
  } = cityData;

  const [thunderActive, setThunderActive] = useState(false);
  const [lightningKey, setLightningKey] = useState(0);

  // Epic thunderstorm effects
useEffect(() => {
  if (icon.includes('thunderstorm') || description.includes('thunderstorm')) {
    const thunderInterval = setInterval(() => {
      setThunderActive(true);
      setLightningKey(prev => prev + 1);
      
      setTimeout(() => {
        setThunderActive(false);
      }, 300); // Short lightning flash
      
    }, Math.random() * 5000 + 2000); // 2-7 seconds between strikes

    return () => clearInterval(thunderInterval);
  }
}, [icon, description]);


  const formatTemperature = (temp) => Math.round(temp);

  const getDailyForecast = () => {
    if (!forecast || forecast.length === 0) return [];

    const daysMap = new Map();
    forecast.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en', { weekday: 'short' });
      if (!daysMap.has(day)) {
        daysMap.set(day, item);
      }
    });

    return Array.from(daysMap.values()).slice(0, 3);
  };

  const dailyForecast = getDailyForecast();
  const weatherTheme = getWeatherTheme(icon);

  const renderWeatherEffects = () => {
    switch(weatherTheme) {
      case 'sunny':
        return (
          <>
            <div className="sun-animation"></div>
            <div className="sun-rays"></div>
          </>
        );
      case 'cloudy':
        return (
          <>
            <div className="cloud-layer-1"></div>
            <div className="cloud-layer-2"></div>
          </>
        );
      case 'rainy':
        return (
          <>
            <div className="rain-container">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="rain-drop"></div>
              ))}
            </div>
            <div className="rain-streaks"></div>
            <div className="rain-mist"></div>
          </>
        );
      case 'snowy':
        return (
          <>
            <div className="snow-container">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="snowflake"></div>
              ))}
            </div>
            <div className="snow-wind"></div>
          </>
        );
      case 'thunderstorm':
       return (
         <>
           <div className="storm-clouds"></div>
           <div className="rain-heavy"></div>
           {thunderActive && (
             <div className="lightning-container">
               <div key={lightningKey} className="lightning-bolt"></div>
               <div key={lightningKey + 1} className="lightning-bolt"></div>
             </div>
           )}
         </>
       );

      case 'foggy':
        return (
          <>
            <div className="fog-layer-1"></div>
            <div className="fog-layer-2"></div>
          </>
        );
      case 'clear-night':
        return (
          <>
            <div className="moon-glow"></div>
            <div className="moon-disk"></div>
            <div className="star-container">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="star"></div>
              ))}
            </div>
            <div className="shooting-star"></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`weather-card ${weatherTheme}`}>
      {/* Dynamic Weather Effects */}
      {renderWeatherEffects()}

      {!isCurrentLocation && (
        <button className="remove-button" onClick={onRemove}>
          <X size={18} />
        </button>
      )}

      <div className="weather-header">
        <div className="location">
          <h3>
            {name}, {country}
          </h3>
          {isCurrentLocation && <span className="current-location-badge">Current Location</span>}
        </div>
        <div className="weather-icon">{getWeatherIcon(icon)}</div>
      </div>

      <div className="weather-main">
        <div className="temperature">
          {formatTemperature(temp)}°{unit === 'metric' ? 'C' : 'F'}
        </div>
        <div className="description">{description.charAt(0).toUpperCase() + description.slice(1)}</div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <Thermometer size={18} />
          <span>Feels like: {formatTemperature(feels_like)}°</span>
        </div>
        <div className="detail-item">
          <Droplets size={18} />
          <span>Humidity: {humidity}%</span>
        </div>
        <div className="detail-item">
          <Wind size={18} />
          <span>
            Wind: {wind_speed} {unit === 'metric' ? 'm/s' : 'mph'}
          </span>
        </div>
        <div className="detail-item">
          <Gauge size={18} />
          <span>Pressure: {pressure} hPa</span>
        </div>
      </div>

      {dailyForecast.length > 0 && (
        <div className="weather-forecast">
          <h4>3-Day Forecast</h4>
          <div className="forecast-grid">
            {dailyForecast.map((day, index) => (
              <div key={index} className="forecast-item">
                <div className="forecast-day">
                  {new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'short' })}
                </div>
                <div className="forecast-icon">{getWeatherIcon(day.weather[0].icon)}</div>
                <div className="forecast-temp">{formatTemperature(day.main.temp)}°</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;