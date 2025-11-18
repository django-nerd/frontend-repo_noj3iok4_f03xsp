import { useEffect, useRef } from 'react'

// Splash Cursor — closer to reactbits.dev/animations/splash-cursor
// Characteristics:
// - Light "splash" bursts on pointer move and bigger burst on press
// - Uses radial gradients + ripple rings with screen blend for a watery glare
// - DPR-aware, transform-safe resize (no cumulative scaling)
export default function SplashCursor() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const dprRef = useRef(1)
  const dropletsRef = useRef([]) // particles
  const ringsRef = useRef([]) // expanding ripple rings
  const lastRef = useRef({ x: 0, y: 0, t: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const setup = () => {
      dprRef.current = Math.min(2, Math.max(1, window.devicePixelRatio || 1))
      const dpr = dprRef.current
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      ctx.globalCompositeOperation = 'screen'
    }

    setup()

    const onResize = () => {
      setup()
    }

    const spawnDroplets = (x, y, intensity = 1, count = 6) => {
      for (let i = 0; i < count * intensity; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = (0.5 + Math.random() * 1.5) * (0.5 + intensity * 0.5)
        dropletsRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 2 + Math.random() * 3,
          life: 1,
          decay: 0.015 + Math.random() * 0.02,
        })
      }
    }

    const spawnRing = (x, y, intensity = 1) => {
      ringsRef.current.push({
        x,
        y,
        r: 0,
        max: 60 + Math.random() * 40 * intensity,
        width: 2 + intensity * 1.5,
        alpha: 0.35 + 0.15 * Math.random(),
        grow: 1.8 + intensity * 0.8,
        fade: 0.012 + Math.random() * 0.01,
      })
    }

    const onPointerMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      const now = performance.now()
      const dt = Math.max(1, now - (lastRef.current.t || now))
      const dx = x - (lastRef.current.x || x)
      const dy = y - (lastRef.current.y || y)
      const speed = Math.min(20, Math.hypot(dx, dy) / dt * 16)
      const intensity = 0.5 + speed * 0.5

      spawnDroplets(x, y, intensity, 4)
      if (speed > 6 && Math.random() < 0.2) spawnRing(x, y, intensity)

      lastRef.current = { x, y, t: now }
    }

    const onPointerDown = (e) => {
      const x = e.clientX
      const y = e.clientY
      spawnDroplets(x, y, 2.2, 12)
      spawnRing(x, y, 2)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)

    const render = () => {
      const { innerWidth: w, innerHeight: h } = window
      ctx.clearRect(0, 0, w, h)

      // Draw droplets (soft light blobs)
      for (let i = dropletsRef.current.length - 1; i >= 0; i--) {
        const p = dropletsRef.current[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98
        p.life -= p.decay
        if (p.life <= 0) {
          dropletsRef.current.splice(i, 1)
          continue
        }

        const alpha = Math.max(0, p.life) * 0.6
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * (1 + (1 - p.life) * 2))
        grad.addColorStop(0, `rgba(255,255,255,${alpha})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw ripple rings
      ctx.strokeStyle = 'rgba(255,255,255,1)'
      for (let i = ringsRef.current.length - 1; i >= 0; i--) {
        const r = ringsRef.current[i]
        r.r += r.grow
        r.alpha -= r.fade
        r.width *= 0.995
        if (r.r > r.max || r.alpha <= 0.02) {
          ringsRef.current.splice(i, 1)
          continue
        }
        ctx.lineWidth = r.width
        ctx.globalAlpha = r.alpha
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
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
