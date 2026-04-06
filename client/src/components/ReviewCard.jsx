import React from 'react'
import { motion } from 'framer-motion'

export default function ReviewCard({ review }){
  return (
    <motion.div whileHover={{ y:-6 }} className="p-4 bg-white rounded shadow">
      <div className="flex items-center gap-3">
        <img src={review.avatar} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <div className="font-semibold">{review.name}</div>
          <div className="text-sm text-text-secondary">{review.date}</div>
        </div>
      </div>
      <div className="mt-3 text-primary">"{review.text}"</div>
    </motion.div>
  )
}
