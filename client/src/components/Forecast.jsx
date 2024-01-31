import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import DegreesFormat from '../misc/DegreesFormat'
import { motion } from "framer-motion"


export const sliderLeft = (ref) => {
    ref.current.style.scrollBehavior = 'smooth'
    ref.current.scrollLeft = ref.current.scrollLeft - 500
}

export const sliderRight = (ref) => {
    ref.current.style.scrollBehavior = 'smooth'
    ref.current.scrollLeft = ref.current.scrollLeft + 500
}

function Forecast({locationKey, degrees, timeOfDay}) {
    const [forecast, setForecast] = useState({})
    const containerRef = useRef()

    useEffect(() => {
        if (locationKey){
            let metric
            if (degrees === 'c'){
                metric = true
            }
            else {
                metric = false
            }

            axios.post('http://localhost:8000/forecast5days', {locationKey: locationKey, metric: metric})
            .then((res) => {
                setForecast(res.data)
            })
            .catch(err => console.log(err))
        }
    }, [locationKey, degrees])

    const handleMouseDown = React.useCallback((e) => {
        const ele = containerRef.current;
        ele.style.scrollBehavior = ''
        if (!ele) {
            return;
        }
        const startPos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };

        const handleMouseMove = (e) => {
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;
            ele.scrollTop = startPos.top - dy;
            ele.scrollLeft = startPos.left - dx;
            updateCursor(ele);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resetCursor(ele);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, []);

    const handleTouchStart = React.useCallback((e) => {
        const ele = containerRef.current;
        ele.style.scrollBehavior = ''
        if (!ele) {
            return;
        }
        const touch = e.touches[0];
        const startPos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            x: touch.clientX,
            y: touch.clientY,
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            const dx = touch.clientX - startPos.x;
            const dy = touch.clientY - startPos.y;
            ele.scrollTop = startPos.top - dy;
            ele.scrollLeft = startPos.left - dx;
            updateCursor(ele);
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            resetCursor(ele);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }, []);

    const updateCursor = (ele) => {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';
    };

    const resetCursor = (ele) => {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');
    };
    

  return (
    <div className='opacity-70 w-full flex flex-row items-center select-none relative'>
        <div onClick={() => sliderLeft(containerRef)} className={`opacity-50 hover:opacity-70 cursor-pointer shadow-sm flex justify-center items-center h-8 w-3 absolute rounded-sm left-0 ${timeOfDay ? 'bg-sky-400' : 'bg-cyan-600'}`}><FontAwesomeIcon icon={faCaretLeft} size='lg'/></div>
        <div className='flex flex-row items-center gap-3 overflow-hidden select-none' ref={containerRef} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
        {
            JSON.stringify(forecast) !== '{}' && forecast !== null ? 
            <>
                {
                    forecast.DailyForecasts.map((day, index) => {
                        let iterationDay = day.Date.substring(0, 10)

                        return (
                            <motion.div whileHover={{backgroundColor: (timeOfDay ? 'rgba(3, 105, 161, 0.7)' : 'rgba(14, 116, 144, 0.7)'), transition: {duration: 0.1}}} className={`h-full flex flex-col shadow rounded-md gap-0.5 py-2.5 px-4 ${timeOfDay ? 'bg-sky-650' : 'bg-cyan-800'} w-96`} key={index}>
                                <span className='text-slate-200 w-full text-center'>{iterationDay.substring(5)}</span>
                                <div className='flex flex-row gap-5 flex-grow'>
                                    <img src={`/icons/${day.Day.Icon}.svg`} className='w-24 aspect-square pointer-events-none'/>
                                    <div className='flex flex-col justify-evenly items-center w-60'>
                                        <span className='text-white text-md text-center font-semibold'>{day.Day.ShortPhrase}</span>
                                        <div className='w-full flex flex-row justify-center items-center gap-2'>
                                            <span className='text-white font-medium'><FontAwesomeIcon icon={faSun} size='xl'/> {Math.round(day.Temperature.Maximum.Value)}<DegreesFormat contextValue={degrees} /></span>
                                            <span className='text-white font-medium'><FontAwesomeIcon icon={faMoon} size='xl'/> {Math.round(day.Temperature.Minimum.Value)}<DegreesFormat contextValue={degrees} /></span>
                                        </div>
                                    </div> 
                                </div>
                            </motion.div>
                        )
                    
                    })
                }
            </>
            :
            <></>
        }
        </div>
        <div onClick={() => sliderRight(containerRef)} className={`opacity-50 hover:opacity-70 cursor-pointer shadow-sm flex justify-center items-center w-3 h-8 absolute rounded-sm right-0 ${timeOfDay ? 'bg-sky-400' : 'bg-cyan-600'}`}><FontAwesomeIcon icon={faCaretRight} size='lg'/></div>
    </div>
  )
}

export default Forecast