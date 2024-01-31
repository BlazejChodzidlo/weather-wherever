import React, { useEffect, useState } from 'react'
import { BarChart as Chart } from '@tremor/react'

function BarChart({weather, weatherType, degrees}) {
    const [data, setData] = useState([])
    
    useEffect(() => {
      if (weather){

        let chartData = []
        weather.forEach(element => {
            switch (weatherType){
                case "rain":
                    const rainObject = {
                        date: element.Date.substring(5, 10),
                        'Rain Probability': element.Day.RainProbability,
                        'Rain Amount': element.Day.Rain.Value
                    }
                    chartData.push(rainObject)
                    break;
                case "snow":
                    let snowObject = {
                        date: element.Date.substring(5, 10),
                        'Snow Probability': element.Day.SnowProbability,
                        'Snow Amount': element.Day.Snow.Value
                    }
                    chartData.push(snowObject)
                    break;
                default:
                    console.log('Something went wrong.');
                    break;
            }
        });

        setData(chartData)
      }  
    }, [weather])

    const customTooltip = ({ payload, active }) => {
        if (!active || !payload) return null;
        return (
          <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
            {payload.map((category, idx) => (
              <div key={idx} className="flex flex-1 space-x-2.5">
                <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
                <div className="space-y-1">
                  <p className="text-tremor-content">{category.dataKey}</p>
                  <p className="font-medium text-tremor-content-emphasis">{category.value}{
                    category.dataKey.substring(category.dataKey.indexOf('P')) === "Probability" ?
                    '%'
                    :
                    <>
                        {degrees === 'c' ? 'mm' : 'in'}
                    </>
                  }</p>
                </div>
              </div>
            ))}
          </div>
        );
      };

  return (
    <>
        {
            JSON.stringify(data) !== '[]' ?
            <div className='max-h-full max-w-full min-w-full min-h-full w-full h-full'>
                {
                    weatherType === 'rain' ? 
                    <Chart maxValue={100} className='h-96 max-h-full max-w-full' customTooltip={customTooltip} enableLegendSlider={true} showGridLines={true} showAnimation={true} data={data} index='date' colors={["cyan", "teal"]} categories={['Rain Probability', 'Rain Amount']} yAxisWidth={48}/>
                    :
                    <Chart maxValue={100} className='h-96 max-h-full max-w-full' customTooltip={customTooltip} enableLegendSlider={true} showGridLines={true} showAnimation={true} data={data} index='date' colors={["cyan", "teal"]} categories={['Snow Probability', 'Snow Amount']} yAxisWidth={48}/>
                }
            </div>
            :
            <></>
        }
    </>
  )
}

export default BarChart