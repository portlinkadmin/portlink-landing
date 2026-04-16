'use client'

// Tour Operator mobile dashboard — designed at 280px logical width
import { Ship, Users, Calendar, MapPin, Bell, Bus } from 'lucide-react'

const requests = [
  { tour: 'Sagrada Família & Gothic', port: 'Barcelona', pax: 42, status: 'new'      },
  { tour: 'Pompeii Express',          port: 'Naples',    pax: 28, status: 'new'      },
  { tour: 'Athens Acropolis',         port: 'Piraeus',   pax: 65, status: 'accepted' },
  { tour: 'Vatican Fast Track',       port: 'Rome',      pax: 36, status: 'accepted' },
]
const reqCfg = {
  new:      { color: 'var(--ds-accent)', bg: 'rgba(61, 111, 174, 0.12)', label: 'New'      },
  accepted: { color: 'var(--ds-success)', bg: 'rgba(74, 124, 78, 0.10)',  label: 'Accepted' },
}

export default function DashboardMockupMobileTour() {
  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--ds-surface-2)',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Plus Jakarta Sans","Inter",-apple-system,sans-serif',
      overflow: 'hidden',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', background: 'var(--ds-surface-1)', borderBottom: '1px solid var(--ds-border-1)',
      }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--ds-text-1)' }}>Portlink</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <Bell size={18} color="var(--ds-text-3)" />
            <div style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: 'var(--ds-danger)', border: '1.5px solid var(--ds-surface-1)' }} />
          </div>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(22, 101, 52, 1),var(--ds-success))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>AM</div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '14px 14px 0' }}>
        {[
          { label: 'Port arrivals',   value: '8',   icon: Ship,  accent: true  },
          { label: 'Pax booked',      value: '520', icon: Users, accent: false },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} style={{
              background: s.accent ? 'linear-gradient(135deg,rgba(22, 101, 52, 1),var(--ds-success))' : 'var(--ds-surface-1)',
              border: s.accent ? 'none' : '1px solid var(--ds-border-1)',
              borderRadius: 12, padding: '12px 12px',
              boxShadow: s.accent ? '0 3px 10px rgba(74, 124, 78, 0.25)' : '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: s.accent ? 'rgba(255,255,255,0.7)' : 'var(--ds-text-3)', fontWeight: 500 }}>{s.label}</span>
                <Icon size={14} color={s.accent ? 'rgba(255,255,255,0.7)' : 'var(--ds-success)'} />
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.accent ? 'white' : 'var(--ds-text-1)', lineHeight: 1 }}>{s.value}</div>
            </div>
          )
        })}
      </div>

      {/* Booking requests */}
      <div style={{ flex: 1, margin: '12px 14px 0', overflow: 'hidden' }}>
        <div style={{ background: 'var(--ds-surface-1)', border: '1px solid var(--ds-border-1)', borderRadius: 12, overflow: 'hidden', height: '100%' }}>
          <div style={{
            padding: '10px 12px', borderBottom: '1px solid var(--ds-border-1)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ds-text-1)' }}>Booking requests</span>
            <span style={{ fontSize: 11, background: 'rgba(61, 111, 174, 0.12)', color: 'var(--ds-accent)', padding: '2px 8px', borderRadius: 9999, fontWeight: 600 }}>2 new</span>
          </div>
          {requests.map((r, i) => {
            const cfg = reqCfg[r.status as keyof typeof reqCfg]
            return (
              <div key={r.tour} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
                borderBottom: i < requests.length - 1 ? '1px solid var(--ds-surface-2)' : 'none',
                background: r.status === 'new' ? 'rgba(61, 111, 174, 0.03)' : i % 2 === 0 ? 'var(--ds-surface-1)' : 'var(--ds-surface-2)',
              }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--ds-success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={12} color="var(--ds-success)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: r.status === 'new' ? 600 : 400, color: 'var(--ds-text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.tour}</div>
                  <div style={{ fontSize: 11, color: 'var(--ds-text-3)' }}>{r.port} · {r.pax} pax</div>
                </div>
                <span style={{ padding: '3px 8px', borderRadius: 9999, background: cfg.bg, color: cfg.color, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{cfg.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 14px 14px', background: 'var(--ds-surface-1)', borderTop: '1px solid var(--ds-border-1)', marginTop: 10 }}>
        {[
          { icon: Calendar, label: 'Calendar', active: true  },
          { icon: MapPin,   label: 'Ports',    active: false },
          { icon: Users,    label: 'Bookings', active: false },
          { icon: Bus,      label: 'Tours',    active: false },
        ].map(({ icon: Icon, label, active }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Icon size={18} color={active ? 'var(--ds-success)' : 'var(--ds-text-3)'} />
            <span style={{ fontSize: 10, color: active ? 'var(--ds-success)' : 'var(--ds-text-3)', fontWeight: active ? 600 : 400 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
