import { useEffect, useState } from "react";
import axios from "axios";

const CountryCard = ({data}) => {

    const [weather,setWeather] = useState(null);

    const api_key = import.meta.env.VITE_API_KEY;

    useEffect(() => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.capital[0]}&appid=${api_key}`)
      .then(res => setWeather(res.data))
      .catch(error => {
        console.log(`Weather of ${data.capital[0]} not found`)
      })
    }, [])

    if(!weather) {
        return "Loading...";
    }

    return(
        <div>
            <h1>{data.name.common}</h1>
            <p>Capital {data.capital[0]}</p>
            <p>Area {data.area}</p>
            <h3>Languages: </h3>
            <ul>
                {
                    Object.keys(data.languages).map((key,index) => {
                        return <li key={index}>{data.languages[key]}</li>
                    })
                }
            </ul>
            <img src={data.flags.png} alt={data.flags.alt}/>
            <div>
                <h2>Weather in {data.capital[0]}</h2>
                <p><b>temperature</b> {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description} icon`}/>
                <p><b>wind</b> {(weather.wind.speed).toFixed(2)} m/s</p>
            </div>
        </div>
    );
}

export default CountryCard;