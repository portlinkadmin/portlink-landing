'use client'

// Port Agent dashboard — ground ops per vessel arrival
// Key views: incoming vessels, service orders, turnaround checklist, PDA drafts

import { Ship, Clock, CheckCircle2, AlertCircle, FileText, Anchor, Wrench, Truck, Trash2, Bell, Search, ChevronDown } from 'lucide-react'

const arrivals = [
  { name: 'MSC Grandiosa',   eta: '08:00',  berth: 'A-12', pax: 5686, status: 'arriving',  services: 4 },
  { name: 'Costa Fortuna',   eta: '14:30',  berth: 'B-4',  pax: 2720, status: 'preparing', services: 3 },
  { name: 'Celebrity Edge',  eta: 'Tmrw',   berth: 'A-7',  pax: 2908, status: 'scheduled', services: 2 },
  { name: 'Norwegian Bliss', eta: 'Tmrw',   berth: 'C-2',  pax: 4004, status: 'scheduled', services: 4 },
]

const statusCfg = {
  arriving:  { color: '#3d7daf', bg: 'rgba(61,125,175,0.12)',  label: 'Arriving'  },
  preparing: { color: '#d97706', bg: 'rgba(217,119,6,0.10)',   label: 'Preparing' },
  scheduled: { color: '#6b87a0', bg: 'rgba(107,135,160,0.10)', label: 'Scheduled' },
}

const services = [
  { icon: Anchor,  label: 'Pilotage',    vessel: 'MSC Grandiosa',   status: 'confirmed', time: '07:45' },
  { icon: Wrench,  label: 'Mooring',     vessel: 'MSC Grandiosa',   status: 'confirmed', time: '08:00' },
  { icon: Truck,   label: 'Provisions',  vessel: 'Costa Fortuna',   status: 'pending',   time: '13:00' },
  { icon: Trash2,  label: 'Waste rec.',  vessel: 'Costa Fortuna',   status: 'pending',   time: '16:00' },
  { icon: Anchor,  label: 'Pilotage',    vessel: 'Celebrity Edge',  status: 'scheduled', time: 'Tmrw'  },
]

const svcCfg = {
  confirmed: { color: '#16a34a', bg: 'rgba(22,163,74,0.10)' },
  pending:   { color: '#d97706', bg: 'rgba(217,119,6,0.10)' },
  scheduled: { color: '#6b87a0', bg: 'rgba(107,135,160,0.10)' },
}

const pdas = [
  { vessel: 'MSC Grandiosa',  total: '€ 7,850',  status: 'draft'    },
  { vessel: 'Costa Fortuna',  total: '€ 5,230',  status: 'sent'     },
  { vessel: 'Celebrity Edge', total: '€ 6,410',  status: 'approved' },
]

const pdaCfg = {
  draft:    { color: '#d97706', bg: 'rgba(217,119,6,0.10)',   label: 'Draft'    },
  sent:     { color: '#3d7daf', bg: 'rgba(61,125,175,0.12)',  label: 'Sent'     },
  approved: { color: '#16a34a', bg: 'rgba(22,163,74,0.10)',   label: 'Approved' },
}

