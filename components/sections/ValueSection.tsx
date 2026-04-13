'use client'

import { useReveal } from '@/hooks/useReveal'

const valueCards = [
  {
    title: 'Real-time visibility',
    body: 'Every stakeholder sees the same live status. No more calling to check if something happened.',
  },
  {
    title: 'Single source of truth',
    body: 'One workspace per port call. No conflicting spreadsheets, no outdated email threads.',
  },
  {
    title: 'Mobile-first',
    body: 'Access port call data from anywhere — on the bridge, on the dock, or in the office.',
  },
  {
    title: 'Role-based access',
    body: 'Each stakeholder sees exactly what they need. Sensitive data stays where it belongs.',
  },
  {
    title: 'Operational analytics',
    body: 'Track performance across port calls. Identify bottlenecks. Optimize operations over time.',
  },
  {
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
        background: 'var(--bg)',
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
              color: 'var(--text-muted)',
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
              color: 'var(--text-primary)',
              margin: '12px 0 16px',
            }}
          >
            Built for how port calls actually work
          </h2>
          <p
            className="reveal"
            style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
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
          {valueCards.map((card) => (
            <div
              key={card.title}
              className="reveal"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '28px 24px',
                transition: 'border-color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--text-muted)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
