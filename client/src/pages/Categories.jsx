import React from 'react'
import { Link } from 'react-router-dom'
import { categoriesList } from '../data/products'

export default function Categories(){
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoriesList.map(c=> (
          <Link key={c} to={`/category/${encodeURIComponent(c)}`} className="block p-6 bg-white rounded shadow hover:scale-102 transition">
            <div className="font-semibold text-lg">{c}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
