import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Search from './pages/Search'
import Weather from './pages/Weather'
import LocationKeyContext from './context/locationKeyContext'
import TemperatureDegreesContext from "./context/TemperatureDegreesContext"
import { useState } from 'react'
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  const [key, setKey] = useState(null)
  const [degrees, setDegrees] = useLocalStorage('degree', 'c')

  function getKey(data){
    setKey(data)
  }

  function getDegrees(data){
    setDegrees(data)
  }


  return (
    <LocationKeyContext.Provider value={key}>
      <TemperatureDegreesContext.Provider value={degrees}>
        <Router>
          <Routes>
              <Route path='/' element={<Search returnKey={getKey}/>} />
              <Route path='/:id' element={<Weather returnDegrees={getDegrees}/>} />
          </Routes>
        </Router>
      </TemperatureDegreesContext.Provider>
    </LocationKeyContext.Provider>
  )
}

export default App
