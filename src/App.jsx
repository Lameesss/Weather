import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './appi';
import Search from './components/search/Search';
import { useState, useEffect } from 'react';
import Forecast from './components/forecast/forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  // Array of random locations
  const randomLocations = [
    { label: "New York", value: "40.7128 -74.0060" },
    { label: "London", value: "51.5074 -0.1278" },
    { label: "Tokyo", value: "35.6762 139.6503" },
    { label: "Paris", value: "48.8566 2.3522" },
    { label: "Sydney", value: "-33.8688 151.2093" },
  ];

  // Function to fetch weather data for a random location
  const fetchRandomLocationWeather = () => {
    const randomLocation = randomLocations[Math.floor(Math.random() * randomLocations.length)];
    const [lat, lon] = randomLocation.value.split(" ");

    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: randomLocation.label, ...weatherResponse });
        setForecast({ city: randomLocation.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  // Use effect to fetch weather data for a random location on mount
  useEffect(() => {
    fetchRandomLocationWeather();
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <>
      <div className='container'>
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </>
  );
}

export default App;
