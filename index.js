require('dotenv').config()
const express = require('express')
const https = require('node:https');
const app = express()
const cors = require('cors')

const port = process.env.PORT || 5000

// Cancel out the automatic favicon search done by browser
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // Respond with No Content
});

// For testing purposes only - No need to remove
app.get('/',cors(corsOptions), (req, res) => {
  res.send('Hello World!')
})


// Featch both weather and image data from the APIs
app.get('/:q', cors(corsOptions), async (req, res) => {
    const q = req.params.q
    // Weather data fetching
    const weatherUrl = `${process.env.WEATHER_APP_URI}?q=${q}&appid=${process.env.WEATHER_API_KEY}`
    const weatherResponse = await fetch(weatherUrl) 
    const weatherData = await weatherResponse.json() 
    // Image data fetching
    const imageUrl = `${process.env.UNSPLASH_APP_URI}?client_id=${process.env.UNSPLASH_API_KEY}&query=${q}&orientation=landscape&per_page=5&page=1`
    const imageResponse = await fetch(imageUrl)
    const imageData = await imageResponse.json()
    res.send({
      weather: weatherData,
      image: imageData
    })

});

// duplicate of the above for testing purposes
app.get('search/:q', cors(corsOptions), async (req, res) => {
  const q = req.params.q
  // Weather data fetching
  const weatherUrl = `${process.env.WEATHER_APP_URI}?q=${q}&appid=${process.env.WEATHER_API_KEY}`
  const weatherResponse = await fetch(weatherUrl) 
  const weatherData = await weatherResponse.json() 
  // Image data fetching
  const imageUrl = `${process.env.UNSPLASH_APP_URI}?client_id=${process.env.UNSPLASH_API_KEY}&query=${q}&orientation=landscape&per_page=5&page=1`
  const imageResponse = await fetch(imageUrl)
  const imageData = await imageResponse.json()
  console.log(imageUrl)
  res.send({
    weather: weatherData,
    image: imageData
  })

});

// CORS setup 
var whitelist = ['https://weather-backend-6kka.onrender.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// -------For testing purposes only - No need to remove. Works with URl searchs
// var whitelist = ['http://localhost:5173', 'http://localhost:3000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})