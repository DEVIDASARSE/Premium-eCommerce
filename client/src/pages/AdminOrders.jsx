import React, { useEffect, useState } from 'react'
import api from '../api'
import { toast } from 'react-toastify'

export default function AdminOrders(){
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetch = async ()=>{
    setLoading(true)
    setError('')
    try{
      const res = await api.get('/orders')
      setOrders(res.data)
    }catch(err){ setError(err?.response?.data?.message || err.message) }
    finally{ setLoading(false) }
  }

  useEffect(()=>{ fetch() }, [])

  const updateStatus = async (id, status)=>{
    try{
      await api.put(`/orders/${id}/status`, { status })
      toast.success('Order status updated')
      fetch()
    }catch(err){ toast.error(err?.response?.data?.message || err.message) }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin — Orders</h2>
      {error && <div className="mb-4 rounded-md border border-accentRed/25 bg-white px-3 py-2 text-sm text-accentRed">{error}</div>}
      {loading ? <div>Loading...</div> : (
        <div className="space-y-4">
          {orders.map(o=> (
            <div key={o._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">Order {o._id}</div>
                  <div className="text-sm text-text-secondary">{new Date(o.createdAt).toLocaleString()} • {o.user?.email}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${Number(o.totalPrice || 0).toFixed(2)}</div>
                  <div className="text-sm">Status: {o.status}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button onClick={()=>updateStatus(o._id, 'Processing')} className="px-2 py-1 border rounded">Processing</button>
                <button onClick={()=>updateStatus(o._id, 'Shipped')} className="px-2 py-1 border rounded">Shipped</button>
                <button onClick={()=>updateStatus(o._id, 'Delivered')} className="px-2 py-1 border rounded">Delivered</button>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold">Items</h4>
                <ul className="list-disc pl-5">
                  {(o.products || []).map(pi=> (
                    <li key={pi._id || pi.product?._id}>{pi.product?.name || pi.product} x{pi.quantity} — ${pi.price}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
