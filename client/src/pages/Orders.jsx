import React from 'react'
import { useOrders } from '../context/OrdersContext'
import { Link } from 'react-router-dom'

export default function Orders(){
  const { orders, loading, error } = useOrders()

  if(loading) return (
    <div className="max-w-[900px] mx-auto p-8 text-center">
      <div className="animate-pulse text-text-secondary">Loading your orders...</div>
    </div>
  )

  if(error) return (
    <div className="max-w-[900px] mx-auto p-8">
      <div className="rounded-xl border border-accentRed/25 bg-white p-4 text-accentRed">{error}</div>
    </div>
  )

  if(orders.length===0) return (
    <div className="max-w-[800px] mx-auto p-10 text-center lux-surface rounded-2xl">
      <div className="text-6xl mb-4">◉</div>
      <h2 className="text-2xl font-semibold">No orders yet</h2>
      <p className="text-text-secondary mt-2">Your recent orders will appear here.</p>
      <Link to="/shop" className="btn-primary inline-block mt-5">Browse products</Link>
    </div>
  )

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-20">
      <h2 className="text-2xl font-semibold mb-6">Order history</h2>
      <div className="space-y-4">
        {orders.map(o=> (
          <div key={o.id} className="p-6 bg-white rounded-2xl shadow-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <div>Order {o.id}</div>
              <div className="text-sm text-text-secondary">{new Date(o.createdAt).toLocaleString()}</div>
            </div>
            <div className="mt-2">Total: ${o.total?.toFixed(2) ?? '0.00'}</div>
            <div className="mt-1 text-sm text-text-secondary">Status: {o.status || 'Processing'} • Payment: {o.paymentStatus || 'Paid'}</div>
            {Array.isArray(o.products) && o.products.length > 0 && (
              <div className="mt-4 border-t pt-3 space-y-2">
                {o.products.map((item, idx)=> (
                  <div key={`${o.id}-${idx}`} className="flex items-center justify-between text-sm">
                    <div className="text-text-secondary">{item?.product?.name || 'Product'} x{item?.quantity || 1}</div>
                    <div className="font-medium">${Number(item?.price || 0).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
