import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const revealMap = {
  'fade-up': { y: 34, opacity: 0, duration: 0.9 },
  'slide-left': { x: 36, opacity: 0, duration: 0.9 },
  'slide-right': { x: -36, opacity: 0, duration: 0.9 },
  'scale-in': { scale: 0.92, opacity: 0, duration: 0.8 },
  'mask-in': { clipPath: 'inset(0 0 100% 0)', opacity: 1, duration: 1.1 }
}

export default function useScrollReveal(scopeRef, routeKey){
  useEffect(()=>{
    const scope = scopeRef.current
    if(!scope) return

    const ctx = gsap.context(()=>{
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile = window.innerWidth < 768
      const lowPowerDevice = (navigator.hardwareConcurrency || 8) <= 4
      const skipParallax = reduceMotion || isMobile || lowPowerDevice

      gsap.utils.toArray(scope.querySelectorAll('[data-animate]')).forEach((el)=>{
        const type = el.getAttribute('data-animate') || 'fade-up'
        const vars = revealMap[type] || revealMap['fade-up']
        const fromVars = { ...vars }

        if(isMobile || reduceMotion){
          fromVars.y = fromVars.y ? fromVars.y * 0.45 : fromVars.y
          fromVars.x = fromVars.x ? fromVars.x * 0.45 : fromVars.x
          fromVars.duration = 0.55
        }

        gsap.fromTo(el, fromVars, {
          y: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: fromVars.duration,
          ease: 'power3.out',
          clearProps: 'transform,opacity,clipPath',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true
          }
        })
      })

      gsap.utils.toArray(scope.querySelectorAll('[data-stagger]')).forEach((group)=>{
        const children = group.querySelectorAll('[data-stagger-item]')
        if(!children.length) return

        gsap.fromTo(children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.45 : 0.75,
            stagger: isMobile ? 0.06 : 0.1,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: group,
              start: 'top 80%',
              once: true
            }
          }
        )
      })

      if(skipParallax) return

      gsap.utils.toArray(scope.querySelectorAll('[data-parallax]')).forEach((item)=>{
        const speed = Number(item.getAttribute('data-speed') || 0.2)
        gsap.to(item, {
          yPercent: speed * -45,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            scrub: true
          }
        })
      })
    }, scope)

    requestAnimationFrame(()=>{
      ScrollTrigger.refresh()
    })

    return ()=>{
      ctx.revert()
    }
  }, [scopeRef, routeKey])
}
