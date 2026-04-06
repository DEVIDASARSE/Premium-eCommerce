import React from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import Hero from '../components/Hero'
import CategoryCard from '../components/CategoryCard'
import SaleBanner from '../components/SaleBanner'
import Trending from '../components/Trending'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import InstagramGrid from '../components/InstagramGrid'
import ShopByMood from '../components/ShopByMood'
import LimitedDrop from '../components/LimitedDrop'
import VideoBanner from '../components/VideoBanner'
import StatsStrip from '../components/StatsStrip'
import BlogPreview from '../components/BlogPreview'
import FAQ from '../components/FAQ'
import TrustBadges from '../components/TrustBadges'

export default function Home(){
  const featured = products.slice(0,4)
  const trending = products.slice(0,5)
  const categories = [
    { title: 'Men', image: 'https://images.unsplash.com/photo-1520975918536-0b3aef1f1a7a?q=80&w=800&auto=format&fit=crop' },
    { title: 'Women', image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800&auto=format&fit=crop' },
    { title: 'Accessories', image: 'https://images.unsplash.com/photo-1526178611918-0b3b6e5b92b3?q=80&w=800&auto=format&fit=crop' },
    { title: 'New Arrivals', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop' }
  ]

  const ig = [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975918536-0b3aef1f1a7a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526178611918-0b3b6e5b92b3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=800&auto=format&fit=crop'
  ]

  return (
    <div>
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-20">
        <div data-animate="fade-up">
          <TrustBadges />
        </div>
        <div data-animate="fade-up">
          <StatsStrip />
        </div>

        <section className="mb-16" data-animate="fade-up">
          <h2 className="section-title mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-stagger>
            {featured.map(p=> <div key={p.id} data-stagger-item><ProductCard product={p} /></div>)}
          </div>
        </section>

        <section className="mb-16" data-animate="slide-right">
          <h2 className="section-title mb-6">Shop by category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-stagger>
            {categories.map(c=> <div key={c.title} data-stagger-item><CategoryCard {...c} /></div>)}
          </div>
        </section>

        <section className="mb-16 lux-surface rounded-3xl p-8 md:p-12" data-animate="scale-in" data-parallax data-speed="0.16">
          <p className="uppercase tracking-[0.2em] text-xs text-text-secondary mb-3">Brand Story</p>
          <h2 className="section-title mb-4">Minimal form. Maximum intention.</h2>
          <p className="text-text-secondary max-w-3xl">Reimagine designs modern wardrobe staples through a quiet-luxury lens. Every stitch is focused on comfort, longevity, and silhouette discipline so your look stays sharp from morning to midnight.</p>
        </section>

        <div data-animate="mask-in">
          <SaleBanner />
        </div>

        <section className="my-16" data-animate="fade-up">
          <h2 className="section-title mb-6">Trending now</h2>
          <Trending items={trending} />
        </section>

        <div data-animate="slide-left">
          <ShopByMood />
        </div>

        <div data-animate="fade-up">
          <LimitedDrop />
        </div>

        <div data-animate="mask-in">
          <VideoBanner />
        </div>

        <section className="mb-16" data-animate="fade-up">
          <h2 className="section-title mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-stagger>
            <div className="p-5 bg-white rounded-xl shadow-soft-lg" data-stagger-item>Free shipping over $75</div>
            <div className="p-5 bg-white rounded-xl shadow-soft-lg" data-stagger-item>24/7 Support</div>
            <div className="p-5 bg-white rounded-xl shadow-soft-lg" data-stagger-item>Easy returns</div>
          </div>
        </section>

        <section className="mb-16" data-animate="fade-up">
          <h2 className="section-title mb-6">Testimonials</h2>
          <Testimonials />
        </section>

        <div data-animate="fade-up">
          <BlogPreview />
        </div>

        <section className="mb-16" data-animate="scale-in">
          <Newsletter />
        </section>

        <section className="mb-16" data-animate="fade-up">
          <h2 className="section-title mb-6">Lookbook</h2>
          <InstagramGrid images={ig} links={ig.map(src=> ({ to: '/instagram', state: { src } }))} />
        </section>

        <div data-animate="fade-up">
          <FAQ />
        </div>
      </main>
    </div>
  )
}
