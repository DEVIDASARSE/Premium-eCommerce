import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import api from '../api'
import localProducts from '../data/products'
import ProductCard from '../components/ProductCard'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function CategoryPage(){
  const { name } = useParams()
  const categoryName = decodeURIComponent(name || '')
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState('')

  useEffect(()=>{
    let mounted = true
    const fetch = async ()=>{
      setLoading(true)
      setError('')
      try{
        const res = await api.get('/products', { params: { category: categoryName, pageNumber: page, limit: 20 } })
        if(!mounted) return
        const serverData = (res.data.data || []).map(p=> ({ ...p, id: p._id || p.id, image: (p.images && p.images[0]) || p.image || '/images/placeholder.png' }))
        // use server data if available, otherwise fallback to local dataset
        if(serverData.length > 0){
          setProducts(serverData)
          setTotalPages(res.data.pages || 1)
        }else{
          const filtered = localProducts.filter(p=> String(p.category).toLowerCase() === String(categoryName).toLowerCase())
          const fallback = filtered.slice((page-1)*20, page*20).map(p=> ({ ...p, id: p._id || p.id, image: (p.images && p.images[0]) || p.image || '/images/placeholder.png' }))
          setProducts(fallback)
          setTotalPages(Math.max(1, Math.ceil(filtered.length / 20)))
        }
      }catch(err){
        setError('Unable to load live category data, showing local collection.')
        const filtered = localProducts.filter(p=> String(p.category).toLowerCase() === String(categoryName).toLowerCase())
        const fallback = filtered.slice((page-1)*20, page*20).map(p=> ({ ...p, id: p._id || p.id, image: (p.images && p.images[0]) || p.image || '/images/placeholder.png' }))
        if(!mounted) return
        setProducts(fallback)
        setTotalPages(Math.max(1, Math.ceil(filtered.length / 20)))
      }finally{ if(mounted) setLoading(false) }
    }
    fetch()
    return ()=> mounted = false
  }, [categoryName, page])

  const goPage = (p)=> setSearchParams({ page: String(p) })

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-6 text-sm text-text-secondary">
        <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/categories" className="hover:text-primary">Categories</Link> / <span className="font-semibold text-primary">{categoryName}</span>
      </div>
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

      {error && <div className="mb-4 rounded-xl border border-accentRed/25 bg-white px-3 py-2 text-sm text-accentRed">{error}</div>}

      {loading ? <LoadingSkeleton /> : (
        products.length === 0 ? (
          <div className="p-10 text-center lux-surface rounded-2xl">
            <div className="text-5xl mb-3">◌</div>
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="text-text-secondary mt-2">Try another category or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p=> <ProductCard key={p.id} product={p} />)}
          </div>
        )
      )}

      <div className="mt-8 flex items-center justify-center gap-3">
        <button type="button" disabled={page<=1} onClick={()=>goPage(page-1)} className="px-4 py-2 border border-primary/10 rounded-xl disabled:opacity-50">Prev</button>
        <div>Page {page} of {totalPages}</div>
        <button type="button" disabled={page>=totalPages} onClick={()=>goPage(page+1)} className="px-4 py-2 border border-primary/10 rounded-xl disabled:opacity-50">Next</button>
      </div>
    </div>
  )
}
