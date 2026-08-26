import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Cloud,
  CloudRain,
  Droplets,
  LocateFixed,
  MapPin,
  Navigation,
  RefreshCw,
  Sun,
  Wind,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ThemeButton from "../../components/ThemeButton";

import "./Weather.css";

const WEATHER_API =
  "https://api.open-meteo.com/v1/forecast";

function getWeatherInfo(code, isHindi) {
  const map = {
    0: isHindi ? "साफ आसमान" : "Clear sky",
    1: isHindi ? "मुख्य रूप से साफ" : "Mainly clear",
    2: isHindi ? "आंशिक बादल" : "Partly cloudy",
    3: isHindi ? "बादल छाए हुए" : "Overcast",
    45: isHindi ? "धुंध" : "Fog",
    48: isHindi ? "जमी हुई धुंध" : "Depositing rime fog",
    51: isHindi ? "हल्की बूंदाबांदी" : "Light drizzle",
    53: isHindi ? "मध्यम बूंदाबांदी" : "Moderate drizzle",
    55: isHindi ? "घनी बूंदाबांदी" : "Dense drizzle",
    61: isHindi ? "हल्की बारिश" : "Slight rain",
    63: isHindi ? "मध्यम बारिश" : "Moderate rain",
    65: isHindi ? "तेज़ बारिश" : "Heavy rain",
    71: isHindi ? "हल्की बर्फबारी" : "Slight snow",
    73: isHindi ? "मध्यम बर्फबारी" : "Moderate snow",
    75: isHindi ? "तेज़ बर्फबारी" : "Heavy snow",
    80: isHindi ? "हल्की बारिश की बौछार" : "Slight rain showers",
    81: isHindi ? "मध्यम बारिश की बौछार" : "Moderate rain showers",
    82: isHindi ? "तेज़ बारिश की बौछार" : "Violent rain showers",
    95: isHindi ? "आंधी-तूफ़ान" : "Thunderstorm",
    96: isHindi ? "ओलावृष्टि के साथ तूफ़ान" : "Thunderstorm with hail",
    99: isHindi ? "तेज़ ओलावृष्टि वाला तूफ़ान" : "Heavy hail thunderstorm",
  };

  return map[code] || (isHindi ? "मौसम उपलब्ध" : "Weather available");
}

function WeatherIcon({ code, isDay = true, size = 34 }) {
  if (code >= 51 && code <= 82) {
    return <CloudRain size={size} />;
  }

  if (code >= 95) {
    return <CloudRain size={size} />;
  }

  if (code >= 1 && code <= 48) {
    return <Cloud size={size} />;
  }

  return <Sun size={size} />;
}

function formatDay(dateString, language) {
  const date = new Date(`${dateString}T12:00:00`);
  return date.toLocaleDateString(
    language === "hi" ? "hi-IN" : "en-IN",
    { weekday: "short", day: "numeric", month: "short" }
  );
}

