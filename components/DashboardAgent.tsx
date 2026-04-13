'use client'

import { Anchor, Bell } from 'lucide-react'

const shimmerKeyframes = `@keyframes skel-shimmer{0%{opacity:.55}50%{opacity:.85}100%{opacity:.55}}`

function B({ w = '100%', h = 10, r = 5, mb = 0, accent = false }: { w?: string | number; h?: number; r?: number; mb?: number; accent?: boolean }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r, marginBottom: mb,
      background: accent ? 'rgba(45,106,152,0.18)' : '#e4eaf0',
      animation: 'skel-shimmer 2s ease-in-out infinite',
    }} />
  )
}

export default function DashboardAgent() {
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
            background: 'linear-gradient(135deg, #1a4a6b, #2d6a98)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Anchor size={14} color="white" /></div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0b1220' }}>Portlink</span>
          <span style={{ fontSize: 11, color: '#6b87a0', borderLeft: '1px solid #e8eef4', paddingLeft: 8 }}>Port Agent</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Bell size={14} color="#c0c8d2" />
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#e4eaf0' }} />
        </div>
      </div>

      {/* Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, padding: '12px 16px 0' }}>
        {[true, false, false, false].map((accent, i) => (
          <div key={i} style={{
            background: accent ? 'linear-gradient(135deg,#1a4a6b,#2d6a98)' : '#ffffff',
            border: accent ? 'none' : '1px solid #e8eef4',
            borderRadius: 12, padding: '10px 12px',
            boxShadow: accent ? '0 3px 10px rgba(26,74,107,0.25)' : '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <B w={60} h={7} r={3} accent={accent} />
              <div style={{ width: 20, height: 20, borderRadius: 5, background: accent ? 'rgba(255,255,255,0.12)' : '#f4f7fa' }} />
            </div>
            <B w={30} h={18} r={4} accent={accent} />
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: 'flex', gap: 10, flex: 1, padding: '10px 16px', minHeight: 0, overflow: 'hidden', position: 'relative' }}>
        {/* Left column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
          {/* Vessel arrivals skeleton */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, overflow: 'hidden', flex: 1 }}>
            <div style={{ padding: '9px 14px', borderBottom: '1px solid #e8eef4', display: 'flex', justifyContent: 'space-between' }}>
              <B w={90} h={10} r={4} />
              <B w={50} h={16} r={9} accent />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1fr', padding: '6px 14px', borderBottom: '1px solid #f0f4f8' }}>
              {[40, 24, 28, 22, 36].map((w, i) => <B key={i} w={w} h={5} r={2} />)}
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 0.8fr 1fr',
                padding: '8px 14px', alignItems: 'center',
                borderBottom: i < 3 ? '1px solid #f7f9fc' : 'none',
                background: i % 2 === 0 ? '#fff' : '#fafcff',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 5, background: '#e8f0f8', flexShrink: 0 }} />
                  <B w={`${55 + (i % 3) * 14}%`} h={8} r={3} />
                </div>
                <B w={`${40 + (i % 2) * 18}%`} h={7} r={3} />
                <B w={28} h={7} r={3} />
                <B w={24} h={7} r={3} />
                <B w={46} h={14} r={9} />
              </div>
            ))}
          </div>

          {/* Service orders skeleton */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '9px 14px', borderBottom: '1px solid #e8eef4' }}>
              <B w={80} h={10} r={4} />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '7px 14px',
                borderBottom: i < 4 ? '1px solid #f7f9fc' : 'none',
                background: i % 2 === 0 ? '#fff' : '#fafcff',
              }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: '#f0f4f8', flexShrink: 0 }} />
                <B w={56} h={8} r={3} />
                <B w={80} h={7} r={3} />
                <B w={28} h={7} r={3} />
                <B w={50} h={14} r={9} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ width: 190, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* PDA skeleton */}
          <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, overflow: 'hidden', flex: 1 }}>
            <div style={{ padding: '9px 12px', borderBottom: '1px solid #e8eef4' }}>
              <B w={70} h={10} r={4} />
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ padding: '9px 12px', borderBottom: i < 2 ? '1px solid #f0f4f8' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <B w={70} h={7} r={3} />
                  <B w={42} h={14} r={9} />
                </div>
                <B w={50} h={10} r={3} />
              </div>
            ))}
          </div>

          {/* Checklist skeleton */}
          <div style={{ background: 'linear-gradient(135deg,#0b1220,#1a2d42)', borderRadius: 12, padding: 12 }}>
            <B w={130} h={9} r={4} mb={12} accent />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: i < 3 ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
                <div style={{ width: `${50 + (i % 3) * 14}%`, height: 7, borderRadius: 3, background: 'rgba(255,255,255,0.1)', animation: 'skel-shimmer 2s ease-in-out infinite' }} />
              </div>
            ))}
            <div style={{ marginTop: 10, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 9999 }}>
              <div style={{ height: '100%', width: '60%', background: 'rgba(74,222,128,0.25)', borderRadius: 9999 }} />
            </div>
          </div>
        </div>
        {/* Coming soon overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, rgba(244,247,250,0.85) 0%, rgba(244,247,250,0.4) 70%, transparent 100%)',
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#1a4a6b', letterSpacing: '-0.02em' }}>
            Coming 1st of June
          </span>
        </div>
      </div>
    </div>
  )
}
