import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import Spinner from './LoadingSpinner';
import '../styles/LocationWeather.css';

const LocationWeather = ({ unit }) => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${unit}`
          );

          if (!response.ok) {
            throw new Error('Unable to fetch weather data');
          }

          const data = await response.json();
          
          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${unit}`
          );

          if (!forecastResponse.ok) {
            throw new Error('Unable to fetch forecast data');
          }

          const forecastData = await forecastResponse.json();

          setLocationData({
            id: data.id,
            name: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            forecast: forecastData.list
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }, [unit]);

  if (loading) {
    return (
      <section className="location-weather">
        <h2>Your Location</h2>
        <div className="location-loading">
          <Spinner />
          <p>Detecting your location...</p>
        </div>
      </section>
    );
  }

  if (error && !locationData) {
    return (
      <section className="location-weather">
        <h2>Your Location</h2>
        <div className="location-error">
          <p>{error}</p>
          <small>Enable location access or search for your city manually</small>
        </div>
      </section>
    );
  }

  if (!locationData) {
    return null;
  }

  return (
    <section className="location-weather">
      <h2>Your Location</h2>
      <WeatherCard
        cityData={locationData}
        unit={unit}
        isCurrentLocation={true}
      />
    </section>
  );
};

export default LocationWeather;