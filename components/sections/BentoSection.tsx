'use client'

import { motion } from 'framer-motion'
import { BentoGrid, BentoCard } from '@/components/BentoGrid'
import { Globe, CheckCircle2, FileText, Map, Inbox, Shield, Calendar, FileBarChart, Anchor } from 'lucide-react'
import type { Persona } from '@/app/page'

// ── Abstract mini-visuals ─────────────────────────────────────────────────────

function StatusFlow() {
  const steps = ['Pending', 'Reviewing', 'Confirmed']
  const colors = ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.85)', '#22c55e']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{
            padding: '4px 8px',
            borderRadius: 9999,
            background: i === 2 ? 'rgba(34,197,94,0.15)' : i === 1 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
            border: `1px solid ${colors[i]}`,
            fontSize: 11,
            fontWeight: 600,
            color: colors[i],
          }}>
            {s}
          </div>
          {i < 2 && <div style={{ width: 12, height: 1, background: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />}
        </div>
      ))}
    </div>
  )
}

function FleetTimeline() {
  const ports = ['MIA', 'BCN', 'PIR', 'DUB', 'SOU']
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 48, flexWrap: 'nowrap', maxWidth: '100%' }}>
      {ports.map((p, i) => (
        <div key={p} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flex: '1 1 0', minWidth: 0 }}>
          <div style={{
            width: '100%', maxWidth: 28, height: `${22 + i * 4}px`,
            background: i === 2 ? 'var(--ds-primary)' : 'var(--ds-surface-2)',
            border: '1px solid var(--ds-border-1)',
            borderRadius: 4,
          }} />
          <span style={{ fontSize: 9, color: 'var(--ds-text-3)', fontWeight: 600 }}>{p}</span>
        </div>
      ))}
    </div>
  )
}

function CostCard() {
  const items = [{ l: 'Port dues', v: '€4,200' }, { l: 'Pilotage', v: '€1,800' }, { l: 'Mooring', v: '€950' }]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 200 }}>
      {items.map(item => (
        <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 8px', background: 'var(--ds-surface-2)', borderRadius: 6, fontSize: 11 }}>
          <span style={{ color: 'var(--ds-text-3)' }}>{item.l}</span>
          <span style={{ color: 'var(--ds-text-1)', fontWeight: 600 }}>{item.v}</span>
        </div>
      ))}
    </div>
  )
}

function PortGrid() {
  const ports = ['Barcelona', 'Miami', 'Piraeus', 'Dublin']
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
      {ports.map(p => (
        <div key={p} style={{
          padding: '4px 8px', background: 'var(--ds-surface-2)',
          border: '1px solid var(--ds-border-1)', borderRadius: 6,
          fontSize: 11, color: 'var(--ds-text-2)', fontWeight: 500, textAlign: 'center',
        }}>{p}</div>
      ))}
    </div>
  )
}

function NotificationStream() {
  const items = ['MSC Grandiosa — Piraeus', 'Costa Fortuna — Bari', 'Celebrity Edge — Mykonos']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {items.map((item, i) => (
        <div key={item} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '4px 10px', borderRadius: 8,
          background: i === 0 ? 'rgba(61,125,175,0.12)' : 'var(--ds-surface-2)',
          border: `1px solid ${i === 0 ? 'var(--ds-primary)' : 'var(--ds-border-1)'}`,
          fontSize: 11, color: 'var(--ds-text-2)',
        }}>
          <Anchor size={10} color="var(--ds-primary)" style={{ flexShrink: 0 }} />
          {item}
        </div>
      ))}
    </div>
  )
}

function DocumentCard() {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 10, padding: '8px 12px', width: '100%', maxWidth: 200,
    }}>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>PDA Draft</div>
      {['Port dues', 'Pilotage', 'Agency fee', 'Total'].map((l, i) => (
        <div key={l} style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '2px 0',
          borderTop: i === 3 ? '1px solid rgba(255,255,255,0.15)' : 'none',
          marginTop: i === 3 ? 4 : 0,
          fontSize: 11,
          color: i === 3 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)',
          fontWeight: i === 3 ? 600 : 400,
        }}>
          <span>{l}</span>
          <span>€{[4200, 1800, 650, 6650][i].toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

function NetworkDiagram() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {['Cruise Line', 'Portlink', 'You'].map((label, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: i === 1 ? 'var(--ds-primary)' : 'var(--ds-surface-2)',
              border: `1px solid ${i === 1 ? 'transparent' : 'var(--ds-border-1)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 4px',
            }}>
              <Anchor size={14} color={i === 1 ? 'white' : 'var(--ds-text-3)'} />
            </div>
            <span style={{ fontSize: 10, color: 'var(--ds-text-3)' }}>{label}</span>
          </div>
          {i < 2 && <div style={{ width: 20, height: 1, background: 'var(--ds-primary)', opacity: 0.5 }} />}
        </div>
      ))}
    </div>
  )
}

function VesselList() {
  const vessels = [{ name: 'MSC Grandiosa', eta: 'Today 08:00' }, { name: 'Costa Fortuna', eta: 'Tomorrow 14:00' }]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {vessels.map(v => (
        <div key={v.name} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '5px 10px', background: 'var(--ds-surface-2)',
          border: '1px solid var(--ds-border-1)', borderRadius: 8,
        }}>
          <span style={{ fontSize: 11, color: 'var(--ds-text-1)', fontWeight: 500 }}>{v.name}</span>
          <span style={{ fontSize: 10, color: 'var(--ds-text-3)' }}>{v.eta}</span>
        </div>
      ))}
    </div>
  )
}

function CalendarView() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const active = [1, 3, 5]
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {days.map((d, i) => (
        <div key={i} style={{
          width: 28, height: 36, borderRadius: 6,
          background: active.includes(i) ? 'rgba(61,125,175,0.15)' : 'var(--ds-surface-2)',
          border: `1px solid ${active.includes(i) ? 'var(--ds-primary)' : 'var(--ds-border-1)'}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
        }}>
          <span style={{ fontSize: 9, color: active.includes(i) ? 'var(--ds-primary)' : 'var(--ds-text-3)', fontWeight: 600 }}>{d}</span>
          {active.includes(i) && <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--ds-primary)' }} />}
        </div>
      ))}
    </div>
  )
}

