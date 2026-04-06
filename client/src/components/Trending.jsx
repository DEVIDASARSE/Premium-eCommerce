import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Trending({ items }){
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex gap-6 px-4">
        {items.map(it=> (
          <Link key={it.id||it._id} to={`/product/${it.id||it._id}`} className="block">
            <motion.div whileHover={{ scale: 1.03, y: -5 }} className="min-w-[230px] bg-white rounded-2xl shadow-lg p-4 border border-primary/10">
              <img src={(it.images && it.images[0]) || it.image || '/images/placeholder.png'} alt={it.name} className="w-full h-44 object-cover rounded-lg" />
              <div className="mt-2">
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-text-secondary">${(it.price||0).toFixed(2)}</div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
