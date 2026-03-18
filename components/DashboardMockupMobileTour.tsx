'use client'

import { Ship, Users, Calendar, MapPin, Bell, Bus } from 'lucide-react'

const requests = [
  { tour: 'Sagrada Família & Gothic', port: 'Barcelona', pax: 42, status: 'new'      },
  { tour: 'Pompeii Express',          port: 'Naples',    pax: 28, status: 'new'      },
  { tour: 'Athens Acropolis',         port: 'Piraeus',   pax: 65, status: 'accepted' },
  { tour: 'Vatican Fast Track',       port: 'Civitavecchia', pax: 36, status: 'accepted' },
]
const reqCfg = {
  new:      { color: '#3d7daf', bg: 'rgba(61,125,175,0.12)', label: 'New'      },
  accepted: { color: '#16a34a', bg: 'rgba(22,163,74,0.10)',  label: 'Accepted' },
}

export default function DashboardMockupMobileTour() {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#f4f7fa',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Plus Jakarta Sans","Inter",-apple-system,sans-serif',
      overflow: 'hidden', fontSize: 11,
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', background: '#ffffff', borderBottom: '1px solid #e8eef4',
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0b1220' }}>Portlink</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <Bell size={14} color="#5a7a99" />
            <div style={{ position: 'absolute', top: -2, right: -2, width: 5, height: 5, borderRadius: '50%', background: '#ef4444', border: '1px solid #fff' }} />
          </div>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#166534,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white' }}>AM</div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 12px 0' }}>
        {[
          { label: 'Port arrivals',   value: '8',   icon: Ship,     accent: true  },
          { label: 'Pax booked',      value: '520', icon: Users,    accent: false },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} style={{
              background: s.accent ? 'linear-gradient(135deg,#166534,#16a34a)' : '#ffffff',
              border: s.accent ? 'none' : '1px solid #e8eef4',
              borderRadius: 10, padding: '9px 10px',
              boxShadow: s.accent ? '0 3px 10px rgba(22,163,74,0.25)' : '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 9, color: s.accent ? 'rgba(255,255,255,0.7)' : '#6b87a0', fontWeight: 500 }}>{s.label}</span>
                <Icon size={11} color={s.accent ? 'rgba(255,255,255,0.7)' : '#16a34a'} />
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: s.accent ? 'white' : '#0b1220', lineHeight: 1 }}>{s.value}</div>
            </div>
          )
        })}
      </div>

      {/* Booking requests */}
      <div style={{ flex: 1, margin: '10px 12px 0', overflow: 'hidden' }}>
        <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 10, overflow: 'hidden', height: '100%' }}>
          <div style={{
            padding: '7px 10px', borderBottom: '1px solid #e8eef4',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#0b1220' }}>Booking requests</span>
            <span style={{ fontSize: 9, background: 'rgba(61,125,175,0.12)', color: '#3d7daf', padding: '1px 6px', borderRadius: 9999, fontWeight: 600 }}>2 new</span>
          </div>
          {requests.map((r, i) => {
            const cfg = reqCfg[r.status as keyof typeof reqCfg]
            return (
              <div key={r.tour} style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '6px 10px',
                borderBottom: i < requests.length - 1 ? '1px solid #f7f9fc' : 'none',
                background: r.status === 'new' ? 'rgba(61,125,175,0.03)' : i % 2 === 0 ? '#fff' : '#fafcff',
              }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, background: '#e8f5ee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={9} color="#16a34a" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: r.status === 'new' ? 600 : 400, color: '#0b1220', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.tour}</div>
                  <div style={{ fontSize: 9, color: '#6b87a0' }}>{r.port} · {r.pax} pax</div>
                </div>
                <span style={{ padding: '1px 5px', borderRadius: 9999, background: cfg.bg, color: cfg.color, fontSize: 9, fontWeight: 600, flexShrink: 0 }}>{cfg.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '7px 12px 9px', background: '#ffffff', borderTop: '1px solid #e8eef4', marginTop: 8,
      }}>
        {[
          { icon: Calendar, label: 'Calendar', active: true  },
          { icon: MapPin,   label: 'Ports',    active: false },
          { icon: Users,    label: 'Bookings', active: false },
          { icon: Bus,      label: 'Tours',    active: false },
        ].map(({ icon: Icon, label, active }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Icon size={14} color={active ? '#16a34a' : '#aabbcc'} />
            <span style={{ fontSize: 8, color: active ? '#16a34a' : '#aabbcc', fontWeight: active ? 600 : 400 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
