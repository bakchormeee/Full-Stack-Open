const DetailedInfo = ({country}) => {
    if(country !== null){ //only render when value isn't null
        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>Capital: {country.capital}</div>
                <div>Area: {country.area}</div>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map(language => (<li key={language.trim()}>{language.trim()}</li>))}
                </ul>
                <img src={country.flags.png}></img>
            </div>
        )
    }
}

export default DetailedInfo