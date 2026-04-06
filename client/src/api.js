import axios from 'axios'

// Prefer explicit env var, otherwise resolve API on same host for deployment friendliness.
const API_BASE = import.meta.env.VITE_API_BASE_URL || `${window.location.origin}/api`

const api = axios.create({ baseURL: API_BASE })

api.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token')
  if(token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api

