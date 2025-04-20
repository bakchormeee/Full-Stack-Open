import DetailedInfo from "./DetailedInfo"

const Countries = ({countryList}) => {
    if(countryList.length >= 10){
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if(countryList.length == 1){
        return (
            <DetailedInfo country={countryList[0]}/>
        )
    } else {
        return (
            <div>
                {countryList.map(country => <div key={country.name.common}>{country.name.common}</div>)}
            </div>
        )
    }
}

export default Countries