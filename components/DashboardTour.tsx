'use client'

import { MapPin, Bell } from 'lucide-react'

const mono = 'var(--font-mono, "JetBrains Mono", monospace)'

const bookings = [
  { excursion: 'Old Town Walking Tour',  port: 'ESBCN', date: '14 APR', pax: '120/150', status: 'live' },
  { excursion: 'Acropolis & Museum',     port: 'GRPIR', date: '15 APR', pax: '85/100',  status: 'confirmed' },
  { excursion: 'Amalfi Coast Drive',     port: 'ITCVV', date: '14 APR', pax: '40/40',   status: 'full' },
  { excursion: 'Provence Wine Country',  port: 'FRMRS', date: '16 APR', pax: '62/80',   status: 'confirmed' },
  { excursion: 'Historic Docks Tour',    port: 'GBSOU', date: '20 MAR', pax: '0/60',    status: 'pending' },
  { excursion: 'Everglades Airboat',     port: 'USMIA', date: '21 MAR', pax: '0/45',    status: 'pending' },
]

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  'live':      { label: 'BOARDING',   color: '#3FA8A4', bg: 'rgba(45,125,122,0.1)' },
  'confirmed': { label: 'CONFIRMED', color: '#4A7C4E', bg: 'rgba(74,124,78,0.1)' },
  'full':      { label: 'FULL',      color: '#B8844A', bg: 'rgba(184,132,74,0.1)' },
  'pending':   { label: 'PENDING',   color: '#9A8F82', bg: 'rgba(154,143,130,0.08)' },
}

export default function DashboardTour() {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#F5F1EA',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Plus Jakarta Sans","Inter",-apple-system,sans-serif',
      overflow: 'hidden', fontSize: 12,
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: '#FAF7F2', borderBottom: '1px solid #E8E2D8', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#1a5e6b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={14} color="white" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1613' }}>Portlink</span>
          <span style={{ fontSize: 10, color: '#9A8F82', marginLeft: 4, fontFamily: mono }}>/ Tour Operator</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: '#F5F1EA', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={13} color="#9A8F82" />
          </div>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E8E2D8' }} />
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden', minHeight: 0 }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Active excursions', value: '12', accent: true },
            { label: 'Bookings this week', value: '307', accent: false },
            { label: 'Ports covered', value: '18', accent: false },
          ].map((s, i) => (
            <div key={i} style={{
              background: s.accent ? '#1a5e6b' : '#FAF7F2',
              border: s.accent ? 'none' : '1px solid #E8E2D8',
              borderRadius: 10, padding: '12px 14px',
            }}>
              <div style={{ fontSize: 10, color: s.accent ? 'rgba(255,255,255,0.7)' : '#9A8F82', marginBottom: 6, fontWeight: 500 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.accent ? '#fff' : '#1A1613', fontFamily: mono }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Bookings table */}
        <div style={{ background: '#FAF7F2', border: '1px solid #E8E2D8', borderRadius: 10, overflow: 'hidden', flex: 1 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '2.5fr 0.8fr 0.8fr 0.8fr 1fr',
            padding: '8px 14px', borderBottom: '1px solid #E8E2D8',
            fontSize: 10, fontWeight: 600, color: '#9A8F82', textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            <span>Excursion</span><span>Port</span><span>Date</span><span>Pax</span><span>Status</span>
          </div>
          {bookings.map((b, i) => {
            const s = statusConfig[b.status]
            const isLive = b.status === 'live'
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '2.5fr 0.8fr 0.8fr 0.8fr 1fr',
                padding: '7px 14px', alignItems: 'center',
                borderBottom: i < bookings.length - 1 ? '1px solid rgba(232,226,216,0.5)' : 'none',
                background: isLive ? 'rgba(45,125,122,0.04)' : i % 2 === 0 ? '#FAF7F2' : '#F5F1EA',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {isLive && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3FA8A4', animation: 'pulse-live 2s ease-in-out infinite', flexShrink: 0 }} />}
                  <span style={{ fontSize: 11, fontWeight: 500, color: '#1A1613' }}>{b.excursion}</span>
                </div>
                <span style={{ fontSize: 11, fontFamily: mono, color: '#6B6259' }}>{b.port}</span>
                <span style={{ fontSize: 11, fontFamily: mono, color: '#6B6259' }}>{b.date}</span>
                <span style={{ fontSize: 11, fontFamily: mono, color: '#6B6259' }}>{b.pax}</span>
                <span style={{ fontSize: 9, fontWeight: 600, fontFamily: mono, color: s.color, background: s.bg, padding: '2px 6px', borderRadius: 4, display: 'inline-block', letterSpacing: '0.03em' }}>
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
