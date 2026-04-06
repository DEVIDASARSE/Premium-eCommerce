import React, { createContext, useContext, useEffect, useState } from 'react'

const WishlistCtx = createContext()

export function WishlistProvider({ children }){
  const [items, setItems] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('wishlist_v1')||'[]') }catch(e){ return [] }
  })

  useEffect(()=>{
    localStorage.setItem('wishlist_v1', JSON.stringify(items))
  }, [items])

  const toggle = (product)=>{
    setItems(prev=>{
      if(prev.find(p=>p.id===product.id)) return prev.filter(p=>p.id!==product.id)
      return [product, ...prev]
    })
  }

  return (
    <WishlistCtx.Provider value={{ items, toggle }}>
      {children}
    </WishlistCtx.Provider>
  )
}

export const useWishlist = ()=> useContext(WishlistCtx)
