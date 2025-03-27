require('dotenv').config()
const express = require('express')
const https = require('node:https');
const app = express()

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/:q&:appid', async (req, res) => {
    const q = req.params.q
    const appid = req.params.appid
    const url = `${process.env.WEATHER_APP_URI}?${q}&${appid}`
    console.log(q, appid)
    const response = await fetch(url) // Await the fetch call
    const data = await response.json() // Parse the JSON response
    res.send(data) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})