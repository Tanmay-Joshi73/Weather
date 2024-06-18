const express=require('express')
const bodyparser = require('body-parser')
const dotevn=require('dotenv').config()
const PORT=process.env.PORT
const fs=require('fs')
const app=express()
const path=require('path')
app.use('/public',express.static(path.join(`${__dirname}`, 'public'))) 
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())
const {render,fetch}=require('./controllers/controllers')
const bodyParser = require('body-parser')
app.get('/',(req,res)=>{
    res.redirect('/Weather')
})
app.get('/Weather',render)
app.post('/Fetch',fetch)


app.listen(PORT,'127.0.0.1',()=>{
    console.log("Listenig to the server")
})