import React from 'react'
import { Stack } from 'react-bootstrap'
import parameters from '../utils'
import { useWeather } from '../contexts/WeatherProvider'

export default function WeatherInfo() {
  const { data } = useWeather()
    return (
    <>
        <Stack style={{margin: '0 auto'}}>
            {Object.entries(data.coord).map((parameter, index) => {
                return <div key={index} className='d-inline-flex align-items-center gap-3 m-1'>
                        <img style={{width: '75px'}} src={parameters?.[parameter[0]]?.img}/><p className='p-0 m-0 fs-2' key={parameter.id}>{parameters?.[parameter[0]]?.title}: {parameter[1]}</p>
                    </div> 
            })}
        </Stack>
        <Stack direction='vertical'>
            {Object.entries(data.main).map((parameter, index) => {
                return <div key={index} className='d-inline-flex justify-content-start align-items-center gap-3 m-1'>
                        <img style={{width: '75px'}} src={parameters?.[parameter[0]]?.img}/><p className='p-0 m-0 fs-2' key={parameter.id}>{parameters?.[parameter[0]]? `${parameters?.[parameter[0]]?.title}: ${Math.round(parameter[1])}` : null}</p>
                </div> 
            })}
        </Stack>
    </>
  )
}
