import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { items } = useCart()
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const nav = useNavigate()
  const count = items.reduce((s,i)=>s+i.qty,0)

  useEffect(()=>{
    let ticking = false
    const onScroll = ()=>{
      if(ticking) return
      ticking = true
      requestAnimationFrame(()=>{
        const next = window.scrollY > 12
        setScrolled((prev)=> (prev === next ? prev : next))
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  useEffect(()=>{
    setOpen(false)
  }, [pathname])

  // lock body scroll when mobile menu open
  useEffect(()=>{
    const prev = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : prev
    return ()=> { document.body.style.overflow = prev }
  }, [open])

  return (
    <motion.header
      initial={false}
      animate={{ y:0, opacity:1 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className={`sticky top-0 z-[90] transition-all duration-300 nav-glass ${scrolled ? 'shadow-elevate py-2' : 'py-3'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-heading tracking-tight text-primary">Reimagine</Link>
            <nav className="hidden md:flex ml-10 space-x-6">
              <NavLink to="/" className={({isActive})=> `relative text-sm ${isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'} transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>Home</NavLink>
              <NavLink to="/shop" className={({isActive})=> `relative text-sm ${isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'} transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>Shop</NavLink>
              <NavLink to="/categories" className={({isActive})=> `relative text-sm ${isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'} transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>Categories</NavLink>
              <NavLink to="/sale" className={({isActive})=> `relative text-sm ${isActive ? 'text-accentRed' : 'text-accentRed/90 hover:text-accentRed'} transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accentRed after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>Sale</NavLink>
              <NavLink to="/about" className={({isActive})=> `relative text-sm ${isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'} transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}>About</NavLink>
            </nav>
          </div>

          <div className="hidden md:block flex-1 px-4">
            <div className="max-w-lg mx-auto">
              <input onKeyDown={(e)=>{ if(e.key==='Enter'){ nav(`/shop?q=${encodeURIComponent(e.target.value)}`) } }} placeholder="Search products..." className="w-full px-4 py-2 rounded-full bg-white/90 border border-primary/10 focus:outline-none focus:ring-2 focus:ring-accent smooth-transition" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="hidden md:inline-block text-text-secondary hover:text-text-primary transition">♡</Link>
            <Link to="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4"/></svg>
              {count>0 && <span className="absolute -top-2 -right-2 bg-accentRed text-white text-xs rounded-full px-1">{count}</span>}
            </Link>
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="text-sm text-text-secondary">Hi, {user.name || user.email}</div>
                <button onClick={()=>{ logout(); nav('/') }} className="px-3 py-1 border border-primary/15 rounded-xl text-sm smooth-transition hover:bg-primary hover:text-white">Logout</button>
              </div>
            ) : (
              <Link to="/auth" className="hidden md:inline-block px-4 py-2 border border-primary/15 rounded-xl text-sm smooth-transition hover:bg-primary hover:text-white">Login</Link>
            )}
            <button className="md:hidden rounded-xl border border-primary/15 bg-white/55 px-2.5 py-2 text-primary smooth-transition hover:bg-white/75" aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="md:hidden"
            aria-hidden={!open}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={()=>setOpen(false)}
              className="fixed inset-0 nav-menu-backdrop z-[95]"
              role="presentation"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 left-0 bottom-0 z-[100] w-[86vw] max-w-[360px] auth-glass-card shadow-lux p-6"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold text-primary">Menu</div>
                <button onClick={()=>setOpen(false)} className="rounded-lg px-2.5 py-1.5 text-sm smooth-transition hover:bg-white/55">Close</button>
              </div>

              <div className="mb-5">
                <input onKeyDown={(e)=>{ if(e.key==='Enter'){ nav(`/shop?q=${encodeURIComponent(e.target.value)}`); setOpen(false) } }} placeholder="Search..." className="auth-input" />
              </div>

              <nav className="flex flex-col gap-2 text-[15px]">
                <NavLink to="/" onClick={()=>setOpen(false)} className="mobile-nav-link">Home</NavLink>
                <NavLink to="/shop" onClick={()=>setOpen(false)} className="mobile-nav-link">Shop</NavLink>
                <NavLink to="/categories" onClick={()=>setOpen(false)} className="mobile-nav-link">Categories</NavLink>
                <NavLink to="/sale" onClick={()=>setOpen(false)} className="mobile-nav-link">Sale</NavLink>
                <NavLink to="/about" onClick={()=>setOpen(false)} className="mobile-nav-link">About</NavLink>
                <NavLink to="/contact" onClick={()=>setOpen(false)} className="mobile-nav-link">Contact</NavLink>
                <NavLink to="/auth" onClick={()=>setOpen(false)} className="mobile-nav-link">Login</NavLink>
              </nav>

              <div className="mt-7 flex gap-3 text-sm text-text-secondary">
                <span>Instagram</span>
                <span>Facebook</span>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
