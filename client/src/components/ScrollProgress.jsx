import React, { useEffect, useState } from 'react'

export default function ScrollProgress(){
  const [pct, setPct] = useState(0)

  useEffect(()=>{
    let raf = null

    const updatePct = (next)=>{
      setPct((prev)=> (prev === next ? prev : next))
    }

    const onScroll = ()=>{
      if(raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(()=>{
        const sc = window.scrollY
        const sh = document.documentElement.scrollHeight - window.innerHeight
        const p = sh > 0 ? Math.min(100, Math.round((sc / sh) * 100)) : 0
        updatePct(p)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return ()=>{
      window.removeEventListener('scroll', onScroll)
      if(raf) cancelAnimationFrame(raf)
    }
  },[])

  return (
    <div className="fixed left-0 top-0 h-1 z-[60] w-full bg-transparent pointer-events-none">
      <div style={{ width: `${pct}%` }} className="h-1 bg-accent transition-all duration-150" />
    </div>
  )
}
