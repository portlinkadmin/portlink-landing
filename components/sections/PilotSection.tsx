'use client'

import { Rocket, DollarSign, Users } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import type { Persona } from '@/app/page'

const pilotCards = [
  {
    icon: Rocket,
    title: 'Early access',
    body: 'Be among the first to use Portlink. Shape the product with direct feedback to our team.',
  },
  {
    icon: DollarSign,
    title: 'Founding pricing',
    body: 'Pilot participants lock in founding-member pricing — permanently. No price increases, ever.',
  },
  {
    icon: Users,
    title: 'White-glove onboarding',
    body: 'Dedicated onboarding support. We help you set up, migrate, and get your team running.',
  },
]

const pilotHeadlines: Record<string, string> = {
  all: 'Join the pilot program',
  cruise: 'Get your fleet on Portlink first',
  agent: 'Modernize your port operations',
  tour: 'List your excursions before anyone else',
}

const pilotDescs: Record<string, string> = {
  all: 'Limited spots available for cruise lines, port agents, and tour operators ready to leave email and spreadsheets behind.',
  cruise: "We're onboarding a select number of cruise lines to our pilot program. Get fleet-wide visibility before your competitors.",
  agent: 'Join a small group of forward-thinking port agents who want to run operations from a modern platform.',
  tour: 'Be the first tour operators on the platform. Get discovered by cruise lines from day one.',
}

export default function PilotSection({ persona }: { persona: Persona }) {
  const sectionRef = useReveal()

  return (
    <section
      ref={sectionRef}
      id="pilot"
      className="section-pad"
      style={{ background: 'var(--ds-canvas)', padding: '120px 24px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <span
          className="reveal"
          style={{
            display: 'inline-block',
            background: 'rgba(31,177,199,0.12)',
            border: '1px solid rgba(31,177,199,0.35)',
            color: 'var(--ds-primary-hover)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderRadius: '9999px',
            padding: '4px 14px',
            fontWeight: 500,
            marginBottom: '20px',
          }}
        >
          Pilot Program · Limited Availability
        </span>

        <h2
          className="reveal"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--ds-text-1)',
            marginBottom: '16px',
          }}
        >
          {pilotHeadlines[persona]}
        </h2>

        <p
          className="reveal"
          style={{
            fontSize: '16px',
            color: 'var(--ds-text-2)',
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: 1.6,
          }}
        >
          {pilotDescs[persona]}
        </p>

        <div
          className="pilot-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          {pilotCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="reveal"
                style={{
                  background: 'var(--ds-surface-2)',
                  border: '1px solid var(--ds-border-1)',
                  borderRadius: '16px',
                  padding: '36px 28px',
                  textAlign: 'left',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ds-primary)'
                  e.currentTarget.style.boxShadow = '0 0 20px var(--ds-focus-ring, rgba(61,125,175,0.15))'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ds-border-1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon size={32} color="var(--ds-accent)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ds-text-1)', marginBottom: '8px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ds-text-2)', lineHeight: 1.6, margin: 0 }}>{card.body}</p>
              </div>
            )
          })}
        </div>

        <a
          href="#access"
          onClick={(e) => {
            e.preventDefault()
            const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: Record<string, unknown>) => void } }).__lenis
            if (lenis) {
              lenis.scrollTo('#access', { duration: 1.8, offset: -80 })
            } else {
              document.getElementById('access')?.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className="reveal"
          style={{
            display: 'inline-block',
            background: 'var(--ds-primary)',
            color: 'var(--ds-primary-ink)',
            padding: '16px 40px',
            borderRadius: '9999px',
            fontWeight: 600,
            fontSize: '16px',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--ds-primary-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--ds-primary)')}
        >
          Request Pilot Access
        </a>
      </div>
    </section>
  )
}
