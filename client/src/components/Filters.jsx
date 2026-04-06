import React from 'react'

export default function Filters({ categories, onCategory, onPrice }){
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h4 className="font-semibold mb-2">Filters</h4>
      <div className="mb-3">
        <label className="block text-sm font-medium">Category</label>
        <select onChange={(e)=>onCategory(e.target.value)} className="w-full mt-1 border rounded p-2">
          <option value="">All</option>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Max Price</label>
        <input type="range" min="0" max="200" defaultValue="200" onChange={(e)=>onPrice(Number(e.target.value))} />
      </div>
    </div>
  )
}
