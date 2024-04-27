import "./WeatherApp.css"
import searchIcon from "../assets/search.png";
import humidityIcon from "../assets/humidity.svg";
import windIcon from "../assets/wind-speed.svg";
import temperatureIcon from "../assets/temperature.svg";
import AirIcon from "../assets/pressure.svg";
import { useState,useEffect } from "react";
import Element from "./Element"
import SetIcon from "./SetIcon";
import SunRise_set from "./SunRise_set";

export default function WeatherApp(){
    let KEY = "80b8b2535620ffbdaa98d3fb5e9c44de";
    // console.log(process.env.REACT_APP_WEATHER_API_KEY);
    
    let [city,setCity] = useState("Kolkata");
    let [info,setInfo] = useState({
        location:"Kolkata",
        weatherIcon : "50n",
        temperature : 35,
        weatherType : "Haze",
        feelsLike : 37,
        windSpeed : " 6 km/h",
        pressure : " 1004 hPa",
        humidity : " 12%",
        sunRise: "6:01:55 AM",
        sunSet: "5:07:15 PM"
    });

    let handelChange = (evt)=>{
        console.log(`city: ${city} , add: ${evt.target.value}`);
        setCity(evt.target.value);
    }

    let isValid=()=>{
        window.alert("Please enter a valid city");
    }

    const getWeather = async () => {
        try {
          const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;
          const data = await fetch(URL);
          const result = await data.json();
      
          const weather = {
            location: result.name,
            weatherIcon: result.weather[0].icon,
            temperature: Math.floor(result.main.temp),
            weatherType: result.weather[0].description,
            feelsLike: Math.floor(result.main.feels_like),
            windSpeed: `${result.wind.speed} km/h`,
            pressure: `${result.main.pressure} hPa`,
            humidity: `${result.main.humidity}%`,
            sunRise: new Date(result.sys.sunrise * 1000).toLocaleTimeString(),
            sunSet: new Date(result.sys.sunset * 1000).toLocaleTimeString(),
          };
      
          setInfo(weather); // Update info state with fetched weather data
        } catch (error) {
            console.log(error);
            isValid();
        }
      };
      
    
      const search = async () => {
        if (city === "") {
          isValid();
          return;
        }
    
        try {
          await getWeather();
        } catch (error) {
          console.log(error);
          isValid();
        }
      };

      useEffect(() => {
        // Fetch weather data when component mounts for the first time
        getWeather();
      }, []);
    
  return (
    <div className="cointener">
        <form className="searchBox">
            <input type="text" className="cityInput" placeholder='Search'onChange={handelChange}/>
            <div className="searchButton" type="submit" value="Submit" onClick={search}>
                <img src={searchIcon} alt="" />
            </div>
        </form>
        <div className="WeatherLocation">Weather in {info.location}</div>
        <SetIcon weatherIcon={info.weatherIcon} />
        <div className="temp">
            <div className="weatherTemp">{info.temperature}&deg;C</div>
            <div className="weatherType">{info.weatherType}</div>
        </div>

        <div className="dataCointer">
            <Element className="element" icon={temperatureIcon} text={"Feels like"} value={info.feelsLike} isDeg={true}/>
            <Element className="element" icon={windIcon} text={"Wind Speed"} value={info.windSpeed}/>
        </div>
        <div className="dataCointer">
            <Element className="element" icon={humidityIcon} text={"Humidity"} value={info.humidity}/>
            <Element className="element" icon={AirIcon} text={"Air pressure"} value={info.pressure}/>
        </div>

        <div className="dataCointer sumPosition">
            <SunRise_set sunset={info.sunSet} sunrise={info.sunRise}/>
        </div>

    </div>
  );
}
