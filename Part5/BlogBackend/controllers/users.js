const User = require('../models/user')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

userRouter.post('/', async(request, response) => {
    const body = request.body
    //POST should contain username, name, password
    if(body.password.length <= 3 || body.username.length <= 3){
        return response.status(400).send({ error: 'Username and Password must be more than 3 characters' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })
    const savedUser = await user.save()
    console.log("User saved")
    console.log(savedUser.toJSON())
    response.status(201).json(savedUser)
})

userRouter.get('/', async(request, response)=>{
    const allUsers = await User.find({}).populate('blogs')
    response.json(allUsers)
})

module.exports = userRouter

