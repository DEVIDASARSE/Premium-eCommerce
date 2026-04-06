import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from './Loader'

export default function AdminRoute({ children }){
  const { user, loading } = useAuth()
  if(loading) return <Loader />
  if(!user) return <Navigate to="/auth" replace />
  if(user.role !== 'admin') return <Navigate to="/" replace />
  return children
}
