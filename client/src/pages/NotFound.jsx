import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand mb-4">404</h1>
        <p className="text-text-secondary mb-6">Page not found.</p>
        <Link to="/" className="px-4 py-2 bg-accent text-white rounded">Go home</Link>
      </div>
    </div>
  )
}