function Weather({ onBack }) {
  const { isDark, toggleTheme } = useTheme();
  const { language } = useLanguage();

  const isHindi = language === "hi";

  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [error, setError] = useState("");

  const loadWeather = async (latitude, longitude) => {
    setWeatherLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current:
          "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day",
        daily:
          "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset",
        forecast_days: "7",
        timezone: "auto",
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
      });

      const response = await fetch(`${WEATHER_API}?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Weather request failed.");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(
        isHindi
          ? "मौसम की जानकारी लोड नहीं हो सकी। कृपया फिर से कोशिश करें।"
          : "Unable to load weather information. Please try again."
      );
    } finally {
      setWeatherLoading(false);
    }
  };

  const requestLocation = () => {
    setLocationLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setLocationLoading(false);
      setError(
        isHindi
          ? "आपके ब्राउज़र में लोकेशन सुविधा उपलब्ध नहीं है।"
          : "Location is not supported by this browser."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy),
        };

        setLocation(nextLocation);
        setLocationLoading(false);
        loadWeather(nextLocation.latitude, nextLocation.longitude);
      },
      (positionError) => {
        setLocationLoading(false);

        let message;

        if (positionError.code === 1) {
          message = isHindi
            ? "लोकेशन की अनुमति नहीं मिली। Weather देखने के लिए Location Permission दें।"
            : "Location permission was denied. Please allow location access to see live weather.";
        } else if (positionError.code === 2) {
          message = isHindi
            ? "आपकी लोकेशन नहीं मिल सकी।"
            : "Your current location could not be determined.";
        } else {
          message = isHindi
            ? "लोकेशन प्राप्त करने में समय लग रहा है। फिर से कोशिश करें।"
            : "Getting your location took too long. Please try again.";
        }

        setError(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 300000,
      }
    );
  };

  useEffect(() => {
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = weather?.current;
  const daily = weather?.daily;

  return (
    <main className={`weather-page ${isDark ? "dark-mode" : ""}`}>
      <header className="weather-header">
        <button
          type="button"
          className="weather-back"
          onClick={onBack}
          aria-label={isHindi ? "वापस जाएँ" : "Go back"}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="weather-header-title">
          <h1>{isHindi ? "मौसम" : "Weather"}</h1>
          <p>
            {isHindi
              ? "आपकी वर्तमान लोकेशन का लाइव मौसम"
              : "Live weather for your current location"}
          </p>
        </div>

        <ThemeButton isDark={isDark} onToggle={toggleTheme} />
      </header>

      <section className="weather-content">
        <div className="weather-location-card">
          <div className="weather-location-icon">
            <MapPin size={20} />
          </div>

          <div>
            <strong>
              {isHindi ? "वर्तमान लोकेशन" : "Current Location"}
            </strong>

            <span>
              {location
                ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                : isHindi
                ? "लोकेशन प्राप्त की जा रही है..."
                : "Getting your location..."}
            </span>

            {location?.accuracy && (
              <small>
                {isHindi
                  ? `सटीकता लगभग ${location.accuracy} मीटर`
                  : `Accuracy about ${location.accuracy} m`}
              </small>
            )}
          </div>

          <button
            type="button"
            className="weather-refresh-location"
            onClick={requestLocation}
            disabled={locationLoading}
            title={isHindi ? "लोकेशन रीफ्रेश करें" : "Refresh location"}
          >
            <LocateFixed size={18} />
          </button>
        </div>

        {locationLoading && !weather && (
          <div className="weather-state-card">
            <div className="weather-spinner" />
            <strong>
              {isHindi
                ? "आपकी लोकेशन ली जा रही है..."
                : "Getting your live location..."}
            </strong>
            <p>
              {isHindi
                ? "कृपया Location Permission allow करें।"
                : "Please allow Location Permission when your browser asks."}
            </p>
          </div>
        )}

        {error && (
          <div className="weather-error-card">
            <div>
              <strong>
                {isHindi ? "मौसम उपलब्ध नहीं है" : "Weather unavailable"}
              </strong>
              <p>{error}</p>
            </div>

            <button
              type="button"
              onClick={requestLocation}
              className="weather-retry-button"
            >
              <RefreshCw size={16} />
              {isHindi ? "फिर कोशिश करें" : "Try Again"}
            </button>
          </div>
        )}

        {weatherLoading && weather && (
          <div className="weather-mini-loading">
            <div className="weather-spinner small" />
            {isHindi ? "मौसम अपडेट हो रहा है..." : "Updating weather..."}
          </div>
        )}

        {current && daily && (
          <>
            <section className="weather-current-card">
              <div className="weather-current-top">
                <div>
                  <span className="weather-eyebrow">
                    {isHindi ? "अभी का मौसम" : "Current Weather"}
                  </span>

                  <div className="weather-temperature">
                    {Math.round(current.temperature_2m)}°C
                  </div>

                  <p className="weather-condition">
                    {getWeatherInfo(current.weather_code, isHindi)}
                  </p>
                </div>

                <div className="weather-big-icon">
                  <WeatherIcon
                    code={current.weather_code}
                    isDay={current.is_day}
                    size={60}
                  />
                </div>
              </div>

              <div className="weather-metrics">
                <div className="weather-metric">
                  <Droplets size={20} />
                  <span>
                    {isHindi ? "नमी" : "Humidity"}
                    <strong>
                      {Math.round(current.relative_humidity_2m)}%
                    </strong>
                  </span>
                </div>

                <div className="weather-metric">
                  <CloudRain size={20} />
                  <span>
                    {isHindi ? "बारिश" : "Rain"}
                    <strong>
                      {current.precipitation ?? 0} mm
                    </strong>
                  </span>
                </div>

                <div className="weather-metric">
                  <Wind size={20} />
                  <span>
                    {isHindi ? "हवा" : "Wind"}
                    <strong>
                      {Math.round(current.wind_speed_10m)} km/h
                    </strong>
                  </span>
                </div>
              </div>
            </section>

            <section className="weather-section">
              <div className="weather-section-title">
                <div>
                  <h2>{isHindi ? "7 दिन का पूर्वानुमान" : "7-Day Forecast"}</h2>
                  <p>
                    {isHindi
                      ? "अगले दिनों का मौसम अपडेट"
                      : "Weather outlook for the next days"}
                  </p>
                </div>
              </div>

              <div className="weather-forecast-list">
                {daily.time.map((date, index) => (
                  <div className="weather-forecast-row" key={date}>
                    <div className="forecast-day">
                      <strong>
                        {index === 0
                          ? isHindi
                            ? "आज"
                            : "Today"
                          : formatDay(date, language)}
                      </strong>
                    </div>

                    <div className="forecast-icon">
                      <WeatherIcon
                        code={daily.weather_code[index]}
                        size={25}
                      />
                    </div>

                    <div className="forecast-condition">
                      <span>
                        {getWeatherInfo(
                          daily.weather_code[index],
                          isHindi
                        )}
                      </span>
                      <small>
                        {isHindi ? "बारिश की संभावना" : "Rain chance"}{" "}
                        {daily.precipitation_probability_max[index] ?? 0}%
                      </small>
                    </div>

                    <div className="forecast-temp">
                      <strong>
                        {Math.round(daily.temperature_2m_max[index])}°
                      </strong>
                      <span>
                        {Math.round(daily.temperature_2m_min[index])}°
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="weather-info-grid">
              <div className="weather-info-card">
                <Sun size={19} />
                <div>
                  <span>{isHindi ? "सूर्योदय" : "Sunrise"}</span>
                  <strong>
                    {daily.sunrise?.[0]
                      ? new Date(daily.sunrise[0]).toLocaleTimeString(
                          language === "hi" ? "hi-IN" : "en-IN",
                          { hour: "2-digit", minute: "2-digit" }
                        )
                      : "--"}
                  </strong>
                </div>
              </div>

              <div className="weather-info-card">
                <Navigation size={19} />
                <div>
                  <span>{isHindi ? "सूर्यास्त" : "Sunset"}</span>
                  <strong>
                    {daily.sunset?.[0]
                      ? new Date(daily.sunset[0]).toLocaleTimeString(
                          language === "hi" ? "hi-IN" : "en-IN",
                          { hour: "2-digit", minute: "2-digit" }
                        )
                      : "--"}
                  </strong>
                </div>
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}

export default Weather;
