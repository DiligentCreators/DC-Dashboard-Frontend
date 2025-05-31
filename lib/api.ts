// lib/api.ts
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000', // your Laravel base URL
  withCredentials: true,             // <---- add this line
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
