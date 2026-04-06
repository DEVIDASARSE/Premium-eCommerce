import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useDispatchCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { toast } from 'react-toastify'

export default function ProductCard({ product }){
  const dispatch = useDispatchCart()
  const { items: wishlistItems, toggle } = useWishlist()
  const cardRef = useRef(null)
  const wishRef = useRef(null)
  const safePrice = Number(product?.price || 0)

  const add = (e) =>{
    e?.stopPropagation()
    e?.preventDefault()
    dispatch({ type: 'ADD', payload: { ...product, id: product._id || product.id, price: safePrice } })
    toast.success('Added to cart')
  }

  const isWish = !!wishlistItems.find(p=> (p.id || p._id) === (product.id || product._id))
  const toggleWish = (e)=>{
    e?.stopPropagation()
    e?.preventDefault()
    if(wishRef.current){
      gsap.fromTo(wishRef.current, { scale: 0.95 }, { scale: 1.18, duration: 0.16, yoyo: true, repeat: 1, ease: 'power3.out' })
    }
    toggle(product)
    toast.info(isWish ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const pid = product._id || product.id
  const image = (product.images && product.images[0]) || product.image || '/images/placeholder.png'
  const rating = Number(product?.rating || 4.7)

  return (
    <article
      ref={cardRef}
      data-animate="fade-up"
      onMouseEnter={()=> gsap.to(cardRef.current, { y: -8, scale: 1.05, boxShadow: '0 28px 60px rgba(15,23,42,0.18)', duration: 0.28, ease: 'power3.out' })}
      onMouseLeave={()=> gsap.to(cardRef.current, { y: 0, scale: 1, boxShadow: '0 12px 40px rgba(2,6,23,0.06)', duration: 0.28, ease: 'power3.out' })}
      className="card-premium overflow-hidden smooth-transition hover:shadow-lux group"
    >
      <Link to={`/product/${pid}`} className="block">
        <div className="relative overflow-hidden">
          {product.isOnSale && <div className="absolute top-3 left-3 bg-accentRed text-white text-xs px-2 py-1 rounded">-{product.discount || 10}%</div>}
          <img loading="lazy" src={image} alt={product.name} className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" />

          <div className="absolute inset-0 flex items-start justify-end p-3 pointer-events-none">
            <button ref={wishRef} onClick={toggleWish} aria-label={isWish? 'Remove from wishlist' : 'Add to wishlist'} className="pointer-events-auto bg-white/90 text-text-primary px-2 py-1 rounded-full shadow hover:bg-white">{isWish? '♥' : '♡'}</button>
          </div>

          <button type="button" onClick={(e)=>{ e.preventDefault(); e.stopPropagation(); window.dispatchEvent(new CustomEvent('openQuickView',{ detail: product })) }} className="absolute right-3 bottom-3 bg-white/95 text-text-primary text-sm px-3 py-2 rounded-xl shadow pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">Quick view</button>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-text-primary mb-1 line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between">
            <small className="text-text-secondary">{product.category || 'Collection'}</small>
            <div className="text-lg font-semibold">${safePrice.toFixed(2)}</div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-accent">★★★★★ <span className="text-text-secondary ml-2">{rating.toFixed(1)}</span></div>
            {product.oldPrice && <div className="text-sm line-through text-text-muted">${product.oldPrice.toFixed(2)}</div>}
          </div>
          <button type="button" onClick={add} className="btn-ripple mt-4 w-full rounded-xl border border-primary/10 py-2 text-sm font-semibold text-text-primary smooth-transition hover:bg-accent hover:text-white">Add to Cart</button>
        </div>
      </Link>
    </article>
  )
}
