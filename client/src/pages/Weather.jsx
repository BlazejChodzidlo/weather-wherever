import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import LocationKeyContext from '../context/LocationKeyContext'
import TemperatureDegreesContext from '../context/TemperatureDegreesContext'
import { ring } from 'ldrs'
import { TypeAnimation } from 'react-type-animation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import DegreesFormat from "../misc/DegreesFormat"
import Forecast from '../components/Forecast'
import Statistics from '../components/Statistics'
import Details from '../components/Details'
import { motion } from "framer-motion"
ring.register()

function Weather({returnDegrees}) {
  const navigate = useNavigate()
  const [weather, setWeather] = useState({})
  const [city, setCity] = useState({})
  const locationParam = useParams().id;
  const locationKey = useContext(LocationKeyContext)
  const currentDegrees = useContext(TemperatureDegreesContext)

  useEffect(() => {
    if (locationParam !== null){
      // axios.post('https://weatherwherever-api.vercel.app/getWeather', {locationKey: locationKey, location: locationParam})
      axios.post('http://localhost:8000/getWeather', {locationKey: locationKey, location: locationParam})
      .then((res) => {
        setWeather(res.data.weather)
        setCity(res.data.city)
      })
      .catch(err => console.log(err))
    }
  }, [locationParam])

  function changeDegrees(){
    if (currentDegrees === 'c'){
      returnDegrees('f')
    }
    else {
      returnDegrees('c')
    }
  }

  const headerVariants = {
    load: {
      opacity: 1,
      transform: 'scale(1)',
      transition: {ease: 'ease', duration: 0.4, delay: 0.2}
    },
    hidden: {
      opacity: 0,
      transform: 'scale(0.98)'
    }
  }

  const widgetOneVariants = {
    load: {
      opacity: 1,
      transform: 'scale(1)',
      transition: {ease: 'ease', duration: 0.4, delay: 0.4}
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
      transition: {ease: 'ease', duration: 0.4, delay: 0.6}
    },
    hidden: {
      opacity: 0,
      transform: 'scale(0.98)'
    }
  }

  return (
    <>
      {
        JSON.stringify(weather) !== '{}' && weather !== null && city !== null && JSON.stringify(city) !== '{}' ? 
        <div className={`w-full h-full min-h-screen bg-gradient-to-b ${weather.IsDayTime ? 'from-sky-500 to-sky-700' : 'from-cyan-900 to-cyan-950'}`}>
          <div className='container h-full min-h-screen flex flex-col p-2 gap-3'>
            <motion.div className='gap-1.5 flex flex-row' variants={headerVariants} initial="hidden" animate={JSON.stringify(weather) !== '{}' ? "load" : ""}>
              <div className={`cursor-pointer aspect-square opacity-70 shadow-md py-2 px-2.5 flex items-center rounded-lg duration-75 ${weather.IsDayTime ? 'bg-sky-650 hover:bg-sky-700' : 'bg-cyan-800 hover:bg-cyan-700'}`} onClick={() => navigate('../')}>
                <FontAwesomeIcon icon={faArrowLeft} size='2xl' color='white'/>
              </div>
              <div className={`cursor-pointer aspect-square opacity-70 shadow-md py-2 px-3 flex items-center rounded-lg duration-75 ${weather.IsDayTime ? 'bg-sky-650 hover:bg-sky-700' : 'bg-cyan-800 hover:bg-cyan-700'}`} onClick={changeDegrees}>
                <span className='font-bold'><DegreesFormat contextValue={currentDegrees} size={'text-2xl'}/></span>
              </div>
              <div className={`opacity-70 shadow-md py-2 px-3 rounded-lg ${weather.IsDayTime ? 'bg-sky-650' : 'bg-cyan-800'} flex-grow`}>
                <span className='text-2xl font-bold text-white select-none'>{currentDegrees === 'c' ? Math.round(weather.Temperature.Metric.Value) : Math.round(weather.Temperature.Imperial.Value)}<DegreesFormat contextValue={currentDegrees} size={'text-2xl'}/></span>
                <span className='mx-2 text-white text-2xl'><span className='font-semibold'>{city.LocalizedName}</span>, {city.AdministrativeArea.LocalizedName}, {city.Country.LocalizedName}</span>
              </div>
            </motion.div>
            <div className='w-full flex 2xl:flex-row xl:flex-row lg:flex-col md:flex-col sm:flex-col flex-col gap-3 h-full'>
              <div className='2xl:w-2/5 xl:w-2/5 lg:w-full md:w-full sm:w-full w-full flex flex-col justify-start items-center'>
                <motion.div variants={widgetOneVariants} initial="hidden" animate={JSON.stringify(weather) !== '{}' ? "load" : ""} className={`opacity-70 relative w-full flex flex-col justify-center items-center shadow-md rounded-lg p-3 ${weather.IsDayTime ? 'bg-sky-650' : 'bg-cyan-800'}`}>
                  <div className='flex flex-row justify-center items-center gap-4 relative z-10'>
                    <img src={`/icons/${weather.WeatherIcon}.svg`} alt={weather.WeatherText} className={`2xl:w-64 xl:w-64 lg:w-60 md:w-60 sm:w-60 w-60 aspect-square pointer-events-none select-none`}/>
                    <span className='2xl:text-9xl xl:text-8xl lg:text-8xl md:text-9xl sm:text-8xl text-8xl font-bold text-white select-none tracking-tighter'>{currentDegrees === 'c' ? Math.round(weather.Temperature.Metric.Value) : Math.round(weather.Temperature.Imperial.Value)}<DegreesFormat contextValue={currentDegrees} major={true}/></span>
                  </div>
                  <span className='mx-2 text-white text-3xl relative z-10 text-center'><span className='font-semibold'>{city.LocalizedName}</span>, {city.AdministrativeArea.LocalizedName}, {city.Country.LocalizedName}</span>
                  <span className='text-2xl font-medium text-white relative z-10'>{weather.WeatherText}</span>
                  <div className={`opacity-50 w-full rounded-lg h-full absolute`} style={{backgroundImage: `url("/backgrounds/${weather.WeatherIcon}.jpg")`, backgroundSize: 'cover'}}></div>
                </motion.div>
                <motion.div variants={widgetTwoVariants} initial="hidden" animate={JSON.stringify(weather) !== '{}' ? "load" : ""} className={`opacity-70 w-full flex flex-row items-center justify-around mt-3 shadow-md rounded-lg p-3 ${weather.IsDayTime ? 'bg-sky-650' : 'bg-cyan-800'}`}>
                    <div className='flex flex-col'>
                      <span className='text-slate-200'>Pressure</span>
                      <span className='text-white text-xl font-medium'>{currentDegrees === "c" ? `${weather.Pressure.Metric.Value}${weather.Pressure.Metric.Unit}` : `${weather.Pressure.Imperial.Value}${weather.Pressure.Imperial.Unit}`}</span>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-slate-200'>Real feel temperature</span>
                      <span className='text-xl font-medium text-white select-none tracking-tighter'>{currentDegrees === 'c' ? Math.round(weather.RealFeelTemperature.Metric.Value) : Math.round(weather.Temperature.Imperial.Value)}<DegreesFormat contextValue={currentDegrees} size={'text-xl'}/></span>
                    </div>
                    <div className='flex flex-col relative'>
                      <div className='w-full'><span className='text-slate-200'>Wind</span><span className='text-white ml-3'>{weather.Wind.Direction.English}</span></div>
                      <span className='text-white text-xl font-medium'>{currentDegrees === "c" ? `${Math.round(weather.Wind.Speed.Metric.Value)} ${weather.Wind.Speed.Metric.Unit}` : `${Math.round(weather.Wind.Speed.Imperial.Value)} ${weather.Wind.Speed.Imperial.Unit}`}</span>
                    </div>
                </motion.div>
            </div>
              <div className={`2xl:w-3/5 xl:w-3/5 lg:w-full md:w-full sm:w-full w-full flex flex-col justify-start items-center flex-grow`}>
                <Statistics locationKey={city.Key} degrees={currentDegrees} timeOfDay={weather.IsDayTime} />
              </div>
            </div>
            <span className='text-white font-semibold opacity-75'>Five-day forecast</span>
            <Forecast locationKey={city.Key} degrees={currentDegrees} timeOfDay={weather.IsDayTime}/>
            <span className='text-white font-semibold opacity-75'>Details of the day</span>
            <Details locationKey={city.Key} degrees={currentDegrees} timeOfDay={weather.IsDayTime} />
            <div className='w-full flex flex-row opacity-70 items-center'>
              <div className='text-white text-sm'>© Błażej Chodzidło</div>
              <div className='flex-grow flex flex-row-reverse'><img src="/accuweather.png" className='h-4' alt='accu-weather logo' /></div>
            </div>
          </div>
        </div>
        :
        <div className={`w-full h-full min-h-screen bg-sky-500 flex flex-col justify-center items-center`}>
            <l-ring
                size="40"
                stroke="5"
                bg-opacity="0"
                speed="2" 
                color="white"
              ></l-ring>
              <div className='text-white w-14 mt-2'>
                <span className='text-left'>Loading<TypeAnimation speed={15} sequence={["", 1000,  ".", 1000, "..", 1000, "...", 1000]} repeat={Infinity}/></span>
              </div>
        </div>
      }
    </>
  )
}

export default Weather
