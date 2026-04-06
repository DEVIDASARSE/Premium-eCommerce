import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function LimitedDrop(){
  const [timeLeft, setTimeLeft] = useState(0)
  useEffect(()=>{
    const target = Date.now() + 1000 * 60 * 60 * 24 * 2
    const t = setInterval(()=> setTimeLeft(Math.max(0, target - Date.now())), 1000)
    return ()=> clearInterval(t)
  },[])
  const fmt = ms=>{
    const s = Math.floor(ms/1000)
    const h = Math.floor((s%86400)/3600)
    const m = Math.floor((s%3600)/60)
    const sec = s%60
    return `${h}h ${m}m ${sec}s`
  }
  return (
    <section className="py-20 bg-gradient-to-r from-bg-light to-white rounded-2xl">
      <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-3xl font-semibold mb-3">Limited Edition Drop</h3>
          <p className="text-text-secondary mb-4">Exclusive pieces released in limited quantities. Once they’re gone, they’re gone.</p>
          <div className="flex gap-3">
            <Link to="/drop/limited" className="btn-primary inline-block">Shop Drop</Link>
            <div className="px-4 py-2 border border-primary/10 rounded-xl">Ends in: <span className="font-mono ml-2">{fmt(timeLeft)}</span></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/drop/limited"><img src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop" className="w-full h-40 object-cover rounded" /></Link>
          <Link to="/drop/limited"><img src="https://images.unsplash.com/photo-1520975918536-0b3aef1f1a7a?q=80&w=800&auto=format&fit=crop" className="w-full h-40 object-cover rounded" /></Link>
        </div>
      </div>
    </section>
  )
}
