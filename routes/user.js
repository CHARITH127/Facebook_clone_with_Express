const express = require('express')
const route = express.Router()
const app = express()

const User = require('../models/user.model')

app.use(express.json())

route.get('/', async (req, res) => {

    try {
        const user = await User.find();
        res.send(user)

    } catch (e) {
        res.send("Err : " + e)
    }
})

route.post('/', async (req, res) => {

    const user = new User({
        firstName: req.body.firstName,
        sureName: req.body.sureName,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
    })

    try {

        const response = await user.save();
        res.json(response)

    } catch (e) {
        res.send(e)
    }

})

route.get('/id', async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
        res.send(user)

    } catch (e) {
        res.send(e)
    }
})


route.put('/id', async (req, res) => {

    try {

        const user = await User.findById(req.params.id)

        user.firstName = req.body.firstName
        user.sureName = req.body.sureName
        user.gender = req.body.gender
        user.dateOfBirth = req.body.dateOfBirth
        user.password = req.body.password
        user.phoneNumber = req.body.phoneNumber
        user.email = req.body.email

        const response = await user.save()
        res.json(response)

    } catch (e) {
        res.send(e)
    }

})

route.delete('/id', async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
        const response = await user.remove()

        res.json(response)

    } catch (e) {
        res.send(e)
    }
})

route.get('/login',async (req,res)=>{
    try {

        const user = await User.find({email:req.body.email,password:req.body.password})
        res.send(user)

    }catch (e) {
        console.log(e)
    }
})

module.exports = route
