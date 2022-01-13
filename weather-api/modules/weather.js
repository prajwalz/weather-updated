const express = require('express')
require('dotenv/config')
const unsplashSDK = require('unsplash-js')
const fetch = require('node-fetch')

const router = express.Router()
const w_secretkey = process.env.W_SECRET_KEY
const u_secretkey = process.env.U_SECRET_KEY

const unsplash = unsplashSDK.createApi({
    accessKey: u_secretkey,
    fetch: fetch
  });

router.get('/' , (req,res) => {
    res.send('usage /weather/(place to search)')
})


router.get('/:query' , async (req,res) => {
    const query = req.params.query
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${w_secretkey}&q=${query}&days=3&aqi=no&alerts=no`)
    const weather_response = await response.json()
    let img_response
    let number = Math.floor(Math.random() * 20); 
    await unsplash.search.getPhotos({query: weather_response.current.condition.text+" "+query ,page: 1,orientation: 'landscape',perPage: 20}).then(
        response => {
            img_response = response.response.results[number]
        }
    )
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const data = Object.assign(weather_response,img_response)
    res.send(data)
})



module.exports = router