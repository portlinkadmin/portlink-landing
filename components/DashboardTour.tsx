'use client'

// Tour Operator / DMC dashboard
// Key views: port arrival calendar, booking requests, excursion capacity, guide/transport assignments

import { Ship, MapPin, Users, Calendar, Clock, CheckCircle2, AlertCircle, TrendingUp, Bell, ChevronDown, Bus } from 'lucide-react'

const portCalendar = [
  { port: 'Barcelona',    date: 'Today',   vessels: 2, pax: 8406,  booked: 340 },
  { port: 'Civitavecchia',date: 'Today',   vessels: 1, pax: 2720,  booked: 180 },
  { port: 'Piraeus',      date: 'Tomorrow',vessels: 2, pax: 6912,  booked: 210 },
  { port: 'Naples',       date: 'Mar 20',  vessels: 1, pax: 3200,  booked: 95  },
  { port: 'Marseille',    date: 'Mar 21',  vessels: 2, pax: 7890,  booked: 280 },
]

const bookingRequests = [
  { tour: 'Sagrada Família & Gothic Quarter', port: 'Barcelona',  pax: 42,  agent: 'Maritima SA',   status: 'new'      },
  { tour: 'Pompeii Express Day Trip',          port: 'Naples',     pax: 28,  agent: 'Naples Ops',    status: 'new'      },
  { tour: 'Athens Half Day — Acropolis',       port: 'Piraeus',    pax: 65,  agent: 'Piraeus Ops',   status: 'accepted' },
  { tour: 'Colosseum & Vatican Fast Track',    port: 'Civitavecchia',pax: 36,agent: 'Roma Agents',   status: 'accepted' },
  { tour: 'Marseille & Calanques Boat',        port: 'Marseille',  pax: 54,  agent: 'MedLine SAS',   status: 'pending'  },
]

const reqCfg = {
  new:      { color: '#3d7daf', bg: 'rgba(61,125,175,0.12)',  label: 'New'      },
  accepted: { color: '#16a34a', bg: 'rgba(22,163,74,0.10)',   label: 'Accepted' },
  pending:  { color: '#d97706', bg: 'rgba(217,119,6,0.10)',   label: 'Pending'  },
}

const excursions = [
  { name: 'Barcelona City & Gaudí',  capacity: 50, booked: 42, guides: 2, buses: 1 },
  { name: 'Athens Acropolis Tour',   capacity: 80, booked: 65, guides: 2, buses: 2 },
  { name: 'Pompeii Day Trip',        capacity: 40, booked: 28, guides: 1, buses: 1 },
]

const revenueData = [28, 41, 35, 58, 46, 72, 64]
const revLabels   = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

