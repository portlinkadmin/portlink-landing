'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface BentoCardProps {
  title: string
  description: string
  visual?: React.ReactNode
  span?: 'full' | 'half' | 'third' | 'two-thirds'
  accent?: boolean
  delay?: number
}

export function BentoCard({ title, description, visual, span = 'half', accent = false, delay = 0 }: BentoCardProps) {
  const colSpan = {
    full: '1 / -1',
    half: 'span 1',
    third: 'span 1',
    'two-thirds': 'span 2',
  }[span]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        gridColumn: colSpan,
        background: accent ? 'var(--ds-primary)' : 'var(--ds-surface-1)',
        border: `1px solid ${accent ? 'transparent' : 'var(--ds-border-1)'}`,
        borderRadius: '20px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        cursor: 'default',
      }}
      whileHover={{
        boxShadow: accent
          ? '0 8px 32px rgba(61,125,175,0.35)'
          : '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Subtle corner glow for non-accent cards */}
      {!accent && (
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: 120, height: 120,
          background: 'radial-gradient(circle at top right, var(--ds-focus-ring, rgba(61,125,175,0.08)), transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Visual area */}
      {visual && (
        <div style={{
          width: '100%',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '4px',
        }}>
          {visual}
        </div>
      )}

      <div>
        <h3 style={{
          fontSize: '17px',
          fontWeight: 700,
          color: accent ? 'white' : 'var(--ds-text-1)',
          margin: '0 0 8px',
          lineHeight: 1.3,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: accent ? 'rgba(255,255,255,0.8)' : 'var(--ds-text-2)',
          lineHeight: 1.65,
          margin: 0,
        }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}

interface BentoGridProps {
  children: React.ReactNode
  columns?: 2 | 3
}

export function BentoGrid({ children, columns = 2 }: BentoGridProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '16px',
      width: '100%',
    }}>
      {children}
    </div>
  )
}
