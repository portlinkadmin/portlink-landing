'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import PersonaGate from '@/components/PersonaGate'
import PersonaToggle from '@/components/PersonaToggle'
import Nav from '@/components/Nav'
import HeroSection from '@/components/sections/HeroSection'
import PainSection from '@/components/sections/PainSection'
import RoleSection from '@/components/sections/RoleSection'
import ValueSection from '@/components/sections/ValueSection'
import EcosystemSection from '@/components/sections/EcosystemSection'
import BentoSection from '@/components/sections/BentoSection'
import PilotSection from '@/components/sections/PilotSection'
import AccessSection from '@/components/sections/AccessSection'
import Footer from '@/components/sections/Footer'

export type Persona = 'all' | 'cruise' | 'agent' | 'tour'

type LenisInstance = {
  raf: (time: number) => void
  destroy: () => void
  scrollTo: (target: string | HTMLElement, options?: Record<string, unknown>) => void
  on: (event: 'scroll', callback: () => void) => void
}

// Expose Lenis on window for nav anchor clicks
declare global {
  interface Window {
    __lenis?: LenisInstance
  }
}

export default function Home() {
  const [persona, setPersona] = useState<Persona | null>(null)
  const [gateVisible, setGateVisible] = useState(true)
  const [toggleVisible, setToggleVisible] = useState(false)

  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Smooth scroll via Lenis
  useEffect(() => {
    let lenis: LenisInstance | null = null
    let rafId: number
    let destroyed = false

    const init = async () => {
      const { default: Lenis } = await import('lenis')
      if (destroyed) return

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      lenis = new Lenis({
        autoRaf: false,
        // lerp gives direct, natural feel vs duration which adds artificial lag
        // 0.1 = very responsive; 0.08 still smooth but immediate-feeling
        lerp: prefersReduced ? 1 : 0.1,
        smoothWheel: !prefersReduced,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        // syncTouch: true ensures mobile native-feel
        syncTouch: true,
      } as ConstructorParameters<typeof Lenis>[0])
      window.__lenis = lenis

      lenis.on('scroll', () => {
        window.dispatchEvent(new Event('scroll'))
      })

      const raf = (time: number) => {
        lenis!.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      destroyed = true
      delete window.__lenis
      if (lenis) lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Show persona toggle after scrolling past 80vh
  useEffect(() => {
    const handleScroll = () => {
      setToggleVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSelectPersona = useCallback((p: Persona) => {
    setPersona(p)
    setTimeout(() => setGateVisible(false), 600)
  }, [])

  return (
    <>
      <AnimatePresence>
        {gateVisible && (
          <PersonaGate onSelect={handleSelectPersona} />
        )}
      </AnimatePresence>

      {persona && (
        <>
          <Nav theme={theme} setTheme={setTheme} />
          <main>
            <HeroSection persona={persona} theme={theme} />
            <PainSection />
            <RoleSection persona={persona} />
            <ValueSection />
            <EcosystemSection persona={persona} />
            <BentoSection persona={persona} />
            <PilotSection persona={persona} />
            <AccessSection />
          </main>
          <Footer />
          <PersonaToggle persona={persona} onSelect={setPersona} visible={toggleVisible} />
        </>
      )}
    </>
  )
}
