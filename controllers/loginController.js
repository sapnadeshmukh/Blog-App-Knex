
const knex=require('../Database/connection')
const bcrypt=require('bcrypt')
const jwtToken = require("../middlewares/createToken")

module.exports.login=(req, res) =>{
        if (req.body.email === undefined || req.body.password === undefined){
            console.log({"suggestion": "email and password both are require!"})
        }else{
            knex
            .select('*')
            .from('users')
            .where('email', req.body.email)
            .then((data) =>{
                // console.log(data);
                if (data.length>0){
                    const plainPassword = req.body.password
                    const hashedPassword = data[0].password

                    const comparePassword = bcrypt.compareSync(plainPassword, hashedPassword)
                    if (comparePassword) {

                        const Data = { email: data[0].email }
                        const TOKEN = jwtToken(Data, process.env.SECRETKEY)
                        // console.log(TOKEN)

                        console.log({ message: "You have logged in successfully!!!"})
                        return res.status(200).send({
                            message: "You have logged in successfully!!!",
                            status: 200,
                            tokenData: TOKEN
                        })
                    }else{
                        console.log({ERROR:"Password is invalid"})
                        res.send({
                            "Error": "Password is invalid"
                        })
                    }
                }else{
                    console.log(  {"Error": "This user doesn't exists! please Signup....."})
                    res.send({
                        "Error": "This user doesn't exists! please Signup....."
                    })
                }
            }).catch((err) =>{
                console.log(err);
            })
        }
    
}