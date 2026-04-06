import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CategoryCard({ title, image }){
  return (
    <Link to={`/category/${encodeURIComponent(title)}`} className="block cursor-pointer">
      <motion.div whileHover={{ scale: 1.03 }} className="relative rounded overflow-hidden">
        <img src={image} alt={title} className="w-full h-44 object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
          <h3 className="text-white text-xl font-semibold">{title}</h3>
        </div>
      </motion.div>
    </Link>
  )
}
