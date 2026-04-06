import React from 'react'
import { useWishlist } from '../context/WishlistContext'
import { Link } from 'react-router-dom'

export default function Wishlist(){
  const { items, toggle } = useWishlist()
  if(items.length===0) return (
    <div className="max-w-[800px] mx-auto p-10 text-center lux-surface rounded-2xl">
      <div className="text-6xl mb-4">♡</div>
      <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
      <p className="text-text-secondary mt-2">Save items to your wishlist for later.</p>
      <Link to="/shop" className="mt-4 inline-block btn-primary">Shop now</Link>
    </div>
  )
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-20">
      <h2 className="text-2xl font-semibold mb-6">Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(i=> (
          <div key={i.id} className="bg-white rounded-2xl shadow-lg p-4 border border-primary/10">
            <img src={i.image} className="w-full h-40 object-cover rounded-xl" />
            <div className="mt-2 flex items-center justify-between">
              <div>
                <div className="font-medium">{i.name}</div>
                <div className="text-sm text-text-secondary">${i.price.toFixed(2)}</div>
              </div>
              <div>
                <button onClick={()=>toggle(i)} className="text-accentRed">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
