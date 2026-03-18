'use client'

// Portlink — inline dashboard mockup
// Rendered entirely in React/CSS — no image dependency
// Designed to fill the ContainerScroll bezel at any resolution

import { Ship, Anchor, MapPin, Clock, CheckCircle2, AlertCircle, TrendingUp, Bell, Search, ChevronDown } from 'lucide-react'

// ── Data ─────────────────────────────────────────────────────────────────────

const vessels = [
  { name: 'MSC Grandiosa',    port: 'Barcelona',    eta: 'Today 08:00',     pax: 5686, status: 'confirmed',  agent: 'Maritima SA' },
  { name: 'Costa Fortuna',    port: 'Civitavecchia', eta: 'Today 14:30',    pax: 2720, status: 'pending',    agent: 'Roma Agents' },
  { name: 'Celebrity Edge',   port: 'Piraeus',      eta: 'Tomorrow 07:00',  pax: 2908, status: 'confirmed',  agent: 'Piraeus Ops' },
  { name: 'Norwegian Bliss',  port: 'Marseille',    eta: 'Tomorrow 11:00',  pax: 4004, status: 'confirmed',  agent: 'MedLine SAS' },
  { name: 'Queen Mary 2',     port: 'Southampton',  eta: '20 Mar 09:00',    pax: 2691, status: 'reviewing',  agent: 'Port Solent' },
  { name: 'Harmony of Seas',  port: 'Miami',        eta: '21 Mar 06:30',    pax: 5479, status: 'confirmed',  agent: 'Florida Marine' },
]

const statusConfig = {
  confirmed: { color: '#16a34a', bg: 'rgba(22,163,74,0.1)',  label: 'Confirmed' },
  pending:   { color: '#d97706', bg: 'rgba(217,119,6,0.1)',  label: 'Pending'   },
  reviewing: { color: '#3d7daf', bg: 'rgba(61,125,175,0.12)', label: 'Reviewing' },
}

const barData = [42, 67, 55, 80, 63, 91, 74]
const barLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// ── Sub-components ────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 16px',
      background: '#ffffff',
      borderBottom: '1px solid #e8eef4',
      gap: 12,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'linear-gradient(135deg, #3d7daf, #295c85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Anchor size={14} color="white" />
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0b1220' }}>Portlink</span>
      </div>

      {/* Search bar */}
      <div style={{
        flex: 1, maxWidth: 280,
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#f4f7fa', border: '1px solid #dde5ee',
        borderRadius: 8, padding: '5px 10px',
      }}>
        <Search size={12} color="#8899aa" />
        <span style={{ fontSize: 12, color: '#8899aa' }}>Search vessels, ports…</span>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{
          position: 'relative', width: 28, height: 28,
          background: '#f4f7fa', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Bell size={13} color="#5a7a99" />
          <div style={{
            position: 'absolute', top: 5, right: 5,
            width: 6, height: 6, borderRadius: '50%',
            background: '#ef4444', border: '1.5px solid #fff',
          }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'linear-gradient(135deg, #3d7daf, #5ba3cc)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: 'white',
          }}>JK</div>
          <ChevronDown size={12} color="#8899aa" />
        </div>
      </div>
    </div>
  )
}

function StatCards() {
  const stats = [
    { label: 'Active port calls', value: '24', delta: '+3 today',    icon: Ship,       accent: true  },
    { label: 'Vessels confirmed', value: '18', delta: '75% of total', icon: CheckCircle2, accent: false },
    { label: 'Pending approval',  value: '4',  delta: '↑ 2 from yesterday', icon: AlertCircle, accent: false },
    { label: 'Ports this week',   value: '11', delta: 'Across 6 regions', icon: MapPin,    accent: false },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <div key={s.label} style={{
            background: s.accent ? 'linear-gradient(135deg, #3d7daf, #295c85)' : '#ffffff',
            border: s.accent ? 'none' : '1px solid #e8eef4',
            borderRadius: 12,
            padding: '12px 14px',
            boxShadow: s.accent ? '0 4px 16px rgba(61,125,175,0.25)' : '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: s.accent ? 'rgba(255,255,255,0.75)' : '#6b87a0', fontWeight: 500 }}>
                {s.label}
              </span>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                background: s.accent ? 'rgba(255,255,255,0.15)' : '#f4f7fa',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={12} color={s.accent ? 'white' : '#3d7daf'} />
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.accent ? 'white' : '#0b1220', lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 10, color: s.accent ? 'rgba(255,255,255,0.6)' : '#8899aa', marginTop: 4 }}>
              {s.delta}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function VesselTable() {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e8eef4',
      borderRadius: 12,
      overflow: 'hidden',
      flex: 1,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 16px', borderBottom: '1px solid #e8eef4',
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0b1220' }}>Upcoming port calls</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['All', 'Today', 'Tomorrow'].map((f, i) => (
            <span key={f} style={{
              fontSize: 11, padding: '2px 8px', borderRadius: 9999,
              background: i === 0 ? '#3d7daf' : '#f4f7fa',
              color: i === 0 ? 'white' : '#6b87a0',
              fontWeight: 500, cursor: 'pointer',
            }}>{f}</span>
          ))}
        </div>
      </div>
      {/* Table header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.2fr 0.8fr 1fr',
        padding: '6px 16px', borderBottom: '1px solid #f0f4f8',
        fontSize: 10, color: '#8899aa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        <span>Vessel</span><span>Port</span><span>ETA</span><span>Pax</span><span>Status</span>
      </div>
      {/* Rows */}
      {vessels.map((v, i) => {
        const s = statusConfig[v.status as keyof typeof statusConfig]
        return (
          <div key={v.name} style={{
            display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.2fr 0.8fr 1fr',
            padding: '7px 16px',
            borderBottom: i < vessels.length - 1 ? '1px solid #f7f9fc' : 'none',
            alignItems: 'center',
            background: i % 2 === 0 ? '#ffffff' : '#fafcff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                background: 'linear-gradient(135deg, #e8f0f8, #c9ddef)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Ship size={10} color="#3d7daf" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#0b1220', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={10} color="#8899aa" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: '#4a6a85', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.port}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={10} color="#8899aa" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: '#6b87a0' }}>{v.eta}</span>
            </div>
            <span style={{ fontSize: 11, color: '#4a6a85', fontWeight: 500 }}>{v.pax.toLocaleString()}</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '2px 7px', borderRadius: 9999,
              background: s.bg, color: s.color,
              fontSize: 10, fontWeight: 600, width: 'fit-content',
            }}>{s.label}</span>
          </div>
        )
      })}
    </div>
  )
}

