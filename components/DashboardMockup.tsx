'use client'

import { Anchor, Bell, ChevronDown, Search } from 'lucide-react'

const mono = 'var(--font-mono, "JetBrains Mono", monospace)'

const vessels = [
  { name: 'MV NORDIC STAR',   port: 'NLRTM', eta: '14:32 UTC', status: 'live',     pax: '3,842' },
  { name: 'MSC GRANDIOSA',    port: 'ESBCN', eta: '08:00 UTC', status: 'live',     pax: '5,686' },
  { name: 'COSTA FORTUNA',    port: 'ITCVV', eta: '14:30 UTC', status: 'delayed',  pax: '2,720' },
  { name: 'CELEBRITY EDGE',   port: 'GRPIR', eta: '07:00 UTC', status: 'on-time',  pax: '2,908' },
  { name: 'NORWEGIAN BLISS',  port: 'FRMRS', eta: '11:00 UTC', status: 'on-time',  pax: '4,004' },
  { name: 'QUEEN MARY 2',     port: 'GBSOU', eta: '09:00 UTC', status: 'pending',  pax: '2,691' },
  { name: 'HARMONY OF SEAS',  port: 'USMIA', eta: '06:30 UTC', status: 'on-time',  pax: '5,479' },
  { name: 'MEIN SCHIFF 3',    port: 'DEHAM', eta: '16:00 UTC', status: 'pending',  pax: '2,506' },
]

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  'live':     { label: 'IN PORT',     color: 'var(--accent-bright, #3FA8A4)', bg: 'rgba(45, 125, 122, 0.1)' },
  'on-time':  { label: 'ON TIME',     color: 'var(--success, #4A7C4E)',       bg: 'rgba(74, 124, 78, 0.1)' },
  'delayed':  { label: 'DELAYED +2h', color: 'var(--warning, #B8844A)',       bg: 'rgba(184, 132, 74, 0.1)' },
  'pending':  { label: 'PENDING',     color: '#9A8F82',                       bg: 'rgba(154, 143, 130, 0.08)' },
}

function TopBar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 16px', background: '#FAF7F2', borderBottom: '1px solid #E8E2D8', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: '#1a5e6b',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Anchor size={14} color="white" />
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1613' }}>Portlink</span>
      </div>
      <div style={{
        flex: 1, maxWidth: 280,
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#F5F1EA', border: '1px solid #E8E2D8', borderRadius: 8, padding: '5px 10px',
      }}>
        <Search size={12} color="#9A8F82" />
        <span style={{ fontSize: 11, color: '#9A8F82' }}>Search vessels, ports...</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, background: '#F5F1EA', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={13} color="#9A8F82" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E8E2D8' }} />
          <ChevronDown size={12} color="#9A8F82" />
        </div>
      </div>
    </div>
  )
}

function StatCards() {
  const stats = [
    { label: 'Active port calls', value: '24', sub: '+3 today', accent: true },
    { label: 'Vessels confirmed', value: '18', sub: '75% of total', accent: false },
    { label: 'Pending approval', value: '4', sub: '↑ 2 from yesterday', accent: false },
    { label: 'Ports this week', value: '11', sub: 'Across 8 regions', accent: false },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: s.accent ? '#1a5e6b' : '#FAF7F2',
          border: s.accent ? 'none' : '1px solid #E8E2D8',
          borderRadius: 10, padding: '12px 14px',
        }}>
          <div style={{ fontSize: 10, color: s.accent ? 'rgba(255,255,255,0.7)' : '#9A8F82', marginBottom: 6, fontWeight: 500 }}>
            {s.label}
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: s.accent ? '#ffffff' : '#1A1613', fontFamily: mono, letterSpacing: '-0.02em' }}>
            {s.value}
          </div>
          <div style={{ fontSize: 10, color: s.accent ? 'rgba(255,255,255,0.5)' : '#9A8F82', marginTop: 4 }}>
            {s.sub}
          </div>
        </div>
      ))}
    </div>
  )
}

