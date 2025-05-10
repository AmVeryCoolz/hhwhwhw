import {useState} from 'react';
import axios from 'axios';

export default function Weather() {
    const [city, setCity] = useState();
    const [weather, setWeather] = useState();
    const handleCityChange = (event) => {
        setCity(event.target.value)
    }
const fetchWeather= async ()=>{
try{
const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'14a58d7ccad8657dd32a4bc9bcccaf91&units=imperial'}`)
console.log(response);
}

catch(error){
console.log("Error fetching weater data", error)
}
}
console.log(weather, 'weather')
const handleClick = () => {
    fetchWeather();
}

return (
<div className= 'weather-container'>
    <input type= 'text' placeholder= 'Enter City Name' value={city} onChange= {handleCityChange}/>
    <buttons onClick={handleClick}>Get Weather</buttons>
    {weather && <>
    <div className='weather-info'>
        <h3>{weather.data.name}</h3>
        <p>Temp is {weather.data.main.temp}</p>
        <p>{weather.data.weather[0].description}</p>
</div>
</>}
</div>
)
}







