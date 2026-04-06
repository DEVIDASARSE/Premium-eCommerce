import React from 'react'
import { motion } from 'framer-motion'

const moods = [
  { title: 'Casual Ease', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Monochrome Chic', img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Street Smart', img: 'https://images.unsplash.com/photo-1520975918536-0b3aef1f1a7a?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Evening Minimal', img: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop' }
]

export default function ShopByMood(){
  return (
    <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Shop by mood</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moods.map(m=> (
            <motion.div whileHover={{ scale: 1.03 }} key={m.title} className="relative rounded overflow-hidden">
              <img src={m.img} className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-black/25 flex items-end p-4">
                <div className="text-white font-semibold text-lg">{m.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
