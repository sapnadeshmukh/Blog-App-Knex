const jwt = require("jsonwebtoken")

const tokenData = (data, SecretKey) => {
    return jwt.sign(data, SecretKey)
}
module.exports = tokenData 
