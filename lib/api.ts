
// lib/api.ts
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // update this to your Laravel base URL
})

// Add token to headers if available
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
