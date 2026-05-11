"use client";
import { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib";
import { bookData } from "@/data";
import { Navbar, PaymentModal, Reveal } from "@/components";

const G = "#C9953A";
const GD = "#0B3D2E";
const CREAM = "#F5F0E8";
const DARK = "#080F0D";

export default function BookPage() {
  const [paymentOpen, setPaymentOpen] = useState(false);

  return (
    <>
      <Navbar />
      <PaymentModal
        isOpen={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        itemTitle={bookData.title}
        itemType="book"
        amount={bookData.price}
        currency={bookData.currency}
        itemId="pib-etoo-livre"
      />

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", background: GD, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 60px 80px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 80px, rgba(201,149,58,0.03) 80px, rgba(201,149,58,0.03) 81px)" }} />
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,149,58,0.1) 0%, transparent 65%)", top: "50%", right: -100, transform: "translateY(-50%)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
          <p className="animate-fade-up animate-delay-1" style={{ fontFamily: "Raleway", fontWeight: 700, fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: G, display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <span style={{ width: 40, height: 1, background: G, display: "inline-block" }} />
            Économie · Soft Power · Afrique
          </p>

          <div className="animate-fade-up animate-delay-2" style={{ marginBottom: 24 }}>
            <span className="font-bebas" style={{ fontSize: "clamp(60px,10vw,110px)", lineHeight: 0.9, color: CREAM, letterSpacing: 2, display: "block" }}>
              Le Produit Intérieur Brut
            </span>
            <span className="font-bebas text-gold-shimmer" style={{ fontSize: "clamp(80px,15vw,170px)", lineHeight: 0.85, letterSpacing: 4, display: "block" }}>
              Eto&apos;o
            </span>
            <span className="font-playfair" style={{ fontStyle: "italic", fontSize: "clamp(18px,2.5vw,26px)", color: "rgba(245,240,232,0.75)", display: "block", marginTop: 12 }}>
              Autopsie d&apos;une Puissance Soft-Power
            </span>
          </div>

          <div className="animate-fade-up animate-delay-3" style={{ width: 80, height: 2, background: `linear-gradient(90deg, ${G}, transparent)`, margin: "28px 0" }} />

          <p className="font-cormorant animate-fade-up animate-delay-3" style={{ fontStyle: "italic", fontSize: "clamp(18px,2.2vw,24px)", lineHeight: 1.6, color: "rgba(245,240,232,0.85)", maxWidth: 580, marginBottom: 48 }}>
            Quelle est la valeur réelle de Samuel Eto&apos;o pour le Cameroun ?<br />
            Pas en buts — en <strong style={{ color: "#E8C06A", fontStyle: "normal" }}>dollars, en investissements, en influence géopolitique.</strong>
          </p>

          {/* Stats */}
          <div className="animate-fade-up animate-delay-4" style={{ display: "flex", gap: 0, maxWidth: 520, marginBottom: 48, flexWrap: "wrap" }}>
            {bookData.stats.map((s, i) => (
              <div key={i} style={{ flex: 1, minWidth: 120, padding: "20px 24px", borderLeft: i > 0 ? "1px solid rgba(201,149,58,0.25)" : "none" }}>
                <span className="font-bebas" style={{ fontSize: 44, color: G, lineHeight: 1, display: "block" }}>{s.num}</span>
                <span style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "rgba(245,240,232,0.45)", marginTop: 5, display: "block", lineHeight: 1.5 }}>
                  {s.label.split("\n").map((l, j) => <span key={j}>{l}<br /></span>)}
                </span>
              </div>
            ))}
          </div>

          <div className="animate-fade-up animate-delay-5" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => setPaymentOpen(true)}
              className="pulse-gold"
              style={{ fontFamily: "Raleway", fontWeight: 800, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: DARK, background: G, padding: "18px 44px", border: "none", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "#E8C06A"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.background = G; }}
            >
              Commander · {formatCurrency(bookData.price, bookData.currency)}
            </button>
            <a
              href="#chapters"
              style={{ fontFamily: "Raleway", fontWeight: 600, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: G, padding: "18px 32px", border: "1px solid rgba(201,149,58,0.4)", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.background = "rgba(201,149,58,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,149,58,0.4)"; e.currentTarget.style.background = "transparent"; }}
            >
              Voir le contenu ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ padding: "120px 60px", background: DARK, position: "relative" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }}>
          <Reveal>
            <p className="font-cormorant" style={{ fontSize: "clamp(32px,4vw,52px)", fontStyle: "italic", lineHeight: 1.2, color: G, fontWeight: 300 }}>
              &ldquo;Un pays assis sur un gisement pétrolier sans jamais avoir inventé la foreuse.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: G, marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
              La question centrale
              <span style={{ flex: 1, height: 1, background: "rgba(201,149,58,0.25)" }} />
            </p>
            <p className="font-cormorant" style={{ fontStyle: "italic", fontSize: 20, lineHeight: 1.7, color: "rgba(245,240,232,0.75)", marginBottom: 24 }}>
              Qu&apos;est-ce que vaut vraiment Samuel Eto&apos;o pour le Cameroun ? Pas en buts, pas en trophées — mais en <strong style={{ color: CREAM, fontStyle: "normal" }}>dollars, en investissements, en influence géopolitique.</strong>
            </p>
            <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: "rgba(201,149,58,0.6)" }}>
              — Guy Bertrand MESSINA, Économiste
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── THESIS ── */}
      <section style={{ padding: "120px 60px", background: GD, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(201,149,58,0.025) 60px, rgba(201,149,58,0.025) 61px)" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: G, marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
              La thèse centrale
              <span style={{ flex: 1, height: 1, background: "rgba(201,149,58,0.25)" }} />
            </p>
            <h2 className="font-bebas" style={{ fontSize: "clamp(38px,5.5vw,70px)", lineHeight: 1.05, color: CREAM, letterSpacing: 2, marginBottom: 40 }}>
              Le Cameroun dispose en Eto&apos;o d&apos;un actif symbolique estimé à{" "}
              <span style={{ color: G }}>400–700 millions de dollars par an</span>{" "}
              de valeur non capturée.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(201,149,58,0.15)", border: "1px solid rgba(201,149,58,0.15)", marginTop: 16 }}>
            {[
              { n: "01", t: "Un actif de classe mondiale", b: "Quadruple Vainqueur de la Ligue des Champions, triple Vainqueur de la CAN, icône mondiale sur cinq continents et président de la FECAFOOT. Une puissance symbolique que peu de nations peuvent revendiquer." },
              { n: "02", t: "Une valeur inexploitée", b: "Le Cameroun n'a jamais mis en place les mécanismes permettant de transformer cette puissance en valeur économique tangible. L'auteur estime la valeur non capturée à 400–700 millions de dollars par an." },
              { n: "03", t: "Le diagnostic", b: "En croisant la théorie du soft power (Joseph Nye), l'économie de la marque et l'analyse institutionnelle, l'auteur livre une autopsie intellectuelle d'un phénomène rarissime : un actif soft power de classe mondiale né sur le continent africain." },
              { n: "04", t: "Le remède : l'EIG", b: "L'Eto'o Investment Gateway (EIG) est un mécanisme hybride public-privé. Ce n'est pas une utopie — c'est un blueprint opérationnel, inspiré des modèles irlandais, rwandais et qatari." },
            ].map((c, i) => (
              <Reveal key={i} delay={(i % 2) as 0 | 1 | 2 | 3 | 4}>
                <div style={{ background: "rgba(11,61,46,0.8)", padding: "40px 36px" }}>
                  <div className="font-bebas" style={{ fontSize: 60, color: "rgba(201,149,58,0.15)", lineHeight: 1, marginBottom: 12 }}>{c.n}</div>
                  <div className="font-playfair" style={{ fontSize: 18, fontWeight: 700, color: G, marginBottom: 12 }}>{c.t}</div>
                  <p style={{ fontFamily: "Raleway", fontSize: 13, lineHeight: 1.7, color: "rgba(245,240,232,0.65)", fontWeight: 300 }}>{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIG QUOTE ── */}
      <section style={{ padding: "100px 60px", background: DARK, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(201,149,58,0.06) 0%, transparent 70%)" }} />
        <Reveal>
          <p className="font-cormorant" style={{ fontStyle: "italic", fontSize: "clamp(22px,3.5vw,42px)", lineHeight: 1.4, color: CREAM, maxWidth: 900, margin: "0 auto 24px", position: "relative", zIndex: 2 }}>
            <span style={{ color: G, fontSize: "1.5em" }}>&ldquo;</span>
            Le soft power n&apos;est pas une question de gentillesse internationale. C&apos;est une question de profitabilité stratégique à long terme.
            <span style={{ color: G, fontSize: "1.5em" }}>&rdquo;</span>
          </p>
          <p style={{ fontFamily: "Raleway", fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: G, position: "relative", zIndex: 2 }}>
            — Guy Bertrand MESSINA
          </p>
        </Reveal>
      </section>

      {/* ── CHAPTERS ── */}
      <section id="chapters" style={{ padding: "120px 60px", background: "#0a0f0d" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start", marginBottom: 60 }}>
            <Reveal>
              <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: G, marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
                Structure
                <span style={{ height: 1, width: 40, background: "rgba(201,149,58,0.25)", display: "inline-block" }} />
              </p>
              <h2 className="font-bebas" style={{ fontSize: "clamp(38px,5vw,58px)", lineHeight: 1, color: CREAM, letterSpacing: 2 }}>
                10 Chapitres.<br /><span style={{ color: G }}>Un Blueprint.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 15, lineHeight: 1.8, color: "rgba(245,240,232,0.65)", paddingTop: 8 }}>
                Ni biographie sportive, ni traité académique hermétique. <strong style={{ color: CREAM, fontWeight: 600 }}>Le PIB Eto&apos;o</strong> est une autopsie intellectuelle en dix actes — narrative, rigoureuse, et profondément ancrée dans la réalité africaine.
              </p>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(201,149,58,0.1)", border: "1px solid rgba(201,149,58,0.1)" }}>
            {bookData.chapters_list.map((ch, i) => (
              <Reveal key={i} delay={(i % 2) as 0 | 1 | 2 | 3 | 4}>
                <div
                  style={{ padding: "28px 32px", background: "#0a0f0d", borderBottom: "1px solid rgba(201,149,58,0.08)", display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "start", transition: "background 0.2s", cursor: "default" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(11,61,46,0.4)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#0a0f0d")}
                >
                  <span className="font-bebas" style={{ fontSize: 34, color: G, lineHeight: 1, opacity: 0.5 }}>{ch.num}</span>
                  <div>
                    <div className="font-playfair" style={{ fontSize: 15, fontWeight: 700, color: CREAM, marginBottom: 5 }}>{ch.title}</div>
                    <div style={{ fontFamily: "Raleway", fontSize: 11, fontWeight: 300, letterSpacing: 1, color: "rgba(245,240,232,0.4)", fontStyle: "italic" }}>{ch.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTES ── */}
      <section style={{ padding: "100px 60px", background: DARK }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: G, marginBottom: 40, display: "flex", alignItems: "center", gap: 14 }}>
              Extraits de l&apos;ouvrage
              <span style={{ flex: 1, height: 1, background: "rgba(201,149,58,0.25)" }} />
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {bookData.quotes.map((q, i) => (
              <Reveal key={i} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
                <div style={{ padding: 36, background: "rgba(11,61,46,0.3)", borderLeft: `3px solid ${G}`, borderBottom: "1px solid rgba(201,149,58,0.1)", position: "relative" }}>
                  <span className="font-cormorant" style={{ position: "absolute", top: 10, left: 24, fontSize: 80, color: "rgba(201,149,58,0.1)", lineHeight: 1 }}>&ldquo;</span>
                  <p className="font-cormorant" style={{ fontStyle: "italic", fontSize: 17, lineHeight: 1.6, color: "rgba(245,240,232,0.75)", position: "relative", zIndex: 1 }}>{q}</p>
                  <p style={{ marginTop: 16, fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(201,149,58,0.65)" }}>Guy Bertrand Messina</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANGLES ── */}
      <section style={{ padding: "100px 60px", background: "#050A08" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: G, marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
              Angles de lecture
              <span style={{ flex: 1, height: 1, background: "rgba(201,149,58,0.25)" }} />
            </p>
            <h2 className="font-bebas" style={{ fontSize: "clamp(36px,4vw,54px)", letterSpacing: 2, color: CREAM, marginBottom: 40, lineHeight: 1.1 }}>
              Un livre. <span style={{ color: G }}>Six entrées.</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(201,149,58,0.1)" }}>
            {bookData.angles.map((a, i) => (
              <Reveal key={i} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
                <div
                  style={{ background: "#050A08", padding: "36px 28px", borderBottom: "2px solid transparent", transition: "all 0.2s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderBottomColor = G; e.currentTarget.style.background = "rgba(11,61,46,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderBottomColor = "transparent"; e.currentTarget.style.background = "#050A08"; }}
                >
                  <span style={{ fontFamily: "Bebas Neue, cursive", fontSize: 11, letterSpacing: 3, color: G, marginBottom: 14, display: "block" }}>{a.tag}</span>
                  <div className="font-playfair" style={{ fontSize: 17, fontWeight: 700, color: CREAM, marginBottom: 10 }}>{a.title}</div>
                  <p className="font-cormorant" style={{ fontStyle: "italic", fontSize: 15, lineHeight: 1.7, color: "rgba(245,240,232,0.45)" }}>{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTHOR ── */}
      <section style={{ padding: "120px 60px", background: GD, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -100, top: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,149,58,0.07) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, alignItems: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ width: "100%", aspectRatio: "3/4", background: "rgba(11,61,46,0.6)", border: "1px solid rgba(201,149,58,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #007A5E 33%, #CE1126 33%, #CE1126 66%, #FCD116 66%)" }} />
              <span className="font-bebas" style={{ fontSize: 80, color: "rgba(201,149,58,0.15)", letterSpacing: 8 }}>GBM</span>
              <span style={{ fontFamily: "Raleway", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "rgba(201,149,58,0.3)", marginTop: 8 }}>Guy Bertrand Messina</span>
            </div>
          </Reveal>
          <div>
            <Reveal><p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: G, marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>L&apos;auteur <span style={{ flex: 1, height: 1, background: "rgba(201,149,58,0.25)" }} /></p></Reveal>
            <Reveal delay={1}><h2 className="font-playfair" style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 8 }}>Guy Bertrand<br />MESSINA</h2></Reveal>
            <Reveal delay={2}><p style={{ fontFamily: "Raleway", fontSize: 12, fontWeight: 300, letterSpacing: 3, textTransform: "uppercase", color: G, marginBottom: 28 }}>Économiste · Analyste de l&apos;Innovation Africaine</p></Reveal>
            <div style={{ width: 50, height: 1, background: G, marginBottom: 28 }} />
            <Reveal delay={3}>
              <p style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 15, lineHeight: 1.8, color: "rgba(245,240,232,0.7)", marginBottom: 20 }}>
                Économiste, analyste de l&apos;innovation africaine et consultant en stratégie de développement. <strong style={{ color: CREAM, fontWeight: 600 }}>Spécialiste des dynamiques d&apos;investissement en Afrique subsaharienne</strong>, il explore depuis quinze ans l&apos;intersection entre capital symbolique, diplomatie économique et transformation institutionnelle.
              </p>
            </Reveal>
            <Reveal delay={4}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Économie", "Diplomatie", "Innovation", "Afrique", "Soft Power"].map(t => (
                  <span key={t} style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(245,240,232,0.45)", border: "1px solid rgba(201,149,58,0.25)", padding: "6px 14px" }}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MUSIC PROMO ── */}
      <section style={{ padding: "80px 60px", background: "linear-gradient(135deg, #0a0f0d 0%, #0B3D2E 100%)", borderTop: "1px solid rgba(201,149,58,0.15)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <Reveal>
            <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 12 }}>Aussi disponible</p>
            <h3 className="font-bebas" style={{ fontSize: "clamp(32px,4vw,50px)", letterSpacing: 3, color: CREAM, lineHeight: 1 }}>
              PIB Eto&apos;o — <span style={{ color: G }}>L&apos;Album</span>
            </h3>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: 17, color: "rgba(245,240,232,0.65)", marginTop: 10 }}>
              6 titres inédits · La bande-son du livre
            </p>
          </Reveal>
          <Reveal delay={2}>
            <Link
              href="/music"
              style={{ fontFamily: "Raleway", fontWeight: 800, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: DARK, background: G, padding: "18px 44px", textDecoration: "none", display: "inline-block", transition: "all 0.2s" }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "#E8C06A"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = G; e.currentTarget.style.transform = "none"; }}
            >
              Découvrir la musique →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── SPECS + ORDER ── */}
      <section style={{ padding: "120px 60px", background: GD, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 80px, rgba(201,149,58,0.025) 80px, rgba(201,149,58,0.025) 81px)" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, position: "relative", zIndex: 2 }}>
          <div>
            <Reveal>
              <p style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: G, marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>Le livre <span style={{ height: 1, width: 40, background: "rgba(201,149,58,0.25)", display: "inline-block" }} /></p>
              <h2 className="font-bebas" style={{ fontSize: "clamp(38px,5vw,64px)", lineHeight: 1, color: CREAM, letterSpacing: 2, marginBottom: 36 }}>
                Détails<br /><span style={{ color: G }}>de l&apos;ouvrage</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              {[
                ["Titre", "Le PIB Eto'o : Autopsie d'une Puissance Soft-Power"],
                ["Auteur", "Guy Bertrand MESSINA"],
                ["Genre", "Essai économique & géopolitique"],
                ["Format", "400+ pages · 10 chapitres · A5"],
                ["Édition", "Broché + numérique"],
                ["Langues", "FR & EN simultanées"],
                ["Publication", "Mars 2026"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid rgba(201,149,58,0.12)" }}>
                  <span style={{ fontFamily: "Raleway", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,240,232,0.4)" }}>{k}</span>
                  <span className="font-playfair" style={{ fontSize: 14, color: CREAM, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={3}>
            <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(201,149,58,0.25)", padding: "48px 40px", display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="font-bebas" style={{ fontSize: 32, letterSpacing: 2, color: CREAM }}>Commander maintenant</div>
              <p style={{ fontFamily: "Raleway", fontWeight: 300, fontSize: 13, color: "rgba(245,240,232,0.55)" }}>Disponible en librairie et en édition numérique</p>
              <div className="font-bebas" style={{ fontSize: 56, color: G, lineHeight: 1 }}>{formatCurrency(bookData.price, bookData.currency)}</div>
              <div style={{ display: "flex", gap: 10 }}>
                {bookData.languages.map(l => (
                  <span key={l} className="font-bebas" style={{ fontSize: 14, letterSpacing: 2, color: G, border: "1px solid rgba(201,149,58,0.5)", padding: "4px 14px" }}>{l}</span>
                ))}
              </div>
              <div style={{ height: 1, background: "rgba(201,149,58,0.2)" }} />
              <button
                onClick={() => setPaymentOpen(true)}
                style={{ width: "100%", padding: 16, background: G, color: DARK, fontFamily: "Raleway", fontWeight: 800, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#E8C06A"}
                onMouseLeave={e => e.currentTarget.style.background = G}
              >
                Payer via Mobile Money
              </button>
              <a
                href={`mailto:${bookData.contact.email}`}
                style={{ width: "100%", padding: "14px 16px", textAlign: "center", background: "transparent", color: G, fontFamily: "Raleway", fontWeight: 600, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", border: "1px solid rgba(201,149,58,0.35)", textDecoration: "none", display: "block", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = G}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(201,149,58,0.35)"}
              >
                Contacter l&apos;éditeur
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "120px 60px", background: DARK, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center bottom, rgba(11,61,46,0.4) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <h2 className="font-bebas" style={{ fontSize: "clamp(44px,7vw,88px)", lineHeight: 1, color: CREAM, letterSpacing: 2, marginBottom: 16 }}>
              Ce n&apos;est pas un livre<br />sur le <span style={{ color: G }}>football.</span>
            </h2>
            <p className="font-cormorant" style={{ fontStyle: "italic", fontSize: 20, color: "rgba(245,240,232,0.65)", marginBottom: 60, lineHeight: 1.6 }}>
              C&apos;est un livre sur ce que l&apos;Afrique fait de ses génies.
            </p>
          </Reveal>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            {[
              { label: "Email", val: bookData.contact.email, href: `mailto:${bookData.contact.email}` },
              { label: "Presse", val: bookData.contact.press, href: `mailto:${bookData.contact.press}` },
              { label: "Téléphone", val: bookData.contact.phone, href: `tel:${bookData.contact.phone.replace(/\s/g, "")}` },
              { label: "WhatsApp", val: bookData.contact.phone, href: `https://wa.me/${bookData.contact.whatsapp}` },
            ].map(({ label, val, href }) => (
              <Reveal key={label}>
                <div style={{ background: "rgba(11,61,46,0.5)", border: "1px solid rgba(201,149,58,0.2)", padding: "28px 32px", flex: 1, minWidth: 180, textAlign: "left" }}>
                  <p style={{ fontFamily: "Raleway", fontSize: 9, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: G, marginBottom: 8 }}>{label}</p>
                  <a href={href} className="font-playfair" style={{ fontSize: 14, color: CREAM, textDecoration: "none" }}>{val}</a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2}>
            <button
              onClick={() => setPaymentOpen(true)}
              style={{ fontFamily: "Raleway", fontWeight: 800, fontSize: 13, letterSpacing: 4, textTransform: "uppercase", color: DARK, background: G, padding: "22px 60px", border: "none", cursor: "pointer", transition: "all 0.2s", marginBottom: 20, display: "inline-block" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(201,149,58,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              ✉ &nbsp;Commander votre exemplaire
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#030706", borderTop: "1px solid rgba(201,149,58,0.1)", padding: "36px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span className="font-bebas" style={{ fontSize: 18, letterSpacing: 3, color: G }}>PIB ETO&apos;O · 2026</span>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Link href="/music" style={{ fontFamily: "Raleway", fontSize: 11, color: "rgba(245,240,232,0.4)", textDecoration: "none", letterSpacing: 2 }}>Musique</Link>
          <span style={{ fontFamily: "Raleway", fontSize: 11, color: "rgba(245,240,232,0.25)", letterSpacing: 1 }}>© 2026 Guy Bertrand MESSINA — Tous droits réservés</span>
        </div>
      </footer>
    </>
  );
}