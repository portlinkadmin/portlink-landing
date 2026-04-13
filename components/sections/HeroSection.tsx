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
  all: 'Port calls run on emails, spreadsheets, and phone calls. They shouldn\'t have to.',
  cruise: 'Your deployment changes. Your port prep shouldn\'t.',
  agent: 'You enter the same data 15 times. For every cruise line. Every port.',
  tour: 'You find out about the overbooking at the quay.',
}

const subheadlines: Record<Persona, string> = {
  all: 'Portlink connects cruise lines, port agents, and tour operators on a single port call record. Everyone sees the same status. Nobody re-enters the same data.',
  cruise: 'One dashboard for every port call across your deployment. Status, agents, PDA, shore programmes, without chasing anyone.',
  agent: 'Portlink replaces the copy-paste, the conflicting links, and the emails you can\'t find. One workspace per port call, one login with full history.',
  tour: 'Portlink enforces booking deadlines automatically, syncs your tour data once across every cruise line format, and keeps your programme from being edited without your approval.',
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
          Port call coordination
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
