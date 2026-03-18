'use client'

import { useEffect, useRef, useState } from 'react'

interface WaveConfig {
  color: string
  opacity: number
  spotlightOpacity: number
  amplitude: number
  frequency: number
  offset: number
}

type RipplePoint = {
  x: number
  y: number
  strength: number
  age: number
  maxAge: number
}

type WaveThemeVars = {
  bgStart: string
  bgEnd: string
  waves: [string, string, string, string, string]
}

function readWaveVars(): WaveThemeVars {
  const root = document.documentElement
  const styles = getComputedStyle(root)
  const get = (name: string) => styles.getPropertyValue(name).trim()
  return {
    bgStart: get('--wave-bg-start'),
    bgEnd: get('--wave-bg-end'),
    waves: [get('--wave-1'), get('--wave-2'), get('--wave-3'), get('--wave-4'), get('--wave-5')] as [string,string,string,string,string],
  }
}

function getThemeMode(): 'dark' | 'light' {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

export default function WavesHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripplesRef = useRef<RipplePoint[]>([])
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null)
  // Mouse position in canvas-space (null = not over canvas)
  const mousePosRef = useRef<{ x: number; y: number } | null>(null)

  const [themeVars, setThemeVars] = useState<WaveThemeVars | null>(null)
  const themeModeRef = useRef<'dark' | 'light'>('light')

  useEffect(() => {
    themeModeRef.current = getThemeMode()
    setThemeVars(readWaveVars())

    const root = document.documentElement
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          themeModeRef.current = getThemeMode()
          setThemeVars(readWaveVars())
        }
      }
    })
    observer.observe(root, { attributes: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      // Ripple
      const last = lastMouseRef.current
      if (!last || Math.hypot(e.clientX - last.x, e.clientY - last.y) > 16) {
        ripplesRef.current.push({ x: e.clientX, y: e.clientY, strength: 0.175, age: 0, maxAge: 50 })
        if (ripplesRef.current.length > 40) ripplesRef.current.shift()
        lastMouseRef.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      ripplesRef.current.push({ x: e.clientX, y: e.clientY, strength: 0.42, age: 0, maxAge: 120 })
    }

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      Array.from(e.touches).forEach((t) => {
        ripplesRef.current.push({ x: t.clientX, y: t.clientY, strength: 0.21, age: 0, maxAge: 90 })
        // Also update mousePosRef so proximity edge-lighting works on touch
        mousePosRef.current = {
          x: t.clientX - rect.left,
          y: t.clientY - rect.top,
        }
      })
      if (ripplesRef.current.length > 60) ripplesRef.current.splice(0, ripplesRef.current.length - 60)
    }

    const handleTouchEnd = () => {
      // Fade out proximity effect when touch ends
      mousePosRef.current = null
    }

    const handleMouseLeave = () => {
      ripplesRef.current = []
      lastMouseRef.current = null
      mousePosRef.current = null
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const computeWavePoints = (wave: WaveConfig, w: number, h: number): Array<{x: number, y: number}> => {
      const points: Array<{x: number, y: number}> = []
      const baseY = h * 0.7

      for (let x = 0; x <= w; x += 4) {
        let totalInfluence = 0
        for (const ripple of ripplesRef.current) {
          const dx = x - ripple.x
          const dy = baseY - ripple.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const decay = 1 - ripple.age / ripple.maxAge
          const spatial = Math.max(0, 1 - dist / 220)
          const phase = Math.sin(time * 0.004 + dist * 0.015 - ripple.age * 0.08 + wave.offset)
          totalInfluence += spatial * decay * ripple.strength * 13 * phase
        }

        const y =
          baseY +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          totalInfluence

        points.push({ x, y })
      }
      return points
    }

    const drawWave = (
      wave: WaveConfig,
      points: Array<{x: number, y: number}>,
      w: number,
      h: number,
      shadowBlur: number,
      isMobile: boolean,
      mouse: { x: number; y: number } | null
    ) => {
      const isDark = themeModeRef.current === 'dark'

      // ── Body fill (global dim opacity — unchanged) ──
      ctx.save()
      ctx.beginPath()
      points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y)
        else ctx.lineTo(p.x, p.y)
      })
      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.closePath()
      ctx.fillStyle = wave.color
      ctx.globalAlpha = wave.opacity
      if (!isMobile && shadowBlur > 0) {
        ctx.shadowBlur = shadowBlur
        ctx.shadowColor = wave.color
      }
      ctx.fill()
      ctx.restore()

      // ── Edge highlight — drawn segment by segment with proximity boosting ──
      // For each small segment along the wave crest, compute how close the mouse
      // is to that crest point, and blend from dim to bright edge color accordingly.
      // This makes the lighting follow the wave geometry, not a circle.
      {
        const influenceRadius = 220  // px — how far the mouse reaches
        const baseTopAlpha = isDark ? 0.32 : 0.60
        const brightTopAlpha = isDark ? 0.90 : 1.0  // full illumination near mouse
        const baseMidAlpha = isDark ? 0.10 : 0.20
        const brightMidAlpha = isDark ? 0.45 : 0.55
        const baseLineWidth = isDark ? 1.25 : 1.75
        const brightLineWidth = isDark ? 2.2 : 2.8

        for (let i = 0; i < points.length - 1; i++) {
          const p = points[i]
          const pNext = points[i + 1]

          // Proximity factor: 0 = far from mouse, 1 = right at mouse
          let proximity = 0
          if (mouse) {
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            proximity = Math.max(0, 1 - dist / influenceRadius)
            // Smooth falloff
            proximity = proximity * proximity * (3 - 2 * proximity)  // smoothstep
          }

          const topAlpha = baseTopAlpha + (brightTopAlpha - baseTopAlpha) * proximity
          const midAlpha = baseMidAlpha + (brightMidAlpha - baseMidAlpha) * proximity
          const lineWidth = baseLineWidth + (brightLineWidth - baseLineWidth) * proximity

          const midY = p.y
          const edgeGrad = ctx.createLinearGradient(0, midY - 8, 0, midY + 36)
          edgeGrad.addColorStop(0, `rgba(255,255,255,${topAlpha.toFixed(3)})`)
          edgeGrad.addColorStop(0.35, `rgba(255,255,255,${midAlpha.toFixed(3)})`)
          edgeGrad.addColorStop(1, 'rgba(255,255,255,0)')

          ctx.save()
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(pNext.x, pNext.y)
          ctx.strokeStyle = edgeGrad
          ctx.lineWidth = lineWidth
          ctx.globalAlpha = isDark
            ? (0.75 + 0.25 * proximity)
            : (0.92 + 0.08 * proximity)
          ctx.shadowBlur = 0
          ctx.stroke()
          ctx.restore()
        }
      }
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const isMobile = window.innerWidth < 768

      ripplesRef.current.forEach((r) => r.age++)
      ripplesRef.current = ripplesRef.current.filter((r) => r.age < r.maxAge)

      const vars = themeVars ?? readWaveVars()
      const mode = themeModeRef.current
      const waveColors = vars.waves
      const shadowBlur = mode === 'dark' ? 12 : 8

      const gradient = ctx.createLinearGradient(0, 0, 0, h)
      gradient.addColorStop(0, vars.bgStart)
      gradient.addColorStop(1, vars.bgEnd)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      const waveConfigs: WaveConfig[] = [
        { color: waveColors[0], opacity: 0.11, spotlightOpacity: 0.07, amplitude: 90,  frequency: 0.0028, offset: 0 },
        { color: waveColors[1], opacity: 0.08, spotlightOpacity: 0.05, amplitude: 110, frequency: 0.0022, offset: Math.PI / 2 },
        { color: waveColors[2], opacity: 0.07, spotlightOpacity: 0.04, amplitude: 75,  frequency: 0.0038, offset: Math.PI },
        { color: waveColors[3], opacity: 0.13, spotlightOpacity: 0.08, amplitude: 100, frequency: 0.0018, offset: Math.PI * 1.5 },
        { color: waveColors[4], opacity: 0.05, spotlightOpacity: 0.03, amplitude: 125, frequency: 0.0015, offset: Math.PI * 2 },
      ]

      const mouse = mousePosRef.current

      waveConfigs.forEach((wave) => {
        const points = computeWavePoints(wave, w, h)
        drawWave(wave, points, w, h, shadowBlur, isMobile, mouse)
      })

      time += 1
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [themeVars])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  )
}
