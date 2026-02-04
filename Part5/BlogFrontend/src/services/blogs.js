import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (signedToken) => {
  token = `Bearer ${signedToken}`
  console.log(token)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const newBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(token)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlogLikes = async ({ blogID, newLikes }) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(token)
  const response = await axios.put(`${baseUrl}/${blogID}`, { likes: newLikes }, config)
  return response.data
}

const deleteBlog = async ({ blogID }) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(token)
  const response = await axios.delete(`${baseUrl}/${blogID}`, config)
  return response.data
}



export default { newBlog, getAll, setToken, updateBlogLikes, deleteBlog }