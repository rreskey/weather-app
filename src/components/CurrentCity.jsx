import React, { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import ChangeCityModal from './ChangeCityModal'
import parameters from '../utils'
import { useWeather } from '../contexts/WeatherProvider'

export default function CurrentCity() {
    const [modalOpen, setModalOpen] = useState(false)
    function closeModal() {
        setModalOpen(false)
    }
    const { data, info } = useWeather()
    return (
    <div className='d-flex justify-content-center align-items-center mt-1'>
        <Stack direction='vertical' className='p-5'>
            <h2 className='text-center'>Weather: {data.weather[0].description}</h2>
            {
                Object.entries(data.weather).map((p, index) => {
                    return <img key={index} style={{width: '165px', margin: '0 auto'}} src={parameters?.[p[1].icon]?.img} />  
                })
            }
            <div className='d-inline-flex align-items-center justify-content-center'>
                <img style={{width: '60px'}} src={parameters?.map?.img}/>
                <h1 className='ms-2'>{info.city}</h1>
            </div>
            <Button className='my-2 mx-auto w-50' onClick={() => setModalOpen(true)}>Wrong city?</Button>
            {modalOpen? <ChangeCityModal modal={modalOpen} closeModal={closeModal}/>: null} 
            <Stack direction='horizontal' className='d-inline-flex justify-content-center align-items-center gap-2'>
                <h2>{Math.round(data.main.temp)}</h2>
                <img style={{width: '55px'}} src={parameters.temp.img} />
            </Stack>
            <Stack direction='horizontal' className='d-inline-flex justify-content-center gap-5 mt-3'>
                <h3>Country: {info.country}</h3>
                <h3>State: {info.state}</h3>
            </Stack>
            <Stack direction='horizontal' className='d-inline-flex align-items-center justify-content-center mt-3 gap-2'>
                    <h4 className='m-0 p-0'>{parameters?.sunrise?.title}</h4>
                    <img style={{width: '60px'}} src={parameters?.sunrise?.img}/>
                    <img style={{width: '60px'}} className="ms-auto" src={parameters?.sunset?.img}/>
                    <h4 className='m-0 p-0'>{parameters?.sunset?.title}</h4>
            </Stack>
                <Stack direction='horizontal' className='d-inline-flex align-items-center justify-content-center mt-3'>
                    <h4>{formatTime(data.sys.sunrise)}</h4>
                    <h4 className='ms-auto'>{formatTime(data.sys.sunset)}</h4>
                </Stack>
        </Stack>
    </div>
  )
}

function formatTime(s) {
    const time = new Date(s * 1000).toLocaleTimeString()
    return time
}