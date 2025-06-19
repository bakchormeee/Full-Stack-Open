const lodash = require('lodash')
const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
  ]

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('multiple blogs', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  const ans = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }
  const result = listHelper.favoriteBlog(blogs)
  assert.deepStrictEqual(result, ans)
})

describe('mostBlogs', () => {
  const mostBlogs = () => {
    const authorByBlogs = lodash.countBy(blogs, (blog)=>{return blog.author})
    const sorted = Object.entries(authorByBlogs).sort((a, b) => b[1] - a[1])
    return {
        author: sorted[0][0],
        blogs: sorted[0][1]
    }
  }

  const mostLikes = () => {
    const authorByLikes = lodash.groupBy(blogs, (blog)=>{return blog.author})
    const sorted = []
    lodash.forEach(authorByLikes, (author, name)=>{
        var totalLikes = 0
        for(let i = 0; i < author.length; i++){
            totalLikes += author[i].likes
        }
        sorted.push({
            author: name,
            likes: totalLikes
        })
    })
    return lodash.sortBy(sorted, (author)=>{return author.likes*-1})[0]
  }

  test('author with most blogs', () => {
    const result = mostBlogs()
    const ans = {
      author: "Robert C. Martin",
      blogs: 3
    }
    assert.deepStrictEqual(result, ans)
  })

  test('author with most likes', () => {
    const result = mostLikes()
    const ans = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    assert.deepStrictEqual(result, ans)
  })
})
