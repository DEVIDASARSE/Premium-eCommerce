import React from 'react'

export default function GiftCard(){
  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-4">Gift Cards</h2>
      <p className="text-text-secondary mb-6">Send a digital gift card to someone special.</p>
      <div className="bg-white rounded shadow p-6">
        <label className="block mb-2">Amount</label>
        <select className="border p-2 rounded mb-4 w-full">
          <option>$25</option>
          <option>$50</option>
          <option>$100</option>
        </select>
        <label className="block mb-2">Recipient email</label>
        <input className="w-full border p-2 rounded mb-4" />
        <button className="px-4 py-2 bg-accent text-white rounded">Buy gift card</button>
      </div>
    </div>
  )
}
