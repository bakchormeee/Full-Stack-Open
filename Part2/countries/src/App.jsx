import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import DetailedInfo from './components/DetailedInfo'
import Countries from './components/Countries.jsx'

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [countryList, setCountryList] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountryData(response.data)
        setCountryList(countryData)
    })
  }, [])

  const handleCountryChange = (event) => {
    setCountryList(countryData.filter(i => i.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    console.log(countryList)
  }

  return (
    <div>
      <h1>Country Finder</h1>
      <div>find countries <input onChange={handleCountryChange}/></div>
      <Countries countryList={countryList}/>
    </div>
  )
}

export default App
