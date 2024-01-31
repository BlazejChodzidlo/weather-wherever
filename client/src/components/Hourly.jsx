import React, { useRef, useState } from 'react'
import { sliderLeft, sliderRight } from './Forecast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import Card from './Card'

function Hourly({weather, timeOfDay, start}) {
    const containerRef = useRef()
    
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
        <div className='w-full h-full flex flex-row items-center select-none relative'>
            <div onClick={() => sliderLeft(containerRef)} className={`z-10 opacity-50 hover:opacity-70 cursor-pointer shadow-sm flex justify-center items-center h-8 w-3 absolute rounded-sm left-0 ${timeOfDay ? 'bg-sky-400' : 'bg-cyan-600'}`}><FontAwesomeIcon icon={faCaretLeft} size='lg'/></div>
            <div ref={containerRef} className='w-full h-full overflow-hidden flex flex-row gap-2 select-none' onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
                {
                    JSON.stringify(weather) !== '[]' && weather !== null ?
                    <>  
                        {
                            weather.map((hour, index) => {
                                let transition = index / 10;

                                return (
                                    <Card key={index} data={hour} transition={transition} start={start}/>
                                )
                            })
                        }
                    </>
                    :
                    ''
                }
            </div>
            <div onClick={() => sliderRight(containerRef)} className={`z-10 opacity-50 hover:opacity-70 cursor-pointer shadow-sm flex justify-center items-center w-3 h-8 absolute rounded-sm right-0 ${timeOfDay ? 'bg-sky-400' : 'bg-cyan-600'}`}><FontAwesomeIcon icon={faCaretRight} size='lg'/></div>
        </div>
  )
}

export default Hourly