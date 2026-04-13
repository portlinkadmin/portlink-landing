'use client'

import { MapPin, Bell } from 'lucide-react'

const shimmerKeyframes = `@keyframes skel-shimmer{0%{opacity:.55}50%{opacity:.85}100%{opacity:.55}}`

function B({ w = '100%', h = 10, r = 5, mb = 0, accent = false }: { w?: string | number; h?: number; r?: number; mb?: number; accent?: boolean }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r, marginBottom: mb,
      background: accent ? 'rgba(22,163,74,0.18)' : '#e4eaf0',
      animation: 'skel-shimmer 2s ease-in-out infinite',
    }} />
  )
}

export default function DashboardTour() {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#f4f7fa',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Plus Jakarta Sans","Inter",-apple-system,sans-serif',
      overflow: 'hidden', fontSize: 12,
    }}>
      <style>{shimmerKeyframes}</style>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: '#ffffff', borderBottom: '1px solid #e8eef4',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg,#166534,#16a34a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><MapPin size={14} color="white" /></div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0b1220' }}>Portlink</span>
          <span style={{ fontSize: 11, color: '#6b87a0', borderLeft: '1px solid #e8eef4', paddingLeft: 8 }}>Tour Operator</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Bell size={14} color="#c0c8d2" />
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#e4eaf0' }} />
        </div>
      </div>

      {/* Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, padding: '12px 16px 0' }}>
        {[true, false, false, false].map((isAccent, i) => (
          <div key={i} style={{
            background: isAccent ? 'linear-gradient(135deg,#166534,#16a34a)' : '#ffffff',
            border: isAccent ? 'none' : '1px solid #e8eef4',
            borderRadius: 12, padding: '10px 12px',
            boxShadow: isAccent ? '0 3px 10px rgba(22,163,74,0.25)' : '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <B w={65} h={7} r={3} accent={isAccent} />
              <div style={{ width: 20, height: 20, borderRadius: 5, background: isAccent ? 'rgba(255,255,255,0.12)' : '#f4f7fa' }} />
            </div>
            <B w={i === 2 ? 36 : 26} h={18} r={4} accent={isAccent} />
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: 'flex', gap: 10, flex: 1, padding: '10px 16px', minHeight: 0, overflow: 'hidden', position: 'relative' }}>
        {/* Left column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
          {/* Booking requests skeleton */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, overflow: 'hidden', flex: 1 }}>
            <div style={{ padding: '9px 14px', borderBottom: '1px solid #e8eef4', display: 'flex', justifyContent: 'space-between' }}>
              <B w={100} h={10} r={4} />
              <B w={42} h={16} r={9} accent />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 0.6fr 1fr', padding: '6px 14px', borderBottom: '1px solid #f0f4f8' }}>
              {[32, 24, 18, 32].map((w, i) => <B key={i} w={w} h={5} r={2} />)}
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '2.5fr 1fr 0.6fr 1fr',
                padding: '7px 14px', alignItems: 'center',
                borderBottom: i < 4 ? '1px solid #f7f9fc' : 'none',
                background: i < 2 ? 'rgba(61,125,175,0.03)' : i % 2 === 0 ? '#fff' : '#fafcff',
              }}>
                <B w={`${55 + (i % 3) * 12}%`} h={8} r={3} />
                <B w={`${40 + (i % 2) * 20}%`} h={7} r={3} />
                <B w={22} h={7} r={3} />
                <B w={48} h={14} r={9} />
              </div>
            ))}
          </div>

          {/* Chart skeleton */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, padding: '10px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <B w={90} h={10} r={4} />
              <B w={80} h={8} r={3} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 56 }}>
              {[28, 41, 35, 58, 46, 72, 64].map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ width: '100%', height: 48, display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{
                      width: '100%', height: `${(v / 72) * 100}%`,
                      borderRadius: '3px 3px 2px 2px',
                      background: i === 5 ? 'rgba(22,163,74,0.3)' : '#dcfce7',
                      animation: 'skel-shimmer 2s ease-in-out infinite',
                    }} />
                  </div>
                  <B w={16} h={5} r={2} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ width: 190, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Port calendar skeleton */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '9px 12px', borderBottom: '1px solid #e8eef4' }}>
              <B w={90} h={10} r={4} />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px',
                borderBottom: i < 4 ? '1px solid #f7f9fc' : 'none',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: i < 2 ? 'rgba(22,163,74,0.4)' : 'rgba(61,125,175,0.3)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <B w={`${50 + (i % 3) * 15}%`} h={7} r={3} mb={4} />
                  <B w={`${40 + (i % 2) * 12}%`} h={5} r={2} />
                </div>
                <B w={22} h={8} r={3} />
              </div>
            ))}
          </div>

          {/* Capacity skeleton */}
          <div style={{ background: 'linear-gradient(135deg,#052e16,#14532d)', borderRadius: 12, padding: 12, flex: 1 }}>
            <B w={110} h={9} r={4} mb={12} accent />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 12 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <div style={{ width: '65%', height: 7, borderRadius: 3, background: 'rgba(255,255,255,0.1)', animation: 'skel-shimmer 2s ease-in-out infinite' }} />
                  <div style={{ width: 28, height: 7, borderRadius: 3, background: 'rgba(255,255,255,0.15)', animation: 'skel-shimmer 2s ease-in-out infinite' }} />
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 9999 }}>
                  <div style={{ height: '100%', width: `${50 + i * 17}%`, background: 'rgba(74,222,128,0.25)', borderRadius: 9999 }} />
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <div style={{ width: 36, height: 5, borderRadius: 2, background: 'rgba(255,255,255,0.06)' }} />
                  <div style={{ width: 28, height: 5, borderRadius: 2, background: 'rgba(255,255,255,0.06)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Coming soon overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, rgba(244,247,250,0.85) 0%, rgba(244,247,250,0.4) 70%, transparent 100%)',
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#166534', letterSpacing: '-0.02em' }}>
            Coming 1st of June
          </span>
        </div>
      </div>
    </div>
  )
}
