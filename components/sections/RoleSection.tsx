'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { ContainerScroll } from '@/components/ContainerScroll'
import DashboardMockup from '@/components/DashboardMockup'
import type { Persona } from '@/app/page'

type RoleKey = 'cruise' | 'agent' | 'tour'

interface RoleData {
  label: string
  tagline: string
  headline: string
  body: string
  features: string[]
}

const roleData: Record<RoleKey, RoleData> = {
  cruise: {
    label: 'Cruise Line',
    tagline: 'Fleet-wide coordination',
    headline: 'Your entire fleet. One dashboard.',
    body: 'Monitor every port call across your fleet in real time. See preparation status, service confirmations, and schedule changes — without chasing emails.',
    features: [
      'Fleet-wide port call overview',
      'Real-time status per vessel',
      'Automated service confirmations',
      'Direct channel to port agents',
      'Shore excursion visibility',
    ],
  },
  agent: {
    label: 'Port Agent',
    tagline: 'Port Operations Hub',
    headline: 'Every vessel arrival. Fully organized.',
    body: 'Manage all incoming vessels, coordinate services, and communicate with cruise lines and tour operators — from one hub instead of scattered inboxes.',
    features: [
      'Vessel arrival management',
      'Service coordination dashboard',
      'Tour operator integration',
      'Automated status updates',
      'Document sharing & versioning',
    ],
  },
  tour: {
    label: 'Tour Operator',
    tagline: 'Shore Excursions Management',
    headline: 'List once. Coordinate automatically.',
    body: 'Publish your excursions to the platform. Get bookings from cruise lines and agents automatically — no more email back-and-forth for every single voyage.',
    features: [
      'One-time excursion listing',
      'Automatic booking flow',
      'Real-time passenger counts',
      'Schedule change notifications',
      'Direct cruise line channel',
    ],
  },
}

const tabs: RoleKey[] = ['cruise', 'agent', 'tour']

function RoleContent({ role }: { role: RoleKey }) {
  const data = roleData[role]
  return (
    <div>
      <ContainerScroll
        titleComponent={
          <div>
            <span
              style={{
                display: 'inline-block',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--ds-primary-hover)',
                fontWeight: 500,
                marginBottom: '12px',
              }}
            >
              {data.tagline}
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--ds-text-1)',
                margin: '0 0 16px',
                lineHeight: 1.2,
              }}
            >
              {data.headline}
            </h3>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--ds-text-2)',
                lineHeight: 1.6,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              {data.body}
            </p>
          </div>
        }
      >
        <DashboardMockup />
      </ContainerScroll>

      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px 32px',
          marginTop: '20px',
          padding: 0,
        }}
      >
        {data.features.map((f) => (
          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={18} color="var(--ds-primary)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '15px', color: 'var(--ds-text-1)' }}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function RoleSection({ persona }: { persona: Persona }) {
  const [activeTab, setActiveTab] = useState<RoleKey>('cruise')
  const sectionRef = useReveal()

  const isSingle = persona !== 'all'
  const singleRole = persona as RoleKey

  return (
    <section
      ref={sectionRef}
      id="roles"
      style={{ background: 'var(--ds-canvas)', paddingTop: '48px', paddingBottom: '24px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section header — only shown in "all" mode. Single persona gets title from ContainerScroll */}
        {!isSingle && (
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              className="reveal"
              style={{
                display: 'inline-block',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--ds-primary-hover)',
                fontWeight: 500,
              }}
            >
              Built for your role
            </span>
            <h2
              className="reveal"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: 'var(--ds-text-1)',
                margin: '12px 0',
              }}
            >
              Three roles. One platform.
            </h2>
          </div>
        )}

        {!isSingle && (
          <div
            className="reveal"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              marginBottom: '48px',
              borderBottom: '1px solid var(--ds-border-1)',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'inherit',
                  color: activeTab === tab ? 'var(--ds-accent)' : 'var(--ds-text-2)',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  paddingBottom: '12px',
                  borderBottom: activeTab === tab ? '2px solid var(--ds-accent)' : '2px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                {roleData[tab].label}
              </button>
            ))}
          </div>
        )}

        <div className="reveal">
          {isSingle ? (
            <RoleContent role={singleRole} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <RoleContent role={activeTab} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  )
}
