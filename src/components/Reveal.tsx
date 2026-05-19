'use client'
import { useEffect, useRef, ReactNode } from 'react'
export default function Reveal({
  children,
  delay = 0,
  className = '',
  style,
}: {
  children: ReactNode
  delay?: 0 | 1 | 2 | 3 | 4
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add('visible')
      },
      { threshold: 0.1 },
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`reveal ${delay > 0 ? `reveal-delay-${delay}` : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
