'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Play, Music, Clock, ShoppingCart } from 'lucide-react'
import { Navbar, PaymentModal, Reveal } from '@/components'
import { albumData, tracks } from '@/data'
import { formatCurrency } from '@/lib'

const G = '#C9953A'
const GD = '#0B3D2E'
const CRM = '#F5F0E8'
const DRK = '#080F0D'

export default function MusicPage() {
  const [albumPayOpen, setAlbumPayOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <>
      <Navbar />
      <PaymentModal
        isOpen={albumPayOpen}
        onClose={() => setAlbumPayOpen(false)}
        itemTitle={albumData.title}
        itemType="album"
        amount={albumData.albumPrice}
        currency={albumData.currency}
        itemId="pib-etoo-album-complet"
      />

      {/* ══ HERO ══ */}
      <section
        className="music-hero px-page"
        style={{ background: DRK, position: 'relative', overflow: 'hidden' }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(45deg,transparent,transparent 80px,rgba(201,149,58,.025) 80px,rgba(201,149,58,.025) 81px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 540,
            height: 540,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(11,61,46,.65) 0%,transparent 70%)',
            top: '50%',
            right: -80,
            transform: 'translateY(-50%)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 860, width: '100%' }}>
          <p
            className="anim-fade-up anim-d1"
            style={{
              fontFamily: 'Raleway',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: G,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 36,
                height: 1,
                background: G,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            La Bande-Son du Livre
          </p>

          <div className="anim-fade-up anim-d2" style={{ marginBottom: 20 }}>
            <span
              className="font-bebas"
              style={{
                fontSize: 'clamp(48px,8vw,96px)',
                lineHeight: 0.9,
                color: CRM,
                letterSpacing: 2,
                display: 'block',
              }}
            >
              PIB Eto&apos;o
            </span>
            <span
              className="font-bebas"
              style={{
                fontSize: 'clamp(30px,6vw,70px)',
                lineHeight: 0.95,
                color: G,
                letterSpacing: 3,
                display: 'block',
              }}
            >
              L&apos;Album
            </span>
            <span
              className="font-playfair"
              style={{
                fontStyle: 'italic',
                fontSize: 'clamp(15px,2vw,21px)',
                color: 'rgba(245,240,232,.6)',
                display: 'block',
                marginTop: 10,
              }}
            >
              6 titres inédits · Afrobeat, Jazz, Électronique, Spoken Word
            </span>
          </div>

          {/* Meta row */}
          <div
            className="anim-fade-up anim-d3"
            style={{ display: 'flex', gap: 28, marginBottom: 40, flexWrap: 'wrap' }}
          >
            {[
              { label: 'Titres', val: `${albumData.totalTracks} Tracks` },
              { label: 'Durée', val: albumData.totalDuration },
              {
                label: 'Album complet',
                val: formatCurrency(albumData.albumPrice, albumData.currency),
              },
            ].map(({ label, val }) => (
              <div key={label}>
                <span
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,.32)',
                    display: 'block',
                    marginBottom: 3,
                  }}
                >
                  {label}
                </span>
                <span
                  className="font-bebas"
                  style={{ fontSize: 22, color: G, letterSpacing: 2 }}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>

          <div className="btn-pair anim-fade-up anim-d4">
            <button
              onClick={() => setAlbumPayOpen(true)}
              style={{
                fontFamily: 'Raleway',
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: DRK,
                background: G,
                padding: '16px 36px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E8C06A'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = G
                e.currentTarget.style.transform = 'none'
              }}
            >
              <ShoppingCart size={14} />
              Album · {formatCurrency(albumData.albumPrice, albumData.currency)}
            </button>
            <Link
              href="/"
              style={{
                fontFamily: 'Raleway',
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: G,
                padding: '16px 26px',
                border: '1px solid rgba(201,149,58,.4)',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = G
                e.currentTarget.style.background = 'rgba(201,149,58,.08)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = 'rgba(201,149,58,.4)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              ← Le Livre
            </Link>
          </div>
        </div>
      </section>

      {/* ══ TRACKLIST ══ */}
      <section className="py-section px-page" style={{ background: DRK }}>
        <div className="inner">
          <Reveal>
            <p
              style={{
                fontFamily: 'Raleway',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 5,
                textTransform: 'uppercase',
                color: G,
                marginBottom: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              Tracklist{' '}
              <span style={{ flex: 1, height: 1, background: 'rgba(201,149,58,.25)' }} />
            </p>
            <h2
              className="font-bebas"
              style={{
                fontSize: 'clamp(32px,5vw,58px)',
                letterSpacing: 2,
                color: CRM,
                marginBottom: 40,
                lineHeight: 1,
              }}
            >
              {albumData.totalTracks} Titres.{' '}
              <span style={{ color: G }}>Une Vision.</span>
            </h2>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tracks.map((track, i) => (
              <Reveal key={track.slug} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
                <div
                  style={{
                    background:
                      hovered === track.slug ? 'rgba(11,61,46,.5)' : 'rgba(15,20,18,.8)',
                    border: '1px solid',
                    borderColor:
                      hovered === track.slug
                        ? 'rgba(201,149,58,.35)'
                        : 'rgba(201,149,58,.08)',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={() => setHovered(track.slug)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="track-row">
                    {/* Play / Number */}
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background:
                          hovered === track.slug ? track.coverColor : 'transparent',
                        transition: 'background 0.25s',
                      }}
                    >
                      {hovered === track.slug ? (
                        <Play
                          size={18}
                          color={track.accentColor}
                          fill={track.accentColor}
                        />
                      ) : (
                        <span
                          className="font-bebas"
                          style={{
                            fontSize: 22,
                            color: 'rgba(201,149,58,.3)',
                            letterSpacing: 1,
                          }}
                        >
                          {String(track.trackNumber).padStart(2, '0')}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="track-row-info">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 10,
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          className="font-playfair"
                          style={{ fontSize: 16, fontWeight: 700, color: CRM }}
                        >
                          {track.title}
                        </span>
                        <span
                          style={{
                            fontFamily: 'Raleway',
                            fontSize: 10,
                            fontWeight: 300,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            color: 'rgba(245,240,232,.3)',
                          }}
                        >
                          {track.genre}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: 'Raleway',
                          fontWeight: 300,
                          fontSize: 12,
                          color: 'rgba(245,240,232,.45)',
                          marginTop: 4,
                          lineHeight: 1.4,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%',
                        }}
                      >
                        {track.description}
                      </p>
                    </div>

                    {/* Tags – desktop only */}
                    <div className="track-row-tags">
                      {track.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: 'Raleway',
                            fontSize: 9,
                            fontWeight: 600,
                            letterSpacing: 2,
                            color: 'rgba(245,240,232,.28)',
                            border: '1px solid rgba(201,149,58,.14)',
                            padding: '3px 9px',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Duration */}
                    <div className="track-row-duration">
                      <span
                        style={{
                          fontFamily: 'Raleway',
                          fontWeight: 300,
                          fontSize: 12,
                          color: 'rgba(245,240,232,.38)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <Clock size={11} />
                        {track.duration}
                      </span>
                    </div>

                    {/* Buy */}
                    <div className="track-row-buy">
                      <span
                        className="font-bebas"
                        style={{ fontSize: 16, color: G, letterSpacing: 1 }}
                      >
                        {formatCurrency(track.price, track.currency)}
                      </span>
                      <Link
                        href={`/music/${track.slug}`}
                        style={{
                          fontFamily: 'Raleway',
                          fontWeight: 700,
                          fontSize: 9,
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                          color: hovered === track.slug ? DRK : G,
                          background: hovered === track.slug ? G : 'transparent',
                          padding: '5px 13px',
                          border: `1px solid ${G}`,
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                          whiteSpace: 'nowrap',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Acheter
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Album bundle */}
          <Reveal delay={2}>
            <div
              className="album-bundle"
              style={{
                marginTop: 36,
                padding: '32px 28px',
                background: `linear-gradient(135deg,${GD},#1a3a2a)`,
                border: '1px solid rgba(201,149,58,.3)',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                    color: G,
                    marginBottom: 6,
                  }}
                >
                  Offre groupée
                </p>
                <h3
                  className="font-bebas"
                  style={{
                    fontSize: 'clamp(22px,3vw,30px)',
                    letterSpacing: 2,
                    color: CRM,
                  }}
                >
                  Album complet —{' '}
                  {formatCurrency(albumData.albumPrice, albumData.currency)}
                </h3>
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontWeight: 300,
                    fontSize: 12,
                    color: 'rgba(245,240,232,.5)',
                    marginTop: 4,
                  }}
                >
                  Économisez{' '}
                  {formatCurrency(
                    tracks.reduce((a, t) => a + t.price, 0) - albumData.albumPrice,
                    albumData.currency,
                  )}{' '}
                  vs l&apos;achat individuel
                </p>
              </div>
              <button
                onClick={() => setAlbumPayOpen(true)}
                style={{
                  fontFamily: 'Raleway',
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: DRK,
                  background: G,
                  padding: '16px 36px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#E8C06A')}
                onMouseLeave={(e) => (e.currentTarget.style.background = G)}
              >
                Obtenir l&apos;album complet
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ ABOUT THE ALBUM ══ */}
      <section
        className="py-section px-page"
        style={{ background: GD, position: 'relative', overflow: 'hidden' }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(-45deg,transparent,transparent 60px,rgba(201,149,58,.025) 60px,rgba(201,149,58,.025) 61px)',
          }}
        />
        <div className="inner" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <Reveal>
              <p
                style={{
                  fontFamily: 'Raleway',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 5,
                  textTransform: 'uppercase',
                  color: G,
                  marginBottom: 18,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                L&apos;album{' '}
                <span
                  style={{ flex: 1, height: 1, background: 'rgba(201,149,58,.25)' }}
                />
              </p>
              <h2
                className="font-bebas"
                style={{
                  fontSize: 'clamp(34px,5vw,58px)',
                  lineHeight: 1,
                  color: CRM,
                  letterSpacing: 2,
                  marginBottom: 24,
                }}
              >
                La musique
                <br />
                <span style={{ color: G }}>au service de l&apos;idée</span>
              </h2>
              <p
                style={{
                  fontFamily: 'Raleway',
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: 'rgba(245,240,232,.68)',
                  marginBottom: 22,
                }}
              >
                {albumData.description}
              </p>
              <p
                className="font-cormorant"
                style={{
                  fontStyle: 'italic',
                  fontSize: 17,
                  color: 'rgba(245,240,232,.55)',
                  lineHeight: 1.65,
                }}
              >
                &ldquo;Chaque titre est un chapitre sonore du livre. Ensemble, ils forment
                une œuvre qui se lit et s&apos;écoute.&rdquo;
              </p>
            </Reveal>

            {/* Mini cards grid */}
            <div className="grid-mini-cards">
              {tracks.slice(0, 4).map((track, i) => (
                <Reveal key={track.slug} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
                  <Link
                    href={`/music/${track.slug}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 16,
                      background: track.coverColor,
                      border: '1px solid rgba(201,149,58,.15)',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s',
                      aspectRatio: '1',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                      (e.currentTarget.style.borderColor = track.accentColor)
                    }
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                      (e.currentTarget.style.borderColor = 'rgba(201,149,58,.15)')
                    }
                  >
                    <div style={{ position: 'absolute', top: 10, right: 10 }}>
                      <Music size={14} color={track.accentColor} opacity={0.55} />
                    </div>
                    <span
                      className="font-bebas"
                      style={{
                        fontSize: 11,
                        letterSpacing: 3,
                        color: track.accentColor,
                        opacity: 0.65,
                        display: 'block',
                        marginBottom: 3,
                      }}
                    >
                      {String(track.trackNumber).padStart(2, '0')}
                    </span>
                    <span
                      className="font-playfair"
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: CRM,
                        display: 'block',
                        lineHeight: 1.2,
                      }}
                    >
                      {track.title}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer
        className="px-page"
        style={{
          background: '#030706',
          borderTop: '1px solid rgba(201,149,58,.1)',
          padding: '32px 0',
        }}
      >
        <div className="inner footer-inner">
          <span
            className="font-bebas"
            style={{ fontSize: 18, letterSpacing: 3, color: G }}
          >
            PIB ETO&apos;O · 2026
          </span>
          <div
            style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}
          >
            <Link
              href="/"
              style={{
                fontFamily: 'Raleway',
                fontSize: 11,
                color: 'rgba(245,240,232,.38)',
                textDecoration: 'none',
                letterSpacing: 2,
              }}
            >
              Le Livre
            </Link>
            <span
              style={{
                fontFamily: 'Raleway',
                fontSize: 11,
                color: 'rgba(245,240,232,.22)',
                letterSpacing: 1,
              }}
            >
              © 2026 Guy Bertrand MESSINA
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
