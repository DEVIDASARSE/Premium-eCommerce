import React from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import SaleBanner from '../components/SaleBanner'

export default function Sale(){
  const flash = products.filter(p=> p.tags.includes('Sale')).slice(0,24)
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <SaleBanner />
      <h2 className="text-2xl font-semibold my-6">Flash deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {flash.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
