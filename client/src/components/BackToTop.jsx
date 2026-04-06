import React, { useState, useEffect } from 'react'

export default function BackToTop(){
  const [show, setShow] = useState(false)

  useEffect(()=>{
    const updateVisible = ()=>{
      const next = window.scrollY > 400
      setShow((prev)=> (prev === next ? prev : next))
    }

    window.addEventListener('scroll', updateVisible, { passive: true })
    updateVisible()

    return ()=> window.removeEventListener('scroll', updateVisible)
  },[])

  if(!show) return null

  return (
    <button
      type="button"
      onClick={()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      aria-label="Back to top"
      className="fixed right-4 bottom-4 z-50 bg-primary text-white p-3 rounded-full shadow-elevate hover:-translate-y-1 smooth-transition"
    >
      ↑
    </button>
  )
}
