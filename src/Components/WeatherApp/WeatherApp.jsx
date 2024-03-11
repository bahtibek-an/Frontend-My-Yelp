import React, { useState } from "react"; 
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import clear_icon from "../Assets/clear.png";

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [cityInput, setCityInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [wicon, setWicon] = useState(cloud_icon);

    const api_key = "6b6b0a4b57e94da1d869b0b89458cee0";

    const iconMap = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": drizzle_icon,
        "03n": drizzle_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        // Add more mappings as needed
    };

    const search = async () => {
        if(cityInput.trim() === ""){
            return;
        }

        setLoading(true);

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${api_key}`;
            const response = await fetch(url);
            const data = await response.json();
            
            setWeatherData(data);
            const weatherIcon = iconMap[data.weather[0].icon];
            setWicon(weatherIcon);
        } catch (error) {
            console.error("Error fetching weather data:", error);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input 
                    type="text" 
                    className="cityInput" 
                    placeholder="Search" 
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                />
                <div className="search-icon" onClick={search}>
                    {loading ? (
                        <span>Loading...</span>
                    ) : (
                        <img src={search_icon} alt="Search" />
                    )}
                </div>
            </div>
            {weatherData && (
                <>
                    <div className="weather-image">
                        <img src={wicon} alt="Weather Icon" />
                    </div>
                    <div className="weather-temp">{weatherData.main.temp}°C</div>
                    <div className="weather-location">{weatherData.name}</div>
                    <div className="data-container">
                        <div className="element">
                            <img src={humidity_icon} alt="Humidity Icon" className="icon" />
                            <div className="data">
                                <div className="humidity-percent">{weatherData.main.humidity}%</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>
                        <div className="element">
                            <img src={wind_icon} alt="Wind Icon" className="icon" />
                            <div className="data">
                                <div className="wind-rate">{weatherData.wind ? weatherData.wind.speed : ''} km/h</div>
                                <div className="">Wind Speed</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default WeatherApp;
