import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function QuickViewModal(){
  const [product, setProduct] = useState(null)
  useEffect(()=>{
    const h = (e)=> setProduct(e.detail)
    window.addEventListener('openQuickView', h)
    return ()=> window.removeEventListener('openQuickView', h)
  },[])
  if(!product) return null
  const image = (product.images && product.images[0]) || product.image || '/images/placeholder.png'
  const price = Number(product?.price || 0)
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Quick view">
      <div className="absolute inset-0 frost-overlay" onClick={()=>setProduct(null)} />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white rounded-2xl shadow-lux max-w-3xl w-full mx-4 p-6 z-10 border border-primary/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src={image} alt={product?.name || 'Product'} className="w-full h-64 object-cover rounded-xl" />
          <div>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <div className="text-text-secondary mt-2">{product.description}</div>
            <div className="mt-4 font-semibold text-lg">${price.toFixed(2)}</div>
            <div className="mt-4 flex gap-2">
              <button onClick={()=>{ window.dispatchEvent(new CustomEvent('addToCart',{detail: product})); setProduct(null) }} className="btn-primary">Add to cart</button>
              <button onClick={()=>setProduct(null)} className="px-4 py-2 border border-primary/10 rounded-xl smooth-transition hover:bg-primary hover:text-white">Close</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
