import React from 'react'

function DegreesFormat({contextValue, size, major}) {
    if (major){
        if (contextValue === "c"){
            return (
                <span className={`text-white 2xl:text-9xl xl:text-8xl lg:text-8xl md:text-9xl sm:text-8xl text-8xl select-none`}>°C</span>
            )
        }
        else {
            return (
                <span className={`text-white 2xl:text-9xl xl:text-8xl lg:text-8xl md:text-9xl sm:text-8xl text-8xl select-none`}>°F</span>
            )
        }
    }
    else {
        if (contextValue === "c"){
            return (
                <span className={`text-white ${size} select-none`}>°C</span>
            )
        }
        else {
            return (
                <span className={`text-white ${size} select-none`}>°F</span>
            )
        }
    }
}

export default DegreesFormat