const express=require('express')
const {redirect,fetch,render}=require('../controllers/controllers')
const {AllRoute}=require('../controllers/ErrorController')
const router=express.Router()
router.route('/').get(redirect)
router.route('/show').get(render)
router.route('/Fetch').post(fetch)
router.route('*').all(AllRoute)
module.exports=router
