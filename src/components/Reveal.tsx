'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: 0 | 1 | 2 | 3 | 4
  className?: string
  style?: React.CSSProperties
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible')
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : ''

  return (
    <div ref={ref} className={`reveal ${delayClass} ${className}`} style={style}>
      {children}
    </div>
  )
}
