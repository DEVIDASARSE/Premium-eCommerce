import React, { useMemo, useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gsap } from 'gsap'
import api from '../api'
import fallbackProducts from '../data/products'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

const FALLBACK_MAX_PRICE = 300

const mapProduct = (p)=> ({
  ...p,
  id: p.id || p._id,
  _id: p._id || p.id,
  image: (p.images && p.images[0]) || p.image || '/images/placeholder.png',
  price: Number(p.price || 0),
  category: p.category || 'Collection'
})

const sortProducts = (items, sort)=>{
  const arr = items.slice()
  if(sort === 'low') return arr.sort((a, b)=> a.price - b.price)
  if(sort === 'high') return arr.sort((a, b)=> b.price - a.price)
  if(sort === 'name_asc') return arr.sort((a, b)=> String(a.name || '').localeCompare(String(b.name || '')))
  return arr.sort((a, b)=> new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
}

export default function Shop(){
  const pageRef = useRef(null)
  const gridRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [q, setQ] = useState(()=> searchParams.get('q') || '')
  const [category, setCategory] = useState(()=> searchParams.get('category') || '')
  const [maxPrice, setMaxPrice] = useState(()=> Number(searchParams.get('maxPrice')) || FALLBACK_MAX_PRICE)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [sort, setSort] = useState(()=> searchParams.get('sort') || 'newest')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [dataSource, setDataSource] = useState('live')
  const [error, setError] = useState('')
  const [debouncedQ, setDebouncedQ] = useState(q)

  const usingFallback = dataSource === 'fallback'

  useEffect(()=>{
    const timer = setTimeout(()=> setDebouncedQ(q.trim()), 220)
    return ()=> clearTimeout(timer)
  }, [q])

  useEffect(()=>{
    setQ(searchParams.get('q') || '')
    setCategory(searchParams.get('category') || '')
    setSort(searchParams.get('sort') || 'newest')
    setMaxPrice(Number(searchParams.get('maxPrice')) || FALLBACK_MAX_PRICE)
  }, [searchParams])

  useEffect(()=>{
    const next = new URLSearchParams()
    if(q) next.set('q', q)
    if(category) next.set('category', category)
    if(sort && sort !== 'newest') next.set('sort', sort)
    if(maxPrice < FALLBACK_MAX_PRICE) next.set('maxPrice', String(maxPrice))
    setSearchParams(next, { replace: true })
  }, [q, category, sort, maxPrice, setSearchParams])

  useEffect(()=>{
    let mounted = true
    ;(async ()=>{
      setLoading(true)
      setError('')

      const results = await Promise.allSettled([
        api.get('/products', {
          params: {
            keyword: debouncedQ,
            category,
            minPrice: 0,
            maxPrice,
            sort
          }
        }),
        api.get('/products/meta/categories')
      ])

      if(!mounted) return

      const productsResult = results[0]
      const categoriesResult = results[1]
      const fallbackMapped = fallbackProducts.map(mapProduct)

      if(categoriesResult.status === 'fulfilled'){
        const remoteCategories = categoriesResult.value?.data?.data || []
        const safeCategories = remoteCategories.filter(Boolean)
        setCategories(safeCategories.length ? safeCategories : [...new Set(fallbackMapped.map(p=> p.category))])
      }else{
        setCategories([...new Set(fallbackMapped.map(p=> p.category))])
      }

      if(productsResult.status === 'fulfilled'){
        const liveData = (productsResult.value?.data?.data || []).map(mapProduct)
        if(liveData.length){
          setProducts(liveData)
          setDataSource('live')
        }else{
          setProducts(fallbackMapped)
          setDataSource('fallback')
          setError('Live catalog is empty. Showing curated collection instead.')
        }
      }else{
        setProducts(fallbackMapped)
        setDataSource('fallback')
        setError('Live catalog unavailable, showing curated collection.')
      }

      setLoading(false)
    })()

    return ()=>{ mounted = false }
  }, [debouncedQ, category, maxPrice, sort])

  const filtered = useMemo(()=> {
    let res = products.slice()

    if(usingFallback){
      if(debouncedQ) res = res.filter(p=> String(p.name || '').toLowerCase().includes(debouncedQ.toLowerCase()))
      if(category) res = res.filter(p=> String(p.category || '').toLowerCase() === category.toLowerCase())
      res = res.filter(p=> Number(p.price || 0) <= maxPrice)
      res = sortProducts(res, sort)
    }

    if(size) res = res.filter(p=> (p.sizes||['S','M','L']).includes(size))
    if(color) res = res.filter(p=> (p.colors||[]).includes(color))

    return res
  }, [products, size, color, sort, usingFallback, debouncedQ, category, maxPrice])

  useLayoutEffect(()=>{
    if(!pageRef.current) return undefined
    const ctx = gsap.context(()=>{
      gsap.from('[data-shop-title]', { y: 28, opacity: 0, duration: 0.55, ease: 'power3.out' })
      gsap.from('[data-filter-card]', { y: 20, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.08 })
    }, pageRef)
    return ()=> ctx.revert()
  }, [])

  useEffect(()=>{
    if(!gridRef.current || loading) return
    const cards = gridRef.current.querySelectorAll('[data-product-card-wrap]')
    if(!cards.length) return
    gsap.fromTo(cards, { y: 22, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.045, duration: 0.42, ease: 'power2.out' })
  }, [filtered, loading])

  const activeFilters = Number(Boolean(q)) + Number(Boolean(category)) + Number(Boolean(size)) + Number(Boolean(color)) + Number(maxPrice < FALLBACK_MAX_PRICE) + Number(sort !== 'newest')

  const resetFilters = ()=>{
    setQ('')
    setCategory('')
    setSize('')
    setColor('')
    setSort('newest')
    setMaxPrice(FALLBACK_MAX_PRICE)
  }

  return (
    <section ref={pageRef} className="relative overflow-hidden px-4 py-16 md:py-20">
      <div className="shop-bg-orb shop-bg-orb-left" aria-hidden="true" />
      <div className="shop-bg-orb shop-bg-orb-right" aria-hidden="true" />

      <div className="max-w-[1320px] mx-auto">
        <div data-shop-title className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">Curated style index</p>
            <h1 className="text-4xl md:text-5xl font-heading mt-2">Shop All</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="glass-chip">{filtered.length} pieces</span>
            {activeFilters > 0 && (
              <button type="button" onClick={resetFilters} className="px-4 py-2 rounded-xl border border-primary/20 text-sm font-medium hover:bg-primary hover:text-white smooth-transition">Clear all</button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
          <aside className="lg:col-span-4 xl:col-span-3 space-y-4 lg:sticky lg:top-24 self-start">
            <div data-filter-card className="card-premium glass-soft p-5 md:p-6 space-y-5">
              <div>
                <h4 className="font-semibold mb-2">Search</h4>
                <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search products, collections..." className="w-full rounded-xl px-3 py-2.5 border border-primary/15 bg-white/70 outline-none focus:ring-2 focus:ring-accent/30" />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Category</h4>
                <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full rounded-xl p-2.5 border border-primary/15 bg-white/70 outline-none focus:ring-2 focus:ring-accent/30">
                  <option value="">All</option>
                  {categories.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Max price</h4>
                  <span className="text-sm text-text-secondary">${maxPrice}</span>
                </div>
                <input type="range" min="0" max={FALLBACK_MAX_PRICE} value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))} className="w-full accent-accent" />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Sort by</h4>
                <select value={sort} onChange={e=>setSort(e.target.value)} className="w-full rounded-xl p-2.5 border border-primary/15 bg-white/70 outline-none focus:ring-2 focus:ring-accent/30">
                  <option value="newest">Newest first</option>
                  <option value="low">Price: Low to high</option>
                  <option value="high">Price: High to low</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>
              </div>
            </div>

            <div data-filter-card className="card-premium glass-soft p-5 md:p-6 space-y-4">
              <h4 className="font-semibold">Quick refine</h4>
              <div className="flex items-center gap-3">
                <select value={size} onChange={e=>setSize(e.target.value)} className="w-1/2 rounded-xl p-2.5 border border-primary/15 bg-white/70 outline-none focus:ring-2 focus:ring-accent/30">
                  <option value="">Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
                <select value={color} onChange={e=>setColor(e.target.value)} className="w-1/2 rounded-xl p-2.5 border border-primary/15 bg-white/70 outline-none focus:ring-2 focus:ring-accent/30">
                  <option value="">Color</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Blue">Blue</option>
                  <option value="Beige">Beige</option>
                </select>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8 xl:col-span-9">
            <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
              <div className="text-sm text-text-secondary">Showing {filtered.length} result{filtered.length === 1 ? '' : 's'}</div>
              <div className="text-xs uppercase tracking-[0.12em] text-text-secondary">Source: {usingFallback ? 'Curated fallback' : 'Live catalog'}</div>
            </div>

            {error && <div className="mb-4 rounded-2xl border border-accentRed/25 bg-white/80 backdrop-blur px-4 py-3 text-sm text-accentRed">{error}</div>}

            {loading ? <Loader /> : (
              filtered.length === 0 ? (
                <div className="p-10 md:p-14 text-center lux-surface rounded-3xl border border-primary/10">
                  <div className="text-5xl mb-3">◌</div>
                  <h3 className="text-xl font-semibold">No results found</h3>
                  <p className="text-text-secondary mt-2">Try reducing filters or searching a different keyword.</p>
                  <button type="button" onClick={resetFilters} className="mt-6 px-5 py-2 rounded-xl border border-primary/20 hover:bg-primary hover:text-white smooth-transition">Reset filters</button>
                </div>
              ) : (
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-7">
                  {filtered.map(p=> (
                    <div key={p.id || p._id} data-product-card-wrap>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              )
            )}
          </main>
        </div>
      </div>
    </section>
  )
}
