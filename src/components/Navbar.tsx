"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isBook = pathname === "/" || pathname === "/livre";
  const isMusic = pathname.startsWith("/music");

  return (
    <>
      <div className="flag-bar fixed top-0 left-0 right-0 z-50" />
      <nav
        style={{
          position: "fixed",
          top: 3,
          left: 0,
          right: 0,
          zIndex: 49,
          padding: scrolled ? "12px 48px" : "18px 48px",
          background: "rgba(8,15,13,0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(201,149,58,0.12)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "padding 0.3s",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="font-bebas" style={{ fontSize: 22, letterSpacing: 3, color: "#C9953A" }}>
            PIB ETO&apos;O{" "}
            <span style={{ color: "rgba(245,240,232,0.35)", fontSize: 14, letterSpacing: 2 }}>
              · MESSINA
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              textDecoration: "none",
              color: isBook ? "#C9953A" : "rgba(245,240,232,0.6)",
              borderBottom: isBook ? "1px solid #C9953A" : "1px solid transparent",
              paddingBottom: 2,
              transition: "color 0.2s",
            }}
          >
            Le Livre
          </Link>
          <Link
            href="/music"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              textDecoration: "none",
              color: isMusic ? "#C9953A" : "rgba(245,240,232,0.6)",
              borderBottom: isMusic ? "1px solid #C9953A" : "1px solid transparent",
              paddingBottom: 2,
              transition: "color 0.2s",
            }}
          >
            Musique
          </Link>
          <a
            href="/#contact"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#080F0D",
              background: "#C9953A",
              padding: "10px 24px",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#E8C06A")}
            onMouseLeave={e => (e.currentTarget.style.background = "#C9953A")}
          >
            Commander
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "#C9953A", background: "none", border: "none", cursor: "pointer" }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 55,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(8,15,13,0.98)",
            zIndex: 48,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
          }}
        >
          {[
            { href: "/", label: "Le Livre" },
            { href: "/music", label: "Musique" },
            { href: "/#contact", label: "Commander" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-bebas"
              style={{
                fontSize: 48,
                letterSpacing: 4,
                color: "#F5F0E8",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}