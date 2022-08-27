const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 4000

const user =  require('./routes/user')
const post =  require('./routes/post')

const url = 'mongodb://localhost/facebookdb'
mongoose.connect(url,{useNewUrlParser:true})
const connection = mongoose.connection


connection.on("open",()=>{
    console.log("db connected")
})

app.use(express.json())
app.use('/user',user)
app.use('/post',post)

app.listen(port, () => {
    console.log(`app starting on ${port}`);
})
