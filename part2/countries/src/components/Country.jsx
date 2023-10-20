import CountryCard from "./CountryCard";

const Country = ({countries,filter}) => {

  const handleShow = (countryName) => {
    filter(countryName);
  }

  return (
    <div>
        {
            (countries.length !== 1) ? 
            countries.map(country => {
              return(
                <div key={country.name.common}>
                  <p style={{display: "inline-block", paddingRight:"5px"}}>{country.name.common}</p>
                  <button onClick={() => handleShow(country.name.common)}>Show</button>
                </div>
              );
            }) : 
            <CountryCard data={countries[0]}/>
        }
    </div>
  );
}

export default Country;