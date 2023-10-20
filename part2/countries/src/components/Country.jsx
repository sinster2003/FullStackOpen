import CountryCard from "./CountryCard";

const Country = ({countries}) => {
  return (
    <div>
        {
            (countries.length !== 1) ? 
            countries.map(country => {
                return <p key={country.name.common}>{country.name.common}</p>
            }) : 
            <CountryCard data={countries[0]}/>
        }
    </div>
  );
}

export default Country;