import { Container } from 'react-bootstrap'
import CurrentCity from './components/CurrentCity'
import InputCity from './components/InputCity'
import { WeatherProvider } from './contexts/WeatherProvider';
import './App.css'

function App() {
  return (
    <WeatherProvider>
      <Container
        fluid
        className='flex-wrap main-bg d-flex gap-5 flex-row justify-content-center align-items-center min-vh-100'
      >
        <CurrentCity/>
        <InputCity />
      </Container>
    </WeatherProvider>
  )
}

export default App
