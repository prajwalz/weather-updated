const unsplashSDK = require('unsplash-js')
const express = require('express')
require('dotenv/config')
const fetch = require('node-fetch')
const { response } = require('express')

const router = express.Router()
const secretkey = process.env.U_SECRET_KEY


const unsplash = unsplashSDK.createApi({
  accessKey: secretkey,
  fetch: fetch
});




const getImage =async (query) => {
    unsplash.search.getPhotos({query: query ,page: 1,orientation: 'portrait'}).then(
        response => {
            console.log(response.response.results[0])
            return (response.response.results[0])
        }
    )
}


module.exports = getImage