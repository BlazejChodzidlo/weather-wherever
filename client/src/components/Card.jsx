import React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'

function Card({data, transition, start}) {
  return (
    <motion.div layout className='flex flex-col w-40 min-w-40 h-64 max-w-40' style={{opacity: 0}} initial={"hidden"} animate={start ? 'visible' : ''} transition={{duration: 0.2, delay: transition}} variants={{hidden: {opacity: 0, transform: 'translateX(-20px)'}, visible: {opacity: 1, transform: 'translateX(0px)'}}}>
      <div className='w-full flex flex-col flex-grow relative'>
        <div className='w-full h-full bg-gradient-to-b from-transparent to-slate-100 bg-opacity-5 absolute opacity-10 hover:opacity-20 duration-100'>
        </div>
        <div className='pointer-events-none w-full h-full relative border-b border-b-tremor-border hover:border-b-tremor-brand duration-100 p-3 gap-1 flex flex-col items-start'>
          <img src={`/icons/${data.WeatherIcon}.svg`} alt={data.IconPhrase} className='aspect-square h-16 flex-grow-0 pointer-events-none select-none'/>
          <span className='text-white font-bold'>{Math.round(data.Temperature.Value)}°{data.Temperature.Unit}</span>
          <span className='text-white text-left w-full block text-pretty font-medium'>{data.IconPhrase}</span>
          <span className='text-white text-left w-full block text-pretty'><FontAwesomeIcon icon={faDroplet} /> {data.RainProbability}%</span>
          <span className='text-white text-left w-full block text-pretty'>{Math.round(data.Wind.Speed.Value)} {data.Wind.Speed.Unit}</span>
        </div>
      </div>
      <div className='text-center text-white text-md mt-1 text-sm'>
        {data.DateTime.substring(11, 16)}
      </div>
    </motion.div>
  )
}

export default Card