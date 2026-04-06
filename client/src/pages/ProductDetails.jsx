import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatchCart } from '../context/CartContext'
import { motion } from 'framer-motion'
import api from '../api'
import fallbackProducts from '../data/products'

export default function ProductDetails(){
  const { id } = useParams()
  const [product, setProduct] = useState(undefined)
  const [activeImage, setActiveImage] = useState(0)
  const [related, setRelated] = useState([])
  const dispatch = useDispatchCart()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('M')
  const nav = useNavigate()

  useEffect(()=>{
    let mounted = true
    const fetch = async ()=>{
      // If id is not a mongo ObjectId, treat as local fallback product id
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(String(id))
      if(!isObjectId){
        const local = fallbackProducts.find(p=> p.id === id)
        if(local){
          setActiveImage(0)
          if(!mounted) return
          setProduct(local)
          setRelated(fallbackProducts.filter(p=> p.category === local.category && p.id !== local.id).slice(0,10))
          return
        } else {
          if(mounted) setProduct(null)
          return
        }
      }

      try{
        const res = await api.get(`/products/${id}`)
        if(!mounted) return
        setProduct(res.data)
        setActiveImage(0)
        // fetch related products by category for suggestions
        if(res.data && res.data.category){
          try{
            const rel = await api.get('/products', { params: { category: res.data.category, limit: 10 } })
            if(mounted) setRelated((rel.data && rel.data.data) || [])
          }catch(e){
            // fallback to local dataset if related API fails
            if(mounted) setRelated(fallbackProducts.filter(p=> p.category === res.data.category).slice(0,10))
          }
        }
      }catch(err){ if(mounted) setProduct(null) }
    }
    fetch()
    return ()=> mounted = false
  }, [id])

  if(product === undefined) return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-[420px] bg-bg-light rounded-2xl" />
        <div className="space-y-4">
          <div className="h-10 w-2/3 bg-bg-light rounded" />
          <div className="h-4 w-full bg-bg-light rounded" />
          <div className="h-4 w-5/6 bg-bg-light rounded" />
          <div className="h-12 w-40 bg-bg-light rounded" />
        </div>
      </div>
    </div>
  )
  if(product === null) return (
    <div className="max-w-4xl mx-auto p-8 text-center lux-surface rounded-2xl">
      <h2 className="text-2xl font-semibold">Product not found</h2>
      <p className="text-text-secondary mt-2">This product may have been removed or is unavailable.</p>
      <Link to="/shop" className="btn-primary inline-block mt-4">Back to shop</Link>
    </div>
  )
  const images = (product?.images && product.images.length) ? product.images : (product?.image ? [product.image] : ['/images/placeholder.png'])
  const image = images[activeImage] || '/images/placeholder.png'

  const add = ()=>{
    dispatch({type:'ADD', payload: {...product, selectedSize: size, id: product._id || product.id, price: product.price}})
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="md:col-span-2 text-sm text-text-secondary">
        <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/shop" className="hover:text-primary">Shop</Link> / <span className="text-primary font-medium">{product.name}</span>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="col-span-1 space-y-2">
            {images.map((src, idx)=> (
              <button key={idx} onClick={()=>setActiveImage(idx)} className={`w-full h-20 overflow-hidden rounded-xl ${activeImage===idx? 'ring-2 ring-accent':''}`}>
                <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="col-span-3 relative">
            <motion.img src={image} alt={product.name} className="w-full h-[470px] object-cover rounded-2xl shadow-lg" whileHover={{ scale: 1.02 }} />
            {images.length > 1 && (
              <>
                <button onClick={()=>setActiveImage(i=> (i-1+images.length)%images.length)} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 p-2 rounded-full shadow-lg">◀</button>
                <button onClick={()=>setActiveImage(i=> (i+1)%images.length)} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 p-2 rounded-full shadow-lg">▶</button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="card-premium">
        <h1 className="text-[2.25rem] font-bold mb-3 leading-tight">{product.name}</h1>
        <div className="flex items-center gap-3 mb-4">
          <div className="text-accent">★★★★★</div>
          <div className="text-sm text-text-secondary">{product.rating} • {product.category}</div>
        </div>
        <p className="text-text-secondary mb-6">{product.description}</p>
        <div className="text-[2rem] font-semibold mb-6">${product.price.toFixed(2)} {product.oldPrice && <span className="text-sm line-through text-text-secondary ml-2">${product.oldPrice.toFixed(2)}</span>}</div>

        <div className="mb-5">
          <label className="block text-sm mb-2 text-text-secondary">Size</label>
          <div className="flex gap-2">
            {['S','M','L','XL'].map(s=> (
              <button key={s} onClick={()=>setSize(s)} className={`px-4 py-2 border rounded-xl smooth-transition ${size===s? 'bg-accent text-white border-accent' : 'border-primary/15 text-primary hover:border-accent'}`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="px-3 py-2 border border-primary/15 rounded-xl">-</button>
          <div className="px-3 font-medium">{qty}</div>
          <button onClick={()=>setQty(q=>q+1)} className="px-3 py-2 border border-primary/15 rounded-xl">+</button>
        </div>

        <div className="flex gap-3 mb-2">
          <button onClick={()=>{ for(let i=0;i<qty;i++) add(); }} className="btn-primary">Add to cart</button>
          <button onClick={()=>{ add(); nav('/checkout') }} className="px-5 py-3 border border-primary/15 rounded-xl smooth-transition hover:bg-primary hover:text-white">Buy now</button>
        </div>

        <section className="mt-8">
          <h3 className="font-semibold mb-3">Related products</h3>
          <div className="grid grid-cols-2 gap-6">
            {related.filter(p=> (p._id||p.id) !== (product._id||product.id)).slice(0,4).map(p=> (
              <div key={p._id||p.id} className="bg-white rounded-2xl shadow-md p-3">
                <img src={(p.images && p.images[0]) || p.image || '/images/placeholder.png'} className="w-full h-28 object-cover rounded-xl" />
                <div className="mt-2 text-sm">{p.name}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
