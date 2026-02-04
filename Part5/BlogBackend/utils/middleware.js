const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  let authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer')){
    authorization = authorization.replace('Bearer ', '')
  }
  request.token = authorization
  next()
}

const userExtractor = async (request, response, next) => {
  if(!request.token){
    return response.status(401).json({error: 'token not provided'})
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.username){
    return response.status(401).json({error: 'token invalid'})
  }
  const user = await User.findOne({username: decodedToken.username})
  if(!user){
    return response.status(400).json({error: 'username missing or not valid'})
  }
  request.user = user
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({error: 'token invalid'})
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
