import axios from 'axios'
const baseUrl = '/api/login'

const login = async ({ username, password }) => {
  console.log('function called, attempting to login')
  const response = await axios.post(baseUrl, { username, password })
  return response.data
}

export default { login }