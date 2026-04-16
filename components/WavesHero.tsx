'use client'

import { useEffect, useRef, useState } from 'react'

interface WaveConfig {
  color: string
  opacity: number
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
  const mousePosRef = useRef<{ x: number; y: number } | null>(null)
  const isVisibleRef = useRef(true)
  const animationIdRef = useRef<number>(0)

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
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let time = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // cap at 2× — no benefit beyond that
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      const needed = Math.ceil((rect.width * 1.1) / 4) + 2
      if (needed > maxPoints) {
        maxPoints = needed
        pointsBuffer = new Float32Array(maxPoints * 2)
      }
    }

    // Pause RAF when canvas scrolled off screen
    const visibilityObserver = new IntersectionObserver(
      (entries) => { isVisibleRef.current = entries[0]?.isIntersecting ?? true },
      { threshold: 0 }
    )
    visibilityObserver.observe(canvas)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      const last = lastMouseRef.current
      if (!last || Math.hypot(e.clientX - last.x, e.clientY - last.y) > 20) {
        ripplesRef.current.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, strength: 0.175, age: 0, maxAge: 50 })
        if (ripplesRef.current.length > 20) ripplesRef.current.shift()
        lastMouseRef.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      ripplesRef.current.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, strength: 0.42, age: 0, maxAge: 80 })
    }

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const t = e.touches[0]
      if (!t) return
      ripplesRef.current.push({ x: t.clientX - rect.left, y: t.clientY - rect.top, strength: 0.21, age: 0, maxAge: 60 })
      mousePosRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top }
      if (ripplesRef.current.length > 30) ripplesRef.current.splice(0, ripplesRef.current.length - 30)
    }

    const handleTouchEnd = () => { mousePosRef.current = null }

    const handleMouseLeave = () => {
      ripplesRef.current = []
      lastMouseRef.current = null
      mousePosRef.current = null
    }

    // Pre-allocated point array — reused each frame, zero GC pressure
    let maxPoints = Math.ceil((window.innerWidth * 1.1) / 4) + 2
    let pointsBuffer: Float32Array = new Float32Array(maxPoints * 2)

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const computeWavePoints = (wave: WaveConfig, w: number, h: number): number => {
      const baseY = h * 0.7
      let count = 0
      for (let x = -4; x <= w + 4; x += 4) {
        let influence = 0
        const ripples = ripplesRef.current
        for (let r = 0; r < ripples.length; r++) {
          const rp = ripples[r]
          const dx = x - rp.x
          const dy = baseY - rp.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const decay = 1 - rp.age / rp.maxAge
          const spatial = Math.max(0, 1 - dist / 200)
          const phase = Math.sin(time * 0.004 + dist * 0.015 - rp.age * 0.08 + wave.offset)
          influence += spatial * decay * rp.strength * 13 * phase
        }

        const y =
          baseY +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          influence

        pointsBuffer[count * 2]     = x
        pointsBuffer[count * 2 + 1] = y
        count++
      }
      return count
    }

    const drawWave = (
      wave: WaveConfig,
      pointCount: number,
      w: number,
      h: number,
    ) => {
      if (pointCount < 2) return

      // ── Body fill ──
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(pointsBuffer[0], pointsBuffer[1])
      for (let i = 1; i < pointCount; i++) {
        ctx.lineTo(pointsBuffer[i * 2], pointsBuffer[i * 2 + 1])
      }
      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.closePath()
      ctx.fillStyle = wave.color
      ctx.globalAlpha = wave.opacity
      ctx.fill()
      ctx.restore()

      // ── Edge highlight — ONE single path, ONE gradient, ONE stroke call ──
      // Much cheaper than per-segment gradient/stroke in the old code.
      const isDark = themeModeRef.current === 'dark'
      const mouse = mousePosRef.current

      // Find the point closest to mouse to compute peak proximity
      let peakProximity = 0
      if (mouse) {
        let minDist2 = Infinity
        for (let i = 0; i < pointCount; i++) {
          const dx = pointsBuffer[i * 2] - mouse.x
          const dy = pointsBuffer[i * 2 + 1] - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < minDist2) minDist2 = d2
        }
        const dist = Math.sqrt(minDist2)
        const raw = Math.max(0, 1 - dist / 220)
        peakProximity = raw * raw * (3 - 2 * raw) // smoothstep
      }

      const topAlpha  = isDark
        ? (0.32 + 0.58 * peakProximity)
        : (0.60 + 0.40 * peakProximity)
      const midAlpha  = isDark
        ? (0.10 + 0.35 * peakProximity)
        : (0.20 + 0.35 * peakProximity)
      const lineWidth = isDark
        ? (1.25 + 0.95 * peakProximity)
        : (1.75 + 1.05 * peakProximity)

      // Approximate midY from middle point
      const midIdx = Math.floor(pointCount / 2)
      const midY = pointsBuffer[midIdx * 2 + 1]

      const edgeGrad = ctx.createLinearGradient(0, midY - 8, 0, midY + 36)
      edgeGrad.addColorStop(0,    `rgba(255, 255, 255, ${topAlpha.toFixed(3)})`)
      edgeGrad.addColorStop(0.35, `rgba(255, 255, 255, ${midAlpha.toFixed(3)})`)
      edgeGrad.addColorStop(1,    'rgba(255, 255, 255, 0)')

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(pointsBuffer[0], pointsBuffer[1])
      for (let i = 1; i < pointCount; i++) {
        ctx.lineTo(pointsBuffer[i * 2], pointsBuffer[i * 2 + 1])
      }
      ctx.strokeStyle = edgeGrad
      ctx.lineWidth = lineWidth
      ctx.globalAlpha = isDark ? (0.75 + 0.25 * peakProximity) : (0.92 + 0.08 * peakProximity)
      ctx.shadowBlur = 0
      ctx.stroke()
      ctx.restore()
    }

    const draw = () => {
      // Skip rendering when off-screen — saves GPU/CPU entirely
      if (!isVisibleRef.current) {
        animationIdRef.current = requestAnimationFrame(draw)
        return
      }

      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      if (w === 0 || h === 0) {
        animationIdRef.current = requestAnimationFrame(draw)
        return
      }

      // Age + prune ripples
      const ripples = ripplesRef.current
      for (let r = 0; r < ripples.length; r++) ripples[r].age++
      ripplesRef.current = ripples.filter((r) => r.age < r.maxAge)

      const vars = themeVars ?? readWaveVars()
      const mode = themeModeRef.current
      const waveColors = vars.waves

      // Background gradient — reuse object if possible (minor GC savings)
      const gradient = ctx.createLinearGradient(0, 0, 0, h)
      gradient.addColorStop(0, vars.bgStart)
      gradient.addColorStop(1, vars.bgEnd)
      ctx.fillStyle = gradient
      ctx.globalAlpha = 1
      ctx.fillRect(0, 0, w, h)

      const configs: WaveConfig[] = [
        { color: waveColors[0], opacity: mode === 'dark' ? 0.09 : 0.11, amplitude: 90,  frequency: 0.0028, offset: 0 },
        { color: waveColors[1], opacity: mode === 'dark' ? 0.06 : 0.08, amplitude: 110, frequency: 0.0022, offset: Math.PI / 2 },
        { color: waveColors[2], opacity: mode === 'dark' ? 0.05 : 0.07, amplitude: 75,  frequency: 0.0038, offset: Math.PI },
        { color: waveColors[3], opacity: mode === 'dark' ? 0.10 : 0.13, amplitude: 100, frequency: 0.0018, offset: Math.PI * 1.5 },
        { color: waveColors[4], opacity: mode === 'dark' ? 0.04 : 0.05, amplitude: 125, frequency: 0.0015, offset: Math.PI * 2 },
      ]

      for (const wave of configs) {
        const count = computeWavePoints(wave, w, h)
        drawWave(wave, count, w, h)
      }

      time += 1
      animationIdRef.current = requestAnimationFrame(draw)
    }

    animationIdRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationIdRef.current)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
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
        display: 'block',
      }}
    />
  )
}
