import React, { useEffect, useState } from 'react'
import {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  } from "@tremor/react";
import axios from 'axios';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { motion } from "framer-motion"

function Statistics({locationKey, degrees, timeOfDay}) {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        if (locationKey){
            let metric
            if (degrees === 'c'){
                metric = true
            }
            else {
                metric = false
            }
            // axios.post('https://weatherwherever-api.vercel.app/forecast5days', {locationKey: locationKey, metric: metric})
            axios.post('http://localhost:8000/forecast5days', {locationKey: locationKey, metric: metric})
            .then((res) => {
                setWeather(res.data)
            })
            .catch(err => console.log(err))
        }
    }, [locationKey, degrees])

    const widgetOneVariants = {
        load: {
            opacity: 1,
            transform: 'scale(1)',
            transition: {ease: 'ease', duration: 0.4, delay: 0.6}
        },
        hidden: {
            opacity: 0,
            transform: 'scale(0.98)'
        }
    }

    const widgetTwoVariants = {
        load: {
            opacity: 1,
            transform: 'scale(1)',
            transition: {ease: 'ease', duration: 0.4, delay: 0.8}
        },
        hidden: {
            opacity: 0,
            transform: 'scale(0.98)'
        }
    }

  return (
    <TabGroup className={`opacity-70 gap-3 h-full ${timeOfDay ? 'dark' : ''}`}>
        {
            JSON.stringify(weather) !== '{}' && weather !== null ?
            <div className='flex flex-col gap-3 h-full'>
                <motion.TabList variant='solid' variants={widgetOneVariants} initial="hidden" animate={JSON.stringify(weather) !== '{}' ? "load" : ""}>
                    <Tab>Rain</Tab>
                    <Tab>Snow</Tab>
                    <Tab>Humidity</Tab>
                    <Tab>Wind</Tab>
                    <Tab>Cloud Cover</Tab>
                </motion.TabList>
                <motion.TabPanels variant='solid' variants={widgetOneVariants} initial="hidden" animate={JSON.stringify(weather) !== '{}' ? "load" : ""} className={`${timeOfDay ? 'bg-sky-650' : 'bg-cyan-800'} shadow-md rounded-lg h-full flex items-center`}>
                    <TabPanel>
                        <BarChart weather={weather.DailyForecasts} weatherType={'rain'} degrees={degrees}/>
                    </TabPanel>
                    <TabPanel>
                        <BarChart weather={weather.DailyForecasts} weatherType={'snow'} degrees={degrees}/>
                    </TabPanel>
                    <TabPanel>
                        <AreaChart weather={weather.DailyForecasts} stat={'humidity'} degrees={degrees}/>
                    </TabPanel>
                    <TabPanel>
                        <AreaChart weather={weather.DailyForecasts} stat={'wind'} degrees={degrees}/>
                    </TabPanel>
                    <TabPanel>
                        <AreaChart weather={weather.DailyForecasts} stat={'clouds_cover'} degrees={degrees}/>
                    </TabPanel>
                </motion.TabPanels>
            </div>
            :
            <></>
        }
    </TabGroup>
  )
}

export default Statistics
