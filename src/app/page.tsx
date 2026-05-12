"use client";
import { useState } from "react";
import Link from "next/link";
import { Navbar, PaymentModal, Reveal } from "@/components";
import { bookData } from "@/data";
import { formatCurrency } from "@/lib/payments/nokash";

const G    = "#C9953A";
const GD   = "#0B3D2E";
const CRM  = "#F5F0E8";
const DRK  = "#080F0D";

/* ─── shared micro-styles ─────────────────────────────────── */
const label = (extra = ""): React.CSSProperties => ({
  fontFamily: "Raleway", fontSize: 10, fontWeight: 700,
  letterSpacing: 5, textTransform: "uppercase", color: G,
  display: "flex", alignItems: "center", gap: 14,
  marginBottom: 20, ...(extra === "mb40" ? { marginBottom: 40 } : {}),
});
const afterLine: React.CSSProperties = { flex: 1, height: 1, background: "rgba(201,149,58,0.25)", display: "block" };
const btn = (bg = G): React.CSSProperties => ({
  fontFamily: "Raleway", fontWeight: 800, fontSize: 12,
  letterSpacing: 3, textTransform: "uppercase",
  color: DRK, background: bg,
  padding: "16px 36px", border: "none", cursor: "pointer",
  transition: "all 0.2s", whiteSpace: "nowrap",
});
const btnOutline: React.CSSProperties = {
  fontFamily: "Raleway", fontWeight: 600, fontSize: 11,
  letterSpacing: 3, textTransform: "uppercase",
  color: G, background: "transparent",
  padding: "16px 28px",
  border: "1px solid rgba(201,149,58,0.4)",
  textDecoration: "none", display: "inline-block",
  transition: "all 0.2s", whiteSpace: "nowrap",
};

