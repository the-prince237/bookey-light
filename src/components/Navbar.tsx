'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isBook = pathname === '/' || pathname === '/livre'
  const isMusic = pathname.startsWith('/music')

  const navLink = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      style={{
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: 3,
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: active ? '#C9953A' : 'rgba(245,240,232,0.6)',
        borderBottom: active ? '1px solid #C9953A' : '1px solid transparent',
        paddingBottom: 2,
        transition: 'color 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </Link>
  )

  return (
    <>
      {/* Fixed colour bar */}
      <div
        className="flag-bar"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      />

      {/* Nav bar */}
      <nav
        style={{
          position: 'fixed',
          top: 3,
          left: 0,
          right: 0,
          zIndex: 49,
          padding: scrolled ? '12px 24px' : '16px 24px',
          background: 'rgba(8,15,13,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201,149,58,0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'padding 0.3s',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span
            className="font-bebas"
            style={{ fontSize: 20, letterSpacing: 3, color: '#C9953A' }}
          >
            PIB ETO&apos;O{' '}
            <span
              style={{ color: 'rgba(245,240,232,0.3)', fontSize: 13, letterSpacing: 2 }}
            >
              · MESSINA
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLink('/', 'Le Livre', isBook)}
          {navLink('/music', 'Musique', isMusic)}
          <a
            href="/#contact"
            style={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#080F0D',
              background: '#C9953A',
              padding: '10px 22px',
              textDecoration: 'none',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#E8C06A')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#C9953A')}
          >
            Commander
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex cursor-pointer border-none bg-none p-1 text-[#C9953A] lg:hidden"
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(8,15,13,0.98)',
            zIndex: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 44,
          }}
        >
          {[
            { href: '/', label: 'Le Livre' },
            { href: '/music', label: 'Musique' },
            { href: '/#contact', label: 'Commander' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-bebas"
              style={{
                fontSize: 52,
                letterSpacing: 4,
                color: '#F5F0E8',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C9953A')}
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
