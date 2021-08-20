const express=require('express')
const router=express.Router()
const get_postController=require('../controllers/get_postController')

router.get('/',get_postController.get_post)
module.exports=router