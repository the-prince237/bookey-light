"use client";
import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, ArrowLeft, ArrowRight, Music2, Clock, Activity, Guitar } from "lucide-react";
import { tracks } from "@/data";
import { Navbar, PaymentModal, Reveal } from "@/components";
import { formatCurrency } from "@/lib";

const CREAM = "#F5F0E8";
const DARK = "#080F0D";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function TrackPage({ params }: Props) {
  const { slug } = use(params);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const track = tracks.find(t => t.slug === slug);
  if (!track) notFound();

  const trackIndex = tracks.findIndex(t => t.slug === slug);
  const prevTrack = trackIndex > 0 ? tracks[trackIndex - 1] : null;
  const nextTrack = trackIndex < tracks.length - 1 ? tracks[trackIndex + 1] : null;

  const G = track.accentColor;
  const BG = track.coverColor;

  return (
    <>
      <Navbar />
      <PaymentModal
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        itemTitle={`${track.title} — Titre ${track.trackNumber}`}
        itemType="track"
        amount={track.price}
        currency={track.currency}
        itemId={`track-${track.slug}`}
      />

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", background: BG, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", padding: "100px 60px 80px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(0,0,0,0.04) 60px, rgba(0,0,0,0.04) 61px)" }} />
        <div style={{ position: "absolute", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, ${G}18 0%, transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

        <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left: Cover art */}
          <div className="animate-fade-up animate-delay-1">
            <div
              style={{
                aspectRatio: "1",
                background: `linear-gradient(135deg, ${BG} 0%, ${G}22 50%, ${BG} 100%)`,
                border: `1px solid ${G}40`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => setPlaying(!playing)}
            >
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)" }} />
              {/* Track number */}
              <span className="font-bebas" style={{ fontSize: 120, color: `${G}20`, letterSpacing: 4, position: "absolute", top: 20, left: 24, lineHeight: 1 }}>
                {String(track.trackNumber).padStart(2, "0")}
              </span>
              {/* Play button */}
              <div
                style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: G, display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", zIndex: 2, transition: "transform 0.2s",
                  transform: playing ? "scale(0.95)" : "scale(1)",
                }}
              >
                {playing ? (
                  <div style={{ display: "flex", gap: 5 }}>
                    <div style={{ width: 4, height: 24, background: DARK, borderRadius: 2 }} />
                    <div style={{ width: 4, height: 24, background: DARK, borderRadius: 2 }} />
                  </div>
                ) : (
                  <Play size={32} color={DARK} fill={DARK} style={{ marginLeft: 4 }} />
                )}
              </div>
              {playing && (
                <p style={{ position: "absolute", bottom: 20, fontFamily: "Raleway", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: `${CREAM}60`, zIndex: 2 }}>
                  Aperçu non disponible en ligne
                </p>
              )}
              {/* Bottom bar */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${G}, ${G}60, ${G})` }} />
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <p className="animate-fade-up animate-delay-1" style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: G, display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <Link href="/music" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <ArrowLeft size={14} /> Tracklist
              </Link>
              <span style={{ opacity: 0.3 }}>·</span>
              Titre {String(track.trackNumber).padStart(2, "0")} / {tracks.length.toString().padStart(2, "0")}
            </p>
            <h1 className="font-bebas animate-fade-up animate-delay-2" style={{ fontSize: "clamp(48px,7vw,88px)", lineHeight: 0.9, color: CREAM, letterSpacing: 3, marginBottom: 14 }}>
              {track.title}
            </h1>
            <p className="animate-fade-up animate-delay-2" style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: `${G}cc`, marginBottom: 28 }}>
              {track.genre}
            </p>

            <div className="animate-fade-up animate-delay-3" style={{ display: "flex", gap: 28, marginBottom: 32, flexWrap: "wrap" }}>
              {[
                { icon: <Clock size={14} />, label: "Durée", val: track.duration },
                { icon: <Activity size={14} />, label: "BPM", val: String(track.bpm) },
                { icon: <Music2 size={14} />, label: "Ambiance", val: track.mood },
              ].map(({ icon, label, val }) => (
                <div key={label}>
                  <span style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,240,232,0.35)", display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                    {icon} {label}
                  </span>
                  <span className="font-bebas" style={{ fontSize: 20, color: G, letterSpacing: 1 }}>{val}</span>
                </div>
              ))}
            </div>

            <div className="animate-fade-up animate-delay-3" style={{ height: 1, background: `${G}30`, marginBottom: 28 }} />

            <p className="animate-fade-up animate-delay-3 font-cormorant" style={{ fontStyle: "italic", fontSize: 19, lineHeight: 1.65, color: "rgba(245,240,232,0.75)", marginBottom: 32 }}>
              {track.description}
            </p>

            {/* Tags */}
            <div className="animate-fade-up animate-delay-4" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
              {track.tags.map(t => (
                <span key={t} style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(245,240,232,0.5)", border: `1px solid ${G}30`, padding: "5px 12px" }}>{t}</span>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="animate-fade-up animate-delay-5" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div>
                <span style={{ fontFamily: "Raleway", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,240,232,0.35)", display: "block", marginBottom: 4 }}>Prix du titre</span>
                <span className="font-bebas" style={{ fontSize: 36, color: G, letterSpacing: 2 }}>{formatCurrency(track.price, track.currency)}</span>
              </div>
              <button
                onClick={() => setPaymentOpen(true)}
                style={{ fontFamily: "Raleway", fontWeight: 800, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: DARK, background: G, padding: "18px 40px", border: "none", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#E8C06A"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = G; e.currentTarget.style.transform = "none"; }}
              >
                Acheter ce titre
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAILS ── */}
      <section style={{ padding: "100px 60px", background: DARK }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 80 }}>
          {/* Description & Lyrics */}
          <div>
            <Reveal>
              <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: G, marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
                À propos du titre
                <span style={{ flex: 1, height: 1, background: "rgba(201,149,58,0.25)" }} />
              </p>
              <p style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 15, lineHeight: 1.85, color: "rgba(245,240,232,0.7)", marginBottom: 40 }}>
                {track.longDescription}
              </p>
            </Reveal>

            <Reveal delay={2}>
              <div style={{ padding: "32px 36px", background: `${BG}80`, borderLeft: `3px solid ${track.accentColor}`, marginBottom: 32 }}>
                <p style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 16 }}>Extrait des paroles</p>
                <p className="font-cormorant" style={{ fontStyle: "italic", fontSize: 19, lineHeight: 1.7, color: "rgba(245,240,232,0.85)", whiteSpace: "pre-line" }}>
                  {track.lyrics_excerpt}
                </p>
              </div>
            </Reveal>

            {/* Instruments */}
            <Reveal delay={3}>
              <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 14 }}>
                <Guitar size={12} style={{ display: "inline", marginRight: 6 }} />
                Instruments
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {track.instruments.map(inst => (
                  <span key={inst} style={{ fontFamily: "Raleway", fontWeight: 600, fontSize: 12, color: "rgba(245,240,232,0.6)", background: "rgba(201,149,58,0.08)", border: "1px solid rgba(201,149,58,0.15)", padding: "8px 16px" }}>{inst}</span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div>
            <Reveal>
              <div style={{ background: `linear-gradient(135deg, ${BG}, ${DARK})`, border: `1px solid ${G}30`, padding: "40px 32px", marginBottom: 24 }}>
                <p style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 24 }}>Commander ce titre</p>
                <div className="font-bebas" style={{ fontSize: 48, color: G, letterSpacing: 2, lineHeight: 1, marginBottom: 8 }}>
                  {formatCurrency(track.price, track.currency)}
                </div>
                <p style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 12, color: "rgba(245,240,232,0.4)", marginBottom: 28, lineHeight: 1.5 }}>
                  Téléchargement numérique · Haute qualité
                </p>
                <button
                  onClick={() => setPaymentOpen(true)}
                  style={{ width: "100%", padding: 16, background: G, color: DARK, fontFamily: "Raleway", fontWeight: 800, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.2s", marginBottom: 12 }}
                  onMouseEnter={e => e.currentTarget.style.background = "#E8C06A"}
                  onMouseLeave={e => e.currentTarget.style.background = G}
                >
                  Acheter · Mobile Money
                </button>
                <div style={{ height: 1, background: `${G}20`, margin: "20px 0" }} />
                <p style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 11, color: "rgba(245,240,232,0.35)", textAlign: "center" }}>
                  Paiement sécurisé via NOKASH
                </p>
              </div>
            </Reveal>

            {/* Tech specs */}
            <Reveal delay={2}>
              <div style={{ background: "rgba(11,61,46,0.25)", border: "1px solid rgba(201,149,58,0.12)", padding: "28px 32px" }}>
                <p style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 16 }}>Caractéristiques</p>
                {[
                  ["Artiste", track.artist],
                  ["Genre", track.genre],
                  ["Durée", track.duration],
                  ["BPM", String(track.bpm)],
                  ["Format", "MP3 · WAV HD"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(201,149,58,0.08)" }}>
                    <span style={{ fontFamily: "Raleway", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(245,240,232,0.35)" }}>{k}</span>
                    <span className="font-playfair" style={{ fontSize: 13, color: CREAM }}>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── NAVIGATION ── */}
      <section style={{ padding: "60px", background: "#0a0f0d", borderTop: "1px solid rgba(201,149,58,0.1)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          {prevTrack ? (
            <Link href={`/music/${prevTrack.slug}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
              <div style={{ width: 48, height: 48, background: prevTrack.coverColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ArrowLeft size={20} color={prevTrack.accentColor} />
              </div>
              <div>
                <p style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: 4 }}>Titre précédent</p>
                <p className="font-playfair" style={{ fontSize: 16, fontWeight: 700, color: CREAM }}>{prevTrack.title}</p>
              </div>
            </Link>
          ) : <div style={{ flex: 1 }} />}

          <Link href="/music" style={{ fontFamily: "Raleway", fontWeight: 700, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: G, textDecoration: "none", padding: "12px 24px", border: "1px solid rgba(201,149,58,0.3)" }}>
            Tracklist
          </Link>

          {nextTrack ? (
            <Link href={`/music/${nextTrack.slug}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 16, flex: 1, justifyContent: "flex-end" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: 4 }}>Titre suivant</p>
                <p className="font-playfair" style={{ fontSize: 16, fontWeight: 700, color: CREAM }}>{nextTrack.title}</p>
              </div>
              <div style={{ width: 48, height: 48, background: nextTrack.coverColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ArrowRight size={20} color={nextTrack.accentColor} />
              </div>
            </Link>
          ) : <div style={{ flex: 1 }} />}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#030706", borderTop: "1px solid rgba(201,149,58,0.1)", padding: "36px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span className="font-bebas" style={{ fontSize: 18, letterSpacing: 3, color: "#C9953A" }}>PIB ETO&apos;O · 2026</span>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Link href="/" style={{ fontFamily: "Raleway", fontSize: 11, color: "rgba(245,240,232,0.4)", textDecoration: "none", letterSpacing: 2 }}>Le Livre</Link>
          <Link href="/music" style={{ fontFamily: "Raleway", fontSize: 11, color: "rgba(245,240,232,0.4)", textDecoration: "none", letterSpacing: 2 }}>music</Link>
          <span style={{ fontFamily: "Raleway", fontSize: 11, color: "rgba(245,240,232,0.25)", letterSpacing: 1 }}>© 2026 Guy Bertrand MESSINA</span>
        </div>
      </footer>
    </>
  );
}