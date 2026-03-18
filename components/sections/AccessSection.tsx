'use client'

import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronRight, ChevronLeft, Ship, Anchor, Compass } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

// ── Step definitions ──────────────────────────────────────────────────────────

type StepId = 'role' | 'identity' | 'operation' | 'done'

interface WizardData {
  role: string
  name: string
  email: string
  company: string
  ports: string
  message: string
}

const roleOptions = [
  { value: 'Cruise Line',   icon: Ship,    desc: 'Fleet operations & port coordination' },
  { value: 'Port Agent',    icon: Anchor,  desc: 'Local port services & turnaround' },
  { value: 'Tour Operator', icon: Compass, desc: 'Shore excursions & bookings' },
]

// ── Animations ────────────────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
  }),
}

const stepTransition = { duration: 0.32 }

// ── Input style ───────────────────────────────────────────────────────────────

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'var(--ds-surface-2)',
  border: '1px solid var(--ds-border-1)',
  color: 'var(--ds-text-1)',
  borderRadius: '10px',
  padding: '13px 16px',
  fontSize: '15px',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
}

// ── Pilot section (sits above the form) ───────────────────────────────────────

const pilotPerks = [
  { title: 'Early access', body: 'Be among the first fleets on the platform before public launch.' },
  { title: 'Founding pricing', body: 'Lock in rates that will never be available again.' },
  { title: 'White-glove onboarding', body: 'Dedicated setup with our team — not a help article.' },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function AccessSection() {
  const sectionRef = useReveal()

  const [step, setStep] = useState<StepId>('role')
  const [dir, setDir] = useState(1) // 1 = forward, -1 = back
  const [data, setData] = useState<WizardData>({
    role: '', name: '', email: '', company: '', ports: '', message: '',
  })

  const steps: StepId[] = ['role', 'identity', 'operation']
  const stepIndex = steps.indexOf(step as Exclude<StepId, 'done'>)
  const totalSteps = steps.length

  const go = (next: StepId, direction: number) => {
    setDir(direction)
    setStep(next)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    go('done', 1)
  }

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--ds-primary)'
    e.currentTarget.style.boxShadow = '0 0 0 3px var(--ds-focus-ring, rgba(61,125,175,0.18))'
  }
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--ds-border-1)'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <section
      ref={sectionRef}
      id="access"
      style={{ background: 'var(--ds-canvas)', padding: '0 0 80px' }}
    >
      {/* ── Pilot CTA block (above form) ── */}
      <div
        className="reveal"
        style={{
          background: 'var(--ds-surface-1)',
          borderBottom: '1px solid var(--ds-border-1)',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span style={{
            fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em',
            color: 'var(--ds-primary-hover)', fontWeight: 600,
          }}>
            Founding fleet program
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700,
            color: 'var(--ds-text-1)', margin: '14px 0 16px',
          }}>
            Get your fleet on Portlink first
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--ds-text-2)', lineHeight: 1.65, marginBottom: '48px', maxWidth: '560px', margin: '0 auto 48px' }}>
            We&apos;re onboarding a small group of cruise operators for our Q3 2025 pilot. Limited spots. No obligation.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            textAlign: 'left',
          }}>
            {pilotPerks.map((perk) => (
              <div key={perk.title} style={{
                background: 'var(--ds-surface-2)',
                border: '1px solid var(--ds-border-1)',
                borderRadius: '14px',
                padding: '24px 20px',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--ds-primary)', marginBottom: 14,
                }} />
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ds-text-1)', marginBottom: 6 }}>
                  {perk.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--ds-text-2)', lineHeight: 1.6, margin: 0 }}>
                  {perk.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Wizard form ── */}
      <div
        className="reveal"
        style={{ maxWidth: '540px', margin: '0 auto', padding: '64px 24px 0' }}
      >
        <AnimatePresence mode="wait" custom={dir}>
          {step === 'done' ? (
            <motion.div
              key="done"
              custom={1}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
              style={{ textAlign: 'center', padding: '48px 24px' }}
            >
              <CheckCircle size={52} color="var(--ds-primary)" style={{ display: 'block', margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--ds-text-1)', marginBottom: 12 }}>
                You&apos;re in the queue
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--ds-text-2)', lineHeight: 1.65 }}>
                We&apos;ll review your application and get back to <strong style={{ color: 'var(--ds-text-1)' }}>{data.email}</strong> within 48 hours.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form">
              {/* Progress bar */}
              {stepIndex >= 0 && (
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: 'var(--ds-text-3)', fontWeight: 500 }}>
                      Step {stepIndex + 1} of {totalSteps}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--ds-text-3)' }}>
                      {step === 'role' ? 'Your role' : step === 'identity' ? 'About you' : 'Your operation'}
                    </span>
                  </div>
                  <div style={{
                    height: 3, background: 'var(--ds-border-1)',
                    borderRadius: 9999, overflow: 'hidden',
                  }}>
                    <motion.div
                      animate={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      style={{ height: '100%', background: 'var(--ds-primary)', borderRadius: 9999 }}
                    />
                  </div>
                </div>
              )}

              {/* Step content */}
              <AnimatePresence mode="wait" custom={dir}>
                {step === 'role' && (
                  <motion.div
                    key="role"
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={stepTransition}
                  >
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ds-text-1)', marginBottom: 8 }}>
                      Who are you?
                    </h3>
                    <p style={{ fontSize: 15, color: 'var(--ds-text-2)', marginBottom: 28, lineHeight: 1.5 }}>
                      We tailor the onboarding to your role.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {roleOptions.map((opt) => {
                        const Icon = opt.icon
                        const isSelected = data.role === opt.value
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setData(d => ({ ...d, role: opt.value }))
                              setTimeout(() => go('identity', 1), 160)
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 16,
                              padding: '18px 20px',
                              borderRadius: 14,
                              border: `1.5px solid ${isSelected ? 'var(--ds-primary)' : 'var(--ds-border-1)'}`,
                              background: isSelected ? 'rgba(61,125,175,0.08)' : 'var(--ds-surface-1)',
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontFamily: 'inherit',
                              transition: 'border-color 0.18s, background 0.18s',
                              width: '100%',
                            }}
                            onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.borderColor = 'var(--ds-primary)' }}
                            onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = 'var(--ds-border-1)' }}
                          >
                            <span style={{
                              width: 42, height: 42, borderRadius: 10,
                              background: 'var(--ds-surface-2)',
                              border: '1px solid var(--ds-border-1)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0,
                            }}>
                              <Icon size={18} color="var(--ds-primary)" />
                            </span>
                            <span>
                              <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: 'var(--ds-text-1)', marginBottom: 2 }}>
                                {opt.value}
                              </span>
                              <span style={{ fontSize: 13, color: 'var(--ds-text-3)' }}>{opt.desc}</span>
                            </span>
                            <ChevronRight size={16} color="var(--ds-text-3)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 'identity' && (
                  <motion.form
                    key="identity"
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={stepTransition}
                    onSubmit={(e) => { e.preventDefault(); go('operation', 1) }}
                  >
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ds-text-1)', marginBottom: 8 }}>
                      About you
                    </h3>
                    <p style={{ fontSize: 15, color: 'var(--ds-text-2)', marginBottom: 28, lineHeight: 1.5 }}>
                      How should we reach you?
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      {[
                        { name: 'name' as const, label: 'Full name', type: 'text', placeholder: 'Jane Smith', auto: 'name' },
                        { name: 'email' as const, label: 'Work email', type: 'email', placeholder: 'jane@cruiseline.com', auto: 'email' },
                        { name: 'company' as const, label: 'Company', type: 'text', placeholder: 'Your company name', auto: 'organization' },
                      ].map((f) => (
                        <div key={f.name}>
                          <label htmlFor={f.name} style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--ds-text-2)', marginBottom: 6 }}>
                            {f.label}
                          </label>
                          <input
                            id={f.name}
                            type={f.type}
                            placeholder={f.placeholder}
                            autoComplete={f.auto}
                            required
                            value={data[f.name]}
                            onChange={(e) => setData(d => ({ ...d, [f.name]: e.target.value }))}
                            style={inputBase}
                            onFocus={focusStyle}
                            onBlur={blurStyle}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                      <button type="button" onClick={() => go('role', -1)} style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: 'transparent', border: '1px solid var(--ds-border-1)',
                        color: 'var(--ds-text-2)', borderRadius: 9999,
                        padding: '12px 20px', cursor: 'pointer', fontFamily: 'inherit',
                        fontSize: 14, fontWeight: 500, transition: 'border-color 0.2s',
                      }}>
                        <ChevronLeft size={15} /> Back
                      </button>
                      <button type="submit" style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        background: 'var(--ds-primary)', color: 'var(--ds-primary-ink)',
                        borderRadius: 9999, padding: '12px 24px',
                        fontWeight: 600, fontSize: 15, border: 'none',
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
                      }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--ds-primary-hover)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--ds-primary)')}
                      >
                        Continue <ChevronRight size={15} />
                      </button>
                    </div>
                  </motion.form>
                )}

                {step === 'operation' && (
                  <motion.form
                    key="operation"
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={stepTransition}
                    onSubmit={handleSubmit}
                  >
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ds-text-1)', marginBottom: 8 }}>
                      Your operation
                    </h3>
                    <p style={{ fontSize: 15, color: 'var(--ds-text-2)', marginBottom: 28, lineHeight: 1.5 }}>
                      Last step — tell us about your ports and use case.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <div>
                        <label htmlFor="ports" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--ds-text-2)', marginBottom: 6 }}>
                          Key ports <span style={{ color: 'var(--ds-text-3)', fontWeight: 400 }}>(optional)</span>
                        </label>
                        <input
                          id="ports" type="text"
                          placeholder="e.g. Barcelona, Miami, Piraeus"
                          value={data.ports}
                          onChange={(e) => setData(d => ({ ...d, ports: e.target.value }))}
                          style={inputBase}
                          onFocus={focusStyle}
                          onBlur={blurStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor="message" style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--ds-text-2)', marginBottom: 6 }}>
                          Anything else? <span style={{ color: 'var(--ds-text-3)', fontWeight: 400 }}>(optional)</span>
                        </label>
                        <textarea
                          id="message"
                          placeholder="Tell us about your use case or challenges..."
                          rows={4}
                          value={data.message}
                          onChange={(e) => setData(d => ({ ...d, message: e.target.value }))}
                          style={{ ...inputBase, resize: 'vertical' }}
                          onFocus={focusStyle as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                          onBlur={blurStyle as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                      <button type="button" onClick={() => go('identity', -1)} style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: 'transparent', border: '1px solid var(--ds-border-1)',
                        color: 'var(--ds-text-2)', borderRadius: 9999,
                        padding: '12px 20px', cursor: 'pointer', fontFamily: 'inherit',
                        fontSize: 14, fontWeight: 500, transition: 'border-color 0.2s',
                      }}>
                        <ChevronLeft size={15} /> Back
                      </button>
                      <button type="submit" style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        background: 'var(--ds-primary)', color: 'var(--ds-primary-ink)',
                        borderRadius: 9999, padding: '12px 24px',
                        fontWeight: 600, fontSize: 15, border: 'none',
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
                      }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--ds-primary-hover)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--ds-primary)')}
                      >
                        Request access <ChevronRight size={15} />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
