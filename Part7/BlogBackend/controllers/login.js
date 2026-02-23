const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username: username})
    console.log(user.passwordHash)
    //Simultaneously compare the passwordhash and check whether user is valid
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    
    if(!(user && passwordCorrect)){
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const token = {
        name: user.name,
        username: user.username,
    }

    const signedToken = await jwt.sign(token, config.SECRET)

    return response.status(200).send({
        token: signedToken,
        name: user.name,
        username: user.username,
    })
})

module.exports = loginRouter