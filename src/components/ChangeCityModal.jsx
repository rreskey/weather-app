import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useWeather } from '../contexts/WeatherProvider';

export default function ChangeCityModal({modal, closeModal}) {
  const { search, getWeather } = useWeather()

  return (
    <Modal centered show={modal}>
        <Modal.Header>
            <Modal.Title>Select city:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {search.map((item, index) => {
              return (
                <div key={index} className="w-100 d-inline-flex align-items-center justify-content-between m-1">
                  <li>City: {item.name} | Country: {item.country} {` ${item.state? `| State: ${item.state}`: ''}`}</li>
                    <Button onClick={e => {
                      e.preventDefault()
                      closeModal()
                      getWeather(item.lat, item.lon, item.name, item.country, item.state)
                    }}>Select</Button>
                </div>
              ) 
            })}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>
  )
}
