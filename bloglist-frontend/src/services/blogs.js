import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

export default { getAll, setToken }
