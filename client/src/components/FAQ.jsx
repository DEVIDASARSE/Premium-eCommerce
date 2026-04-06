import React, { useState } from 'react'

const faqs = [
  { q: 'What is your return policy?', a: 'You can return items within 7 days in original condition.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3-7 business days.' },
  { q: 'Do you offer international shipping?', a: 'Yes, we ship globally — rates vary by region.' }
]

export default function FAQ(){
  const [open, setOpen] = useState(null)
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Frequently asked questions</h2>
        <div className="space-y-3">
          {faqs.map((f,i)=> (
            <div key={i} className="border rounded">
              <button onClick={()=> setOpen(open===i? null : i)} className="w-full text-left px-4 py-3 flex justify-between items-center">
                <span className="font-medium">{f.q}</span>
                <span>{open===i? '−' : '+'}</span>
              </button>
              {open===i && <div className="px-4 py-3 text-text-secondary">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
