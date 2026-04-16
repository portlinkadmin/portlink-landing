'use client'

import { Anchor, Compass, Ship } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Persona } from '@/app/page'

type RoleKey = 'cruise' | 'agent' | 'tour'

interface PartnerCard {
  icon: typeof Anchor | typeof Ship | typeof Compass
  title: string
  body: string
}

const ecosystemData: Record<RoleKey, { headline: string; desc: string; partners: PartnerCard[] }> = {
  cruise: {
    headline: 'Your fleet, connected',
    desc: 'Port agents and tour operators on Portlink receive your requirements directly, confirm readiness in a shared workspace, and flag issues before they become surprises at the quay.',
    partners: [
      {
        icon: Anchor,
        title: 'Port Agents',
        body: 'Receive structured requirements, confirm readiness, and flag issues through one shared channel. No email chains.',
      },
      {
        icon: Compass,
        title: 'Tour Operators',
        body: 'Tour operators manage their own bookings inside Portlink, giving you oversight without the admin burden.',
      },
    ],
  },
  agent: {
    headline: 'Connected to every cruise line you serve',
    desc: 'Receive structured requirements, submit PDAs, and communicate changes through one platform. No separate portals, no duplicate data entry.',
    partners: [
      {
        icon: Ship,
        title: 'Cruise Line Ops',
        body: 'Cruise line ops push itineraries and manifest updates directly into Portlink. No more email attachments, no more manual entry.',
      },
      {
        icon: Compass,
        title: 'Tour Operators',
        body: 'Tour operators handle their own bookings and logistics inside Portlink. You get visibility without playing middleman.',
      },
    ],
  },
  tour: {
    headline: 'Connected to the cruise calendar',
    desc: 'See confirmed port calls early enough to prepare capacity. Receive booking briefs in a consistent format. Manage changes through one channel that every side can see.',
    partners: [
      {
        icon: Ship,
        title: 'Cruise Lines',
        body: 'Portlink pulls schedule and manifest data directly from cruise line ops so your booking counts and timing are always accurate.',
      },
      {
        icon: Anchor,
        title: 'Port Agents',
        body: 'Portlink keeps port agents in the loop on your tours. Pickup timing, passenger counts, and logistics flow automatically.',
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
      style={{ background: 'var(--surface)', padding: '120px 24px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div variants={item} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              fontWeight: 500,
            }}
          >
            Ecosystem
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '12px 0 16px',
            }}
          >
            {data.headline}
          </h2>
          <p
            style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
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
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  transition: 'border-color var(--ds-dur-3) var(--ds-ease-standard)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--text-muted)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <Icon size={24} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {partner.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{partner.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
