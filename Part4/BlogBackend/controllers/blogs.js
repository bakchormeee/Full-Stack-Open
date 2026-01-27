const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs).end()
})

blogsRouter.post('/', async (request, response) => {
  const content = request.body
  console.log('Posting new item')
  const blog = new Blog({
    title: content.title,
    author: content.author,
    url: content.url,
    likes: content.likes || 0,
  })
  const result = await blog.save()
  response.status(201).json(result).end()
})

blogsRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id)
  response.json(blogs).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  const res = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json(res).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const {title, author, url, likes} = request.body
    const blog = await Blog.findById(request.params.id)
    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes
    const res = await blog.save()
    response.status(201).json(res)
})

module.exports = blogsRouter

