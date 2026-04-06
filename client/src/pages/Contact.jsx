import React from 'react'

export default function Contact(){
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Contact</h1>
      <form className="space-y-4">
        <input placeholder="Name" className="w-full border rounded px-3 py-2" />
        <input placeholder="Email" className="w-full border rounded px-3 py-2" />
        <textarea placeholder="Message" className="w-full border rounded px-3 py-2" />
        <button className="px-4 py-2 bg-accent text-white rounded">Send</button>
      </form>
    </div>
  )
}
