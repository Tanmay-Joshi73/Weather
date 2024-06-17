const express=require('express')
const fs=require('fs')
let file=fs.readFileSync(`${__dirname}/../weather.html`,'utf-8')

exports.render=async(req,res)=>{
res.send(file)
}
exports.fetch=async(req,res)=>{
res.send('hey it is working my boi')
}