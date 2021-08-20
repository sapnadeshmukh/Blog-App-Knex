const express=require('express')
const router=express.Router()

router.use('/register',require('./signupRoute'))
router.use('/login',require('./loginRoute'))
router.use('/create_post',require('./create_post_route'))
router.use('/get_post',require('./get_post_route'))
router.use('/like_dislike',require('./like_dislike_route'))
router.use('/get_like_dislike',require('./get_like_dislike_route'))





module.exports=router