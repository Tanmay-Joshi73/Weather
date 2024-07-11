const express = require('express')
const axios = require('axios');

const fs = require('fs');
let file = fs.readFileSync(`${__dirname}/../weather.html`, 'utf-8')
const API=process.env.API_Info

exports.render = async (req, res) => {
    res.send(file)
   
}
exports.redirect=async(req,res)=>{
    res.redirect('/show')
}
exports.fetch = async (req, res) => {
    try{
    const { city } = req.body
    const Info = API.replace('{city name}', city)
    console.log(Info)
    const ans = await axios.get(Info)
        .then(response => {
            console.log(response)
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
  
    res.send({CityName:'No Such City Found',Tempreture:null,Humidity:null,Error:'Error happening herre motherfucker'})
   }
}