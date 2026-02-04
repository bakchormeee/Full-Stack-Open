const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

const api = supertest(app)
const helper = require('./test_helper')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
]

const initialUsers = [
  {
    username: "jerieltan",
    name: "Jeriel Tan",
    password: "jerieltan05"
  },
  {
    username: "demonslayer",
    name: "Rohit",
    password: "iloveanime"
  },
  {
    username: "mathnerd",
    name: "Tom Tan",
    password: "ilovemath"
  },
  {
    username: "thegrandmaster",
    name: "Robert Lim",
    password: "pawntob4"
  }
]

const usersInDB = async()=>{
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const getUserID = async()=>{
  const users = await User.find({})
  const processedUsers = users.map(user => user.toJSON())
  return processedUsers[0].id   
}


module.exports = {initialBlogs, blogsInDB, usersInDB, initialUsers, getUserID}