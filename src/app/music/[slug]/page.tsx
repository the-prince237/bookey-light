'use client'
import { useState, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Play, Pause, ArrowLeft, ArrowRight, Music2, Clock, Activity } from 'lucide-react'
import { tracks } from '@/data'
import { Navbar, PaymentModal, Reveal } from '@/components'
import { formatCurrency } from '@/lib'

const CRM = '#F5F0E8'
const DRK = '#080F0D'

interface Props {
  params: Promise<{ slug: string }>
}

export default function TrackPage({ params }: Props) {
  const { slug } = use(params)
  const [payOpen, setPay] = useState(false)
  const [playing, setPlay] = useState(false)

  const track = tracks.find((t) => t.slug === slug)
  if (!track) notFound()

  const idx = tracks.findIndex((t) => t.slug === slug)
  const prevTrack = idx > 0 ? tracks[idx - 1] : null
  const nextTrack = idx < tracks.length - 1 ? tracks[idx + 1] : null

  const G = track.accentColor
  const BG = track.coverColor

  const sectionPad: React.CSSProperties = { padding: '88px 24px' }

  return (
    <>
      <Navbar />
      <PaymentModal
        isOpen={payOpen}
        onClose={() => setPay(false)}
        itemTitle={`${track.title} — Titre ${track.trackNumber}`}
        itemType="track"
        amount={track.price}
        currency={track.currency}
        itemId={`track-${track.slug}`}
      />

      {/* ══ HERO ══ */}
      <section
        style={{
          minHeight: '100vh',
          background: BG,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: '100px 24px 64px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(-45deg,transparent,transparent 60px,rgba(0,0,0,.04) 60px,rgba(0,0,0,.04) 61px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: `radial-gradient(circle,${G}18 0%,transparent 70%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />

        <div
          className="inner track-hero-grid"
          style={{ position: 'relative', zIndex: 2 }}
        >
          {/* Cover art */}
          <div className="anim-fade-up anim-d1">
            <div
              style={{
                aspectRatio: '1',
                maxWidth: 460,
                margin: '0 auto',
                background: `linear-gradient(135deg,${BG} 0%,${G}22 50%,${BG} 100%)`,
                border: `1px solid ${G}40`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => setPlay((p) => !p)}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at center,rgba(0,0,0,0) 40%,rgba(0,0,0,.42) 100%)',
                }}
              />
              <span
                className="font-bebas"
                style={{
                  fontSize: 'clamp(80px,15vw,120px)',
                  color: `${G}1a`,
                  letterSpacing: 4,
                  position: 'absolute',
                  top: 16,
                  left: 20,
                  lineHeight: 1,
                }}
              >
                {String(track.trackNumber).padStart(2, '0')}
              </span>
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  background: G,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'transform 0.2s',
                  transform: playing ? 'scale(.93)' : 'scale(1)',
                }}
              >
                {playing ? (
                  <div style={{ display: 'flex', gap: 5 }}>
                    <div
                      style={{ width: 4, height: 22, background: DRK, borderRadius: 2 }}
                    />
                    <div
                      style={{ width: 4, height: 22, background: DRK, borderRadius: 2 }}
                    />
                  </div>
                ) : (
                  <Play size={30} color={DRK} fill={DRK} style={{ marginLeft: 4 }} />
                )}
              </div>
              {playing && (
                <p
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: `${CRM}50`,
                    zIndex: 2,
                    textAlign: 'center',
                    padding: '0 16px',
                  }}
                >
                  Aperçu non disponible en ligne
                </p>
              )}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg,${G},${G}60,${G})`,
                }}
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <p
              className="anim-fade-up anim-d1"
              style={{
                fontFamily: 'Raleway',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 5,
                textTransform: 'uppercase',
                color: G,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 18,
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/musique"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <ArrowLeft size={13} /> Tracklist
              </Link>
              <span style={{ opacity: 0.35 }}>·</span>
              Titre {String(track.trackNumber).padStart(2, '0')} /{' '}
              {String(tracks.length).padStart(2, '0')}
            </p>

            <h1
              className="font-bebas anim-fade-up anim-d2"
              style={{
                fontSize: 'clamp(44px,8vw,86px)',
                lineHeight: 0.9,
                color: CRM,
                letterSpacing: 3,
                marginBottom: 12,
              }}
            >
              {track.title}
            </h1>
            <p
              className="anim-fade-up anim-d2"
              style={{
                fontFamily: 'Raleway',
                fontWeight: 300,
                fontSize: 12,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: `${G}cc`,
                marginBottom: 26,
              }}
            >
              {track.genre}
            </p>

            {/* Meta */}
            <div
              className="anim-fade-up anim-d3"
              style={{ display: 'flex', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}
            >
              {[
                { icon: <Clock size={13} />, label: 'Durée', val: track.duration },
                { icon: <Activity size={13} />, label: 'BPM', val: String(track.bpm) },
                { icon: <Music2 size={13} />, label: 'Ambiance', val: track.mood },
              ].map(({ icon, label, val }) => (
                <div key={label}>
                  <span
                    style={{
                      fontFamily: 'Raleway',
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,.32)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      marginBottom: 3,
                    }}
                  >
                    {icon} {label}
                  </span>
                  <span
                    className="font-bebas"
                    style={{ fontSize: 18, color: G, letterSpacing: 1 }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="anim-fade-up anim-d3"
              style={{ height: 1, background: `${G}30`, marginBottom: 24 }}
            />

            <p
              className="font-cormorant anim-fade-up anim-d3"
              style={{
                fontStyle: 'italic',
                fontSize: 'clamp(16px,2vw,19px)',
                lineHeight: 1.65,
                color: 'rgba(245,240,232,.75)',
                marginBottom: 28,
              }}
            >
              {track.description}
            </p>

            {/* Tags */}
            <div
              className="anim-fade-up anim-d4"
              style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 32 }}
            >
              {track.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,.45)',
                    border: `1px solid ${G}30`,
                    padding: '4px 11px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Price + CTA */}
            <div
              className="anim-fade-up anim-d5 btn-pair"
              style={{ alignItems: 'center' }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,.32)',
                    display: 'block',
                    marginBottom: 3,
                  }}
                >
                  Prix du titre
                </span>
                <span
                  className="font-bebas"
                  style={{ fontSize: 34, color: G, letterSpacing: 2 }}
                >
                  {formatCurrency(track.price, track.currency)}
                </span>
              </div>
              <button
                onClick={() => setPay(true)}
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
                Acheter ce titre
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DETAIL BODY ══ */}
      <section style={{ ...sectionPad, background: DRK }}>
        <div className="inner track-body-grid">
          {/* Left: description + lyrics + instruments */}
          <div>
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
                À propos du titre{' '}
                <span
                  style={{ flex: 1, height: 1, background: 'rgba(201,149,58,.25)' }}
                />
              </p>
              <p
                style={{
                  fontFamily: 'Raleway',
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.88,
                  color: 'rgba(245,240,232,.68)',
                  marginBottom: 36,
                }}
              >
                {track.longDescription}
              </p>
            </Reveal>

            <Reveal delay={2}>
              <div
                style={{
                  padding: '28px 30px',
                  background: `${BG}80`,
                  borderLeft: `3px solid ${G}`,
                  marginBottom: 28,
                }}
              >
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                    color: G,
                    marginBottom: 14,
                  }}
                >
                  Extrait des paroles
                </p>
                <p
                  className="font-cormorant"
                  style={{
                    fontStyle: 'italic',
                    fontSize: 18,
                    lineHeight: 1.7,
                    color: 'rgba(245,240,232,.85)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {track.lyrics_excerpt}
                </p>
              </div>
            </Reveal>

            <Reveal delay={3}>
              <p
                style={{
                  fontFamily: 'Raleway',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                  color: G,
                  marginBottom: 12,
                }}
              >
                Instruments
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {track.instruments.map((inst) => (
                  <span
                    key={inst}
                    style={{
                      fontFamily: 'Raleway',
                      fontWeight: 600,
                      fontSize: 12,
                      color: 'rgba(245,240,232,.58)',
                      background: 'rgba(201,149,58,.08)',
                      border: '1px solid rgba(201,149,58,.15)',
                      padding: '7px 14px',
                    }}
                  >
                    {inst}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: buy card + specs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Reveal>
              <div
                style={{
                  background: `linear-gradient(135deg,${BG},${DRK})`,
                  border: `1px solid ${G}30`,
                  padding: '36px 28px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                    color: G,
                    marginBottom: 20,
                  }}
                >
                  Commander ce titre
                </p>
                <div
                  className="font-bebas"
                  style={{
                    fontSize: 46,
                    color: G,
                    letterSpacing: 2,
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {formatCurrency(track.price, track.currency)}
                </div>
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontWeight: 300,
                    fontSize: 12,
                    color: 'rgba(245,240,232,.38)',
                    marginBottom: 24,
                    lineHeight: 1.5,
                  }}
                >
                  Téléchargement numérique · Haute qualité
                </p>
                <button
                  onClick={() => setPay(true)}
                  style={{
                    width: '100%',
                    padding: 14,
                    background: G,
                    color: DRK,
                    fontFamily: 'Raleway',
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    marginBottom: 10,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#E8C06A')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = G)}
                >
                  Acheter · Mobile Money
                </button>
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontWeight: 300,
                    fontSize: 10,
                    color: 'rgba(245,240,232,.28)',
                    textAlign: 'center',
                  }}
                >
                  Paiement sécurisé via NOKASH
                </p>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div
                style={{
                  background: 'rgba(11,61,46,.25)',
                  border: '1px solid rgba(201,149,58,.12)',
                  padding: '24px 28px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                    color: G,
                    marginBottom: 14,
                  }}
                >
                  Caractéristiques
                </p>
                {[
                  ['Artiste', track.artist],
                  ['Genre', track.genre],
                  ['Durée', track.duration],
                  ['BPM', String(track.bpm)],
                  ['Format', 'MP3 · WAV HD'],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '9px 0',
                      borderBottom: '1px solid rgba(201,149,58,.08)',
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Raleway',
                        fontSize: 10,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        color: 'rgba(245,240,232,.32)',
                        flexShrink: 0,
                      }}
                    >
                      {k}
                    </span>
                    <span
                      className="font-playfair"
                      style={{ fontSize: 13, color: CRM, textAlign: 'right' }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ PREV / NEXT NAV ══ */}
      <section
        style={{
          padding: '48px 24px',
          background: '#0a0f0d',
          borderTop: '1px solid rgba(201,149,58,.1)',
        }}
      >
        <div className="inner track-nav">
          {prevTrack ? (
            <Link
              href={`/musique/${prevTrack.slug}`}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: prevTrack.coverColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ArrowLeft size={18} color={prevTrack.accentColor} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,.28)',
                    marginBottom: 3,
                  }}
                >
                  Précédent
                </p>
                <p
                  className="font-playfair"
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: CRM,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {prevTrack.title}
                </p>
              </div>
            </Link>
          ) : (
            <div style={{ flex: 1 }} />
          )}

          <Link
            href="/musique"
            style={{
              fontFamily: 'Raleway',
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: G,
              textDecoration: 'none',
              padding: '11px 22px',
              border: '1px solid rgba(201,149,58,.3)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Tracklist
          </Link>

          {nextTrack ? (
            <Link
              href={`/musique/${nextTrack.slug}`}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                flex: 1,
                justifyContent: 'flex-end',
                minWidth: 0,
              }}
            >
              <div style={{ minWidth: 0, textAlign: 'right' }}>
                <p
                  style={{
                    fontFamily: 'Raleway',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,.28)',
                    marginBottom: 3,
                  }}
                >
                  Suivant
                </p>
                <p
                  className="font-playfair"
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: CRM,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {nextTrack.title}
                </p>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: nextTrack.coverColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ArrowRight size={18} color={nextTrack.accentColor} />
              </div>
            </Link>
          ) : (
            <div style={{ flex: 1 }} />
          )}
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
            <Link
              href="/musique"
              style={{
                fontFamily: 'Raleway',
                fontSize: 11,
                color: 'rgba(245,240,232,.38)',
                textDecoration: 'none',
                letterSpacing: 2,
              }}
            >
              Musique
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
