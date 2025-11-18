import { useEffect, useRef } from 'react'

// Splash cursor effect inspired by reactbits.dev/animations/splash-cursor
// Draws soft white splashes that fade on a black canvas background
export default function SplashCursor() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const splashesRef = useRef([])
  const dprRef = useRef(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    dprRef.current = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window
      const dpr = dprRef.current
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      // push multiple small splashes for a softer trail
      for (let i = 0; i < 2; i++) {
        splashesRef.current.push({
          x: x + (Math.random() - 0.5) * 18,
          y: y + (Math.random() - 0.5) * 18,
          r: 0,
          max: 40 + Math.random() * 40,
          alpha: 0.25 + Math.random() * 0.25,
        })
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })

    const draw = () => {
      const { innerWidth: w, innerHeight: h } = window
      ctx.clearRect(0, 0, w, h)

      // light splashes on dark mode
      for (let i = splashesRef.current.length - 1; i >= 0; i--) {
        const s = splashesRef.current[i]
        s.r += 1.8
        s.alpha *= 0.96
        if (s.r > s.max || s.alpha < 0.02) {
          splashesRef.current.splice(i, 1)
          continue
        }
        const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r)
        gradient.addColorStop(0, `rgba(255,255,255,${s.alpha})`)
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 mix-blend-screen"
      aria-hidden="true"
    />
  )
}
