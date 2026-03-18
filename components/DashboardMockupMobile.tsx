'use client'

// Portlink — mobile dashboard mockup
// Simplified single-column layout for the phone bezel
// Same data, stripped down for small screen

import { Ship, MapPin, Clock, CheckCircle2, AlertCircle, Bell, ChevronDown } from 'lucide-react'

const vessels = [
  { name: 'MSC Grandiosa',   port: 'Barcelona',     eta: 'Today 08:00',    status: 'confirmed' },
  { name: 'Costa Fortuna',   port: 'Civitavecchia', eta: 'Today 14:30',    status: 'pending'   },
  { name: 'Celebrity Edge',  port: 'Piraeus',       eta: 'Tomorrow 07:00', status: 'confirmed' },
  { name: 'Norwegian Bliss', port: 'Marseille',     eta: 'Tomorrow 11:00', status: 'confirmed' },
]

const statusConfig = {
  confirmed: { color: '#16a34a', bg: 'rgba(22,163,74,0.1)',   label: '✓' },
  pending:   { color: '#d97706', bg: 'rgba(217,119,6,0.1)',   label: '…' },
  reviewing: { color: '#3d7daf', bg: 'rgba(61,125,175,0.12)', label: '~' },
}

export default function DashboardMockupMobile() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#f4f7fa',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif',
      overflow: 'hidden',
      fontSize: 11,
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px',
        background: '#ffffff',
        borderBottom: '1px solid #e8eef4',
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0b1220' }}>Portlink</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <Bell size={14} color="#5a7a99" />
            <div style={{
              position: 'absolute', top: -2, right: -2,
              width: 5, height: 5, borderRadius: '50%',
              background: '#ef4444', border: '1px solid #fff',
            }} />
          </div>
          <div style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'linear-gradient(135deg, #3d7daf, #5ba3cc)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 700, color: 'white',
          }}>JK</div>
        </div>
      </div>

      {/* Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 12px 0' }}>
        {[
          { label: 'Active calls', value: '24', icon: Ship, accent: true },
          { label: 'Pending',      value: '4',  icon: AlertCircle, accent: false },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} style={{
              background: s.accent ? 'linear-gradient(135deg, #3d7daf, #295c85)' : '#ffffff',
              border: s.accent ? 'none' : '1px solid #e8eef4',
              borderRadius: 10,
              padding: '10px 10px',
              boxShadow: s.accent ? '0 3px 10px rgba(61,125,175,0.25)' : '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 9, color: s.accent ? 'rgba(255,255,255,0.7)' : '#6b87a0', fontWeight: 500 }}>{s.label}</span>
                <Icon size={11} color={s.accent ? 'rgba(255,255,255,0.7)' : '#3d7daf'} />
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: s.accent ? 'white' : '#0b1220', lineHeight: 1 }}>{s.value}</div>
            </div>
          )
        })}
      </div>

      {/* Vessel list */}
      <div style={{ flex: 1, margin: '10px 12px 0', overflow: 'hidden' }}>
        <div style={{
          background: '#ffffff', border: '1px solid #e8eef4',
          borderRadius: 10, overflow: 'hidden', height: '100%',
        }}>
          <div style={{
            padding: '8px 10px', borderBottom: '1px solid #e8eef4',
            fontSize: 11, fontWeight: 600, color: '#0b1220',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>Port calls</span>
            <ChevronDown size={11} color="#8899aa" />
          </div>
          {vessels.map((v, i) => {
            const s = statusConfig[v.status as keyof typeof statusConfig]
            return (
              <div key={v.name} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '7px 10px',
                borderBottom: i < vessels.length - 1 ? '1px solid #f7f9fc' : 'none',
                background: i % 2 === 0 ? '#ffffff' : '#fafcff',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                    background: '#e8f0f8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Ship size={9} color="#3d7daf" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#0b1220', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 1 }}>
                      <MapPin size={8} color="#8899aa" />
                      <span style={{ fontSize: 9, color: '#6b87a0' }}>{v.port}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0, marginLeft: 6 }}>
                  <span style={{
                    padding: '1px 6px', borderRadius: 9999,
                    background: s.bg, color: s.color,
                    fontSize: 9, fontWeight: 700,
                  }}>{s.label === '✓' ? 'Done' : s.label === '…' ? 'Pending' : 'Review'}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Clock size={8} color="#8899aa" />
                    <span style={{ fontSize: 8, color: '#8899aa' }}>{v.eta.replace('Tomorrow', 'Tmrw')}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '8px 12px 10px',
        background: '#ffffff',
        borderTop: '1px solid #e8eef4',
        marginTop: 8,
      }}>
        {[
          { icon: Ship, label: 'Fleet', active: true },
          { icon: MapPin, label: 'Ports', active: false },
          { icon: CheckCircle2, label: 'Tasks', active: false },
          { icon: Bell, label: 'Alerts', active: false },
        ].map(({ icon: Icon, label, active }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Icon size={14} color={active ? '#3d7daf' : '#aabbcc'} />
            <span style={{ fontSize: 8, color: active ? '#3d7daf' : '#aabbcc', fontWeight: active ? 600 : 400 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
