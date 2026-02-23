const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async()=>{
    await User.deleteMany({})
    console.log('all users deleted')
    for(let user of helper.initialUsers){
        const passwordHash = await bcrypt.hash(user.password, 10)
        const newUser = new User({
            username: user.username,
            name: user.name,
            passwordHash: passwordHash
        })
        await newUser.save()
    }
    console.log('new users added')

    const userID = await helper.getUserID()
    await Blog.deleteMany({})
    console.log('blogs deleted')
    const blogs = helper.initialBlogs.map(blog => ({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes || 0,
        user: userID
    }))
    const savedBlogs = await Blog.insertMany(blogs)

    const blogCreator = await User.findById(userID)
    blogCreator.blogs = blogCreator.blogs.concat(savedBlogs.map(blog => blog.id))
    const res = await blogCreator.save()
    console.log('new blogs added')
   
})


describe('blog tests',  ()=> {
    test('correct number of blog posts returned', async()=>{
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        console.log(response.body)
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('unique identifier is named id', async()=>{
        const blogs = await helper.blogsInDB()
        assert('id' in blogs[0] && !('_id' in blogs[0]))
    })

    test.only('blog post created successfully', async()=>{ 
        const token = jwt.sign({
            username: "jerieltan",
            name: "Jeriel Tan",
        }, process.env.SECRET)

        const newBlog = {
            title: "How to use Latex",
            author: "Tommy",
            url: "acsdf1231",
            likes: 3
        }
        const response = await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect('Content-Type', /application\/json/)
            .expect(201)    
        const curBlogs = await helper.blogsInDB()
        console.log(curBlogs)
        assert.strictEqual(curBlogs.length, helper.initialBlogs.length+1)
    })

    test('if likes property missing, default to 0', async()=>{
        const token = jwt.sign({
            username: "jerieltan",
            name: "Jeriel Tan",
        }, process.env.SECRET)
        
        const newBlog = {
            title: "How to use Latex",
            author: "Tommy",
            url: "acsdf1231"
        }
        const response = await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect('Content-Type', /application\/json/)
            .expect(201)    
        const curBlogs = await helper.blogsInDB()
        const foundBlog = curBlogs.find(blog => blog.title === 'How to use Latex')
        assert.strictEqual(foundBlog.likes, 0)
    })

    test('if title or url missing, return status 400', async()=>{
        const token = jwt.sign({
            username: "jerieltan",
            name: "Jeriel Tan",
        }, process.env.SECRET)
        
        const newBlog = {
            url: "acsdf1231",
            likes: 32
        }
        const response = await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(400)    
    })

    test('deleting blog successful', async()=>{
        const token = jwt.sign({
            username: "jerieltan",
            name: "Jeriel Tan",
        }, process.env.SECRET)
        
        const newBlog = {
            title: "How to use Latex",
            author: "Tommy",
            url: "acsdf1231",
            likes: 3
        }
        const response = await api
            .post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect('Content-Type', /application\/json/)
            .expect(201)    
        const blogsBefore = await helper.blogsInDB()
        const foundBlog = blogsBefore.find(blog => blog.title === 'How to use Latex')
        await api
            .delete(`/api/blogs/${foundBlog.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204)

        const blogsAfter = await helper.blogsInDB()
        assert.strictEqual(blogsAfter.length, helper.initialBlogs.length)
    })

    test('updating blog successful', async()=>{
        const blogsBefore = await helper.blogsInDB()
        const blogTitle = blogsBefore[0].title
        const newLikes = {
            id: blogsBefore[0].id,
            likes: 100
        }
        const response = await api
            .put(`/api/blogs/${newLikes.id}`)
            .send(newLikes)
            .expect('Content-Type', /application\/json/)
            .expect(200)

        const updatedBlog = await Blog.findById(blogsBefore[0].id)
        assert.strictEqual(updatedBlog.likes, newLikes.likes)
    })

    test('adding a blog fails with 401 if token not provided', async()=>{
        const newBlog = {
            title: "How to use Latex",
            author: "Tommy",
            url: "acsdf1231",
            likes: 3
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)    
        const curBlogs = await helper.blogsInDB()
        console.log(curBlogs)
        assert.strictEqual(curBlogs.length, helper.initialBlogs.length)
    })
})

describe('user tests', ()=>{
    test('getting users successful', async()=>{
        const response = await api
            .get('/api/users')
            .expect('Content-Type', /application\/json/)
            .expect(200)
        console.log(response.body)
        assert.strictEqual(response.body.length, helper.initialUsers.length)
    })

    test('invalid user rejected', async()=>{
        const newuser = {
            username: "a",
            name: "abcde",
            password: "a"
        }

        const response = await api
            .post('/api/users')
            .send(newuser)
            .expect(400)
        const usersAfter = await helper.usersInDB()
        assert.strictEqual(usersAfter.length, helper.initialUsers.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})
