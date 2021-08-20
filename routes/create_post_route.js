const express=require('express')
const router=express.Router()
const create_postController=require('../controllers/create_postController')

router.post('/',create_postController.create_post)
module.exports=router