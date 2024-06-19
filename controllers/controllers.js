const express = require('express')
const axios = require('axios');

const fs = require('fs');
const { info } = require('console');
const { addAbortSignal } = require('stream');
let file = fs.readFileSync(`${__dirname}/../weather.html`, 'utf-8')
// API = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=107c8523554984e13e6f4a5915fde75c'
API=process.env.API_Info

exports.render = async (req, res) => {
    res.send(file)
}

exports.fetch = async (req, res) => {
    try{
    const { city } = req.body
    
    const Info = API.replace('{city name}', city)

    const ans = await axios.get(Info)
        .then(response => {
            // console.log(response)
            const data = response.data
            return data
        });
   
    const CityName = ans.name
    const Temp = ''+ ans.main.temp
    const Humidity=''+ans.main.humidity
    const Details={CityName:CityName,Tempreture:Temp,Humidity:Humidity}
    res.setHeader("Content-Type","application/json")
    res.send(Details)
    }
   catch(err){
    res.send({CityName:'No Such City Found',Tempreture:null,Humidity:null})
   }
}