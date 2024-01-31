import { AreaChart } from '@tremor/react';
import React, { useEffect, useState } from 'react'

function Summary({weather, degrees}) {
    const [data, setData] = useState([])
    useEffect(() => {
        if (weather){
            let array = []
            let i = 0;
            weather.forEach(element => {
                if (i % 2 == 0){
                  const object = {
                    date: element.DateTime.substring(11, 16),
                    "Temperature": Math.round(element.Temperature.Value),
                    "Rain Amount": element.Rain.Value,
                    "Wind": Math.round(element.Wind.Speed.Value)
                  }
                  array.push(object)
                }
                i++
            });
            setData(array)
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
                    category.dataKey === "Temperature" ?
                    <>
                        {degrees === 'c' ? '°C' : '°F'}
                    </>
                    :
                    <>
                        {
                            category.dataKey === "Wind" ? 
                            <>
                                {degrees === 'c' ? ' km/h' : ' mi/h'}
                            </>
                            :
                            <>
                                {degrees === 'c' ? ' mm' : ' in'}
                            </>
                        }
                    </>
                  }</p>
                </div>
              </div>
            ))}
          </div>
        );
      };

  return (
    <div className='w-full h-full'>
        {
            JSON.stringify(data) !== '[]' && data !== null ?
            <AreaChart className='h-64' showGradient={false} customTooltip={customTooltip} data={data} index='date' curveType='monotone' categories={["Temperature", "Rain Amount", "Wind"]} colors={["amber", "cyan", "emerald"]} yAxisWidth={65} enableLegendSlider={true} showAnimation={true}/>
            :
            ''
        }
    </div>
  )
}

export default Summary