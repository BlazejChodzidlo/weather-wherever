import React, { useEffect, useState } from 'react'
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@tremor/react";
import axios from 'axios'
import Summary from './Summary';
import Hourly from './Hourly';

function Details({locationKey, degrees, timeOfDay}) {
  const [weather, setWeather] = useState([])

  const [start, setStart] = useState(false)

  useEffect(() => {
    if (locationKey){
      let metric
      if (degrees === 'c'){
          metric = true
      }
      else {
          metric = false
      }
      axios.post('https://weatherwherever-api.vercel.app/forecast24hours', {locationKey: locationKey, metric: metric})
      .then((res) => {
          setWeather(res.data)
      })
      .catch(err => console.log(err))
    }
  }, [locationKey, degrees])

  return (
    <div className={`opacity-70 w-full h-full shadow-md rounded-lg ${timeOfDay ? 'bg-sky-650 dark' : 'bg-cyan-800'}`}>
      {
        JSON.stringify(weather) !== '[]' && weather !== null ?
        <TabGroup>
          <TabList className='px-4'>
            <Tab onClick={() => {setStart(false)}}>Summary</Tab>
            <Tab onClick={() => {setStart(true)}}>Hourly</Tab>
          </TabList>
          <TabPanels className='max-h-64'>
            <TabPanel className='max-h-64'>
              <Summary degrees={degrees} weather={weather} />
            </TabPanel>
            <TabPanel>
              <Hourly weather={weather} timeOfDay={timeOfDay} start={start}/>
            </TabPanel>
          </TabPanels>
        </TabGroup>
        :
        ''
      }
    </div>
  )
}

export default Details
