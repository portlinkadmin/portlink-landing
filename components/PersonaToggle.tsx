'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Ship, Anchor, Compass } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Persona } from '@/app/page'

const options: { id: Exclude<Persona, 'all'>; icon: typeof Ship; label: string; short: string }[] = [
  { id: 'cruise', icon: Ship,    label: 'Cruise Line',   short: 'Cruise' },
  { id: 'agent',  icon: Anchor,  label: 'Port Agent',    short: 'Agent' },
  { id: 'tour',   icon: Compass, label: 'Tour Operator', short: 'Tour' },
]

interface PersonaToggleProps {
  persona: Persona
  onSelect: (p: Persona) => void
  visible: boolean
}

export default function PersonaToggle({ persona, onSelect, visible }: PersonaToggleProps) {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const active = options.find(o => o.id === persona) ?? options[0]
  const ActiveIcon = active.icon

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            bottom: 28,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >

          {/* ── DESKTOP pill ── */}
          {!isMobile && <div
            className="persona-toggle-desktop"
            style={{
              pointerEvents: 'auto',
              background: 'var(--nav-glass)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border)',
              borderRadius: 9999,
              padding: '5px',
              display: 'flex',
              gap: 2,
              boxShadow: '0 8px 40px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset',
            }}
          >
            {options.map((opt) => {
              const Icon = opt.icon
              const isActive = persona === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => onSelect(opt.id)}
                  aria-pressed={isActive}
                  aria-label={opt.label}
                  style={{
                    position: 'relative',
                    borderRadius: 9999,
                    padding: '9px 20px',
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    border: 'none',
                    fontFamily: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    background: 'transparent',
                    color: isActive ? 'white' : 'var(--text-muted)',
                    transition: 'color var(--ds-dur-2) var(--ds-ease-standard)',
                    zIndex: 1,
                    minHeight: 40,
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="persona-active-bg"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 9999,
                        background: 'var(--brand)',
                        zIndex: -1,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                    />
                  )}
                  <Icon size={15} />
                  {opt.label}
                </button>
              )
            })}
          </div>}

          {/* ── MOBILE: collapsed pill + upward dropdown ── */}
          {isMobile && <div
            className="persona-toggle-mobile"
            style={{ pointerEvents: 'auto', position: 'relative' }}
          >
            {/* Tap-outside dismiss overlay */}
            {expanded && (
              <div
                style={{ position: 'fixed', inset: 0, zIndex: -1 }}
                onClick={() => setExpanded(false)}
              />
            )}

            {/* Upward dropdown */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--surface)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    boxShadow: '0 -4px 32px rgba(0,0,0,0.5)',
                    minWidth: 200,
                    zIndex: 10,
                  }}
                >
                  {options.map((opt) => {
                    const Icon = opt.icon
                    const isActive = persona === opt.id
                    return (
                      <button
                        key={opt.id}
                        onClick={() => { onSelect(opt.id); setExpanded(false) }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '11px 16px',
                          borderRadius: 10,
                          border: 'none',
                          background: isActive ? 'var(--brand)' : 'transparent',
                          color: isActive ? 'var(--ds-primary-ink)' : 'var(--text-primary)',
                          fontFamily: 'inherit',
                          fontSize: 14,
                          fontWeight: isActive ? 600 : 400,
                          cursor: 'pointer',
                          textAlign: 'left',
                          width: '100%',
                        }}
                      >
                        <Icon size={16} />
                        {opt.label}
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed pill */}
            <button
              onClick={() => setExpanded(!expanded)}
              aria-label="Switch role"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 9999,
                border: 'none',
                background: 'var(--brand)',
                color: 'var(--ds-primary-ink)',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                whiteSpace: 'nowrap',
              }}
            >
              <ActiveIcon size={15} />
              {active.short}
              <span style={{ fontSize: 10, opacity: 0.75, marginLeft: 2 }}>
                {expanded ? '▴' : '▾'}
              </span>
            </button>
          </div>}

        </motion.div>
      )}
    </AnimatePresence>
  )
}
