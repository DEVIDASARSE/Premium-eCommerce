import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="container-max px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="text-2xl font-heading">Reimagine</div>
          <div className="text-white/80 mt-3">Timeless minimal fashion for modern living. Crafted with care and premium materials.</div>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <a href="#" className="text-white/80 hover:text-white">Instagram</a>
            <a href="#" className="text-white/80 hover:text-white">Facebook</a>
            <a href="#" className="text-white/80 hover:text-white">Twitter</a>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-3">Shop</div>
          <div className="flex flex-col gap-2">
            <Link to="/shop" className="text-white/80 hover:text-white">All products</Link>
            <Link to="/categories" className="text-white/80 hover:text-white">Categories</Link>
            <Link to="/sale" className="text-white/80 hover:text-white">Sale</Link>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-3">Company</div>
          <div className="flex flex-col gap-2">
            <Link to="/about" className="text-white/80 hover:text-white">About</Link>
            <Link to="/contact" className="text-white/80 hover:text-white">Contact</Link>
            <Link to="/gift-card" className="text-white/80 hover:text-white">Gift card</Link>
          </div>
        </div>

        <div>
          <div className="font-semibold mb-3">Customer support</div>
          <div className="text-white/80">support@reimagine.com</div>
          <div className="text-white/80 mt-2">+1 (555) 123-4567</div>
          <form className="mt-4 flex gap-2" onSubmit={(e)=> e.preventDefault()}>
            <input placeholder="Email" className="flex-1 px-3 py-2 rounded-xl text-primary" />
            <button type="submit" className="px-4 py-2 bg-accent text-white rounded-xl smooth-transition hover:scale-[1.02]">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 mt-6 py-6 text-center text-xs text-white/60">© {new Date().getFullYear()} Reimagine. All rights reserved.</div>
    </footer>
  )
}
