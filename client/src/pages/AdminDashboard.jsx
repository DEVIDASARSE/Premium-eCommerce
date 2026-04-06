import React, { useEffect, useState } from 'react'
import api from '../api'
import { toast } from 'react-toastify'

export default function AdminDashboard(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', price: 0, description: '', category: '' })

  const fetchProducts = async ()=>{
    setLoading(true)
    setError('')
    try{
      const res = await api.get('/products', { params: { limit: 1000 } })
      setProducts(res.data.data.map(p=> ({ ...p, id: p._id, image: (p.images && p.images[0]) || p.image })) )
    }catch(err){
      setError(err?.response?.data?.message || err.message)
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ fetchProducts() }, [])

  const create = async (e)=>{
    e.preventDefault()
    try{
      await api.post('/products', { ...form, images: [form.image||''] })
      setForm({ name: '', price: 0, description: '', category: '', image: '' })
      toast.success('Product created')
      fetchProducts()
    }catch(err){ toast.error(err?.response?.data?.message || err.message) }
  }

  const remove = async (id)=>{
    if(!confirm('Delete product?')) return
    try{
      await api.delete(`/products/${id}`)
      toast.success('Product deleted')
      fetchProducts()
    }catch(err){
      toast.error(err?.response?.data?.message || err.message)
    }
  }

  const update = async (id)=>{
    const p = products.find(x=>x.id===id)
    const name = prompt('Name', p.name)
    if(name==null) return
    try{
      await api.put(`/products/${id}`, { ...p, name })
      toast.success('Product updated')
      fetchProducts()
    }catch(err){
      toast.error(err?.response?.data?.message || err.message)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin — Products</h2>
      {error && <div className="mb-4 rounded-md border border-accentRed/25 bg-white px-3 py-2 text-sm text-accentRed">{error}</div>}
      <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <input value={form.name} onChange={e=>setForm(s=>({...s, name: e.target.value}))} placeholder="Name" className="border p-2" required />
        <input value={form.price} onChange={e=>setForm(s=>({...s, price: Number(e.target.value)}))} placeholder="Price" className="border p-2" required />
        <input value={form.category} onChange={e=>setForm(s=>({...s, category: e.target.value}))} placeholder="Category" className="border p-2" />
        <input value={form.image||''} onChange={e=>setForm(s=>({...s, image: e.target.value}))} placeholder="Image URL" className="border p-2" />
        <textarea value={form.description} onChange={e=>setForm(s=>({...s, description: e.target.value}))} placeholder="Description" className="border p-2 md:col-span-4" />
        <button className="px-4 py-2 bg-accent text-white rounded md:col-span-4">Create product</button>
      </form>

      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p=> (
            <div key={p.id} className="bg-white p-3 rounded shadow">
              <img src={p.image||'/images/placeholder.png'} className="w-full h-40 object-cover rounded mb-2" />
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-text-secondary">{p.category}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${p.price}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={()=>update(p.id)} className="px-2 py-1 border rounded">Edit</button>
                <button onClick={()=>remove(p.id)} className="px-2 py-1 bg-accentRed text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
