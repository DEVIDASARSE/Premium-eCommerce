import React from 'react'

export default function Loyalty(){
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-4">Loyalty Program</h2>
      <p className="text-text-secondary mb-4">Earn points with every purchase and redeem exclusive rewards.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Earn 1 point per $1 spent</div>
        <div className="p-4 bg-white rounded shadow">Redeem points for discounts</div>
        <div className="p-4 bg-white rounded shadow">Member-only drops</div>
      </div>
    </div>
  )
}
