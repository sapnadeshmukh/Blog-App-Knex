const express=require('express')
const router=express.Router()
const registerController=require('../controllers/signupController')

router.post('/',registerController.register)
module.exports=router