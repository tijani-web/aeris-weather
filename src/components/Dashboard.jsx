import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import LocationWeather from './LocationWeather';
import WeatherCard from './WeatherCard';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [savedCities, setSavedCities] = useState([]);
  const [unit, setUnit] = useState('metric');
  const [loadingDefaultCities, setLoadingDefaultCities] = useState(true);

  // Default cities
  const defaultCities = ['London,GB', 'New York,US', 'Tokyo,JP'];

  useEffect(() => {
    const saved = localStorage.getItem('weatherCities');
    if (saved && JSON.parse(saved).length > 0) {
      setSavedCities(JSON.parse(saved));
      setLoadingDefaultCities(false);
    } else {
      loadDefaultCities();
    }
  }, [unit]);

  const loadDefaultCities = async () => {
    const citiesData = [];

    for (const city of defaultCities) {
      const cityData = await fetchCityData(city);
      if (cityData) citiesData.push(cityData);
    }

    setSavedCities(citiesData);
    localStorage.setItem('weatherCities', JSON.stringify(citiesData));
    setLoadingDefaultCities(false);
  };

  const fetchCityData = async (cityQuery) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityQuery)}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${unit}`
      );
      if (!response.ok) return null;
      const data = await response.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityQuery)}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${unit}`
      );
      if (!forecastResponse.ok) return null;
      const forecastData = await forecastResponse.json();

      return {
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
        forecast: forecastData.list,
      };
    } catch (error) {
      console.error('Error fetching city data:', error);
      return null;
    }
  };

  const saveCity = (cityData) => {
    const cityExists = savedCities.some((city) => city.id === cityData.id);
    if (!cityExists) {
      const updatedCities = [cityData, ...savedCities]; // searched city goes first
      setSavedCities(updatedCities);
      localStorage.setItem('weatherCities', JSON.stringify(updatedCities));
    }
  };

  const removeCity = (cityId) => {
    const updatedCities = savedCities.filter((city) => city.id !== cityId);
    setSavedCities(updatedCities);
    localStorage.setItem('weatherCities', JSON.stringify(updatedCities));
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  // 🔹 Demo fake cities (to preview all themes)
  const demoCities = [
    {
      id: "rainy-1",
      name: "London",
      country: "GB",
      temp: 15,
      feels_like: 14,
      humidity: 87,
      pressure: 1013,
      wind_speed: 5,
      description: "light rain",
      icon: "10d",
      forecast: [
        { dt: Date.now() / 1000, main: { temp: 15 }, weather: [{ icon: "10d" }] },
        { dt: Date.now() / 1000 + 86400, main: { temp: 14 }, weather: [{ icon: "10d" }] },
        { dt: Date.now() / 1000 + 2 * 86400, main: { temp: 16 }, weather: [{ icon: "10d" }] },
      ],
    },
    {
      id: "snowy-1",
      name: "Reykjavik",
      country: "IS",
      temp: -2,
      feels_like: -6,
      humidity: 90,
      pressure: 1020,
      wind_speed: 8,
      description: "snow",
      icon: "13d",
      forecast: [
        { dt: Date.now() / 1000, main: { temp: -2 }, weather: [{ icon: "13d" }] },
        { dt: Date.now() / 1000 + 86400, main: { temp: -3 }, weather: [{ icon: "13d" }] },
        { dt: Date.now() / 1000 + 2 * 86400, main: { temp: -1 }, weather: [{ icon: "13d" }] },
      ],
    },
    {
      id: "thunder-1",
      name: "Jakarta",
      country: "ID",
      temp: 29,
      feels_like: 33,
      humidity: 80,
      pressure: 1009,
      wind_speed: 4,
      description: "thunderstorm",
      icon: "11d",
      forecast: [
        { dt: Date.now() / 1000, main: { temp: 29 }, weather: [{ icon: "11d" }] },
        { dt: Date.now() / 1000 + 86400, main: { temp: 28 }, weather: [{ icon: "11d" }] },
        { dt: Date.now() / 1000 + 2 * 86400, main: { temp: 30 }, weather: [{ icon: "11d" }] },
      ],
    },
    {
      id: "clear-night-1",
      name: "Cairo",
      country: "EG",
      temp: 21,
      feels_like: 20,
      humidity: 40,
      pressure: 1010,
      wind_speed: 3,
      description: "clear night sky",
      icon: "01n",
      forecast: [
        { dt: Date.now() / 1000, main: { temp: 21 }, weather: [{ icon: "01n" }] },
        { dt: Date.now() / 1000 + 86400, main: { temp: 19 }, weather: [{ icon: "01n" }] },
        { dt: Date.now() / 1000 + 2 * 86400, main: { temp: 22 }, weather: [{ icon: "01n" }] },
      ],
    },
    {
      id: "sunny-1",
      name: "Los Angeles",
      country: "US",
      temp: 28,
      feels_like: 27,
      humidity: 30,
      pressure: 1015,
      wind_speed: 2,
      description: "sunny",
      icon: "01d",
      forecast: [
        { dt: Date.now() / 1000, main: { temp: 28 }, weather: [{ icon: "01d" }] },
        { dt: Date.now() / 1000 + 86400, main: { temp: 29 }, weather: [{ icon: "01d" }] },
        { dt: Date.now() / 1000 + 2 * 86400, main: { temp: 27 }, weather: [{ icon: "01d" }] },
      ],
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-controls">
        <SearchBar onCityAdd={saveCity} />
        <button className="unit-toggle" onClick={toggleUnit}>
          °{unit === 'metric' ? 'C' : 'F'}
        </button>
      </div>

      <LocationWeather unit={unit} />

      <section className="saved-cities-section">
        <h2>Saved Cities</h2>
        {loadingDefaultCities ? (
          <div className="loading-cities">
            <p>Loading cities...</p>
          </div>
        ) : (
          <div className="weather-grid">
            {/* real saved cities */}
            {savedCities.map((city) => (
              <WeatherCard
                key={city.id}
                cityData={city}
                unit={unit}
                onRemove={() => removeCity(city.id)}
                isSaved={true}
              />
            ))}

            {/* fake demo cities to preview themes */}
            {demoCities.map((city) => (
              <WeatherCard
                key={city.id}
                cityData={city}
                unit={unit}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
