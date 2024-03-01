const express = require('express');
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express();
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    // origin: ["https://weatherwherever.vercel.app"],
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}))
const port = 8000;

app.listen(port, () => {
    console.log("Server is working")
})

app.get('/', (req, res) => {
    res.json('Hello world')
});

app.post('/location', async (req, res) => {
    const value = req.body.value

    if (JSON.stringify(value) !== '{}' && value !== null){
        await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.API_KEY}&q=${value}`)
        .then((result) => {
            return res.json(result.data)
        }).catch((err) => {
            console.log(err)
        });
    }
})

app.post('/getWeather', async (req, res) => {
    const locationKey = req.body.locationKey
    const location = req.body.location

    if (locationKey !== null){
        let cityData

        await axios.get(`http://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=${process.env.API_KEY}`)
        .then((result) => {
            cityData = result.data
        })
        .catch(err => console.log(err))

        await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.API_KEY}&details=true`)
        .then((result) => {
            return res.json({
                city: cityData,
                weather: result.data[0]
            })
        })
        .catch(err => console.log(err))
    }
    else if (location !== null){
        let cityData
        let cityKey

        await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.API_KEY}&q=${location}`)
        .then((res) => {
            cityData = res.data[0]
            cityKey = res.data[0].Key
        })
        .catch((err) => console.log(err))

        if (cityKey){
            await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${process.env.API_KEY}&details=true`)
            .then((result) => {
                return res.json({
                    city: cityData,
                    weather: result.data[0]
                })
            })
            .catch(err => console.log(err))
        }
    }

})

app.post('/forecast5days', async (req, res) => {
    const locationKey = req.body.locationKey
    const metric = req.body.metric

    if (locationKey !== null){
        axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.API_KEY}&details=true&metric=${metric}`)
        .then((result) => {
            return res.json(result.data)
        })
        .catch(err => console.log(err))
    }
})

app.post('/forecast24hours', async (req, res) => {
    const locationKey = req.body.locationKey
    const metric = req.body.metric

    if (locationKey !== null){
        axios.get(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${process.env.API_KEY}&details=true&metric=${metric}`)
        .then((result) => {
            return res.json(result.data)
        })
        .catch(err => console.log(err))
    }
})
