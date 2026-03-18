'use client'

import { Anchor, Compass } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Persona } from '@/app/page'

type RoleKey = 'cruise' | 'agent' | 'tour'

interface PartnerCard {
  icon: typeof Anchor
  title: string
  body: string
}

const ecosystemData: Record<RoleKey, { headline: string; desc: string; partners: PartnerCard[] }> = {
  cruise: {
    headline: 'Your ecosystem, connected',
    desc: 'Portlink connects your fleet operations with the local stakeholders who make port calls happen.',
    partners: [
      {
        icon: Anchor,
        title: 'Port Agents',
        body: 'Direct coordination channel with local agents. See their preparation status, share requirements, confirm services — all in real time.',
      },
      {
        icon: Compass,
        title: 'Tour Operators',
        body: 'Browse available shore excursions, manage bookings, and get automatic updates on capacity and schedule changes.',
      },
    ],
  },
  agent: {
    headline: 'Connected to the vessels you serve',
    desc: 'Portlink puts you in direct communication with cruise line operations teams — no more email chains.',
    partners: [
      {
        icon: Anchor,
        title: 'Cruise Line Ops',
        body: 'Receive structured requirements directly. Confirm readiness, flag issues, and communicate changes through a single shared channel.',
      },
      {
        icon: Compass,
        title: 'Port Authorities',
        body: 'Coordinate berth bookings and port state control requirements with live status updates visible to all stakeholders.',
      },
    ],
  },
  tour: {
    headline: 'Plugged into the cruise calendar',
    desc: 'See vessel arrivals, manage capacity, and receive bookings automatically — all synced to live cruise schedules.',
    partners: [
      {
        icon: Anchor,
        title: 'Cruise Lines',
        body: 'Get discovered by cruise shore excursion managers. Receive booking requests, confirm availability, and manage changes in one place.',
      },
      {
        icon: Compass,
        title: 'Port Agents',
        body: 'Coordinate local logistics with port agents who are already on Portlink — no duplicate communication.',
      },
    ],
  },
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05, duration: 0.4 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function EcosystemSection({ persona }: { persona: Persona }) {
  if (persona === 'all') return null

  const data = ecosystemData[persona as RoleKey]

  return (
    // key on persona ensures full remount + fresh animation on persona switch
    <motion.section
      key={persona}
      initial="hidden"
      animate="show"
      variants={container}
      style={{ background: 'var(--ds-surface-2)', padding: '120px 24px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div variants={item} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--ds-primary-hover)',
              fontWeight: 500,
            }}
          >
            Ecosystem
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--ds-text-1)',
              margin: '12px 0 16px',
            }}
          >
            {data.headline}
          </h2>
          <p
            style={{ fontSize: '16px', color: 'var(--ds-text-2)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
          >
            {data.desc}
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {data.partners.map((partner) => {
            const Icon = partner.icon
            return (
              <motion.div
                key={partner.title}
                variants={item}
                style={{
                  background: 'var(--ds-surface-1)',
                  border: '1px solid var(--ds-border-1)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ds-primary)'
                  e.currentTarget.style.boxShadow = '0 0 20px var(--ds-focus-ring, rgba(61,125,175,0.15))'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ds-border-1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon size={24} color="var(--ds-accent)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ds-text-1)', marginBottom: '8px' }}>
                  {partner.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ds-text-2)', lineHeight: 1.6, margin: 0 }}>{partner.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
