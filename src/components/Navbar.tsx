'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const G = '#C9953A'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const path = usePathname()
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', f)
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => setOpen(false), [path])
  const isActive = (p: string) => (p === '/' ? path === '/' : path.startsWith(p))
  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      style={{
        fontFamily: 'Raleway',
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: 3,
        textTransform: 'uppercase' as const,
        textDecoration: 'none',
        color: isActive(href) ? G : 'rgba(245,240,232,.55)',
        borderBottom: isActive(href) ? '1px solid ' + G : '1px solid transparent',
        paddingBottom: 2,
        transition: 'color .2s',
        whiteSpace: 'nowrap' as const,
      }}
    >
      {label}
    </Link>
  )
  return (
    <>
      <div
        className="flag-bar"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      />
      <nav
        style={{
          position: 'fixed',
          top: 3,
          left: 0,
          right: 0,
          zIndex: 49,
          padding: scrolled ? '12px 24px' : '16px 24px',
          background: 'rgba(8,15,13,.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201,149,58,.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'padding .3s',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span
            className="font-bebas"
            style={{ fontSize: 20, letterSpacing: 3, color: G }}
          >
            PIB ETO&apos;O{' '}
            <span style={{ color: 'rgba(245,240,232,.28)', fontSize: 13 }}>
              · MESSINA
            </span>
          </span>
        </Link>
        <div
          className="hide-mobile"
          style={{ display: 'flex', alignItems: 'center', gap: 28 }}
        >
          {navLink('/', 'Le Livre')}
          {navLink('/boutique', 'Boutique')}
          {navLink('/musique', 'Musique')}
          <a
            href="/#contact"
            style={{
              fontFamily: 'Raleway',
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#080F0D',
              background: G,
              padding: '10px 20px',
              textDecoration: 'none',
              transition: 'background .2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#E8C06A')}
            onMouseLeave={(e) => (e.currentTarget.style.background = G)}
          >
            Commander
          </a>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="show-mobile"
          style={{
            color: G,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
          }}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(8,15,13,.98)',
            zIndex: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
          }}
        >
          {[
            { href: '/', label: 'Le Livre' },
            { href: '/boutique', label: 'Boutique' },
            { href: '/musique', label: 'Musique' },
            { href: '/#contact', label: 'Commander' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-bebas"
              style={{
                fontSize: 52,
                letterSpacing: 4,
                color: '#F5F0E8',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = G)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F0E8')}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
