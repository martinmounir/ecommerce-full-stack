import axios from 'axios'

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY
const apiurl = 'http://localhost:1337/api'

const axiosClient = axios.create({
  baseURL: apiurl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
})

export default axiosClient