function ShoreRequestCard() {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 10, padding: '8px 12px', maxWidth: 220,
    }}>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Shore Request</div>
      {[['Port', 'Barcelona'], ['Pax', '3,200'], ['Date', 'Apr 14']].map(([l, v]) => (
        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '2px 0' }}>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>{l}</span>
          <span style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 600 }}>{v}</span>
        </div>
      ))}
    </div>
  )
}

function AuditTrail() {
  const steps = ['Requested', 'Confirmed', 'Delivered']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle2 size={14} color={i < 2 ? '#22c55e' : 'var(--ds-border-1)'} />
          <span style={{ fontSize: 12, color: i < 2 ? 'var(--ds-text-1)' : 'var(--ds-text-3)', fontWeight: i < 2 ? 500 : 400 }}>{s}</span>
        </div>
      ))}
    </div>
  )
}

// ── Per-persona card data ─────────────────────────────────────────────────────

type BentoItem = {
  title: string
  description: string
  visual: React.ReactNode
  span?: 'full' | 'half' | 'third' | 'two-thirds'
  accent?: boolean
}

const bentoData: Record<string, BentoItem[]> = {
  cruise: [
    {
      title: 'Full Fleet Visibility',
      description: 'See every port call across your entire deployment schedule in one live view.',
      visual: <FleetTimeline />,
      span: 'two-thirds',
    },
    {
      title: 'From Request to Confirmed',
      description: 'Send port booking requests and receive structured confirmations — no email chains.',
      visual: <StatusFlow />,
      accent: true,
    },
    {
      title: 'PDA Control at Scale',
      description: 'Review and approve Proforma Disbursement Accounts from all ports in a standardised format.',
      visual: <CostCard />,
    },
    {
      title: 'Shore Programme Oversight',
      description: 'Monitor approved tour operators and shore excursion offerings per port, per season.',
      visual: <PortGrid />,
      span: 'two-thirds',
    },
  ],
  agent: [
    {
      title: 'All Calls, One Inbox',
      description: 'Receive and manage port booking requests from multiple cruise lines in a single workspace.',
      visual: <NotificationStream />,
      span: 'two-thirds',
    },
    {
      title: 'Digital PDA Workflow',
      description: 'Build, submit, and track Proforma Disbursement Accounts without spreadsheets or email.',
      visual: <DocumentCard />,
      accent: true,
    },
    {
      title: 'Your Network, Protected',
      description: 'Portlink surfaces your relationships — cruise lines connect with you directly, not around you.',
      visual: <NetworkDiagram />,
    },
    {
      title: 'Port Call Timeline',
      description: 'Stay on top of every arriving vessel with structured schedules, documents, and status updates.',
      visual: <VesselList />,
      span: 'two-thirds',
    },
  ],
  tour: [
    {
      title: 'Demand You Can Plan Around',
      description: 'See confirmed port calls early enough to prepare capacity, staffing, and pricing.',
      visual: <CalendarView />,
      span: 'two-thirds',
    },
    {
      title: 'Structured Shore Requests',
      description: 'Receive and respond to shore excursion briefs in a consistent format — not scattered emails.',
      visual: <ShoreRequestCard />,
      accent: true,
    },
    {
      title: 'Known and Trusted',
      description: 'Your profile and track record travel with every port call request — no cold introductions.',
      visual: <NetworkDiagram />,
    },
    {
      title: 'Booking Confirmation Trail',
      description: 'Every agreed programme is documented, confirmed, and retrievable for you and the agent.',
      visual: <AuditTrail />,
      span: 'two-thirds',
    },
  ],
}

// ── Section ───────────────────────────────────────────────────────────────────

interface BentoSectionProps {
  persona: Persona
}

export default function BentoSection({ persona }: BentoSectionProps) {
  if (persona === 'all') return null

  const cards = bentoData[persona as string]
  if (!cards) return null

  return (
    <section style={{ background: 'var(--ds-canvas)', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <span style={{
            fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em',
            color: 'var(--ds-primary-hover)', fontWeight: 600,
          }}>
            Platform features
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--ds-text-1)',
            margin: '12px 0 0',
          }}>
            Built for your workflow
          </h2>
        </motion.div>

        <BentoGrid columns={3}>
          {cards.map((card, i) => (
            <BentoCard
              key={card.title}
              title={card.title}
              description={card.description}
              visual={card.visual}
              span={card.span}
              accent={card.accent}
              delay={i * 0.08}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
