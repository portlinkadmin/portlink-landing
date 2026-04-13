'use client'

import { motion } from 'framer-motion'
import { Ship, Anchor, Compass } from 'lucide-react'
import type { Persona } from '@/app/page'

const roles = [
  { id: 'cruise' as const, icon: Ship,    title: 'Cruise Line',   desc: 'Fleet-wide coordination' },
  { id: 'agent' as const, icon: Anchor,  title: 'Port Agent',    desc: 'Ground operations hub' },
  { id: 'tour'  as const, icon: Compass, title: 'Tour Operator', desc: 'Real-time bookings' },
]

interface PersonaGateProps {
  onSelect: (persona: Persona) => void
}

export default function PersonaGate({ onSelect }: PersonaGateProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // Safe area + compact padding — always fits one viewport
        paddingTop: 'max(env(safe-area-inset-top, 0px), 20px)',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 20px)',
        paddingLeft: 20,
        paddingRight: 20,
        gap: 0,
        overflow: 'hidden',
      }}
    >
      {/* Logo + tagline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        style={{ textAlign: 'center', marginBottom: 'clamp(16px, 3vh, 32px)' }}
      >
        <img
          src="/portlink-logo.png"
          alt="Portlink"
          className="logo-img"
          style={{ height: '32px', marginBottom: '10px', display: 'block', margin: '0 auto 10px' }}
        />
        <p style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          The port call platform
        </p>
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        style={{
          fontSize: 'clamp(1.15rem, 2.8vw, 1.6rem)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 'clamp(16px, 3vh, 28px)',
          textAlign: 'center',
          margin: '0 0 clamp(16px, 3vh, 28px)',
        }}
      >
        What best describes you?
      </motion.h2>

      {/* Role cards */}
      <div style={{
        display: 'flex',
        gap: 'clamp(10px, 2vw, 20px)',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '780px',
        // On narrow screens: stack vertically; on wide: row
        flexWrap: 'nowrap',
      }}>
        {roles.map((role, i) => {
          const Icon = role.icon
          return (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + i * 0.08 }}
              onClick={() => onSelect(role.id)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                // Compact padding that scales with viewport height
                padding: 'clamp(20px, 3vh, 32px) clamp(16px, 2vw, 28px)',
                cursor: 'pointer',
                flex: '1 1 0',
                minWidth: 0,
                maxWidth: '220px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: 'inherit',
                transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.borderColor = 'var(--brand)'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(26, 94, 107, 0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Icon
                size={28}
                color="var(--brand)"
                style={{ marginBottom: 'clamp(10px, 1.5vh, 16px)', flexShrink: 0 }}
              />
              <span style={{
                fontSize: 'clamp(14px, 1.8vw, 17px)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                display: 'block',
                marginBottom: 4,
                whiteSpace: 'nowrap',
              }}>
                {role.title}
              </span>
              <span style={{
                fontSize: 'clamp(12px, 1.4vw, 13px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.4,
              }}>
                {role.desc}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Skip link */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.55 }}
        onClick={() => onSelect('all')}
        style={{
          marginTop: 'clamp(16px, 2.5vh, 28px)',
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '13px',
          cursor: 'pointer',
          padding: '8px 16px',
          fontFamily: 'inherit',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        View full overview →
      </motion.button>
    </motion.div>
  )
}
