import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SaleBanner(){
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(()=>{
    const target = Date.now() + 1000 * 60 * 60 * 24 * 3 // 3 days
    const t = setInterval(()=>{
      setTimeLeft(Math.max(0, target - Date.now()))
    }, 1000)
    return ()=>clearInterval(t)
  }, [])

  const fmt = (ms)=>{
    const s = Math.floor(ms/1000)
    const d = Math.floor(s/86400)
    const h = Math.floor((s%86400)/3600)
    const m = Math.floor((s%3600)/60)
    const sec = s%60
    return `${d}d ${h}h ${m}m ${sec}s`
  }

  return (
    <Link to="/sale" className="block">
      <div className="bg-accentRed text-white py-6 rounded-2xl hover:opacity-95 transition">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div>
            <div className="font-semibold">Mid-Season Sale — Up to 50% off</div>
            <div className="text-sm">Hurry, limited time only</div>
          </div>
          <div className="font-mono">Ends in: {fmt(timeLeft)}</div>
        </div>
      </div>
    </Link>
  )
}
