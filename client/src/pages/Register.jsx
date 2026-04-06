import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const nav = useNavigate()
  useEffect(()=>{ nav('/auth') }, [])
  return null
}
