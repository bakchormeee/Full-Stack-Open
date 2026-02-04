import { useState } from 'react'

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showRemoveButton = { display: user.username.toString() === blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeButton = async (event) => {
    event.preventDefault()
    const blogID = blog.id.toString()
    const newLikes = blog.likes + 1
    await updateLikes({ blogID, newLikes })
  }

  const handleDeleteButton = async (event) => {
    event.preventDefault()
    const blogID = blog.id.toString()
    await deleteBlog({ title: blog.title, author: blog.author, blogID })
  }

  return (
    <div style={blogStyle}>
      <div style={{ display: 'flex' }}>
        {blog.title} {blog.author}
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>
            view
          </button>
        </div>
        <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>
            hide
          </button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>

        likes {blog.likes}
        <button onClick={handleLikeButton}>
          like
        </button>
        <br/>

        {blog.user.name.toString()}
        <br/>

        <button style={showRemoveButton} onClick={handleDeleteButton}>
          remove
        </button>
      </div>
    </div>

  )
}

export default Blog