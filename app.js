const express=require('express')
const fs=require('fs')
const app=express()
const path=require('path')
const {render,fetch}=require('./controllers/controllers')
app.get('/Weather',render)
app.post('/Fetch',fetch)
app.use(express.static(path.join(__dirname, 'public'))) 


app.listen(8000,'127.0.0.1',()=>{
    console.log("Listenig to the server")
})