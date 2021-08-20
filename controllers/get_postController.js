const knex=require('../Database/connection')
const jwt=require('jsonwebtoken')


module.exports.get_post=(req, res) =>{
        if (req.headers.authorization !== undefined && req.headers.authorization !== ""){
            var token = req.headers.authorization;
            jwt.verify(token, process.env.SECRETKEY, (err, decoded_data) =>{
                if (!err){
                    knex
                    .select('*')
                    .from('user_post')
                    .then((data) =>{
                        console.log(data);
                        res.send(data);
                    }).catch((err) =>{
                        console.log(err);
                    })
                }else{
                    res.send({"Error": "Please login..."})
                }
            })
        }else{
            res.send({"Error": "Please login..."})
        }

}