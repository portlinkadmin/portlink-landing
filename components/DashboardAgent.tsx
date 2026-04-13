'use client'

import { Anchor, Bell } from 'lucide-react'

const mono = 'var(--font-mono, "JetBrains Mono", monospace)'

const arrivals = [
  { vessel: 'MSC GRANDIOSA',   eta: '08:00', berth: 'B-12', services: 3, status: 'live' },
  { vessel: 'COSTA FORTUNA',   eta: '14:30', berth: 'A-04', services: 5, status: 'preparing' },
  { vessel: 'CELEBRITY EDGE',  eta: 'TMR 07:00', berth: 'C-08', services: 2, status: 'confirmed' },
  { vessel: 'NORWEGIAN BLISS', eta: 'TMR 11:00', berth: 'B-06', services: 4, status: 'confirmed' },
  { vessel: 'QUEEN MARY 2',    eta: '20 MAR',   berth: 'A-01', services: 6, status: 'pending' },
  { vessel: 'HARMONY OF SEAS', eta: '21 MAR',   berth: 'B-14', services: 3, status: 'pending' },
]

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  'live':      { label: 'IN PORT',    color: '#3FA8A4', bg: 'rgba(45,125,122,0.1)' },
  'preparing': { label: 'PREPARING',  color: '#B8844A', bg: 'rgba(184,132,74,0.1)' },
  'confirmed': { label: 'CONFIRMED',  color: '#4A7C4E', bg: 'rgba(74,124,78,0.1)' },
  'pending':   { label: 'PENDING',    color: '#9A8F82', bg: 'rgba(154,143,130,0.08)' },
}

export default function DashboardAgent() {
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
            <Anchor size={14} color="white" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1613' }}>Portlink</span>
          <span style={{ fontSize: 10, color: '#9A8F82', marginLeft: 4, fontFamily: mono }}>/ Port Agent</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: '#F5F1EA', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={13} color="#9A8F82" />
          </div>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E8E2D8' }} />
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden', minHeight: 0 }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Today\'s arrivals', value: '6', accent: true },
            { label: 'Services pending', value: '14', accent: false },
            { label: 'Turnarounds', value: '3', accent: false },
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

        {/* Arrivals table */}
        <div style={{ background: '#FAF7F2', border: '1px solid #E8E2D8', borderRadius: 10, overflow: 'hidden', flex: 1 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1.2fr',
            padding: '8px 14px', borderBottom: '1px solid #E8E2D8',
            fontSize: 10, fontWeight: 600, color: '#9A8F82', textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            <span>Vessel</span><span>ETA</span><span>Berth</span><span>Services</span><span>Status</span>
          </div>
          {arrivals.map((v, i) => {
            const s = statusConfig[v.status]
            const isLive = v.status === 'live'
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1.2fr',
                padding: '7px 14px', alignItems: 'center',
                borderBottom: i < arrivals.length - 1 ? '1px solid rgba(232,226,216,0.5)' : 'none',
                background: isLive ? 'rgba(45,125,122,0.04)' : i % 2 === 0 ? '#FAF7F2' : '#F5F1EA',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {isLive && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3FA8A4', animation: 'pulse-live 2s ease-in-out infinite', flexShrink: 0 }} />}
                  <span style={{ fontSize: 11, fontFamily: mono, fontWeight: 500, color: '#1A1613' }}>{v.vessel}</span>
                </div>
                <span style={{ fontSize: 11, fontFamily: mono, color: '#6B6259' }}>{v.eta}</span>
                <span style={{ fontSize: 11, fontFamily: mono, color: '#6B6259' }}>{v.berth}</span>
                <span style={{ fontSize: 11, fontFamily: mono, color: '#6B6259' }}>{v.services}</span>
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
