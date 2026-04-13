'use client'

import React, { useEffect, useState } from 'react'
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // On mobile: always full width (1 column). Desktop: honour span.
  const colSpan = isMobile ? '1 / -1' : {
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
      transition={{ duration: 0.5, delay: isMobile ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        gridColumn: colSpan,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        cursor: 'default',
      }}
    >
      {/* Visual area */}
      {visual && (
        <div style={{
          width: '100%',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 4,
        }}>
          {visual}
        </div>
      )}

      <div>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          margin: '0 0 8px',
          lineHeight: 1.3,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
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

export function BentoGrid({ children, columns = 3 }: BentoGridProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{
      display: 'grid',
      // Mobile: single column. Tablet: 2 cols. Desktop: full columns.
      gridTemplateColumns: isMobile
        ? '1fr'
        : `repeat(${columns}, 1fr)`,
      gap: '16px',
      width: '100%',
    }}>
      {children}
    </div>
  )
}
