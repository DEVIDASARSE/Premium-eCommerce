import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Auth(){
  const [tab, setTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const { login, register } = useAuth()
  const nav = useNavigate()

  const handleLogin = async (e)=>{
    e.preventDefault()
    setErr('')
    const form = Object.fromEntries(new FormData(e.target))
    if(!form.email || !form.password) return setErr('Fill all fields')
    setLoading(true)
    try{
      await login({ email: form.email, password: form.password })
      nav('/')
    }catch(err){ setErr(err?.response?.data?.message || err.message) }
    finally{ setLoading(false) }
  }

  const handleRegister = async (e)=>{
    e.preventDefault()
    setErr('')
    const form = Object.fromEntries(new FormData(e.target))
    if(!form.name || !form.email || !form.password) return setErr('All fields required')
    if(form.password !== form.confirm) return setErr('Passwords do not match')
    setLoading(true)
    try{
      await register({ name: form.name, email: form.email, password: form.password })
      nav('/')
    }catch(err){ setErr(err?.response?.data?.message || err.message) }
    finally{ setLoading(false) }
  }

  const isLogin = tab === 'login'

  return (
    <section className="relative min-h-[calc(100dvh-84px)] auth-cinematic-bg overflow-hidden">
      <div className="absolute inset-0 auth-cinematic-overlay" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-84px)] w-full max-w-[1380px] grid-cols-1 lg:grid-cols-2">
        <aside className="relative hidden lg:flex">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1800&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary/85" />
          <div className="relative mt-auto p-10 xl:p-14 text-white">
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">Private member space</p>
            <h2 className="mt-4 text-[2.1rem] leading-[1.1] font-heading">Luxury Essentials, Personalized For You.</h2>
            <p className="mt-5 max-w-md text-white/85">Track orders, manage wishlists, and unlock premium perks from one refined account experience.</p>
          </div>
        </aside>

        <main className="flex items-center justify-center px-5 py-10 sm:px-8 md:py-14">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="auth-glass-card w-full max-w-[520px]"
          >
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Account access</p>
              <h1 className="mt-3 text-3xl md:text-4xl font-heading">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
              <p className="mt-2 text-sm text-text-secondary">{isLogin ? 'Sign in to continue your premium shopping journey.' : 'Join to save favorites, checkout faster, and track orders.'}</p>
            </div>

            <div className="relative mb-5 grid grid-cols-2 rounded-2xl border border-primary/10 bg-white/55 p-1.5">
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl bg-gradient-to-r from-accent to-[#7c83ff] shadow-[0_10px_25px_rgba(99,102,241,0.35)] ${isLogin ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}
                aria-hidden="true"
              />
              <button type="button" onClick={()=>setTab('login')} className={`relative z-10 rounded-xl px-4 py-2.5 text-sm font-semibold smooth-transition ${isLogin ? 'text-white' : 'text-text-secondary hover:text-primary'}`}>Login</button>
              <button type="button" onClick={()=>setTab('register')} className={`relative z-10 rounded-xl px-4 py-2.5 text-sm font-semibold smooth-transition ${!isLogin ? 'text-white' : 'text-text-secondary hover:text-primary'}`}>Register</button>
            </div>

            {err && <div className="mb-4 rounded-xl border border-accentRed/25 bg-white/65 px-3 py-2 text-sm text-accentRed">{err}</div>}

            <AnimatePresence mode="wait" initial={false}>
              {isLogin ? (
                <motion.form
                  key="login"
                  onSubmit={handleLogin}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-text-secondary">Email</span>
                    <input name="email" placeholder="name@email.com" className="auth-input" autoComplete="email" />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-text-secondary">Password</span>
                    <input name="password" placeholder="••••••••" type="password" className="auth-input" autoComplete="current-password" />
                  </label>
                  <button disabled={loading} className="auth-btn-primary w-full">{loading ? 'Signing in...' : 'Sign in'}</button>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  onSubmit={handleRegister}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-text-secondary">Full name</span>
                    <input name="name" placeholder="Your full name" className="auth-input" autoComplete="name" />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-text-secondary">Email</span>
                    <input name="email" placeholder="name@email.com" className="auth-input" autoComplete="email" />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-text-secondary">Password</span>
                    <input name="password" placeholder="Create a password" type="password" className="auth-input" autoComplete="new-password" />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-text-secondary">Confirm password</span>
                    <input name="confirm" placeholder="Re-enter your password" type="password" className="auth-input" autoComplete="new-password" />
                  </label>
                  <button disabled={loading} className="auth-btn-primary w-full">{loading ? 'Creating account...' : 'Create account'}</button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-5 text-center text-sm text-text-secondary">
              {isLogin ? 'New here? ' : 'Already a member? '}
              <button type="button" onClick={()=>setTab(isLogin ? 'register' : 'login')} className="auth-text-link">{isLogin ? 'Create account' : 'Sign in'}</button>
            </div>
          </motion.div>
        </main>
      </div>
    </section>
  )
}
