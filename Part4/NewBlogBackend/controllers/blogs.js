const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const jwt = require('jsonwebtoken')
const {userExtractor} = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user
  if(!user){
    return response.status(400).json({error: 'username missing or not valid'})
  }
  const body = request.body
  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  console.log("Blog saved")
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  if(!user){
    return response.status(400).json({error: 'username missing or not valid'})
  }
  const blog = await Blog.findById(request.params.id)
  console.log(user._id.toString())
  console.log(blog.user.toString())
  if(user.id.toString() === blog.user.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({error: 'user is not the same as blog creator'})
  }
})

blogRouter.put('/:id', async (request, response) => {
    let blog = await Blog.findById(request.params.id)
    console.log("Correct blog found")
    blog.likes = request.body.likes
    const newBlog = await blog.save()
    response.json(newBlog)
})

module.exports = blogRouter