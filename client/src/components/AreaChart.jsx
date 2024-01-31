import React, { useEffect, useState } from 'react'
import { AreaChart as Chart } from '@tremor/react'

function AreaChart({weather, stat, degrees}) {
    const [data, setData] = useState([])

    useEffect(() => {
        if (weather){
            let chartData = []
            weather.forEach(element => {
                switch(stat){
                    case 'humidity':
                        const humidityObject = {
                            date: element.Date.substring(5, 10),
                            "Average": element.Day.RelativeHumidity.Average,
                            "Maximum": element.Day.RelativeHumidity.Maximum,
                            "Minimum": element.Day.RelativeHumidity.Minimum,
                        }
                        chartData.push(humidityObject);
                        break;
                    case "wind":
                        const windObject = {
                            date: element.Date.substring(5, 10),
                            "Speed": element.Day.Wind.Speed.Value
                        }
                        chartData.push(windObject);
                        break;
                    case "clouds_cover":
                        const cloudsCover = {
                            date: element.Date.substring(5, 10),
                            "Cloud Cover": element.Day.CloudCover
                        }
                        chartData.push(cloudsCover);
                        break;
                    default:
                        console.log('Something went wrong.')
                }
            });
            setData(chartData)
        }
    }, [weather])

    const valueFormatter = (number) => {
        if (stat === "humidity" || stat === "clouds_cover"){
            return `${number}%`
        }
        else {
            if (degrees === "c"){
                return `${number} km/h`
            }
            else {
                return `${number} mi/h`
            }
        }
        
    }

  return (
    <>
        {
            JSON.stringify(data) !== '[]' && data !== null ?
            <div className='max-h-full max-w-full min-w-full min-h-full w-full h-full'>
                {
                    stat === "humidity" ? 
                    <Chart data={data} className='max-h-full max-w-full' index='date' yAxisWidth={65} enableLegendSlider={true} showAnimation={true} categories={["Average", "Maximum", "Minimum"]} colors={["emerald", "cyan", "teal"]} valueFormatter={valueFormatter}/>
                    :
                    <div className='max-h-full max-w-full min-w-full min-h-full w-full h-full'>
                        {
                            stat === "wind" ?
                            <Chart data={data} className='max-h-full max-w-full' index='date' yAxisWidth={65} enableLegendSlider={true} showAnimation={true} categories={["Speed"]} colors={["cyan"]} valueFormatter={valueFormatter}/>
                            :
                            <Chart data={data} className='max-h-full max-w-full' index='date' yAxisWidth={65} enableLegendSlider={true} showAnimation={true} categories={["Cloud Cover"]} colors={["teal"]} valueFormatter={valueFormatter}/>
                        }
                    </div>
                }
            </div>
            :
            <></>
        }
    </>
  )
}

export default AreaChart