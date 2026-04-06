import React from 'react'
import posts from '../data/blog'

export default function BlogPreview(){
  return (
    <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">From the Journal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(p=> (
            <article key={p.id} className="bg-white rounded shadow overflow-hidden">
              <img src={p.img} className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-text-secondary">{p.excerpt}</p>
                <a href="#" className="text-sm text-accent mt-3 inline-block">Read more →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
