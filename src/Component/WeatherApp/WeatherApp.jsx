import "./responsive.css";
import { useState, useEffect } from "react";
import SetIcon from "./SetIcon";
import { Cloud, Wind, Droplets, Eye, Gauge, Navigation, CloudRain, Sun } from 'lucide-react';

export default function WeatherApp() {
  const KEY = import.meta.env.VITE_API_KEY;

  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState("London");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    location: "London",
    weatherIcon: "01d",
    temperature: 15,
    weatherType: "Clear",
    description: "clear sky",
    feelsLike: 14,
    windSpeed: 5,
    pressure: 1013,
    humidity: 60,
    sunRise: "08:00",
    sunSet: "18:00",
    temp_min: 12,
    temp_max: 18,
    visibility: 10,
    cloudiness: 10,
    wind_deg: 270,
    wind_gust: 8,
    coord: { lat: 51.51, lon: -0.13 },
    country: "GB"
  });

  const getWeather = async (searchCity) => {
    try {
      setLoading(true);
      setError("");
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${KEY}&units=metric`;
      const data = await fetch(URL);
      const result = await data.json();

      if (result.cod !== 200) {
        throw new Error(result.message || "City not found");
      }

      const weather = {
        location: result.name,
        weatherIcon: result.weather[0].icon,
        temperature: Math.round(result.main.temp),
        weatherType: result.weather[0].main,
        description: result.weather[0].description,
        feelsLike: Math.round(result.main.feels_like),
        windSpeed: Math.round(result.wind.speed * 10) / 10,
        pressure: result.main.pressure,
        humidity: result.main.humidity,
        sunRise: new Date(result.sys.sunrise * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        }),
        sunSet: new Date(result.sys.sunset * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit"
        }),
        temp_min: Math.round(result.main.temp_min),
        temp_max: Math.round(result.main.temp_max),
        visibility: Math.round(result.visibility / 1000),
        cloudiness: result.clouds.all,
        wind_deg: result.wind.deg,
        wind_gust: result.wind.gust ? Math.round(result.wind.gust * 10) / 10 : 0,
        coord: result.coord,
        country: result.sys.country
      };

      setInfo(weather);
      setCity(result.name);
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      getWeather(searchInput);
      setSearchInput("");
    }
  };

  const getWindDirectionLabel = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  useEffect(() => {
    getWeather(city);
  }, []);

  return (
    <div className="weatherApp">
      {/* Navigation Header */}
      <div className="navHeader">
        <div className="navContainer">
          <h1 className="appTitle">Weather</h1>
          <form className="searchForm" onSubmit={handleSearch}>
            <input
              type="text"
              className="searchInput"
              placeholder="Search city..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="searchBtn" disabled={loading}>
              {loading ? "..." : "→"}
            </button>
          </form>
        </div>
        {error && <div className="errorMsg">{error}</div>}
      </div>

      {/* Main Content */}
      <div className="mainContent">
        {/* Left Column */}
        <div className="leftColumn">
          {/* Primary Weather Card */}
          <div className="primaryCard">
            <div className="primaryHeader">
              <div className="locationHeader">
                <h2 className="cityName">{info.location}</h2>
                <p className="countryInfo">{info.country}</p>
              </div>
              <SetIcon weatherIcon={info.weatherIcon} description={info.description} />
            </div>

            <div className="temperatureSection">
              <div className="mainTemperature">{info.temperature}°</div>
              <div className="weatherDescription">
                <h3 className="weatherType">{info.weatherType}</h3>
                <p className="description">{info.description.charAt(0).toUpperCase() + info.description.slice(1)}</p>
                <p className="feelsLike">Feels like {info.feelsLike}°</p>
              </div>
            </div>

            <div className="tempRangeBar">
              <div className="tempRangeItem">
                <span className="tempLabel">Min</span>
                <span className="tempVal">{info.temp_min}°</span>
              </div>
              <div className="rangeVisual"></div>
              <div className="tempRangeItem">
                <span className="tempLabel">Max</span>
                <span className="tempVal">{info.temp_max}°</span>
              </div>
            </div>
          </div>

          {/* Sun Times Card */}
          <div className="sunTimesCard">
            <div className="sunTimeItem">
              <div className="sunIcon">🌅</div>
              <div className="sunInfo">
                <p className="sunLabel">Sunrise</p>
                <p className="sunTime">{info.sunRise}</p>
              </div>
            </div>
            <div className="sunDivider"></div>
            <div className="sunTimeItem">
              <div className="sunIcon">🌇</div>
              <div className="sunInfo">
                <p className="sunLabel">Sunset</p>
                <p className="sunTime">{info.sunSet}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details Grid */}
        <div className="detailsSection">
          {/* Humidity */}
          <div className="detailCard humidity">
            <div className="cardHeader">
              <Droplets size={24} className="cardIcon" />
              <span className="cardLabel">Humidity</span>
            </div>
            <div className="cardValue">{info.humidity}%</div>
            <div className="cardSubtext">Relative Humidity</div>
          </div>

          {/* Wind Speed */}
          <div className="detailCard wind">
            <div className="cardHeader">
              <Wind size={24} className="cardIcon" />
              <span className="cardLabel">Wind Speed</span>
            </div>
            <div className="cardValue">{info.windSpeed}<span style={{fontSize: '18px', fontWeight: 400}}>m/s</span></div>
            <div className="cardSubtext">Current Wind</div>
          </div>

          {/* Pressure */}
          <div className="detailCard pressure">
            <div className="cardHeader">
              <Gauge size={24} className="cardIcon" />
              <span className="cardLabel">Pressure</span>
            </div>
            <div className="cardValue">{info.pressure}</div>
            <div className="cardSubtext">hPa</div>
          </div>

          {/* Cloudiness */}
          <div className="detailCard cloud">
            <div className="cardHeader">
              <Cloud size={24} className="cardIcon" />
              <span className="cardLabel">Cloudiness</span>
            </div>
            <div className="cardValue">{info.cloudiness}%</div>
            <div className="cardSubtext">Cloud Cover</div>
          </div>

          {/* Visibility */}
          <div className="detailCard visibility">
            <div className="cardHeader">
              <Eye size={24} className="cardIcon" />
              <span className="cardLabel">Visibility</span>
            </div>
            <div className="cardValue">{info.visibility}</div>
            <div className="cardSubtext">km</div>
          </div>

          {/* Wind Gust */}
          <div className="detailCard gust">
            <div className="cardHeader">
              <CloudRain size={24} className="cardIcon" />
              <span className="cardLabel">Wind Gust</span>
            </div>
            <div className="cardValue">{info.wind_gust}<span style={{fontSize: '18px', fontWeight: 400}}>m/s</span></div>
            <div className="cardSubtext">Max Gust</div>
          </div>

          {/* Wind Direction */}
          <div className="detailCard direction">
            <div className="cardHeader">
              <Navigation size={24} className="cardIcon" style={{
                transform: `rotate(${info.wind_deg}deg)`
              }} />
              <span className="cardLabel">Wind Direction</span>
            </div>
            <div className="cardValue">{getWindDirectionLabel(info.wind_deg)}</div>
            <div className="cardSubtext">{info.wind_deg}°</div>
          </div>

          {/* Coordinates */}
          <div className="detailCard coordinates">
            <div className="cardHeader">
              <Sun size={24} className="cardIcon" />
              <span className="cardLabel">Location</span>
            </div>
            <div className="cardValue" style={{fontSize: '24px'}}>{info.coord.lat.toFixed(2)}</div>
            <div className="cardSubtext">{info.coord.lon.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="appFooter">
        <p>Weather data from OpenWeatherMap API & Developed by Ayan Pal</p>
      </div>
    </div>
  );
}
