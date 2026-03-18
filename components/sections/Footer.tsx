'use client'

const navLinks = {
  Product: [
    { label: 'Features', href: '#how' },
    { label: 'Roles', href: '#roles' },
    { label: 'Pilot Program', href: '#pilot' },
    { label: 'Request Access', href: '#access' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#access' },
    { label: 'Privacy', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--ds-canvas)',
        borderTop: '1px solid var(--ds-border-1)',
        padding: '64px 24px 32px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '48px',
        }}
        className="footer-grid"
      >
        {/* Logo + tagline */}
        <div>
          <div style={{ marginBottom: '12px' }}>
            <img
              src="/portlink-logo.png"
              alt="Portlink"
              className="logo-img"
              style={{ height: '28px' }}
            />
          </div>
          <p style={{ fontSize: '14px', color: 'var(--ds-text-3)', lineHeight: 1.6, maxWidth: '300px' }}>
            The port call platform. Connecting cruise lines, port agents, and tour operators in one shared workspace.
          </p>
        </div>

        {/* Nav columns */}
        {Object.entries(navLinks).map(([category, links]) => (
          <div key={category}>
            <h4
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--ds-text-2)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}
            >
              {category}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--ds-text-3)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ds-text-1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ds-text-3)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '48px auto 0',
          borderTop: '1px solid var(--ds-border-1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p style={{ fontSize: '13px', color: 'var(--ds-text-3)' }}>
          © {new Date().getFullYear()} PortLink AS. All rights reserved.
        </p>
        <p style={{ fontSize: '13px', color: 'var(--ds-text-3)' }}>
          Made in Oslo, Norway
        </p>
      </div>
    </footer>
  )
}
