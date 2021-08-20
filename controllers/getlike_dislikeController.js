const jwt=require('jsonwebtoken')
const knex=require('../Database/connection')

module.exports.get_like_dislike=(req, res) =>{
        console.log({"token": req.headers.authorization})

        if (req.headers.authorization !== undefined){
            var token = req.headers.authorization
            var decoded = jwt.verify(token, process.env.SECRETKEY);
            console.log("decoded",decoded)
            knex
            .select('*')
            .from('user_post')
            .join('like_dislike',function() {
                this.on('user_post.user_id','like_dislike.user_id')
            })
            .then((data) =>{
                console.log("data",data)
                res.send({"like and dislike data's": data})
            })
        }else{
            res.send({"Error": "Please login...."})
        }
    
}