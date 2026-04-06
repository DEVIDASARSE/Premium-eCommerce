import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function OrderSuccess(){
  const { state } = useLocation()
  const id = state?.orderId
  return (
    <div className="max-w-3xl mx-auto p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Thank you — Order placed</h2>
      {id && <p className="mb-4">Your order id: <strong>{id}</strong></p>}
      <Link to="/orders" className="px-4 py-2 bg-accent text-white rounded">View my orders</Link>
    </div>
  )
}
