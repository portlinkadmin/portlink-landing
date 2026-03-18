'use client'

import { useEffect, useRef } from 'react'

export function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const revealAll = () => {
      el.querySelectorAll('.reveal').forEach((c) => c.classList.add('visible'))
    }

    let io: IntersectionObserver | null = null

    // Small delay to allow paint before checking visibility
    const timer = setTimeout(() => {
      const rect = el.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0

      if (inViewport) {
        revealAll()
        return
      }

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              revealAll()
              io?.unobserve(el)
            }
          })
        },
        { threshold, rootMargin: '0px 0px -20px 0px' }
      )

      io.observe(el)
    }, 50)

    return () => {
      clearTimeout(timer)
      io?.disconnect()
    }
  }, [threshold])

  return ref
}
