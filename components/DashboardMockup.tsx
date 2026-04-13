'use client'

import { Anchor, Bell, ChevronDown, Search } from 'lucide-react'

const shimmerKeyframes = `@keyframes skel-shimmer{0%{opacity:.55}50%{opacity:.85}100%{opacity:.55}}`

function B({ w = '100%', h = 10, r = 5, mb = 0, accent = false }: { w?: string | number; h?: number; r?: number; mb?: number; accent?: boolean }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r, marginBottom: mb,
      background: accent ? 'rgba(61,125,175,0.18)' : '#e4eaf0',
      animation: 'skel-shimmer 2s ease-in-out infinite',
    }} />
  )
}

function TopBar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 16px', background: '#ffffff', borderBottom: '1px solid #e8eef4', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'linear-gradient(135deg, #3d7daf, #295c85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Anchor size={14} color="white" /></div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0b1220' }}>Portlink</span>
      </div>
      <div style={{
        flex: 1, maxWidth: 280,
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#f4f7fa', border: '1px solid #dde5ee', borderRadius: 8, padding: '5px 10px',
      }}>
        <Search size={12} color="#c0c8d2" />
        <B w={120} h={8} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, background: '#f4f7fa', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={13} color="#c0c8d2" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#e4eaf0' }} />
          <ChevronDown size={12} color="#c0c8d2" />
        </div>
      </div>
    </div>
  )
}

function StatCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
      {[true, false, false, false].map((accent, i) => (
        <div key={i} style={{
          background: accent ? 'linear-gradient(135deg, #3d7daf, #295c85)' : '#ffffff',
          border: accent ? 'none' : '1px solid #e8eef4',
          borderRadius: 12, padding: '12px 14px',
          boxShadow: accent ? '0 4px 16px rgba(61,125,175,0.25)' : '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <B w={70} h={8} r={4} accent={accent} />
            <div style={{ width: 24, height: 24, borderRadius: 6, background: accent ? 'rgba(255,255,255,0.15)' : '#f4f7fa' }} />
          </div>
          <B w={36} h={18} r={4} accent={accent} mb={6} />
          <B w={56} h={7} r={3} accent={accent} />
        </div>
      ))}
    </div>
  )
}

function TableSkeleton() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, overflow: 'hidden', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #e8eef4' }}>
        <B w={110} h={10} r={4} />
        <div style={{ display: 'flex', gap: 6 }}>
          <B w={32} h={18} r={9} accent />
          <B w={40} h={18} r={9} />
          <B w={52} h={18} r={9} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.2fr 0.8fr 1fr', padding: '8px 16px', borderBottom: '1px solid #f0f4f8' }}>
        {[50, 40, 36, 24, 42].map((w, i) => <B key={i} w={w} h={6} r={3} />)}
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.2fr 0.8fr 1fr',
          padding: '9px 16px', alignItems: 'center',
          borderBottom: i < 5 ? '1px solid #f7f9fc' : 'none',
          background: i % 2 === 0 ? '#fff' : '#fafcff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: '#e8f0f8', flexShrink: 0 }} />
            <B w={`${60 + (i % 3) * 12}%`} h={8} r={3} />
          </div>
          <B w={`${50 + (i % 2) * 20}%`} h={8} r={3} />
          <B w={`${45 + (i % 3) * 10}%`} h={7} r={3} />
          <B w={28} h={8} r={3} />
          <B w={52} h={16} r={9} />
        </div>
      ))}
    </div>
  )
}

function ChartSkeleton() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, padding: '14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
        <B w={100} h={10} r={4} />
        <B w={80} h={8} r={3} />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 72 }}>
        {[42, 67, 55, 80, 63, 91, 74].map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', height: 60, display: 'flex', alignItems: 'flex-end' }}>
              <div style={{
                width: '100%', height: `${(v / 91) * 100}%`,
                borderRadius: '4px 4px 2px 2px',
                background: i === 5 ? 'rgba(61,125,175,0.25)' : '#e8f0f8',
                animation: 'skel-shimmer 2s ease-in-out infinite',
              }} />
            </div>
            <B w={16} h={6} r={2} />
          </div>
        ))}
      </div>
    </div>
  )
}

function SidePanelSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 200, flexShrink: 0 }}>
      <div style={{ background: '#fff', border: '1px solid #e8eef4', borderRadius: 12, padding: 12, flex: 1 }}>
        <B w={50} h={9} r={4} mb={12} />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ padding: '8px 0', marginBottom: i < 2 ? 6 : 0 }}>
            <B w="90%" h={7} r={3} mb={5} />
            <B w="60%" h={6} r={3} />
          </div>
        ))}
      </div>
      <div style={{ background: 'linear-gradient(135deg, #0b1220, #1a2d42)', borderRadius: 12, padding: 12 }}>
        <B w={90} h={9} r={4} mb={12} accent />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 10 : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <div style={{ width: '55%', height: 7, borderRadius: 3, background: 'rgba(255,255,255,0.12)', animation: 'skel-shimmer 2s ease-in-out infinite' }} />
              <div style={{ width: 18, height: 7, borderRadius: 3, background: 'rgba(255,255,255,0.15)', animation: 'skel-shimmer 2s ease-in-out infinite' }} />
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 9999 }}>
              <div style={{ height: '100%', width: `${30 + i * 20}%`, background: 'rgba(91,163,204,0.3)', borderRadius: 9999 }} />
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
      width: '100%', height: '100%', background: '#f4f7fa',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Plus Jakarta Sans","Inter",-apple-system,sans-serif',
      overflow: 'hidden', fontSize: 12,
    }}>
      <style>{shimmerKeyframes}</style>
      <TopBar />
      <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden', minHeight: 0, position: 'relative' }}>
        <StatCards />
        <div style={{ display: 'flex', gap: 12, flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }}>
            <TableSkeleton />
            <ChartSkeleton />
          </div>
          <SidePanelSkeleton />
        </div>
        {/* Coming soon overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, rgba(244,247,250,0.85) 0%, rgba(244,247,250,0.4) 70%, transparent 100%)',
          pointerEvents: 'none',
        }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#295c85', letterSpacing: '-0.02em' }}>
            Coming 1st of June
          </span>
        </div>
      </div>
    </div>
  )
}
