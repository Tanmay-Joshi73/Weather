const dotenv=require('dotenv').config()
const express=require('express')
const routes=require('./routes/router')
const AppError=require('./appError')
const bodyparser = require('body-parser')
const {ShowError}=require('./controllers/ErrorController')
const PORT=process.env.PORT || 3000;
const fs=require('fs')
const app=express()
const path=require('path')
app.use('/public',express.static(path.join(`${__dirname}`, 'public'))) 
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())
app.use('',routes)
app.use(ShowError)
app.listen(PORT,'0.0.0.0',()=>{
    console.log("Listenig to the server")
    
})