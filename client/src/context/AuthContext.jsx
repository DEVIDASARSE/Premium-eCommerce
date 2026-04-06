import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api'

const AuthCtx = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('auth_user')||'null') }catch(e){ return null }
  })
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      api.get('/auth/me').then(res=>{
        setUser(res.data.user)
      }).catch(()=>{
        localStorage.removeItem('token')
        setUser(null)
      }).finally(()=> setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem('auth_user', JSON.stringify(user))
  }, [user])

  const login = async ({ email, password })=>{
    const res = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const register = async ({ name, email, password })=>{
    const res = await api.post('/auth/register', { name, email, password })
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    return res.data
  }

  const logout = ()=>{
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthCtx.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = ()=> useContext(AuthCtx)