function ActivityChart() {
  const max = Math.max(...barData)
  return (
    <div style={{
      background: '#ffffff', border: '1px solid #e8eef4',
      borderRadius: 12, padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0b1220' }}>Port call activity</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <TrendingUp size={12} color="#16a34a" />
          <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>+18% this week</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 72 }}>
        {barData.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', position: 'relative', height: 60, display: 'flex', alignItems: 'flex-end' }}>
              <div style={{
                width: '100%',
                height: `${(v / max) * 100}%`,
                borderRadius: '4px 4px 2px 2px',
                background: i === 5
                  ? 'linear-gradient(180deg, #3d7daf, #295c85)'
                  : 'linear-gradient(180deg, #c9ddef, #e8f0f8)',
                transition: 'all 0.3s',
              }} />
            </div>
            <span style={{ fontSize: 9, color: '#8899aa', fontWeight: 500 }}>{barLabels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SidePanel() {
  const alerts = [
    { msg: 'Costa Fortuna PDA pending review', time: '12m ago', type: 'warning' },
    { msg: 'Barcelona slot confirmed — MSC Grandiosa', time: '1h ago', type: 'success' },
    { msg: 'Schedule change: Celebrity Edge +2h', time: '3h ago', type: 'info' },
  ]
  const alertColors = { warning: '#d97706', success: '#16a34a', info: '#3d7daf' }
  const alertBg = { warning: 'rgba(217,119,6,0.08)', success: 'rgba(22,163,74,0.08)', info: 'rgba(61,125,175,0.08)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 200, flexShrink: 0 }}>
      {/* Alerts */}
      <div style={{
        background: '#ffffff', border: '1px solid #e8eef4',
        borderRadius: 12, padding: '12px', flex: 1,
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#0b1220', marginBottom: 10 }}>Alerts</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {alerts.map((a, i) => (
            <div key={i} style={{
              padding: '7px 9px', borderRadius: 8,
              background: alertBg[a.type as keyof typeof alertBg],
              border: `1px solid ${alertColors[a.type as keyof typeof alertColors]}22`,
            }}>
              <div style={{ fontSize: 10, color: '#0b1220', fontWeight: 500, lineHeight: 1.4, marginBottom: 2 }}>{a.msg}</div>
              <div style={{ fontSize: 9, color: '#8899aa' }}>{a.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div style={{
        background: 'linear-gradient(135deg, #0b1220, #1a2d42)',
        borderRadius: 12, padding: '12px',
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 10 }}>Fleet summary</div>
        {[
          { label: 'In transit', value: '8', pct: 33 },
          { label: 'In port',    value: '6', pct: 25 },
          { label: 'Departing',  value: '4', pct: 17 },
        ].map((item) => (
          <div key={item.label} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>{item.label}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>{item.value}</span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 9999 }}>
              <div style={{
                height: '100%', width: `${item.pct * 3}%`,
                background: 'linear-gradient(90deg, #5ba3cc, #3d7daf)',
                borderRadius: 9999,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function DashboardMockup() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#f4f7fa',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif',
      overflow: 'hidden',
      fontSize: 12,
    }}>
      <TopBar />

      {/* Body */}
      <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden', minHeight: 0 }}>
        <StatCards />

        {/* Main content row */}
        <div style={{ display: 'flex', gap: 12, flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* Left: table + chart */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
            <VesselTable />
            <ActivityChart />
          </div>
          {/* Right: side panel */}
          <SidePanel />
        </div>
      </div>
    </div>
  )
}
