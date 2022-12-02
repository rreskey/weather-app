import React from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useWeather } from '../contexts/WeatherProvider'
import WeatherInfo from './WeatherInfo'

export default function InputCity() {
    const { handleSubmit, cityInputRef } = useWeather()
    return (
    <Form onSubmit={handleSubmit} className="m-1">
        <Form.Group>
          <InputGroup>
            <Form.Label className="fs-2">City: </Form.Label>
            <Form.Control className="fs-2 ms-3" type="text" ref={cityInputRef} />
            <Button className="fs-2" type="submit">Search</Button>
          </InputGroup>
        </Form.Group>
        <WeatherInfo />
    </Form>
  )
}
