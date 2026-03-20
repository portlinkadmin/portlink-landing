'use client'

import { motion } from 'framer-motion'
import WavesHero from '@/components/WavesHero'
import type { Persona } from '@/app/page'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const headlines: Record<Persona, string> = {
  all: 'One platform for every port call',
  cruise: 'Your fleet. Every port. One platform.',
  agent: 'Every vessel arrival. Fully organized.',
  tour: 'List once. Coordinate automatically.',
}

const subheadlines: Record<Persona, string> = {
  all: 'Cruise lines, port agents, and tour operators — finally connected in one shared workspace.',
  cruise: 'Real-time visibility across every port call, every stakeholder, every change.',
  agent: 'Manage vessel arrivals, services, and shore excursions from one hub.',
  tour: 'Your excursions listed, booked, and coordinated — without the email chaos.',
}

type HeroSectionProps = {
  persona: Persona
  theme: 'light' | 'dark'
}

export default function HeroSection({ persona, theme }: HeroSectionProps) {
  const eyebrowTextColor = 'var(--ds-primary)'
  const eyebrowBg = 'var(--ds-accent-subtle)'

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <WavesHero />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          padding: '24px',
          maxWidth: '900px',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow pill */}
        <motion.span
          variants={itemVariants}
          style={{
            background: eyebrowBg,
            color: eyebrowTextColor,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderRadius: '9999px',
            padding: '4px 14px',
            fontWeight: 600,
            border: '1px solid var(--ds-primary)',
          }}
        >
          The Port Call Platform
        </motion.span>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 700,
            color: 'var(--ds-text-1)',
            lineHeight: 1.1,
            maxWidth: '800px',
          }}
        >
          {headlines[persona]}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: 'var(--ds-text-2)',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          {subheadlines[persona]}
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a
            href="#access"
            onClick={(e) => {
              e.preventDefault()
              const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: Record<string, unknown>) => void } }).__lenis
              if (lenis) {
                lenis.scrollTo('#access', { duration: 0.8, offset: -80 })
              } else {
                document.getElementById('access')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            style={{
              background: 'var(--ds-primary)',
              color: 'var(--ds-primary-ink)',
              padding: '12px 28px',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--ds-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--ds-primary)')}
          >
            Request Pilot Access
          </a>
          <a
            href="#how"
            onClick={(e) => {
              e.preventDefault()
              const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: Record<string, unknown>) => void } }).__lenis
              if (lenis) {
                lenis.scrollTo('#how', { duration: 0.8, offset: -80 })
              } else {
                document.getElementById('how')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            style={{
              border: '1px solid var(--ds-border-2)',
              color: 'var(--ds-primary)',
              padding: '12px 28px',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              background: 'transparent',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--ds-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--ds-border-2)'
            }}
          >
            See How It Works
          </a>
        </motion.div>

        {/* Theme hint (kept invisible for layout stability) */}
        <span style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>{theme}</span>
      </motion.div>
    </section>
  )
}
