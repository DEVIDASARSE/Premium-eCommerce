import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useSmoothScroll(containerRef, routeKey){
  useEffect(()=>{
    // Keep a single native scroller for stability.
    ScrollTrigger.defaults({ scroller: window })

    return ()=>{
      ScrollTrigger.defaults({ scroller: window })
    }
  }, [containerRef])

  useEffect(()=>{
    requestAnimationFrame(()=>{
      ScrollTrigger.refresh()
    })
  }, [routeKey])
}