function PortCallTable() {
  return (
    <div style={{ background: '#FAF7F2', border: '1px solid #E8E2D8', borderRadius: 10, overflow: 'hidden', flex: 1 }}>
      {/* Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 0.8fr 1.2fr',
        padding: '8px 14px', borderBottom: '1px solid #E8E2D8',
        fontSize: 10, fontWeight: 600, color: '#9A8F82', textTransform: 'uppercase', letterSpacing: '0.05em',
      }}>
        <span>Vessel</span>
        <span>Port</span>
        <span>ETA</span>
        <span>Pax</span>
        <span>Status</span>
      </div>
      {/* Rows */}
      {vessels.map((v, i) => {
        const s = statusConfig[v.status]
        const isLive = v.status === 'live'
        return (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 0.8fr 1.2fr',
            padding: '7px 14px', alignItems: 'center',
            borderBottom: i < vessels.length - 1 ? '1px solid rgba(232,226,216,0.5)' : 'none',
            background: isLive ? 'rgba(45, 125, 122, 0.04)' : i % 2 === 0 ? '#FAF7F2' : '#F5F1EA',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {isLive && (
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--accent-bright, #3FA8A4)',
                  animation: 'pulse-live 2s ease-in-out infinite',
                  flexShrink: 0,
                }} />
              )}
              <span style={{ fontSize: 11, fontFamily: mono, fontWeight: 500, color: '#1A1613' }}>{v.name}</span>
            </div>
            <span style={{ fontSize: 11, fontFamily: mono, color: '#6B6259' }}>{v.port}</span>
            <span style={{ fontSize: 11, fontFamily: mono, color: '#6B6259' }}>{v.eta}</span>
            <span style={{ fontSize: 11, fontFamily: mono, color: '#6B6259' }}>{v.pax}</span>
            <span style={{
              fontSize: 9, fontWeight: 600, fontFamily: mono,
              color: s.color, background: s.bg,
              padding: '2px 6px', borderRadius: 4, display: 'inline-block',
              letterSpacing: '0.03em',
            }}>
              {s.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function SidePanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 180, flexShrink: 0 }}>
      {/* Activity chart */}
      <div style={{ background: '#FAF7F2', border: '1px solid #E8E2D8', borderRadius: 10, padding: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#9A8F82', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          This week
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48 }}>
          {[32, 45, 38, 62, 51, 78, 55].map((h, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{
                width: '100%', height: `${(h / 78) * 40}px`,
                background: i === 5 ? '#1a5e6b' : '#E8E2D8',
                borderRadius: '3px 3px 1px 1px',
              }} />
              <span style={{ fontSize: 8, color: '#9A8F82', fontFamily: mono }}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Fleet summary */}
      <div style={{ background: '#1A1613', borderRadius: 10, padding: 12, flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(245,241,234,0.5)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Fleet summary
        </div>
        {[
          { label: 'In transit', value: '8', pct: 50 },
          { label: 'In port', value: '4', pct: 25 },
          { label: 'Departing', value: '4', pct: 25 },
        ].map((r, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 8 : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 10, color: 'rgba(245,241,234,0.6)' }}>{r.label}</span>
              <span style={{ fontSize: 10, color: 'rgba(245,241,234,0.8)', fontFamily: mono, fontWeight: 600 }}>{r.value}</span>
            </div>
            <div style={{ height: 3, background: 'rgba(245,241,234,0.08)', borderRadius: 9999 }}>
              <div style={{ height: '100%', width: `${r.pct}%`, background: 'rgba(63,168,164,0.4)', borderRadius: 9999 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardMockup() {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#F5F1EA',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Plus Jakarta Sans","Inter",-apple-system,sans-serif',
      overflow: 'hidden', fontSize: 12,
    }}>
      <TopBar />
      <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden', minHeight: 0 }}>
        <StatCards />
        <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <PortCallTable />
          <SidePanel />
        </div>
      </div>
    </div>
  )
}
