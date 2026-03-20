'use client'

import { useState, useCallback } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'

const links = [
  { label: 'Problem', href: '#pain' },
  { label: 'Roles', href: '#roles' },
  { label: 'Platform', href: '#how' },
  { label: 'Pilot', href: '#pilot' },
  { label: 'Access', href: '#access' },
]

/** Native smooth scroll to anchor */
function smoothScrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

type NavProps = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export default function Nav({ theme, setTheme }: NavProps) {
  const [open, setOpen] = useState(false)

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'var(--ds-nav-glass)',
        borderBottom: '1px solid var(--ds-border-1)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <img src="/portlink-logo.png" alt="Portlink" className="logo-img" style={{ height: '28px' }} />
        </a>

        {/* Desktop links */}
        <div
          className="nav-links-desktop"
          style={{
            display: 'flex',
            gap: '28px',
            alignItems: 'center',
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); smoothScrollTo(link.href) }}
              style={{
                color: 'var(--ds-text-2)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ds-text-1)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ds-text-2)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Theme toggle + CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '9999px',
              border: '1px solid var(--ds-border-1)',
              background: 'transparent',
              color: 'var(--ds-text-2)',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#access"
            onClick={(e) => { e.preventDefault(); smoothScrollTo('#access') }}
            className="nav-cta-desktop"
            style={{
              background: 'var(--ds-primary)',
              color: 'var(--ds-primary-ink)',
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--ds-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--ds-primary)')}
          >
            Request Access
          </a>

          <button
            className="nav-hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--ds-text-1)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="nav-mobile-menu"
          style={{
            background: 'var(--ds-nav-glass)',
            borderTop: '1px solid var(--ds-border-1)',
            padding: '16px 24px',
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); setOpen(false); smoothScrollTo(link.href) }}
              style={{
                display: 'block',
                padding: '12px 0',
                color: 'var(--ds-text-2)',
                textDecoration: 'none',
                fontSize: '16px',
                borderBottom: '1px solid var(--ds-border-1)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#access"
            onClick={(e) => { e.preventDefault(); setOpen(false); smoothScrollTo('#access') }}
            style={{
              display: 'inline-block',
              marginTop: '16px',
              background: 'var(--ds-primary)',
              color: 'var(--ds-primary-ink)',
              padding: '10px 24px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Request Access
          </a>
        </div>
      )}
    </nav>
  )
}
