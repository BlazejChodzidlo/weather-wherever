import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

function Search({returnKey}) {
  const [loaded, setLoaded] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [cities, setCities] = useState({})
  const navigate = useNavigate()

  function clickOnBackdrop(e){
    setOpenDialog(prev => !prev)
    setCities({})
  }

  function onInput(e){
    // axios.post('https://weatherwherever-api.vercel.app/location', {value: e.target.value})
    axios.post('http://localhost:8000/location', {value: e.target.value})
    .then((res) => {
      setCities(res.data)
    })
    .catch(err => console.log(err))
  }

  function changePage(city, key){
    returnKey(key)
    navigate(`/${city}`)
  }

  function whenLoaded(){
    setLoaded(prev => !prev)
  }

  const imageOne = {
    load: {
      opacity: 1,
      transform: 'scale(1)',
      transition: {ease: 'ease', duration: 0.4, delay: 0}
    },
    hidden: {
      opacity: 0,
      transform: 'scale(0.98)'
    }
  }
  const imageTwo = {
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
  const imageThree = {
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
  const imageFour = {
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
  const imageFive = {
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
    <div className='w-full min-h-screen flex bg-gradient-to-b from-slate-700 to-slate-800'>
      <div className='w-full min-h-screen absolute grid grid-col-6 gap-5 p-5 opacity-45' style={{gridAutoRows: 'minmax(auto, auto)'}}>
        <motion.div variants={imageOne} initial="hidden" animate={loaded ? "load" : ""} layout className='rounded-lg bg-slate-600 shadow-lg' style={{gridColumn: '1/3', gridRow: '1/5', backgroundImage: 'url(/paris.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}><img className='hidden' src={'https://unsplash.it/1200/310?random'} onLoad={() => whenLoaded()} onError={err => console.log('error', err)}/></motion.div>
        <motion.div variants={imageTwo} initial="hidden" animate={loaded ? "load" : ""} layout className='rounded-lg bg-slate-600 shadow-lg' style={{gridColumn: '3/7', gridRow: '1/3', backgroundImage: 'url(/newyork.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}></motion.div>
        <motion.div variants={imageThree} initial="hidden" animate={loaded ? "load" : ""} layout className='rounded-lg bg-slate-600 shadow-lg' style={{gridColumn: '3/5', gridRow: '3/5', backgroundImage: 'url(/warsaw.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}></motion.div>
        <motion.div variants={imageFour} initial="hidden" animate={loaded ? "load" : ""} layout className='rounded-lg bg-slate-600 shadow-lg' style={{gridColumn: '5/7', gridRow: '3/7', backgroundImage: 'url(/london.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}></motion.div>
        <motion.div variants={imageFive} initial="hidden" animate={loaded ? "load" : ""} layout className='rounded-lg bg-slate-600 shadow-lg' style={{gridColumn: '1/5', gridRow: '5/7', backgroundImage: 'url(/sydney.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}></motion.div>
      </div>
      <div className='z-10 relative w-full h-min-screen flex justify-center items-center flex-col' style={openDialog ? {display: 'none'} : {display: 'flex'}}>
        <p className='text-slate-300 text-5xl mb-2 font-semibold font-mono 2xl:w-2/5 xl:w-2/5 lg:w-2/5 md:2/5 sm:w-3/5 w-10/12'>weather wherever</p>
        <input type='text' onFocus={() => setOpenDialog(prev => !prev)} placeholder='Find a city.' className='rounded-xl px-2 py-3 shadow 2xl:w-2/5 xl:w-2/5 lg:w-2/5 md:2/5 sm:w-3/5 w-10/12'/>
      </div>
      <motion.div onClick={clickOnBackdrop} key={openDialog} onAnimationComplete={() => {document.getElementById('citySearchInput').focus()}} initial={{opacity: 0}} animate={{opacity: 0.8}} transition={{duration: 0.5}} className='z-20 absolute w-full h-screen flex justify-start items-start flex-col bg-slate-300 opacity-80 py-20 2xl:px-48 xl:px-48 lg:px-48 md:px-32 sm:px-14 px-12' style={openDialog ? {display: 'flex'} : {display: 'none'}}>
        <input type='text' autoComplete='off' placeholder='Type something' onInput={(e) => onInput(e)} id='citySearchInput' className='bg-transparent text-4xl w-full border-0 outline-0 focus:outline-0 focus:border-b-gray-500 focus:outline-transparent shadow-none focus:border-b-4 font-semibold py-2 px-4 leading-relaxed border-b-4 focus:ring-0 ring-0' onClick={(e) => {e.stopPropagation();}}/>
        {
          JSON.stringify(cities) !== '{}' && cities !== null ?
          <div className='flex w-full flex-col gap-2 mt-5 overflow-auto max-h-120 pb-2'>
            {
              cities.map((city, index) => {
                return (
                  <div onClick={() => changePage(city.LocalizedName, city.Key)} key={index} className='w-full text-2xl py-2 px-3 bg-slate-200 hover:bg-slate-100 cursor-pointer rounded'>
                    <span><span className='font-medium'>{city.LocalizedName}</span>, {city.AdministrativeArea.LocalizedName}, {city.Country.LocalizedName}</span>
                  </div>
                )
              })
            }
          </div>
          :
          <></>
        }
        <FontAwesomeIcon icon={faX} size='2xl' className='absolute top-3 right-3 cursor-pointer' onClick={(e) => {setOpenDialog(prev => !prev); {e.stopPropagation(); setCities({})}}}/>
      </motion.div>
    </div>
  )
}

export default Search
