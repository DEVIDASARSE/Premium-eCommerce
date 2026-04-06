import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function Hero(){
  const rootRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(()=>{
    const ctx = gsap.context(()=>{
      gsap.fromTo('[data-hero-line]',
        { y: 52, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.14,
          duration: 1,
          ease: 'power3.out'
        }
      )

      gsap.fromTo('[data-hero-cta]',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.45,
          ease: 'power3.out'
        }
      )

      gsap.fromTo(imageRef.current,
        { scale: 1.12, opacity: 0.85 },
        { scale: 1.02, opacity: 1, duration: 1.5, ease: 'power3.out' }
      )

      gsap.to(imageRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    }, rootRef)

    return ()=> ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative hero-cinematic overflow-hidden">
      <div
        ref={imageRef}
        aria-hidden="true"
        className="absolute inset-0 scale-105 will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=2400&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/55 to-primary/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.28),transparent_45%)] blur-[1px]" />

      <div className="w-full relative">
        <div className="relative z-10 container-max px-4 py-24 md:py-32 lg:py-44">
          <div className="max-w-3xl text-white">
            <p data-hero-line className="uppercase tracking-[0.25em] text-xs font-semibold text-white/70 mb-5">Premium Essentials / 2026 Collection</p>
            <h1 data-hero-line className="font-heading font-bold mb-6 text-balance text-[3.2rem] md:text-[4rem] lg:text-[4rem]">Redefine Modern Luxury, One Layer At A Time.</h1>
            <p data-hero-line className="subtitle text-white/90 mb-10 max-w-2xl">Tailored silhouettes, elevated textures, and minimalist craftsmanship for wardrobes that move with intent.</p>
            <div data-hero-cta className="flex flex-wrap gap-6">
              <Link to="/shop" className="btn-ripple inline-flex items-center px-8 py-3.5 rounded-xl bg-accent text-white font-semibold shadow-lux smooth-transition hover:-translate-y-1 hover:scale-[1.02]">Shop New Arrivals</Link>
              <Link to="/categories" className="btn-ripple inline-flex items-center px-8 py-3.5 rounded-xl border border-white/30 text-white/95 smooth-transition hover:bg-white/10">Explore Categories</Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="scroll-indicator w-10 h-14 border border-white/40 rounded-full flex items-end justify-center px-1">
            <div className="w-1.5 h-3 bg-white rounded mb-1" />
          </div>
        </div>
      </div>
    </section>
  )
}
