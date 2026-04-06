import React from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Drop(){
  const limited = products.filter(p=> (p.tags||[]).includes('Limited'))
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Limited Edition Drop</h1>
      {limited.length === 0 ? (
        <div className="p-8 text-center text-text-secondary">No drop items available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {limited.map(p=> <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
