import React from 'react'
import { Link } from 'react-router-dom'
import { useCart, useDispatchCart } from '../context/CartContext'

export default function CartPage(){
  const { items } = useCart()
  const dispatch = useDispatchCart()
  const total = items.reduce((s,i)=> s + Number(i.price || 0) * Number(i.qty || 1), 0)

  if(items.length===0) return (
    <div className="max-w-4xl mx-auto p-10 text-center lux-surface rounded-2xl mt-12">
      <div className="text-6xl mb-4">◍</div>
      <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
      <p className="text-text-secondary mb-5">Curate your next look from our premium collection.</p>
      <Link to="/shop" className="btn-primary">Browse products</Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-8 md:p-10">
      <div className="mb-4 text-sm text-text-secondary">
        <Link to="/" className="hover:text-primary">Home</Link> / <span className="text-primary font-medium">Cart</span>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>
      <div className="space-y-4">
        {items.map(i=> (
          <div key={i.id} className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md border border-primary/10">
            <div className="flex items-center gap-4">
              <img src={i.image || '/images/placeholder.png'} alt={i.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <div className="font-medium">{i.name}</div>
                <div className="text-sm text-text-secondary">${Number(i.price || 0).toFixed(2)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={()=>dispatch({type:'SET_QTY', payload:{id:i.id, qty:i.qty-1}})} className="px-2 rounded-xl border border-primary/10">-</button>
              <div>{i.qty}</div>
              <button type="button" onClick={()=>dispatch({type:'SET_QTY', payload:{id:i.id, qty:i.qty+1}})} className="px-2 rounded-xl border border-primary/10">+</button>
              <button type="button" onClick={()=>dispatch({type:'REMOVE', payload:i.id})} className="text-accentRed ml-4">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end items-center gap-4">
        <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
        <Link to="/checkout" className="btn-primary">Checkout</Link>
      </div>
    </div>
  )
}
