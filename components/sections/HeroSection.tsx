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
        contain: 'layout style',
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
            background: 'var(--surface)',
            color: 'var(--text-secondary)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderRadius: '9999px',
            padding: '4px 14px',
            fontWeight: 600,
            border: '1px solid var(--border)',
          }}
        >
          The Port Call Platform
        </motion.span>

        {/* H1 — 2x size, tight tracking */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
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
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          {subheadlines[persona]}
        </motion.p>

        {/* CTA row — brand color */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a
            href="#access"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('access')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              background: 'var(--brand)',
              color: '#ffffff',
              padding: '12px 28px',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--brand-bright)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--brand)')}
          >
            Request Pilot Access
          </a>
          <a
            href="#how"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '12px 28px',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              background: 'transparent',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
          >
            See How It Works
          </a>
        </motion.div>

        {/* Hidden theme span for layout stability */}
        <span style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>{theme}</span>
      </motion.div>
    </section>
  )
}
