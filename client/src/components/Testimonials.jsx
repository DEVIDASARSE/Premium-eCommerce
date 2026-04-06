import React from 'react'
import { motion } from 'framer-motion'

const reviews = [
  { id:1, text: 'Absolutely love the quality and fit.', name: 'Aisha', rating:5 },
  { id:2, text: 'Timeless pieces, I wear them weekly.', name: 'Marco', rating:4 },
  { id:3, text: 'Customer support was super helpful.', name: 'Lina', rating:5 }
]

export default function Testimonials(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {reviews.map(r=> (
        <motion.blockquote key={r.id} whileHover={{ y:-4 }} className="p-6 bg-white rounded shadow">
          <div className="text-primary mb-2">"{r.text}"</div>
          <div className="text-sm text-text-secondary">— {r.name}</div>
        </motion.blockquote>
      ))}
    </div>
  )
}
