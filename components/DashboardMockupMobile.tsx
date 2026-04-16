'use client'

// Portlink — mobile dashboard mockup (Cruise Line)
// Designed at 280px logical width (ScaledScreen renders at this size then CSS-scales to fit bezel)
// All px sizes are tuned for this logical width — no viewport-relative units needed

import { Ship, MapPin, Clock, CheckCircle2, AlertCircle, Bell } from 'lucide-react'

const vessels = [
  { name: 'MSC Grandiosa',   port: 'Barcelona',     eta: 'Today 08:00',    status: 'confirmed' },
  { name: 'Costa Fortuna',   port: 'Civitavecchia', eta: 'Today 14:30',    status: 'pending'   },
  { name: 'Celebrity Edge',  port: 'Piraeus',       eta: 'Tmrw 07:00',     status: 'confirmed' },
  { name: 'Norwegian Bliss', port: 'Marseille',     eta: 'Tmrw 11:00',     status: 'confirmed' },
]

const statusConfig = {
  confirmed: { color: 'var(--ds-success)', bg: 'rgba(74, 124, 78, 0.1)',   label: 'Conf.' },
  pending:   { color: 'var(--ds-warning)', bg: 'rgba(217, 119, 6, 0.1)',   label: 'Pend.' },
  reviewing: { color: 'var(--ds-accent)', bg: 'rgba(61, 111, 174, 0.12)', label: 'Rev.'  },
}

export default function DashboardMockupMobile() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--ds-surface-2)',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Plus Jakarta Sans","Inter",-apple-system,sans-serif',
      overflow: 'hidden',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'var(--ds-surface-1)', borderBottom: '1px solid var(--ds-border-1)',
      }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--ds-text-1)' }}>Portlink</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <Bell size={18} color="var(--ds-text-3)" />
            <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: 'var(--ds-danger)', border: '1.5px solid var(--ds-surface-1)' }} />
          </div>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,var(--ds-accent),var(--ds-accent-strong))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>JK</div>
        </div>
      </div>

      {/* Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '14px 14px 0' }}>
        {[
          { label: 'Active calls', value: '24', icon: Ship, accent: true },
          { label: 'Pending',      value: '4',  icon: AlertCircle, accent: false },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} style={{
              background: s.accent ? 'linear-gradient(135deg,var(--ds-accent),var(--ds-accent-strong))' : 'var(--ds-surface-1)',
              border: s.accent ? 'none' : '1px solid var(--ds-border-1)',
              borderRadius: 12, padding: '12px 12px',
              boxShadow: s.accent ? '0 3px 10px rgba(61, 111, 174, 0.25)' : '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: s.accent ? 'rgba(255,255,255,0.7)' : 'var(--ds-text-3)', fontWeight: 500 }}>{s.label}</span>
                <Icon size={14} color={s.accent ? 'rgba(255,255,255,0.7)' : 'var(--ds-accent)'} />
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.accent ? 'white' : 'var(--ds-text-1)', lineHeight: 1 }}>{s.value}</div>
            </div>
          )
        })}
      </div>

      {/* Vessel list */}
      <div style={{ flex: 1, margin: '12px 14px 0', overflow: 'hidden' }}>
        <div style={{ background: 'var(--ds-surface-1)', border: '1px solid var(--ds-border-1)', borderRadius: 12, overflow: 'hidden', height: '100%' }}>
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--ds-border-1)', fontSize: 14, fontWeight: 600, color: 'var(--ds-text-1)' }}>Port calls</div>
          {vessels.map((v, i) => {
            const s = statusConfig[v.status as keyof typeof statusConfig]
            return (
              <div key={v.name} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
                borderBottom: i < vessels.length - 1 ? '1px solid var(--ds-surface-2)' : 'none',
                background: i % 2 === 0 ? 'var(--ds-surface-1)' : 'var(--ds-surface-2)',
              }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--ds-accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Ship size={12} color="var(--ds-accent)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ds-text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ds-text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.port}</div>
                </div>
                <span style={{ padding: '3px 8px', borderRadius: 9999, background: s.bg, color: s.color, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{s.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 14px 14px', background: 'var(--ds-surface-1)', borderTop: '1px solid var(--ds-border-1)', marginTop: 10 }}>
        {[
          { icon: Ship, label: 'Fleet', active: true },
          { icon: MapPin, label: 'Ports', active: false },
          { icon: CheckCircle2, label: 'Tasks', active: false },
          { icon: Bell, label: 'Alerts', active: false },
        ].map(({ icon: Icon, label, active }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Icon size={18} color={active ? 'var(--ds-accent)' : 'var(--ds-text-3)'} />
            <span style={{ fontSize: 10, color: active ? 'var(--ds-accent)' : 'var(--ds-text-3)', fontWeight: active ? 600 : 400 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
