import React, { useMemo, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Instagram(){
  const loc = useLocation()
  const navigate = useNavigate()
  const src = loc.state && loc.state.src
  const [copied, setCopied] = useState(false)

  const matched = useMemo(()=>{
    if(!src) return null
    return products.find(p=> {
      if(p.image && p.image === src) return true
      if(p.images && p.images.length && p.images[0] === src) return true
      return false
    }) || null
  }, [src])

  const related = useMemo(()=>{
    if(matched) return products.filter(p=> p.category === matched.category && p.id !== matched.id).slice(0,4)
    return products.filter(p=> (p.tags||[]).includes('Limited')).slice(0,4)
  }, [matched])

  const handleCopy = async ()=>{
    try{
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(()=>setCopied(false), 2000)
    }catch(e){
      setCopied(false)
    }
  }

  if(!src) return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Instagram</h1>
      <div className="p-8 bg-white rounded shadow text-center">No image selected. Go back to <Link to="/">home</Link>.</div>
    </div>
  )

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <div className="mb-4"><button onClick={()=>navigate(-1)} className="text-sm text-blue-600">← Back</button></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded shadow p-4 flex items-center justify-center">
          <img src={src} alt="instagram-large" className="w-full max-h-[80vh] object-contain" />
        </div>

        <aside className="space-y-4">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Post details</h2>
            <div className="text-sm text-text-secondary mb-3">Posted by <span className="font-medium">Reimagine</span> • <span className="text-text-secondary">2 days ago</span></div>
            <p className="text-primary mb-3">High-quality curated product imagery. Tap to view related products and full details. This is placeholder caption text — replace with real captions when available.</p>

            {matched ? (
              <div className="border rounded p-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="font-medium">{matched.name}</div>
                    <div className="text-sm text-text-secondary">{matched.category}</div>
                    <div className="text-lg font-semibold mt-2">${(matched.price||0).toFixed(2)}</div>
                  </div>
                  <div>
                    <Link to={`/product/${matched.id}`} className="px-3 py-2 bg-accent text-white rounded">View product</Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 border rounded text-sm text-text-secondary">No direct product match available for this image.</div>
            )}

            <div className="mt-4 flex gap-2">
              <button onClick={handleCopy} className="px-3 py-2 border rounded">{copied ? 'Link copied' : 'Copy link'}</button>
              <a href={src} target="_blank" rel="noopener noreferrer" className="px-3 py-2 border rounded">Open original</a>
            </div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-3">Related products</h3>
            {related.length === 0 ? (
              <div className="text-sm text-text-secondary">No related products.</div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {related.map(p=> (
                  <div key={p.id} className="p-2 border rounded bg-bg-light">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
