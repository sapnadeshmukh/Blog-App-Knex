const express=require('express')
const app=express()
require('dotenv').config()

app.use(express.json())
app.use('',require('./routes/index'))

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})