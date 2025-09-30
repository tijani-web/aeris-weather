import React, { useState } from 'react';
import { Search } from 'lucide-react';
import '../styles/serachbar.css';
import LoadingSpinner from './LoadingSpinner';

const SearchBar = ({ onCityAdd }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchCity = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchQuery)}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(searchQuery)}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Forecast not available');
      }

      const forecastData = await forecastResponse.json();
      
      const cityData = {
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
        forecast: forecastData.list.slice(0, 9) // 3 days data (3-hour intervals)
      };

      onCityAdd(cityData);
      setQuery('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchCity(query);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
            disabled={loading}
          />
          {loading && (
            <div className="search-spinner">
              <LoadingSpinner />
            </div>
          )}
        </div>
        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !query.trim()}
        >
          Search
        </button>
      </form>
      
      <div className="search-helper">
        Include country code for accuracy (e.g., Paris, FR)
      </div>
      
      {error && (
        <div className="search-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBar;