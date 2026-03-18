'use client'

import { Mail, Table, Phone, Clock, EyeOff, TrendingDown } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const painCards = [
  {
    icon: Mail,
    title: 'Email overload',
    body: "Critical updates buried in email threads. Version control through 'Final_v3_REAL.xlsx' attachments.",
  },
  {
    icon: Table,
    title: 'Spreadsheet chaos',
    body: 'Multiple conflicting spreadsheets for the same port call. Nobody knows which version is current.',
  },
  {
    icon: Phone,
    title: 'Phone tag',
    body: 'Last-minute changes communicated by phone. No paper trail, no confirmation, no accountability.',
  },
  {
    icon: Clock,
    title: 'Time zone friction',
    body: 'Coordinating across time zones means waiting hours for confirmations that should be instant.',
  },
  {
    icon: EyeOff,
    title: 'Zero visibility',
    body: "Ship operators can't see ground preparations. Agents can't see schedule changes. Tour operators fly blind.",
  },
  {
    icon: TrendingDown,
    title: 'Costly errors',
    body: "Missed bookings, wrong passenger counts, delayed services. All because information didn't flow.",
  },
]

export default function PainSection() {
  const sectionRef = useReveal()

  return (
    <section
      ref={sectionRef}
      id="pain"
      className="section-pad"
      style={{
        background: 'var(--ds-surface-1)',
        padding: '120px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
            The Problem
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
            Port calls run on chaos
          </h2>
          <p
            className="reveal"
            style={{ fontSize: '16px', color: 'var(--ds-text-2)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
          >
            Every port call involves 17+ stakeholders, hundreds of emails, and a web of spreadsheets.
            The result? Delays, errors, and zero visibility.
          </p>
        </div>

        <div
          className="pain-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
        >
          {painCards.map((card) => {
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
                  e.currentTarget.style.borderColor = 'var(--ds-accent)'
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(34,211,238,0.12)'
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
