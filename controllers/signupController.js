const knex=require('../Database/connection')
const bcrypt=require('bcrypt')

module.exports.register=(req, res) =>{
        if (req.body.username === undefined || req.body.email === undefined || req.body.password === undefined){
            console.log({"suggestion": "please fill all deatails!"});
            res.send({"suggestion": "please fill all details!"})
        }else{
        

            knex.select('email').from('users').where('email', req.body.email)
            .then((data) =>{
                console.log(data);
                if (data.length<1){
                    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

                    const userdetails={
                        username:req.body.username,
                        email:req.body.email,
                        password:hashedPassword
                    }
                    knex('users')
                    .insert(userdetails)
                    .then((result) =>{
                        knex
                        .select('*')
                        .from('users')
                        .where('email', req.body.email)
                        .then((data) =>{
                            console.log({"success": "signup successfully..."})
                            res.send({"success": "signup successfully..."});
                        }).catch((err) =>{
                            console.log(err);
                        })
                    }).catch((err) =>{
                        console.log(err);
                    })
                }else{
                    console.log({"exist": "user alredy exists.."});
                    res.send({"exist": "user alredy exists.."})
                }
            }).catch((err) =>{
                console.log(err);
            })
        }
    
}