import React, { useContext, useState, useEffect, useRef } from 'react'
const api = {
  VITE_APP_API: import.meta.env.VITE_APP_API
}

const WeatherContext = React.createContext()

export function useWeather() {
    return useContext(WeatherContext)
}

export function WeatherProvider({ children }) {
  const [data, setData] = useState(null)
  const [search, setSearch] = useState(null)
  const [info, setInfo] = useState({
      city: '',
      latitude: '',
      longitude: '',
      country: '',
      state: '',
  })

  let cityInputRef = useRef()

  function getLocation() {
    cityInputRef.current? info.city = cityInputRef.current.value : info.city = 'Moscow' 

    const controller = new AbortController()
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${info.city}&limit=10&appid=${api.VITE_APP_API}`, { signal: controller.singal} )
        .then(response => response.json())
        .then(result => {
            setSearch(result)
            console.log(result)
            getWeather(result[0].lat, result[0].lon, info.city, result[0].country, result[0].state)
        })
        .catch(e => console.log(e))
    return () => controller.abort()
  }

  function getWeather(lat, lon, cityName, country, state) {
    const controller = new AbortController()
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${JSON.stringify(lat)}&lon=${JSON.stringify(lon)}&appid=${api.VITE_APP_API}&lang=en&units=metric`, { signal: controller.signal})
        .then(response => response.json())
        .then(result => {
            setInfo({city: cityName, latitude: lat, longitude: lon, country: country, state: state})
            setData(result)
            console.log(result)
        })
        .catch(e => {
            console.log(e)
            setData({content: 'Something went wrong'})
        })
    return () => controller.abort()
}  

  useEffect(() => {
    getLocation()
  }, [])
  
  if (!data) return null

  function handleSubmit(e) {
    e.preventDefault() 
    getLocation()
  }

  const value = {
    data: data,
    info: info,
    search: search,
    getLocation,
    getWeather,
    handleSubmit,
    cityInputRef,
  }
  
  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  ) 
}
