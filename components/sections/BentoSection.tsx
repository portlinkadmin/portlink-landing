'use client'

import { motion } from 'framer-motion'
import { BentoGrid, BentoCard } from '@/components/BentoGrid'
import { Globe, CheckCircle2, FileText, Map, Inbox, Shield, Calendar, FileBarChart, Anchor } from 'lucide-react'
import type { Persona } from '@/app/page'

// ── Abstract mini-visuals ─────────────────────────────────────────────────────

function StatusFlow() {
  const steps = ['Pending', 'Reviewing', 'Confirmed']
  const colors = ['var(--text-muted)', 'var(--text-secondary)', 'var(--success)']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{
            padding: '4px 8px',
            borderRadius: 9999,
            background: i === 2 ? 'rgba(74,124,78,0.1)' : 'var(--bg)',
            border: `1px solid ${colors[i]}`,
            fontSize: 11,
            fontWeight: 600,
            color: colors[i],
          }}>
            {s}
          </div>
          {i < 2 && <div style={{ width: 12, height: 1, background: 'var(--border)', flexShrink: 0 }} />}
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
            background: i === 2 ? 'var(--brand)' : 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 4,
          }} />
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 600 }}>{p}</span>
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
        <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 8px', background: 'var(--surface)', borderRadius: 6, fontSize: 11 }}>
          <span style={{ color: 'var(--text-muted)' }}>{item.l}</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.v}</span>
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
          padding: '4px 8px', background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: 6,
          fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'center',
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
          background: i === 0 ? 'var(--brand-faint)' : 'var(--surface)',
          border: `1px solid ${i === 0 ? 'var(--brand)' : 'var(--border)'}`,
          fontSize: 11, color: 'var(--text-secondary)',
        }}>
          <Anchor size={10} color="var(--brand)" style={{ flexShrink: 0 }} />
          {item}
        </div>
      ))}
    </div>
  )
}

function DocumentCard() {
  return (
    <div style={{
      background: 'var(--bg)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '8px 12px', width: '100%', maxWidth: 200,
    }}>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>PDA Draft</div>
      {['Port dues', 'Pilotage', 'Agency fee', 'Total'].map((l, i) => (
        <div key={l} style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '2px 0',
          borderTop: i === 3 ? '1px solid var(--border)' : 'none',
          marginTop: i === 3 ? 4 : 0,
          fontSize: 11,
          color: i === 3 ? 'var(--text-primary)' : 'var(--text-muted)',
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
              background: i === 1 ? 'var(--brand)' : 'var(--surface)',
              border: `1px solid ${i === 1 ? 'transparent' : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 4px',
            }}>
              <Anchor size={14} color={i === 1 ? 'white' : 'var(--text-muted)'} />
            </div>
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}</span>
          </div>
          {i < 2 && <div style={{ width: 20, height: 1, background: 'var(--brand)', opacity: 0.5 }} />}
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
          padding: '5px 10px', background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: 8,
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-primary)', fontWeight: 500 }}>{v.name}</span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{v.eta}</span>
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
          background: active.includes(i) ? 'var(--brand-faint)' : 'var(--surface)',
          border: `1px solid ${active.includes(i) ? 'var(--brand)' : 'var(--border)'}`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
        }}>
          <span style={{ fontSize: 9, color: active.includes(i) ? 'var(--brand)' : 'var(--text-muted)', fontWeight: 600 }}>{d}</span>
          {active.includes(i) && <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--brand)' }} />}
        </div>
      ))}
    </div>
  )
}

function ShoreRequestCard() {
  return (
    <div style={{
      background: 'var(--bg)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '8px 12px', maxWidth: 220,
    }}>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Shore Request</div>
      {[['Port', 'Barcelona'], ['Pax', '3,200'], ['Date', 'Apr 14']].map(([l, v]) => (
        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '2px 0' }}>
          <span style={{ color: 'var(--text-muted)' }}>{l}</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{v}</span>
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
          <CheckCircle2 size={14} color={i < 2 ? '#22c55e' : 'var(--border)'} />
          <span style={{ fontSize: 12, color: i < 2 ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: i < 2 ? 500 : 400 }}>{s}</span>
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
      description: 'Every port call, every deployment, one live view. Not a spreadsheet you update by hand.',
      visual: <FleetTimeline />,
      span: 'two-thirds',
    },
    {
      title: 'From Request to Confirmed',
      description: 'Berth request sent. Agent confirmed. Documented in the same place, without an email thread.',
      visual: <StatusFlow />,
      accent: true,
    },
    {
      title: 'PDA Control at Scale',
      description: 'PDAs submitted in a standard format. You review once. No chasing agents for attachments.',
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
      description: 'Every inbound call from every cruise line in one place. Not separate portal logins.',
      visual: <NotificationStream />,
      span: 'two-thirds',
    },
    {
      title: 'Digital PDA Workflow',
      description: 'Build the pro-forma, submit it, track the gap to final, in one workflow, without the spreadsheet.',
      visual: <DocumentCard />,
      accent: true,
    },
    {
      title: 'Your Network, Protected',
      description: 'Portlink surfaces your relationships. Cruise lines connect with you directly, not around you.',
      visual: <NetworkDiagram />,
    },
    {
      title: 'Port Call Timeline',
      description: 'Vessel status, documents, and open tasks on a single timeline. The captain sees it. You see it. Everybody sees it.',
      visual: <VesselList />,
      span: 'two-thirds',
    },
  ],
  tour: [
    {
      title: 'Demand You Can Plan Around',
      description: 'Confirmed calls, months out. Plan staffing and pricing before the season starts.',
      visual: <CalendarView />,
      span: 'two-thirds',
    },
    {
      title: 'Structured Shore Requests',
      description: "Every brief arrives in the same format. You respond once. It's on the record.",
      visual: <ShoreRequestCard />,
      accent: true,
    },
    {
      title: 'Known and Trusted',
      description: 'Your profile and track record travel with every port call request, no cold introductions.',
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
    <section style={{ background: 'var(--bg)', padding: '80px 24px' }}>
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
            color: 'var(--text-muted)', fontWeight: 600,
          }}>
            Platform features
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
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
