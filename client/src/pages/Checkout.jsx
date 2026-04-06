import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Checkout(){
  const { items } = useCart()
  const { placeOrder } = useOrders()
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const subtotal = items.reduce((s,i)=> s + i.price * i.qty, 0)

  const place = async (e)=>{
    e.preventDefault()
    if(items.length === 0){
      toast.error('Your cart is empty.')
      return
    }
    setLoading(true)
    try{
      const form = Object.fromEntries(new FormData(e.target))
      const shippingAddress = {
        line1: `${form.fullName} - ${form.address}`,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country || 'US'
      }
      const products = items.map(i=> ({ product: i.id, quantity: i.qty, price: i.price }))
      // basic validation: ensure product ids look like Mongo ObjectIds
      const invalidIds = products.map(p=>p.product).filter(id=> !/^[0-9a-fA-F]{24}$/.test(String(id)))
      if(invalidIds.length){
        toast.error('Some cart items are local-only. Please checkout with backend catalog items.')
        return
      }

      const order = { products, totalPrice: subtotal, shippingAddress, paymentStatus: 'Paid' }
      const res = await placeOrder(order)
      toast.success('Order placed successfully')
      nav('/order-success', { state: { orderId: res._id } })
    }catch(err){
      toast.error(err?.response?.data?.message || err.message)
    }finally{ setLoading(false) }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="mb-4 text-sm text-text-secondary">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/cart" className="hover:text-primary">Cart</Link> / <span className="text-primary font-medium">Checkout</span>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Billing & Shipping</h2>
        <form onSubmit={place} className="space-y-4">
          <input name="fullName" placeholder="Full name" className="w-full border border-primary/10 rounded-xl px-3 py-2" required />
          <input name="address" placeholder="Address" className="w-full border border-primary/10 rounded-xl px-3 py-2" required />
          <input name="city" placeholder="City" className="w-full border border-primary/10 rounded-xl px-3 py-2" required />
          <input name="postalCode" placeholder="Postal code" className="w-full border border-primary/10 rounded-xl px-3 py-2" required />
          <input name="country" placeholder="Country" className="w-full border border-primary/10 rounded-xl px-3 py-2" defaultValue="US" required />
          <input name="card" placeholder="Card number" className="w-full border border-primary/10 rounded-xl px-3 py-2" required />
          <button disabled={loading} className="btn-primary">{loading? 'Placing...' : 'Place order'}</button>
        </form>
      </div>
      <aside className="lux-surface p-6 rounded-2xl">
        <h3 className="font-semibold mb-3">Order summary</h3>
        <div className="space-y-3">
          {items.map(i=> (
            <div key={i.id} className="flex items-center justify-between">
              <div className="text-sm">{i.name} x{i.qty}</div>
              <div className="font-medium">${(i.price*i.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between font-semibold">Subtotal <span>${subtotal.toFixed(2)}</span></div>
      </aside>
    </div>
  )
}
