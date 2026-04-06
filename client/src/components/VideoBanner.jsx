import React from 'react'

export default function VideoBanner(){
  return (
    <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="relative rounded overflow-hidden">
          <video className="w-full h-64 object-cover" autoPlay muted loop playsInline>
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-2xl font-semibold">Watch the craft</h3>
              <p className="text-sm mt-2">Behind the scenes of our latest collection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
