'use client'

import { Eye, Pin, Smartphone, Lock, BarChart2, MessageSquare } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const valueCards = [
  {
    icon: Eye,
    title: 'Real-time visibility',
    body: 'Every stakeholder sees the same live status. No more calling to check if something happened.',
  },
  {
    icon: Pin,
    title: 'Single source of truth',
    body: 'One workspace per port call. No conflicting spreadsheets, no outdated email threads.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-first',
    body: 'Access port call data from anywhere — on the bridge, on the dock, or in the office.',
  },
  {
    icon: Lock,
    title: 'Role-based access',
    body: 'Each stakeholder sees exactly what they need. Sensitive data stays where it belongs.',
  },
  {
    icon: BarChart2,
    title: 'Operational analytics',
    body: 'Track performance across port calls. Identify bottlenecks. Optimize operations over time.',
  },
  {
    icon: MessageSquare,
    title: 'Structured communication',
    body: 'Contextual messaging tied to port calls — not buried in generic email inboxes.',
  },
]

export default function ValueSection() {
  const sectionRef = useReveal()

  return (
    <section
      ref={sectionRef}
      id="how"
      className="section-pad"
      style={{
        background: 'linear-gradient(180deg, var(--ds-surface-1) 0%, var(--ds-surface-2) 50%, var(--ds-surface-1) 100%)',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(31,177,199,0.06) 0%, transparent 70%)',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span
            className="reveal"
            style={{
              display: 'inline-block',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--ds-primary-hover)',
              fontWeight: 500,
            }}
          >
            The Platform
          </span>
          <h2
            className="reveal"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--ds-text-1)',
              margin: '12px 0 16px',
            }}
          >
            Built for how port calls actually work
          </h2>
          <p
            className="reveal"
            style={{ fontSize: '16px', color: 'var(--ds-text-2)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
          >
            Not another generic tool. Portlink is purpose-built for the maritime coordination challenge.
          </p>
        </div>

        <div
          className="value-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
        >
          {valueCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="reveal"
                style={{
                  background: 'var(--ds-surface-2)',
                  border: '1px solid var(--ds-border-1)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ds-primary)'
                  e.currentTarget.style.boxShadow = '0 0 20px var(--ds-focus-ring, rgba(43,184,148,0.15))'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ds-border-1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon size={24} color="var(--ds-accent)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ds-text-1)', marginBottom: '8px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ds-text-2)', lineHeight: 1.6, margin: 0 }}>{card.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
