require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const app = express()

mongoose.connect(config.MONGODB_URL)
    .then(logger.info('Connected to MongoDB'))
    .catch(error => {
        logger.error(error)
    })

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.errorhandler)

module.exports = app

