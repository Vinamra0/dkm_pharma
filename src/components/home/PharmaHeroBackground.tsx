"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  driftX: number
  driftY: number
  r: number
  kind: "node" | "capsule"
}

export function PharmaHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rafId = 0
    let startTime = performance.now()
    let isVisibleInViewport = true
    let isPageVisible = document.visibilityState === "visible"
    let isAnimating = false
    let width = 0
    let height = 0
    let dpr = 1

    let pointerX = -1000
    let pointerY = -1000
    let pointerActive = false

    const particles: Particle[] = []

    const createParticle = (): Particle => {
      const kind = Math.random() > 0.28 ? "node" : "capsule"
      const driftX = (Math.random() - 0.5) * 0.55
      const driftY = (Math.random() - 0.5) * 0.55
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: driftX,
        vy: driftY,
        driftX,
        driftY,
        r: kind === "node" ? 1.5 + Math.random() * 2.2 : 2 + Math.random() * 2.5,
        kind,
      }
    }

    const setup = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const targetCount = Math.max(40, Math.floor((width * height) / 22000))
      particles.length = 0
      for (let i = 0; i < targetCount; i += 1) {
        particles.push(createParticle())
      }
    }

    const drawCapsule = (x: number, y: number, r: number) => {
      const w = r * 3.6
      const h = r * 1.7

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(0.7)
      ctx.beginPath()
      ctx.moveTo(-w / 2 + h / 2, -h / 2)
      ctx.lineTo(w / 2 - h / 2, -h / 2)
      ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, 0)
      ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - h / 2, h / 2)
      ctx.lineTo(-w / 2 + h / 2, h / 2)
      ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, 0)
      ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + h / 2, -h / 2)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.rect(0, -h / 2, w / 2, h)
      ctx.fillStyle = "rgba(125, 211, 252, 0.95)"
      ctx.fill()
      ctx.restore()
    }

    const drawAmbientLayer = (time: number) => {
      const driftX = pointerActive ? (pointerX - width * 0.5) * 0.015 : 0
      const driftY = pointerActive ? (pointerY - height * 0.5) * 0.015 : 0

      const glowA = ctx.createRadialGradient(
        width * (0.22 + Math.sin(time * 0.09) * 0.03) + driftX,
        height * (0.35 + Math.cos(time * 0.07) * 0.03) + driftY,
        10,
        width * 0.24 + driftX,
        height * 0.35 + driftY,
        Math.max(width, height) * 0.6,
      )
      glowA.addColorStop(0, "rgba(34, 211, 238, 0.16)")
      glowA.addColorStop(1, "rgba(34, 211, 238, 0)")
      ctx.fillStyle = glowA
      ctx.fillRect(0, 0, width, height)

      const glowB = ctx.createRadialGradient(
        width * (0.78 + Math.cos(time * 0.08) * 0.02) + driftX,
        height * (0.55 + Math.sin(time * 0.11) * 0.025) + driftY,
        20,
        width * 0.78 + driftX,
        height * 0.55 + driftY,
        Math.max(width, height) * 0.72,
      )
      glowB.addColorStop(0, "rgba(56, 189, 248, 0.13)")
      glowB.addColorStop(1, "rgba(56, 189, 248, 0)")
      ctx.fillStyle = glowB
      ctx.fillRect(0, 0, width, height)
    }

    const drawVignette = () => {
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        Math.min(width, height) * 0.35,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.75,
      )
      vignette.addColorStop(0, "rgba(2, 6, 23, 0)")
      vignette.addColorStop(1, "rgba(2, 6, 23, 0.42)")
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)
    }

    const animate = () => {
      if (!isVisibleInViewport || !isPageVisible) {
        isAnimating = false
        return
      }

      const time = (performance.now() - startTime) * 0.001
      ctx.clearRect(0, 0, width, height)

      drawAmbientLayer(time)

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]

        if (pointerActive) {
          const dx = p.x - pointerX
          const dy = p.y - pointerY
          const distSq = dx * dx + dy * dy
          const range = 140
          if (distSq < range * range && distSq > 0.001) {
            const force = (range - Math.sqrt(distSq)) / range
            p.vx += (dx / Math.sqrt(distSq)) * force * 0.05
            p.vy += (dy / Math.sqrt(distSq)) * force * 0.05
          }
        }

        p.x += p.vx
        p.y += p.vy

        // Keep a living background motion by softly pulling velocity toward each
        // particle's base drift and adding tiny random walk noise.
        p.vx += (p.driftX - p.vx) * 0.018 + (Math.random() - 0.5) * 0.002
        p.vy += (p.driftY - p.vy) * 0.018 + (Math.random() - 0.5) * 0.002

        const speed = Math.hypot(p.vx, p.vy)
        const maxSpeed = 1.1
        if (speed > maxSpeed) {
          const scale = maxSpeed / speed
          p.vx *= scale
          p.vy *= scale
        }

        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 110

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = a.kind === "capsule" || b.kind === "capsule"
              ? `rgba(103, 232, 249, ${alpha})`
              : `rgba(125, 211, 252, ${alpha * 0.9})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]
        ctx.shadowBlur = p.kind === "capsule" ? 14 : 10
        ctx.shadowColor = p.kind === "capsule" ? "rgba(56, 189, 248, 0.45)" : "rgba(226, 232, 240, 0.35)"
        ctx.fillStyle = p.kind === "node" ? "rgba(226, 232, 240, 0.86)" : "rgba(14, 165, 233, 0.92)"

        if (p.kind === "node") {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        } else {
          drawCapsule(p.x, p.y, p.r)
        }
      }
      ctx.shadowBlur = 0

      if (pointerActive) {
        ctx.beginPath()
        ctx.arc(pointerX, pointerY, 55, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(56, 189, 248, 0.24)"
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(pointerX, pointerY, 90, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(125, 211, 252, 0.12)"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      drawVignette()

      rafId = window.requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (isAnimating || !isVisibleInViewport || !isPageVisible) return
      isAnimating = true
      rafId = window.requestAnimationFrame(animate)
    }

    const stopAnimation = () => {
      if (!isAnimating) return
      window.cancelAnimationFrame(rafId)
      isAnimating = false
    }

    const onResize = () => setup()

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = event.clientX - rect.left
      pointerY = event.clientY - rect.top
      pointerActive = true
    }

    const onPointerLeave = () => {
      pointerActive = false
      pointerX = -1000
      pointerY = -1000
    }

    const onVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible"
      if (isPageVisible) {
        startAnimation()
      } else {
        stopAnimation()
      }
    }

    const observerTarget = canvas.parentElement ?? canvas
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        isVisibleInViewport = entry.isIntersecting
        if (isVisibleInViewport) {
          startAnimation()
        } else {
          stopAnimation()
        }
      },
      {
        threshold: 0.02,
      },
    )

    setup()
    startTime = performance.now()
    startAnimation()

    window.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVisibilityChange)
    canvas.addEventListener("pointermove", onPointerMove)
    canvas.addEventListener("pointerleave", onPointerLeave)
    intersectionObserver.observe(observerTarget)

    return () => {
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerleave", onPointerLeave)
      intersectionObserver.disconnect()
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
