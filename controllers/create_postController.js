const knex=require('../Database/connection')
const jwt=require('jsonwebtoken')


module.exports.create_post=(req,res) =>{

    

       if (req.headers.authorization !== undefined && req.headers.authorization !== ""){
        var token = req.headers.authorization
        console.log("token:-----",token);
            if (req.body.text !== undefined && req.body.description !== undefined && req.body.user_id!==undefined){
                var token_data = jwt.verify(token, process.env.SECRETKEY);
                console.log(token_data)
                var dic = req.body;
                dic['Date']=new Date();
                knex('user_post').insert(dic)
                .then((data) =>{
                    console.log(dic);
                    res.send(dic);
                }).catch((err) =>{
                    console.log(err);
            })

            }else{
                res.send({"Warning!": "Please fill the all details in body....", "Hint": {
                    "text": "Enter your text...",
                    "description": "Enter your description...."
                }}) 
            }
    }else{
        res.send({"Error": "Please! login"});
    }
 

        
    
}