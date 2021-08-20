const jwt=require('jsonwebtoken')
const knex=require('../Database/connection')


module.exports.like_dislike=(req, res) =>{
        console.log({"token": req.headers.authorization});
        
        if (req.headers.authorization !== "" && req.headers.authorization !== undefined){
            var token = req.headers.authorization
            // console.log(token)
            if (req.body.like !== undefined && req.body.dislike !== undefined && req.body.post_id !== undefined){
                var decoded = jwt.verify(token, process.env.SECRETKEY);
                console.log(decoded)
                if (req.body.like || !req.body.dislike || !req.body.like || req.body.dislike){
                    knex('user_post').where('id', req.body.post_id)
                    .then((data) =>{
                        console.log("data",data)
                        if (data.length>0){
                            knex('like_dislike').where('post_id', req.body.post_id).andWhere('user_id',req.body.user_id)
                            .then((data) =>{
                                if (data.length>0){
                                    var dic = req.body;
                                    // dic.user_id=re;
                                    knex('like_dislike').update(dic)
                                    .then(() =>{
                                        console.log({"Success": "Thank you! like and dislike updated successfully!"});
                                        res.send({"Success": "Thank you! like and dislike updated successfully!"});
                                    })
                                }else{
                                    var dic = req.body;
                                    // dic.user_id=decoded.id
                                    knex('like_dislike').insert(dic)
                                    .then(() =>{
                                        console.log({"Success": "Thank you! you have done like and dislike"});
                                        res.send(({"Success": "Thank you! you have done like and dislike"}));
                                    }).catch(() =>{
                                        console.log(err);
                                    })
                                }
                            }).catch((err) =>{
                                console.log(err);
                            })
                        }else{
                            res.send({"Error": "Please login...."})
                        }
                    }).catch((err) =>{
                        console.log(err);
                    })
                    
                }else{
                    res.send({"Error": "Please! fill the like or dislike"})
                }
            }else{
                res.send({
                    "Error": "please fill the body information",
                    "Hint": {
                        "post_id": 1,
                        "like": "true",
                        "dislike": "false"
                    }
                })
            }
        }else{
            res.send({"Error": "Please login...."})
        }
    
}