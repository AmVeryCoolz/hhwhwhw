import React, { useState } from 'react';
import axios from 'axios';

export default function Weather() {
        const [city, setCity] = useState();
        const [weather,setWeather] = useState();
        const [forecast, setForecast] = useState([]);
        const handleCityChange = (event) => {
            setCity(event.target.value)
        }
        const fetchWeather = async () => {
            try{
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'14a58d7ccad8657dd32a4bc9bcccaf91'}&units=imperial`)
                setWeather(response);

                const forecastresponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${'14a58d7ccad8657dd32a4bc9bcccaf91'}&units=imperial`);
                const bootsnkats = {};
                forecastresponse.data.list.forEach((item) =>{
                    const date = item.dt_txt.split(' ')[0];
                    if (!bootsnkats[date]) bootsnkats[date] =[];
                    bootsnkats[date].push(item); 
                });

                const dailystuff = Object.keys(bootsnkats)
                .slice(0,5)
                .map((date) => {
                    const day = bootsnkats[date][0];
                return {
                    date,
                    temp: day.main.temp,
                    description: day.weather[0].description,
                    icon: day.weather[0].icon
                };            
            });

            setForecast(dailystuff);
            }
            catch(error){
                console.log("Error fetching weather data",error)
            }   
            //im tired man, please save me!!!
        }
        console.log(weather, 'weather')
        const handleClick = () => {
            fetchWeather();
        }
        // kan hje jvq ji ew
    return(
        <div className= 'weather-container'>

            {weather && <>
            <div className='weather-info'>
                <h3 style= {{color: 'white'}}>{weather.data.name}</h3>
                <p style= {{color: 'white'}}>Today is {new Date(weather.data.dt* 1000).toLocaleDateString()}</p>
                <p style= {{color: 'white'}}> Temp is {weather.data.main.temp}</p>
                <p style= {{color: 'white'}}> The mininum temperature is {weather.data.main.temp_min} F</p>
                <p style= {{color: 'white'}}> The max temperature is {weather.data.main.temp_max} F</p>
                <p style= {{color: 'white'}}>{weather.data.weather[0].description}</p> 
            </div>
        </>}
                    <input type='text' placeholder='Enter City Name' value={city} onChange={handleCityChange}/>
            <button onClick={handleClick}> Get Weather</button>    
{forecast.length > 0 && (
<div className="forecast-info" style={{ color: 'white'}}>
    <h3>ForeCast!!</h3>
<ul>
    {forecast.map((day,index) => (
        <p key={index}>
            <strong>{day.date}</strong>: {day.temp} F,{day.description}{'  '}
        </p>
    ))}
</ul>
</div>
)}
</div>
);
}
