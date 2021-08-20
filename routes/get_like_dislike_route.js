const express=require('express')
const router=express.Router()
const get_like_dislikeController=require('../controllers/getlike_dislikeController')

router.get('/',get_like_dislikeController.get_like_dislike)
module.exports=router