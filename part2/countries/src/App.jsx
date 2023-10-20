import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";

const App = () => {

  const [countryValue, setCountryValue] = useState("");
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(res => setCountryData(res.data))
  }, [])

  const handleCountryValue = (event) => {
    setCountryValue(event.target.value);
  }

  const filteredCountries = (countryValue !== "") ? countryData.filter(country => 
  country.name.common.toLowerCase().includes(countryValue.toLowerCase())) : [];

  return (
    <div>
      <span>find countries</span> <input type="text" value={countryValue} onChange={handleCountryValue}/>
      {
        (filteredCountries.length > 10) ? 
        <p>Too many matches, specify another filter</p>:
        <Country countries={filteredCountries}/>
      }
    </div>
  );
}

export default App;