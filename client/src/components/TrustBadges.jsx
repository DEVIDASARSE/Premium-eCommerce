import React from 'react'

export default function TrustBadges(){
  const items = [
    {label: 'Free Shipping', sub: 'Over $75'},
    {label: '7 Days Return', sub: 'Easy & free'},
    {label: 'Secure Payment', sub: 'SSL encrypted'},
    {label: 'Premium Quality', sub: 'Curated materials'}
  ]
  return (
    <div className="glass rounded-2xl py-6 mb-10">
      <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(it=> (
          <div key={it.label} className="flex items-center gap-3 rounded-xl bg-white/80 border border-primary/10 px-4 py-3">
            <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-accent">✓</div>
            <div>
              <div className="font-semibold">{it.label}</div>
              <small className="text-text-secondary">{it.sub}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
