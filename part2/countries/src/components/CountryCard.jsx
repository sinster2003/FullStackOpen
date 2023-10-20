const CountryCard = ({data}) => {

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
        </div>
    );
}

export default CountryCard;