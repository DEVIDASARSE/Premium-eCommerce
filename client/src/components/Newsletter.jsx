import React, { useState } from 'react'

export default function Newsletter(){
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)
  const submit = (e)=>{
    e.preventDefault()
    if(!email.includes('@')) return
    setOk(true)
    setEmail('')
  }
  return (
    <div className="lux-surface p-6 rounded-2xl">
      <h3 className="font-semibold mb-2">Join our newsletter</h3>
      <p className="text-sm text-text-secondary mb-4">Get early access to new drops and exclusive offers.</p>
      {ok ? <div className="text-accent">Thanks! Check your inbox.</div> : (
        <form onSubmit={submit} className="flex gap-2">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your email" className="px-3 py-2 rounded-xl flex-1 border border-primary/10" />
          <button type="submit" className="btn-primary">Subscribe</button>
        </form>
      )}
    </div>
  )
}
