import { useState } from 'react'


const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      await addBlog({ title, author, url })
      setTitle('')
      setAuthor('')
      setURL('')
    } catch {
      console.log('form submission failed')
    }
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label>
              title:
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
              author:
            <input
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
              url:
            <input
              type="text"
              value={url}
              onChange={(event) => setURL(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">
            create
        </button>
      </form>
    </div>
  )
}

export default BlogForm