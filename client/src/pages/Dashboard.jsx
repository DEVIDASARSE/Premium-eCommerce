import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const { user } = useAuth()
  if(!user) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">You’re not signed in</h2>
        <Link to="/auth" className="mt-4 inline-block btn-primary">Sign in</Link>
      </div>
    </div>
  )
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-20">
      <h1 className="text-2xl font-semibold mb-4">Welcome back, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/orders" className="block p-6 bg-white rounded-2xl shadow-lg border border-primary/10 hover:-translate-y-1 smooth-transition">
          <div className="text-sm text-text-secondary">Orders</div>
          <div className="text-2xl font-semibold mt-2">View your orders</div>
        </Link>
        <Link to="/wishlist" className="block p-6 bg-white rounded-2xl shadow-lg border border-primary/10 hover:-translate-y-1 smooth-transition">
          <div className="text-sm text-text-secondary">Wishlist</div>
          <div className="text-2xl font-semibold mt-2">Saved items</div>
        </Link>
        <Link to="/auth" className="block p-6 bg-white rounded-2xl shadow-lg border border-primary/10 hover:-translate-y-1 smooth-transition">
          <div className="text-sm text-text-secondary">Account</div>
          <div className="text-2xl font-semibold mt-2">Manage details</div>
        </Link>
      </div>
    </div>
  )
}