export default function BookPage() {
  const [payOpen, setPayOpen] = useState(false);

  return (
    <>
      <Navbar />
      <PaymentModal isOpen={payOpen} onClose={() => setPayOpen(false)}
        itemTitle={bookData.title} itemType="book"
        amount={bookData.price} currency={bookData.currency}
        itemId="pib-etoo-livre" />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="hero-section" style={{ background: GD, position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute",inset:0, backgroundImage:"repeating-linear-gradient(-45deg,transparent,transparent 80px,rgba(201,149,58,.03) 80px,rgba(201,149,58,.03) 81px)" }} />
        <div style={{ position:"absolute",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(201,149,58,.1) 0%,transparent 65%)",top:"50%",right:"-80px",transform:"translateY(-50%)" }} />

        <div style={{ position:"relative",zIndex:2,maxWidth:900,width:"100%" }}>
          <p className="anim-fade-up anim-d1" style={{ fontFamily:"Raleway",fontWeight:700,fontSize:11,letterSpacing:6,textTransform:"uppercase",color:G,display:"flex",alignItems:"center",gap:14,marginBottom:24 }}>
            <span style={{ width:36,height:1,background:G,display:"inline-block",flexShrink:0 }} />
            Économie · Soft Power · Afrique
          </p>

          <div className="anim-fade-up anim-d2" style={{ marginBottom:20 }}>
            <span className="font-bebas" style={{ fontSize:"clamp(52px,9vw,108px)",lineHeight:.9,color:CRM,letterSpacing:2,display:"block" }}>
              Le Produit Intérieur Brut
            </span>
            <span className="font-bebas text-gold-shimmer" style={{ fontSize:"clamp(72px,14vw,168px)",lineHeight:.84,letterSpacing:4,display:"block" }}>
              Eto&apos;o
            </span>
            <span className="font-playfair" style={{ fontStyle:"italic",fontSize:"clamp(16px,2.4vw,25px)",color:"rgba(245,240,232,.75)",display:"block",marginTop:10 }}>
              Autopsie d&apos;une Puissance Soft-Power
            </span>
          </div>

          <div className="anim-fade-up anim-d3" style={{ width:70,height:2,background:`linear-gradient(90deg,${G},transparent)`,margin:"24px 0" }} />

          <p className="font-cormorant anim-fade-up anim-d3" style={{ fontStyle:"italic",fontSize:"clamp(17px,2.2vw,23px)",lineHeight:1.6,color:"rgba(245,240,232,.85)",maxWidth:560,marginBottom:40 }}>
            Quelle est la valeur réelle de Samuel Eto&apos;o pour le Cameroun ?<br />
            Pas en buts — en <strong style={{ color:"#E8C06A",fontStyle:"normal" }}>dollars, en investissements, en influence géopolitique.</strong>
          </p>

          {/* Stats */}
          <div className="hero-stats anim-fade-up anim-d4">
            {bookData.stats.map((s,i) => (
              <div key={i} className="hero-stat" style={{ borderLeftColor: i===0?"transparent":"rgba(201,149,58,.25)" }}>
                <span className="font-bebas" style={{ fontSize:42,color:G,lineHeight:1,display:"block" }}>{s.num}</span>
                <span style={{ fontFamily:"Raleway",fontWeight:300,fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"rgba(245,240,232,.4)",marginTop:4,display:"block",lineHeight:1.5 }}>
                  {s.label.replace("\n"," · ")}
                </span>
              </div>
            ))}
          </div>

          <div className="btn-pair anim-fade-up anim-d5">
            <button
              onClick={() => setPayOpen(true)}
              className="pulse-gold"
              style={btn()}
              onMouseEnter={e => { e.currentTarget.style.background="#E8C06A"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background=G; e.currentTarget.style.transform="none"; }}
            >
              Commander · {formatCurrency(bookData.price, bookData.currency)}
            </button>
            <a href="#chapters" style={btnOutline}
              onMouseEnter={e => { e.currentTarget.style.borderColor=G; e.currentTarget.style.background="rgba(201,149,58,.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(201,149,58,.4)"; e.currentTarget.style.background="transparent"; }}
            >
              Voir le contenu ↓
            </a>
          </div>
        </div>
      </section>

      {/* ══ PROBLEM ══ */}
      <section className="py-section px-page" style={{ background:DRK }}>
        <div className="inner grid-problem" style={{ alignItems:"center" }}>
          <Reveal>
            <p className="font-cormorant" style={{ fontSize:"clamp(28px,4vw,50px)",fontStyle:"italic",lineHeight:1.25,color:G,fontWeight:300 }}>
              &ldquo;Un pays assis sur un gisement pétrolier sans jamais avoir inventé la foreuse.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p style={label()}>
              La question centrale <span style={afterLine} />
            </p>
            <p className="font-cormorant" style={{ fontStyle:"italic",fontSize:"clamp(16px,2vw,20px)",lineHeight:1.75,color:"rgba(245,240,232,.75)",marginBottom:20 }}>
              Qu&apos;est-ce que vaut vraiment Samuel Eto&apos;o pour le Cameroun ? Pas en buts, pas en trophées — mais en <strong style={{ color:CRM,fontStyle:"normal" }}>dollars, en investissements, en influence géopolitique.</strong>
            </p>
            <p style={{ fontFamily:"Raleway",fontSize:10,fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:"rgba(201,149,58,.55)" }}>
              — Guy Bertrand MESSINA, Économiste
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ THESIS ══ */}
      <section className="py-section px-page" style={{ background:GD,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(-45deg,transparent,transparent 60px,rgba(201,149,58,.025) 60px,rgba(201,149,58,.025) 61px)" }} />
        <div className="inner" style={{ position:"relative",zIndex:2 }}>
          <Reveal>
            <p style={label()}>La thèse centrale <span style={afterLine} /></p>
            <h2 className="font-bebas" style={{ fontSize:"clamp(32px,5vw,68px)",lineHeight:1.05,color:CRM,letterSpacing:2,marginBottom:8 }}>
              Le Cameroun dispose en Eto&apos;o d&apos;un actif symbolique estimé à{" "}
              <span style={{ color:G }}>400–700 millions de dollars par an</span>{" "}
              de valeur non capturée.
            </h2>
          </Reveal>
          <div className="grid-thesis">
            {[
              { n:"01",t:"Un actif de classe mondiale",b:"Quadruple Vainqueur de la Ligue des Champions, triple Vainqueur de la CAN, icône mondiale sur cinq continents et président de la FECAFOOT. Une puissance symbolique que peu de nations peuvent revendiquer." },
              { n:"02",t:"Une valeur inexploitée",b:"Le Cameroun n'a jamais mis en place les mécanismes permettant de transformer cette puissance en valeur économique tangible. Valeur non capturée estimée à 400–700 millions de dollars par an." },
              { n:"03",t:"Le diagnostic",b:"En croisant soft power (Joseph Nye), économie de la marque et analyse institutionnelle, l'auteur livre une autopsie intellectuelle d'un phénomène rarissime : un actif soft power de classe mondiale né sur le continent africain." },
              { n:"04",t:"Le remède : l'EIG",b:"L'Eto'o Investment Gateway (EIG) est un blueprint opérationnel hybride public-privé, inspiré des modèles irlandais, rwandais et qatari, adapté aux réalités camerounaises." },
            ].map((c,i) => (
              <Reveal key={i} delay={(i%2) as 0|1|2|3|4}>
                <div style={{ background:"rgba(11,61,46,.8)",padding:"36px 30px" }}>
                  <div className="font-bebas" style={{ fontSize:56,color:"rgba(201,149,58,.13)",lineHeight:1,marginBottom:10 }}>{c.n}</div>
                  <div className="font-playfair" style={{ fontSize:17,fontWeight:700,color:G,marginBottom:10 }}>{c.t}</div>
                  <p style={{ fontFamily:"Raleway",fontSize:13,lineHeight:1.7,color:"rgba(245,240,232,.6)",fontWeight:300 }}>{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BIG QUOTE ══ */}
      <section className="py-section px-page" style={{ background:DRK,textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at center,rgba(201,149,58,.06) 0%,transparent 70%)" }} />
        <Reveal>
          <p className="font-cormorant" style={{ fontStyle:"italic",fontSize:"clamp(20px,3.5vw,42px)",lineHeight:1.45,color:CRM,maxWidth:860,margin:"0 auto 22px",position:"relative",zIndex:2 }}>
            <span style={{ color:G }}>&ldquo;</span>
            Le soft power n&apos;est pas une question de gentillesse internationale. C&apos;est une question de profitabilité stratégique à long terme.
            <span style={{ color:G }}>&rdquo;</span>
          </p>
          <p style={{ fontFamily:"Raleway",fontSize:11,fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:G,position:"relative",zIndex:2 }}>
            — Guy Bertrand MESSINA
          </p>
        </Reveal>
      </section>

      {/* ══ CHAPTERS ══ */}
      <section id="chapters" className="py-section px-page" style={{ background:"#0a0f0d" }}>
        <div className="inner">
          <div className="chapter-intro">
            <Reveal>
              <p style={label()}>Structure <span style={{ height:1,width:30,background:"rgba(201,149,58,.25)",display:"inline-block",flexShrink:0 }} /></p>
              <h2 className="font-bebas" style={{ fontSize:"clamp(36px,5vw,58px)",lineHeight:1,color:CRM,letterSpacing:2 }}>
                10 Chapitres.<br /><span style={{ color:G }}>Un Blueprint.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p style={{ fontFamily:"Raleway",fontWeight:300,fontSize:15,lineHeight:1.8,color:"rgba(245,240,232,.6)",paddingTop:4 }}>
                Ni biographie sportive, ni traité académique hermétique.{" "}
                <strong style={{ color:CRM,fontWeight:600 }}>Le PIB Eto&apos;o</strong>{" "}
                est une autopsie intellectuelle en dix actes — narrative, rigoureuse, et profondément ancrée dans la réalité africaine.
              </p>
            </Reveal>
          </div>
          <div className="grid-chapters">
            {bookData.chapters_list.map((ch,i) => (
              <Reveal key={i} delay={(i%2) as 0|1|2|3|4}>
                <div
                  style={{ padding:"24px 28px",background:"#0a0f0d",borderBottom:"1px solid rgba(201,149,58,.08)",display:"grid",gridTemplateColumns:"auto 1fr",gap:18,alignItems:"start",transition:"background 0.2s",cursor:"default" }}
                  onMouseEnter={e=>(e.currentTarget.style.background="rgba(11,61,46,.4)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="#0a0f0d")}
                >
                  <span className="font-bebas" style={{ fontSize:30,color:G,lineHeight:1,opacity:.45 }}>{ch.num}</span>
                  <div>
                    <div className="font-playfair" style={{ fontSize:15,fontWeight:700,color:CRM,marginBottom:4 }}>{ch.title}</div>
                    <div style={{ fontFamily:"Raleway",fontSize:11,fontWeight:300,letterSpacing:1,color:"rgba(245,240,232,.38)",fontStyle:"italic" }}>{ch.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ QUOTES ══ */}
      <section className="py-section px-page" style={{ background:DRK }}>
        <div className="inner">
          <Reveal>
            <p style={label("mb40")}>Extraits de l&apos;ouvrage <span style={afterLine} /></p>
          </Reveal>
          <div className="grid-quotes">
            {bookData.quotes.map((q,i) => (
              <Reveal key={i} delay={(i%3) as 0|1|2|3|4}>
                <div style={{ padding:"32px 30px",background:"rgba(11,61,46,.3)",borderLeft:`3px solid ${G}`,borderBottom:"1px solid rgba(201,149,58,.1)",position:"relative" }}>
                  <span className="font-cormorant" style={{ position:"absolute",top:8,left:20,fontSize:72,color:"rgba(201,149,58,.1)",lineHeight:1 }}>&ldquo;</span>
                  <p className="font-cormorant" style={{ fontStyle:"italic",fontSize:17,lineHeight:1.65,color:"rgba(245,240,232,.75)",position:"relative",zIndex:1 }}>{q}</p>
                  <p style={{ marginTop:14,fontFamily:"Raleway",fontSize:9,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:"rgba(201,149,58,.6)" }}>Guy Bertrand Messina</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ANGLES ══ */}
      <section className="py-section px-page" style={{ background:"#050A08" }}>
        <div className="inner">
          <Reveal>
            <p style={label()}>Angles de lecture <span style={afterLine} /></p>
            <h2 className="font-bebas" style={{ fontSize:"clamp(32px,4vw,54px)",letterSpacing:2,color:CRM,marginBottom:36,lineHeight:1.1 }}>
              Un livre. <span style={{ color:G }}>Six entrées.</span>
            </h2>
          </Reveal>
          <div className="grid-angles">
            {bookData.angles.map((a,i) => (
              <Reveal key={i} delay={(i%3) as 0|1|2|3|4}>
                <div
                  style={{ background:"#050A08",padding:"32px 24px",borderBottom:"2px solid transparent",transition:"all 0.2s",cursor:"default" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderBottomColor=G;e.currentTarget.style.background="rgba(11,61,46,.25)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderBottomColor="transparent";e.currentTarget.style.background="#050A08";}}
                >
                  <span style={{ fontFamily:"Bebas Neue,cursive",fontSize:11,letterSpacing:3,color:G,marginBottom:12,display:"block" }}>{a.tag}</span>
                  <div className="font-playfair" style={{ fontSize:16,fontWeight:700,color:CRM,marginBottom:8 }}>{a.title}</div>
                  <p className="font-cormorant" style={{ fontStyle:"italic",fontSize:15,lineHeight:1.7,color:"rgba(245,240,232,.42)" }}>{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AUTHOR ══ */}
      <section className="py-section px-page" style={{ background:GD,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",right:-80,top:-80,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(201,149,58,.07) 0%,transparent 70%)" }} />
        <div className="inner author-grid" style={{ position:"relative",zIndex:2 }}>
          <Reveal>
            <div style={{ width:"100%",aspectRatio:"3/4",maxHeight:480,background:"rgba(11,61,46,.6)",border:"1px solid rgba(201,149,58,.25)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,#007A5E 33%,#CE1126 33%,#CE1126 66%,#FCD116 66%)" }} />
              <span className="font-bebas" style={{ fontSize:72,color:"rgba(201,149,58,.14)",letterSpacing:6 }}>GBM</span>
              <span style={{ fontFamily:"Raleway",fontSize:10,letterSpacing:4,textTransform:"uppercase",color:"rgba(201,149,58,.28)",marginTop:8 }}>Guy Bertrand Messina</span>
            </div>
          </Reveal>
          <div>
            <Reveal><p style={label()}>L&apos;auteur <span style={afterLine} /></p></Reveal>
            <Reveal delay={1}><h2 className="font-playfair" style={{ fontSize:"clamp(24px,3.5vw,40px)",fontWeight:700,color:CRM,lineHeight:1.1,marginBottom:6 }}>Guy Bertrand<br />MESSINA</h2></Reveal>
            <Reveal delay={2}><p style={{ fontFamily:"Raleway",fontSize:11,fontWeight:300,letterSpacing:3,textTransform:"uppercase",color:G,marginBottom:26 }}>Économiste · Analyste de l&apos;Innovation Africaine</p></Reveal>
            <div style={{ width:44,height:1,background:G,marginBottom:24 }} />
            <Reveal delay={3}>
              <p style={{ fontFamily:"Raleway",fontWeight:300,fontSize:14,lineHeight:1.85,color:"rgba(245,240,232,.68)",marginBottom:18 }}>
                Économiste, analyste de l&apos;innovation africaine et consultant en stratégie de développement.{" "}
                <strong style={{ color:CRM,fontWeight:600 }}>Spécialiste des dynamiques d&apos;investissement en Afrique subsaharienne</strong>, il explore depuis quinze ans l&apos;intersection entre capital symbolique, diplomatie économique et transformation institutionnelle.
              </p>
            </Reveal>
            <Reveal delay={4}>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                {["Économie","Diplomatie","Innovation","Afrique","Soft Power"].map(t=>(
                  <span key={t} style={{ fontFamily:"Raleway",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"rgba(245,240,232,.4)",border:"1px solid rgba(201,149,58,.22)",padding:"5px 12px" }}>{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ MUSIC PROMO ══ */}
      <section className="px-page" style={{ padding:"72px 0",background:"linear-gradient(135deg,#0a0f0d 0%,#0B3D2E 100%)",borderTop:"1px solid rgba(201,149,58,.15)" }}>
        <div className="inner music-promo" style={{ paddingLeft:0,paddingRight:0 }}>
          <Reveal>
            <p style={{ fontFamily:"Raleway",fontSize:10,fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:G,marginBottom:10 }}>Aussi disponible</p>
            <h3 className="font-bebas" style={{ fontSize:"clamp(28px,4vw,50px)",letterSpacing:3,color:CRM,lineHeight:1 }}>
              PIB Eto&apos;o — <span style={{ color:G }}>L&apos;Album</span>
            </h3>
            <p className="font-cormorant" style={{ fontStyle:"italic",fontSize:16,color:"rgba(245,240,232,.6)",marginTop:8 }}>
              6 titres inédits · La bande-son du livre
            </p>
          </Reveal>
          <Reveal delay={2}>
            <Link
              href="/music"
              style={btn()}
              onMouseEnter={(e:React.MouseEvent<HTMLAnchorElement>)=>{e.currentTarget.style.background="#E8C06A";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={(e:React.MouseEvent<HTMLAnchorElement>)=>{e.currentTarget.style.background=G;e.currentTarget.style.transform="none";}}
            >
              Découvrir la music →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ SPECS + ORDER ══ */}
      <section className="py-section px-page" style={{ background:GD,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(-45deg,transparent,transparent 80px,rgba(201,149,58,.025) 80px,rgba(201,149,58,.025) 81px)" }} />
        <div className="inner specs-grid" style={{ position:"relative",zIndex:2 }}>
          <div>
            <Reveal>
              <p style={label()}>Le livre <span style={{ height:1,width:30,background:"rgba(201,149,58,.25)",display:"inline-block",flexShrink:0 }} /></p>
              <h2 className="font-bebas" style={{ fontSize:"clamp(36px,5vw,62px)",lineHeight:1,color:CRM,letterSpacing:2,marginBottom:32 }}>
                Détails<br /><span style={{ color:G }}>de l&apos;ouvrage</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              {[
                ["Titre","Le PIB Eto'o : Autopsie d'une Puissance Soft-Power"],
                ["Auteur","Guy Bertrand MESSINA"],
                ["Genre","Essai économique & géopolitique"],
                ["Format","400+ pages · 10 chapitres · A5"],
                ["Édition","Broché + numérique"],
                ["Langues","FR & EN simultanées"],
                ["Publication","Mars 2026"],
              ].map(([k,v])=>(
                <div key={k} style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"12px 0",borderBottom:"1px solid rgba(201,149,58,.12)",gap:12 }}>
                  <span style={{ fontFamily:"Raleway",fontSize:10,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:"rgba(245,240,232,.38)",flexShrink:0 }}>{k}</span>
                  <span className="font-playfair" style={{ fontSize:13,color:CRM,textAlign:"right" }}>{v}</span>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal delay={3}>
            <div style={{ background:"rgba(0,0,0,.3)",border:"1px solid rgba(201,149,58,.25)",padding:"40px 32px",display:"flex",flexDirection:"column",gap:18 }}>
              <div className="font-bebas" style={{ fontSize:30,letterSpacing:2,color:CRM }}>Commander maintenant</div>
              <p style={{ fontFamily:"Raleway",fontWeight:300,fontSize:13,color:"rgba(245,240,232,.5)" }}>Disponible en librairie et en édition numérique</p>
              <div className="font-bebas" style={{ fontSize:50,color:G,lineHeight:1 }}>{formatCurrency(bookData.price,bookData.currency)}</div>
              <div style={{ display:"flex",gap:10 }}>
                {bookData.languages.map(l=>(
                  <span key={l} className="font-bebas" style={{ fontSize:14,letterSpacing:2,color:G,border:"1px solid rgba(201,149,58,.5)",padding:"3px 12px" }}>{l}</span>
                ))}
              </div>
              <div style={{ height:1,background:"rgba(201,149,58,.2)" }} />
              <button onClick={()=>setPayOpen(true)} style={{ ...btn(),width:"100%",padding:14 }}
                onMouseEnter={e=>e.currentTarget.style.background="#E8C06A"}
                onMouseLeave={e=>e.currentTarget.style.background=G}
              >
                Payer via Mobile Money
              </button>
              <a href={`mailto:${bookData.contact.email}`}
                style={{ width:"100%",padding:"13px 16px",textAlign:"center",background:"transparent",color:G,fontFamily:"Raleway",fontWeight:600,fontSize:11,letterSpacing:3,textTransform:"uppercase",border:"1px solid rgba(201,149,58,.35)",textDecoration:"none",display:"block",transition:"all 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=G}
                onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(201,149,58,.35)"}
              >
                Contacter l&apos;éditeur
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="py-section px-page" style={{ background:DRK,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at center bottom,rgba(11,61,46,.4) 0%,transparent 70%)" }} />
        <div className="inner" style={{ textAlign:"center",position:"relative",zIndex:2 }}>
          <Reveal>
            <h2 className="font-bebas" style={{ fontSize:"clamp(38px,7vw,86px)",lineHeight:1,color:CRM,letterSpacing:2,marginBottom:14 }}>
              Ce n&apos;est pas un livre<br />sur le <span style={{ color:G }}>football.</span>
            </h2>
            <p className="font-cormorant" style={{ fontStyle:"italic",fontSize:19,color:"rgba(245,240,232,.6)",marginBottom:52,lineHeight:1.6 }}>
              C&apos;est un livre sur ce que l&apos;Afrique fait de ses génies.
            </p>
          </Reveal>

          <div className="contact-cards">
            {[
              { label:"Email",     val:bookData.contact.email,   href:`mailto:${bookData.contact.email}` },
              { label:"Presse",    val:bookData.contact.press,   href:`mailto:${bookData.contact.press}` },
              { label:"Téléphone", val:bookData.contact.phone,   href:`tel:${bookData.contact.phone.replace(/\s/g,"")}` },
              { label:"WhatsApp",  val:bookData.contact.phone,   href:`https://wa.me/${bookData.contact.whatsapp}` },
            ].map(({ label:l,val,href })=>(
              <Reveal key={l}>
                <div style={{ background:"rgba(11,61,46,.5)",border:"1px solid rgba(201,149,58,.2)",padding:"22px 20px",textAlign:"left" }}>
                  <p style={{ fontFamily:"Raleway",fontSize:9,fontWeight:700,letterSpacing:4,textTransform:"uppercase",color:G,marginBottom:8 }}>{l}</p>
                  <a href={href} className="font-playfair" style={{ fontSize:13,color:CRM,textDecoration:"none",wordBreak:"break-all" }}>{val}</a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2}>
            <button
              onClick={()=>setPayOpen(true)}
              style={{ fontFamily:"Raleway",fontWeight:800,fontSize:13,letterSpacing:4,textTransform:"uppercase",color:DRK,background:G,padding:"20px 52px",border:"none",cursor:"pointer",transition:"all 0.2s",marginBottom:18,display:"inline-block" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 10px 40px rgba(201,149,58,.4)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
            >
              ✉ &nbsp;Commander votre exemplaire
            </button>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="px-page" style={{ background:"#030706",borderTop:"1px solid rgba(201,149,58,.1)",padding:"32px 0" }}>
        <div className="inner footer-inner">
          <span className="font-bebas" style={{ fontSize:18,letterSpacing:3,color:G }}>PIB ETO&apos;O · 2026</span>
          <div style={{ display:"flex",gap:20,alignItems:"center",flexWrap:"wrap" }}>
            <Link href="/music" style={{ fontFamily:"Raleway",fontSize:11,color:"rgba(245,240,232,.38)",textDecoration:"none",letterSpacing:2 }}>Musique</Link>
            <span style={{ fontFamily:"Raleway",fontSize:11,color:"rgba(245,240,232,.22)",letterSpacing:1 }}>© 2026 Guy Bertrand MESSINA</span>
          </div>
        </div>
      </footer>
    </>
  );
}