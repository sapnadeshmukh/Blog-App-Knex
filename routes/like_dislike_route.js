const express=require('express')
const router=express.Router()
const like_dislikeController=require('../controllers/like_dislikeController')

router.post('/',like_dislikeController.like_dislike)
module.exports=router