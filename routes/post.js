const express = require('express')
const app = express()
const route = express.Router()

const Post = require('../models/post.model')

app.use(express.json)

route.post('/', async (req, res) => {

    const post = new Post({
        userId: req.body.userId,
        date: req.body.date,
        title: req.body.title,
        body: req.body.body
    })

    try {

        const response = await post.save();
        res.json(response)

    } catch (e) {
        res.send(e)
    }
})


route.get('/', async (req, res) => {

    try {

        const post = Post.find();
        res.send(post)

    } catch (e) {
        console.log(e)
    }

})

route.get('/id', async (req, res) => {


    try {

        const post = await Post.findById(req.params.id)
        res.send(post)

    } catch (e) {
        console.log(e)
    }

})

route.put('/id', async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)

        post.userId = req.body.userId,
            post.date = req.body.date,
            post.time = req.body.time,
            post.title = req.body.title,
            post.body = req.body.body

        const response = await post.save()
        res.json(response)

    } catch (e) {
        console.log(e)
    }

})

route.delete('/id', async (req, res) => {

    try {

        const post = await Post.findById(req.body.id)
        const response = await post.remove()

        res.json(response)

    } catch (e) {
        console.log(e)
    }

})

module.exports = route