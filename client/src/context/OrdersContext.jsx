import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api'
import { useAuth } from './AuthContext'

const OrdersCtx = createContext()

export function OrdersProvider({ children }){
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMyOrders = async ()=>{
    setLoading(true)
    setError(null)
    try{
      const res = await api.get('/orders/my')
      const list = (res.data || []).map(o=> ({ ...o, id: o._id, total: o.totalPrice || o.total }))
      setOrders(list)
    }catch(err){
      setError(err?.response?.data?.message || err.message)
      setOrders([])
    }finally{ setLoading(false) }
  }

  const placeOrder = async (order)=>{
    setLoading(true)
    setError(null)
    try{
      const res = await api.post('/orders', order)
      // clear cart by emitting event listened by CartContext
      window.dispatchEvent(new CustomEvent('clearCart'))
      await fetchMyOrders()
      return res.data
    }catch(err){
      setError(err?.response?.data?.message || err.message)
      throw err
    }finally{ setLoading(false) }
  }

  const { user } = useAuth()
  useEffect(()=>{
    if(user) fetchMyOrders()
    else {
      setOrders([])
      setError(null)
    }
  }, [user])

  return (
    <OrdersCtx.Provider value={{ orders, loading, error, fetchMyOrders, placeOrder }}>
      {children}
    </OrdersCtx.Provider>
  )
}

export const useOrders = ()=> useContext(OrdersCtx)
