const supertest = require('supertest')
const Blog = require('../models/blog.js')
const app = require('../app.js')
const mongoose = require('mongoose')
const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const { assignIn } = require('lodash')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Mans Search For Meaning',
        author: 'Viktor Frankl',
        url: 'abcde',
        likes: 1723,
    },
    {
        title: 'Mer',
        author: 'Adam',
        url: 'cdfsr',
        likes: 3,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let newBlog = Blog(initialBlogs[0])
    await newBlog.save()
    newBlog = Blog(initialBlogs[1])
    await newBlog.save()
})

test('correct number of blog posts', async()=> {
    const curBlogs = await api.get('/api/blogs')
    assert.strictEqual(curBlogs.body.length, initialBlogs.length)
})

test('get by id', async()=>{
    const curBlogs = await api.get('/api/blogs')
    const mer = curBlogs.body.find(blog => blog.title === 'Mer')
    console.log(mer)
    const blogByID = await api.get(`/api/blogs/${mer.id}`)
    console.log(JSON.stringify(blogByID.body))
    const ans = {
        title: 'Mer',
        author: 'Adam',
        url: 'cdfsr',
        likes: 3
    }
    const retrievedBlog = {
        title: blogByID.body.title,
        author: blogByID.body.author,
        url: blogByID.body.url,
        likes: blogByID.body.likes
    }
    assert.deepStrictEqual(retrievedBlog, ans)
})

test('unique identifier is named id', async()=> {
    const curBlogs = await api.get('/api/blogs')
    console.log(curBlogs.body)
    assert.ok(curBlogs.body[0].id)
})

test('increase number of blogs by one', async()=>{
    const newBlog = {
        title: 'The Bible',
        author: 'God',
        url: 'thebible',
        likes: 3,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const curBlogs = await api.get('/api/blogs')
    console.log(curBlogs.body)
    assert.deepEqual(curBlogs.body.length, initialBlogs.length+1)
})

test('default likes to 0', async()=>{
    const newBlog = {
        title: 'The Bible',
        author: 'God',
        url: 'thebible',
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const curBlogs = await api.get('/api/blogs')
    console.log(curBlogs.body)
    const zeroLikesBlog = curBlogs.body.find(blog => blog.url === 'thebible')
    console.log(zeroLikesBlog)
    assert.deepEqual(zeroLikesBlog.likes, 0)
})

test('author missing', async()=>{
    const newBlog = {
        title: 'The Bible',
        url: 'thebible'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('title missing', async()=>{
    const newBlog = {
        author: 'God',
        url: 'thebible'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('delete successful', async()=>{
    const curBlogs = await api.get('/api/blogs')
    const mer = curBlogs.body.find(blog => blog.title === 'Mer')
    await api
        .delete(`/api/blogs/${mer.id}`)
        .expect(204)
    
    const postDelBlogs = await api.get('/api/blogs')
    const mer2 = postDelBlogs.body.find(blog => blog.title === 'Mer')
    assert.ok(!mer2)
})

test.only('put successful', async()=>{
    const curBlogs = await api.get('/api/blogs')
    const mer = curBlogs.body.find(blog => blog.title === 'Mer')
    const newBlog = {
        title: 'Mer',
        author: 'Adam',
        url: 'cdfsr',
        likes: 5,
    }
    await api
        .put(`/api/blogs/${mer.id}`)
        .send(newBlog)
        .expect(201)

    const postPutBlog = await api.get(`/api/blogs/${mer.id}`)
    console.log(postPutBlog.body)
    assert.deepEqual(postPutBlog.body.likes, newBlog.likes)
})

after(async () => {
    mongoose.connection.close()
})