export default function DashboardAgent() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#f4f7fa',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Plus Jakarta Sans","Inter",-apple-system,sans-serif',
      overflow: 'hidden', fontSize: 12,
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: '#ffffff', borderBottom: '1px solid #e8eef4',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #1a4a6b, #2d6a98)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Anchor size={14} color="white" /></div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0b1220' }}>Portlink</span>
          <span style={{ fontSize: 11, color: '#6b87a0', borderLeft: '1px solid #e8eef4', paddingLeft: 8 }}>Port Agent · Barcelona</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ position: 'relative' }}>
            <Bell size={14} color="#5a7a99" />
            <div style={{ position: 'absolute', top: -2, right: -2, width: 6, height: 6, borderRadius: '50%', background: '#ef4444', border: '1.5px solid #fff' }} />
          </div>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'linear-gradient(135deg, #1a4a6b, #2d6a98)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: 'white',
          }}>RV</div>
        </div>
      </div>

      {/* Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, padding: '12px 16px 0' }}>
        {[
          { label: 'Vessels today', value: '2', icon: Ship, accent: true },
          { label: 'Services pending', value: '4', icon: Wrench, accent: false },
          { label: 'PDAs open', value: '3', icon: FileText, accent: false },
          { label: 'Alerts', value: '2', icon: AlertCircle, accent: false },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} style={{
              background: s.accent ? 'linear-gradient(135deg,#1a4a6b,#2d6a98)' : '#ffffff',
              border: s.accent ? 'none' : '1px solid #e8eef4',
              borderRadius: 12, padding: '10px 12px',
              boxShadow: s.accent ? '0 3px 10px rgba(26,74,107,0.25)' : '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <span style={{ fontSize: 9, color: s.accent ? 'rgba(255,255,255,0.7)' : '#6b87a0', fontWeight: 500 }}>{s.label}</span>
                <Icon size={11} color={s.accent ? 'rgba(255,255,255,0.7)' : '#2d6a98'} />
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.accent ? 'white' : '#0b1220', lineHeight: 1 }}>{s.value}</div>
            </div>
          )
        })}
      </div>

      {/* Main grid */}
      <div style={{ display: 'flex', gap: 10, flex: 1, padding: '10px 16px', minHeight: 0, overflow: 'hidden' }}>

        {/* Left — arrivals + services */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
          {/* Vessel arrivals */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, overflow: 'hidden', flex: 1 }}>
            <div style={{ padding: '9px 14px', borderBottom: '1px solid #e8eef4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0b1220' }}>Vessel arrivals</span>
              <span style={{ fontSize: 10, color: '#3d7daf', fontWeight: 600, cursor: 'pointer' }}>Today · 4</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1fr', padding: '5px 14px', fontSize: 9, color: '#8899aa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f0f4f8' }}>
              <span>Vessel</span><span>ETA</span><span>Berth</span><span>Pax</span><span>Status</span>
            </div>
            {arrivals.map((v, i) => {
              const s = statusCfg[v.status as keyof typeof statusCfg]
              return (
                <div key={v.name} style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1fr',
                  padding: '6px 14px', alignItems: 'center',
                  borderBottom: i < arrivals.length - 1 ? '1px solid #f7f9fc' : 'none',
                  background: i % 2 === 0 ? '#fff' : '#fafcff',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: '#e8f0f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Ship size={9} color="#2d6a98" />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#0b1220', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Clock size={9} color="#8899aa" />
                    <span style={{ fontSize: 10, color: '#4a6a85' }}>{v.eta}</span>
                  </div>
                  <span style={{ fontSize: 10, color: '#4a6a85', fontWeight: 500 }}>{v.berth}</span>
                  <span style={{ fontSize: 10, color: '#4a6a85' }}>{(v.pax / 1000).toFixed(1)}k</span>
                  <span style={{ padding: '2px 6px', borderRadius: 9999, background: s.bg, color: s.color, fontSize: 9, fontWeight: 600, width: 'fit-content' }}>{s.label}</span>
                </div>
              )
            })}
          </div>

          {/* Service orders */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '9px 14px', borderBottom: '1px solid #e8eef4' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0b1220' }}>Service orders</span>
            </div>
            {services.map((s, i) => {
              const Icon = s.icon
              const cfg = svcCfg[s.status as keyof typeof svcCfg]
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px',
                  borderBottom: i < services.length - 1 ? '1px solid #f7f9fc' : 'none',
                  background: i % 2 === 0 ? '#fff' : '#fafcff',
                }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={11} color="#2d6a98" />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, color: '#0b1220', flex: 1 }}>{s.label}</span>
                  <span style={{ fontSize: 10, color: '#6b87a0', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.vessel}</span>
                  <span style={{ fontSize: 9, color: '#8899aa', flexShrink: 0 }}>{s.time}</span>
                  <span style={{ padding: '2px 6px', borderRadius: 9999, background: cfg.bg, color: cfg.color, fontSize: 9, fontWeight: 600, flexShrink: 0 }}>{s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right — PDA panel + turnaround */}
        <div style={{ width: 190, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* PDA drafts */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, overflow: 'hidden', flex: 1 }}>
            <div style={{ padding: '9px 12px', borderBottom: '1px solid #e8eef4' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0b1220' }}>PDA status</span>
            </div>
            {pdas.map((p, i) => {
              const cfg = pdaCfg[p.status as keyof typeof pdaCfg]
              return (
                <div key={i} style={{
                  padding: '8px 12px',
                  borderBottom: i < pdas.length - 1 ? '1px solid #f0f4f8' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#0b1220', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '55%' }}>{p.vessel.split(' ').slice(1).join(' ')}</span>
                    <span style={{ padding: '1px 6px', borderRadius: 9999, background: cfg.bg, color: cfg.color, fontSize: 9, fontWeight: 600 }}>{cfg.label}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1a4a6b' }}>{p.total}</span>
                </div>
              )
            })}
          </div>

          {/* Turnaround checklist */}
          <div style={{
            background: 'linear-gradient(135deg,#0b1220,#1a2d42)',
            borderRadius: 12, padding: '12px',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 10 }}>Turnaround · MSC Grandiosa</div>
            {[
              { task: 'Berth booking confirmed', done: true },
              { task: 'Pilot ordered', done: true },
              { task: 'Gangway arranged', done: true },
              { task: 'Waste docs ready', done: false },
              { task: 'PDA sent to cruise', done: false },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                <CheckCircle2 size={12} color={t.done ? '#4ade80' : 'rgba(255,255,255,0.2)'} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 10, color: t.done ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)', textDecoration: t.done ? 'none' : 'none' }}>{t.task}</span>
              </div>
            ))}
            <div style={{ marginTop: 8, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 9999 }}>
              <div style={{ height: '100%', width: '60%', background: 'linear-gradient(90deg,#4ade80,#22c55e)', borderRadius: 9999 }} />
            </div>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 4, display: 'block' }}>3 / 5 complete</span>
          </div>
        </div>
      </div>
    </div>
  )
}
