import React, { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiStar, FiX } from 'react-icons/fi';
import '../styles/WeatherDashboard.css';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const API_KEY = 'b6fd43b5a1c61302e37f72f79c2055ba';
  const WEATHER_API = 'https://api.openweathermap.org/data/2.5';

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavorites(savedFavorites);
    
    // Load default city
    if (savedFavorites.length > 0) {
      fetchWeather(savedFavorites[0]);
    } else {
      getLocationWeather();
    }
  }, []);

  // Get weather by current location
  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      }, () => {
        fetchWeather('London'); // Default city
      });
    } else {
      fetchWeather('London');
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${WEATHER_API}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setCity(data.name);
        fetchForecast(lat, lon);
        checkFavorite(data.name);
      }
    } catch (err) {
      setError('Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by city name
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${WEATHER_API}/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setCity(data.name);
        fetchForecast(data.coord.lat, data.coord.lon);
        checkFavorite(data.name);
      } else {
        setError('City not found');
      }
    } catch (err) {
      setError('Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  // Fetch 7-day forecast
  const fetchForecast = async (lat, lon) => {
    try {
      const response = await fetch(
        `${WEATHER_API}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      
      // Get one forecast per day (every 8th item = 24 hours)
      const dailyForecast = data.list.filter((_, index) => index % 8 === 0).slice(0, 7);
      setForecast(dailyForecast);
    } catch (err) {
      console.error('Forecast error:', err);
    }
  };

  // Check if city is favorite
  const checkFavorite = (cityName) => {
    const saved = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setIsFavorite(saved.includes(cityName));
  };

  // Add/Remove favorite
  const toggleFavorite = () => {
    let saved = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    if (isFavorite) {
      saved = saved.filter(c => c !== city);
    } else {
      saved.push(city);
    }
    localStorage.setItem('favoriteCities', JSON.stringify(saved));
    setFavorites(saved);
    setIsFavorite(!isFavorite);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  // Get weather icon
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="weather-dashboard">
      {/* Header */}
      <div className="weather-header">
        <h1 className="weather-title">🌤️ Weather Dashboard</h1>
        
        {/* Search Bar */}
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <FiSearch /> Search
          </button>
          <button
            type="button"
            className="location-btn"
            onClick={getLocationWeather}
            title="Get current location weather"
          >
            <FiMapPin /> Current Location
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Loading */}
      {loading && <div className="loading">Loading weather data...</div>}

      {/* Current Weather */}
      {weather && !loading && (
        <div className="weather-container">
          {/* Main Weather Card */}
          <div className="weather-card main-weather">
            <div className="weather-card-header">
              <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
              <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <FiStar />
              </button>
            </div>

            <div className="weather-main">
              <img
                src={getWeatherIcon(weather.weather[0].icon)}
                alt={weather.weather[0].description}
                className="weather-icon"
              />
              <div className="temperature-section">
                <span className="temperature">{Math.round(weather.main.temp)}°C</span>
                <span className="weather-description">{weather.weather[0].description}</span>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-label">Feels Like</span>
                <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{weather.main.pressure} hPa</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{weather.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Visibility</span>
                <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">UV Index</span>
                <span className="detail-value">~{Math.round(weather.main.temp / 10)}</span>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="forecast-section">
            <h3 className="forecast-title">7-Day Forecast</h3>
            <div className="forecast-grid">
              {forecast.map((day, index) => (
                <div key={index} className="forecast-card">
                  <div className="forecast-date">{formatDate(day.dt)}</div>
                  <img
                    src={getWeatherIcon(day.weather[0].icon)}
                    alt={day.weather[0].description}
                    className="forecast-icon"
                  />
                  <div className="forecast-temps">
                    <span className="forecast-temp-high">{Math.round(day.main.temp_max)}°</span>
                    <span className="forecast-temp-low">{Math.round(day.main.temp_min)}°</span>
                  </div>
                  <div className="forecast-description">{day.weather[0].main}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Favorite Cities */}
      {favorites.length > 0 && (
        <div className="favorites-section">
          <h3 className="favorites-title">⭐ Favorite Cities</h3>
          <div className="favorites-grid">
            {favorites.map((fav, index) => (
              <button
                key={index}
                className="favorite-city-btn"
                onClick={() => {
                  setCity(fav);
                  fetchWeather(fav);
                }}
              >
                {fav}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;