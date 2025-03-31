require('dotenv').config()
const express = require('express')
const https = require('node:https');
const app = express()
const cors = require('cors')

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

var whitelist = ['http://localhost:5173', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.get('/:q', cors(corsOptions), async (req, res) => {
    const q = req.params.q
    const appid = process.env.WEATHER_API_KEY
    const url = `${process.env.WEATHER_APP_URI}?${q}&appid=${appid}`
    console.log(q, appid)
    const response = await fetch(url) // Await the fetch call
    const data = await response.json() // Parse the JSON response
    res.send(data) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})