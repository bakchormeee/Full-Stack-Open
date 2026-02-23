const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const sortedBlogs = blogs.toSorted((a, b) => {
    return b.likes - a.likes
  })
  console.log(sortedBlogs[0])
  return sortedBlogs[0]
}

const mostBlogs = (blogs) => {
  const blogsByPeople = lodash.countBy(blogs, (blog)=>{
    return blog.author
  })
  let mostAuthor = ""
  let mostBlogs = 0
  lodash.forEach(blogsByPeople, (value, key)=>{
    if(value > mostBlogs){
      mostAuthor = key
      mostBlogs = value
    }
  })
  console.log(mostAuthor)
  return mostAuthor
}

const mostLikes = (blogs) => {
  const mappedBlogs = lodash.map(blogs, (blog)=>{
    return {author: blog.author, likes: blog.likes}
  })
  const blogsByPeople = lodash.groupBy(mappedBlogs, (blog)=>{
    return blog.author
  })
  let mostAuthor = ""
  let mostLikes = 0
  lodash.forEach(blogsByPeople, (values, key)=>{
    const totalLikes = lodash.reduce(values, (sum, value)=>{
      return sum+value.likes
    }, 0)
    if(totalLikes > mostLikes){
      mostAuthor = key
      mostLikes = totalLikes
    }
  })
  return {
    author: mostAuthor,
    likes: mostLikes
  }
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}