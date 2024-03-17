// Weather.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'; // Импортируем файл стилей

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = '11ea643feecbdfc7958def09e0ccde47'; // Замените на ваш API-ключ

  const fetchWeather = async () => {
    try {
      if (city.trim() === '') return; // Проверяем, что значение city не пустое

      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, [city]); // Зависимость только от city

  const handleGetWeatherClick = () => {
    setWeatherData(null); // Сбрасываем предыдущие данные о погоде перед отправкой нового запроса
    fetchWeather(); // Вызываем fetchWeather для получения новых данных о погоде
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15; // Конвертация из кельвинов в градусы Цельсия
  };

  return (
    <div className="weather-container">
      <div className="input-container">
        <input type="text" placeholder="Введите город" value={city} onChange={(e) => setCity(e.target.value)} />
        <button onClick={handleGetWeatherClick}>Узнать погоду</button>
      </div>
      {weatherData && (
        <div className="weather-info">
          <h2>Погода в {weatherData.name}</h2>
          <p>Температура: {kelvinToCelsius(weatherData.main.temp).toFixed(1)}°C</p>
          <p>Погодные условия: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
