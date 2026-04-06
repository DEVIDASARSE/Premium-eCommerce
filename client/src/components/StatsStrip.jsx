import React, { useEffect, useState } from 'react'

function Counter({ to, label }){
  const [val, setVal] = useState(0)
  useEffect(()=>{
    let raf
    const start = Date.now()
    const dur = 1200
    const step = ()=>{
      const t = Math.min(1, (Date.now()-start)/dur)
      setVal(Math.floor(t*to))
      if(t<1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return ()=> cancelAnimationFrame(raf)
  },[to])
  return (
    <div className="text-center">
      <div className="text-2xl font-semibold">{val}</div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  )
}

export default function StatsStrip(){
  return (
    <section className="py-8 bg-bg-light rounded-2xl mb-10">
      <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        <Counter to={5000} label="Happy customers" />
        <Counter to={120} label="Stores worldwide" />
        <Counter to={24} label="Hours support" />
        <Counter to={10} label="Awards" />
      </div>
    </section>
  )
}