export default function DashboardTour() {
  const maxRev = Math.max(...revenueData)
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
            background: 'linear-gradient(135deg,#166534,#16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><MapPin size={14} color="white" /></div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0b1220' }}>Portlink</span>
          <span style={{ fontSize: 11, color: '#6b87a0', borderLeft: '1px solid #e8eef4', paddingLeft: 8 }}>Tour Operator · Mediterranean</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ position: 'relative' }}>
            <Bell size={14} color="#5a7a99" />
            <div style={{ position: 'absolute', top: -2, right: -2, width: 6, height: 6, borderRadius: '50%', background: '#ef4444', border: '1.5px solid #fff' }} />
          </div>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'linear-gradient(135deg,#166534,#16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: 'white',
          }}>AM</div>
        </div>
      </div>

      {/* Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, padding: '12px 16px 0' }}>
        {[
          { label: 'Port arrivals this week', value: '8',    icon: Ship,     accent: true  },
          { label: 'New booking requests',    value: '2',    icon: Calendar, accent: false },
          { label: 'Pax booked today',        value: '520',  icon: Users,    accent: false },
          { label: 'Excursions running',      value: '5',    icon: Bus,      accent: false },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} style={{
              background: s.accent ? 'linear-gradient(135deg,#166534,#16a34a)' : '#ffffff',
              border: s.accent ? 'none' : '1px solid #e8eef4',
              borderRadius: 12, padding: '10px 12px',
              boxShadow: s.accent ? '0 3px 10px rgba(22,163,74,0.25)' : '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <span style={{ fontSize: 9, color: s.accent ? 'rgba(255,255,255,0.7)' : '#6b87a0', fontWeight: 500 }}>{s.label}</span>
                <Icon size={11} color={s.accent ? 'rgba(255,255,255,0.7)' : '#16a34a'} />
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.accent ? 'white' : '#0b1220', lineHeight: 1 }}>{s.value}</div>
            </div>
          )
        })}
      </div>

      {/* Main grid */}
      <div style={{ display: 'flex', gap: 10, flex: 1, padding: '10px 16px', minHeight: 0, overflow: 'hidden' }}>

        {/* Left col */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>

          {/* Booking requests */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, overflow: 'hidden', flex: 1 }}>
            <div style={{ padding: '9px 14px', borderBottom: '1px solid #e8eef4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0b1220' }}>Booking requests</span>
              <span style={{ fontSize: 10, background: 'rgba(61,125,175,0.12)', color: '#3d7daf', padding: '1px 7px', borderRadius: 9999, fontWeight: 600 }}>2 new</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 0.6fr 1fr', padding: '5px 14px', fontSize: 9, color: '#8899aa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #f0f4f8' }}>
              <span>Tour</span><span>Port</span><span>Pax</span><span>Status</span>
            </div>
            {bookingRequests.map((r, i) => {
              const cfg = reqCfg[r.status as keyof typeof reqCfg]
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '2.5fr 1fr 0.6fr 1fr',
                  padding: '6px 14px', alignItems: 'center',
                  borderBottom: i < bookingRequests.length - 1 ? '1px solid #f7f9fc' : 'none',
                  background: r.status === 'new' ? 'rgba(61,125,175,0.03)' : i % 2 === 0 ? '#fff' : '#fafcff',
                }}>
                  <span style={{ fontSize: 10, fontWeight: r.status === 'new' ? 600 : 400, color: '#0b1220', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.tour}</span>
                  <span style={{ fontSize: 10, color: '#4a6a85' }}>{r.port}</span>
                  <span style={{ fontSize: 10, color: '#4a6a85', fontWeight: 500 }}>{r.pax}</span>
                  <span style={{ padding: '2px 6px', borderRadius: 9999, background: cfg.bg, color: cfg.color, fontSize: 9, fontWeight: 600, width: 'fit-content' }}>{cfg.label}</span>
                </div>
              )
            })}
          </div>

          {/* Revenue chart */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, padding: '10px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0b1220' }}>Pax booked / day</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <TrendingUp size={11} color="#16a34a" />
                <span style={{ fontSize: 10, color: '#16a34a', fontWeight: 600 }}>+23% this week</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 56 }}>
              {revenueData.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ width: '100%', height: 48, display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{
                      width: '100%', height: `${(v / maxRev) * 100}%`,
                      borderRadius: '3px 3px 2px 2px',
                      background: i === 5 ? 'linear-gradient(180deg,#16a34a,#15803d)' : 'linear-gradient(180deg,#bbf7d0,#dcfce7)',
                    }} />
                  </div>
                  <span style={{ fontSize: 9, color: '#8899aa' }}>{revLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right col */}
        <div style={{ width: 190, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Port calendar */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '9px 12px', borderBottom: '1px solid #e8eef4' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0b1220' }}>Upcoming ports</span>
            </div>
            {portCalendar.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                borderBottom: i < portCalendar.length - 1 ? '1px solid #f7f9fc' : 'none',
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: p.date === 'Today' ? '#16a34a' : '#3d7daf',
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#0b1220', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.port}</div>
                  <div style={{ fontSize: 9, color: '#8899aa' }}>{p.date} · {p.vessels} vessels</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#16a34a' }}>{p.booked}</div>
                  <div style={{ fontSize: 8, color: '#8899aa' }}>booked</div>
                </div>
              </div>
            ))}
          </div>

          {/* Excursion capacity */}
          <div style={{
            background: 'linear-gradient(135deg,#052e16,#14532d)',
            borderRadius: 12, padding: '12px', flex: 1,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 10 }}>Excursion capacity</div>
            {excursions.map((e, i) => {
              const pct = Math.round((e.booked / e.capacity) * 100)
              return (
                <div key={i} style={{ marginBottom: i < excursions.length - 1 ? 10 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '75%' }}>{e.name}</span>
                    <span style={{ fontSize: 9, color: 'white', fontWeight: 700, flexShrink: 0 }}>{e.booked}/{e.capacity}</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 9999 }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: pct > 80 ? 'linear-gradient(90deg,#4ade80,#22c55e)' : 'linear-gradient(90deg,#86efac,#4ade80)',
                      borderRadius: 9999,
                    }} />
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                    <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)' }}>{e.guides} guides</span>
                    <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.45)' }}>{e.buses} bus</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
