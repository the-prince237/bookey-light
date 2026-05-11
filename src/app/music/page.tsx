'use client';
import { useState } from "react";
import Link from "next/link";
import { Play, Music, Clock, ShoppingCart } from "lucide-react";
import { Navbar, PaymentModal, Reveal } from "@/components";
import { albumData, tracks } from "@/data";
import { formatCurrency } from "@/lib";

const G = "#C9953A";
const GD = "#0B3D2E";
const CREAM = "#F5F0E8";
const DARK = "#080F0D";

export default function MusicPage() {
  const [albumPaymentOpen, setAlbumPaymentOpen] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <PaymentModal
        isOpen={albumPaymentOpen}
        onClose={() => setAlbumPaymentOpen(false)}
        itemTitle={albumData.title}
        itemType="album"
        amount={albumData.albumPrice}
        currency={albumData.currency}
        itemId="pib-etoo-album-complet"
      />

      {/* ── HERO ── */}
      <section style={{ minHeight: "85vh", background: DARK, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 60px 80px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(201,149,58,0.025) 80px, rgba(201,149,58,0.025) 81px)" }} />
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(11,61,46,0.6) 0%, transparent 70%)`, top: "50%", right: -100, transform: "translateY(-50%)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
          <p className="animate-fade-up animate-delay-1" style={{ fontFamily: "Raleway", fontWeight: 700, fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: G, display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <span style={{ width: 40, height: 1, background: G, display: "inline-block" }} />
            La Bande-Son du Livre
          </p>

          <div className="animate-fade-up animate-delay-2" style={{ marginBottom: 24 }}>
            <span className="font-bebas" style={{ fontSize: "clamp(56px,9vw,100px)", lineHeight: 0.9, color: CREAM, letterSpacing: 2, display: "block" }}>
              PIB Eto&apos;o
            </span>
            <span className="font-bebas" style={{ fontSize: "clamp(36px,6vw,72px)", lineHeight: 0.95, color: G, letterSpacing: 3, display: "block" }}>
              L&apos;Album
            </span>
            <span className="font-playfair" style={{ fontStyle: "italic", fontSize: "clamp(16px,2.2vw,22px)", color: "rgba(245,240,232,0.65)", display: "block", marginTop: 12 }}>
              {albumData.description.split("—")[0].trim()}
            </span>
          </div>

          <div className="animate-fade-up animate-delay-3" style={{ display: "flex", gap: 32, marginBottom: 48, flexWrap: "wrap" }}>
            {[
              { label: "Titres", val: `${albumData.totalTracks} Tracks` },
              { label: "Durée", val: albumData.totalDuration },
              { label: "Année", val: String(albumData.year) },
              { label: "Album complet", val: formatCurrency(albumData.albumPrice, albumData.currency) },
            ].map(({ label, val }) => (
              <div key={label}>
                <span style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,240,232,0.35)", display: "block", marginBottom: 4 }}>{label}</span>
                <span className="font-bebas" style={{ fontSize: 24, color: G, letterSpacing: 2 }}>{val}</span>
              </div>
            ))}
          </div>

          <div className="animate-fade-up animate-delay-4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => setAlbumPaymentOpen(true)}
              style={{ fontFamily: "Raleway", fontWeight: 800, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: DARK, background: G, padding: "18px 44px", border: "none", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#E8C06A"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = G; e.currentTarget.style.transform = "none"; }}
            >
              <ShoppingCart size={14} style={{ display: "inline", marginRight: 8 }} />
              Album complet · {formatCurrency(albumData.albumPrice, albumData.currency)}
            </button>
            <Link
              href="/"
              style={{ fontFamily: "Raleway", fontWeight: 600, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: G, padding: "18px 32px", border: "1px solid rgba(201,149,58,0.4)", textDecoration: "none", display: "inline-block", transition: "all 0.2s" }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = G; e.currentTarget.style.background = "rgba(201,149,58,0.08)"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(201,149,58,0.4)"; e.currentTarget.style.background = "transparent"; }}
            >
              ← Le Livre
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRACK LIST ── */}
      <section style={{ padding: "100px 60px", background: "#080F0D" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: G, marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
              Tracklist
              <span style={{ flex: 1, height: 1, background: "rgba(201,149,58,0.25)" }} />
            </p>
            <h2 className="font-bebas" style={{ fontSize: "clamp(36px,5vw,60px)", letterSpacing: 2, color: CREAM, marginBottom: 48, lineHeight: 1 }}>
              {albumData.totalTracks} Titres. <span style={{ color: G }}>Une Vision.</span>
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {tracks.map((track, i) => (
              <Reveal key={track.slug} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
                <div
                  style={{
                    background: hoveredTrack === track.slug ? `rgba(11,61,46,0.5)` : "rgba(15,20,18,0.8)",
                    border: "1px solid",
                    borderColor: hoveredTrack === track.slug ? "rgba(201,149,58,0.35)" : "rgba(201,149,58,0.08)",
                    padding: "0",
                    transition: "all 0.25s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredTrack(track.slug)}
                  onMouseLeave={() => setHoveredTrack(null)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                    {/* Track number / play */}
                    <div style={{ width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: hoveredTrack === track.slug ? track.coverColor : "transparent", transition: "background 0.25s" }}>
                      {hoveredTrack === track.slug ? (
                        <Play size={20} color={track.accentColor} fill={track.accentColor} />
                      ) : (
                        <span className="font-bebas" style={{ fontSize: 24, color: "rgba(201,149,58,0.3)", letterSpacing: 1 }}>{String(track.trackNumber).padStart(2, "0")}</span>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, padding: "20px 24px" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                        <span className="font-playfair" style={{ fontSize: 18, fontWeight: 700, color: CREAM }}>{track.title}</span>
                        <span style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 300, letterSpacing: 2, textTransform: "uppercase", color: "rgba(245,240,232,0.35)" }}>{track.genre}</span>
                      </div>
                      <p style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 13, color: "rgba(245,240,232,0.5)", marginTop: 6, lineHeight: 1.5 }}>{track.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="hidden md:flex" style={{ gap: 6, padding: "0 20px", flexShrink: 0 }}>
                      {track.tags.slice(0, 2).map(t => (
                        <span key={t} style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "rgba(245,240,232,0.3)", border: "1px solid rgba(201,149,58,0.15)", padding: "4px 10px", textTransform: "uppercase" }}>{t}</span>
                      ))}
                    </div>

                    {/* Duration */}
                    <div style={{ padding: "0 20px", flexShrink: 0 }}>
                      <span style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 13, color: "rgba(245,240,232,0.4)", display: "flex", alignItems: "center", gap: 6 }}>
                        <Clock size={12} />
                        {track.duration}
                      </span>
                    </div>

                    {/* Price + Buy */}
                    <div style={{ padding: "20px 24px", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                      <span className="font-bebas" style={{ fontSize: 18, color: G, letterSpacing: 1 }}>{formatCurrency(track.price, track.currency)}</span>
                      <Link
                        href={`/music/${track.slug}`}
                        style={{ fontFamily: "Raleway", fontWeight: 700, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: hoveredTrack === track.slug ? DARK : G, background: hoveredTrack === track.slug ? G : "transparent", padding: "6px 16px", border: `1px solid ${G}`, textDecoration: "none", transition: "all 0.2s" }}
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

          {/* Album bundle CTA */}
          <Reveal delay={2}>
            <div style={{ marginTop: 40, padding: "40px 40px", background: `linear-gradient(135deg, ${GD}, #1a3a2a)`, border: "1px solid rgba(201,149,58,0.3)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
              <div>
                <p style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 8 }}>Offre groupée</p>
                <h3 className="font-bebas" style={{ fontSize: 32, letterSpacing: 2, color: CREAM }}>Album complet — {formatCurrency(albumData.albumPrice, albumData.currency)}</h3>
                <p style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 13, color: "rgba(245,240,232,0.55)", marginTop: 6 }}>
                  Économisez {formatCurrency(tracks.reduce((a, t) => a + t.price, 0) - albumData.albumPrice, albumData.currency)} vs l&apos;achat individuel des {albumData.totalTracks} titres
                </p>
              </div>
              <button
                onClick={() => setAlbumPaymentOpen(true)}
                style={{ fontFamily: "Raleway", fontWeight: 800, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: DARK, background: G, padding: "18px 44px", border: "none", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#E8C06A"}
                onMouseLeave={e => e.currentTarget.style.background = G}
              >
                Obtenir l&apos;album complet
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT THE ALBUM ── */}
      <section style={{ padding: "100px 60px", background: GD, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(201,149,58,0.025) 60px, rgba(201,149,58,0.025) 61px)" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <Reveal>
              <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: G, marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
                L&apos;album
                <span style={{ flex: 1, height: 1, background: "rgba(201,149,58,0.25)" }} />
              </p>
              <h2 className="font-bebas" style={{ fontSize: "clamp(38px,5vw,60px)", lineHeight: 1, color: CREAM, letterSpacing: 2, marginBottom: 28 }}>
                La musique<br /><span style={{ color: G }}>au service de l&apos;idée</span>
              </h2>
              <p style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 15, lineHeight: 1.8, color: "rgba(245,240,232,0.7)", marginBottom: 24 }}>
                {albumData.description}
              </p>
              <p className="font-cormorant" style={{ fontStyle: "italic", fontSize: 18, color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>
                &ldquo;Chaque titre est un chapitre sonore du livre. Ensemble, ils forment une œuvre qui se lit et s&apos;écoute.&rdquo;
              </p>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {tracks.slice(0, 4).map((track, i) => (
                <Reveal key={track.slug} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
                  <Link
                    href={`/music/${track.slug}`}
                    style={{
                      padding: "20px",
                      background: track.coverColor,
                      border: "1px solid rgba(201,149,58,0.15)",
                      textDecoration: "none",
                      transition: "all 0.2s",
                      aspectRatio: "1",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.borderColor = track.accentColor}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.borderColor = "rgba(201,149,58,0.15)"}
                  >
                    <div style={{ position: "absolute", top: 12, right: 12 }}>
                      <Music size={16} color={track.accentColor} opacity={0.6} />
                    </div>
                    <span className="font-bebas" style={{ fontSize: 11, letterSpacing: 3, color: track.accentColor, opacity: 0.7, display: "block", marginBottom: 4 }}>
                      {String(track.trackNumber).padStart(2, "0")}
                    </span>
                    <span className="font-playfair" style={{ fontSize: 14, fontWeight: 700, color: CREAM, display: "block", lineHeight: 1.2 }}>{track.title}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#030706", borderTop: "1px solid rgba(201,149,58,0.1)", padding: "36px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span className="font-bebas" style={{ fontSize: 18, letterSpacing: 3, color: G }}>PIB ETO&apos;O · 2026</span>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Link href="/" style={{ fontFamily: "Raleway", fontSize: 11, color: "rgba(245,240,232,0.4)", textDecoration: "none", letterSpacing: 2 }}>Le Livre</Link>
          <span style={{ fontFamily: "Raleway", fontSize: 11, color: "rgba(245,240,232,0.25)", letterSpacing: 1 }}>© 2026 Guy Bertrand MESSINA</span>
        </div>
      </footer>
    </>
  );
}