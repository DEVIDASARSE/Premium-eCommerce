import React from 'react'
import { Link } from 'react-router-dom'

export default function InstagramGrid({ images = [], links = [], onImageClick }){
  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((src,i)=>{
        const link = links && links[i]
        const handleClick = (e)=>{
          if(onImageClick){
            e.preventDefault()
            onImageClick(src, i)
          }
        }

        // If link is an object, assume it's a router `to` object: { to, state }
        if(link && typeof link === 'object'){
          return (
            <Link key={i} to={link.to} state={link.state} onClick={handleClick} className="block">
              <img src={src} alt={`instagram-${i}`} className="w-full h-32 object-cover rounded cursor-pointer" />
            </Link>
          )
        }

        // If link is a string starting with '/', use internal Link
        if(link && typeof link === 'string' && link.startsWith('/')){
          return (
            <Link key={i} to={link} onClick={handleClick} className="block">
              <img src={src} alt={`instagram-${i}`} className="w-full h-32 object-cover rounded cursor-pointer" />
            </Link>
          )
        }

        // Fallback: external anchor
        const href = link || src
        return (
          <a key={i} href={href} onClick={handleClick} target="_blank" rel="noopener noreferrer" className="block">
            <img src={src} alt={`instagram-${i}`} className="w-full h-32 object-cover rounded cursor-pointer" />
          </a>
        )
      })}
    </div>
  )
}
